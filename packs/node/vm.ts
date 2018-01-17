import {Buffer} from './buffer';
export interface Context { }
export interface ScriptOptions {
    filename?: string;
    lineOffset?: number;
    columnOffset?: number;
    displayErrors?: boolean;
    timeout?: number;
    cachedData?: Buffer;
    produceCachedData?: boolean;
}
export interface RunningScriptOptions {
    filename?: string;
    lineOffset?: number;
    columnOffset?: number;
    displayErrors?: boolean;
    timeout?: number;
}
export declare class Script {
    constructor(code: string, options?: ScriptOptions);
    runInContext(contextifiedSandbox: Context, options?: RunningScriptOptions): any;
    runInNewContext(sandbox?: Context, options?: RunningScriptOptions): any;
    runInThisContext(options?: RunningScriptOptions): any;
}
export declare function createContext(sandbox?: Context): Context;
export declare function isContext(sandbox: Context): boolean;
export declare function runInContext(code: string, contextifiedSandbox: Context, options?: RunningScriptOptions): any;
export declare function runInDebugContext(code: string): any;
export declare function runInNewContext(code: string, sandbox?: Context, options?: RunningScriptOptions): any;
export declare function runInThisContext(code: string, options?: RunningScriptOptions): any;

const M = require('vm');
Object.assign(module.exports,M);