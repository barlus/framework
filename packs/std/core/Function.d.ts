/// <reference no-default-lib="true"/>
interface IArguments {
    /** Iterator */
    [Symbol.iterator](): IterableIterator<any>;
    [index: number]: any;
    length: number;
    callee: Function;
}
/**
 * Creates a new function.
 */
declare class Function {
    /**
     * Determines whether the given value inherits from this function if this function was used
     * as a constructor function.
     *
     * A constructor function can control which objects are recognized as its instances by
     * 'instanceof' by overriding this method.
     */
    [Symbol.hasInstance](value: any): boolean;
    /**
     * Returns the name of the function. Function names are read-only and can not be changed.
     */
    readonly name: string;
    /**
     * Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.
     * @param thisArg The object to be used as the this object.
     * @param argArray A set of arguments to be passed to the function.
     */
    apply(this: Function, thisArg: any, argArray?: any): any;
    /**
     * Calls a method of an object, substituting another object for the current object.
     * @param thisArg The object to be used as the current object.
     * @param argArray A list of arguments to be passed to the method.
     */
    call(this: Function, thisArg: any, ...argArray: any[]): any;
    /**
     * For a given function, creates a bound function that has the same body as the original function.
     * The this object of the bound function is associated with the specified object, and has the specified initial parameters.
     * @param thisArg An object to which the this keyword can refer inside the new function.
     * @param argArray A list of arguments to be passed to the new function.
     */
    bind(this: Function, thisArg: any, ...argArray: any[]): any;
    /** Returns a string representation of a function. */
    toString(): string;
    prototype: any;
    readonly length: number;
    // Non-standard extensions
    arguments: any;
    caller: Function;
    constructor(...args: string[]);
}
