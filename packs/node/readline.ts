
import {WritableStream,ReadableStream} from './stream';
import {Emitter} from './events';
import {Buffer} from './buffer';
import {proxy} from "./proxy";

export declare type Completer = (line: string) => CompleterResult;
export declare type AsyncCompleter = (line: string, callback: (err: any, result: CompleterResult) => void) => any;
export declare type CompleterResult = [string[], string];

export declare interface Key {
    sequence?: string;
    name?: string;
    ctrl?: boolean;
    meta?: boolean;
    shift?: boolean;
}
export declare interface ReadLine extends Emitter {
    setPrompt(prompt: string): void;
    prompt(preserveCursor?: boolean): void;
    question(query: string, callback: (answer: string) => void): void;
    pause(): ReadLine;
    resume(): ReadLine;
    close(): void;
    write(data: string | Buffer, key?: Key): void;

    /**
     * events.EventEmitter
     * 1. close
     * 2. line
     * 3. pause
     * 4. resume
     * 5. SIGCONT
     * 6. SIGINT
     * 7. SIGTSTP
     */

    addListener(event: string, listener: (...args: any[]) => void): this;
    addListener(event: "close", listener: () => void): this;
    addListener(event: "line", listener: (input: any) => void): this;
    addListener(event: "pause", listener: () => void): this;
    addListener(event: "resume", listener: () => void): this;
    addListener(event: "SIGCONT", listener: () => void): this;
    addListener(event: "SIGINT", listener: () => void): this;
    addListener(event: "SIGTSTP", listener: () => void): this;

    emit(event: string | symbol, ...args: any[]): boolean;
    emit(event: "close"): boolean;
    emit(event: "line", input: any): boolean;
    emit(event: "pause"): boolean;
    emit(event: "resume"): boolean;
    emit(event: "SIGCONT"): boolean;
    emit(event: "SIGINT"): boolean;
    emit(event: "SIGTSTP"): boolean;

    on(event: string, listener: (...args: any[]) => void): this;
    on(event: "close", listener: () => void): this;
    on(event: "line", listener: (input: any) => void): this;
    on(event: "pause", listener: () => void): this;
    on(event: "resume", listener: () => void): this;
    on(event: "SIGCONT", listener: () => void): this;
    on(event: "SIGINT", listener: () => void): this;
    on(event: "SIGTSTP", listener: () => void): this;

    once(event: string, listener: (...args: any[]) => void): this;
    once(event: "close", listener: () => void): this;
    once(event: "line", listener: (input: any) => void): this;
    once(event: "pause", listener: () => void): this;
    once(event: "resume", listener: () => void): this;
    once(event: "SIGCONT", listener: () => void): this;
    once(event: "SIGINT", listener: () => void): this;
    once(event: "SIGTSTP", listener: () => void): this;

    prependListener(event: string, listener: (...args: any[]) => void): this;
    prependListener(event: "close", listener: () => void): this;
    prependListener(event: "line", listener: (input: any) => void): this;
    prependListener(event: "pause", listener: () => void): this;
    prependListener(event: "resume", listener: () => void): this;
    prependListener(event: "SIGCONT", listener: () => void): this;
    prependListener(event: "SIGINT", listener: () => void): this;
    prependListener(event: "SIGTSTP", listener: () => void): this;

    prependOnceListener(event: string, listener: (...args: any[]) => void): this;
    prependOnceListener(event: "close", listener: () => void): this;
    prependOnceListener(event: "line", listener: (input: any) => void): this;
    prependOnceListener(event: "pause", listener: () => void): this;
    prependOnceListener(event: "resume", listener: () => void): this;
    prependOnceListener(event: "SIGCONT", listener: () => void): this;
    prependOnceListener(event: "SIGINT", listener: () => void): this;
    prependOnceListener(event: "SIGTSTP", listener: () => void): this;
}
export declare interface ReadLineOptions {
    input: ReadableStream;
    output?: WritableStream;
    completer?: Completer | AsyncCompleter;
    terminal?: boolean;
    historySize?: number;
}

export declare function createInterface(input: ReadableStream, output?: WritableStream, completer?: Completer | AsyncCompleter, terminal?: boolean): ReadLine;
export declare function createInterface(options: ReadLineOptions): ReadLine;
export declare function cursorTo(stream: WritableStream, x: number, y?: number): void;
export declare function emitKeypressEvents(stream: ReadableStream, interface?: ReadLine): void;
export declare function moveCursor(stream: WritableStream, dx: number | string, dy: number | string): void;
export declare function clearLine(stream: WritableStream, dir: number): void;
export declare function clearScreenDown(stream: WritableStream): void;

proxy('readline', module);