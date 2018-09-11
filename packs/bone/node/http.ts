import * as native from "http";
import {builtin}   from './builtin';

import {Server as NetServer, Socket} from "./net";
import {Writable, Readable}          from "./stream";
import {URL}                         from "./url";


export interface IncomingHttpHeaders {
  'accept'?: string;
  'access-control-allow-origin'?: string;
  'access-control-allow-credentials'?: string;
  'access-control-expose-headers'?: string;
  'access-control-max-age'?: string;
  'access-control-allow-methods'?: string;
  'access-control-allow-headers'?: string;
  'accept-patch'?: string;
  'accept-ranges'?: string;
  'age'?: string;
  'allow'?: string;
  'alt-svc'?: string;
  'cache-control'?: string;
  'connection'?: string;
  'content-disposition'?: string;
  'content-encoding'?: string;
  'content-language'?: string;
  'content-length'?: string;
  'content-location'?: string;
  'content-range'?: string;
  'content-type'?: string;
  'date'?: string;
  'expires'?: string;
  'host'?: string;
  'last-modified'?: string;
  'location'?: string;
  'pragma'?: string;
  'proxy-authenticate'?: string;
  'public-key-pins'?: string;
  'retry-after'?: string;
  'set-cookie'?: string[];
  'strict-transport-security'?: string;
  'trailer'?: string;
  'transfer-encoding'?: string;
  'tk'?: string;
  'upgrade'?: string;
  'vary'?: string;
  'via'?: string;
  'warning'?: string;
  'www-authenticate'?: string;
  [ header: string ]: string | string[] | undefined;
}
export interface OutgoingHttpHeaders {
  [ header: string ]: number | string | string[] | undefined;
}
export interface ClientRequestArgs {
  protocol?: string;
  host?: string;
  hostname?: string;
  family?: number;
  port?: number | string;
  defaultPort?: number | string;
  localAddress?: string;
  socketPath?: string;
  method?: string;
  path?: string;
  headers?: OutgoingHttpHeaders;
  auth?: string;
  agent?: Agent | boolean;
  _defaultAgent?: Agent;
  timeout?: number;
  // https://github.com/nodejs/node/blob/master/lib/_http_client.js#L278
  createConnection?: (options: ClientRequestArgs, oncreate: (err: Error, socket: Socket) => void) => Socket;
}
export interface RequestOptions extends ClientRequestArgs {
}
export interface AgentOptions {
  /**
   * Keep sockets around in a pool to be used by other requests in the future. Default = false
   */
  keepAlive?: boolean;
  /**
   * When using HTTP KeepAlive, how often to send TCP KeepAlive packets over sockets being kept alive. Default = 1000.
   * Only relevant if keepAlive is set to true.
   */
  keepAliveMsecs?: number;
  /**
   * Maximum number of sockets to allow per host. Default for Node 0.10 is 5, default for Node 0.12 is Infinity
   */
  maxSockets?: number;
  /**
   * Maximum number of sockets to leave open in a free state. Only relevant if keepAlive is set to true. Default = 256.
   */
  maxFreeSockets?: number;
}
@builtin(native, (module) => {
  const Server = module.Server;
  Server.createHttpServer = module.createServer
  return Server;
})
export class Server extends NetServer {
  static createHttpServer?(requestListener?: (request: IncomingMessage, response: ServerResponse) => void): Server;
  constructor(requestListener?: (req: IncomingMessage, res: ServerResponse) => void) {
    super();
    throw new Error('Must be overloaded by native');
  }
  setTimeout?(msecs?: number, callback?: () => void): this;
  setTimeout?(callback: () => void): this;
  maxHeadersCount: number;
  timeout: number;
  keepAliveTimeout: number;
}
// https://github.com/nodejs/node/blob/master/lib/_http_outgoing.js
@builtin(native, (module) => module.OutgoingMessage)
export class OutgoingMessage extends Writable {
  upgrading: boolean;
  chunkedEncoding: boolean;
  shouldKeepAlive: boolean;
  useChunkedEncodingByDefault: boolean;
  sendDate: boolean;
  finished: boolean;
  headersSent: boolean;
  connection: Socket;

  constructor() {
    super();
    throw new Error('Must be overloaded by native');
  }

  setTimeout?(msecs: number, callback?: () => void): this;
  destroy?(error: Error): void;
  setHeader?(name: string, value: number | string | string[]): void;
  getHeader?(name: string): number | string | string[] | undefined;
  getHeaders?(): OutgoingHttpHeaders;
  getHeaderNames?(): string[];
  hasHeader?(name: string): boolean;
  removeHeader?(name: string): void;
  addTrailers?(headers: OutgoingHttpHeaders | Array<[ string, string ]>): void;
  flushHeaders?(): void;
}
// https://github.com/nodejs/node/blob/master/lib/_http_server.js#L108-L256

