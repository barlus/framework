import * as native from "fs";
import {Readable, Writable} from "./stream";
import {EventEmitter} from "./events";
import {URL} from "./url";
import {Buffer, BufferEncoding} from './buffer';
import {builtin} from './builtin';

/**
 * Valid types for path values in "fs".
 */
export type PathLike = string | Buffer | URL;
export interface FSWatcher extends EventEmitter {
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
@builtin(native,(module)=>module.Stats)
export class Stats {
    isFile?(): boolean;
    isDirectory?(): boolean;
    isBlockDevice?(): boolean;
    isCharacterDevice?(): boolean;
    isSymbolicLink?(): boolean;
    isFIFO?(): boolean;
    isSocket?(): boolean;
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
@builtin(native,(module)=>module.ReadStream)
export class ReadStream extends Readable {
    close?(): void;
    destroy?(): void;
    bytesRead: number;
    path: string | Buffer;
}
@builtin(native,(module)=>module.WriteStream)
export class WriteStream extends Writable {
    close?(): void;
    bytesWritten: number;
    path: string | Buffer;
}
@builtin(native,(module)=>{
    Object.getOwnPropertyNames(module).forEach(key=>{
        Object.defineProperty(Fs,key,Object.getOwnPropertyDescriptor(module,key))
    })
    //Object.assign(Crypto,module);
    return Fs;
})
export class Fs {
    /**
     * Asynchronous rename(2) - Change the name or location of a file or directory.
     * @param oldPath A path to a file. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     * @param newPath A path to a file. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     */
    static rename?(oldPath: PathLike, newPath: PathLike, callback: (err: Error) => void): void;

    /**
     * Synchronous rename(2) - Change the name or location of a file or directory.
     * @param oldPath A path to a file. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     * @param newPath A path to a file. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     */
    static renameSync?(oldPath: PathLike, newPath: PathLike): void;

    /**
     * Asynchronous truncate(2) - Truncate a file to a specified length.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param len If not specified, defaults to `0`.
     */
    static truncate?(path: PathLike, len: number | undefined | null, callback: (err: Error) => void): void;

    /**
     * Asynchronous truncate(2) - Truncate a file to a specified length.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     */
    static truncate?(path: PathLike, callback: (err: Error) => void): void;

    /**
     * Synchronous truncate(2) - Truncate a file to a specified length.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param len If not specified, defaults to `0`.
     */
    static truncateSync?(path: PathLike, len?: number | null): void;

    /**
     * Asynchronous ftruncate(2) - Truncate a file to a specified length.
     * @param fd A file descriptor.
     * @param len If not specified, defaults to `0`.
     */
    static ftruncate?(fd: number, len: number | undefined | null, callback: (err: Error) => void): void;

    /**
     * Asynchronous ftruncate(2) - Truncate a file to a specified length.
     * @param fd A file descriptor.
     */
    static ftruncate?(fd: number, callback: (err: Error) => void): void;

    /**
     * Synchronous ftruncate(2) - Truncate a file to a specified length.
     * @param fd A file descriptor.
     * @param len If not specified, defaults to `0`.
     */
    static ftruncateSync?(fd: number, len?: number | null): void;

    /**
     * Asynchronous chown(2) - Change ownership of a file.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     */
    static chown?(path: PathLike, uid: number, gid: number, callback: (err: Error) => void): void;

    /**
     * Synchronous chown(2) - Change ownership of a file.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     */
    static chownSync?(path: PathLike, uid: number, gid: number): void;

    /**
     * Asynchronous fchown(2) - Change ownership of a file.
     * @param fd A file descriptor.
     */
    static fchown?(fd: number, uid: number, gid: number, callback: (err: Error) => void): void;

    /**
     * Synchronous fchown(2) - Change ownership of a file.
     * @param fd A file descriptor.
     */
    static fchownSync?(fd: number, uid: number, gid: number): void;

    /**
     * Asynchronous lchown(2) - Change ownership of a file. Does not dereference symbolic links.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     */
    static lchown?(path: PathLike, uid: number, gid: number, callback: (err: Error) => void): void;

    /**
     * Synchronous lchown(2) - Change ownership of a file. Does not dereference symbolic links.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     */
    static lchownSync?(path: PathLike, uid: number, gid: number): void;

