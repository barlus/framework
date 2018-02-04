import {} from './index';

import * as stream from "./stream";
import {Emitter} from "./events";
import { URL } from "./url";
import {Buffer, BufferEncoding} from './buffer';
import {ErrnoException} from './errors';
import {proxy} from "./proxy";

/**
 * Valid types for path values in "fs".
 */
export type PathLike = string | Buffer | URL;

export declare class Stats {
    isFile(): boolean;
    isDirectory(): boolean;
    isBlockDevice(): boolean;
    isCharacterDevice(): boolean;
    isSymbolicLink(): boolean;
    isFIFO(): boolean;
    isSocket(): boolean;
    dev: number;
    ino: number;
    mode: number;
    nlink: number;
    uid: number;
    gid: number;
    rdev: number;
    size: number;
    blksize: number;
    blocks: number;
    atimeMs: number;
    mtimeMs: number;
    ctimeMs: number;
    birthtimeMs: number;
    atime: Date;
    mtime: Date;
    ctime: Date;
    birthtime: Date;
}

export interface FSWatcher extends Emitter {
    close(): void;

    /**
     * events.EventEmitter
     *   1. change
     *   2. error
     */
    addListener(event: string, listener: (...args: any[]) => void): this;
    addListener(event: "change", listener: (eventType: string, filename: string | Buffer) => void): this;
    addListener(event: "error", listener: (error: Error) => void): this;

    on(event: string, listener: (...args: any[]) => void): this;
    on(event: "change", listener: (eventType: string, filename: string | Buffer) => void): this;
    on(event: "error", listener: (error: Error) => void): this;

    once(event: string, listener: (...args: any[]) => void): this;
    once(event: "change", listener: (eventType: string, filename: string | Buffer) => void): this;
    once(event: "error", listener: (error: Error) => void): this;

    prependListener(event: string, listener: (...args: any[]) => void): this;
    prependListener(event: "change", listener: (eventType: string, filename: string | Buffer) => void): this;
    prependListener(event: "error", listener: (error: Error) => void): this;

    prependOnceListener(event: string, listener: (...args: any[]) => void): this;
    prependOnceListener(event: "change", listener: (eventType: string, filename: string | Buffer) => void): this;
    prependOnceListener(event: "error", listener: (error: Error) => void): this;
}

export declare class ReadStream extends stream.Readable {
    close(): void;
    destroy(): void;
    bytesRead: number;
    path: string | Buffer;

    /**
     * events.EventEmitter
     *   1. open
     *   2. close
     */
    addListener(event: string, listener: (...args: any[]) => void): this;
    addListener(event: "open", listener: (fd: number) => void): this;
    addListener(event: "close", listener: () => void): this;

    on(event: string, listener: (...args: any[]) => void): this;
    on(event: "open", listener: (fd: number) => void): this;
    on(event: "close", listener: () => void): this;

    once(event: string, listener: (...args: any[]) => void): this;
    once(event: "open", listener: (fd: number) => void): this;
    once(event: "close", listener: () => void): this;

    prependListener(event: string, listener: (...args: any[]) => void): this;
    prependListener(event: "open", listener: (fd: number) => void): this;
    prependListener(event: "close", listener: () => void): this;

    prependOnceListener(event: string, listener: (...args: any[]) => void): this;
    prependOnceListener(event: "open", listener: (fd: number) => void): this;
    prependOnceListener(event: "close", listener: () => void): this;
}
export declare class WriteStream extends stream.Writable {
    close(): void;
    bytesWritten: number;
    path: string | Buffer;

    /**
     * events.EventEmitter
     *   1. open
     *   2. close
     */
    addListener(event: string, listener: (...args: any[]) => void): this;
    addListener(event: "open", listener: (fd: number) => void): this;
    addListener(event: "close", listener: () => void): this;

    on(event: string, listener: (...args: any[]) => void): this;
    on(event: "open", listener: (fd: number) => void): this;
    on(event: "close", listener: () => void): this;

    once(event: string, listener: (...args: any[]) => void): this;
    once(event: "open", listener: (fd: number) => void): this;
    once(event: "close", listener: () => void): this;

    prependListener(event: string, listener: (...args: any[]) => void): this;
    prependListener(event: "open", listener: (fd: number) => void): this;
    prependListener(event: "close", listener: () => void): this;

    prependOnceListener(event: string, listener: (...args: any[]) => void): this;
    prependOnceListener(event: "open", listener: (fd: number) => void): this;
    prependOnceListener(event: "close", listener: () => void): this;
}

/**
 * Asynchronous rename(2) - Change the name or location of a file or directory.
 * @param oldPath A path to a file. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 * @param newPath A path to a file. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 */
export declare function rename(oldPath: PathLike, newPath: PathLike, callback: (err: ErrnoException) => void): void;

/**
 * Synchronous rename(2) - Change the name or location of a file or directory.
 * @param oldPath A path to a file. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 * @param newPath A path to a file. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 */
export declare function renameSync(oldPath: PathLike, newPath: PathLike): void;

/**
 * Asynchronous truncate(2) - Truncate a file to a specified length.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param len If not specified, defaults to `0`.
 */
export declare function truncate(path: PathLike, len: number | undefined | null, callback: (err: ErrnoException) => void): void;

/**
 * Asynchronous truncate(2) - Truncate a file to a specified length.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 */
