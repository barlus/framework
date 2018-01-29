import {Strategy, PipeOptions, Source} from './interfaces';
import {SizeQueue} from './sizeing';
import {TransformStream} from './transform';
import * as util from './util';
import {WritableStream, WritableState} from './writable';
export interface ReadRequest<T> {
	promise: Promise<ReadResult<T>>;
	resolve: (value: ReadResult<T>) => void;
	reject: (reason: any) => void;
}
/**
 * Represents the objects returned by {@link ReadableStreamReader#read}. The data is accessible on the `value` property.
 * If the `done` property is true, the stream has no more data to provide.
 */
export interface ReadResult<T> {
	value: T | undefined;
	done: boolean;
}
/**
 * `ReadableStream`'s possible states
 */
export enum ReadableState { Readable, Closed, Errored }
/**
 * Implementation of a readable stream.
 */
export class ReadableStream<T> {

	// ShouldReadableStreamPull
	protected get _allowPull(): boolean {
		return !this.pullScheduled &&
			!this.closeRequested &&
			this._started &&
			this.state !== ReadableState.Closed &&
			this.state !== ReadableState.Errored &&
			!this._shouldApplyBackPressure();
	}

	/**
	 * Returns a number indicating how much additional data can be pushed by the source to the stream's queue before it
	 * exceeds its `highWaterMark`. An underlying source should use this information to determine when and how to apply
	 * backpressure.
	 *
	 * @returns The stream's strategy's `highWaterMark` value minus the queue size
	 */
	// 3.5.7. GetReadableStreamDesiredSize ( stream )
	get desiredSize(): number {
		return this._strategy.highWaterMark! - this.queueSize;
	}

	get hasSource(): boolean {
		return this._underlyingSource != null;
	}

	/**
	 * A stream can only have one reader at a time. This value indicates if a stream already has a reader, and hence
	 * cannot be read from other than by that reader. When a consumer is done with a reader they can dissociate it
	 * by calling {@link ReadableStreamReader#releaseLock}.
	 *
	 * @returns True if the stream has a reader associated with it
	 */
	// IsReadableStreamLocked
	get locked(): boolean {
		return this.hasSource && !!this.reader;
	}

	get readable(): boolean {
		return this.hasSource && this.state === ReadableState.Readable;
	}

	/**
	 * This promise will resolve when the stream's underlying source has started and is ready to provide data. If
	 * the {@link ReadableStreamReader#read} method is called before the stream has started it will not do anything.
	 * Wait for this promise to resolve to ensure that your `read` calls are responded to as promptly as possible.
	 *
	 * @returns A promise that resolves when the stream is ready to be read from.
	 */
	get started(): Promise<void> {
		return this._startedPromise;
	}

	get queueSize(): number {
		return this.queue.totalSize;
	}

	protected _pullingPromise: Promise<void> | undefined;
	protected _started: boolean;
	protected readonly _startedPromise: Promise<void>;
	protected readonly _strategy: Strategy<T>;
	protected _underlyingSource: Source<T>;

	closeRequested = false;
	controller: ReadableStreamController<T>;
	pullScheduled: boolean;
	readonly queue: SizeQueue<T>;
	reader: ReadableStreamReader<T> | undefined;
	state: ReadableState;
	storedError: Error;

	/**
	 * A `ReadableStream` requires an underlying source to supply data. The source interacts with the stream through
	 * a {@link ReadableStreamController} that is associated with the stream, and provided to the source.
	 *
	 * @constructor
	 * @param underlyingSource The source object that supplies data to the stream by interacting with its controller.
	 * @param strategy The strategy for this stream.
	 */
	constructor(underlyingSource: Source<T>, strategy: Strategy<T> = {}) {
		if (!underlyingSource) {
			throw new Error('An ReadableStream Source must be provided.');
		}
		this.state = ReadableState.Readable;
		this._underlyingSource = underlyingSource;
		this.controller = new ReadableStreamController(this);
		this._strategy = util.normalizeStrategy(strategy);
		this.queue = new SizeQueue<T>();
		this._startedPromise = new Promise<void>((resolveStarted) => {
			const startResult = util.promiseInvokeOrNoop(this._underlyingSource, 'start', [this.controller]);
			startResult.then(() => {
				this._started = true;
				resolveStarted();
				this.pull();
			}, (error: Error) => {
				this.error(error);
			});
		});
	}

