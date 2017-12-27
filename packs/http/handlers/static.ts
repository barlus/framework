import {existsSync, statSync, createReadStream} from '@barlus/node/fs';
import {process} from '@barlus/node/process';
import {normalize, basename, extname, resolve, parse, sep} from '@barlus/node/path';
import {HttpError,ArgumentError} from '../errors'

export interface SendOptions {
    root?: string;
    index?: string | boolean;
    maxAge?: number;
    hidden?: boolean;
    immutable?: boolean;
    format?: boolean | string;
    extensions?: boolean | string[]
    brotli?: boolean;
    gzip?: boolean;
    defer?: boolean;
    setHeaders?(...args): any;
}
const debug = console.debug;
const UP_PATH_REGEXP = /(?:^|[\\/])\.\.(?:[\\/]|$)/;
export function serve(root: string, opts: SendOptions = {}) {
    if (typeof root != 'string') {
        throw new Error('root directory is required to serve files')
    }
    // options
    debug('static "%s" %j', root, opts);
    opts.root = resolve(root);
    if (opts.index !== false) {
        opts.index = opts.index || 'index.html'
    }
    if (!opts.defer) {
        return async function serve(ctx, next) {
            let done = false;
            if (ctx.method === 'HEAD' || ctx.method === 'GET') {
                try {
                    done = await send(ctx, ctx.path, opts)
                } catch (err) {
                    if (err.status !== 404) {
                        throw err
                    }
                }
            }
            if (!done) {
                await next()
            }
        }
    }
    return async function serve(ctx, next) {
        await next();
        if (ctx.method !== 'HEAD' && ctx.method !== 'GET') {
            return
        }
        // response is already handled
        if (ctx.body != null || ctx.status !== 404) {
            return
        } // eslint-disable-line
        try {
            await send(ctx, ctx.path, opts)
        } catch (err) {
            if (err.status !== 404) {
                throw err
            }
        }
    }
}
/**
 * Send file at `path` with the
 * given `options` to the koa `ctx`.
 *
 * @param {Context} ctx
 * @param {String} path
 * @param {Object} [opts]
 * @return {Function}
 * @api public
 */

async function send(ctx, path, opts: SendOptions = {}) {
    ArgumentError.assert(ctx, 'context required');
    ArgumentError.assert(path, 'pathname required');
    // options
    debug('send "%s" %j', path, opts);
    const root = opts.root ? normalize(resolve(opts.root)) : '';
    const trailingSlash = path[path.length - 1] === '/';
    path = path.substr(parse(path).root.length);
    const index = opts.index;
    const maxage = opts.maxAge || 0;
    const immutable = opts.immutable || false;
    const hidden = opts.hidden || false;
    const format = opts.format !== false;
    const extensions = Array.isArray(opts.extensions) ? opts.extensions : false;
    const brotli = opts.brotli !== false;
    const gzip = opts.gzip !== false;
    const setHeaders = opts.setHeaders;
    if (setHeaders && typeof setHeaders !== 'function') {
        throw new TypeError('option setHeaders must be function')
    }
    // normalize path
    path = decode(path);
    if (path === -1) {
        return ctx.throw(400, 'failed to decode');
    }
    // index file support
    if (index && trailingSlash) {
        path += index;
    }
    path = resolvePath(root, path);
    // hidden file support, ignore
    if (!hidden && isHidden(root, path)) {
        return;
    }
    let encodingExt = '';
    // serve brotli file when possible otherwise gzipped file when possible
    if (ctx.acceptsEncodings('br', 'identity') === 'br' && brotli && existsSync(path + '.br')) {
        path = path + '.br';
        ctx.set('Content-Encoding', 'br');
        ctx.res.removeHeader('Content-Length');
        encodingExt = '.br'
    } else if (ctx.acceptsEncodings('gzip', 'identity') === 'gzip' && gzip && existsSync(path + '.gz')) {
        path = path + '.gz';
        ctx.set('Content-Encoding', 'gzip');
        ctx.res.removeHeader('Content-Length');
        encodingExt = '.gz'
    }
    if (extensions && !/\..*$/.exec(path)) {
        const list = [].concat(extensions);
        for (let i = 0; i < list.length; i++) {
            let ext = list[i];
            if (typeof ext !== 'string') {
                throw new TypeError('option extensions must be array of strings or false')
            }
            if (!/^\./.exec(ext)) {
                ext = '.' + ext;
            }
            if (existsSync(path + ext)) {
                path = path + ext;
                break
            }
        }
    }
    // stat
    let stats;
    try {
        stats = statSync(path);
        // Format the path to serve static file servers
        // and not require a trailing slash for directories,
        // so that you can do both `/directory` and `/directory/`
        if (stats.isDirectory()) {
            if (format && index) {
                path += '/' + index;
                stats = statSync(path)
            } else {
                return
            }
        }
    } catch (err) {
        const notfound = ['ENOENT', 'ENAMETOOLONG', 'ENOTDIR'];
        if (notfound.includes(err.code)) {
            throw new HttpError(404, void 0, err);
        }
        err.status = 500;
        throw err
    }
    if (setHeaders) {
        setHeaders(ctx.res, path, stats);
    }
    // stream
    ctx.set('Content-Length', stats.size);
    if (!ctx.response.get('Last-Modified')) {
        ctx.set('Last-Modified', stats.mtime.toUTCString());
    }
    if (!ctx.response.get('Cache-Control')) {
        const directives = ['max-age=' + (maxage / 1000 | 0)];
        if (immutable) {
            directives.push('immutable')
        }
        ctx.set('Cache-Control', directives.join(','))
    }
    ctx.type = type(path, encodingExt);
    ctx.body = createReadStream(path);
    return path
}
/**
 * Check if it's hidden.
 */
