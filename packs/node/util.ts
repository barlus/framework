import {Buffer} from './buffer';
import {ErrnoException} from './errors';
import {proxy} from "./proxy";
export interface InspectOptions {
    showHidden?: boolean;
    depth?: number | null;
    colors?: boolean;
    customInspect?: boolean;
    showProxy?: boolean;
    maxArrayLength?: number | null;
    breakLength?: number;
}
export interface CustomPromisify<TCustom extends Function> extends Function {
    __promisify__: TCustom;
}

export declare const inspect: {
    (object: any, showHidden?: boolean, depth?: number | null, color?: boolean): string;
    (object: any, options: InspectOptions): string;
    colors: {
        [color: string]: [number, number] | undefined
    }
    styles: {
        [style: string]: string | undefined
    }
    defaultOptions: InspectOptions;
    custom: symbol;
};
export declare function format(format: any, ...param: any[]): string;
export declare function debug(string: string): void;
export declare function error(...param: any[]): void;
export declare function puts(...param: any[]): void;
export declare function print(...param: any[]): void;
export declare function log(string: string): void;
export declare function isArray(object: any): object is any[];
export declare function isRegExp(object: any): object is RegExp;
export declare function isDate(object: any): object is Date;
export declare function isError(object: any): object is Error;
export declare function inherits(constructor: any, superConstructor: any): void;
export declare function debuglog(key: string): (msg: string, ...param: any[]) => void;
export declare function isBoolean(object: any): object is boolean;
export declare function isBuffer(object: any): object is Buffer;
export declare function isFunction(object: any): boolean;
export declare function isNull(object: any): object is null;
export declare function isNullOrUndefined(object: any): object is null | undefined;
export declare function isNumber(object: any): object is number;
export declare function isObject(object: any): boolean;
export declare function isPrimitive(object: any): boolean;
export declare function isString(object: any): object is string;
export declare function isSymbol(object: any): object is symbol;
export declare function isUndefined(object: any): object is undefined;
export declare function deprecate<T extends Function>(fn: T, message: string): T;
export declare function callbackify(fn: () => Promise<void>): (callback: (err: ErrnoException) => void) => void;
export declare function callbackify<TResult>(fn: () => Promise<TResult>): (callback: (err: ErrnoException, result: TResult) => void) => void;
export declare function callbackify<T1>(fn: (arg1: T1) => Promise<void>): (arg1: T1, callback: (err: ErrnoException) => void) => void;
export declare function callbackify<T1, TResult>(fn: (arg1: T1) => Promise<TResult>): (arg1: T1, callback: (err: ErrnoException, result: TResult) => void) => void;
export declare function callbackify<T1, T2>(fn: (arg1: T1, arg2: T2) => Promise<void>): (arg1: T1, arg2: T2, callback: (err: ErrnoException) => void) => void;
export declare function callbackify<T1, T2, TResult>(fn: (arg1: T1, arg2: T2) => Promise<TResult>): (arg1: T1, arg2: T2, callback: (err: ErrnoException, result: TResult) => void) => void;
export declare function callbackify<T1, T2, T3>(fn: (arg1: T1, arg2: T2, arg3: T3) => Promise<void>): (arg1: T1, arg2: T2, arg3: T3, callback: (err: ErrnoException) => void) => void;
export declare function callbackify<T1, T2, T3, TResult>(fn: (arg1: T1, arg2: T2, arg3: T3) => Promise<TResult>): (arg1: T1, arg2: T2, arg3: T3,  callback: (err: ErrnoException, result: TResult) => void) => void;
export declare function callbackify<T1, T2, T3, T4>(fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => Promise<void>): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, callback: (err: ErrnoException) => void) => void;
export declare function callbackify<T1, T2, T3, T4, TResult>(fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => Promise<TResult>): (arg1: T1, arg2: T2, arg3: T3, arg4: T4,  callback: (err: ErrnoException, result: TResult) => void) => void;
export declare function callbackify<T1, T2, T3, T4, T5>(fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => Promise<void>): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, callback: (err: ErrnoException) => void) => void;
export declare function callbackify<T1, T2, T3, T4, T5, TResult>(fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => Promise<TResult>): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, callback: (err: ErrnoException, result: TResult) => void) => void;
export declare function callbackify<T1, T2, T3, T4, T5, T6>(fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6) => Promise<void>): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, callback: (err: ErrnoException) => void) => void;
export declare function callbackify<T1, T2, T3, T4, T5, T6, TResult>(fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6) => Promise<TResult>): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, callback: (err: ErrnoException, result: TResult) => void) => void;
export declare function promisify<TCustom extends Function>(fn: CustomPromisify<TCustom>): TCustom;
export declare function promisify<TResult>(fn: (callback: (err: Error, result: TResult) => void) => void): () => Promise<TResult>;
export declare function promisify(fn: (callback: (err: Error) => void) => void): () => Promise<void>;
export declare function promisify<T1, TResult>(fn: (arg1: T1, callback: (err: Error, result: TResult) => void) => void): (arg1: T1) => Promise<TResult>;
export declare function promisify<T1>(fn: (arg1: T1, callback: (err: Error) => void) => void): (arg1: T1) => Promise<void>;
export declare function promisify<T1, T2, TResult>(fn: (arg1: T1, arg2: T2, callback: (err: Error, result: TResult) => void) => void): (arg1: T1, arg2: T2) => Promise<TResult>;
export declare function promisify<T1, T2>(fn: (arg1: T1, arg2: T2, callback: (err: Error) => void) => void): (arg1: T1, arg2: T2) => Promise<void>;
export declare function promisify<T1, T2, T3, TResult>(fn: (arg1: T1, arg2: T2, arg3: T3, callback: (err: Error, result: TResult) => void) => void): (arg1: T1, arg2: T2, arg3: T3) => Promise<TResult>;
export declare function promisify<T1, T2, T3>(fn: (arg1: T1, arg2: T2, arg3: T3, callback: (err: Error) => void) => void): (arg1: T1, arg2: T2, arg3: T3) => Promise<void>;
export declare function promisify<T1, T2, T3, T4, TResult>(fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, callback: (err: Error, result: TResult) => void) => void): (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => Promise<TResult>;
export declare function promisify<T1, T2, T3, T4>(fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, callback: (err: Error) => void) => void): (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => Promise<void>;
export declare function promisify<T1, T2, T3, T4, T5, TResult>(fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, callback: (err: Error, result: TResult) => void) => void): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => Promise<TResult>;
export declare function promisify<T1, T2, T3, T4, T5>(fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, callback: (err: Error) => void) => void): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => Promise<void>;
export declare function promisify(fn: Function): Function;
export declare namespace promisify {
    const custom: symbol;
}

proxy('util', module);