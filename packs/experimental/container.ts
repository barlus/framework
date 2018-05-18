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
            if (thisArg) {
                if (false === await callbackfn.call(thisArg, v)) {
                    result = false;
                    return false;
                }
            } else {
                if (false === await callbackfn(v)) {
                    result = false;
                    return false;
                }
            }
        }, null, false)
        return result;
    }
    static async some<T>(iterator: AsyncIterator<T> | Iterator<T>, callbackfn: (value: T) => Promise<boolean>, thisArg?: any): Promise<boolean> {
        let result = false;
        await this.forEach(iterator, async v => {
            if (thisArg) {
                if (true === await callbackfn.call(thisArg, v)) {
                    result = true;
                    return false;
                }
            } else {
                if (true === await callbackfn(v)) {
                    result = true;
                    return false;
                }
            }
        }, null, false)
        return result;
    }
    static async forEach<T, R>(iterator: AsyncIterator<T> | Iterator<T>, callbackfn: (value: T) => Promise<void> | Promise<R>, thisArg?: any, brakeOnReturn?: R): Promise<void> {
        let result = await iterator.next();
        while (!result.done) {
            if (thisArg) {
                if (brakeOnReturn === await callbackfn.call(thisArg, result.value) && brakeOnReturn !== undefined) {
                    break;
                }
            } else {
                if (brakeOnReturn === await callbackfn(result.value) && brakeOnReturn !== undefined) {
                    break;
                }
            }
            result = await iterator.next();
        }
    }
    static async reduce<T, U>(iterator: AsyncIterator<T> | Iterator<T>, callbackfn: (previousValue: U, currentValue: T) => Promise<U>, initialValue: U, thisArg?: any): Promise<U> {
        let aggregate = initialValue;
        await this.forEach(iterator, async v => {
            if (thisArg) {
                aggregate = await callbackfn.call(thisArg, aggregate, v)
            } else {
                aggregate = await callbackfn(aggregate, v)
            }
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
                let mapped: U;
                if (thisArg) {
                    mapped = await callbackfn.call(thisArg, result.value);
                } else {
                    mapped = await callbackfn(result.value);
                }
                return {
                    done: false,
                    value: mapped
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
                    let condition: boolean;
                    if (thisArg) {
                        condition = await callbackfn.call(thisArg, result.value);
                    } else {
                        condition = await callbackfn(result.value);
                    }
                    if (true === condition) {
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

    constructor(private iteratable: AsyncIterable<T> | Iterable<T>) {

    }
    static from<E>(iteratable: AsyncIterable<E> | Iterable<E>): AsyncContainer<E> {
        return new AsyncContainer<E>(iteratable)
    }
}
