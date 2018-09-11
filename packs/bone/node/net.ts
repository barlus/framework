import * as native from "net";
import {builtin}   from './builtin';

import {Duplex, ReadableOptions} from "./stream";
import {EventEmitter}            from "./events";
import {Buffer}                  from './buffer';


export type LookupFunction = (hostname: string, options: LookupOptions, callback: (err: Error | null, address: string, family: number) => void) => void;
export type SocketConnectOpts = TcpSocketConnectOpts | IpcSocketConnectOpts;
export type NetConnectOpts = TcpNetConnectOpts | IpcNetConnectOpts;
export interface LookupOptions {
  family?: number;
  hints?: number;
  all?: boolean;
}
export interface ListenOptions {
  port?: number;
  host?: string;
  backlog?: number;
  path?: string;
  exclusive?: boolean;
}
export interface SocketConstructorOpts {
  fd?: number;
  allowHalfOpen?: boolean;
  readable?: boolean;
  writable?: boolean;
}
export interface TcpSocketConnectOpts {
  port: number;
  host?: string;
  localAddress?: string;
  localPort?: number;
  hints?: number;
  family?: number;
  lookup?: LookupFunction;
}
export interface IpcSocketConnectOpts {
  path: string;
}
export interface TcpNetConnectOpts extends TcpSocketConnectOpts, SocketConstructorOpts {
  timeout?: number;
}
export interface IpcNetConnectOpts extends IpcSocketConnectOpts, SocketConstructorOpts {
  timeout?: number;
}

@builtin(native, (module) => {
  const Socket = module.Socket;
  Socket.isIP = module.isIP
  Socket.isIPv4 = module.isIPv4
  Socket.isIPv6 = module.isIPv6
  Socket.connect = module.connect
  Socket.createConnection = module.createConnection
  return Socket;
})
export class Socket extends Duplex {
  static isIP?(input: string): number;
  static isIPv4?(input: string): boolean;
  static isIPv6?(input: string): boolean;
  static connect?(options: NetConnectOpts, connectionListener?: Function): Socket;
  static connect?(port: number, host?: string, connectionListener?: Function): Socket;
  static connect?(path: string, connectionListener?: Function): Socket;
  static createConnection?(options: NetConnectOpts, connectionListener?: Function): Socket;
  static createConnection?(port: number, host?: string, connectionListener?: Function): Socket;
  static createConnection?(path: string, connectionListener?: Function): Socket;

  constructor(options?: SocketConstructorOpts) {
    super();
    throw new Error('Must be overloaded by native');
  }

  // Extended base methods
  write?(buffer: Buffer): boolean;
  write?(buffer: Buffer, cb?: Function): boolean;
  write?(str: string, cb?: Function): boolean;
  write?(str: string, encoding?: string, cb?: Function): boolean;
  write?(str: string, encoding?: string, fd?: string): boolean;
  write?(data: any, encoding?: string, callback?: Function): void;

  connect?(options: SocketConnectOpts, connectionListener?: Function): this;
  connect?(port: number, host: string, connectionListener?: Function): this;
  connect?(port: number, connectionListener?: Function): this;
  connect?(path: string, connectionListener?: Function): this;

  bufferSize: number;
  setEncoding?(encoding?: string): this;
  destroy?(err?: any): void;
  pause?(): this;
  resume?(): this;
  setTimeout?(timeout: number, callback?: Function): void;
  setNoDelay?(noDelay?: boolean): void;
  setKeepAlive?(enable?: boolean, initialDelay?: number): void;
  address?(): { port: number; family: string; address: string; };
  unref?(): void;
  ref?(): void;

  remoteAddress?: string;
  remoteFamily?: string;
  remotePort?: number;
  localAddress: string;
  localPort: number;
  bytesRead: number;
  bytesWritten: number;
  connecting: boolean;
  destroyed: boolean;

  // Extended base methods
  end?(): void;
  end?(buffer: Buffer, cb?: Function): void;
  end?(str: string, cb?: Function): void;
  end?(str: string, encoding?: string, cb?: Function): void;
  end?(data?: any, encoding?: string): void;
}

@builtin(native, (module) => {
  const Server = module.Server;
  Server.createServer = module.createServer
  return Server;
})
export class Server extends EventEmitter {
  static createServer?(connectionListener?: (socket: Socket) => void): Server;
  static createServer?(options?: { allowHalfOpen?: boolean, pauseOnConnect?: boolean }, connectionListener?: (socket: Socket) => void): Server;

  constructor(connectionListener?: (socket: Socket) => void);
  constructor(options?: { allowHalfOpen?: boolean, pauseOnConnect?: boolean }, connectionListener?: (socket: Socket) => void)
  constructor(options?, connectionListener?) {
    super();
    throw new Error('Must be overloaded by native');
  }

  listen?(port?: number, hostname?: string, backlog?: number, listeningListener?: Function): this;
  listen?(port?: number, hostname?: string, listeningListener?: Function): this;
  listen?(port?: number, backlog?: number, listeningListener?: Function): this;
  listen?(port?: number, listeningListener?: Function): this;
  listen?(path: string, backlog?: number, listeningListener?: Function): this;
  listen?(path: string, listeningListener?: Function): this;
  listen?(options: ListenOptions, listeningListener?: Function): this;
  listen?(handle: any, backlog?: number, listeningListener?: Function): this;
  listen?(handle: any, listeningListener?: Function): this;
  close?(callback?: Function): this;
  address?(): { port: number; family: string; address: string; };
  getConnections?(cb: (error: Error | null, count: number) => void): void;
  ref?(): this;
  unref?(): this;
  maxConnections: number;
  connections: number;
  listening: boolean;
}












