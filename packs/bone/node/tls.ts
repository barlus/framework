import * as native                                   from "tls";
import {builtin}                                     from "./builtin";
import {Credentials}                                 from "./crypto";
import {Buffer}                                      from "./buffer";
import {Socket, Server as NetServer, LookupFunction} from "./net"
import {Duplex}                                      from "./stream"


export interface Certificate {
  /**
   * Country code.
   */
  C: string;
  /**
   * Street.
   */
  ST: string;
  /**
   * Locality.
   */
  L: string;
  /**
   * Organization.
   */
  O: string;
  /**
   * Organizational unit.
   */
  OU: string;
  /**
   * Common name.
   */
  CN: string;
}

export interface PeerCertificate {
  subject: Certificate;
  issuer: Certificate;
  subjectaltname: string;
  infoAccess: { [ index: string ]: string[] | undefined };
  modulus: string;
  exponent: string;
  valid_from: string;
  valid_to: string;
  fingerprint: string;
  ext_key_usage: string[];
  serialNumber: string;
  raw: Buffer;
}

export interface DetailedPeerCertificate extends PeerCertificate {
  issuerCertificate: DetailedPeerCertificate;
}

export interface CipherNameAndProtocol {
  /**
   * The cipher name.
   */
  name: string;
  /**
   * SSL/TLS protocol version.
   */
  version: string;
}

export interface TlsOptions {
  host?: string;
  port?: number;
  pfx?: string | Buffer[];
  key?: string | string[] | Buffer | any[];
  passphrase?: string;
  cert?: string | string[] | Buffer | Buffer[];
  ca?: string | string[] | Buffer | Buffer[];
  crl?: string | string[];
  ciphers?: string;
  honorCipherOrder?: boolean;
  requestCert?: boolean;
  rejectUnauthorized?: boolean;
  NPNProtocols?: string[] | Buffer;
  SNICallback?: (servername: string, cb: (err: Error | null, ctx: SecureContext) => void) => void;
  ecdhCurve?: string;
  dhparam?: string | Buffer;
  handshakeTimeout?: number;
  ALPNProtocols?: string[] | Buffer;
  sessionTimeout?: number;
  ticketKeys?: Buffer;
  sessionIdContext?: string;
  secureProtocol?: string;
  secureOptions?: number;
}

export interface ConnectionOptions {
  host?: string;
  port?: number;
  socket?: Socket;
  pfx?: string | Buffer;
  key?: string | string[] | Buffer | Buffer[];
  passphrase?: string;
  cert?: string | string[] | Buffer | Buffer[];
  ca?: string | Buffer | Array<string | Buffer>;
  rejectUnauthorized?: boolean;
  NPNProtocols?: Array<string | Buffer>;
  servername?: string;
  path?: string;
  ALPNProtocols?: Array<string | Buffer>;
  checkServerIdentity?: (servername: string, cert: string | Buffer | Array<string | Buffer>) => any;
  secureProtocol?: string;
  secureContext?: Object;
  session?: Buffer;
  minDHSize?: number;
  lookup?: LookupFunction;
}

export interface ClearTextStream extends Duplex {
  authorized: boolean;
  authorizationError: Error;
  getPeerCertificate(): any;
  getCipher: {
    name: string;
    version: string;
  };
  address: {
    port: number;
    family: string;
    address: string;
  };
  remoteAddress: string;
  remotePort: number;
}

export interface SecurePair {
  encrypted: any;
  cleartext: any;
}

export interface SecureContextOptions {
  pfx?: string | Buffer;
  key?: string | Buffer;
  passphrase?: string;
  cert?: string | Buffer;
  ca?: string | Buffer;
  crl?: string | string[];
  ciphers?: string;
  honorCipherOrder?: boolean;
}

export interface SecureContext {
  context: any;
}

@builtin(native, (module) => module.Server)
export class Server extends NetServer {
  addContext?(hostName: string, credentials: {
    key: string;
    cert: string;
    ca: string;
  }): void;

