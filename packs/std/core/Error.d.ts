/// <reference no-default-lib="true"/>
declare class Error {
    name: string;
    message: string;
    stack?: string;
    constructor(message?: string);
}
declare class EvalError extends Error {
}
declare class RangeError extends Error {
}
declare class ReferenceError extends Error {
}
declare class SyntaxError extends Error {
}
declare class TypeError extends Error {
}
declare class URIError extends Error {
}