export declare function truncate(path: PathLike, callback: (err: ErrnoException) => void): void;

/**
 * Synchronous truncate(2) - Truncate a file to a specified length.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param len If not specified, defaults to `0`.
 */
export declare function truncateSync(path: PathLike, len?: number | null): void;

/**
 * Asynchronous ftruncate(2) - Truncate a file to a specified length.
 * @param fd A file descriptor.
 * @param len If not specified, defaults to `0`.
 */
export declare function ftruncate(fd: number, len: number | undefined | null, callback: (err: ErrnoException) => void): void;

/**
 * Asynchronous ftruncate(2) - Truncate a file to a specified length.
 * @param fd A file descriptor.
 */
export declare function ftruncate(fd: number, callback: (err: ErrnoException) => void): void;

/**
 * Synchronous ftruncate(2) - Truncate a file to a specified length.
 * @param fd A file descriptor.
 * @param len If not specified, defaults to `0`.
 */
export declare function ftruncateSync(fd: number, len?: number | null): void;

/**
 * Asynchronous chown(2) - Change ownership of a file.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 */
export declare function chown(path: PathLike, uid: number, gid: number, callback: (err: ErrnoException) => void): void;

/**
 * Synchronous chown(2) - Change ownership of a file.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 */
export declare function chownSync(path: PathLike, uid: number, gid: number): void;

/**
 * Asynchronous fchown(2) - Change ownership of a file.
 * @param fd A file descriptor.
 */
export declare function fchown(fd: number, uid: number, gid: number, callback: (err: ErrnoException) => void): void;

/**
 * Synchronous fchown(2) - Change ownership of a file.
 * @param fd A file descriptor.
 */
export declare function fchownSync(fd: number, uid: number, gid: number): void;

/**
 * Asynchronous lchown(2) - Change ownership of a file. Does not dereference symbolic links.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 */
export declare function lchown(path: PathLike, uid: number, gid: number, callback: (err: ErrnoException) => void): void;


/**
 * Synchronous lchown(2) - Change ownership of a file. Does not dereference symbolic links.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 */
export declare function lchownSync(path: PathLike, uid: number, gid: number): void;

/**
 * Asynchronous chmod(2) - Change permissions of a file.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param mode A file mode. If a string is passed, it is parsed as an octal integer.
 */
export declare function chmod(path: PathLike, mode: string | number, callback: (err: ErrnoException) => void): void;


/**
 * Synchronous chmod(2) - Change permissions of a file.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param mode A file mode. If a string is passed, it is parsed as an octal integer.
 */
export declare function chmodSync(path: PathLike, mode: string | number): void;

/**
 * Asynchronous fchmod(2) - Change permissions of a file.
 * @param fd A file descriptor.
 * @param mode A file mode. If a string is passed, it is parsed as an octal integer.
 */
export declare function fchmod(fd: number, mode: string | number, callback: (err: ErrnoException) => void): void;


/**
 * Synchronous fchmod(2) - Change permissions of a file.
 * @param fd A file descriptor.
 * @param mode A file mode. If a string is passed, it is parsed as an octal integer.
 */
export declare function fchmodSync(fd: number, mode: string | number): void;

/**
 * Asynchronous lchmod(2) - Change permissions of a file. Does not dereference symbolic links.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param mode A file mode. If a string is passed, it is parsed as an octal integer.
 */
export declare function lchmod(path: PathLike, mode: string | number, callback: (err: ErrnoException) => void): void;

/**
 * Synchronous lchmod(2) - Change permissions of a file. Does not dereference symbolic links.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param mode A file mode. If a string is passed, it is parsed as an octal integer.
 */
export declare function lchmodSync(path: PathLike, mode: string | number): void;

/**
 * Asynchronous stat(2) - Get file status.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 */
export declare function stat(path: PathLike, callback: (err: ErrnoException, stats: Stats) => void): void;


/**
 * Synchronous stat(2) - Get file status.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 */
export declare function statSync(path: PathLike): Stats;

/**
 * Asynchronous fstat(2) - Get file status.
 * @param fd A file descriptor.
 */
export declare function fstat(fd: number, callback: (err: ErrnoException, stats: Stats) => void): void;

/**
 * Synchronous fstat(2) - Get file status.
 * @param fd A file descriptor.
 */
export declare function fstatSync(fd: number): Stats;

/**
 * Asynchronous lstat(2) - Get file status. Does not dereference symbolic links.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 */
export declare function lstat(path: PathLike, callback: (err: ErrnoException, stats: Stats) => void): void;

// NOTE: This namespace provides design-time support for util.promisify. Exported members do not exist at runtime.
export declare namespace lstat {
    /**
     * Asynchronous lstat(2) - Get file status. Does not dereference symbolic links.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     */
    export function __promisify__(path: PathLike): Promise<Stats>;
}

/**
 * Synchronous lstat(2) - Get file status. Does not dereference symbolic links.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 */
export declare function lstatSync(path: PathLike): Stats;

/**
 * Asynchronous link(2) - Create a new link (also known as a hard link) to an existing file.
 * @param existingPath A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param newPath A path to a file. If a URL is provided, it must use the `file:` protocol.
 */
export declare function link(existingPath: PathLike, newPath: PathLike, callback: (err: ErrnoException) => void): void;

