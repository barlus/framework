import * as native from "zlib";
import {Buffer}    from './buffer';
import {builtin}   from './builtin';
import {Transform} from './stream';


export interface ZlibOptions {
  flush?: number; // default: zlib.constants.Z_NO_FLUSH
  finishFlush?: number; // default: zlib.constants.Z_FINISH
  chunkSize?: number; // default: 16*1024
  windowBits?: number;
  level?: number; // compression only
  memLevel?: number; // compression only
  strategy?: number; // compression only
  dictionary?: Buffer | DataView | ArrayBuffer; // deflate/inflate only, empty dictionary by default
}

export interface Zlib {
  readonly bytesRead: number;
  close(callback?: () => void): void;
  flush(kind?: number | (() => void), callback?: () => void): void;
}

export interface ZlibParams {
  params(level: number, strategy: number, callback: () => void): void;
}

export interface ZlibReset {
  reset(): void;
}

export interface Gzip extends Transform, Zlib {
}
export interface Gunzip extends Transform, Zlib {
}
export interface Deflate extends Transform, Zlib, ZlibReset, ZlibParams {
}
export interface Inflate extends Transform, Zlib, ZlibReset {
}
export interface DeflateRaw extends Transform, Zlib, ZlibReset, ZlibParams {
}
export interface InflateRaw extends Transform, Zlib, ZlibReset {
}
export interface Unzip extends Transform, Zlib {
}
type InputType = string | Buffer | DataView | ArrayBuffer ;

@builtin(native, (module) => {
  Object.getOwnPropertyNames(module).forEach(key => {
    Object.defineProperty(Zlib, key, Object.getOwnPropertyDescriptor(module, key))
  });
  return Zlib;
})
export class Zlib {
  static Z_NO_FLUSH: number;
  static Z_PARTIAL_FLUSH: number;
  static Z_SYNC_FLUSH: number;
  static Z_FULL_FLUSH: number;
  static Z_FINISH: number;
  static Z_BLOCK: number;
  static Z_TREES: number;
  static Z_OK: number;
  static Z_STREAM_END: number;
  static Z_NEED_DICT: number;
  static Z_ERRNO: number;
  static Z_STREAM_ERROR: number;
  static Z_DATA_ERROR: number;
  static Z_MEM_ERROR: number;
  static Z_BUF_ERROR: number;
  static Z_VERSION_ERROR: number;
  static Z_NO_COMPRESSION: number;
  static Z_BEST_SPEED: number;
  static Z_BEST_COMPRESSION: number;
  static Z_DEFAULT_COMPRESSION: number;
  static Z_DEFAULT_WINDOWBITS: number;
  static Z_FILTERED: number;
  static Z_HUFFMAN_ONLY: number;
  static Z_RLE: number;
  static Z_FIXED: number;
  static Z_DEFAULT_STRATEGY: number;
  static Z_BINARY: number;
  static Z_TEXT: number;
  static Z_ASCII: number;
  static Z_UNKNOWN: number;
  static Z_DEFLATED: number;
  static createGzip?(options?: ZlibOptions): Gzip;
  static createGunzip?(options?: ZlibOptions): Gunzip;
  static createDeflate?(options?: ZlibOptions): Deflate;
  static createInflate?(options?: ZlibOptions): Inflate;
  static createDeflateRaw?(options?: ZlibOptions): DeflateRaw;
  static createInflateRaw?(options?: ZlibOptions): InflateRaw;
  static createUnzip?(options?: ZlibOptions): Unzip;
  static deflate?(buf: InputType, callback: (error: Error | null, result: Buffer) => void): void;
  static deflate?(buf: InputType, options: ZlibOptions, callback: (error: Error | null, result: Buffer) => void): void;
  static deflateSync?(buf: InputType, options?: ZlibOptions): Buffer;
  static deflateRaw?(buf: InputType, callback: (error: Error | null, result: Buffer) => void): void;
  static deflateRaw?(buf: InputType, options: ZlibOptions, callback: (error: Error | null, result: Buffer) => void): void;
  static deflateRawSync?(buf: InputType, options?: ZlibOptions): Buffer;
  static gzip?(buf: InputType, callback: (error: Error | null, result: Buffer) => void): void;
  static gzip?(buf: InputType, options: ZlibOptions, callback: (error: Error | null, result: Buffer) => void): void;
  static gzipSync?(buf: InputType, options?: ZlibOptions): Buffer;
  static gunzip?(buf: InputType, callback: (error: Error | null, result: Buffer) => void): void;
  static gunzip?(buf: InputType, options: ZlibOptions, callback: (error: Error | null, result: Buffer) => void): void;
  static gunzipSync?(buf: InputType, options?: ZlibOptions): Buffer;
  static inflate?(buf: InputType, callback: (error: Error | null, result: Buffer) => void): void;
  static inflate?(buf: InputType, options: ZlibOptions, callback: (error: Error | null, result: Buffer) => void): void;
  static inflateSync?(buf: InputType, options?: ZlibOptions): Buffer;
  static inflateRaw?(buf: InputType, callback: (error: Error | null, result: Buffer) => void): void;
  static inflateRaw?(buf: InputType, options: ZlibOptions, callback: (error: Error | null, result: Buffer) => void): void;
  static inflateRawSync?(buf: InputType, options?: ZlibOptions): Buffer;
  static unzip?(buf: InputType, callback: (error: Error | null, result: Buffer) => void): void;
  static unzip?(buf: InputType, options: ZlibOptions, callback: (error: Error | null, result: Buffer) => void): void;
  static unzipSync?(buf: InputType, options?: ZlibOptions): Buffer;
}