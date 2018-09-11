import * as native              from "child_process";
import {builtin}                from './builtin';
import {Writable, Readable}     from './stream';
import {EventEmitter}           from './events';
import {Socket, Server}         from './net';
import {Buffer, BufferEncoding} from './buffer';


@builtin(native, (module) => {
  Object.getOwnPropertyNames(module).forEach(key => {
    Object.defineProperty(Cp, key, Object.getOwnPropertyDescriptor(module, key))
  });
  //Object.assign(Crypto,module);
  return Cp;
})
export class Cp {

  static spawn?(command: string, args?: string[], options?: SpawnOptions): ChildProcess;

  // no `options` definitely means stdout/stderr are `string`.
  static exec?(command: string, callback?: (error: Error | null, stdout: string, stderr: string) => void): ChildProcess;

  // `options` with `"buffer"` or `null` for `encoding` means stdout/stderr are definitely `Buffer`.
  static exec?(command: string, options: { encoding: "buffer" | null } & ExecOptions, callback?: (error: Error | null, stdout: Buffer, stderr: Buffer) => void): ChildProcess;

  // `options` with well known `encoding` means stdout/stderr are definitely `string`.
  static exec?(command: string, options: { encoding: BufferEncoding } & ExecOptions, callback?: (error: Error | null, stdout: string, stderr: string) => void): ChildProcess;

  // `options` with an `encoding` whose type is `string` means stdout/stderr could either be `Buffer` or `string`.
// There is no guarantee the `encoding` is unknown as `string` is a superset of `BufferEncoding`.
  static exec?(command: string, options: { encoding: string } & ExecOptions, callback?: (error: Error | null, stdout: string | Buffer, stderr: string | Buffer) => void): ChildProcess;

  // `options` without an `encoding` means stdout/stderr are definitely `string`.
  static exec?(command: string, options: ExecOptions, callback?: (error: Error | null, stdout: string, stderr: string) => void): ChildProcess;

  // fallback if nothing else matches. Worst case is always `string | Buffer`.
  static exec?(command: string, options: ({ encoding?: string | null } & ExecOptions) | undefined | null, callback?: (error: Error | null, stdout: string | Buffer, stderr: string | Buffer) => void): ChildProcess;

  static execFile?(file: string): ChildProcess;
  static execFile?(file: string, options: ({ encoding?: string | null } & ExecFileOptions) | undefined | null): ChildProcess;
  static execFile?(file: string, args: string[] | undefined | null): ChildProcess;
  static execFile?(file: string, args: string[] | undefined | null, options: ({ encoding?: string | null } & ExecFileOptions) | undefined | null): ChildProcess;

// no `options` definitely means stdout/stderr are `string`.
  static execFile?(file: string, callback: (error: Error | null, stdout: string, stderr: string) => void): ChildProcess;
  static execFile?(file: string, args: string[] | undefined | null, callback: (error: Error | null, stdout: string, stderr: string) => void): ChildProcess;

// `options` with `"buffer"` or `null` for `encoding` means stdout/stderr are definitely `Buffer`.
  static execFile?(file: string, options: ExecFileOptionsWithBufferEncoding, callback: (error: Error | null, stdout: Buffer, stderr: Buffer) => void): ChildProcess;
  static execFile?(file: string, args: string[] | undefined | null, options: ExecFileOptionsWithBufferEncoding, callback: (error: Error | null, stdout: Buffer, stderr: Buffer) => void): ChildProcess;

// `options` with well known `encoding` means stdout/stderr are definitely `string`.
  static execFile?(file: string, options: ExecFileOptionsWithStringEncoding, callback: (error: Error | null, stdout: string, stderr: string) => void): ChildProcess;
  static execFile?(file: string, args: string[] | undefined | null, options: ExecFileOptionsWithStringEncoding, callback: (error: Error | null, stdout: string, stderr: string) => void): ChildProcess;

// `options` with an `encoding` whose type is `string` means stdout/stderr could either be `Buffer` or `string`.
// There is no guarantee the `encoding` is unknown as `string` is a superset of `BufferEncoding`.
  static execFile?(file: string, options: ExecFileOptionsWithOtherEncoding, callback: (error: Error | null, stdout: string | Buffer, stderr: string | Buffer) => void): ChildProcess;
  static execFile?(file: string, args: string[] | undefined | null, options: ExecFileOptionsWithOtherEncoding, callback: (error: Error | null, stdout: string | Buffer, stderr: string | Buffer) => void): ChildProcess;

// `options` without an `encoding` means stdout/stderr are definitely `string`.
  static execFile?(file: string, options: ExecFileOptions, callback: (error: Error | null, stdout: string, stderr: string) => void): ChildProcess;
  static execFile?(file: string, args: string[] | undefined | null, options: ExecFileOptions, callback: (error: Error | null, stdout: string, stderr: string) => void): ChildProcess;

// fallback if nothing else matches. Worst case is always `string | Buffer`.
  static execFile?(file: string, options: ({ encoding?: string | null } & ExecFileOptions) | undefined | null, callback: ((error: Error | null, stdout: string | Buffer, stderr: string | Buffer) => void) | undefined | null): ChildProcess;
  static execFile?(file: string, args: string[] | undefined | null, options: ({ encoding?: string | null } & ExecFileOptions) | undefined | null, callback: ((error: Error | null, stdout: string | Buffer, stderr: string | Buffer) => void) | undefined | null): ChildProcess;