// NOTE: This namespace provides design-time support for util.promisify. Exported members do not exist at runtime.
export declare namespace link {
    /**
     * Asynchronous link(2) - Create a new link (also known as a hard link) to an existing file.
     * @param existingPath A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param newPath A path to a file. If a URL is provided, it must use the `file:` protocol.
     */
    export function link(existingPath: PathLike, newPath: PathLike): Promise<void>;
}

/**
 * Synchronous link(2) - Create a new link (also known as a hard link) to an existing file.
 * @param existingPath A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param newPath A path to a file. If a URL is provided, it must use the `file:` protocol.
 */
export declare function linkSync(existingPath: PathLike, newPath: PathLike): void;

/**
 * Asynchronous symlink(2) - Create a new symbolic link to an existing file.
 * @param target A path to an existing file. If a URL is provided, it must use the `file:` protocol.
 * @param path A path to the new symlink. If a URL is provided, it must use the `file:` protocol.
 * @param type May be set to `'dir'`, `'file'`, or `'junction'` (default is `'file'`) and is only available on Windows (ignored on other platforms).
 * When using `'junction'`, the `target` argument will automatically be normalized to an absolute path.
 */
export declare function symlink(target: PathLike, path: PathLike, type: string | undefined | null, callback: (err: ErrnoException) => void): void;

/**
 * Asynchronous symlink(2) - Create a new symbolic link to an existing file.
 * @param target A path to an existing file. If a URL is provided, it must use the `file:` protocol.
 * @param path A path to the new symlink. If a URL is provided, it must use the `file:` protocol.
 */
export declare function symlink(target: PathLike, path: PathLike, callback: (err: ErrnoException) => void): void;

// NOTE: This namespace provides design-time support for util.promisify. Exported members do not exist at runtime.
export declare namespace symlink {
    /**
     * Asynchronous symlink(2) - Create a new symbolic link to an existing file.
     * @param target A path to an existing file. If a URL is provided, it must use the `file:` protocol.
     * @param path A path to the new symlink. If a URL is provided, it must use the `file:` protocol.
     * @param type May be set to `'dir'`, `'file'`, or `'junction'` (default is `'file'`) and is only available on Windows (ignored on other platforms).
     * When using `'junction'`, the `target` argument will automatically be normalized to an absolute path.
     */
    export function __promisify__(target: PathLike, path: PathLike, type?: string | null): Promise<void>;
}

/**
 * Synchronous symlink(2) - Create a new symbolic link to an existing file.
 * @param target A path to an existing file. If a URL is provided, it must use the `file:` protocol.
 * @param path A path to the new symlink. If a URL is provided, it must use the `file:` protocol.
 * @param type May be set to `'dir'`, `'file'`, or `'junction'` (default is `'file'`) and is only available on Windows (ignored on other platforms).
 * When using `'junction'`, the `target` argument will automatically be normalized to an absolute path.
 */
export declare function symlinkSync(target: PathLike, path: PathLike, type?: string | null): void;

/**
 * Asynchronous readlink(2) - read value of a symbolic link.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
 */
export declare function readlink(path: PathLike, options: { encoding?: BufferEncoding | null } | BufferEncoding | undefined | null, callback: (err: ErrnoException, linkString: string) => void): void;

/**
 * Asynchronous readlink(2) - read value of a symbolic link.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
 */
export declare function readlink(path: PathLike, options: { encoding: "buffer" } | "buffer", callback: (err: ErrnoException, linkString: Buffer) => void): void;

/**
 * Asynchronous readlink(2) - read value of a symbolic link.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
 */
export declare function readlink(path: PathLike, options: { encoding?: string | null } | string | undefined | null, callback: (err: ErrnoException, linkString: string | Buffer) => void): void;

/**
 * Asynchronous readlink(2) - read value of a symbolic link.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 */
export declare function readlink(path: PathLike, callback: (err: ErrnoException, linkString: string) => void): void;

/**
 * Synchronous readlink(2) - read value of a symbolic link.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
 */
export declare function readlinkSync(path: PathLike, options?: { encoding?: BufferEncoding | null } | BufferEncoding | null): string;

/**
 * Synchronous readlink(2) - read value of a symbolic link.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
 */
export declare function readlinkSync(path: PathLike, options: { encoding: "buffer" } | "buffer"): Buffer;

/**
 * Synchronous readlink(2) - read value of a symbolic link.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
 */
export declare function readlinkSync(path: PathLike, options?: { encoding?: string | null } | string | null): string | Buffer;

/**
 * Asynchronous realpath(3) - return the canonicalized absolute pathname.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
 */
export declare function realpath(path: PathLike, options: { encoding?: BufferEncoding | null } | BufferEncoding | undefined | null, callback: (err: ErrnoException, resolvedPath: string) => void): void;

/**
 * Asynchronous realpath(3) - return the canonicalized absolute pathname.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
 */
export declare function realpath(path: PathLike, options: { encoding: "buffer" } | "buffer", callback: (err: ErrnoException, resolvedPath: Buffer) => void): void;

/**
 * Asynchronous realpath(3) - return the canonicalized absolute pathname.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
 */
export declare function realpath(path: PathLike, options: { encoding?: string | null } | string | undefined | null, callback: (err: ErrnoException, resolvedPath: string | Buffer) => void): void;

/**
 * Asynchronous realpath(3) - return the canonicalized absolute pathname.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 */
export declare function realpath(path: PathLike, callback: (err: ErrnoException, resolvedPath: string) => void): void;