	protected _cancel(reason?: any): Promise<void> {
		// 3.2.4.1-3: return cancelReadableStream(this, reason);
		if (this.state === ReadableState.Closed) {
			return Promise.resolve();
		}

		if (this.state === ReadableState.Errored) {
			return Promise.reject(new TypeError('3.5.3-2: WritableState is errored'));
		}

		this.queue.empty();
		this.close();
		return util.promiseInvokeOrNoop(this._underlyingSource, 'cancel', [reason]).then(function () {
		});
	}

	// shouldReadableStreamApplyBackPressure
	protected _shouldApplyBackPressure(): boolean {
		const queueSize = this.queue.totalSize;

		return queueSize > this._strategy.highWaterMark!;
	}

	/**
	 *
	 * @param reason A description of the reason the stream is being canceled.
	 * @returns A promise that resolves when the stream has closed and the call to the underlying source's `cancel`
	 * method has completed.
	 */
	cancel(reason?: any): Promise<void> {
		if (!this.hasSource) {
			return Promise.reject(new TypeError('3.2.4.1-1: Must be a ReadableStream'));
		}

		return this._cancel(reason);
	}

	/**
	 * Closes the stream without regard to the status of the queue.  Use {@link requestClose} to close the
	 * stream and allow the queue to flush.
	 *
	 */
	// 3.5.4. FinishClosingReadableStream ( stream )
	close(): void {
		if (this.state !== ReadableState.Readable) {
			return;
		}

		this.state = ReadableState.Closed;

		if (this.locked && this.reader) {
			this.reader.release();
		}
	}

	// EnqueueInReadableStream
	enqueue(chunk: T): void {
		const size = this._strategy.size;
		if (!this.readable || this.closeRequested) {
			throw new Error('3.5.6-1,2: Stream._state should be Readable and stream.closeRequested should be true');
		}
		if (!this.locked || (this.reader && !this.reader.resolveReadRequest(chunk))) {
			try {
				let chunkSize = 1;
				if (size) {
					chunkSize = size(chunk);
				}
				this.queue.enqueue(chunk, chunkSize);
			}
			catch (error) {
				this.error(error);
				throw error;
			}
		}
		this.pull();
	}

	error(error: Error): void {
		if (this.state === ReadableState.Errored) {
			return;
		}
		else if (this.state !== ReadableState.Readable) {
			throw new Error('3.5.7-1: WritableState must be Readable');
		}
		this.queue.empty();
		this.storedError = error;
		this.state = ReadableState.Errored;
		if (this.locked && this.reader) {
			this.reader.release();
		}
	}

	/**
	 * create a new {@link ReadableStreamReader} and lock the stream to the new reader
	 */
	// AcquireReadableStreamReader
	getReader(): ReadableStreamReader<T> {
		if (!this.readable) {
			throw new TypeError('3.2.4.2-1: must be a ReadableStream instance');
		}
		return new ReadableStreamReader(this);
	}

	pipeThrough(transformStream: TransformStream<T, any>, options?: PipeOptions): ReadableStream<T> {
		this.pipeTo(transformStream.writable, options);
		return transformStream.readable;
	}

	pipeTo(dest: WritableStream<T>, options: PipeOptions = {}): Promise<void> {
		let resolvePipeToPromise: () => void;
		let rejectPipeToPromise: (error: Error) => void;
		let closedPurposefully = false;
		let lastRead: any;
		let reader: ReadableStreamReader<T>;

		function doPipe(): void {
			lastRead = reader.read();
			Promise.all([lastRead, dest.ready]).then(function (result) {
				const readResult = result ? result[0] : null;
				if (readResult.done) {
					closeDest();
				}
				else if (dest.state === WritableState.Writable) {
					dest.write(readResult.value).then(
						() => {
							doPipe();
						},
						() => {
						}
					);

				}
			}, () => {
			});
		}

		function cancelSource(reason: any): void {
			if (!options.preventCancel) {
				reader.cancel(reason).catch(() => {
				});
				rejectPipeToPromise(reason);
			}
			else {
				lastRead.then(function () {
					reader.releaseLock();
					rejectPipeToPromise(reason);
				});
			}
		}

		function closeDest(): void {
			const destState = dest.state;
			if (!options.preventClose &&
				(destState === WritableState.Waiting || destState === WritableState.Writable)) {

				closedPurposefully = true;
				dest.close().then(resolvePipeToPromise, rejectPipeToPromise);
			}
			else {
				resolvePipeToPromise();
			}
		}

		return new Promise<void>((resolve, reject) => {
			resolvePipeToPromise = resolve;
			rejectPipeToPromise = reject;

			reader = this.getReader();
			reader.closed.catch((reason: any) => {
				// abortDest
				if (!options.preventAbort) {
					dest.abort(reason);
				}
				rejectPipeToPromise(reason);
			});

			dest.closed.then(
				function () {
					if (!closedPurposefully) {
						cancelSource(new TypeError('destination is closing or closed and cannot be piped to anymore'));
					}
				},
				cancelSource
			);
			doPipe();
		});
	}

