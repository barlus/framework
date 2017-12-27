/// <reference no-default-lib="true"/>
interface ReadonlyMap<K, V> {
    forEach(callbackfn: (value: V, key: K, map: ReadonlyMap<K, V>) => void, thisArg?: any): void;
    get(key: K): V | undefined;
    has(key: K): boolean;
    readonly size: number;
    /** Returns an iterable of entries in the map. */
        [Symbol.iterator](): IterableIterator<[K, V]>;
    /**
     * Returns an iterable of key, value pairs for every entry in the map.
     */
    entries(): IterableIterator<[K, V]>;
    /**
     * Returns an iterable of keys in the map
     */
    keys(): IterableIterator<K>;
    /**
     * Returns an iterable of values in the map
     */
    values(): IterableIterator<V>;
}
declare class Map<K, V> {
    constructor ();
    constructor (entries?: [K, V][]);
    constructor (iterable: Iterable<[K, V]>);

    readonly [Symbol.toStringTag]: "Map";
    /** Returns an iterable of entries in the map. */
    [Symbol.iterator](): IterableIterator<[K, V]>;
    readonly size: number;
    clear(): void;
    delete(key: K): boolean;
    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
    get(key: K): V | undefined;
    has(key: K): boolean;
    set(key: K, value: V): this;
    /**
     * Returns an iterable of key, value pairs for every entry in the map.
     */
    entries(): IterableIterator<[K, V]>;
    /**
     * Returns an iterable of keys in the map
     */
    keys(): IterableIterator<K>;
    /**
     * Returns an iterable of values in the map
     */
    values(): IterableIterator<V>;
}
declare class WeakMap<K extends object, V> {
    constructor();
    constructor(entries?: [K, V][]);
    constructor(iterable: Iterable<[K, V]>);


    readonly [Symbol.toStringTag]: "WeakMap";
    delete(key: K): boolean;
    get(key: K): V | undefined;
    has(key: K): boolean;
    set(key: K, value: V): this;
}