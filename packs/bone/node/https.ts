import * as native                          from "https";
import {builtin}                            from "./builtin";
import {SecureContext, Server as TlsServer} from "./tls";
import {
  RequestOptions,
  AgentOptions as HttpAgentOptions,
  Agent as HttpAgent,
  IncomingMessage,
  ServerResponse,
  ClientRequest
}                                           from "./http";
import {URL}                                from "./url";


export interface ServerOptions {
  pfx?: any;
  key?: any;
  passphrase?: string;
  cert?: any;
  ca?: any;
  crl?: any;
  ciphers?: string;
  honorCipherOrder?: boolean;
  requestCert?: boolean;
  rejectUnauthorized?: boolean;
  NPNProtocols?: any;
  SNICallback?: (servername: string, cb: (err: Error | null, ctx: SecureContext) => void) => void;
}

export interface RequestOptions extends RequestOptions {
  pfx?: any;
  key?: any;
  passphrase?: string;
  cert?: any;
  ca?: any;
  ciphers?: string;
  rejectUnauthorized?: boolean;
  secureProtocol?: string;
  servername?: string;
}

export interface AgentOptions extends HttpAgentOptions {
  pfx?: any;
  key?: any;
  passphrase?: string;
  cert?: any;
  ca?: any;
  ciphers?: string;
  rejectUnauthorized?: boolean;
  serverName?: string;
  secureProtocol?: string;
  maxCachedSessions?: number;
}

@builtin(native, (module) => module.Agent)
export class Agent extends HttpAgent {
  constructor(options?: AgentOptions) {
    super(options);
    throw new Error('Must be overloaded by native');
  };
}

@builtin(native, (module) => module.Server)
export class Server extends TlsServer {
  setTimeout?(callback: () => void): this;
  setTimeout?(msecs?: number, callback?: () => void): this;
  timeout: number;
  keepAliveTimeout: number;
}

@builtin(native, (module) => {
  Https.globalAgent = module.globalAgent;
  Https.createServer = module.createServer;
  Https.request = module.request;
  Https.get = module.get;
  return Https;
})
export class Https {
  static globalAgent: Agent;
  static createServer?(options: ServerOptions, requestListener?: (req: IncomingMessage, res: ServerResponse) => void): Server;
  static request?(options: RequestOptions | string | URL, callback?: (res: IncomingMessage) => void): ClientRequest;
  static get?(options: RequestOptions | string | URL, callback?: (res: IncomingMessage) => void): ClientRequest;
}