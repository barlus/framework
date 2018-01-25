export interface Transform<In, Out> {
    (readable: Readable<In>, writable: Writable<Out>): void;
}

/**
 * Required methods for both readable and writable parts of a stream.
 */
export interface Common<T> {
    /**
     * Obtain a promise that resolves when all parts of a stream chain have
     * completely ended.
     *
     * Specifically:
     * - `end()` has been called (possibly with an Error),
     * - `ender` callback has run and its returned promise resolved,
     * - `end()`'s result parameter (if any) has been resolved.
     *
     * @return Promise resolved when stream chain has completely ended
     */
    result(): Promise<void>;

    /**
     * Signal stream abort.
     *
     * If an `aborter` callback is set by `forEach()` and the stream has not
     * ended yet, it will (asynchronously) be called with the abort reason, to
     * allow early termination of pending operation(s).
     *
     * If a reader is currently processing a value (i.e. a promise returned from
     * a read callback is not resolved yet), that operation is still allowed to
     * complete (although it can e.g. be cancelled by the `aborter` callback
     * to `forEach()`).
     *
     * Any pending and future `write()`s after that will be rejected with the
     * given error.
     *
     * The stream is not ended until the writer explicitly `end()`s the stream,
     * after which the stream's `ender` callback is called with the abort error
     * (i.e. any error passed to `end()` is ignored).
     *
     * The abort is ignored if the stream is already aborted.
     * Note that it's possible to abort an ended stream, to allow the abort to
     * 'bubble' to other parts in a chain of streams, which may not have ended
     * yet. It will not change the end-state of this part of the stream though.
     *
     * @param reason Error value to signal a reason for the abort
     */
    abort(reason: Error): void;

    /**
     * Obtain promise that resolves to a rejection when `abort()` is called.
     *
     * Useful to pass abort to upstream sources.
     *
     * @return Promise that is rejected with abort error when stream is aborted
     */
    aborted(): Promise<void>;
}

/**
 * Required methods for the readable part of a stream.
 */
export interface Readable<T> extends Common<T> {
    /**
     * Read all values from stream, optionally waiting for explicit stream end.
     *
     * `reader` is called for every written value.
     *
     * `ender` is called once, when the writer `end()`s the stream, either with
     * or without an error.
     *
     * `aborter` is called once if the stream is aborted and has not ended yet.
     *
     * `reader` and `ender` callbacks can return a promise to indicate when the
     * value or end-of-stream condition has been completely processed. This
     * ensures that a fast writer can never overload a slow reader, and is
     * called 'backpressure'.
     *
     * The corresponding `write()` or `end()` operation is blocked until the
     * value returned from the reader or ender callback is resolved. If the
     * callback throws an error or the returned promise resolves to a rejection,
     * the `write()` or `end()` will be rejected with it.
     *
     * All callbacks are always called asynchronously (i.e. some time
     * after `forEach()`, `write()`, `end()` or `abort()` returns), and their
     * `this` argument will be undefined.
     *
     * The `reader` and `ender` callbacks are never called again before their
     * previously returned promise is resolved/rejected.
     *
     * The `aborter` callback can be called while a reader callback's promise is
     * still pending, and should try to let `reader` or `ender` finish as fast
     * as possible. It will not be called after the output of `ender` has
     * resolved.
     *
     * If no `ender` is given, a default end handler is installed that returns
     * any stream end errors to the writer, and otherwise directly acknowledges
     * the end-of-stream.
     *
     * The return value of `forEach()` is `result()`, a promise that resolves
     * when all parts in the stream(-chain) have completely finished.
     *
     * It is an error to call `forEach()` multiple times.
     *
     * @param reader  Callback called with every written value
     * @param ender   Optional callback called when stream is ended
     * @param aborter Optional callback called when stream is aborted
     * @return Stream's end result (i.e. `result()`)
     */
    forEach(
        reader: (value: T) => void | PromiseLike<void>,
        ender?: (error?: Error) => void | PromiseLike<void>,
        aborter?: (error: Error) => void
    ): Promise<void>;
}

/**
 * Required methods for the writable part of a stream.
 */
export interface Writable<T> extends Common<T> {
    /**
     * Write value (or promise for value) to stream.
     *
     * Writer is blocked until the value is read by the read handler passed to
     * `forEach()`, and the value returned by that read handler is resolved.
     *
     * It is an error to write an `undefined` value (as this is a common
     * programming error). Writing a promise for a void is currently allowed,
     * but discouraged.
     *
     * The promise returned by `write()` will be rejected with the same reason if:
     * - the written value is a PromiseLike that resolves to a rejection
     * - the read handler throws an error or returns a rejected promise
     * It is still possible to write another value after that, or e.g. `end()`
     * the stream with or without an error.
     *
     * @param value Value to write, or promise for it
     * @return Void-promise that resolves when value was processed by reader
     */
    write(value: T | PromiseLike<T>): Promise<void>;

