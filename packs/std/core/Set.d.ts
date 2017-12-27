
interface ReadonlySet<T> {
    forEach(callbackfn: (value: T, value2: T, set: ReadonlySet<T>) => void, thisArg?: any): void;
    has(value: T): boolean;
    readonly size: number;
    /** Iterates over values in the set. */
        [Symbol.iterator](): IterableIterator<T>;
    /**
     * Returns an iterable of [v,v] pairs for every value `v` in the set.
     */
    entries(): IterableIterator<[T, T]>;
    /**
     * Despite its name, returns an iterable of the values in the set,
     */
    keys(): IterableIterator<T>;
    /**
     * Returns an iterable of values in the set.
     */
    values(): IterableIterator<T>;
}

declare class Set<T> {
    constructor();
    constructor(values?: T[]);
    constructor(iterable: Iterable<T>);
    readonly [Symbol.toStringTag]: "Set";
    add(value: T): this;
    clear(): void;
    delete(value: T): boolean;
    forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void;
    has(value: T): boolean;
    readonly size: number;
    /** Iterates over values in the set. */
        [Symbol.iterator](): IterableIterator<T>;
    /**
     * Returns an iterable of [v,v] pairs for every value `v` in the set.
     */
    entries(): IterableIterator<[T, T]>;
    /**
     * Despite its name, returns an iterable of the values in the set,
     */
    keys(): IterableIterator<T>;
    /**
     * Returns an iterable of values in the set.
     */
    values(): IterableIterator<T>;
}

declare class WeakSet<T> {
    constructor();
    constructor(values?: T[]);
    constructor(iterable: Iterable<T>);
    readonly [Symbol.toStringTag]: "WeakSet";
    add(value: T): this;
    delete(value: T): boolean;
    has(value: T): boolean;
}
