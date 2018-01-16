import {proxy} from "./proxy";

export interface UrlObject {
    auth?: string;
    hash?: string;
    host?: string;
    hostname?: string;
    href?: string;
    path?: string;
    pathname?: string;
    port?: string | number;
    protocol?: string;
    query?: string | null | { [key: string]: string | string[] };
    search?: string;
    slashes?: boolean;
}

export interface Url extends UrlObject {
    port?: string;
    query?: any;
}

export declare function parse(urlStr: string, parseQueryString?: boolean, slashesDenoteHost?: boolean): Url;
export declare function format(URL: URL, options?: URLFormatOptions): string;
export declare function format(urlObject: UrlObject | string): string;
export declare function resolve(from: string, to: string): string;

export interface URLFormatOptions {
    auth?: boolean;
    fragment?: boolean;
    search?: boolean;
    unicode?: boolean;
}

export declare class URLSearchParams implements Iterable<[string, string]> {
    constructor(init?: URLSearchParams | string | { [key: string]: string | string[] | undefined } | Iterable<[string, string]> | Array<[string, string]>);
    append(name: string, value: string): void;
    delete(name: string): void;
    entries(): IterableIterator<[string, string]>;
    forEach(callback: (value: string, name: string) => void): void;
    get(name: string): string | null;
    getAll(name: string): string[];
    has(name: string): boolean;
    keys(): IterableIterator<string>;
    set(name: string, value: string): void;
    sort(): void;
    toString(): string;
    values(): IterableIterator<string>;
    [Symbol.iterator](): IterableIterator<[string, string]>;
}

export declare class URL {
    constructor(input: string, base?: string | URL);
    hash: string;
    host: string;
    hostname: string;
    href: string;
    readonly origin: string;
    password: string;
    pathname: string;
    port: string;
    protocol: string;
    search: string;
    readonly searchParams: URLSearchParams;
    username: string;
    toString(): string;
    toJSON(): string;
}

proxy('url', module);