function isHidden(root, path) {
    path = path.substr(root.length).split(sep);
    for (let i = 0; i < path.length; i++) {
        if (path[i][0] === '.') {
            return true
        }
    }
    return false
}
/**
 * File type.
 */
function type(file, ext) {
    return ext !== '' ? extname(basename(file, ext)) : extname(file)
}
/**
 * Decode `path`.
 */
function decode(path) {
    try {
        return decodeURIComponent(path)
    } catch (err) {
        return -1
    }
}
/**
 * Resolve relative path against a root path
 *
 * @param {string} rootPath
 * @param {string} relativePath
 * @return {string}
 * @public
 */
function resolvePath(rootPath, relativePath) {
    let path = relativePath;
    let root = rootPath;
    // root is optional, similar to root.resolve
    if (arguments.length === 1) {
        path = rootPath;
        root = process.cwd()
    }
    if (root == null) {
        throw new TypeError('argument rootPath is required')
    }
    if (typeof root !== 'string') {
        throw new TypeError('argument rootPath must be a string')
    }
    if (path == null) {
        throw new TypeError('argument relativePath is required')
    }
    if (typeof path !== 'string') {
        throw new TypeError('argument relativePath must be a string')
    }
    // containing NULL bytes is malicious
    if (path.indexOf('\0') !== -1) {
        throw new HttpError(400, 'Malicious Path')
    }
    // path should never be absolute
    if (isPosixRootPath(path) || isWinRootPath(path)) {
        throw new HttpError(400, 'Malicious Path')
    }
    // path outside root
    if (UP_PATH_REGEXP.test(normalize('.' + sep + path))) {
        throw new HttpError(403)
    }
    // resolve & normalize the root path
    root = normalize(resolve(root) + sep);
    // resolve the path
    return resolve(root, path)
}
function isPosixRootPath(path) {
    return path.charAt(0) === '/';
}
function isWinRootPath(path) {
    // https://github.com/nodejs/node/blob/b3fcc245fb25539909ef1d5eaa01dbf92e168633/lib/path.js#L56
    var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
    var result = splitDeviceRe.exec(path);
    var device = result[1] || '';
    var isUnc = !!(device && device.charAt(1) !== ':');
    // UNC paths are always absolute
    return !!(result[2] || isUnc);
}