	// RequestReadableStreamPull
	pull(): void {
		if (!this._allowPull) {
			return;
		}
		if (this._pullingPromise) {
			this.pullScheduled = true;
			this._pullingPromise.then(() => {
				this.pullScheduled = false;
				this.pull();
			});
			return;
		}
		this._pullingPromise = util.promiseInvokeOrNoop(this._underlyingSource, 'pull', [this.controller]);
		this._pullingPromise.then(() => {
			this._pullingPromise = undefined;
		}, (error: Error) => {
			this.error(error);
		});
	}

	/**
	 * Requests the stream be closed.  This method allows the queue to be emptied before the stream closes.
	 */
	// 3.5.3. CloseReadableStream ( stream )
	requestClose(): void {
		if (this.closeRequested || this.state !== ReadableState.Readable) {
			return;
		}
		this.closeRequested = true;
		if (this.queue.length === 0) {
			this.close();
		}
	}

	/**
	 * Tee a readable stream, returning a two-element array containing
	 * the two resulting ReadableStream instances
	 */
	// TeeReadableStream
	tee(): [ReadableStream<T>, ReadableStream<T>] {
		if (!this.readable) {
			throw new TypeError('3.2.4.5-1: must be a ReadableSream');
		}

		let branch1: ReadableStream<T>;
		let branch2: ReadableStream<T>;

		const reader = this.getReader();
		const teeState: any = {
			closedOrErrored: false,
			canceled1: false,
			canceled2: false,
			reason1: undefined,
			reason2: undefined
		};
		teeState.promise = new Promise(function (resolve) {
			teeState._resolve = resolve;
		});

		const createCancelFunction = (branch: number) => {
			return (reason?: any): Promise<void> => {
				teeState['canceled' + branch] = true;
				teeState['reason' + branch] = reason;
				if (teeState['canceled' + (branch === 1 ? 2 : 1)]) {
					const cancelResult = this._cancel([teeState.reason1, teeState.reason2]);
					teeState._resolve(cancelResult);
				}
				return teeState.promise;
			};
		};

		const pull = function (controller: ReadableStreamController<T>) {
			return reader.read().then(function (result: any) {
				const value = result.value;
				const done = result.done;

				if (done && !teeState.closedOrErrored) {
					branch1.requestClose();
					branch2.requestClose();

					teeState.closedOrErrored = true;
				}

				if (teeState.closedOrErrored) {
					return;
				}

				if (!teeState.canceled1) {
					branch1.enqueue(value);
				}

				if (!teeState.canceled2) {
					branch2.enqueue(value);
				}
			});
		};

		const cancel1 = createCancelFunction(1);
		const cancel2 = createCancelFunction(2);
		const underlyingSource1: Source<T> = <Source<T>> {
			pull: pull,
			cancel: cancel1
		};
		branch1 = new ReadableStream(underlyingSource1);

		const underlyingSource2: Source<T> = <Source<T>> {
			pull: pull,
			cancel: cancel2
		};
		branch2 = new ReadableStream(underlyingSource2);

		reader.closed.catch(function (r: any) {
			if (teeState.closedOrErrored) {
				return;
			}

			branch1.error(r);
			branch2.error(r);
			teeState.closedOrErrored = true;
		});

		return [branch1, branch2];
	}
}
export class ReadableStreamController<T> {
	private readonly _controlledReadableStream: ReadableStream<T>;

	/**
	 * Returns a number indicating how much additional data can be pushed by the source to the stream's queue before it
	 * exceeds its `highWaterMark`. An underlying source should use this information to determine when and how to apply
	 * backpressure.
	 *
	 * @returns The stream's strategy's `highWaterMark` value minus the queue size
	 */
	// 3.3.4.1. get desiredSize
	get desiredSize(): number {
		return this._controlledReadableStream.desiredSize;
	}

