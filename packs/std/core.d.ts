/// <reference no-default-lib="true"/>
/// <reference path="./core/Array.d.ts"/>
/// <reference path="./core/Boolean.d.ts"/>
/// <reference path="./core/Date.d.ts"/>
/// <reference path="./core/Error.d.ts"/>
/// <reference path="./core/Function.d.ts"/>
/// <reference path="./core/Generators.d.ts"/>
/// <reference path="./core/JSON.d.ts"/>
/// <reference path="./core/Map.d.ts"/>
/// <reference path="./core/Math.d.ts"/>
/// <reference path="./core/Number.d.ts"/>
/// <reference path="./core/Object.d.ts"/>
/// <reference path="./core/Promise.d.ts"/>
/// <reference path="./core/Proxy.d.ts"/>
/// <reference path="./core/Reflect.d.ts"/>
/// <reference path="./core/RegExp.d.ts"/>
/// <reference path="./core/Set.d.ts"/>
/// <reference path="./core/String.d.ts"/>
/// <reference path="./core/Symbol.d.ts"/>

// constants
declare const NaN: number;
declare const Infinity: number;
/**
 * Evaluates JavaScript code and executes it.
 * @param x A String value that contains valid JavaScript code.
 */
declare function eval(x: string): any;
/**
 * Converts A string to an integer.
 * @param s A string to convert into a number.
 * @param radix A value between 2 and 36 that specifies the base of the number in numString.
 * If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal.
 * All other strings are considered decimal.
 */
declare function parseInt(s: string, radix?: number): number;
/**
 * Converts a string to a floating-point number.
 * @param string A string that contains a floating-point number.
 */
declare function parseFloat(string: string): number;
/**
 * Returns a Boolean value that indicates whether a value is the reserved value NaN (not a number).
 * @param number A numeric value.
 */
declare function isNaN(number: number): boolean;
/**
 * Determines whether a supplied number is finite.
 * @param number Any numeric value.
 */
declare function isFinite(number: number): boolean;
/**
 * Gets the unencoded version of an encoded Uniform Resource Identifier (URI).
 * @param encodedURI A value representing an encoded URI.
 */
declare function decodeURI(encodedURI: string): string;
/**
 * Gets the unencoded version of an encoded component of a Uniform Resource Identifier (URI).
 * @param encodedURIComponent A value representing an encoded URI component.
 */
declare function decodeURIComponent(encodedURIComponent: string): string;
/**
 * Encodes a text string as a valid Uniform Resource Identifier (URI)
 * @param uri A value representing an encoded URI.
 */
declare function encodeURI(uri: string): string;
/**
 * Encodes a text string as a valid component of a Uniform Resource Identifier (URI).
 * @param uriComponent A value representing an encoded URI component.
 */
declare function encodeURIComponent(uriComponent: string): string;