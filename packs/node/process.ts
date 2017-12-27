import {} from './index';
import {WritableStream, ReadableStream} from './stream';
import {Socket} from './net';
import {Emitter} from './events';
export interface ProcessEnv {
    [key: string]: string | undefined;
}
export interface ProcessVersions {
    http_parser: string;
    node: string;
    v8: string;
    ares: string;
    uv: string;
    zlib: string;
    modules: string;
    openssl: string;
}
export type Platform = 'aix'
    | 'android'
    | 'darwin'
    | 'freebsd'
    | 'linux'
    | 'openbsd'
    | 'sunos'
    | 'win32'
    | 'cygwin';
export interface MemoryUsage {
    rss: number;
    heapTotal: number;
    heapUsed: number;
}
export interface CpuUsage {
    user: number;
    system: number;
}
export type Signals =
    "SIGABRT" | "SIGALRM" | "SIGBUS" | "SIGCHLD" | "SIGCONT" | "SIGFPE" | "SIGHUP" | "SIGILL" | "SIGINT" | "SIGIO" |
    "SIGIOT" | "SIGKILL" | "SIGPIPE" | "SIGPOLL" | "SIGPROF" | "SIGPWR" | "SIGQUIT" | "SIGSEGV" | "SIGSTKFLT" |
    "SIGSTOP" | "SIGSYS" | "SIGTERM" | "SIGTRAP" | "SIGTSTP" | "SIGTTIN" | "SIGTTOU" | "SIGUNUSED" | "SIGURG" |
    "SIGUSR1" | "SIGUSR2" | "SIGVTALRM" | "SIGWINCH" | "SIGXCPU" | "SIGXFSZ" | "SIGBREAK" | "SIGLOST" | "SIGINFO";

type BeforeExitListener = (code: number) => void;
type DisconnectListener = () => void;
type ExitListener = (code: number) => void;
type RejectionHandledListener = (promise: Promise<any>) => void;
type UncaughtExceptionListener = (error: Error) => void;
type UnhandledRejectionListener = (reason: any, promise: Promise<any>) => void;
type WarningListener = (warning: Error) => void;
type MessageListener = (message: any, sendHandle: any) => void;
type SignalsListener = () => void;
type NewListenerListener = (type: string | symbol, listener: (...args: any[]) => void) => void;
type RemoveListenerListener = (type: string | symbol, listener: (...args: any[]) => void) => void;