	constructor(stream: ReadableStream<T>) {
		if (!stream.readable) {
			throw new TypeError('3.3.3-1: ReadableStreamController can only be constructed with a ReadableStream instance');
		}

		if (stream.controller !== undefined) {
			throw new TypeError('ReadableStreamController instances can only be created by the ReadableStream constructor');
		}

		this._controlledReadableStream = stream;
	}

	/**
	 * A source should call this method when it has no more data to provide. After this method is called, the stream
	 * will provided any queued data to the reader, but once the stream's queue is exhausted the stream will be closed
	 * and no more data can be read from it.
	 */
	close(): void {
		if (!isReadableStreamController(this)) {
			throw new TypeError('3.3.4.2-1: ReadableStreamController#close can only be used on a ReadableStreamController');
		}

		const stream = this._controlledReadableStream;
		if (stream.closeRequested) {
			throw new TypeError('3.3.4.2-3: The stream has already been closed; do not close it again!');
		}

		if (stream.state === ReadableState.Errored) {
			throw new TypeError('3.3.4.2-4: The stream is in an errored state and cannot be closed');
		}

		return stream.requestClose();
	}

	/**
	 * A source should call this method to provide data to the stream.
	 *
	 * @param chunk The data to provide to the stream
	 */
	enqueue(chunk: T): void {
		if (!isReadableStreamController(this)) {
			throw new TypeError('3.3.4.3-1: ReadableStreamController#enqueue can only be used on a ReadableStreamController');
		}

		const stream = this._controlledReadableStream;

		if (stream.state === ReadableState.Errored) {
			throw stream.storedError;
		}

		if (stream.closeRequested) {
			throw new TypeError('3.3.4.3-4: stream is draining');
		}

		stream.enqueue(chunk);
	}

	/**
	 * A source should call this method to indicate an error condition to the stream that irreparably disrupts the
	 * source's (and thus the stream's) ability to provide all the intended data.
	 *
	 * @param error An error object representing the error condition in the source
	 */
	error(error: Error): void {
		if (!isReadableStreamController(this)) {
			throw new TypeError('3.3.4.3-1: ReadableStreamController#enqueue can only be used on a ReadableStreamController');
		}

		if (this._controlledReadableStream.state !== ReadableState.Readable) {
			throw new TypeError(`3.3.4.3-2: the stream is ${this._controlledReadableStream.state} and so cannot be errored`);
		}
		// return errorReadableStream(this._controlledReadableStream, e);
		this._controlledReadableStream.error(error);
	}
}
/**
 * This class provides the interface for reading data from a stream. A reader can by acquired by calling
 * {@link ReadableStream#getReader}. A {@link ReadableStream} can only have a single reader at any time. A reader can
 * be released from the stream by calling {@link ReadableStreamReader.releaseLock}. If the stream still has data, a new
 * reader can be acquired to read from the stream.
 */
export class ReadableStreamReader<T> {
	get closed(): Promise<void> {
		return this._closedPromise;
	}

	private _closedPromise: Promise<void>;
	private _storedError: Error | undefined;
	private _readRequests: ReadRequest<T>[];
	private _resolveClosedPromise: () => void;
	private _rejectClosedPromise: (error: Error) => void;

	protected _ownerReadableStream: ReadableStream<T> | undefined;

	state: ReadableState;

	constructor(stream: ReadableStream<T>) {
		if (!stream.readable) {
			throw new TypeError('3.4.3-1: stream must be a ReadableStream');
		}

		if (stream.locked) {
			throw new TypeError('3.4.3-2: stream cannot be locked');
		}

		stream.reader = this;
		this._ownerReadableStream = stream;
		this.state = ReadableState.Readable;
		this._storedError = undefined;
		this._readRequests = [];
		this._closedPromise = new Promise<void>((resolve, reject) => {
			this._resolveClosedPromise = resolve;
			this._rejectClosedPromise = reject;
		});

		this._closedPromise.catch(() => {
		});
	}

	/**
	 * Cancel a stream. The reader is released and the stream is closed. {@link ReadableStream.Source#cancel} is
	 * called with the provided `reason`.
	 *
	 * @param reason The reason for canceling the stream
	 */
	cancel(reason: string): Promise<void> {
		if (!isReadableStreamReader(this)) {
			return Promise.reject(new TypeError('3.4.4.2-1: Must be a ReadableStreamReader instance'));
		}

		if (this.state === ReadableState.Closed) {
			return Promise.resolve();
		}

		const storedError = <Error> this._storedError;
		if (this.state === ReadableState.Errored) {
			return Promise.reject(storedError);
		}

		if (this._ownerReadableStream && this._ownerReadableStream.state === ReadableState.Readable) {
			return this._ownerReadableStream.cancel(reason);
		}

		// 3.4.4.2-4,5 - the spec calls for this to throw an error. We have changed it to reject instead
		return Promise.reject(new TypeError('3.4.4.2-4,5: Cannot cancel ReadableStreamReader'));
	}

