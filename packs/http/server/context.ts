import {statuses} from "../statuses";
import {Buffer} from "@barlus/node/buffer";
import {HttpError} from "../errors";
import {ServerRequest, ServerResponse} from "@barlus/node/http";
import {Response} from "./response";
import {Request} from "./request";
import {Application} from "./application";
import {Accepts} from "../content/accepts";
import {Cookies} from "../cookies";
/**
 * Context prototype.
 */
export class Context {
    response: Response;
    request: Request;
    res: ServerResponse;
    req: ServerRequest;
    app: Application;
    accept: Accepts;
    cookies: Cookies;
    originalUrl: string;
    state: any;
    /**
     * util.inspect() implementation, which
     * just returns the JSON output.
     *
     * @return {Object}
     * @api public
     */
    constructor(app: Application, req: ServerRequest, res: ServerResponse) {
        this.app = app;
        this.req = req;
        this.res = res;
        this.originalUrl = req.url;
        this.request = new Request(this);
        this.response = new Response(this);
        this.accept = new Accepts(req);
        this.state = {};
        this.cookies = new Cookies(req, res, {
            keys: app.keys,
            secure: this.request.secure
        });
    }
    inspect() {
        return this.toJSON();
    }
    /**
     * Return JSON representation.
     *
     * Here we explicitly invoke .toJSON() on each
     * object, as iteration will otherwise fail due
     * to the getters and cause utilities such as
     * clone() to fail.
     *
     * @return {Object}
     * @api public
     */

    toJSON() {
        return {
            request: this.request.toJSON(),
            response: this.response.toJSON(),
            app: this.app.toJSON(),
            originalUrl: this.originalUrl,
            req: '<original node req>',
            res: '<original node res>',
            socket: '<original node socket>'
        };
    }
    /**
     * Similar to .throw(), adds assertion.
     *
     *    this.assert(this.user, 401, 'Please login!');
     *
     * See: https://github.com/jshttp/http-assert
     *
     * @param {Mixed} test
     * @param {Number} status
     * @param {String} message
     * @api public
     */

    assert(value: boolean, status: number, msg: string, opts?: any) {
        HttpError.assert(value, status, msg, opts);
    }
    /**
     * Throw an error with `msg` and optional `status`
     * defaulting to 500. Note that these are user-level
     * errors, and the message may be exposed to the client.
     *
     *    this.throw(403)
     *    this.throw('name required', 400)
     *    this.throw(400, 'name required')
     *    this.throw('something exploded')
     *    this.throw(new Error('invalid'), 400);
     *    this.throw(400, new Error('invalid'));
     *
     * See: https://github.com/jshttp/http-errors
     *
     * @param {String|Number|Error} err, msg or status
     * @param {String|Number|Error} [err, msg or status]
     * @param {Object} [props]
     * @api public
     */

    throw(status: number, message?: string, cause?: object) {
        throw new HttpError(status, message, cause);
    }
    /**
     * Default error handling.
     *
     * @param {Error} err
     * @api private
     */

    onError(err) {
        // don't do anything if there is no error.
        // this allows you to pass `this.onError`
        // to node-style callbacks.
        if (null == err) {
            return;
        }
        if (!(err instanceof Error)) {
            err = new Error(`non-error thrown: ${err}`);
        }
        let headerSent = false;
        if (this.headerSent || !this.writable) {
            headerSent = err.headerSent = true;
        }
        // delegate
        this.app.emit('error', err, this);
        // nothing we can do here other
        // than delegate to the app-level
        // handler and log.
        if (headerSent) {
            return;
        }
        const {res} = this;
        // first unset all headers
        if (typeof res.getHeaderNames === 'function') {
            res.getHeaderNames().forEach(name => res.removeHeader(name));
        }
        // then set those specified
        this.set(err.headers || {});
        // force text/plain
        this.type = 'text';
        // ENOENT support
        if ('ENOENT' == err.code) {
            err.status = 404;
        }
        // default to 500
        if ('number' != typeof err.status || !statuses[err.status]) {
            err.status = 500;
        }
        // respond
        const code = statuses[err.status];
        const msg = err.expose ? err.message : code;
        this.status = err.status;
        this.length = Buffer.byteLength(msg);
        this.res.end(msg);
    }
    get status() {
        return this.response.status
    }
    set status(value) {
        this.response.status = value
    }
    get message() {
        return this.response.message
    }
    set message(value) {
        this.response.message = value
    }
    get body() {
        return this.response.body
    }
    set body(value) {
        this.response.body = value
    }
    get length() {
        return this.response.length
    }
    set length(value) {
        this.response.length = value
    }
    get type() {
        return this.response.type
    }
    set type(value) {
        this.response.type = value
    }
    get lastModified() {
        return this.response.lastModified
    }
    set lastModified(value) {
        this.response.lastModified = value
    }
    get etag() {
        return this.response.etag
    }
    set etag(value) {
        this.response.etag = value
    }
    get headerSent() {
        return this.response.headerSent
    }
    get writable() {
        return this.response.writable
    }
    attachment(filename) {
        return this.response.attachment(filename)
    }
    redirect(url, alt) {
        return this.response.redirect(url, alt)
    }
    remove(field) {
        return this.response.remove(field)
    }
    vary(field) {
        return this.response.vary(field)
    }
    set(field, value?) {
        if (arguments.length == 1) {
            return this.response.set(field)
        } else {
            return this.response.set(field, value)
        }
    }
    append(field, value) {
        return this.response.append(field, value)
    }
    flushHeaders() {
        return this.response.flushHeaders()
    }
    accepts(...types) {
        return this.request.accepts(...types)
    }
    acceptsLanguages(...languages) {
        return this.request.acceptsLanguages(...languages)
    }
    acceptsEncodings(...encodings) {
        return this.request.acceptsEncodings(...encodings)
    }
    acceptsCharsets(...charsets) {
        return this.request.acceptsEncodings(...charsets)
    }
    get(name) {
        return this.request.get(name)
    }
    is(name) {
        return this.request.is(name)
    }
    get querystring() {
        return this.request.querystring
    }
    set querystring(value) {
        this.request.querystring = value
    }
    get idempotent() {
        return this.request.idempotent
    }
    get search() {
        return this.request.search
    }
    set search(value) {
        this.request.search = value
    }
    get method() {
        return this.request.method
    }
    set method(value) {
        this.request.method = value
    }
    get query() {
        return this.request.query
    }
    set query(value) {
        this.request.query = value
    }
    get path() {
        return this.request.path
    }
    set path(value) {
        this.request.path = value
    }
    get url() {
        return this.request.url
    }
    set url(value) {
        this.request.url = value
    }
    get origin() {
        return this.request.origin
    }
    get href() {
        return this.request.href
    }
    get subdomains() {
        return this.request.subdomains
    }
    get protocol() {
        return this.request.protocol
    }
    get host() {
        return this.request.host
    }
    get hostname() {
        return this.request.hostname
    }
    get URL() {
        return this.request.URL
    }
    get header() {
        return this.request.header
    }
    get headers() {
        return this.request.headers
    }
    get secure() {
        return this.request.secure
    }
    get stale() {
        return this.request.stale
    }
    get fresh() {
        return this.request.fresh
    }
    get ips() {
        return this.request.ips
    }
    get ip() {
        return this.request.ip
    }
}
