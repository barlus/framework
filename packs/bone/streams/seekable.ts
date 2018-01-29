import {Strategy,Source} from './interfaces';
import {ReadResult,ReadableStream,ReadableStreamReader} from './readable';
export class SeekableStream<T> extends ReadableStream<T> {
    preventClose: boolean;
    reader: SeekableStreamReader<T>;

    /**
     * @param preventClose (default=true) Prevent the stream from closing when it reaches the end.
     * If true, the stream will not close when requestClose is called on the controller (which is typically done by the
     * source when it reaches its end). This allows for re-seeking in a stream that has already been read to the end.
     * The stream can be closed by calling ReadableStream#close.
     */
    constructor(underlyingSource: Source<T>, strategy: Strategy<T> = {}, preventClose: boolean = true) {
        super(underlyingSource, strategy);
        this.preventClose = preventClose;
    }

    getReader(): SeekableStreamReader<T> {
        if (!this.readable || !this.seek) {
            throw new TypeError('Must be a SeekableStream instance');
        }
        return new SeekableStreamReader(this);
    }

    requestClose(): void {
        if (!this.preventClose) {
            super.requestClose();
        }
    }

    seek(position: number): Promise<number> {
        if (this._underlyingSource.seek) {
            return this._underlyingSource.seek(this.controller, position);
        }
        else {
            if (this.reader && position < this.reader.currentPosition) {
                return Promise.reject(new Error('Stream source is not seekable; cannot seek backwards'));
            }
            else {
                let discardNext = (): Promise<number> => {
                    return this.reader.read().then((result: ReadResult<T>) => {
                        if (result.done || this.reader.currentPosition === position) {
                            return Promise.resolve(this.reader.currentPosition);
                        }
                        else {
                            return discardNext();
                        }
                    });
                };

                return discardNext();
            }
        }
    }

    get strategy() {
        return this._strategy;
    }
}
export class SeekableStreamReader<T> extends ReadableStreamReader<T> {
    protected _currentPosition = 0;
    protected _ownerReadableStream: SeekableStream<T>;

    get currentPosition(): number {
        return this._currentPosition;
    }

    read(): Promise<ReadResult<T>> {
        return super.read().then((result: ReadResult<T>) => {
            if (!result.done) {
                let chunkSize = 1;

                try {
                    if (this._ownerReadableStream.strategy && this._ownerReadableStream.strategy.size) {
                        chunkSize = this._ownerReadableStream.strategy.size(result.value);
                    }
                }
                catch (error) {
                    this._ownerReadableStream.error(error);

                    return Promise.reject(error);
                }

                this._currentPosition += chunkSize;
            }

            return Promise.resolve(result);
        }, function (error: Error) {
            return Promise.reject(error);
        });
    }

    seek(position: number): Promise<number> {
        if (position === this._currentPosition) {
            return Promise.resolve(this._currentPosition);
        }

        if (position < this._currentPosition) {
            this._ownerReadableStream.queue.empty();
        }

        // Drain the queue of any items prior to the desired seek position
        while (position > this._currentPosition && this._ownerReadableStream.queue.length) {
            let chunkSize = 1;
            let chunk = this._ownerReadableStream.queue.dequeue();

            if (this._ownerReadableStream.strategy && this._ownerReadableStream.strategy.size) {
                try {
                    chunkSize = this._ownerReadableStream.strategy.size(chunk);
                }
                catch (error) {
                    return Promise.reject(error);
                }
            }

            this._currentPosition += chunkSize;
        }

        // If there's anything left in the queue, we don't need to seek in the source, we can read from the queue
        if (this._ownerReadableStream.queue.length) {
            return Promise.resolve(this._currentPosition);
        }

        return this._ownerReadableStream.seek(position).then((position: number) => {
            this._currentPosition = position;

            return Promise.resolve(position);
        }, (error: Error) => {
            return Promise.reject(error);
        });
    }
}
