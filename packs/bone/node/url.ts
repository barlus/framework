import * as native from "url";
import {builtin} from "./builtin";


@builtin(native,(module)=>module.URLSearchParams)
export class URLSearchParams implements Iterable<[string, string]> {
    constructor(init?: URLSearchParams | string | { [key: string]: string | string[] | undefined } | Iterable<[string, string]> | Array<[string, string]>){
        throw new Error('Must be overloaded by native');
    }
    append?(name: string, value: string): void;
    delete?(name: string): void;
    entries?(): IterableIterator<[string, string]>;
    forEach?(callback: (value: string, name: string) => void): void;
    get?(name: string): string | null;
    getAll?(name: string): string[];
    has?(name: string): boolean;
    keys?(): IterableIterator<string>;
    set?(name: string, value: string): void;
    sort?(): void;
    toString?(): string;
    values?(): IterableIterator<string>;
    [Symbol.iterator]:()=>IterableIterator<[string, string]>;
}

@builtin(native,(module)=>module.URL)
export class URL {
    constructor(input: string, base?: string | URL){
        throw new Error('Must be overloaded by native');
    }
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
    toString?(): string;
    toJSON?(): string;
}