    /**
     * Asynchronous chmod(2) - Change permissions of a file.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param mode A file mode. If a string is passed, it is parsed as an octal integer.
     */
    static chmod?(path: PathLike, mode: string | number, callback: (err: Error) => void): void;

    /**
     * Synchronous chmod(2) - Change permissions of a file.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param mode A file mode. If a string is passed, it is parsed as an octal integer.
     */
    static chmodSync?(path: PathLike, mode: string | number): void;

    /**
     * Asynchronous fchmod(2) - Change permissions of a file.
     * @param fd A file descriptor.
     * @param mode A file mode. If a string is passed, it is parsed as an octal integer.
     */
    static fchmod?(fd: number, mode: string | number, callback: (err: Error) => void): void;

    /**
     * Synchronous fchmod(2) - Change permissions of a file.
     * @param fd A file descriptor.
     * @param mode A file mode. If a string is passed, it is parsed as an octal integer.
     */
    static fchmodSync?(fd: number, mode: string | number): void;

    /**
     * Asynchronous lchmod(2) - Change permissions of a file. Does not dereference symbolic links.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param mode A file mode. If a string is passed, it is parsed as an octal integer.
     */
    static lchmod?(path: PathLike, mode: string | number, callback: (err: Error) => void): void;

    /**
     * Synchronous lchmod(2) - Change permissions of a file. Does not dereference symbolic links.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param mode A file mode. If a string is passed, it is parsed as an octal integer.
     */
    static lchmodSync?(path: PathLike, mode: string | number): void;

    /**
     * Asynchronous stat(2) - Get file status.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     */
    static stat?(path: PathLike, callback: (err: Error, stats: Stats) => void): void;

    /**
     * Synchronous stat(2) - Get file status.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     */
    static statSync?(path: PathLike): Stats;

    /**
     * Asynchronous fstat(2) - Get file status.
     * @param fd A file descriptor.
     */
    static fstat?(fd: number, callback: (err: Error, stats: Stats) => void): void;

    /**
     * Synchronous fstat(2) - Get file status.
     * @param fd A file descriptor.
     */
    static fstatSync?(fd: number): Stats;

    /**
     * Asynchronous lstat(2) - Get file status. Does not dereference symbolic links.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     */
    static lstat?(path: PathLike, callback: (err: Error, stats: Stats) => void): void;

    /**
     * Synchronous lstat(2) - Get file status. Does not dereference symbolic links.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     */
    static lstatSync?(path: PathLike): Stats;

    /**
     * Asynchronous link(2) - Create a new link (also known as a hard link) to an existing file.
     * @param existingPath A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param newPath A path to a file. If a URL is provided, it must use the `file:` protocol.
     */
    static link?(existingPath: PathLike, newPath: PathLike, callback: (err: Error) => void): void;

    /**
     * Synchronous link(2) - Create a new link (also known as a hard link) to an existing file.
     * @param existingPath A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param newPath A path to a file. If a URL is provided, it must use the `file:` protocol.
     */
    static linkSync?(existingPath: PathLike, newPath: PathLike): void;

    /**
     * Asynchronous symlink(2) - Create a new symbolic link to an existing file.
     * @param target A path to an existing file. If a URL is provided, it must use the `file:` protocol.
     * @param path A path to the new symlink. If a URL is provided, it must use the `file:` protocol.
     * @param type May be set to `'dir'`, `'file'`, or `'junction'` (default is `'file'`) and is only available on Windows (ignored on other platforms).
     * When using `'junction'`, the `target` argument will automatically be normalized to an absolute path.
     */
    static symlink?(target: PathLike, path: PathLike, type: string | undefined | null, callback: (err: Error) => void): void;

    /**
     * Asynchronous symlink(2) - Create a new symbolic link to an existing file.
     * @param target A path to an existing file. If a URL is provided, it must use the `file:` protocol.
     * @param path A path to the new symlink. If a URL is provided, it must use the `file:` protocol.
     */
    static symlink?(target: PathLike, path: PathLike, callback: (err: Error) => void): void;

