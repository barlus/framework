/// <reference no-default-lib="true"/>
/// <reference path="./core/Object.d.ts"/>

declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
declare type PromiseConstructorLike = new <T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) => PromiseLike<T>;
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
/**
 * Typed dictionary of object
 */
declare interface Dictionary<T=any> {
    [key: string]: T;
}