	/**
	 * Read data from the stream.
	 *
	 * @returns A promise that resolves to a {@link ReadResult}.
	 */
	// This method also incorporates the ReadFromReadableStreamReader from 3.5.12.
	read(): Promise<ReadResult<T>> {
		if (!isReadableStreamReader(this)) {
			return Promise.reject<ReadResult<T>>(new TypeError('3.4.4.3-1: Must be a ReadableStreamReader instance'));
		}

		if (this.state === ReadableState.Closed) {
			return Promise.resolve({
				value: undefined,
				done: true
			});
		}

		if (this.state === ReadableState.Errored) {
			return Promise.reject<ReadResult<T>>(new TypeError('3.5.12-2: reader state is Errored'));
		}

		const stream = this._ownerReadableStream;
		if (!stream || stream.state !== ReadableState.Readable) {
			throw new TypeError('3.5.12-3,4: Stream must exist and be readable');
		}

		const queue = stream.queue;
		if (queue.length > 0) {
			const chunk = queue.dequeue();
			if (stream.closeRequested && !queue.length) {
				stream.close();
			}
			else {
				stream.pull();
			}
			return Promise.resolve({
				value: <any> chunk,
				done: false
			});
		}
		else {
			let readResolve: (value: ReadResult<T>) => void = () => {
			};
			let readReject: (reason: any) => void = () => {
			};

			let readPromise = new Promise<ReadResult<T>>((resolve, reject) => {
				readResolve = resolve;
				readReject = reject;
			});

			this._readRequests.push({
				promise: readPromise,
				resolve: readResolve,
				reject: readReject
			});

			stream.pull();

			return readPromise;
		}
	}

	/**
	 * Release a reader's lock on the corresponding stream. The reader will no longer be readable. Further reading on
	 * the stream can be done by acquiring a new `ReadableStreamReader`.
	 */
	// 3.4.4.4. releaseLock()
	releaseLock(): void {
		if (!isReadableStreamReader(this)) {
			throw new TypeError('3.4.4.4-1: Must be a ReadableStreamReader isntance');
		}

		if (!this._ownerReadableStream) {
			return;
		}

		if (this._readRequests.length) {
			throw new TypeError('3.4.4.4-3: Tried to release a reader lock when that reader has pending read calls un-settled');
		}

		this.release();
	}

	// 3.5.13. ReleaseReadableStreamReader ( reader )
	release(): void {
		let request: any;
		if (this._ownerReadableStream && this._ownerReadableStream.state === ReadableState.Errored) {
			this.state = ReadableState.Errored;

			const e = this._ownerReadableStream.storedError;
			this._storedError = e;
			this._rejectClosedPromise(e);

			for (request of this._readRequests) {
				request.reject(e);
			}
		}
		else {
			this.state = ReadableState.Closed;
			this._resolveClosedPromise();
			for (request of this._readRequests) {
				request.resolve({
					value: undefined,
					done: true
				});
			}
		}

		this._readRequests = [];
		if (this._ownerReadableStream) {
			this._ownerReadableStream.reader = undefined;
		}
		this._ownerReadableStream = undefined;
	}

	/**
	 * Resolves a pending read request, if any, with the provided chunk.
	 * @param chunk
	 * @return boolean True if a read request was resolved.
	 */
	resolveReadRequest(chunk: T): boolean {
		if (this._readRequests.length > 0) {
			const readRequest = this._readRequests.shift();
			if (readRequest) {
				readRequest.resolve({
					value: chunk,
					done: false
				});
				return true;
			}
		}
		return false;
	}
}
// 3.5.9-1 has been ignored
function isReadableStreamController(x: any): boolean {
	return Object.prototype.hasOwnProperty.call(x, '_controlledReadableStream');
}
function isReadableStreamReader<T>(readableStreamReader: ReadableStreamReader<T>): boolean {
	return Object.prototype.hasOwnProperty.call(readableStreamReader, '_ownerReadableStream');
}