    /**
     * Synchronous symlink(2) - Create a new symbolic link to an existing file.
     * @param target A path to an existing file. If a URL is provided, it must use the `file:` protocol.
     * @param path A path to the new symlink. If a URL is provided, it must use the `file:` protocol.
     * @param type May be set to `'dir'`, `'file'`, or `'junction'` (default is `'file'`) and is only available on Windows (ignored on other platforms).
     * When using `'junction'`, the `target` argument will automatically be normalized to an absolute path.
     */
    static symlinkSync?(target: PathLike, path: PathLike, type?: string | null): void;

    /**
     * Asynchronous readlink(2) - read value of a symbolic link.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
     */
    static readlink?(path: PathLike, options: { encoding?: BufferEncoding | null } | BufferEncoding | undefined | null, callback: (err: Error, linkString: string) => void): void;

    /**
     * Asynchronous readlink(2) - read value of a symbolic link.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
     */
    static readlink?(path: PathLike, options: { encoding: "buffer" } | "buffer", callback: (err: Error, linkString: Buffer) => void): void;

    /**
     * Asynchronous readlink(2) - read value of a symbolic link.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
     */
    static readlink?(path: PathLike, options: { encoding?: string | null } | string | undefined | null, callback: (err: Error, linkString: string | Buffer) => void): void;

    /**
     * Asynchronous readlink(2) - read value of a symbolic link.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     */
    static readlink?(path: PathLike, callback: (err: Error, linkString: string) => void): void;

    /**
     * Synchronous readlink(2) - read value of a symbolic link.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
     */
    static readlinkSync?(path: PathLike, options?: { encoding?: BufferEncoding | null } | BufferEncoding | null): string;

    /**
     * Synchronous readlink(2) - read value of a symbolic link.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
     */
    static readlinkSync?(path: PathLike, options: { encoding: "buffer" } | "buffer"): Buffer;

    /**
     * Synchronous readlink(2) - read value of a symbolic link.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
     */
    static readlinkSync?(path: PathLike, options?: { encoding?: string | null } | string | null): string | Buffer;

    /**
     * Asynchronous realpath(3) - return the canonicalized absolute pathname.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
     */
    static realpath?(path: PathLike, options: { encoding?: BufferEncoding | null } | BufferEncoding | undefined | null, callback: (err: Error, resolvedPath: string) => void): void;

    /**
     * Asynchronous realpath(3) - return the canonicalized absolute pathname.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
     */
    static realpath?(path: PathLike, options: { encoding: "buffer" } | "buffer", callback: (err: Error, resolvedPath: Buffer) => void): void;

    /**
     * Asynchronous realpath(3) - return the canonicalized absolute pathname.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
     */
    static realpath?(path: PathLike, options: { encoding?: string | null } | string | undefined | null, callback: (err: Error, resolvedPath: string | Buffer) => void): void;

    /**
     * Asynchronous realpath(3) - return the canonicalized absolute pathname.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     */
    static realpath?(path: PathLike, callback: (err: Error, resolvedPath: string) => void): void;

    /**
     * Synchronous realpath(3) - return the canonicalized absolute pathname.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
     */
    static realpathSync?(path: PathLike, options?: { encoding?: BufferEncoding | null } | BufferEncoding | null): string;

    /**
     * Synchronous realpath(3) - return the canonicalized absolute pathname.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
     */
    static realpathSync?(path: PathLike, options: { encoding: "buffer" } | "buffer"): Buffer;

    /**
     * Synchronous realpath(3) - return the canonicalized absolute pathname.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
     */
    static realpathSync?(path: PathLike, options?: { encoding?: string | null } | string | null): string | Buffer;

    /**
     * Asynchronous unlink(2) - delete a name and possibly the file it refers to.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     */
    static unlink?(path: PathLike, callback: (err: Error) => void): void;

    /**
     * Synchronous unlink(2) - delete a name and possibly the file it refers to.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     */
    static unlinkSync?(path: PathLike): void;

    /**
     * Asynchronous rmdir(2) - delete a directory.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     */
    static rmdir?(path: PathLike, callback: (err: Error) => void): void;

    /**
     * Synchronous rmdir(2) - delete a directory.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     */
    static rmdirSync?(path: PathLike): void;