/**
 * Synchronous realpath(3) - return the canonicalized absolute pathname.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
 */
export declare function realpathSync(path: PathLike, options?: { encoding?: BufferEncoding | null } | BufferEncoding | null): string;

/**
 * Synchronous realpath(3) - return the canonicalized absolute pathname.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
 */
export declare function realpathSync(path: PathLike, options: { encoding: "buffer" } | "buffer"): Buffer;

/**
 * Synchronous realpath(3) - return the canonicalized absolute pathname.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
 */
export declare function realpathSync(path: PathLike, options?: { encoding?: string | null } | string | null): string | Buffer;

/**
 * Asynchronous unlink(2) - delete a name and possibly the file it refers to.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 */
export declare function unlink(path: PathLike, callback: (err: ErrnoException) => void): void;

/**
 * Synchronous unlink(2) - delete a name and possibly the file it refers to.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 */
export declare function unlinkSync(path: PathLike): void;

/**
 * Asynchronous rmdir(2) - delete a directory.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 */
export declare function rmdir(path: PathLike, callback: (err: ErrnoException) => void): void;

/**
 * Synchronous rmdir(2) - delete a directory.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 */
export declare function rmdirSync(path: PathLike): void;

/**
 * Asynchronous mkdir(2) - create a directory.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param mode A file mode. If a string is passed, it is parsed as an octal integer. If not specified, defaults to `0o777`.
 */
export declare function mkdir(path: PathLike, mode: number | string | undefined | null, callback: (err: ErrnoException) => void): void;

/**
 * Asynchronous mkdir(2) - create a directory with a mode of `0o777`.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 */
export declare function mkdir(path: PathLike, callback: (err: ErrnoException) => void): void;

/**
 * Synchronous mkdir(2) - create a directory.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param mode A file mode. If a string is passed, it is parsed as an octal integer. If not specified, defaults to `0o777`.
 */
export declare function mkdirSync(path: PathLike, mode?: number | string | null): void;

/**
 * Asynchronously creates a unique temporary directory.
 * Generates six random characters to be appended behind a required prefix to create a unique temporary directory.
 * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
 */
export declare function mkdtemp(prefix: string, options: { encoding?: BufferEncoding | null } | BufferEncoding | undefined | null, callback: (err: ErrnoException, folder: string) => void): void;

/**
 * Asynchronously creates a unique temporary directory.
 * Generates six random characters to be appended behind a required prefix to create a unique temporary directory.
 * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
 */
export declare function mkdtemp(prefix: string, options: "buffer" | { encoding: "buffer" }, callback: (err: ErrnoException, folder: Buffer) => void): void;

/**
 * Asynchronously creates a unique temporary directory.
 * Generates six random characters to be appended behind a required prefix to create a unique temporary directory.
 * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
 */
export declare function mkdtemp(prefix: string, options: { encoding?: string | null } | string | undefined | null, callback: (err: ErrnoException, folder: string | Buffer) => void): void;

/**
 * Asynchronously creates a unique temporary directory.
 * Generates six random characters to be appended behind a required prefix to create a unique temporary directory.
 */
export declare function mkdtemp(prefix: string, callback: (err: ErrnoException, folder: string) => void): void;


/**
 * Synchronously creates a unique temporary directory.
 * Generates six random characters to be appended behind a required prefix to create a unique temporary directory.
 * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
 */
export declare function mkdtempSync(prefix: string, options?: { encoding?: BufferEncoding | null } | BufferEncoding | null): string;

/**
 * Synchronously creates a unique temporary directory.
 * Generates six random characters to be appended behind a required prefix to create a unique temporary directory.
 * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
 */
export declare function mkdtempSync(prefix: string, options: { encoding: "buffer" } | "buffer"): Buffer;

/**
 * Synchronously creates a unique temporary directory.
 * Generates six random characters to be appended behind a required prefix to create a unique temporary directory.
 * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
 */
export declare function mkdtempSync(prefix: string, options?: { encoding?: string | null } | string | null): string | Buffer;

/**
 * Asynchronous readdir(3) - read a directory.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
 */
export declare function readdir(path: PathLike, options: { encoding: BufferEncoding | null } | BufferEncoding | undefined | null, callback: (err: ErrnoException, files: string[]) => void): void;

/**
 * Asynchronous readdir(3) - read a directory.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
 */
export declare function readdir(path: PathLike, options: { encoding: "buffer" } | "buffer", callback: (err: ErrnoException, files: Buffer[]) => void): void;

/**
 * Asynchronous readdir(3) - read a directory.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
 */
export declare function readdir(path: PathLike, options: { encoding?: string | null } | string | undefined | null, callback: (err: ErrnoException, files: Array<string | Buffer>) => void): void;

/**
 * Asynchronous readdir(3) - read a directory.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 */
export declare function readdir(path: PathLike, callback: (err: ErrnoException, files: string[]) => void): void;

// NOTE: This namespace provides design-time support for util.promisify. Exported members do not exist at runtime.
export declare namespace readdir {
    /**
     * Asynchronous readdir(3) - read a directory.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
     */
    export function __promisify__(path: PathLike, options?: { encoding: BufferEncoding | null } | BufferEncoding | null): Promise<string[]>;

    /**
     * Asynchronous readdir(3) - read a directory.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
     */
    export function __promisify__(path: PathLike, options: "buffer" | { encoding: "buffer" }): Promise<Buffer[]>;

