import {ok} from "@barlus/node/assert";
import {AlreadyHaveReaderError, WriteAfterEndError} from "./errors";
import {map, filter} from "./transform";
import {Defer, swallowErrors, track} from "./util";
import {ReadableStream, Deferred, Transform, Writable, WritableStream, TrackedPromise} from "./types"
interface WriteItem<T> {
    /**
     * Resolver `write()`'s returned promise
     */
    resolveWrite: (done?: void | PromiseLike<void>) => void;

    /**
     * Promise for value passed to `write()`.
     * Either a special Eof value, or a value of type `T`.
     */
    value: Eof | TrackedPromise<T>;
}
export class Stream<T> implements ReadableStream<T>, WritableStream<T> {
    private _writers: WriteItem<T>[] = [];
    private _reader: (value: T) => void | PromiseLike<void>;
    private _ender: (error?: Error) => void | PromiseLike<void>;
    private _aborter: (error: Error) => void;
    private _readBusy: TrackedPromise<void>;
    private _ending: Eof;
    private _endPending: Eof;
    private _ended: Error;
    private _abortPromise: Promise<void>;
    private _abortReason: Error;
    private _abortDeferred: Deferred<void> = new Defer();
    private _resultDeferred: Deferred<void> = new Defer();
    public async write(value: T | PromiseLike<T>): Promise<void> {
        if (value === undefined) {
            // Technically, we could allow this, but it's a common programming
            // error to forget to return a value, and it's arguable whether it's
            // useful to have a stream of void's, so let's prevent it for now.
            // NOTE: This behaviour may change in the future
            // TODO: prevent writing a void PromiseLike too?
            return Promise.reject(
                new TypeError("cannot write void value, use end() to end the stream")
            );
        }

        let writeDone = new Defer();
        this._writers.push({
            resolveWrite: writeDone.resolve,
            value: track<T>(Promise.resolve(value)),
        });
        this._pump();
        return writeDone.promise;
    }
    public async end(error?: Error, endedResult?: PromiseLike<void>): Promise<void> {
        if (!(error === undefined || error === null || error instanceof Error)) {
            // tslint:disable-line:no-null-keyword
            throw new TypeError("invalid argument to end(): must be undefined, null or Error object")
        }
        if (error && !endedResult) {
            endedResult = Promise.reject(error);
            swallowErrors(endedResult);
        }
        let eof = new Eof(error, endedResult);
        if (!this._ending && !this._ended) {
            this._ending = eof;
        }
        let writeDone = new Defer();
        const item: WriteItem<T> = {
            resolveWrite: writeDone.resolve,
            value: eof,
        };
        this._writers.push(item);
        this._pump();
        return writeDone.promise;
    }
    public forEach(reader: (value: T) => void | PromiseLike<void>,ender?: (error?: Error) => void | PromiseLike<void>,aborter?: (error: Error) => void): Promise<void> {
        if (this.hasReader()) {
            return Promise.reject(new AlreadyHaveReaderError());
        }
        if (!ender) {
            ender = defaultEnder;
        }
        this._reader = reader;
        this._ender = ender;
        this._aborter = aborter;
        this._pump();
        return this.result();
    }
    public abort(reason: Error): void {
        if (this._abortPromise) {
            return;
        }
        this._abortDeferred.reject(reason);
        this._abortPromise = this._abortDeferred.promise;
        this._abortReason = reason;
        this._pump();
    }
    public aborted(): Promise<void> {
        return this._abortDeferred.promise;
    }
    public result(): Promise<void> {
        return this._resultDeferred.promise;
    }
    public isEnding(): boolean {
        return !!this._ending;
    }
    public isEnded(): boolean {
        return !!this._ended;
    }
    public isEndingOrEnded(): boolean {
        return this.isEnding() || this.isEnded();
    }
    public hasReader(): boolean {
        return !!this._reader;
    }
    public map<R>(mapper: (value: T) => R | PromiseLike<R>, ender?: (error?: Error) => void | PromiseLike<void>,aborter?: (error: Error) => void): ReadableStream<R> {
        let output = new Stream<R>();
        map(this, output, mapper, ender, aborter);
        return output;
    }
    public filter(filterer: (value: T) => boolean | PromiseLike<boolean>, ender?: (error?: Error) => void | PromiseLike<void>, aborter?: (error: Error) => void): ReadableStream<T> {
        let output = new Stream<T>();
        filter(this, output, filterer, ender, aborter);
        return output;
    }
    public reduce(reducer: (accumulator: T, current: T, index: number, stream: ReadableStream<T>) => T | PromiseLike<T>, initial?: T): Promise<T>;
    public reduce<R>(reducer: (accumulator: R, current: T, index: number, stream: ReadableStream<T>) => R | PromiseLike<R>, initial: R): Promise<R>;
    public reduce<R>(reducer: (accumulator: R, current: T, index: number, stream: ReadableStream<T>) => R | PromiseLike<R>, initial?: R): Promise<R> {
        let haveAccumulator = arguments.length === 2;
        let accumulator: any = initial;
        let index = 0;
        return this.forEach(
            (value: T): void | PromiseLike<void> => {
                if (!haveAccumulator) {
                    accumulator = value;
                    haveAccumulator = true;
                    index++;
                } else {
                    return Promise.resolve(reducer(accumulator, value, index++, this))
                        .then((newAccumulator: any) => accumulator = newAccumulator);
                }
            }
        ).then(() => {
            if (!haveAccumulator) {
                return Promise.reject<R>(new TypeError("cannot reduce() empty stream without initial value"));
            }
            return accumulator;
        });
    }
    public toArray(): Promise<T[]> {
        let result: T[] = [];
        return this.forEach((value: T) => {
            result.push(value);
        })
            .then(() => result);
    }
    public pipe<R extends Writable<T>>(writable: R): R {
        writable.aborted().catch((err) => this.abort(err));
        this.aborted().catch((err) => writable.abort(err));
        this.forEach(
            (value: T) => writable.write(value),
            (error?: Error) => writable.end(error, this.result())
        );
        return writable;
    }
    public transform<R>(transformer: Transform<T, R>): ReadableStream<R> {
        let output = new Stream<R>();
        transformer(this, output);
        return output;
    }
    public writeEach(writer: () => T | PromiseLike<T> | void | PromiseLike<void>): Promise<void> {
        this.aborted().catch((abortError) => {
            // Swallow errors from the end call, as they will be reflected in
            // result() too
            swallowErrors(this.end(abortError));
        });
        let loop = (): void | Promise<void> => {
            if (this._abortPromise) {
                // Don't call writer when aborted
                return;
            }
            let valuePromise = writer();
            return Promise.resolve<T | void>(valuePromise).then((value?: T) => {
                if (value === undefined) {
                    return this.end();
                } else {
                    return this.write(value).then(loop);
                }
            });
        };
        Promise.resolve().then(loop).then(undefined, (error: Error) => this.abort(error));
        return this.result();
    }
    public mappedBy<X>(mapper: (value: X) => T | PromiseLike<T>): WritableStream<X> {
        let input = new Stream<X>();
        map(input, this, mapper);
        return input;
    }
    public filterBy(filterer: (value: T) => boolean | PromiseLike<boolean>): WritableStream<T> {
        let input = new Stream<T>();
        filter(input, this, filterer);
        return input;
    }
    public static from<T>(data: PromiseLike<PromiseLike<T>[]>): ReadableStream<T>;
    public static from<T>(data: PromiseLike<T>[]): ReadableStream<T>;
    public static from<T>(data: PromiseLike<T[]>): ReadableStream<T>;
    public static from<T>(data: T[]): ReadableStream<T>;
    public static from<T>(data: T[] | PromiseLike<T[]> | PromiseLike<T>[] | PromiseLike<PromiseLike<T>[]>): ReadableStream<T> {
        let stream = new Stream<T>();
        let i = 0;
        if (Array.isArray(data)) {
            stream.writeEach(() => data[i++]);
        } else {
            Promise.resolve<T[] | PromiseLike<T>[]>(data).then((resolvedArray) => {
                stream.writeEach(() => resolvedArray[i++]);
            });
        }
        return stream;
    }
    private _pumper = () => this._pump();
    private _pump(): void {
        // Call abort handler, if necessary
        if (this._abortPromise && this._aborter) {
            // Make sure to call it asynchronously, and without a 'this'
            // TODO: can any error thrown from the aborter be handled?
            swallowErrors(this._abortPromise.catch(this._aborter));
            this._aborter = undefined;
        }

        // If waiting for a reader/ender, wait some more or handle it
        if (this._readBusy) {
            if (this._readBusy.isPending) {
                // Pump is already attached to _readBusy, so just wait for that
                // to be resolved
                return;
            }

            // Previous reader/ender has resolved, return its result to the
            // corresponding write() or end() call
            this._writers.shift().resolveWrite(this._readBusy.promise);
            if (this._endPending) {
                let result = this._endPending.result;
                this._ended = this._endPending.error || EOF;
                this._ending = undefined;
                this._endPending = undefined;
                this._aborter = undefined; // no longer call aborter after end handler has finished
                let p: PromiseLike<void>;
                if (result) {
                    // wait for the result, but be sure to throw the original error, if any
                    p = this._readBusy.promise.then(
                        () => result,
                        (e) => {
                            const thrower = () => {
                                throw e;
                            };
                            return result.then(thrower, thrower);
                        }
                    );
                } else {
                    p = this._readBusy.promise;
                }
                this._resultDeferred.resolve(p);
            }
            this._readBusy = undefined;
        }

        // If ended, reject any pending and future writes/ends with an error
        if (this._ended) {
            while (this._writers.length > 0) {
                let writer = this._writers.shift();
                writer.resolveWrite(Promise.reject(new WriteAfterEndError()));
            }
            return;
        }

        // In case we're aborting, abort all pending and future write()'s (i.e.
        // not the end()'s)
        if (this._abortPromise) {
            while (this._writers.length > 0) {
                let writer = this._writers[0];
                if (writer.value instanceof Eof) {
                    break;
                }
                // Reject all non-end write()'s with abort reason
                swallowErrors(writer.value.promise);
                writer.resolveWrite(this._abortPromise);
                this._writers.shift();
            }
            // Fall-through to process the 'end()', if any
        }

        // Wait until at least one value and a reader are available
        if (this._writers.length === 0 || !this._reader) {
            // write(), end() and forEach() will pump us again
            return;
        }
        let writer = this._writers[0];

        // Wait until next written value is available
        // (Note: when aborting, all non-end() writers will already have been
        // aborted above, and an Eof is a resolved value)
        if (!(writer.value instanceof Eof) && writer.value.isPending) {
            writer.value.promise.then(this._pumper, this._pumper);
            return;
        }

        // If written value resolved to a rejection, make its write() fail
        if (!(writer.value instanceof Eof) && writer.value.isRejected) {
            writer.resolveWrite(writer.value.promise as PromiseLike<any>);
            this._writers.shift();
            // Pump again
            Promise.resolve().then(this._pumper);
            return;
        }

        // Determine whether we should call the reader or the ender.
        // Handler is always asynchronously called, and by chaining it from
        // the writer's value, long stack traces are maintained.
        if (writer.value instanceof Eof) {
            const eof = writer.value;
            // EOF, with or without error
            ok(!this._ended && !this._endPending);
            this._endPending = eof;
            let ender = this._ender; // Ensure calling without `this`
            this._ender = undefined; // Prevent calling again
            // Call with end error or override with abort reason if any
            let enderArg = this._abortPromise ? this._abortReason : eof.error;
            this._readBusy = track(Promise.resolve(eof).then((eofValue) => ender(enderArg)));
        } else {
            this._readBusy = track(writer.value.promise.then(this._reader));
        }
        this._readBusy.promise.then(this._pumper, this._pumper);
    }
}
function defaultEnder(err?: Error): void | Promise<void> {
    if (err) {
        return Promise.reject(err);
    }
}
const EOF = new Error("eof");
class Eof {
    public error?: Error;
    public result?: PromiseLike<void>;
    constructor(error?: Error, result?: PromiseLike<void>) {
        this.error = error;
        this.result = result;
    }
}