import { AsyncGuard } from "@barlus/runtime/async/guard";
import { AsyncDefer } from "@barlus/runtime/async/defer";

export class AsyncContainer<T> implements AsyncIterable<T>{
    [Symbol.asyncIterator](): AsyncIterator<T> {
        if (this.iteratable[Symbol.asyncIterator]) {
            return this.iteratable[Symbol.asyncIterator]();
        }
        else if (this.iteratable[Symbol.iterator]) {
            return this.iteratable[Symbol.iterator]();
        }
        else {
            throw new Error("The child is not iteratable");
        }
    }
    every(callbackfn: (value: T) => Promise<boolean>, thisArg?: any): Promise<boolean> {
        return AsyncContainer.every(this[Symbol.asyncIterator](), callbackfn, thisArg);
    }
    some(callbackfn: (value: T) => Promise<boolean>, thisArg?: any): Promise<boolean> {
        return AsyncContainer.some(this[Symbol.asyncIterator](), callbackfn, thisArg);
    }
    forEach<R>(callbackfn: (value: T) => Promise<void> | Promise<R>, thisArg?: any, brakeOnReturn?: R): Promise<void> {
        return AsyncContainer.forEach<T, R>(this[Symbol.asyncIterator](), callbackfn, thisArg, brakeOnReturn);
    }
    reduce<U>(callbackfn: (previousValue: U, currentValue: T) => Promise<U>, initialValue: U, thisArg?: any): Promise<U> {
        return AsyncContainer.reduce(this[Symbol.asyncIterator](), callbackfn, initialValue, thisArg);
    }
    map<U>(callbackfn: (value: T) => Promise<U>, thisArg?: any): AsyncContainer<U> {
        return new AsyncContainer<U>({
            [Symbol.asyncIterator]: (): AsyncIterator<U> => {
                return AsyncContainer.map(this[Symbol.asyncIterator](), callbackfn, thisArg)
            }
        })
    }
    parallel<U>(concurrency: number, callbackfn: (value: T) => Promise<U>, thisArg?: any): AsyncContainer<U> {
        return new AsyncContainer<U>({
            [Symbol.asyncIterator]: (): AsyncIterator<U> => {
                return AsyncContainer.parallel(this[Symbol.asyncIterator](), concurrency, callbackfn, thisArg)
            }
        })
    }
    filter(callbackfn: (value: T) => Promise<boolean>, thisArg?: any): AsyncContainer<T> {
        return new AsyncContainer<T>({
            [Symbol.asyncIterator]: (): AsyncIterator<T> => {
                return AsyncContainer.filter(this[Symbol.asyncIterator](), callbackfn, thisArg)
            }
        })
    }
    all(): Promise<T[]> {
        return AsyncContainer.all(this[Symbol.asyncIterator]())
    }

    static async every<T>(iterator: AsyncIterator<T> | Iterator<T>, callbackfn: (value: T) => Promise<boolean>, thisArg?: any): Promise<boolean> {
        let result = true;
        await this.forEach(iterator, async v => {
            if (false === await callbackfn.call(thisArg, v)) {
                result = false;
                return false;
            }
        }, null, false)
        return result;
    }
    static async some<T>(iterator: AsyncIterator<T> | Iterator<T>, callbackfn: (value: T) => Promise<boolean>, thisArg?: any): Promise<boolean> {
        let result = false;
        await this.forEach(iterator, async v => {
            if (true === await callbackfn.call(thisArg, v)) {
                result = true;
                return false;
            }
        }, null, false)
        return result;
    }
    static async forEach<T, R>(iterator: AsyncIterator<T> | Iterator<T>, callbackfn: (value: T) => Promise<void> | Promise<R>, thisArg?: any, brakeOnReturn?: R): Promise<void> {
        let result = await iterator.next();
        while (!result.done) {
            if (brakeOnReturn === await callbackfn.call(thisArg, result.value) && brakeOnReturn !== undefined) {
                break;
            }
            result = await iterator.next();
        }
    }
    static async reduce<T, U>(iterator: AsyncIterator<T> | Iterator<T>, callbackfn: (previousValue: U, currentValue: T) => Promise<U>, initialValue: U, thisArg?: any): Promise<U> {
        let aggregate = initialValue;
        await this.forEach(iterator, async v => {
            aggregate = await callbackfn.call(thisArg, aggregate, v)
        })
        return aggregate;
    }

