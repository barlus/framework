// This is a simple adaptation to TypeScript of the reference implementation (as of May 2015):
// https://github.com/whatwg/streams/blob/master/reference-implementation/lib/transform-stream.js
import {Source,Sink,Transform} from './interfaces';
import {ReadableStream, ReadableStreamController} from './readable';
import {WritableStream} from './writable';

/**
 * A `TransformStream` is both readable and writable. Its purpose is to apply some transform logic to everything that
 * is written to it and provide the transformed data via its reader. As such, it requires no `ReadableStream`,
 * `WritableStream`, or `Source` or `Sink` to be supplied - it provides its own.
 *
 * It does require an object that implements the {@link Transform} interface to be supplied. The `transform` method
 * will be applied to all data written to the stream.
 *
 * The readable stream API is available via the `TransformStream`'s `readable` property, which is a
 * {@link ReadableStream}. The writable stream API is available via the `TransformStream`'s `writable` property, which
 * is a {@link WritableStream}.
 */
export class TransformStream<R, W> {
    readonly readable: ReadableStream<R>;
    readonly writable: WritableStream<W>;

    constructor(transformer: Transform<R, W>) {
        let writeChunk: W | undefined;
        let writeDone: () => void;
        let errorWritable: (error?: any) => void;
        let transforming = false;
        let chunkWrittenButNotYetTransformed = false;
        let enqueueInReadable: () => void;
        let closeReadable: (error?: any) => void;
        let errorReadable: (error?: any) => void;
        function maybeDoTransform() {
            if (!transforming) {
                transforming = true;
                try {
                    transformer.transform(writeChunk, enqueueInReadable, transformDone);
                    writeChunk = undefined;
                    chunkWrittenButNotYetTransformed = false;
                } catch (e) {
                    transforming = false;
                    errorWritable(e);
                    errorReadable(e);
                }
            }
        }
        function transformDone() {
            transforming = false;
            writeDone();
        }
        this.writable = new WritableStream<W>(<Sink<W>> {
            abort(): Promise<void> {
                return Promise.resolve();
            },

            start(error: (error?: any) => void) {
                errorWritable = error;
                return Promise.resolve();
            },

            write(chunk: W) {
                writeChunk = chunk;
                chunkWrittenButNotYetTransformed = true;
                const promise = new Promise<void>(function (resolve) {
                    writeDone = resolve;
                });
                maybeDoTransform();
                return promise;
            },

            close(): Promise<void> {
                try {
                    transformer.flush(enqueueInReadable, closeReadable);
                    return Promise.resolve();
                } catch (e) {
                    errorWritable(e);
                    errorReadable(e);
                    return Promise.reject(e);
                }
            }
        }, transformer.writableStrategy);
        this.readable = new ReadableStream(<Source<R>> {
            start(controller: ReadableStreamController<R>): Promise<void> {
                enqueueInReadable = controller.enqueue.bind(controller);
                closeReadable = controller.close.bind(controller);
                errorReadable = controller.error.bind(controller);
                return Promise.resolve();
            },

            pull(controller: ReadableStreamController<R>): Promise<void> {
                if (chunkWrittenButNotYetTransformed) {
                    maybeDoTransform();
                }
                return Promise.resolve();
            },

            cancel(): Promise<void> {
                return Promise.resolve();
            }
        }, transformer.readableStrategy);
    }
}