    /**
     * Asynchronous readdir(3) - read a directory.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
     */
    export function __promisify__(path: PathLike, options?: { encoding?: string | null } | string | null): Promise<Array<string | Buffer>>;
}

/**
 * Synchronous readdir(3) - read a directory.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
 */
export declare function readdirSync(path: PathLike, options?: { encoding: BufferEncoding | null } | BufferEncoding | null): string[];

/**
 * Synchronous readdir(3) - read a directory.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
 */
export declare function readdirSync(path: PathLike, options: { encoding: "buffer" } | "buffer"): Buffer[];

/**
 * Synchronous readdir(3) - read a directory.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
 */
export declare function readdirSync(path: PathLike, options?: { encoding?: string | null } | string | null): Array<string | Buffer>;

/**
 * Asynchronous close(2) - close a file descriptor.
 * @param fd A file descriptor.
 */
export declare function close(fd: number, callback: (err: ErrnoException) => void): void;


/**
 * Synchronous close(2) - close a file descriptor.
 * @param fd A file descriptor.
 */
export declare function closeSync(fd: number): void;

/**
 * Asynchronous open(2) - open and possibly create a file.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param mode A file mode. If a string is passed, it is parsed as an octal integer. If not supplied, defaults to `0o666`.
 */
export declare function open(path: PathLike, flags: string | number, mode: string | number | undefined | null, callback: (err: ErrnoException, fd: number) => void): void;

/**
 * Asynchronous open(2) - open and possibly create a file. If the file is created, its mode will be `0o666`.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 */
export declare function open(path: PathLike, flags: string | number, callback: (err: ErrnoException, fd: number) => void): void;

/**
 * Synchronous open(2) - open and possibly create a file, returning a file descriptor..
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param mode A file mode. If a string is passed, it is parsed as an octal integer. If not supplied, defaults to `0o666`.
 */
export declare function openSync(path: PathLike, flags: string | number, mode?: string | number | null): number;

/**
 * Asynchronously change file timestamps of the file referenced by the supplied path.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param atime The last access time. If a string is provided, it will be coerced to number.
 * @param mtime The last modified time. If a string is provided, it will be coerced to number.
 */
export declare function utimes(path: PathLike, atime: string | number | Date, mtime: string | number | Date, callback: (err: ErrnoException) => void): void;

/**
 * Synchronously change file timestamps of the file referenced by the supplied path.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param atime The last access time. If a string is provided, it will be coerced to number.
 * @param mtime The last modified time. If a string is provided, it will be coerced to number.
 */
export declare function utimesSync(path: PathLike, atime: string | number | Date, mtime: string | number | Date): void;

/**
 * Asynchronously change file timestamps of the file referenced by the supplied file descriptor.
 * @param fd A file descriptor.
 * @param atime The last access time. If a string is provided, it will be coerced to number.
 * @param mtime The last modified time. If a string is provided, it will be coerced to number.
 */
export declare function futimes(fd: number, atime: string | number | Date, mtime: string | number | Date, callback: (err: ErrnoException) => void): void;

/**
 * Synchronously change file timestamps of the file referenced by the supplied file descriptor.
 * @param fd A file descriptor.
 * @param atime The last access time. If a string is provided, it will be coerced to number.
 * @param mtime The last modified time. If a string is provided, it will be coerced to number.
 */
export declare function futimesSync(fd: number, atime: string | number | Date, mtime: string | number | Date): void;

/**
 * Asynchronous fsync(2) - synchronize a file's in-core state with the underlying storage device.
 * @param fd A file descriptor.
 */
export declare function fsync(fd: number, callback: (err: ErrnoException) => void): void;

/**
 * Synchronous fsync(2) - synchronize a file's in-core state with the underlying storage device.
 * @param fd A file descriptor.
 */
export declare function fsyncSync(fd: number): void;

/**
 * Asynchronously writes `buffer` to the file referenced by the supplied file descriptor.
 * @param fd A file descriptor.
 * @param offset The part of the buffer to be written. If not supplied, defaults to `0`.
 * @param length The number of bytes to write. If not supplied, defaults to `buffer.length - offset`.
 * @param position The offset from the beginning of the file where this data should be written. If not supplied, defaults to the current position.
 */
export declare function write<TBuffer extends Buffer | Uint8Array>(fd: number, buffer: TBuffer, offset: number | undefined | null, length: number | undefined | null, position: number | undefined | null, callback: (err: ErrnoException, written: number, buffer: TBuffer) => void): void;

/**
 * Asynchronously writes `buffer` to the file referenced by the supplied file descriptor.
 * @param fd A file descriptor.
 * @param offset The part of the buffer to be written. If not supplied, defaults to `0`.
 * @param length The number of bytes to write. If not supplied, defaults to `buffer.length - offset`.
 */
export declare function write<TBuffer extends Buffer | Uint8Array>(fd: number, buffer: TBuffer, offset: number | undefined | null, length: number | undefined | null, callback: (err: ErrnoException, written: number, buffer: TBuffer) => void): void;

/**
 * Asynchronously writes `buffer` to the file referenced by the supplied file descriptor.
 * @param fd A file descriptor.
 * @param offset The part of the buffer to be written. If not supplied, defaults to `0`.
 */