  /**
   * events.EventEmitter
   * 1. tlsClientError
   * 2. newSession
   * 3. OCSPRequest
   * 4. resumeSession
   * 5. secureConnection
   */
  addListener?(event: string, listener: (...args: any[]) => void): this;
  addListener?(event: "tlsClientError", listener: (err: Error, tlsSocket: TLSSocket) => void): this;
  addListener?(event: "newSession", listener: (sessionId: any, sessionData: any, callback: (err: Error, resp: Buffer) => void) => void): this;
  addListener?(event: "OCSPRequest", listener: (certificate: Buffer, issuer: Buffer, callback: Function) => void): this;
  addListener?(event: "resumeSession", listener: (sessionId: any, callback: (err: Error, sessionData: any) => void) => void): this;
  addListener?(event: "secureConnection", listener: (tlsSocket: TLSSocket) => void): this;

  emit?(event: string | symbol, ...args: any[]): boolean;
  emit?(event: "tlsClientError", err: Error, tlsSocket: TLSSocket): boolean;
  emit?(event: "newSession", sessionId: any, sessionData: any, callback: (err: Error, resp: Buffer) => void): boolean;
  emit?(event: "OCSPRequest", certificate: Buffer, issuer: Buffer, callback: Function): boolean;
  emit?(event: "resumeSession", sessionId: any, callback: (err: Error, sessionData: any) => void): boolean;
  emit?(event: "secureConnection", tlsSocket: TLSSocket): boolean;

  on?(event: string, listener: (...args: any[]) => void): this;
  on?(event: "tlsClientError", listener: (err: Error, tlsSocket: TLSSocket) => void): this;
  on?(event: "newSession", listener: (sessionId: any, sessionData: any, callback: (err: Error, resp: Buffer) => void) => void): this;
  on?(event: "OCSPRequest", listener: (certificate: Buffer, issuer: Buffer, callback: Function) => void): this;
  on?(event: "resumeSession", listener: (sessionId: any, callback: (err: Error, sessionData: any) => void) => void): this;
  on?(event: "secureConnection", listener: (tlsSocket: TLSSocket) => void): this;

  once?(event: string, listener: (...args: any[]) => void): this;
  once?(event: "tlsClientError", listener: (err: Error, tlsSocket: TLSSocket) => void): this;
  once?(event: "newSession", listener: (sessionId: any, sessionData: any, callback: (err: Error, resp: Buffer) => void) => void): this;
  once?(event: "OCSPRequest", listener: (certificate: Buffer, issuer: Buffer, callback: Function) => void): this;
  once?(event: "resumeSession", listener: (sessionId: any, callback: (err: Error, sessionData: any) => void) => void): this;
  once?(event: "secureConnection", listener: (tlsSocket: TLSSocket) => void): this;

  prependListener?(event: string, listener: (...args: any[]) => void): this;
  prependListener?(event: "tlsClientError", listener: (err: Error, tlsSocket: TLSSocket) => void): this;
  prependListener?(event: "newSession", listener: (sessionId: any, sessionData: any, callback: (err: Error, resp: Buffer) => void) => void): this;
  prependListener?(event: "OCSPRequest", listener: (certificate: Buffer, issuer: Buffer, callback: Function) => void): this;
  prependListener?(event: "resumeSession", listener: (sessionId: any, callback: (err: Error, sessionData: any) => void) => void): this;
  prependListener?(event: "secureConnection", listener: (tlsSocket: TLSSocket) => void): this;

  prependOnceListener?(event: string, listener: (...args: any[]) => void): this;
  prependOnceListener?(event: "tlsClientError", listener: (err: Error, tlsSocket: TLSSocket) => void): this;
  prependOnceListener?(event: "newSession", listener: (sessionId: any, sessionData: any, callback: (err: Error, resp: Buffer) => void) => void): this;
  prependOnceListener?(event: "OCSPRequest", listener: (certificate: Buffer, issuer: Buffer, callback: Function) => void): this;
  prependOnceListener?(event: "resumeSession", listener: (sessionId: any, callback: (err: Error, sessionData: any) => void) => void): this;
  prependOnceListener?(event: "secureConnection", listener: (tlsSocket: TLSSocket) => void): this;
}

