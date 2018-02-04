/// <reference no-default-lib="true"/>
/// <reference path="./core/Object.d.ts"/>
// declare type ClassDecorator = <C extends Function>(target: C) => C | void;
// declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
// declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
// declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
interface ClassDecorator {
    <C extends {new()}>(target: C) : C | void
}
interface PropertyDecorator {
    <C extends {new()}>(target: object|C, propertyKey: string | symbol) : void
}
interface MethodDecorator {
    <C extends {new()},T>(target: object|C, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) : TypedPropertyDescriptor<T> | void
}
interface ParameterDecorator {
    <C extends {new()}>(target: object|C, propertyKey: string | symbol, parameterIndex: number) : void
}
//
declare interface PromiseConstructorLike {
    new <T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) : PromiseLike<T>
}
declare type PropertyKey = string | number | symbol;
declare type DateTimeFormatPartTypes = "day" | "dayPeriod" | "era" | "hour" | "literal" | "minute" | "month" | "second" | "timeZoneName" | "weekday" | "year";
/**
 * Make all properties in T optional
 */
declare type Partial<T> = { [P in keyof T]?: T[P];};
/**
 * Make all properties in T readonly
 */
declare type Readonly<T> = { readonly [P in keyof T]: T[P]; };
/**
 * From T pick a set of properties K
 */
declare type Pick<T, K extends keyof T> = { [P in K]: T[P]; };
/**
 * Construct a type with a set of properties K of type T
 */
declare type Record<K extends string, T> = {[P in K]: T;};
declare type Mutable<T extends { [x: string]: any }, K extends string> = {[P in K]: T[P];}
declare type Permit<T> = Mutable<T, keyof T>;
/**
 * Typed dictionary of object
 */
declare interface Dictionary<T=any> {
    [key: string]: T;
}

declare interface Class<T extends object=any> extends Function {
    new(...args):T;
    prototype:T;
}