export declare function write<TBuffer extends Buffer | Uint8Array>(fd: number, buffer: TBuffer, offset: number | undefined | null, callback: (err: ErrnoException, written: number, buffer: TBuffer) => void): void;

/**
 * Asynchronously writes `buffer` to the file referenced by the supplied file descriptor.
 * @param fd A file descriptor.
 */
export declare function write<TBuffer extends Buffer | Uint8Array>(fd: number, buffer: TBuffer, callback: (err: ErrnoException, written: number, buffer: TBuffer) => void): void;

/**
 * Asynchronously writes `string` to the file referenced by the supplied file descriptor.
 * @param fd A file descriptor.
 * @param string A string to write. If something other than a string is supplied it will be coerced to a string.
 * @param position The offset from the beginning of the file where this data should be written. If not supplied, defaults to the current position.
 * @param encoding The expected string encoding.
 */
export declare function write(fd: number, string: any, position: number | undefined | null, encoding: string | undefined | null, callback: (err: ErrnoException, written: number, str: string) => void): void;

/**
 * Asynchronously writes `string` to the file referenced by the supplied file descriptor.
 * @param fd A file descriptor.
 * @param string A string to write. If something other than a string is supplied it will be coerced to a string.
 * @param position The offset from the beginning of the file where this data should be written. If not supplied, defaults to the current position.
 */
export declare function write(fd: number, string: any, position: number | undefined | null, callback: (err: ErrnoException, written: number, str: string) => void): void;

/**
 * Asynchronously writes `string` to the file referenced by the supplied file descriptor.
 * @param fd A file descriptor.
 * @param string A string to write. If something other than a string is supplied it will be coerced to a string.
 */
export declare function write(fd: number, string: any, callback: (err: ErrnoException, written: number, str: string) => void): void;

/**
 * Synchronously writes `buffer` to the file referenced by the supplied file descriptor, returning the number of bytes written.
 * @param fd A file descriptor.
 * @param offset The part of the buffer to be written. If not supplied, defaults to `0`.
 * @param length The number of bytes to write. If not supplied, defaults to `buffer.length - offset`.
 * @param position The offset from the beginning of the file where this data should be written. If not supplied, defaults to the current position.
 */
export declare function writeSync(fd: number, buffer: Buffer | Uint8Array, offset?: number | null, length?: number | null, position?: number | null): number;

/**
 * Synchronously writes `string` to the file referenced by the supplied file descriptor, returning the number of bytes written.
 * @param fd A file descriptor.
 * @param string A string to write. If something other than a string is supplied it will be coerced to a string.
 * @param position The offset from the beginning of the file where this data should be written. If not supplied, defaults to the current position.
 * @param encoding The expected string encoding.
 */
export declare function writeSync(fd: number, string: any, position?: number | null, encoding?: string | null): number;

/**
 * Asynchronously reads data from the file referenced by the supplied file descriptor.
 * @param fd A file descriptor.
 * @param buffer The buffer that the data will be written to.
 * @param offset The offset in the buffer at which to start writing.
 * @param length The number of bytes to read.
 * @param position The offset from the beginning of the file from which data should be read. If `null`, data will be read from the current position.
 */
export declare function read<TBuffer extends Buffer | Uint8Array>(fd: number, buffer: TBuffer, offset: number, length: number, position: number | null, callback?: (err: ErrnoException, bytesRead: number, buffer: TBuffer) => void): void;

/**
 * Synchronously reads data from the file referenced by the supplied file descriptor, returning the number of bytes read.
 * @param fd A file descriptor.
 * @param buffer The buffer that the data will be written to.
 * @param offset The offset in the buffer at which to start writing.
 * @param length The number of bytes to read.
 * @param position The offset from the beginning of the file from which data should be read. If `null`, data will be read from the current position.
 */
export declare function readSync(fd: number, buffer: Buffer | Uint8Array, offset: number, length: number, position: number | null): number;

/**
 * Asynchronously reads the entire contents of a file.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
 * @param options An object that may contain an optional flag.
 * If a flag is not provided, it defaults to `'r'`.
 */
export declare function readFile(path: PathLike | number, options: { encoding?: null; flag?: string; } | undefined | null, callback: (err: ErrnoException, data: Buffer) => void): void;

/**
 * Asynchronously reads the entire contents of a file.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
 * @param options Either the encoding for the result, or an object that contains the encoding and an optional flag.
 * If a flag is not provided, it defaults to `'r'`.
 */
export declare function readFile(path: PathLike | number, options: { encoding: string; flag?: string; } | string, callback: (err: ErrnoException, data: string) => void): void;

/**
 * Asynchronously reads the entire contents of a file.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
 * @param options Either the encoding for the result, or an object that contains the encoding and an optional flag.
 * If a flag is not provided, it defaults to `'r'`.
 */
export declare function readFile(path: PathLike | number, options: { encoding?: string | null; flag?: string; } | string | undefined | null, callback: (err: ErrnoException, data: string | Buffer) => void): void;

/**
 * Asynchronously reads the entire contents of a file.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
 */
export declare function readFile(path: PathLike | number, callback: (err: ErrnoException, data: Buffer) => void): void;

/**
 * Synchronously reads the entire contents of a file.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
 * @param options An object that may contain an optional flag. If a flag is not provided, it defaults to `'r'`.
 */
export declare function readFileSync(path: PathLike | number, options?: { encoding?: null; flag?: string; } | null): Buffer;

