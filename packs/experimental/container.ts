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
    forEach(callbackfn?: (value: T, breaker: () => void) => Promise<void>, thisArg?: any): Promise<void> {
        return AsyncContainer.forEach<T>(this[Symbol.asyncIterator](), callbackfn, thisArg);
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
        await this.forEach(iterator, async (v, breaker) => {
            if (false === await callbackfn.call(thisArg, v)) {
                result = false;
                breaker();
            }
        });
        return result;
    }
    static async some<T>(iterator: AsyncIterator<T> | Iterator<T>, callbackfn: (value: T) => Promise<boolean>, thisArg?: any): Promise<boolean> {
        let result = false;
        await this.forEach(iterator, async (v, breaker) => {
            if (true === await callbackfn.call(thisArg, v)) {
                result = true;
                breaker();
            }
        })
        return result;
    }

    static async forEach<T>(iterator: AsyncIterator<T> | Iterator<T>, callbackfn?: (value: T, breaker: () => void) => Promise<void>, thisArg?: any): Promise<void> {
        let result = await iterator.next();
        let breaked = false;
        let breaker = () => {
            breaked = true;
        }
        while (!result.done) {
            if (callbackfn) {
                await callbackfn.call(thisArg, result.value, breaker)
                if (breaked) {
                    break;
                }
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

    static parallel<T, U>(iterator: AsyncIterator<T> | Iterator<T>, concurrency: number, callbackfn: (value: T) => Promise<U>, thisArg?: any): AsyncIterableIterator<U> {
        let race = new AsyncRace<IteratorResult<U>>();
        let sequential = new AsyncSequentialIterator(iterator);

        async function call(promise: Promise<IteratorResult<T>>): Promise<IteratorResult<U>> {
            let result = await promise;
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

        return {
            [Symbol.asyncIterator](): AsyncIterableIterator<U> {
                return this;
            },
            next(value?: any): Promise<IteratorResult<U>> {
                while (race.length < concurrency) {
                    race.push(call(sequential.next()))
                }
                return race.pop();
            },
        }
    }

    static priority<T>(iterators: { it: AsyncIterator<T> | Iterator<T>, nice: number }[]): AsyncIterableIterator<T> {
        async function next(it: AsyncIterator<T> | Iterator<T>) {
            return {
                it,
                result: await it.next()
            }
        }
        let prioritizer = new Prioritizer<AsyncIterator<T> | Iterator<T>>();
        let cache = new Map<AsyncIterator<T> | Iterator<T>, Promise<{ it: AsyncIterator<T> | Iterator<T>, result: IteratorResult<T> }>>()
        for (let value of iterators) {
            prioritizer.set(value.it, value.nice);
            cache.set(value.it, next(value.it))
        }
        return {
            [Symbol.asyncIterator](): AsyncIterableIterator<T> {
                return this;
            },
            async next(value?: any): Promise<IteratorResult<T>> {
                while (true) {
                    let candidates = prioritizer.order().map(value => cache.get(value));
                    if (candidates.length == 0) {
                        return {
                            done: true,
                            value: undefined
                        }
                    }
                    let winner = await Promise.race(candidates);
                    if (winner.result.done) {
                        prioritizer.delete(winner.it);
                        cache.delete(winner.it);
                    } else {
                        prioritizer.record(winner.it)
                        cache.set(winner.it, next(winner.it))
                        return winner.result;
                    }
                }
            },
        }
    }

    constructor(private iteratable: AsyncIterable<T> | Iterable<T>) {

    }
    static from<E>(iteratable: AsyncIterable<E> | Iterable<E>): AsyncContainer<E> {
        return new AsyncContainer<E>(iteratable)
    }
}

export class AsyncSequentialIterator<T> implements AsyncIterator<T>{
    next(value?: any): Promise<IteratorResult<T>> {
        this.previous = this.previous.then((result) => {
            if (result.done) {
                return {
                    done: true,
                    value: undefined
                }
            }
            return this.iterator.next(value);
        })
        return this.previous
    }
    constructor(private iterator: AsyncIterator<T> | Iterator<T>) { }
    private previous = Promise.resolve({ done: false, value: undefined })
}

export class AsyncRace<T>{
    push(...promises: Promise<T>[]) {
        for (let p of promises) {
            this.pending++;
            let hook = () => {
                if (this.defers.length) {
                    let defer = this.defers.shift();
                    defer.accept(p)
                } else {
                    this.promises.push(p)
                }
                this.pending--;
            }
            p.then(hook, hook)
        }
    }
    pop(): Promise<T> {
        if (this.promises.length) {
            return this.promises.shift();
        }
        let defer = new AsyncDefer<T>();
        this.defers.push(defer);
        return defer.promise;
    }
    get length() {
        return this.pending
    }
    private pending = 0;
    private defers: AsyncDefer<T>[] = []
    private promises: Promise<T>[] = [];
}

class Prioritizer<T> {
    private normalize() {
        let concourents = [...this.concourents]
        let total = concourents.reduce((p, [key, nice]) => p + nice, 0);
        this.normalized = concourents.map(([key, nice]) => {
            let normal = nice ? (total) ? (total - nice) / total : 2 : 2;
            return [key, normal] as [T, number]
        });
    }
    set(key: T, nice: number) {
        this.concourents.set(key, nice)
        this.normalize();
        this.statistics.set(key, { value: 0 })
    }
    delete(key: T) {
        this.concourents.delete(key);
        this.normalize();
        this.statistics.delete(key);
        this.records = [...this.statistics.values()].reduce((p, c) => (p + c.value), 0)
    }
    order(): T[] {
        let scores: [T, number][] = [];
        for (let [key, normal] of this.normalized) {
            let score = (this.records) ? this.statistics.get(key).value / this.records - normal : -normal;
            scores.push([key, score]);
        }
        return scores.sort((a, b) => {
            return a[1] - b[1]
        }).map(p => p[0]);
    }
    record(key: T) {
        this.statistics.get(key).value++;
        this.records++;
    }
    private records = 0;
    private statistics = new Map<T, { value: number }>();
    private concourents = new Map<T, number>();
    private normalized: [T, number][] = [];
}