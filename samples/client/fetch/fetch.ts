declare function fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
type RequestInfo = Request | string;
type BufferSource = ArrayBuffer | ArrayBufferView;
type RequestCache = "default" | "no-store" | "reload" | "no-cache" | "force-cache";
type RequestCredentials = "omit" | "same-origin" | "include";
type HeadersInit = Headers | string[][] | { [key: string]: string };
type RequestMode = "navigate" | "same-origin" | "no-cors" | "cors";
type RequestRedirect = "follow" | "error" | "manual";
type ReferrerPolicy = "" | "no-referrer" | "no-referrer-when-downgrade" | "origin-only" | "origin-when-cross-origin" | "unsafe-url";
type RequestDestination = "" | "document" | "sharedworker" | "subresource" | "unknown" | "worker";
type RequestType = "" | "audio" | "font" | "image" | "script" | "style" | "track" | "video";
type ResponseType = "basic" | "cors" | "default" | "error" | "opaque" | "opaqueredirect";
type EventListenerOrEventListenerObject = EventListener | EventListenerObject;

interface RequestInit {
    signal?: AbortSignal;
    body?: Blob | BufferSource | FormData | string | null;
    cache?: RequestCache;
    credentials?: RequestCredentials;
    headers?: HeadersInit;
    integrity?: string;
    keepalive?: boolean;
    method?: string;
    mode?: RequestMode;
    redirect?: RequestRedirect;
    referrer?: string;
    referrerPolicy?: ReferrerPolicy;
    window?: any;
}
interface FormData {
    /**
     * Returns an array of key, value pairs for every entry in the list
     */
    entries(): IterableIterator<[string, string | File]>;
    /**
     * Returns a list of keys in the list
     */
    keys(): IterableIterator<string>;
    /**
     * Returns a list of values in the list
     */
    values(): IterableIterator<string | File>;

    [Symbol.iterator](): IterableIterator<string | File>;
}
interface File extends Blob {
    readonly lastModifiedDate: Date;
    readonly name: string;
    readonly webkitRelativePath: string;
    readonly lastModified: number;
}
interface Blob {
    readonly size: number;
    readonly type: string;
    msClose(): void;
    msDetachStream(): any;
    slice(start?: number, end?: number, contentType?: string): Blob;
}
interface Body {
    readonly body: ReadableStream | null;
    readonly bodyUsed: boolean;
    arrayBuffer(): Promise<ArrayBuffer>;
    blob(): Promise<Blob>;
    json(): Promise<any>;
    text(): Promise<string>;
    formData(): Promise<FormData>;
}
interface Headers {
    [Symbol.iterator](): IterableIterator<[string, string]>;
    /**
     * Returns an iterator allowing to go through all key/value pairs contained in this object.
     */
    entries(): IterableIterator<[string, string]>;
    /**
     * Returns an iterator allowing to go through all keys f the key/value pairs contained in this object.
     */
    keys(): IterableIterator<string>;
    /**
     * Returns an iterator allowing to go through all values of the key/value pairs contained in this object.
     */
    values(): IterableIterator<string>;
}
interface Request extends Object, Body {
    readonly cache: RequestCache;
    readonly credentials: RequestCredentials;
    readonly destination: RequestDestination;
    readonly headers: Headers;
    readonly integrity: string;
    readonly keepalive: boolean;
    readonly method: string;
    readonly mode: RequestMode;
    readonly redirect: RequestRedirect;
    readonly referrer: string;
    readonly referrerPolicy: ReferrerPolicy;
    readonly type: RequestType;
    readonly url: string;
    readonly signal: AbortSignal;
    clone(): Request;
}
interface Response extends Object, Body {
    readonly status: number;
    readonly statusText: string;
    readonly headers: Headers;
    readonly ok: boolean;
    readonly type: ResponseType;
    readonly url: string;
    readonly redirected: boolean;
    clone(): Response;
}
interface ReadableStream extends AsyncIterable<any> {
    readonly locked: boolean;
    cancel(): Promise<void>;
    getReader(): ReadableStreamReader;
}
interface ReadableStreamReader {
    cancel(): Promise<void>;
    read(): Promise<any>;
    releaseLock(): void;
}
interface AbortSignal extends EventTarget {
    readonly aborted: boolean;
    onabort: (ev: Event) => any;
}
interface EventTarget {
    addEventListener(type: string, listener?: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    dispatchEvent(evt: Event): boolean;
    removeEventListener(type: string, listener?: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
interface AddEventListenerOptions extends EventListenerOptions {
    passive?: boolean;
    once?: boolean;
}
interface EventListenerOptions {
    capture?: boolean;
}
export {}

async function test(){
    let res = await fetch('http://some.com/url',{
        method:'METHOD',
        headers:{
            some:'header'
        },
        body : Uint8Array.from([1,2,3])
    });
    res.status;//200
    res.statusText;//OK
    res.headers;//
    res.ok;//200-300
    res.redirected;//200-300
    await res.blob(); //
    await res.text(); //
    await res.json(); //
    await res.arrayBuffer();//
    res.bodyUsed;//
    res.body;// Stream
    res.body.getReader();
    await res.body.cancel();

    for await(const chunk of res.body){

    }
}


async function * generator(count:number){
    while(count-->0){
        yield fetch('')
    }
}


async function aaa(){
    for await(const chunk of generator(56)){
        console.info(chunk)
    }
}