    static map<T, U>(iterator: AsyncIterator<T> | Iterator<T>, callbackfn: (value: T) => Promise<U>, thisArg?: any): AsyncIterableIterator<U> {
        return {
            [Symbol.asyncIterator](): AsyncIterableIterator<U> {
                return this;
            },
            async next(value?: any): Promise<IteratorResult<U>> {
                let result = await iterator.next(value);
                if (result.done) {
                    return {
                        done: true,
                        value: undefined
                    }
                }
                return {
                    done: false,
                    value: await callbackfn.call(thisArg, result.value)
                }
            }
        }
    }
    static filter<T>(iterator: AsyncIterator<T> | Iterator<T>, callbackfn: (value: T) => Promise<boolean>, thisArg?: any): AsyncIterableIterator<T> {
        return {
            [Symbol.asyncIterator](): AsyncIterableIterator<T> {
                return this;
            },
            async next(value?: any): Promise<IteratorResult<T>> {
                let result = await iterator.next(value);
                while (!result.done) {
                    if (true === await callbackfn.call(thisArg, result.value)) {
                        return {
                            done: false,
                            value: result.value
                        }
                    }
                    result = await iterator.next(value);
                }
                return {
                    done: true,
                    value: undefined
                }
            }
        }
    }
    static async all<T>(iterator: AsyncIterator<T> | Iterator<T>, ): Promise<T[]> {
        let result: T[] = [];
        await this.forEach(iterator, async v => { result.push(v) });
        return result;
    }
    static parallel<T, U>(iterator: AsyncIterator<T>, concurrency: number, callbackfn: (value: T) => Promise<U>, thisArg?: any): AsyncIterableIterator<U> {
        let race = new AsyncRace<IteratorResult<U>>();
        let count = 0;
        let done = false;
        function refill() {
            if (count >= concurrency || done) {
                return;
            }
            count++
            let promise = iterator.next();
            promise.then(result => {
                if (!result.done) {
                    race.push(callbackfn.call(thisArg, result.value).then(value => {
                        return {
                            done: false,
                            value
                        }
                    }))
                    refill();
                }
                else {
                    done = true
                }
            }).catch(reason => {
                race.push(Promise.reject(reason));
            })
        }
        return {
            [Symbol.asyncIterator](): AsyncIterableIterator<U> {
                return this;
            },
            next(value?: any): Promise<IteratorResult<U>> {
                refill();
                if (done && race.length == 0) {
                    return Promise.resolve({
                        done: true,
                        value: undefined
                    })
                }
                return race.pop().then((r) => {
                    count--
                    return r
                })
            },
        }
    }

    constructor(private iteratable: AsyncIterable<T> | Iterable<T>) {

    }
    static from<E>(iteratable: AsyncIterable<E> | Iterable<E>): AsyncContainer<E> {
        return new AsyncContainer<E>(iteratable)
    }
}

class AsyncRace<T>{
    push(...promises: Promise<T>[]) {
        for (let p of promises) {
            this.count++;
            p.then(value => {
                if (this.defers.length) {
                    let defer = this.defers.shift();
                    defer.accept(value);
                }
                else {
                    this.buffer.push({
                        value,
                        accepted: true
                    });
                }
                this.count--
            }, reason => {
                if (this.defers.length) {
                    let defer = this.defers.shift();
                    defer.reject(reason);
                }
                else {
                    this.buffer.push({
                        reason,
                        accepted: false
                    });
                    
                }
                this.count--
            })
        }
    }
    pop(): Promise<T> {
        if (this.buffer.length) {
            let result = this.buffer.shift();
            if (result.accepted === true) {
                return Promise.resolve(result.value);
            }
            if (result.accepted === false) {
                return Promise.reject(result.reason)
            }
        }
        let defer = new AsyncDefer<T>();
        this.defers.push(defer);
        return defer.promise;
    }
    get length() {
        return this.count + this.buffer.length;
    }
    constructor() {

    }
    private count = 0;
    private defers: AsyncDefer<T>[] = []
    private buffer: ({ value: T, accepted: true } | { reason: any, accepted: false })[] = []
}
