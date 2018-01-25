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
export function swallow(promise: PromiseLike<any>): void {
    promise.then(noop, noop);
}
/**
 * Combination of a promise and its resolve/reject functions.
 * Created using defer().
 *
 * It is generally better (and slightly faster) to use the Promise
 * constructor to create a promise, as that will also catch any exception
 * thrown while running the resolver.
 *
 * A Deferred can be useful in some scenarios though, e.g. when working with
 * timers, protocol request/response pairs, etc.
 */
export class Defer<T=void> {
    /**
     * Initially unresolved promise, resolved by the resolve or reject
     * function on this object.
     */
    promise: Promise<T>;

    /**
     * Reject corresponding promise.
     * The first call to either resolve or reject resolves the promise, any
     * other calls are ignored.
     * This function is a free function (i.e. not a 'method' on this object).
     */
    readonly reject: (reason: Error) => void;

    /**
     * Resolve corresponding promise.
     * The first call to either resolve or reject resolves the promise, any
     * other calls are ignored.
     * This function is a free function (i.e. not a 'method' on this object).
     * Note: resolving with a rejected PromiseLike leads to a rejected promise.
     */
    readonly resolve: (value?: T|PromiseLike<T>) => void;

    constructor() {
        this.promise = new Promise<T>((resolve, reject) => {
            Object.assign(this, {resolve, reject});
        })
    }
}
/**
 * Allows to track the status of a promise. Note that this attaches a handler to the promise so no unhandled rejection can take place after
 * this (after all you're tracking the error)
 */
export class Track<T=void> {
    /**
     * Promise is fulfilled, value is in 'value' member
     */
    readonly isFulfilled: boolean;
    /**
     * Promise not fulfilled/rejected yet
     */
    readonly isPending: boolean;
    /**
     * Promise is rejected; error is in 'reason' member
     */
    readonly isRejected: boolean;
    /**
     * The value when fulfilled
     */
    readonly value: T;
    /**
     * The error for a rejection
     */
    readonly reason: Error;
    /**
     * The original promise
     */
    readonly promise: PromiseLike<T>;
    /**
     *
     * @param  p original promise to track
     */
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
export function delay<T=any>(duration: number, t?: T): Promise<T> {
    return new Promise<T>((resolve: (t: any) => void): void => {
        setTimeout(() => resolve(t), duration);
    });
}