@builtin(native, (module) => module.TLSSocket)
export class TLSSocket extends Socket {
  /**
   * Construct a new tls.TLSSocket object from an existing TCP socket.
   */
  constructor(socket: Socket, options?: {
    /**
     * An optional TLS context object from tls.createSecureContext()
     */
    secureContext?: SecureContext,
    /**
     * If true the TLS socket will be instantiated in server-mode.
     * Defaults to false.
     */
    isServer?: boolean,
    /**
     * An optional net.Server instance.
     */
    server?: NetServer,
    /**
     * If true the server will request a certificate from clients that
     * connect and attempt to verify that certificate. Defaults to
     * false.
     */
    requestCert?: boolean,
    /**
     * If true the server will reject any connection which is not
     * authorized with the list of supplied CAs. This option only has an
     * effect if requestCert is true. Defaults to false.
     */
    rejectUnauthorized?: boolean,
    /**
     * An array of strings or a Buffer naming possible NPN protocols.
     * (Protocols should be ordered by their priority.)
     */
    NPNProtocols?: string[] | Buffer,
    /**
     * An array of strings or a Buffer naming possible ALPN protocols.
     * (Protocols should be ordered by their priority.) When the server
     * receives both NPN and ALPN extensions from the client, ALPN takes
     * precedence over NPN and the server does not send an NPN extension
     * to the client.
     */
    ALPNProtocols?: string[] | Buffer,
    /**
     * SNICallback(servername, cb) <Function> A function that will be
     * called if the client supports SNI TLS extension. Two arguments
     * will be passed when called: servername and cb. SNICallback should
     * invoke cb(null, ctx), where ctx is a SecureContext instance.
     * (tls.createSecureContext(...) can be used to get a proper
     * SecureContext.) If SNICallback wasn't provided the default callback
     * with high-level API will be used (see below).
     */
    SNICallback?: (servername: string, cb: (err: Error | null, ctx: SecureContext) => void) => void,
    /**
     * An optional Buffer instance containing a TLS session.
     */
    session?: Buffer,
    /**
     * If true, specifies that the OCSP status request extension will be
     * added to the client hello and an 'OCSPResponse' event will be
     * emitted on the socket before establishing a secure communication
     */
    requestOCSP?: boolean
  }) {
    super();
    throw new Error('Must be overloaded by native');
  }

  /**
   * A boolean that is true if the peer certificate was signed by one of the specified CAs, otherwise false.
   */
  authorized: boolean;
  /**
   * The reason why the peer's certificate has not been verified.
   * This property becomes available only when tlsSocket.authorized === false.
   */
  authorizationError: Error;
  /**
   * Static boolean value, always true.
   * May be used to distinguish TLS sockets from regular ones.
   */
  encrypted: boolean;
  /**
   * Returns an object representing the cipher name and the SSL/TLS protocol version of the current connection.
   * @returns Returns an object representing the cipher name
   * and the SSL/TLS protocol version of the current connection.
   */
  getCipher?(): CipherNameAndProtocol;
  /**
   * Returns an object representing the peer's certificate.
   * The returned object has some properties corresponding to the field of the certificate.
   * If detailed argument is true the full chain with issuer property will be returned,
   * if false only the top certificate without issuer property.
   * If the peer does not provide a certificate, it returns null or an empty object.
   * @param detailed - If true; the full chain with issuer property will be returned.
   * @returns An object representing the peer's certificate.
   */
  getPeerCertificate?(detailed: true): DetailedPeerCertificate;
  getPeerCertificate?(detailed?: false): PeerCertificate;
  getPeerCertificate?(detailed?: boolean): PeerCertificate | DetailedPeerCertificate;
  /**
   * Could be used to speed up handshake establishment when reconnecting to the server.
   * @returns ASN.1 encoded TLS session or undefined if none was negotiated.
   */
  getSession?(): any;
  /**
   * NOTE: Works only with client TLS sockets.
   * Useful only for debugging, for session reuse provide session option to tls.connect().
   * @returns TLS session ticket or undefined if none was negotiated.
   */
  getTLSTicket?(): any;
  /**
   * Initiate TLS renegotiation process.
   *
   * NOTE: Can be used to request peer's certificate after the secure connection has been established.
   * ANOTHER NOTE: When running as the server, socket will be destroyed with an error after handshakeTimeout timeout.
   * @param options - The options may contain the following fields: rejectUnauthorized,
   * requestCert (See tls.createServer() for details).
   * @param callback - callback(err) will be executed with null as err, once the renegotiation
   * is successfully completed.
   */
  renegotiate?(options: TlsOptions, callback: (err: Error | null) => void): any;
  /**
   * Set maximum TLS fragment size (default and maximum value is: 16384, minimum is: 512).
   * Smaller fragment size decreases buffering latency on the client: large fragments are buffered by
   * the TLS layer until the entire fragment is received and its integrity is verified;
   * large fragments can span multiple roundtrips, and their processing can be delayed due to packet
   * loss or reordering. However, smaller fragments add extra TLS framing bytes and CPU overhead,
   * which may decrease overall server throughput.
   * @param size - TLS fragment size (default and maximum value is: 16384, minimum is: 512).
   * @returns Returns true on success, false otherwise.
   */
  setMaxSendFragment?(size: number): boolean;