    /**
     * Asynchronous mkdir(2) - create a directory.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param mode A file mode. If a string is passed, it is parsed as an octal integer. If not specified, defaults to `0o777`.
     */
    static mkdir?(path: PathLike, mode: number | string | undefined | null, callback: (err: Error) => void): void;

    /**
     * Asynchronous mkdir(2) - create a directory with a mode of `0o777`.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     */
    static mkdir?(path: PathLike, callback: (err: Error) => void): void;

    /**
     * Synchronous mkdir(2) - create a directory.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param mode A file mode. If a string is passed, it is parsed as an octal integer. If not specified, defaults to `0o777`.
     */
    static mkdirSync?(path: PathLike, mode?: number | string | null): void;

    /**
     * Asynchronously creates a unique temporary directory.
     * Generates six random characters to be appended behind a required prefix to create a unique temporary directory.
     * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
     */
    static mkdtemp?(prefix: string, options: { encoding?: BufferEncoding | null } | BufferEncoding | undefined | null, callback: (err: Error, folder: string) => void): void;

    /**
     * Asynchronously creates a unique temporary directory.
     * Generates six random characters to be appended behind a required prefix to create a unique temporary directory.
     * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
     */
    static mkdtemp?(prefix: string, options: "buffer" | { encoding: "buffer" }, callback: (err: Error, folder: Buffer) => void): void;

    /**
     * Asynchronously creates a unique temporary directory.
     * Generates six random characters to be appended behind a required prefix to create a unique temporary directory.
     * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
     */
    static mkdtemp?(prefix: string, options: { encoding?: string | null } | string | undefined | null, callback: (err: Error, folder: string | Buffer) => void): void;

    /**
     * Asynchronously creates a unique temporary directory.
     * Generates six random characters to be appended behind a required prefix to create a unique temporary directory.
     */
    static mkdtemp?(prefix: string, callback: (err: Error, folder: string) => void): void;

    /**
     * Synchronously creates a unique temporary directory.
     * Generates six random characters to be appended behind a required prefix to create a unique temporary directory.
     * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
     */
    static mkdtempSync?(prefix: string, options?: { encoding?: BufferEncoding | null } | BufferEncoding | null): string;

    /**
     * Synchronously creates a unique temporary directory.
     * Generates six random characters to be appended behind a required prefix to create a unique temporary directory.
     * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
     */
    static mkdtempSync?(prefix: string, options: { encoding: "buffer" } | "buffer"): Buffer;

    /**
     * Synchronously creates a unique temporary directory.
     * Generates six random characters to be appended behind a required prefix to create a unique temporary directory.
     * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
     */
    static mkdtempSync?(prefix: string, options?: { encoding?: string | null } | string | null): string | Buffer;

    /**
     * Asynchronous readdir(3) - read a directory.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
     */
    static readdir?(path: PathLike, options: { encoding: BufferEncoding | null } | BufferEncoding | undefined | null, callback: (err: Error, files: string[]) => void): void;

    /**
     * Asynchronous readdir(3) - read a directory.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
     */
    static readdir?(path: PathLike, options: { encoding: "buffer" } | "buffer", callback: (err: Error, files: Buffer[]) => void): void;

    /**
     * Asynchronous readdir(3) - read a directory.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
     */
    static readdir?(path: PathLike, options: { encoding?: string | null } | string | undefined | null, callback: (err: Error, files: Array<string | Buffer>) => void): void;

    /**
     * Asynchronous readdir(3) - read a directory.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     */
    static readdir?(path: PathLike, callback: (err: Error, files: string[]) => void): void;

    /**
     * Synchronous readdir(3) - read a directory.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
     */
    static readdirSync?(path: PathLike, options?: { encoding: BufferEncoding | null } | BufferEncoding | null): string[];

    /**
     * Synchronous readdir(3) - read a directory.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
     */
    static readdirSync?(path: PathLike, options: { encoding: "buffer" } | "buffer"): Buffer[];

    /**
     * Synchronous readdir(3) - read a directory.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
     */
    static readdirSync?(path: PathLike, options?: { encoding?: string | null } | string | null): Array<string | Buffer>;

    /**
     * Asynchronous close(2) - close a file descriptor.
     * @param fd A file descriptor.
     */
    static close?(fd: number, callback: (err: Error) => void): void;

