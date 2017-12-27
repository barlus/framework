import {Transform} from "./stream";
import {Buffer} from './buffer';

export interface ZlibOptions {
    flush?: number; // default: zlib.constants.Z_NO_FLUSH
    finishFlush?: number; // default: zlib.constants.Z_FINISH
    chunkSize?: number; // default: 16*1024
    windowBits?: number;
    level?: number; // compression only
    memLevel?: number; // compression only
    strategy?: number; // compression only
    dictionary?: any; // deflate/inflate only, empty dictionary by default
}

export interface Gzip extends Transform { }
export interface Gunzip extends Transform { }
export interface Deflate extends Transform { }
export interface Inflate extends Transform { }
export interface DeflateRaw extends Transform { }
export interface InflateRaw extends Transform { }
export interface Unzip extends Transform { }

export declare function createGzip(options?: ZlibOptions): Gzip;
export declare function createGunzip(options?: ZlibOptions): Gunzip;
export declare function createDeflate(options?: ZlibOptions): Deflate;
export declare function createInflate(options?: ZlibOptions): Inflate;
export declare function createDeflateRaw(options?: ZlibOptions): DeflateRaw;
export declare function createInflateRaw(options?: ZlibOptions): InflateRaw;
export declare function createUnzip(options?: ZlibOptions): Unzip;
export declare function deflate(buf: Buffer | string, callback: (error: Error | null, result: Buffer) => void): void;
export declare function deflate(buf: Buffer | string, options: ZlibOptions, callback: (error: Error | null, result: Buffer) => void): void;
export declare function deflateSync(buf: Buffer | string, options?: ZlibOptions): Buffer;
export declare function deflateRaw(buf: Buffer | string, callback: (error: Error | null, result: Buffer) => void): void;
export declare function deflateRaw(buf: Buffer | string, options: ZlibOptions, callback: (error: Error | null, result: Buffer) => void): void;
export declare function deflateRawSync(buf: Buffer | string, options?: ZlibOptions): Buffer;
export declare function gzip(buf: Buffer | string, callback: (error: Error | null, result: Buffer) => void): void;
export declare function gzip(buf: Buffer | string, options: ZlibOptions, callback: (error: Error | null, result: Buffer) => void): void;
export declare function gzipSync(buf: Buffer | string, options?: ZlibOptions): Buffer;
export declare function gunzip(buf: Buffer | string, callback: (error: Error | null, result: Buffer) => void): void;
export declare function gunzip(buf: Buffer | string, options: ZlibOptions, callback: (error: Error | null, result: Buffer) => void): void;
export declare function gunzipSync(buf: Buffer | string, options?: ZlibOptions): Buffer;
export declare function inflate(buf: Buffer | string, callback: (error: Error | null, result: Buffer) => void): void;
export declare function inflate(buf: Buffer | string, options: ZlibOptions, callback: (error: Error | null, result: Buffer) => void): void;
export declare function inflateSync(buf: Buffer | string, options?: ZlibOptions): Buffer;
export declare function inflateRaw(buf: Buffer | string, callback: (error: Error | null, result: Buffer) => void): void;
export declare function inflateRaw(buf: Buffer | string, options: ZlibOptions, callback: (error: Error | null, result: Buffer) => void): void;
export declare function inflateRawSync(buf: Buffer | string, options?: ZlibOptions): Buffer;
export declare function unzip(buf: Buffer | string, callback: (error: Error | null, result: Buffer) => void): void;
export declare function unzip(buf: Buffer | string, options: ZlibOptions, callback: (error: Error | null, result: Buffer) => void): void;
export declare function unzipSync(buf: Buffer | string, options?: ZlibOptions): Buffer;

// Constants
export declare const Z_NO_FLUSH: number;
export declare const Z_PARTIAL_FLUSH: number;
export declare const Z_SYNC_FLUSH: number;
export declare const Z_FULL_FLUSH: number;
export declare const Z_FINISH: number;
export declare const Z_BLOCK: number;
export declare const Z_TREES: number;
export declare const Z_OK: number;
export declare const Z_STREAM_END: number;
export declare const Z_NEED_DICT: number;
export declare const Z_ERRNO: number;
export declare const Z_STREAM_ERROR: number;
export declare const Z_DATA_ERROR: number;
export declare const Z_MEM_ERROR: number;
export declare const Z_BUF_ERROR: number;
export declare const Z_VERSION_ERROR: number;
export declare const Z_NO_COMPRESSION: number;
export declare const Z_BEST_SPEED: number;
export declare const Z_BEST_COMPRESSION: number;
export declare const Z_DEFAULT_COMPRESSION: number;
export declare const Z_FILTERED: number;
export declare const Z_HUFFMAN_ONLY: number;
export declare const Z_RLE: number;
export declare const Z_FIXED: number;
export declare const Z_DEFAULT_STRATEGY: number;
export declare const Z_BINARY: number;
export declare const Z_TEXT: number;
export declare const Z_ASCII: number;
export declare const Z_UNKNOWN: number;
export declare const Z_DEFLATED: number;