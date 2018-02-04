/**
 * Allowed ArrayBuffer types for the buffer of an ArrayBufferView and related Typed Arrays.
 */
declare type ArrayBufferLike = ArrayBufferTypes[keyof ArrayBufferTypes];
interface ArrayBufferView {
    /**
     * The ArrayBuffer instance referenced by the array.
     */
    buffer: ArrayBufferLike;
    /**
     * The length in bytes of the array.
     */
    byteLength: number;
    /**
     * The offset in bytes of the array.
     */
    byteOffset: number;
}
interface ArrayBufferTypes {
    ArrayBuffer: ArrayBuffer;
    SharedArrayBuffer: SharedArrayBuffer;
}
/**
 * Represents a raw buffer of binary data, which is used to store data for the
 * different typed arrays. ArrayBuffers cannot be read from or written to directly,
 * but can be passed to a typed array or DataView Object to interpret the raw
 * buffer as needed.
 */
declare class ArrayBuffer {
    static isView(arg: any): arg is ArrayBufferView;
    constructor(byteLength: number);
    readonly [Symbol.toStringTag]: "ArrayBuffer";
    /**
     * Read-only. The length of the ArrayBuffer (in bytes).
     */
    readonly byteLength: number;
    /**
     * Returns a section of an ArrayBuffer.
     */
    slice(begin: number, end?: number): ArrayBuffer;
}
declare class SharedArrayBuffer {
    constructor(byteLength: number);
    /**
     * Read-only. The length of the ArrayBuffer (in bytes).
     */
    readonly byteLength: number;
    readonly [Symbol.species]: SharedArrayBuffer;
    readonly [Symbol.toStringTag]: "SharedArrayBuffer";
    /*
     * The SharedArrayBuffer constructor's length property whose value is 1.
     */
    length: number;
    /**
     * Returns a section of an SharedArrayBuffer.
     */
    slice(begin: number, end?: number): SharedArrayBuffer;
}