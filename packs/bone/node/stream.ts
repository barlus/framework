import * as native    from "stream";
import {EventEmitter} from "./events";
import {Buffer}       from './buffer';
import {builtin}      from "./builtin";


export interface ReadableOptions {
  highWaterMark?: number;
  encoding?: string;
  objectMode?: boolean;
  read?: (this: Readable, size?: number) => any;
  destroy?: (error?: Error) => any;
}
export interface WritableOptions {
  highWaterMark?: number;
  decodeStrings?: boolean;
  objectMode?: boolean;
  write?: (chunk: string | Buffer, encoding: string, callback: Function) => any;
  writev?: (chunks: Array<{ chunk: string | Buffer, encoding: string }>, callback: Function) => any;
  destroy?: (error?: Error) => any;
  final?: (callback: (error?: Error) => void) => void;
}
export interface DuplexOptions extends ReadableOptions, WritableOptions {
  allowHalfOpen?: boolean;
  readableObjectMode?: boolean;
  writableObjectMode?: boolean;
}
export interface TransformOptions extends DuplexOptions {
  transform?: (chunk: string | Buffer, encoding: string, callback: Function) => any;
  flush?: (callback: Function) => any;
}
export interface ReadableStream extends EventEmitter {
  isTTY?: boolean
  readable: boolean;
  read?(size?: number): string | Buffer;
  setEncoding?(encoding: string): this;
  pause?(): this;
  resume?(): this;
  isPaused?(): boolean;
  pipe?<T extends WritableStream>(destination: T, options?: { end?: boolean; }): T;
  unpipe?<T extends WritableStream>(destination?: T): this;
  unshift?(chunk: string): void;
  unshift?(chunk: Buffer): void;
  wrap?(oldStream: ReadableStream): this;
}
export interface WritableStream extends EventEmitter {
  isTTY?: boolean
  writable: boolean;
  write?(buffer: Buffer | string, cb?: Function): boolean;
  write?(str: string, encoding?: string, cb?: Function): boolean;
  end?(): void;
  end?(buffer: Buffer, cb?: Function): void;
  end?(str: string, cb?: Function): void;
  end?(str: string, encoding?: string, cb?: Function): void;
}
export interface ReadWriteStream extends ReadableStream, WritableStream {
}

@builtin(native, (module) => module.Stream)
export class Stream extends EventEmitter {
}

@builtin(native, (module) => module.Readable)
export class Readable extends Stream implements ReadableStream {
  readable: boolean;
  constructor(opts?: ReadableOptions) {
    super();
    throw new Error('Must be overloaded by native');
  }
  _read?(size: number): void;
  read?(size?: number): any;
  setEncoding?(encoding: string): this;
  pause?(): this;
  resume?(): this;
  isPaused?(): boolean;
  unpipe?<T extends WritableStream>(destination?: T): this;
  unshift?(chunk: any): void;
  wrap?(oldStream: ReadableStream): this;
  push?(chunk: any, encoding?: string): boolean;
  _destroy?(err: Error, callback: Function): void;
  destroy?(error?: Error): void;
  pipe?<T extends WritableStream>(destination: T, options?: { end?: boolean }): T;
}

@builtin(native, (module) => module.Writable)
export class Writable extends Stream implements WritableStream {
  writable: boolean;
  constructor(opts?: WritableOptions) {
    super();
    throw new Error('Must be overloaded by native');
  }
  _write?(chunk: any, encoding: string, callback: (err?: Error) => void): void;
  _writev?(chunks: Array<{ chunk: any, encoding: string }>, callback: (err?: Error) => void): void;
  _destroy?(err: Error, callback: Function): void;
  _final?(callback: Function): void;
  write?(chunk: any, cb?: Function): boolean;
  write?(chunk: any, encoding?: string, cb?: Function): boolean;
  setDefaultEncoding?(encoding: string): this;
  end?(): void;
  end?(chunk: any, cb?: Function): void;
  end?(chunk: any, encoding?: string, cb?: Function): void;
  cork?(): void;
  uncork?(): void;
  destroy?(error?: Error): void;
}

@builtin(native, (module) => module.Duplex)
export class Duplex extends Readable implements Writable, ReadWriteStream {
  writable: boolean;
  constructor(opts?: DuplexOptions) {
    super();
    throw new Error('Must be overloaded by native');
  }
  _write?(chunk: any, encoding: string, callback: (err?: Error) => void): void;
  _writev?(chunks: Array<{ chunk: any, encoding: string }>, callback: (err?: Error) => void): void;
  _destroy?(err: Error, callback: Function): void;
  _final?(callback: Function): void;
  write?(chunk: any, cb?: Function): boolean;
  write?(chunk: any, encoding?: string, cb?: Function): boolean;
  setDefaultEncoding?(encoding: string): this;
  end?(): void;
  end?(chunk: any, cb?: Function): void;
  end?(chunk: any, encoding?: string, cb?: Function): void;
  cork?(): void;
  uncork?(): void;
}

@builtin(native, (module) => module.Transform)
export class Transform extends Duplex {
  constructor(opts?: TransformOptions) {
    super();
    throw new Error('Must be overloaded by native');
  }
  _transform?(chunk: any, encoding: string, callback: Function): void;
  destroy?(error?: Error): void;
}

@builtin(native, (module) => module.PassThrough)
export class PassThrough extends Transform {
}

export class AsyncStream {
  static async write(iterable: AsyncIterable<Buffer>, writable: Writable) {
    for await (const chunk of iterable) {
      if (chunk && chunk.length && Buffer.isBuffer(chunk)) {
        writable.write(chunk)
      }
    }
    writable.end();
  }
  static from(readable: Readable): AsyncIterableIterator<Buffer> {
    let started = false;
    let listening = false;
    const pullQueue = [];
    const pushQueue = [];
    const onError = (error: Error) => {
      done(error)
    };
    const onData = (data: Buffer) => {
      //console.info("CHUNK",data.length);
      push(data);
    };
    const onEnd = () => {
      //console.info("END");
      done();
    };
    const push = (event: Buffer) => {
      if (pullQueue.length !== 0) {
        pullQueue.shift().resolve({ value: event, done: false });
      } else {
        pushQueue.push(event);
      }
    };
    const pull = () => {
      return new Promise<IteratorResult<Buffer>>((resolve, reject) => {
        if (pushQueue.length !== 0) {
          resolve({ value: pushQueue.shift(), done: false });
        } else {
          pullQueue.push({ resolve, reject });
        }
      });
    };
    const start = () => {
      readable.addListener('data', onData);
      readable.addListener('end', onEnd);
      readable.addListener('error', onError);
    };
    const done = (error?: Error) => {
      readable.removeListener('data', onData);
      readable.removeListener('end', onEnd);
      readable.removeListener('error', onError);
      if (listening) {
        listening = false;
        //console.info(pullQueue.length,pushQueue.length);
        pullQueue.forEach((p) => {
          if (error) {
            p.reject(error);
          } else {
            p.resolve({ value: undefined, done: true })
          }
        });
        pullQueue.length = 0;
        pushQueue.length = 0;
      }
    };
    return {
      [ Symbol.asyncIterator ]() {
        return this;
      },
      async next(value?: any) {
        if (!started) {
          start();
          started = true;
          listening = true;
        }
        if (listening) {
          return pull()
        } else {
          return this.return()
        }
      },
      async return() {
        return { value: undefined, done: true };
      },
      async throw(error) {
        done(error);
        return Promise.reject(error);
      }
    };
  }
}
