export declare class AssertionError implements Error {
    name: string;
    message: string;
    actual: any;
    expected: any;
    operator: string;
    generatedMessage: boolean;

    constructor(options?: {
        message?: string; actual?: any; expected?: any;
        operator?: string; stackStartFunction?: Function
    });
}
export declare function fail(message: string): void;
export declare function fail(actual: any, expected: any, message?: string, operator?: string): void;
export declare function ok(value: any, message?: string): void;
export declare function equal(actual: any, expected: any, message?: string): void;
export declare function notEqual(actual: any, expected: any, message?: string): void;
export declare function deepEqual(actual: any, expected: any, message?: string): void;
export declare function notDeepEqual(acutal: any, expected: any, message?: string): void;
export declare function strictEqual(actual: any, expected: any, message?: string): void;
export declare function notStrictEqual(actual: any, expected: any, message?: string): void;
export declare function deepStrictEqual(actual: any, expected: any, message?: string): void;
export declare function notDeepStrictEqual(actual: any, expected: any, message?: string): void;

export declare function throws(block: Function, message?: string): void;
export declare function throws(block: Function, error: Function, message?: string): void;
export declare function throws(block: Function, error: RegExp, message?: string): void;
export declare function throws(block: Function, error: (err: any) => boolean, message?: string): void;

export declare function doesNotThrow(block: Function, message?: string): void;
export declare function doesNotThrow(block: Function, error: Function, message?: string): void;
export declare function doesNotThrow(block: Function, error: RegExp, message?: string): void;
export declare function doesNotThrow(block: Function, error: (err: any) => boolean, message?: string): void;
export declare function ifError(value: any): void;


const M = require('assert');
Object.assign(module.exports,{
    ok: M.ok
});