/**
 * Synchronously reads the entire contents of a file.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
 * @param options Either the encoding for the result, or an object that contains the encoding and an optional flag.
 * If a flag is not provided, it defaults to `'r'`.
 */
export declare function readFileSync(path: PathLike | number, options: { encoding: string; flag?: string; } | string): string;

/**
 * Synchronously reads the entire contents of a file.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
 * @param options Either the encoding for the result, or an object that contains the encoding and an optional flag.
 * If a flag is not provided, it defaults to `'r'`.
 */
export declare function readFileSync(path: PathLike | number, options?: { encoding?: string | null; flag?: string; } | string | null): string | Buffer;

/**
 * Asynchronously writes data to a file, replacing the file if it already exists.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
 * @param data The data to write. If something other than a Buffer or Uint8Array is provided, the value is coerced to a string.
 * @param options Either the encoding for the file, or an object optionally specifying the encoding, file mode, and flag.
 * If `encoding` is not supplied, the default of `'utf8'` is used.
 * If `mode` is not supplied, the default of `0o666` is used.
 * If `mode` is a string, it is parsed as an octal integer.
 * If `flag` is not supplied, the default of `'w'` is used.
 */
export declare function writeFile(path: PathLike | number, data: any, options: { encoding?: string | null; mode?: number | string; flag?: string; } | string | undefined | null, callback: (err: ErrnoException) => void): void;

/**
 * Asynchronously writes data to a file, replacing the file if it already exists.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
 * @param data The data to write. If something other than a Buffer or Uint8Array is provided, the value is coerced to a string.
 */
export declare function writeFile(path: PathLike | number, data: any, callback: (err: ErrnoException) => void): void;

/**
 * Synchronously writes data to a file, replacing the file if it already exists.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
 * @param data The data to write. If something other than a Buffer or Uint8Array is provided, the value is coerced to a string.
 * @param options Either the encoding for the file, or an object optionally specifying the encoding, file mode, and flag.
 * If `encoding` is not supplied, the default of `'utf8'` is used.
 * If `mode` is not supplied, the default of `0o666` is used.
 * If `mode` is a string, it is parsed as an octal integer.
 * If `flag` is not supplied, the default of `'w'` is used.
 */
export declare function writeFileSync(path: PathLike | number, data: any, options?: { encoding?: string | null; mode?: number | string; flag?: string; } | string | null): void;

/**
 * Asynchronously append data to a file, creating the file if it does not exist.
 * @param file A path to a file. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
 * @param data The data to write. If something other than a Buffer or Uint8Array is provided, the value is coerced to a string.
 * @param options Either the encoding for the file, or an object optionally specifying the encoding, file mode, and flag.
 * If `encoding` is not supplied, the default of `'utf8'` is used.
 * If `mode` is not supplied, the default of `0o666` is used.
 * If `mode` is a string, it is parsed as an octal integer.
 * If `flag` is not supplied, the default of `'a'` is used.
 */
export declare function appendFile(file: PathLike | number, data: any, options: { encoding?: string | null, mode?: string | number, flag?: string } | string | undefined | null, callback: (err: ErrnoException) => void): void;

/**
 * Asynchronously append data to a file, creating the file if it does not exist.
 * @param file A path to a file. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
 * @param data The data to write. If something other than a Buffer or Uint8Array is provided, the value is coerced to a string.
 */
export declare function appendFile(file: PathLike | number, data: any, callback: (err: ErrnoException) => void): void;

/**
 * Synchronously append data to a file, creating the file if it does not exist.
 * @param file A path to a file. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
 * @param data The data to write. If something other than a Buffer or Uint8Array is provided, the value is coerced to a string.
 * @param options Either the encoding for the file, or an object optionally specifying the encoding, file mode, and flag.
 * If `encoding` is not supplied, the default of `'utf8'` is used.
 * If `mode` is not supplied, the default of `0o666` is used.
 * If `mode` is a string, it is parsed as an octal integer.
 * If `flag` is not supplied, the default of `'a'` is used.
 */
export declare function appendFileSync(file: PathLike | number, data: any, options?: { encoding?: string | null; mode?: number | string; flag?: string; } | string | null): void;

/**
 * Watch for changes on `filename`. The callback `listener` will be called each time the file is accessed.
 */
export declare function watchFile(filename: PathLike, options: { persistent?: boolean; interval?: number; } | undefined, listener: (curr: Stats, prev: Stats) => void): void;

/**
 * Watch for changes on `filename`. The callback `listener` will be called each time the file is accessed.
 * @param filename A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 */
export declare function watchFile(filename: PathLike, listener: (curr: Stats, prev: Stats) => void): void;

/**
 * Stop watching for changes on `filename`.
 * @param filename A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 */
export declare function unwatchFile(filename: PathLike, listener?: (curr: Stats, prev: Stats) => void): void;

/**
 * Watch for changes on `filename`, where `filename` is either a file or a directory, returning an `FSWatcher`.
 * @param filename A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 * @param options Either the encoding for the filename provided to the listener, or an object optionally specifying encoding, persistent, and recursive options.
 * If `encoding` is not supplied, the default of `'utf8'` is used.
 * If `persistent` is not supplied, the default of `true` is used.
 * If `recursive` is not supplied, the default of `false` is used.
 */
