import * as native from "crypto";
import {Buffer} from './buffer';
import {builtin} from './builtin';

import {ReadWriteStream, WritableStream} from './stream';
export type Utf8AsciiLatin1Encoding = "utf8" | "ascii" | "latin1";
export type HexBase64Latin1Encoding = "latin1" | "hex" | "base64";
export type Utf8AsciiBinaryEncoding = "utf8" | "ascii" | "binary";
export type HexBase64BinaryEncoding = "binary" | "base64" | "hex";
export type ECDHKeyFormat = "compressed" | "uncompressed" | "hybrid";
export interface CredentialDetails {
    pfx: string;
    key: string;
    passphrase: string;
    cert: string;
    ca: string | string[];
    crl: string | string[];
    ciphers: string;
}
export interface Credentials {
    context?: any;
}
export interface Hash extends ReadWriteStream {
    update(data: string | Buffer): Hash;
    update(data: string | Buffer, input_encoding: Utf8AsciiLatin1Encoding): Hash;
    digest(): Buffer;
    digest(encoding: HexBase64Latin1Encoding): string;
}
export interface Hmac extends ReadWriteStream {
    update(data: string | Buffer): Hmac;
    update(data: string | Buffer, input_encoding: Utf8AsciiLatin1Encoding): Hmac;
    digest(): Buffer;
    digest(encoding: HexBase64Latin1Encoding): string;
}
export interface Cipher extends ReadWriteStream {
    update(data: Buffer): Buffer;
    update(data: string, input_encoding: Utf8AsciiBinaryEncoding): Buffer;
    update(data: Buffer, input_encoding: any, output_encoding: HexBase64BinaryEncoding): string;
    update(data: string, input_encoding: Utf8AsciiBinaryEncoding, output_encoding: HexBase64BinaryEncoding): string;
    final(): Buffer;
    final(output_encoding: string): string;
    setAutoPadding(auto_padding?: boolean): void;
    getAuthTag(): Buffer;
    setAAD(buffer: Buffer): void;
}
export interface Decipher extends ReadWriteStream {
    update(data: Buffer): Buffer;
    update(data: string, input_encoding: HexBase64BinaryEncoding): Buffer;
    update(data: Buffer, input_encoding: any, output_encoding: Utf8AsciiBinaryEncoding): string;
    update(data: string, input_encoding: HexBase64BinaryEncoding, output_encoding: Utf8AsciiBinaryEncoding): string;
    final(): Buffer;
    final(output_encoding: string): string;
    setAutoPadding(auto_padding?: boolean): void;
    setAuthTag(tag: Buffer): void;
    setAAD(buffer: Buffer): void;
}
export interface Signer extends WritableStream {
    update(data: string | Buffer): Signer;
    update(data: string | Buffer, input_encoding: Utf8AsciiLatin1Encoding): Signer;
    sign(private_key: string | { key: string; passphrase: string }): Buffer;
    sign(private_key: string | { key: string; passphrase: string }, output_format: HexBase64Latin1Encoding): string;
}
export interface Verify extends WritableStream {
    update(data: string | Buffer): Verify;
    update(data: string | Buffer, input_encoding: Utf8AsciiLatin1Encoding): Verify;
    verify(object: string | Object, signature: Buffer | DataView): boolean;
    verify(object: string | Object, signature: string, signature_format: HexBase64Latin1Encoding): boolean;
    // https://nodejs.org/api/crypto.html#crypto_verifier_verify_object_signature_signature_format
    // The signature field accepts a TypedArray type, but it is only available starting ES2017
}
export interface DiffieHellman {
    generateKeys(): Buffer;
    generateKeys(encoding: HexBase64Latin1Encoding): string;
    computeSecret(other_public_key: Buffer): Buffer;
    computeSecret(other_public_key: string, input_encoding: HexBase64Latin1Encoding): Buffer;
    computeSecret(other_public_key: string, input_encoding: HexBase64Latin1Encoding, output_encoding: HexBase64Latin1Encoding): string;
    getPrime(): Buffer;
    getPrime(encoding: HexBase64Latin1Encoding): string;
    getGenerator(): Buffer;
    getGenerator(encoding: HexBase64Latin1Encoding): string;
    getPublicKey(): Buffer;
    getPublicKey(encoding: HexBase64Latin1Encoding): string;
    getPrivateKey(): Buffer;
    getPrivateKey(encoding: HexBase64Latin1Encoding): string;
    setPublicKey(public_key: Buffer): void;
    setPublicKey(public_key: string, encoding: string): void;
    setPrivateKey(private_key: Buffer): void;
    setPrivateKey(private_key: string, encoding: string): void;
    verifyError: number;
}
export interface RsaPublicKey {
    key: string;
    padding?: number;
}
export interface RsaPrivateKey {
    key: string;
    passphrase?: string;
    padding?: number;
}
export interface ECDH {
    generateKeys(): Buffer;
    generateKeys(encoding: HexBase64Latin1Encoding): string;
    generateKeys(encoding: HexBase64Latin1Encoding, format: ECDHKeyFormat): string;
    computeSecret(other_public_key: Buffer): Buffer;
    computeSecret(other_public_key: string, input_encoding: HexBase64Latin1Encoding): Buffer;
    computeSecret(other_public_key: string, input_encoding: HexBase64Latin1Encoding, output_encoding: HexBase64Latin1Encoding): string;
    getPrivateKey(): Buffer;
    getPrivateKey(encoding: HexBase64Latin1Encoding): string;
    getPublicKey(): Buffer;
    getPublicKey(encoding: HexBase64Latin1Encoding): string;
    getPublicKey(encoding: HexBase64Latin1Encoding, format: ECDHKeyFormat): string;
    setPrivateKey(private_key: Buffer): void;
    setPrivateKey(private_key: string, encoding: HexBase64Latin1Encoding): void;
}

