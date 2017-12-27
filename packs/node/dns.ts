import {ErrnoException} from './errors';
export interface LookupOptions {
    family?: number;
    hints?: number;
    all?: boolean;
}
export interface LookupOneOptions extends LookupOptions {
    all?: false;
}
export interface LookupAllOptions extends LookupOptions {
    all: true;
}
export interface LookupAddress {
    address: string;
    family: number;
}
export interface ResolveOptions {
    ttl: boolean;
}
export interface ResolveWithTtlOptions extends ResolveOptions {
    ttl: true;
}
export interface RecordWithTtl {
    address: string;
    ttl: number;
}
export interface MxRecord {
    priority: number;
    exchange: string;
}
export interface NaptrRecord {
    flags: string;
    service: string;
    regexp: string;
    replacement: string;
    order: number;
    preference: number;
}
export interface SoaRecord {
    nsname: string;
    hostmaster: string;
    serial: number;
    refresh: number;
    retry: number;
    expire: number;
    minttl: number;
}
export interface SrvRecord {
    priority: number;
    weight: number;
    port: number;
    name: string;
}

// Supported getaddrinfo flags.
export declare const ADDRCONFIG: number;
export declare const V4MAPPED: number;

export declare function lookup(hostname: string, family: number, callback: (err: ErrnoException, address: string, family: number) => void): void;
export declare function lookup(hostname: string, options: LookupOneOptions, callback: (err: ErrnoException, address: string, family: number) => void): void;
export declare function lookup(hostname: string, options: LookupAllOptions, callback: (err: ErrnoException, addresses: LookupAddress[]) => void): void;
export declare function lookup(hostname: string, options: LookupOptions, callback: (err: ErrnoException, address: string | LookupAddress[], family: number) => void): void;
export declare function lookup(hostname: string, callback: (err: ErrnoException, address: string, family: number) => void): void;


export declare function resolve(hostname: string, callback: (err: ErrnoException, addresses: string[]) => void): void;
export declare function resolve(hostname: string, rrtype: "A", callback: (err: ErrnoException, addresses: string[]) => void): void;
export declare function resolve(hostname: string, rrtype: "AAAA", callback: (err: ErrnoException, addresses: string[]) => void): void;
export declare function resolve(hostname: string, rrtype: "CNAME", callback: (err: ErrnoException, addresses: string[]) => void): void;
export declare function resolve(hostname: string, rrtype: "MX", callback: (err: ErrnoException, addresses: MxRecord[]) => void): void;
export declare function resolve(hostname: string, rrtype: "NAPTR", callback: (err: ErrnoException, addresses: NaptrRecord[]) => void): void;
export declare function resolve(hostname: string, rrtype: "NS", callback: (err: ErrnoException, addresses: string[]) => void): void;
export declare function resolve(hostname: string, rrtype: "PTR", callback: (err: ErrnoException, addresses: string[]) => void): void;
export declare function resolve(hostname: string, rrtype: "SOA", callback: (err: ErrnoException, addresses: SoaRecord) => void): void;
export declare function resolve(hostname: string, rrtype: "SRV", callback: (err: ErrnoException, addresses: SrvRecord[]) => void): void;
export declare function resolve(hostname: string, rrtype: "TXT", callback: (err: ErrnoException, addresses: string[][]) => void): void;
export declare function resolve(hostname: string, rrtype: string, callback: (err: ErrnoException, addresses: string[] | MxRecord[] | NaptrRecord[] | SoaRecord | SrvRecord[] | string[][]) => void): void;

export declare function resolve4(hostname: string, callback: (err: ErrnoException, addresses: string[]) => void): void;
export declare function resolve4(hostname: string, options: ResolveWithTtlOptions, callback: (err: ErrnoException, addresses: RecordWithTtl[]) => void): void;
export declare function resolve4(hostname: string, options: ResolveOptions, callback: (err: ErrnoException, addresses: string[] | RecordWithTtl[]) => void): void;


export declare function resolve6(hostname: string, callback: (err: ErrnoException, addresses: string[]) => void): void;
export declare function resolve6(hostname: string, options: ResolveWithTtlOptions, callback: (err: ErrnoException, addresses: RecordWithTtl[]) => void): void;
export declare function resolve6(hostname: string, options: ResolveOptions, callback: (err: ErrnoException, addresses: string[] | RecordWithTtl[]) => void): void;


export declare function resolveCname(hostname: string, callback: (err: ErrnoException, addresses: string[]) => void): void;
export declare function resolveMx(hostname: string, callback: (err: ErrnoException, addresses: MxRecord[]) => void): void;
export declare function resolveNaptr(hostname: string, callback: (err: ErrnoException, addresses: NaptrRecord[]) => void): void;
export declare function resolveNs(hostname: string, callback: (err: ErrnoException, addresses: string[]) => void): void;
export declare function resolvePtr(hostname: string, callback: (err: ErrnoException, addresses: string[]) => void): void;
export declare function resolveSoa(hostname: string, callback: (err: ErrnoException, address: SoaRecord) => void): void;
export declare function resolveSrv(hostname: string, callback: (err: ErrnoException, addresses: SrvRecord[]) => void): void;
export declare function resolveTxt(hostname: string, callback: (err: ErrnoException, addresses: string[][]) => void): void;

export declare function reverse(ip: string, callback: (err: ErrnoException, hostnames: string[]) => void): void;
export declare function setServers(servers: string[]): void;

// Error codes
export declare var NODATA: string;
export declare var FORMERR: string;
export declare var SERVFAIL: string;
export declare var NOTFOUND: string;
export declare var NOTIMP: string;
export declare var REFUSED: string;
export declare var BADQUERY: string;
export declare var BADNAME: string;
export declare var BADFAMILY: string;
export declare var BADRESP: string;
export declare var CONNREFUSED: string;
export declare var TIMEOUT: string;
export declare var EOF: string;
export declare var FILE: string;
export declare var NOMEM: string;
export declare var DESTRUCTION: string;
export declare var BADSTR: string;
export declare var BADFLAGS: string;
export declare var NONAME: string;
export declare var BADHINTS: string;
export declare var NOTINITIALIZED: string;
export declare var LOADIPHLPAPI: string;
export declare var ADDRGETNETWORKPARAMS: string;
export declare var CANCELLED: string;