export declare function watch(filename: PathLike, options: { encoding?: BufferEncoding | null, persistent?: boolean, recursive?: boolean } | BufferEncoding | undefined | null, listener?: (event: string, filename: string) => void): FSWatcher;

/**
 * Watch for changes on `filename`, where `filename` is either a file or a directory, returning an `FSWatcher`.
 * @param filename A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 * @param options Either the encoding for the filename provided to the listener, or an object optionally specifying encoding, persistent, and recursive options.
 * If `encoding` is not supplied, the default of `'utf8'` is used.
 * If `persistent` is not supplied, the default of `true` is used.
 * If `recursive` is not supplied, the default of `false` is used.
 */
export declare function watch(filename: PathLike, options: { encoding: "buffer", persistent?: boolean, recursive?: boolean } | "buffer", listener?: (event: string, filename: Buffer) => void): FSWatcher;

/**
 * Watch for changes on `filename`, where `filename` is either a file or a directory, returning an `FSWatcher`.
 * @param filename A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 * @param options Either the encoding for the filename provided to the listener, or an object optionally specifying encoding, persistent, and recursive options.
 * If `encoding` is not supplied, the default of `'utf8'` is used.
 * If `persistent` is not supplied, the default of `true` is used.
 * If `recursive` is not supplied, the default of `false` is used.
 */
export declare function watch(filename: PathLike, options: { encoding?: string | null, persistent?: boolean, recursive?: boolean } | string | null, listener?: (event: string, filename: string | Buffer) => void): FSWatcher;

/**
 * Watch for changes on `filename`, where `filename` is either a file or a directory, returning an `FSWatcher`.
 * @param filename A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 */
export declare function watch(filename: PathLike, listener?: (event: string, filename: string) => any): FSWatcher;

/**
 * Asynchronously tests whether or not the given path exists by checking with the file system.
 * @deprecated
 * @param path A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 */
export declare function exists(path: PathLike, callback: (exists: boolean) => void): void;

/**
 * Synchronously tests whether or not the given path exists by checking with the file system.
 * @param path A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 */
export declare function existsSync(path: PathLike): boolean;

/**
 * Asynchronously tests a user's permissions for the file specified by path.
 * @param path A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 */
export declare function access(path: PathLike, mode: number | undefined, callback: (err: ErrnoException) => void): void;

/**
 * Asynchronously tests a user's permissions for the file specified by path.
 * @param path A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 */
export declare function access(path: PathLike, callback: (err: ErrnoException) => void): void;

/**
 * Synchronously tests a user's permissions for the file specified by path.
 * @param path A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 */
export declare function accessSync(path: PathLike, mode?: number): void;

/**
 * Returns a new `ReadStream` object.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 */
export declare function createReadStream(path: PathLike, options?: string | {
    flags?: string;
    encoding?: string;
    fd?: number;
    mode?: number;
    autoClose?: boolean;
    start?: number;
    end?: number;
    highWaterMark?: number;
}): ReadStream;

/**
 * Returns a new `WriteStream` object.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 */
export declare function createWriteStream(path: PathLike, options?: string | {
    flags?: string;
    encoding?: string;
    fd?: number;
    mode?: number;
    autoClose?: boolean;
    start?: number;
}): WriteStream;

/**
 * Asynchronous fdatasync(2) - synchronize a file's in-core state with storage device.
 * @param fd A file descriptor.
 */
export declare function fdatasync(fd: number, callback: (err: ErrnoException) => void): void;

/**
 * Synchronous fdatasync(2) - synchronize a file's in-core state with storage device.
 * @param fd A file descriptor.
 */
export declare function fdatasyncSync(fd: number): void;

/**
 * Asynchronously copies src to dest. By default, dest is overwritten if it already exists.
 * No arguments other than a possible exception are given to the callback function.
 * Node.js makes no guarantees about the atomicity of the copy operation.
 * If an error occurs after the destination file has been opened for writing, Node.js will attempt
 * to remove the destination.
 * @param src A path to the source file.
 * @param dest A path to the destination file.
 */
export declare function copyFile(src: PathLike, dest: PathLike, callback: (err: ErrnoException) => void): void;

/**
 * Asynchronously copies src to dest. By default, dest is overwritten if it already exists.
 * No arguments other than a possible exception are given to the callback function.
 * Node.js makes no guarantees about the atomicity of the copy operation.
 * If an error occurs after the destination file has been opened for writing, Node.js will attempt
 * to remove the destination.
 * @param src A path to the source file.
 * @param dest A path to the destination file.
 * @param flags An integer that specifies the behavior of the copy operation. The only supported flag is fs.constants.COPYFILE_EXCL, which causes the copy operation to fail if dest already exists.
 */
export declare function copyFile(src: PathLike, dest: PathLike, flags: number, callback: (err: ErrnoException) => void): void;

/**
 * Synchronously copies src to dest. By default, dest is overwritten if it already exists.
 * Node.js makes no guarantees about the atomicity of the copy operation.
 * If an error occurs after the destination file has been opened for writing, Node.js will attempt
 * to remove the destination.
 * @param src A path to the source file.
 * @param dest A path to the destination file.
 * @param flags An optional integer that specifies the behavior of the copy operation. The only supported flag is fs.constants.COPYFILE_EXCL, which causes the copy operation to fail if dest already exists.
 */
export declare function copyFileSync(src: PathLike, dest: PathLike, flags?: number): void;

proxy('fs', module);