// https://github.com/nodejs/node/blob/master/lib/_http_client.js#L77
@builtin(native, (module) => module.ClientRequest)
export class ClientRequest extends OutgoingMessage {
  connection: Socket;
  socket: Socket;
  aborted: number;

  constructor(url: string | URL | ClientRequestArgs, cb?: (res: IncomingMessage) => void) {
    super();
    throw new Error('Must be overloaded by native');
  }

  abort?(): void;
  onSocket?(socket: Socket): void;
  setTimeout?(timeout: number, callback?: () => void): this;
  setNoDelay?(noDelay?: boolean): void;
  setSocketKeepAlive?(enable?: boolean, initialDelay?: number): void;
}
@builtin(native, (module) => module.IncomingMessage)
export class IncomingMessage extends Readable {
  constructor(socket: Socket) {
    super();
    throw new Error('Must be overloaded by native');
  }

  httpVersion: string;
  httpVersionMajor: number;
  httpVersionMinor: number;
  connection: Socket;
  headers: IncomingHttpHeaders;
  rawHeaders: string[];
  trailers: { [ key: string ]: string | undefined };
  rawTrailers: string[];
  setTimeout?(msecs: number, callback: () => void): this;
  /**
   * Only valid for request obtained from http.Server.
   */
  method?: string;
  /**
   * Only valid for request obtained from http.Server.
   */
  url?: string;
  /**
   * Only valid for response obtained from http.ClientRequest.
   */
  statusCode?: number;
  /**
   * Only valid for response obtained from http.ClientRequest.
   */
  statusMessage?: string;
  socket: Socket;
  destroy?(error?: Error): void;
}
@builtin(native, (module) => module.ServerResponse)
export class ServerResponse extends OutgoingMessage {
  statusCode: number;
  statusMessage: string;

  constructor(req: IncomingMessage) {
    super();
    throw new Error('Must be overloaded by native');
  }

  assignSocket?(socket: Socket): void;
  detachSocket?(socket: Socket): void;
  // https://github.com/nodejs/node/blob/master/test/parallel/test-http-write-callbacks.js#L53
  // no args in writeContinue callback
  writeContinue?(callback?: () => void): void;
  writeHead?(statusCode: number, reasonPhrase?: string, headers?: OutgoingHttpHeaders): void;
  writeHead?(statusCode: number, headers?: OutgoingHttpHeaders): void;
}
@builtin(native, (module) => module.ServerRequest)
export class ServerRequest extends IncomingMessage {
  connection: Socket;
}
@builtin(native, (module) => module.ClientResponse)
export class ClientResponse extends IncomingMessage {
}
@builtin(native, (module) => module.Agent)
export class Agent {
  maxSockets: number;
  sockets: any;
  requests: any;

  constructor(opts?: AgentOptions) {
    throw new Error('Must be overloaded by native');
  }

  /**
   * Destroy any sockets that are currently in use by the agent.
   * It is usually not necessary to do this. However, if you are using an agent with KeepAlive enabled,
   * then it is best to explicitly shut down the agent when you know that it will no longer be used. Otherwise,
   * sockets may hang open for quite a long time before the server terminates them.
   */
  destroy?(): void;
}
@builtin(native, (module) => {
  Http.AGENT = module.globalAgent;
  Http.METHODS = module.METHODS;
  Http.STATUS_CODES = module.STATUS_CODES;
  Http.createClient = module.createClient;
  Http.request = module.request;
  Http.get = module.get;
  return Http;
})
export class Http {
  static AGENT: Agent;//globalAgent
  static METHODS: string[];
  static STATUS_CODES: {
    [ errorCode: number ]: string | undefined;
    [ errorCode: string ]: string | undefined;
  };
  static createClient?(port?: number, host?: string): any;
  static request?(options: RequestOptions | string | URL, callback?: (res: IncomingMessage) => void): ClientRequest;
  static get?(options: RequestOptions | string | URL, callback?: (res: IncomingMessage) => void): ClientRequest;
}

// proxy('http', module);
//
// module.exports.override({
//     get ServerRequest(){
//         return class ServerRequest extends module.exports.IncomingMessage {}
//     },
//     get ClientResponse(){
//         return class ClientResponse extends module.exports.OutgoingMessage {}
//     },
// });