  static fork?(modulePath: string, args?: string[], options?: ForkOptions): ChildProcess;

  static spawnSync?(command: string): SpawnSyncReturns<Buffer>;
  static spawnSync?(command: string, options?: SpawnSyncOptionsWithStringEncoding): SpawnSyncReturns<string>;
  static spawnSync?(command: string, options?: SpawnSyncOptionsWithBufferEncoding): SpawnSyncReturns<Buffer>;
  static spawnSync?(command: string, options?: SpawnSyncOptions): SpawnSyncReturns<Buffer>;
  static spawnSync?(command: string, args?: string[], options?: SpawnSyncOptionsWithStringEncoding): SpawnSyncReturns<string>;
  static spawnSync?(command: string, args?: string[], options?: SpawnSyncOptionsWithBufferEncoding): SpawnSyncReturns<Buffer>;
  static spawnSync?(command: string, args?: string[], options?: SpawnSyncOptions): SpawnSyncReturns<Buffer>;

  static execSync?(command: string): Buffer;
  static execSync?(command: string, options?: ExecSyncOptionsWithStringEncoding): string;
  static execSync?(command: string, options?: ExecSyncOptionsWithBufferEncoding): Buffer;
  static execSync?(command: string, options?: ExecSyncOptions): Buffer;

  static execFileSync?(command: string): Buffer;
  static execFileSync?(command: string, options?: ExecFileSyncOptionsWithStringEncoding): string;
  static execFileSync?(command: string, options?: ExecFileSyncOptionsWithBufferEncoding): Buffer;
  static execFileSync?(command: string, options?: ExecFileSyncOptions): Buffer;
  static execFileSync?(command: string, args?: string[], options?: ExecFileSyncOptionsWithStringEncoding): string;
  static execFileSync?(command: string, args?: string[], options?: ExecFileSyncOptionsWithBufferEncoding): Buffer;
  static execFileSync?(command: string, args?: string[], options?: ExecFileSyncOptions): Buffer;
}

export interface MessageOptions {
  keepOpen?: boolean;
}
export interface SpawnOptions {
  cwd?: string;
  env?: any;
  stdio?: any;
  detached?: boolean;
  uid?: number;
  gid?: number;
  shell?: boolean | string;
  windowsVerbatimArguments?: boolean;
}
export interface ExecOptions {
  cwd?: string;
  env?: any;
  shell?: string;
  timeout?: number;
  maxBuffer?: number;
  killSignal?: string;
  uid?: number;
  gid?: number;
  windowsHide?: boolean;
}

export interface ExecSyncOptions {
  cwd?: string;
  input?: string | Buffer;
  stdio?: any;
  env?: any;
  shell?: string;
  uid?: number;
  gid?: number;
  timeout?: number;
  killSignal?: string;
  maxBuffer?: number;
  encoding?: string;
  windowsHide?: boolean;
}
export interface ExecSyncOptionsWithStringEncoding extends ExecSyncOptions {
  encoding: BufferEncoding;
}
export interface ExecSyncOptionsWithBufferEncoding extends ExecSyncOptions {
  encoding: string; // specify `null`.
}
export interface ExecFileSyncOptions {
  cwd?: string;
  input?: string | Buffer;
  stdio?: any;
  env?: any;
  uid?: number;
  gid?: number;
  timeout?: number;
  killSignal?: string;
  maxBuffer?: number;
  encoding?: string;
  windowsHide?: boolean;
}
export interface ExecFileSyncOptionsWithStringEncoding extends ExecFileSyncOptions {
  encoding: BufferEncoding;
}
export interface ExecFileSyncOptionsWithBufferEncoding extends ExecFileSyncOptions {
  encoding: string; // specify `null`.
}
export interface ExecFileOptions {
  cwd?: string;
  env?: any;
  timeout?: number;
  maxBuffer?: number;
  killSignal?: string;
  uid?: number;
  gid?: number;
  windowsHide?: boolean;
  windowsVerbatimArguments?: boolean;
}
export interface ExecFileOptionsWithStringEncoding extends ExecFileOptions {
  encoding: BufferEncoding;
}
export interface ExecFileOptionsWithBufferEncoding extends ExecFileOptions {
  encoding: 'buffer' | null;
}
export interface ExecFileOptionsWithOtherEncoding extends ExecFileOptions {
  encoding: string;
}