  /**
   * events.EventEmitter
   * 1. OCSPResponse
   * 2. secureConnect
   */
  addListener?(event: string, listener: (...args: any[]) => void): this;
  addListener?(event: "OCSPResponse", listener: (response: Buffer) => void): this;
  addListener?(event: "secureConnect", listener: () => void): this;

  emit?(event: string | symbol, ...args: any[]): boolean;
  emit?(event: "OCSPResponse", response: Buffer): boolean;
  emit?(event: "secureConnect"): boolean;

  on?(event: string, listener: (...args: any[]) => void): this;
  on?(event: "OCSPResponse", listener: (response: Buffer) => void): this;
  on?(event: "secureConnect", listener: () => void): this;

  once?(event: string, listener: (...args: any[]) => void): this;
  once?(event: "OCSPResponse", listener: (response: Buffer) => void): this;
  once?(event: "secureConnect", listener: () => void): this;

  prependListener?(event: string, listener: (...args: any[]) => void): this;
  prependListener?(event: "OCSPResponse", listener: (response: Buffer) => void): this;
  prependListener?(event: "secureConnect", listener: () => void): this;

  prependOnceListener?(event: string, listener: (...args: any[]) => void): this;
  prependOnceListener?(event: "OCSPResponse", listener: (response: Buffer) => void): this;
  prependOnceListener?(event: "secureConnect", listener: () => void): this;
}

@builtin(native, (module) => {
  Tls.CLIENT_RENEG_LIMIT = module.CLIENT_RENEG_LIMIT;
  Tls.CLIENT_RENEG_WINDOW = module.CLIENT_RENEG_WINDOW;
  Tls.DEFAULT_ECDH_CURVE = module.DEFAULT_ECDH_CURVE;
  Tls.createServer = module.createServer;
  Tls.connect = module.connect;
  Tls.createSecurePair = module.createSecurePair;
  Tls.createSecureContext = module.createSecureContext;
  Tls.getCiphers = module.getCiphers;
  return Tls;
})
export class Tls {
  static CLIENT_RENEG_LIMIT: number;
  static CLIENT_RENEG_WINDOW: number;
  static DEFAULT_ECDH_CURVE: string;
  static createServer?(options: TlsOptions, secureConnectionListener?: (socket: TLSSocket) => void): Server;
  static connect?(options: ConnectionOptions, secureConnectionListener?: () => void): TLSSocket;
  static connect?(port: number, host?: string, options?: ConnectionOptions, secureConnectListener?: () => void): TLSSocket;
  static connect?(port: number, options?: ConnectionOptions, secureConnectListener?: () => void): TLSSocket;
  static createSecurePair?(credentials?: Credentials, isServer?: boolean, requestCert?: boolean, rejectUnauthorized?: boolean): SecurePair;
  static createSecureContext?(details: SecureContextOptions): SecureContext;
  static getCiphers?(): string[];
}