@builtin(native,(module)=>module.Certificate)
export class Certificate {
    static exportChallenge?(spkac: string | Buffer): Buffer;
    static exportPublicKey?(spkac: string | Buffer): Buffer;
    static verifySpkac?(spkac: Buffer): boolean;
    exportChallenge?(spkac: string | Buffer): Buffer;
    exportPublicKey?(spkac: string | Buffer): Buffer;
    verifySpkac?(spkac: Buffer): boolean;
}

@builtin(native,(module)=>{
    Object.getOwnPropertyNames(module).forEach(key=>{
        Object.defineProperty(Crypto,key,Object.getOwnPropertyDescriptor(module,key))
    })
    //Object.assign(Crypto,module);
    return Crypto;
})
export class Crypto {
    static fips: boolean;
    static DEFAULT_ENCODING: string;
    static createCredentials?(details: CredentialDetails): Credentials;
    static createHash?(algorithm: string): Hash;
    static createHmac?(algorithm: string, key: string | Buffer): Hmac;
    static createCipher?(algorithm: string, password: any): Cipher;
    static createCipheriv?(algorithm: string, key: any, iv: any): Cipher;
    static createDecipher?(algorithm: string, password: any): Decipher;
    static createDecipheriv?(algorithm: string, key: any, iv: any): Decipher;
    static createSign?(algorithm: string): Signer;
    static createVerify?(algorith: string): Verify;
    static createDiffieHellman?(prime_length: number, generator?: number): DiffieHellman;
    static createDiffieHellman?(prime: Buffer): DiffieHellman;
    static createDiffieHellman?(prime: string, prime_encoding: HexBase64Latin1Encoding): DiffieHellman;
    static createDiffieHellman?(prime: string, prime_encoding: HexBase64Latin1Encoding, generator: number | Buffer): DiffieHellman;
    static createDiffieHellman?(prime: string, prime_encoding: HexBase64Latin1Encoding, generator: string, generator_encoding: HexBase64Latin1Encoding): DiffieHellman;
    static getDiffieHellman?(group_name: string): DiffieHellman;
    static pbkdf2?(password: string | Buffer, salt: string | Buffer, iterations: number, keylen: number, digest: string, callback: (err: Error, derivedKey: Buffer) => any): void;
    static pbkdf2Sync?(password: string | Buffer, salt: string | Buffer, iterations: number, keylen: number, digest: string): Buffer;
    static randomBytes?(size: number): Buffer;
    static randomBytes?(size: number, callback: (err: Error, buf: Buffer) => void): void;
    static pseudoRandomBytes?(size: number): Buffer;
    static pseudoRandomBytes?(size: number, callback: (err: Error, buf: Buffer) => void): void;
    static randomFillSync?(buffer: Buffer | Uint8Array, offset?: number, size?: number): Buffer;
    static randomFill?(buffer: Buffer, callback: (err: Error, buf: Buffer) => void): void;
    static randomFill?(buffer: Uint8Array, callback: (err: Error, buf: Uint8Array) => void): void;
    static randomFill?(buffer: Buffer, offset: number, callback: (err: Error, buf: Buffer) => void): void;
    static randomFill?(buffer: Uint8Array, offset: number, callback: (err: Error, buf: Uint8Array) => void): void;
    static randomFill?(buffer: Buffer, offset: number, size: number, callback: (err: Error, buf: Buffer) => void): void;
    static randomFill?(buffer: Uint8Array, offset: number, size: number, callback: (err: Error, buf: Uint8Array) => void): void;
    static publicEncrypt?(public_key: string | RsaPublicKey, buffer: Buffer): Buffer;
    static privateDecrypt?(private_key: string | RsaPrivateKey, buffer: Buffer): Buffer;
    static privateEncrypt?(private_key: string | RsaPrivateKey, buffer: Buffer): Buffer;
    static publicDecrypt?(public_key: string | RsaPublicKey, buffer: Buffer): Buffer;
    static getCiphers?(): string[];
    static getCurves?(): string[];
    static getHashes?(): string[];
    static createECDH?(curve_name: string): ECDH;
    static timingSafeEqual?(a: Buffer, b: Buffer): boolean;
}