export interface Process extends Emitter {
    stdout: WritableStream;
    stderr: WritableStream;
    stdin: ReadableStream;
    openStdin(): Socket;
    argv: string[];
    argv0: string;
    execArgv: string[];
    execPath: string;
    abort(): void;
    chdir(directory: string): void;
    cwd(): string;
    emitWarning(warning: string | Error, name?: string, ctor?: Function): void;
    env: ProcessEnv;
    exit(code?: number): never;
    exitCode: number;
    getgid(): number;
    setgid(id: number | string): void;
    getuid(): number;
    setuid(id: number | string): void;
    geteuid(): number;
    seteuid(id: number | string): void;
    getegid(): number;
    setegid(id: number | string): void;
    getgroups(): number[];
    setgroups(groups: Array<string | number>): void;
    version: string;
    versions: ProcessVersions;
    config: {
        target_defaults: {
            cflags: any[];
            default_configuration: string;
            defines: string[];
            include_dirs: string[];
            libraries: string[];
        };
        variables: {
            clang: number;
            host_arch: string;
            node_install_npm: boolean;
            node_install_waf: boolean;
            node_prefix: string;
            node_shared_openssl: boolean;
            node_shared_v8: boolean;
            node_shared_zlib: boolean;
            node_use_dtrace: boolean;
            node_use_etw: boolean;
            node_use_openssl: boolean;
            target_arch: string;
            v8_no_strict_aliasing: number;
            v8_use_snapshot: boolean;
            visibility: string;
        };
    };
    kill(pid: number, signal?: string | number): void;
    pid: number;
    title: string;
    arch: string;
    platform: Platform;
    mainModule?: NodeModule;
    memoryUsage(): MemoryUsage;
    cpuUsage(previousValue?: CpuUsage): CpuUsage;
    nextTick(callback: Function, ...args: any[]): void;
    umask(mask?: number): number;
    uptime(): number;
    hrtime(time?: [number, number]): [number, number];
    // Worker
    send?(message: any, sendHandle?: any): void;
    disconnect(): void;
    connected: boolean;
    /**
     * EventEmitter
     *   1. beforeExit
     *   2. disconnect
     *   3. exit
     *   4. message
     *   5. rejectionHandled
     *   6. uncaughtException
     *   7. unhandledRejection
     *   8. warning
     *   9. message
     *  10. <All OS Signals>
     *  11. newListener/removeListener inherited from EventEmitter
     */
    addListener(event: "beforeExit", listener: BeforeExitListener): this;
    addListener(event: "disconnect", listener: DisconnectListener): this;
    addListener(event: "exit", listener: ExitListener): this;
    addListener(event: "rejectionHandled", listener: RejectionHandledListener): this;
    addListener(event: "uncaughtException", listener: UncaughtExceptionListener): this;
    addListener(event: "unhandledRejection", listener: UnhandledRejectionListener): this;
    addListener(event: "warning", listener: WarningListener): this;
    addListener(event: "message", listener: MessageListener): this;
    addListener(event: Signals, listener: SignalsListener): this;
    addListener(event: "newListener", listener: NewListenerListener): this;
    addListener(event: "removeListener", listener: RemoveListenerListener): this;
    emit(event: "beforeExit", code: number): boolean;
    emit(event: "disconnect"): boolean;
    emit(event: "exit", code: number): boolean;
    emit(event: "rejectionHandled", promise: Promise<any>): boolean;
    emit(event: "uncaughtException", error: Error): boolean;
    emit(event: "unhandledRejection", reason: any, promise: Promise<any>): boolean;
    emit(event: "warning", warning: Error): boolean;
    emit(event: "message", message: any, sendHandle: any): this;
    emit(event: Signals): boolean;
    emit(event: "newListener", eventName: string | symbol, listener: (...args: any[]) => void): this;
    emit(event: "removeListener", eventName: string, listener: (...args: any[]) => void): this;
    on(event: "beforeExit", listener: BeforeExitListener): this;
    on(event: "disconnect", listener: DisconnectListener): this;
    on(event: "exit", listener: ExitListener): this;
    on(event: "rejectionHandled", listener: RejectionHandledListener): this;
    on(event: "uncaughtException", listener: UncaughtExceptionListener): this;
    on(event: "unhandledRejection", listener: UnhandledRejectionListener): this;
    on(event: "warning", listener: WarningListener): this;
    on(event: "message", listener: MessageListener): this;
    on(event: Signals, listener: SignalsListener): this;
    on(event: "newListener", listener: NewListenerListener): this;
    on(event: "removeListener", listener: RemoveListenerListener): this;
    once(event: "beforeExit", listener: BeforeExitListener): this;
    once(event: "disconnect", listener: DisconnectListener): this;
    once(event: "exit", listener: ExitListener): this;
    once(event: "rejectionHandled", listener: RejectionHandledListener): this;
    once(event: "uncaughtException", listener: UncaughtExceptionListener): this;
    once(event: "unhandledRejection", listener: UnhandledRejectionListener): this;
    once(event: "warning", listener: WarningListener): this;
    once(event: "message", listener: MessageListener): this;
    once(event: Signals, listener: SignalsListener): this;
    once(event: "newListener", listener: NewListenerListener): this;
    once(event: "removeListener", listener: RemoveListenerListener): this;
    prependListener(event: "beforeExit", listener: BeforeExitListener): this;
    prependListener(event: "disconnect", listener: DisconnectListener): this;
    prependListener(event: "exit", listener: ExitListener): this;
    prependListener(event: "rejectionHandled", listener: RejectionHandledListener): this;
    prependListener(event: "uncaughtException", listener: UncaughtExceptionListener): this;
    prependListener(event: "unhandledRejection", listener: UnhandledRejectionListener): this;
    prependListener(event: "warning", listener: WarningListener): this;
    prependListener(event: "message", listener: MessageListener): this;
    prependListener(event: Signals, listener: SignalsListener): this;
    prependListener(event: "newListener", listener: NewListenerListener): this;
    prependListener(event: "removeListener", listener: RemoveListenerListener): this;
    prependOnceListener(event: "beforeExit", listener: BeforeExitListener): this;
    prependOnceListener(event: "disconnect", listener: DisconnectListener): this;
    prependOnceListener(event: "exit", listener: ExitListener): this;
    prependOnceListener(event: "rejectionHandled", listener: RejectionHandledListener): this;
    prependOnceListener(event: "uncaughtException", listener: UncaughtExceptionListener): this;
    prependOnceListener(event: "unhandledRejection", listener: UnhandledRejectionListener): this;
    prependOnceListener(event: "warning", listener: WarningListener): this;
    prependOnceListener(event: "message", listener: MessageListener): this;
    prependOnceListener(event: Signals, listener: SignalsListener): this;
    prependOnceListener(event: "newListener", listener: NewListenerListener): this;
    prependOnceListener(event: "removeListener", listener: RemoveListenerListener): this;
    listeners(event: "beforeExit"): BeforeExitListener[];
    listeners(event: "disconnect"): DisconnectListener[];
    listeners(event: "exit"): ExitListener[];
    listeners(event: "rejectionHandled"): RejectionHandledListener[];
    listeners(event: "uncaughtException"): UncaughtExceptionListener[];
    listeners(event: "unhandledRejection"): UnhandledRejectionListener[];
    listeners(event: "warning"): WarningListener[];
    listeners(event: "message"): MessageListener[];
    listeners(event: Signals): SignalsListener[];
    listeners(event: "newListener"): NewListenerListener[];
    listeners(event: "removeListener"): RemoveListenerListener[];
    binding(id:string):any;
}

export const process:Process = require('process');