    /**
     * Synchronous close(2) - close a file descriptor.
     * @param fd A file descriptor.
     */
    static closeSync?(fd: number): void;

    /**
     * Asynchronous open(2) - open and possibly create a file.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param mode A file mode. If a string is passed, it is parsed as an octal integer. If not supplied, defaults to `0o666`.
     */
    static open?(path: PathLike, flags: string | number, mode: string | number | undefined | null, callback: (err: Error, fd: number) => void): void;

    /**
     * Asynchronous open(2) - open and possibly create a file. If the file is created, its mode will be `0o666`.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     */
    static open?(path: PathLike, flags: string | number, callback: (err: Error, fd: number) => void): void;

    /**
     * Synchronous open(2) - open and possibly create a file, returning a file descriptor..
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param mode A file mode. If a string is passed, it is parsed as an octal integer. If not supplied, defaults to `0o666`.
     */
    static openSync?(path: PathLike, flags: string | number, mode?: string | number | null): number;

    /**
     * Asynchronously change file timestamps of the file referenced by the supplied path.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param atime The last access time. If a string is provided, it will be coerced to number.
     * @param mtime The last modified time. If a string is provided, it will be coerced to number.
     */
    static utimes?(path: PathLike, atime: string | number | Date, mtime: string | number | Date, callback: (err: Error) => void): void;

    /**
     * Synchronously change file timestamps of the file referenced by the supplied path.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param atime The last access time. If a string is provided, it will be coerced to number.
     * @param mtime The last modified time. If a string is provided, it will be coerced to number.
     */
    static utimesSync?(path: PathLike, atime: string | number | Date, mtime: string | number | Date): void;

    /**
     * Asynchronously change file timestamps of the file referenced by the supplied file descriptor.
     * @param fd A file descriptor.
     * @param atime The last access time. If a string is provided, it will be coerced to number.
     * @param mtime The last modified time. If a string is provided, it will be coerced to number.
     */
    static futimes?(fd: number, atime: string | number | Date, mtime: string | number | Date, callback: (err: Error) => void): void;

    /**
     * Synchronously change file timestamps of the file referenced by the supplied file descriptor.
     * @param fd A file descriptor.
     * @param atime The last access time. If a string is provided, it will be coerced to number.
     * @param mtime The last modified time. If a string is provided, it will be coerced to number.
     */
    static futimesSync?(fd: number, atime: string | number | Date, mtime: string | number | Date): void;

    /**
     * Asynchronous fsync(2) - synchronize a file's in-core state with the underlying storage device.
     * @param fd A file descriptor.
     */
    static fsync?(fd: number, callback: (err: Error) => void): void;

    /**
     * Synchronous fsync(2) - synchronize a file's in-core state with the underlying storage device.
     * @param fd A file descriptor.
     */
    static fsyncSync?(fd: number): void;

    /**
     * Asynchronously writes `buffer` to the file referenced by the supplied file descriptor.
     * @param fd A file descriptor.
     * @param offset The part of the buffer to be written. If not supplied, defaults to `0`.
     * @param length The number of bytes to write. If not supplied, defaults to `buffer.length - offset`.
     * @param position The offset from the beginning of the file where this data should be written. If not supplied, defaults to the current position.
     */
    static write?<TBuffer extends Buffer | Uint8Array>(fd: number, buffer: TBuffer, offset: number | undefined | null, length: number | undefined | null, position: number | undefined | null, callback: (err: Error, written: number, buffer: TBuffer) => void): void;

    /**
     * Asynchronously writes `buffer` to the file referenced by the supplied file descriptor.
     * @param fd A file descriptor.
     * @param offset The part of the buffer to be written. If not supplied, defaults to `0`.
     * @param length The number of bytes to write. If not supplied, defaults to `buffer.length - offset`.
     */
    static write?<TBuffer extends Buffer | Uint8Array>(fd: number, buffer: TBuffer, offset: number | undefined | null, length: number | undefined | null, callback: (err: Error, written: number, buffer: TBuffer) => void): void;

    /**
     * Asynchronously writes `buffer` to the file referenced by the supplied file descriptor.
     * @param fd A file descriptor.
     * @param offset The part of the buffer to be written. If not supplied, defaults to `0`.
     */
    static write?<TBuffer extends Buffer | Uint8Array>(fd: number, buffer: TBuffer, offset: number | undefined | null, callback: (err: Error, written: number, buffer: TBuffer) => void): void;

