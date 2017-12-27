import {Socket} from './net';
export interface ReadStream extends Socket {
    isRaw: boolean;
    setRawMode(mode: boolean): void;
    isTTY: boolean;
}
export interface WriteStream extends Socket {
    columns: number;
    rows: number;
    isTTY: boolean;
}
export declare function isatty(fd: number): boolean;