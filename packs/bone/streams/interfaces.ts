import {ReadableStreamController} from './readable';

/**
 * Data size strategy
 */
export interface Strategy<T> {
    /**
     * Computes the number of items in a chunk.
     */
    readonly size?: (chunk: T | undefined | null) => number;
    /**
     * The number of chunks allowed in the queue before backpressure is applied.
     */
    highWaterMark?: number;
}
export interface KwArgs {
    highWaterMark: number;
}
/**
 * Options used when piping a readable stream to a writable stream.
 */
export interface PipeOptions {
    /**
     * Prevents the writable stream from erroring if the readable stream encounters an error.
     */
    preventAbort?: boolean;

    /**
     *  Prevents the readable stream from erroring if the writable stream encounters an error.
     */
    preventCancel?: boolean;

    /**
     * Prevents the writable stream from closing when the pipe operation completes.
     */
    preventClose?: boolean;
}
/**
 * The Source interface defines the methods a module can implement to create a source for a {@link ReadableStream}.
 *
 * The Stream API provides a consistent stream API while {@link ReadableStream.Source} and {@link WritableStream.Sink}
 * implementations provide the logic to connect a stream to specific data sources & sinks.
 */
export interface Source<T> {
    /**
     * Tells the source to prepare for providing chunks to the stream.  While the source may enqueue chunks at this
     * point, it is not required.
     *
     * @param controller The source can use the controller to enqueue chunks, close the stream or report an error.
     * @returns A promise that resolves when the source's start operation has finished.  If the promise rejects,
     *        the stream will be errored.
     */
    start?(controller: ReadableStreamController<T>): Promise<void>;
    /**
     * Requests that source enqueue chunks.  Use the controller to close the stream when no more chunks can
     * be provided.
     *
     * @param controller The source can use the controller to enqueue chunks, close the stream or report an error.
     * @returns A promise that resolves when the source's pull operation has finished.  If the promise rejects,
     *        the stream will be errored.
     */
    pull?(controller: ReadableStreamController<T>): Promise<void>;
    /**
     * Optional method implemented by seekable sources to set the seek position. Use the controller to report an error.
     * @param controller The source can use the controller to report an error.
     * @param position The position in the stream to seek to.
     * @returns A promise that resolves to the new seek position when the source's seek operation has finished.  If the
     *    promise rejects, the stream will be errored.
     */
    seek?(controller: ReadableStreamController<T>, position: number): Promise<number>;
    /**
     * Indicates the stream is prematurely closing and allows the source to do any necessary clean up.
     *
     * @param reason The reason why the stream is closing.
     * @returns A promise that resolves when the source's pull operation has finished.  If the promise rejects,
     *        the stream will be errored.
     */
    cancel?(reason?: any): Promise<void>;
}
/**
 * The Sink interface defines the methods a module can implement to create a target sink for a `WritableStream`.
 *
 * The Stream API provides a consistent stream API while `ReadableStream.Source` and `WritableStream.Sink` implementors
 * provide the logic to connect a stream to specific data sources & sinks.
 */
export interface Sink<T> {
    /**
     * Indicates the stream is prematurely closing due to an error.  The sink should do any necessary cleanup
     * and release resources. When a stream calls `abort` it will discard any queued chunks. If the sink does not
     * provide an `abort` method then the stream will call `close` instead.
     *
     * @param reason The reason the stream is closing.
     */
    abort?(reason?: any): Promise<void>;
    /**
     * Indicates the stream is closing.  The sink should do any necessary cleanup and release resources. The stream
     * will not call this method until is has successfully written all queued chunks.
     */
    close?(): Promise<void>;
    /**
     * Requests the sink to prepare for receiving chunks.
     *
     * @param error An error callback that can be used at any time by the sink to indicate an error has occurred.
     * @returns A promise that resolves when the sink's start operation has finished.  If the promise rejects,
     *        the stream will be errored.
     */
    start?(error: (error: Error) => void): Promise<void>;
    /**
     * Requests the sink write a chunk.
     *
     * @param chunk The chunk to be written.
     * @returns A promise that resolves when the sink's write operation has finished.  If the promise rejects,
     *        the stream will be errored.
     */
    write?(chunk: T): Promise<void>;
}
/**
 * The `Transform` interface defines the requirements for a transform object to be supplied to a
 * {@link TransformStream} instance.
 */
export interface Transform<R, W> {
    /**
     * The `transform` method should accept a chunk, an `enqueueInReadable` function, and a `transformDone` function.
     * The chunk is the data to be transformed. The transform function should perform any transform logic on the chunk
     * and then call the supplied `enqueueInReadable` function, passing it the transformed data. After that it should
     * call the supplied `transformDone` function to notify the `TransformStream` that transformation is complete.
     */
    transform(chunk: W | undefined, enqueueInReadable: (chunk: R) => void, transformDone: () => void): void;

    /**
     * The `flush` method will be called by the `TransformStream` when its {@link WritableStream} is closed. Any logic
     * the transformer may wish to run when the stream is closed can be supplied in this function. Any pending data
     * can still be enqueued using the supplied `enqueue` function. When the transformer has finished transforming all
     * data and is ready to close the {@link ReadableStream} it should call the supplied `close` function.
     */
    flush(enqueue: Function, close: Function): void;

    /**
     * If supplied, this strategy will be used for the `Transformer`'s internal {@link ReadableStream}
     */
    readableStrategy: Strategy<R>;

    /**
     * If supplied, this strategy will be used for the `Transformer`'s internal {@link WritableStream}
     */
    writableStrategy: Strategy<W>;
}