    /**
     * Asynchronously writes `buffer` to the file referenced by the supplied file descriptor.
     * @param fd A file descriptor.
     */
    static write?<TBuffer extends Buffer | Uint8Array>(fd: number, buffer: TBuffer, callback: (err: Error, written: number, buffer: TBuffer) => void): void;

    /**
     * Asynchronously writes `string` to the file referenced by the supplied file descriptor.
     * @param fd A file descriptor.
     * @param string A string to write. If something other than a string is supplied it will be coerced to a string.
     * @param position The offset from the beginning of the file where this data should be written. If not supplied, defaults to the current position.
     * @param encoding The expected string encoding.
     */
    static write?(fd: number, string: any, position: number | undefined | null, encoding: string | undefined | null, callback: (err: Error, written: number, str: string) => void): void;

    /**
     * Asynchronously writes `string` to the file referenced by the supplied file descriptor.
     * @param fd A file descriptor.
     * @param string A string to write. If something other than a string is supplied it will be coerced to a string.
     * @param position The offset from the beginning of the file where this data should be written. If not supplied, defaults to the current position.
     */
    static write?(fd: number, string: any, position: number | undefined | null, callback: (err: Error, written: number, str: string) => void): void;

    /**
     * Asynchronously writes `string` to the file referenced by the supplied file descriptor.
     * @param fd A file descriptor.
     * @param string A string to write. If something other than a string is supplied it will be coerced to a string.
     */
    static write?(fd: number, string: any, callback: (err: Error, written: number, str: string) => void): void;

    /**
     * Synchronously writes `buffer` to the file referenced by the supplied file descriptor, returning the number of bytes written.
     * @param fd A file descriptor.
     * @param offset The part of the buffer to be written. If not supplied, defaults to `0`.
     * @param length The number of bytes to write. If not supplied, defaults to `buffer.length - offset`.
     * @param position The offset from the beginning of the file where this data should be written. If not supplied, defaults to the current position.
     */
    static writeSync?(fd: number, buffer: Buffer | Uint8Array, offset?: number | null, length?: number | null, position?: number | null): number;

    /**
     * Synchronously writes `string` to the file referenced by the supplied file descriptor, returning the number of bytes written.
     * @param fd A file descriptor.
     * @param string A string to write. If something other than a string is supplied it will be coerced to a string.
     * @param position The offset from the beginning of the file where this data should be written. If not supplied, defaults to the current position.
     * @param encoding The expected string encoding.
     */
    static writeSync?(fd: number, string: any, position?: number | null, encoding?: string | null): number;

    /**
     * Asynchronously reads data from the file referenced by the supplied file descriptor.
     * @param fd A file descriptor.
     * @param buffer The buffer that the data will be written to.
     * @param offset The offset in the buffer at which to start writing.
     * @param length The number of bytes to read.
     * @param position The offset from the beginning of the file from which data should be read. If `null`, data will be read from the current position.
     */
    static read?<TBuffer extends Buffer | Uint8Array>(fd: number, buffer: TBuffer, offset: number, length: number, position: number | null, callback?: (err: Error, bytesRead: number, buffer: TBuffer) => void): void;

    /**
     * Synchronously reads data from the file referenced by the supplied file descriptor, returning the number of bytes read.
     * @param fd A file descriptor.
     * @param buffer The buffer that the data will be written to.
     * @param offset The offset in the buffer at which to start writing.
     * @param length The number of bytes to read.
     * @param position The offset from the beginning of the file from which data should be read. If `null`, data will be read from the current position.
     */
    static readSync?(fd: number, buffer: Buffer | Uint8Array, offset: number, length: number, position: number | null): number;

    /**
     * Asynchronously reads the entire contents of a file.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
     * @param options An object that may contain an optional flag.
     * If a flag is not provided, it defaults to `'r'`.
     */
    static readFile?(path: PathLike | number, options: { encoding?: null; flag?: string; } | undefined | null, callback: (err: Error, data: Buffer) => void): void;

