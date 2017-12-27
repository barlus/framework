export interface ucs2 {
    decode(string: string): number[];
    encode(codePoints: number[]): string;
}
export declare const ucs2: ucs2;
export declare const version: any;
export declare function decode(string: string): string;
export declare function encode(string: string): string;
export declare function toUnicode(domain: string): string;
export declare function toASCII(domain: string): string;