    /**
     * End the stream, optionally passing an error.
     *
     * Already pending writes will be processed by the reader passed to
     * `forEach()` before passing the end-of-stream to its end handler.
     *
     * The returned promise will resolve after the end handler has finished
     * processing. It is rejected if the end handler throws an error or returns
     * a rejected promise.
     *
     * All calls to `write()` or `end()` after the first `end()` will be
     * rejected with a `WriteAfterEndError`.
     *
     * By default, this stream's `result()` will be resolved when `end()`
     * resolves, or rejected with the error if `end()` is called with an error.
     * It is possible to let this stream's `result()` 'wait' until any upstream
     * streams have completed by e.g. passing that upstream's `result()` as the
     * second argument to `end()`.
     *
     * @param  error Optional Error to pass to `forEach()` end handler
     * @param  result Optional promise that determines final value of `result()`
     * @return Void-promise that resolves when end-handler has processed the
     *         end-of-stream
     */
    end(error?: Error, result?: PromiseLike<void>): Promise<void>;
}

export interface CommonStream<T> {
    /**
     * Determine whether `end()` has been called on the stream, but the stream
     * is still processing it.
     *
     * @return true when `end()` was called but not acknowledged yet, false
     *         otherwise
     */
    isEnding(): boolean;

    /**
     * Determine whether stream has completely ended (i.e. end handler has been
     * called and its return PromiseLike, if any, is resolved).
     *
     * @return true when stream has ended, false otherwise
     */
    isEnded(): boolean;

    /**
     * Determine whether `end()` has been called on the stream.
     *
     * @return true when `end()` was called
     */
    isEndingOrEnded(): boolean;

    /**
     * Determine whether `forEach()` callback(s) are currently attached to the
     * stream.
     *
     * @return true when `forEach()` has been called on this stream
     */
    hasReader(): boolean;
}

/**
 * Readable part of a generic Stream, which contains handy helpers such as
 * .map() in addition to the basic requirements of a Readable interface.
 */
export interface ReadableStream<T> extends Readable<T>, CommonStream<T> {
    /**
     * Run all input values through a mapping callback, which must produce a new
     * value (or promise for a value), similar to e.g. `Array`'s `map()`.
     *
     * Stream end in the input stream (normal or with error) will be passed to
     * the output stream, after awaiting the result of the optional ender.
     *
     * Any error (thrown or rejection) in mapper or ender is returned to the
     * input stream.
     *
     * @param mapper  Callback which receives each value from this stream, and
     *                must produce a new value (or promise for a value)
     * @param ender   Called when stream is ending, result is waited for before
     *                passing on `end()`
     * @param aborter Called when stream is aborted
     * @return New stream with mapped values
     */
    map<R>(
        mapper: (value: T) => R | PromiseLike<R>,
        ender?: (error?: Error) => void | PromiseLike<void>,
        aborter?: (error: Error) => void
    ): ReadableStream<R>;

    /**
     * Run all input values through a filtering callback. If the filter callback
     * returns a truthy value (or a promise for a truthy value), the input value
     * is written to the output stream, otherwise it is ignored.
     * Similar to e.g. `Array`'s `filter()`.
     *
     * Stream end in the input stream (normal or with error) will be passed to
     * the output stream, after awaiting the result of the optional ender.
     *
     * Any error (thrown or rejection) in mapper or ender is returned to the
     * input stream.
     *
     * @param filterer Callback which receives each value from this stream,
     *                 input value is written to output if callback returns a
     *                 (promise for) a truthy value.
     * @param ender    Called when stream is ending, result is waited for before
     *                 passing on `end()`
     * @param aborter  Called when stream is aborted
     * @return New stream with filtered values.
     */
    filter(
        filterer: (value: T) => boolean | PromiseLike<boolean>,
        ender?: (error?: Error) => void | PromiseLike<void>,
        aborter?: (error: Error) => void
    ): ReadableStream<T>;