    /**
     * Asynchronously reads the entire contents of a file.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
     * @param options Either the encoding for the result, or an object that contains the encoding and an optional flag.
     * If a flag is not provided, it defaults to `'r'`.
     */
    static readFile?(path: PathLike | number, options: { encoding: string; flag?: string; } | string, callback: (err: Error, data: string) => void): void;

    /**
     * Asynchronously reads the entire contents of a file.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
     * @param options Either the encoding for the result, or an object that contains the encoding and an optional flag.
     * If a flag is not provided, it defaults to `'r'`.
     */
    static readFile?(path: PathLike | number, options: { encoding?: string | null; flag?: string; } | string | undefined | null, callback: (err: Error, data: string | Buffer) => void): void;

    /**
     * Asynchronously reads the entire contents of a file.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
     */
    static readFile?(path: PathLike | number, callback: (err: Error, data: Buffer) => void): void;

    /**
     * Synchronously reads the entire contents of a file.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
     * @param options An object that may contain an optional flag. If a flag is not provided, it defaults to `'r'`.
     */
    static readFileSync?(path: PathLike | number, options?: { encoding?: null; flag?: string; } | null): Buffer;

    /**
     * Synchronously reads the entire contents of a file.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
     * @param options Either the encoding for the result, or an object that contains the encoding and an optional flag.
     * If a flag is not provided, it defaults to `'r'`.
     */
    static readFileSync?(path: PathLike | number, options: { encoding: string; flag?: string; } | string): string;

    /**
     * Synchronously reads the entire contents of a file.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
     * @param options Either the encoding for the result, or an object that contains the encoding and an optional flag.
     * If a flag is not provided, it defaults to `'r'`.
     */
    static readFileSync?(path: PathLike | number, options?: { encoding?: string | null; flag?: string; } | string | null): string | Buffer;

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
    static writeFile?(path: PathLike | number, data: any, options: { encoding?: string | null; mode?: number | string; flag?: string; } | string | undefined | null, callback: (err: Error) => void): void;

    /**
     * Asynchronously writes data to a file, replacing the file if it already exists.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
     * @param data The data to write. If something other than a Buffer or Uint8Array is provided, the value is coerced to a string.
     */
    static writeFile?(path: PathLike | number, data: any, callback: (err: Error) => void): void;

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
    static writeFileSync?(path: PathLike | number, data: any, options?: { encoding?: string | null; mode?: number | string; flag?: string; } | string | null): void;

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
    static appendFile?(file: PathLike | number, data: any, options: { encoding?: string | null, mode?: string | number, flag?: string } | string | undefined | null, callback: (err: Error) => void): void;

    /**
     * Asynchronously append data to a file, creating the file if it does not exist.
     * @param file A path to a file. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
     * @param data The data to write. If something other than a Buffer or Uint8Array is provided, the value is coerced to a string.
     */
    static appendFile?(file: PathLike | number, data: any, callback: (err: Error) => void): void;

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
    static appendFileSync?(file: PathLike | number, data: any, options?: { encoding?: string | null; mode?: number | string; flag?: string; } | string | null): void;

    /**
     * Watch for changes on `filename`. The callback `listener` will be called each time the file is accessed.
     */
    static watchFile?(filename: PathLike, options: { persistent?: boolean; interval?: number; } | undefined, listener: (curr: Stats, prev: Stats) => void): void;

    /**
     * Watch for changes on `filename`. The callback `listener` will be called each time the file is accessed.
     * @param filename A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     */
    static watchFile?(filename: PathLike, listener: (curr: Stats, prev: Stats) => void): void;

    /**
     * Stop watching for changes on `filename`.
     * @param filename A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     */
    static unwatchFile?(filename: PathLike, listener?: (curr: Stats, prev: Stats) => void): void;

    /**
     * Watch for changes on `filename`, where `filename` is either a file or a directory, returning an `FSWatcher`.
     * @param filename A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     * @param options Either the encoding for the filename provided to the listener, or an object optionally specifying encoding, persistent, and recursive options.
     * If `encoding` is not supplied, the default of `'utf8'` is used.
     * If `persistent` is not supplied, the default of `true` is used.
     * If `recursive` is not supplied, the default of `false` is used.
     */
    static watch?(filename: PathLike, options: { encoding?: BufferEncoding | null, persistent?: boolean, recursive?: boolean } | BufferEncoding | undefined | null, listener?: (event: string, filename: string) => void): FSWatcher;

