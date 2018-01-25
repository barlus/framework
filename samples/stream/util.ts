/**
 * Promise-based object stream with seamless support for back-pressure and error
 * handling, written in Typescript.
 *
 * Copyright (C) 2015 Martin Poelstra
 * License: MIT
 */

import {TrackedPromise, TrackedVoidPromise} from './types';

/**
 * Do nothing.
 */
export function noop(...args: any[]): void {
    /* no-op */
}

/**
 * Swallow any error that may result from this promise.
 * Prevents PossiblyUnhandledExceptionErrors.
 */
export function swallowErrors(promise: PromiseLike<any>): void {
    promise.then(noop, noop);
}

export class Defer<T=void> {
    readonly resolve: (value?: T | PromiseLike<T>) => void;
    readonly reject: (error: Error) => void;
    readonly promise: Promise<T>;
    constructor() {
        this.promise = new Promise<T>((resolve, reject) => {
            Object.assign(this, {resolve, reject});
        })
    }
}

/**
 * Allows to track the status of a promise. Note that this attaches a handler to the promise so no unhandled rejection can take place after
 * this (after all you're tracking the error)
 *
 * @param p promise to track
 */
export function track(p: PromiseLike<void>): TrackedVoidPromise;
export function track<T>(p: PromiseLike<T>): TrackedPromise<T>;
export function track<T>(p: PromiseLike<T>): TrackedPromise<T> {
    return new Track(p);
}
class Track<T> {
    readonly isFulfilled: boolean;
    readonly isPending: boolean;
    readonly isRejected: boolean;
    readonly value: T;
    readonly reason: Error;
    readonly promise: PromiseLike<T>;
    constructor(p: PromiseLike<T>) {
        this.isFulfilled = false;
        this.isPending = true;
        this.isRejected = false;
        this.promise = p.then(
            (value: T): T => {
                Object.assign(this,{
                    isPending: false,
                    isFulfilled: true,
                    value: value,
                });
                return value;
            },
            (error: Error): T => {
                Object.assign(this,{
                    isPending: false,
                    isRejected: true,
                    reason: error,
                });
                throw error;
            }
        );
    }
}
/**
 * Resolves a promise after a number of milliseconds
 */
export function delay(duration: number): Promise<void>;
export function delay<T>(duration: number, t: T): Promise<T>;
export function delay(duration: number, t?: any): Promise<any> {
    return new Promise((resolve: (t: any) => void): void => {
        setTimeout(() => resolve(t), duration);
    });
}
