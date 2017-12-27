import {createServer} from "@barlus/node/http";
import {process} from "@barlus/node/process";
import {Buffer} from "@barlus/node/buffer"
import {Emitter} from "@barlus/node/events"
import {Readable} from '@barlus/node/stream';
import {isJSON} from '../utils/objects'
import {onFinished} from '../utils/on-finished'
import {empty} from '../statuses';

import {Context} from './context';
import {ServerRequest, ServerResponse} from "@barlus/node/http";
import {HttpError} from "../errors";

const debug = (...args)=>{};

export interface Middleware {
  (cnx: Context, next:(...args)=>Promise<any>): Promise<any>;
}

export class Application extends Emitter {

  proxy: boolean;
  middleware: Middleware[];
  subdomainOffset: number;
  env: string;
  keys: string[];
  silent: boolean;

  /**
   * Initialize a new `Application`.
   *
   * @api public
   */
  public constructor() {
    super();
    this.proxy = false;
    this.middleware = [];
    this.subdomainOffset = 2;
    this.env = process.env.NODE_ENV || 'development';
  }

  /**
   * Shorthand for:
   *
   *    http.createServer(app.callback()).listen(...)
   *
   * @param {Mixed} ...
   * @return {Server}
   * @api public
   */
  public listen(...args) {
    debug('listen');
    return createServer(this.callback()).listen(...args);
  }

  /**
   * Return JSON representation.
   * We only bother showing settings.
   *
   * @return {Object}
   * @api public
   */
  toJSON() {
    return {
      subdomainOffset:this.subdomainOffset,
      proxy:this.proxy,
      env:this.env,
    };
  }

  /**
   * Inspect implementation.
   *
   * @return {Object}
   * @api public
   */
  inspect() {
    return this.toJSON();
  }

  /**
   * Use the given middleware `fn`.
   *
   * Old-style middleware will be converted.
   *
   * @param {Function} fn
   * @return {Application} self
   */
  public use(fn: Middleware): this {
    if (typeof fn !== 'function') {
      throw new TypeError('middleware must be a function!');
    }
    debug('use %s', fn.name || '-');
    this.middleware.push(fn);
    return this;
  }

  /**
   * Return a request handler callback
   * for node's native http server.
   *
   * @return {Function}
   * @api public
   */
  public callback() {
    if (!this.listeners('error').length) {
      this.on('error', this.onError);
    }
    return (req, res) => {
      return this.handleRequest(
        this.createContext(req, res),
        compose(this.middleware)
      );
    }
  }

  /**
   * Handle request in callback.
   */
  protected handleRequest(ctx: Context, fnMiddleware: Middleware) {
    const res = ctx.res;
    const onError = err => ctx.onError(err);
    const onResponse = () => respond(ctx);
    res.statusCode = 404;

    onFinished(res, onError);

    return fnMiddleware(ctx, null)
      .then(onResponse)
      .catch(onError);
  }

  /**
   * Initialize a new context.
   */
  protected createContext(req:ServerRequest, res:ServerResponse) {
    return new Context(this, req, res);
  }

  /**
   * Default error handler.
   * @param err unhandled error
   */
  protected onError(err:Error) {
    if (!(err instanceof Error)) {
      throw new Error(`Not an error: ${err}`);
    }
    if (this.silent) {
      return;
    }
    if(err instanceof HttpError){
      if(err.status==404 || err.expose){
        return;
      }
    }

    const msg = err.stack || err.toString();
    console.error();
    console.error(msg.replace(/^/gm, '  '));
    console.error();

  }

}

/**
 * Response helper.
 */
function respond(ctx) {
  // allow bypassing koa
  if (false === ctx.respond) {
    return;
  }

  const res = ctx.res;
  if (!ctx.writable) {
    return;
  }

  let body = ctx.body;
  const code = ctx.status;

  // ignore body
  if (empty[code]) {
    // strip headers
    ctx.body = null;
    return res.end();
  }

  if ('HEAD' === ctx.method) {
    if (!res.headersSent && isJSON(body)) {
      ctx.length = Buffer.byteLength(JSON.stringify(body));
    }
    return res.end();
  }

  // status body
  if (null == body) {
    body = ctx.message || `${code}`;
    if (!res.headersSent) {
      ctx.type = 'text';
      ctx.length = Buffer.byteLength(body);
    }
    return res.end(body);
  }

  // responses
  if (Buffer.isBuffer(body)) {
    return res.end(body);
  }
  if ('string' === typeof body) {
    return res.end(body);
  }
  if (body instanceof Readable) {
    return body.pipe(res);
  }

  // body: json
  body = JSON.stringify(body);
  if (!res.headersSent) {
    ctx.length = Buffer.byteLength(body);
  }
  res.end(body);
}

/**
 * Chaining middleware list
 */
function compose(middleware) {
  if (!Array.isArray(middleware)) {
    throw new TypeError('Middleware stack must be an array!');
  }
  for (const fn of middleware) {
    if (typeof fn !== 'function') {
      throw new TypeError('Middleware must be composed of functions!')
    }
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return async (context, next) => {
    // last called middleware #
    let index = -1;
    return dispatch(0);

    async function dispatch(i) {
      if (i <= index) {
        throw new Error('next() called multiple times');
      }
      index = i;
      let fn = middleware[i];
      if (i === middleware.length) {
        fn = next;
      }

      if (!fn) {
        return;
      }

      return await fn(context, async () => {
        return dispatch(i + 1)
      })
    }
  }
}
