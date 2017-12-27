export interface StringifyOptions {
    encodeURIComponent?: Function;
}

export interface ParseOptions {
    maxKeys?: number;
    decodeURIComponent?: Function;
}

export declare function stringify<T>(obj: T, sep?: string, eq?: string, options?: StringifyOptions): string;
export declare function parse(str: string, sep?: string, eq?: string, options?: ParseOptions): { [key: string]: string | string[] };
export declare function parse<T extends {}>(str: string, sep?: string, eq?: string, options?: ParseOptions): T;
export declare function escape(str: string): string;
export declare function unescape(str: string): string;