export interface ExecOptionsWithStringEncoding extends ExecOptions {
  encoding: BufferEncoding;
}

export interface ExecOptionsWithBufferEncoding extends ExecOptions {
  encoding: string | null; // specify `null`.
}

export interface SpawnSyncOptions {
  cwd?: string;
  input?: string | Buffer;
  stdio?: any;
  env?: any;
  uid?: number;
  gid?: number;
  timeout?: number;
  killSignal?: string;
  maxBuffer?: number;
  encoding?: string;
  shell?: boolean | string;
  windowsHide?: boolean;
  windowsVerbatimArguments?: boolean;
}
export interface SpawnSyncOptionsWithStringEncoding extends SpawnSyncOptions {
  encoding: BufferEncoding;
}
export interface SpawnSyncOptionsWithBufferEncoding extends SpawnSyncOptions {
  encoding: string; // specify `null`.
}
export interface SpawnSyncReturns<T> {
  pid: number;
  output: string[];
  stdout: T;
  stderr: T;
  status: number;
  signal: string;
  error: Error;
}
export interface ChildProcess extends EventEmitter {
  stdin: Writable;
  stdout: Readable;
  stderr: Readable;
  stdio: [ Writable, Readable, Readable ];
  killed: boolean;
  pid: number;
  kill(signal?: string): void;
  send(message: any, callback?: (error: Error) => void): boolean;
  send(message: any, sendHandle?: Socket | Server, callback?: (error: Error) => void): boolean;
  send(message: any, sendHandle?: Socket | Server, options?: MessageOptions, callback?: (error: Error) => void): boolean;
  connected: boolean;
  disconnect(): void;
  unref(): void;
  ref(): void;

  /**
   * events.EventEmitter
   * 1. close
   * 2. disconnect
   * 3. error
   * 4. exit
   * 5. message
   */

  addListener(event: string, listener: (...args: any[]) => void): this;
  addListener(event: "close", listener: (code: number, signal: string) => void): this;
  addListener(event: "disconnect", listener: () => void): this;
  addListener(event: "error", listener: (err: Error) => void): this;
  addListener(event: "exit", listener: (code: number, signal: string) => void): this;
  addListener(event: "message", listener: (message: any, sendHandle: Socket | Server) => void): this;

  emit(event: string | symbol, ...args: any[]): boolean;
  emit(event: "close", code: number, signal: string): boolean;
  emit(event: "disconnect"): boolean;
  emit(event: "error", err: Error): boolean;
  emit(event: "exit", code: number, signal: string): boolean;
  emit(event: "message", message: any, sendHandle: Socket | Server): boolean;

  on(event: string, listener: (...args: any[]) => void): this;
  on(event: "close", listener: (code: number, signal: string) => void): this;
  on(event: "disconnect", listener: () => void): this;
  on(event: "error", listener: (err: Error) => void): this;
  on(event: "exit", listener: (code: number, signal: string) => void): this;
  on(event: "message", listener: (message: any, sendHandle: Socket | Server) => void): this;

  once(event: string, listener: (...args: any[]) => void): this;
  once(event: "close", listener: (code: number, signal: string) => void): this;
  once(event: "disconnect", listener: () => void): this;
  once(event: "error", listener: (err: Error) => void): this;
  once(event: "exit", listener: (code: number, signal: string) => void): this;
  once(event: "message", listener: (message: any, sendHandle: Socket | Server) => void): this;

  prependListener(event: string, listener: (...args: any[]) => void): this;
  prependListener(event: "close", listener: (code: number, signal: string) => void): this;
  prependListener(event: "disconnect", listener: () => void): this;
  prependListener(event: "error", listener: (err: Error) => void): this;
  prependListener(event: "exit", listener: (code: number, signal: string) => void): this;
  prependListener(event: "message", listener: (message: any, sendHandle: Socket | Server) => void): this;

  prependOnceListener(event: string, listener: (...args: any[]) => void): this;
  prependOnceListener(event: "close", listener: (code: number, signal: string) => void): this;
  prependOnceListener(event: "disconnect", listener: () => void): this;
  prependOnceListener(event: "error", listener: (err: Error) => void): this;
  prependOnceListener(event: "exit", listener: (code: number, signal: string) => void): this;
  prependOnceListener(event: "message", listener: (message: any, sendHandle: Socket | Server) => void): this;
}
export interface ForkOptions {
  cwd?: string;
  env?: any;
  execPath?: string;
  execArgv?: string[];
  silent?: boolean;
  stdio?: any[];
  uid?: number;
  gid?: number;
  windowsVerbatimArguments?: boolean;
}