    /**
     * Watch for changes on `filename`, where `filename` is either a file or a directory, returning an `FSWatcher`.
     * @param filename A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     * @param options Either the encoding for the filename provided to the listener, or an object optionally specifying encoding, persistent, and recursive options.
     * If `encoding` is not supplied, the default of `'utf8'` is used.
     * If `persistent` is not supplied, the default of `true` is used.
     * If `recursive` is not supplied, the default of `false` is used.
     */
    static watch?(filename: PathLike, options: { encoding: "buffer", persistent?: boolean, recursive?: boolean } | "buffer", listener?: (event: string, filename: Buffer) => void): FSWatcher;

    /**
     * Watch for changes on `filename`, where `filename` is either a file or a directory, returning an `FSWatcher`.
     * @param filename A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     * @param options Either the encoding for the filename provided to the listener, or an object optionally specifying encoding, persistent, and recursive options.
     * If `encoding` is not supplied, the default of `'utf8'` is used.
     * If `persistent` is not supplied, the default of `true` is used.
     * If `recursive` is not supplied, the default of `false` is used.
     */
    static watch?(filename: PathLike, options: { encoding?: string | null, persistent?: boolean, recursive?: boolean } | string | null, listener?: (event: string, filename: string | Buffer) => void): FSWatcher;

    /**
     * Watch for changes on `filename`, where `filename` is either a file or a directory, returning an `FSWatcher`.
     * @param filename A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     */
    static watch?(filename: PathLike, listener?: (event: string, filename: string) => any): FSWatcher;

    /**
     * Asynchronously tests whether or not the given path exists by checking with the file system.
     * @deprecated
     * @param path A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     */
    static exists?(path: PathLike, callback: (exists: boolean) => void): void;

    /**
     * Synchronously tests whether or not the given path exists by checking with the file system.
     * @param path A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     */
    static existsSync?(path: PathLike): boolean;

    /**
     * Asynchronously tests a user's permissions for the file specified by path.
     * @param path A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     */
    static access?(path: PathLike, mode: number | undefined, callback: (err: Error) => void): void;

    /**
     * Asynchronously tests a user's permissions for the file specified by path.
     * @param path A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     */
    static access?(path: PathLike, callback: (err: Error) => void): void;

    /**
     * Synchronously tests a user's permissions for the file specified by path.
     * @param path A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     */
    static accessSync?(path: PathLike, mode?: number): void;

    /**
     * Returns a new `ReadStream` object.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     */
    static createReadStream?(path: PathLike, options?: string | {
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
    static createWriteStream?(path: PathLike, options?: string | {
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
    static fdatasync?(fd: number, callback: (err: Error) => void): void;

    /**
     * Synchronous fdatasync(2) - synchronize a file's in-core state with storage device.
     * @param fd A file descriptor.
     */
    static fdatasyncSync?(fd: number): void;

    /**
     * Asynchronously copies src to dest. By default, dest is overwritten if it already exists.
     * No arguments other than a possible exception are given to the callback function.
     * Node.js makes no guarantees about the atomicity of the copy operation.
     * If an error occurs after the destination file has been opened for writing, Node.js will attempt
     * to remove the destination.
     * @param src A path to the source file.
     * @param dest A path to the destination file.
     */
    static copyFile?(src: PathLike, dest: PathLike, callback: (err: Error) => void): void;

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
    static copyFile?(src: PathLike, dest: PathLike, flags: number, callback: (err: Error) => void): void;

    /**
     * Synchronously copies src to dest. By default, dest is overwritten if it already exists.
     * Node.js makes no guarantees about the atomicity of the copy operation.
     * If an error occurs after the destination file has been opened for writing, Node.js will attempt
     * to remove the destination.
     * @param src A path to the source file.
     * @param dest A path to the destination file.
     * @param flags An optional integer that specifies the behavior of the copy operation. The only supported flag is fs.constants.COPYFILE_EXCL, which causes the copy operation to fail if dest already exists.
     */
    static copyFileSync?(src: PathLike, dest: PathLike, flags?: number): void;
    static constants;
}