    /**
     * Reduce the stream into a single value by calling a reducer callback for
     * each value in the stream. Similar to `Array#reduce()`.
     *
     * The output of the previous call to `reducer` (aka `accumulator`) is given
     * as the first argument of the next call. For the first call, either the
     * `initial` value to `reduce()` is passed, or the first value of the stream
     * is used (and `current` will be the second value).
     *
     * The result of `reduce()` is a promise for the last value returned by
     * `reducer` (or the initial value, if there were no calls to `reducer`).
     * If no initial value could be determined, the result is rejected with a
     * TypeError.
     * If the stream is ended with an error, the result is rejected with that
     * error.
     *
     * It is possible for `reducer` to return a promise for its result.
     *
     * If the `reducer` throws an error or returns a rejected promise, the
     * originating `write()` will fail with that error.
     *
     * Examples:
     * s.reduce((acc, val) => acc + val); // sums all values
     * s.reduce((acc, val) => { acc.push(val); return acc; }, []); // toArray()
     *
     * @param  reducer Callback called for each value in the stream, with
     *                 accumulator, current value, index of current value, and
     *                 this stream.
     * @param  initial Optional initial value for accumulator. If no initial
     *                 value is given, first value of stream is used.
     * @return Promise for final accumulator.
     */
    reduce(
        reducer: (accumulator: T, current: T, index: number, stream: ReadableStream<T>) => T | PromiseLike<T>,
        initial?: T
    ): Promise<T>;
    /**
     * Reduce the stream into a single value by calling a reducer callback for
     * each value in the stream. Similar to `Array#reduce()`.
     *
     * The output of the previous call to `reducer` (aka `accumulator`) is given
     * as the first argument of the next call. For the first call, either the
     * `initial` value to `reduce()` is passed, or the first value of the stream
     * is used (and `current` will be the second value).
     *
     * The result of `reduce()` is a promise for the last value returned by
     * `reducer` (or the initial value, if there were no calls to `reducer`).
     * If no initial value could be determined, the result is rejected with a
     * TypeError.
     * If the stream is ended with an error, the result is rejected with that
     * error.
     *
     * It is possible for `reducer` to return a promise for its result.
     *
     * If the `reducer` throws an error or returns a rejected promise, the
     * originating `write()` will fail with that error.
     *
     * Examples:
     * s.reduce((acc, val) => acc + val); // sums all values
     * s.reduce((acc, val) => { acc.push(val); return acc; }, []); // toArray()
     *
     * @param  reducer Callback called for each value in the stream, with
     *                 accumulator, current value, index of current value, and
     *                 this stream.
     * @param  initial Optional initial value for accumulator. If no initial
     *                 value is given, first value of stream is used.
     * @return Promise for final accumulator.
     */
    reduce<R>(
        reducer: (accumulator: R, current: T, index: number, stream: ReadableStream<T>) => R | PromiseLike<R>,
        initial: R
    ): Promise<R>;

    /**
     * Read all stream values into an array.
     *
     * Returns a promise that resolves to that array if the stream ends
     * normally, or to the error if the stream is ended with an error.
     *
     * @return Promise for an array of all stream values
     */
    toArray(): Promise<T[]>;

    /**
     * Read all values and end-of-stream from this stream, writing them to
     * `writable`.
     *
     * @param  writable Destination stream
     * @return The stream passed in, for easy chaining
     */
    pipe<R extends Writable<T>>(writable: R): R;

    /**
     * Return a new stream with the results of running the given
     * transform.
     *
     * @param transformer Function that receives this stream and result stream
     *                    as inputs.
     * @return Readable stream with the transformed results
     */
    transform<R>(transformer: Transform<T, R>): ReadableStream<R>;
}

/**
 * Writable part of a generic Stream, which contains handy helpers such as
 * .mappedBy() in addition to the basic requirements of a Writable interface.
 */
export interface WritableStream<T> extends Writable<T>, CommonStream<T> {
    /**
     * Repeatedly call `writer` and write its returned value (or promise for it)
     * to the stream.
     * The stream is ended when `writer` returns `undefined`.
     *
     * `writer` is only called when its previously returned value has been
     * processed by the stream.
     *
     * If writing of a value fails (either by the callback throwing an error,
     * returning a rejection, or the write call failing), the stream is aborted
     * and ended with that error.
     *
     * If ending of the stream fails with an error other than the abort error,
     * the program is terminated with an UnhandledEndError.
     *
     * NOTE Whether stream is aborted on error is still subject to change.
     *
     * @param writer Called when the next value can be written to the stream,
     *               should return (a promise for) a value to be written,
     *               or `undefined` (or void promise) to end the stream.
     * @return Stream for all values in the input array
     */
    writeEach(writer: () => T | PromiseLike<T> | void | PromiseLike<void>): Promise<void>;

    // TODO Experimental
    // TODO Not sure whether a 'reverse' function confuses more than it helps
    mappedBy<X>(mapper: (value: X) => T | PromiseLike<T>): WritableStream<X>;

    // TODO Experimental
    // TODO Not sure whether a 'reverse' function confuses more than it helps
    filterBy(filterer: (value: T) => boolean | PromiseLike<boolean>): WritableStream<T>;
}

export interface Deferred<T=void> {
    promise: Promise<T>;
    reject: (reason: Error) => void;
    resolve: (value?:T|PromiseLike<T>) => void;
}

/**
 * Used to track the status of a promise
 */
export interface TrackedPromise<T> {
    /**
     * Promise not fulfilled/rejected yet
     */
    isPending: boolean;
    /**
     * Promise is rejected; error is in 'reason' member
     */
    isRejected: boolean;
    /**
     * Promise is fulfilled, value is in 'value' member
     */
    isFulfilled: boolean;
    /**
     * The original promise
     */
    promise: PromiseLike<T>;
    /**
     * The error for a rejection
     */
    reason?: Error;
    /**
     * The value when fulfilled
     */
    value?: T;
}

export interface TrackedVoidPromise extends TrackedPromise<void> {
    value?: void;
}
