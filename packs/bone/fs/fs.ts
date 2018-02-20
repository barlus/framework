declare const process;

const constants = process.binding('constants').fs;
const {
    S_IFIFO, S_IFLNK, S_IFMT, S_IFREG, S_IFSOCK, O_APPEND,
    O_CREAT, O_EXCL, O_RDONLY, O_RDWR, O_SYNC, O_TRUNC, O_WRONLY
} = constants;

const util = require('util');
const pathModule = require('path');
const binding = process.binding('fs');
const fs = exports;
const {Buffer} = require('buffer');

const {Readable, Writable} = require('stream');
const EventEmitter = require('events');
const {FSReqWrap} = binding;
const {FSEvent} = process.binding('fs_event_wrap');

function getPathFromURLPosix(url) {
    if (url.hostname !== '') {
        throw new TypeError('ERR_INVALID_FILE_URL_HOST');
    }
    var pathname = url.pathname;
    for (var n = 0; n < pathname.length; n++) {
        if (pathname[n] === '%') {
            var third = pathname.codePointAt(n + 2) | 0x20;
            if (pathname[n + 1] === '2' && third === 102) {
                throw new TypeError('ERR_INVALID_FILE_URL_PATH',
                    'must not include encoded / characters');
            }
        }
    }
    return decodeURIComponent(pathname);
}
function getPathFromURL(path) {
    if (path == null || !path['searchParams'] || !path['searchParams']['searchParams']) {
        return path;
    }
    if (path.protocol !== 'file:') {
        throw new TypeError('ERR_INVALID_URL_SCHEME', 'file');
    }
    return getPathFromURLPosix(path);
}
function assertEncoding(encoding) {
    if (encoding && !Buffer.isEncoding(encoding)) {
        throw new TypeError('ERR_INVALID_OPT_VALUE_ENCODING', encoding);
    }
}

function stringToFlags(flags) {
    if (typeof flags === 'number') {
        return flags;
    }
    switch (flags) {
        case 'r' :
            return O_RDONLY;
        case 'rs' : // Fall through.
        case 'sr' :
            return O_RDONLY | O_SYNC;
        case 'r+' :
            return O_RDWR;
        case 'rs+' : // Fall through.
        case 'sr+' :
            return O_RDWR | O_SYNC;

        case 'w' :
            return O_TRUNC | O_CREAT | O_WRONLY;
        case 'wx' : // Fall through.
        case 'xw' :
            return O_TRUNC | O_CREAT | O_WRONLY | O_EXCL;

        case 'w+' :
            return O_TRUNC | O_CREAT | O_RDWR;
        case 'wx+': // Fall through.
        case 'xw+':
            return O_TRUNC | O_CREAT | O_RDWR | O_EXCL;

        case 'a' :
            return O_APPEND | O_CREAT | O_WRONLY;
        case 'ax' : // Fall through.
        case 'xa' :
            return O_APPEND | O_CREAT | O_WRONLY | O_EXCL;

        case 'a+' :
            return O_APPEND | O_CREAT | O_RDWR;
        case 'ax+': // Fall through.
        case 'xa+':
            return O_APPEND | O_CREAT | O_RDWR | O_EXCL;
    }

    throw new TypeError('ERR_INVALID_OPT_VALUE', 'flags', flags);
}
Object.defineProperty(exports, 'constants', {
    configurable: false,
    enumerable: true,
    value: constants
});

const kHandle = Symbol('handle');
const {kUsePromises} = binding;

const kMinPoolSpace = 128;
const {kMaxLength} = require('buffer');

const isWindows = process.platform === 'win32';

const DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);
const errnoException = (err, syscall?, original?): any => {
    const ex = new Error(`Error ${err} ${syscall}`);
    Object.assign(ex, {code: 'E' + syscall, syscall})
    return ex;
};

let truncateWarn = true;

function isInt32(n) {
    return n === (n | 0);
}
function isUint32(n) {
    return n === (n >>> 0);
}
class TypeError extends Error {
    constructor(a, b?, c?, d?) {
        super(c);
    }
}
class RangeError extends Error {
    constructor(a, b?, c?, d?) {
        super(c);
    }
}
function showTruncateDeprecation() {
    if (truncateWarn) {
        process.emitWarning(
            'Using fs.truncate with a file descriptor is deprecated. Please use ' +
            'fs.ftruncate with a file descriptor instead.',
            'DeprecationWarning', 'DEP0081');
        truncateWarn = false;
    }
}

function getOptions(options, defaultOptions) {
    if (options === null || options === undefined ||
        typeof options === 'function') {
        return defaultOptions;
    }

    if (typeof options === 'string') {
        defaultOptions = util._extend({}, defaultOptions);
        defaultOptions.encoding = options;
        options = defaultOptions;
    } else if (typeof options !== 'object') {
        throw new TypeError('ERR_INVALID_ARG_TYPE', 'options', ['string', 'Object'], options);
    }

    if (options.encoding !== 'buffer') {
        assertEncoding(options.encoding);
    }
    return options;
}

function copyObject(source) {
    var target = {};
    for (var key in source)
        target[key] = source[key];
    return target;
}

// TODO(joyeecheung): explore how the deprecation could be solved via linting
// rules. See https://github.com/nodejs/node/pull/12976
function rethrow() {
    process.emitWarning(
        'Calling an asynchronous function without callback is deprecated.',
        'DeprecationWarning', 'DEP0013', rethrow
    );

    // Only enable in debug mode. A backtrace uses ~1000 bytes of heap space and
    // is fairly slow to generate.
    if (DEBUG) {
        var backtrace = new Error();
        return function (err) {
            if (err) {
                backtrace.stack = `${err.name}: ${err.message}` +
                    backtrace.stack.substr(backtrace.name.length);
                throw backtrace;
            }
        };
    }

    return function (err) {
        if (err) {
            throw err;  // Forgot a callback but don't know where? Use NODE_DEBUG=fs
        }
    };
}

function maybeCallback(cb) {
    return typeof cb === 'function' ? cb : rethrow();
}

// Ensure that callbacks run in the global context. Only use this function
// for callbacks that are passed to the binding layer, callbacks that are
// invoked from JS already run in the proper scope.
function makeCallback(cb) {
    if (cb === undefined) {
        return rethrow();
    }

    if (typeof cb !== 'function') {
        throw new TypeError('ERR_INVALID_CALLBACK');
    }

    return function (...args) {
        return Reflect.apply(cb, undefined, args);
    };
}
function isUint8Array(buffer) {
    return buffer[Symbol.toStringTag] == 'Uint8Array'
}
function validateBuffer(buffer) {
    if (!isUint8Array(buffer)) {
        const err = new TypeError('ERR_INVALID_ARG_TYPE', 'buffer',
            ['Buffer', 'Uint8Array']);
        Error.captureStackTrace(err, validateBuffer);
        throw err;
    }
}

function validateLen(len) {
    let err;

    if (!isInt32(len)) {
        err = new TypeError('ERR_INVALID_ARG_TYPE', 'len', 'integer');
    }

    if (err !== undefined) {
        Error.captureStackTrace(err, validateLen);
        throw err;
    }
}

function validateOffsetLengthRead(offset, length, bufferLength) {
    let err;

    if (offset < 0 || offset >= bufferLength) {
        err = new RangeError('ERR_OUT_OF_RANGE', 'offset');
    } else if (length < 0 || offset + length > bufferLength) {
        err = new RangeError('ERR_OUT_OF_RANGE', 'length');
    }

    if (err !== undefined) {
        Error.captureStackTrace(err, validateOffsetLengthRead);
        throw err;
    }
}

function validateOffsetLengthWrite(offset, length, byteLength) {
    let err;

    if (offset > byteLength) {
        err = new RangeError('ERR_OUT_OF_RANGE', 'offset');
    } else if (offset + length > byteLength || offset + length > kMaxLength) {
        err = new RangeError('ERR_OUT_OF_RANGE', 'length');
    }

    if (err !== undefined) {
        Error.captureStackTrace(err, validateOffsetLengthWrite);
        throw err;
    }
}

// Check if the path contains null types if it is a string nor Uint8Array,
// otherwise return silently.
function nullCheck(path, propName?, throwError = true) {
    const pathIsString = typeof path === 'string';
    const pathIsUint8Array = isUint8Array(path);

    // We can only perform meaningful checks on strings and Uint8Arrays.
    if (!pathIsString && !pathIsUint8Array) {
        return;
    }

    if (pathIsString && path.indexOf('\u0000') === -1) {
        return;
    } else
    if (pathIsUint8Array && path.indexOf(0) === -1) {
        return;
    }

    const err = new Error(['ERR_INVALID_ARG_VALUE', propName, path, 'must be a string or Uint8Array without null bytes'].join(' '));

    if (throwError) {
        Error.captureStackTrace(err, nullCheck);
        throw err;
    }
    return err;
}
function validatePath(path, propName?) {
    let err;

    if (propName === undefined) {
        propName = 'path';
    }

    if (typeof path !== 'string' && !isUint8Array(path)) {
        err = new TypeError('ERR_INVALID_ARG_TYPE', propName,
            ['string', 'Buffer', 'URL']);
    } else {
        err = nullCheck(path, propName, false);
    }

    if (err !== undefined) {
        Error.captureStackTrace(err, validatePath);
        throw err;
    }
}
function validateUint32(value, propName) {
    let err;

    if (!isUint32(value)) {
        err = new TypeError('ERR_INVALID_ARG_TYPE', propName, 'integer');
    }

    if (err !== undefined) {
        Error.captureStackTrace(err, validateUint32);
        throw err;
    }
}

// Special case of `makeCallback()` that is specific to async `*stat()` calls as
// an optimization, since the data passed back to the callback needs to be
// transformed anyway.
function makeStatsCallback(cb) {
    if (cb === undefined) {
        return rethrow();
    }
    if (typeof cb !== 'function') {
        throw new TypeError('ERR_INVALID_CALLBACK');
    }
    return function (err) {
        if (err) {
            return cb(err);
        }
        cb(err, statsFromValues());
    };
}

function isFd(path) {
    return (path >>> 0) === path;
}

// Constructor for file stats.
function Metadata(dev,mode,nlink,uid,gid,rdev,blksize,ino,size,blocks,atim_msec,mtim_msec,ctim_msec,birthtim_msec) {
    this.dev = dev;
    this.mode = mode;
    this.nlink = nlink;
    this.uid = uid;
    this.gid = gid;
    this.rdev = rdev;
    this.blksize = blksize;
    this.ino = ino;
    this.size = size;
    this.blocks = blocks;
    this.atimeMs = atim_msec;
    this.mtimeMs = mtim_msec;
    this.ctimeMs = ctim_msec;
    this.birthtimeMs = birthtim_msec;
    this.atime = new Date(atim_msec + 0.5);
    this.mtime = new Date(mtim_msec + 0.5);
    this.ctime = new Date(ctim_msec + 0.5);
    this.birthtime = new Date(birthtim_msec + 0.5);
}
fs.Stats = Metadata;

Metadata.prototype._checkModeProperty = function (property) {
    return ((this.mode & S_IFMT) === property);
};

Metadata.prototype.isDirectory = function () {
    return this._checkModeProperty(constants.S_IFDIR);
};

Metadata.prototype.isFile = function () {
    return this._checkModeProperty(S_IFREG);
};

Metadata.prototype.isBlockDevice = function () {
    return this._checkModeProperty(constants.S_IFBLK);
};

Metadata.prototype.isCharacterDevice = function () {
    return this._checkModeProperty(constants.S_IFCHR);
};

Metadata.prototype.isSymbolicLink = function () {
    return this._checkModeProperty(S_IFLNK);
};

Metadata.prototype.isFIFO = function () {
    return this._checkModeProperty(S_IFIFO);
};

Metadata.prototype.isSocket = function () {
    return this._checkModeProperty(S_IFSOCK);
};

const statValues = binding.statValues;

function statsFromValues(stats = statValues) {
    return new Metadata(stats[0], stats[1], stats[2], stats[3], stats[4], stats[5],
        stats[6] < 0 ? undefined : stats[6], stats[7], stats[8],
        stats[9] < 0 ? undefined : stats[9], stats[10], stats[11],
        stats[12], stats[13]);
}

// Don't allow mode to accidentally be overwritten.
Object.defineProperties(fs, {
    F_OK: {enumerable: true, value: constants.F_OK || 0},
    R_OK: {enumerable: true, value: constants.R_OK || 0},
    W_OK: {enumerable: true, value: constants.W_OK || 0},
    X_OK: {enumerable: true, value: constants.X_OK || 0},
});

fs.access = function (path, mode, callback) {
    if (typeof mode === 'function') {
        callback = mode;
        mode = fs.F_OK;
    } else
    if (typeof callback !== 'function') {
        throw new TypeError('ERR_INVALID_CALLBACK');
    }

    path = getPathFromURL(path);
    validatePath(path);

    mode = mode | 0;
    var req = new FSReqWrap();
    req.oncomplete = makeCallback(callback);
    binding.access(pathModule.toNamespacedPath(path), mode, req);
};

fs.accessSync = function (path, mode) {
    path = getPathFromURL(path);
    validatePath(path);

    if (mode === undefined) {
        mode = fs.F_OK;
    } else {
        mode = mode | 0;
    }

    const ctx = {path, errno: undefined};
    binding.access(pathModule.toNamespacedPath(path), mode, undefined, ctx);

    if (ctx.errno !== undefined) {
        throw new Error('Error ' + ctx.errno);
    }
};

// fs.exists never throws even when the arguments are invalid - if there is
// a callback it would invoke it with false, otherwise it emits a warning
// (see the comments of rethrow()).
// This is to bring it inline with fs.existsSync, which never throws.
// TODO(joyeecheung): deprecate the never-throw-on-invalid-arguments behavior
fs.exists = function (path, callback) {
    if (typeof callback !== 'function') {
        rethrow();
        return;
    }

    function suppressedCallback(err) {
        callback(err ? false : true);
    }

    try {
        path = getPathFromURL(path);
        validatePath(path);
    } catch (err) {
        return callback(false);
    }
    var req = new FSReqWrap();
    req.oncomplete = suppressedCallback;
    binding.stat(pathModule.toNamespacedPath(path), req);
};

// fs.existsSync never throws, it only returns true or false.
// Since fs.existsSync never throws, users have established
// the expectation that passing invalid arguments to it, even like
// fs.existsSync(), would only get a false in return, so we cannot signal
// validation errors to users properly out of compatibility concerns.
// TODO(joyeecheung): deprecate the never-throw-on-invalid-arguments behavior
fs.existsSync = function (path) {
    try {
        path = getPathFromURL(path);
        validatePath(path);
        const ctx = {path, errno: undefined};
        binding.stat(pathModule.toNamespacedPath(path), undefined, ctx);
        if (ctx.errno !== undefined) {
            return false;
        }
        return true;
    } catch (e) {
        return false;
    }
};

fs.readFile = function (path, options, callback) {
    callback = maybeCallback(callback || options);
    options = getOptions(options, {flag: 'r'});
    var context = new ReadFileContext(callback, options.encoding);
    context.isUserFd = isFd(path); // file descriptor ownership
    var req = new FSReqWrap();
    req.context = context;
    req.oncomplete = readFileAfterOpen;

    if (context.isUserFd) {
        process.nextTick(function () {
            req.oncomplete(null, path);
        });
        return;
    }

    path = getPathFromURL(path);
    validatePath(path);
    binding.open(pathModule.toNamespacedPath(path), stringToFlags(options.flag || 'r'), 0o666, req);
};

const kReadFileBufferLength = 8 * 1024;

function ReadFileContext(callback, encoding) {
    this.fd = undefined;
    this.isUserFd = undefined;
    this.size = undefined;
    this.callback = callback;
    this.buffers = null;
    this.buffer = null;
    this.pos = 0;
    this.encoding = encoding;
    this.err = null;
}

ReadFileContext.prototype.read = function () {
    var buffer;
    var offset;
    var length;

    if (this.size === 0) {
        buffer = this.buffer = Buffer.allocUnsafeSlow(kReadFileBufferLength);
        offset = 0;
        length = kReadFileBufferLength;
    } else {
        buffer = this.buffer;
        offset = this.pos;
        length = Math.min(kReadFileBufferLength, this.size - this.pos);
    }

    var req = new FSReqWrap();
    req.oncomplete = readFileAfterRead;
    req.context = this;

    binding.read(this.fd, buffer, offset, length, -1, req);
};

ReadFileContext.prototype.close = function (err) {
    var req = new FSReqWrap();
    req.oncomplete = readFileAfterClose;
    req.context = this;
    this.err = err;

    if (this.isUserFd) {
        process.nextTick(function () {
            req.oncomplete(null);
        });
        return;
    }

    binding.close(this.fd, req);
};

function readFileAfterOpen(err, fd) {
    var context = this.context;

    if (err) {
        context.callback(err);
        return;
    }

    context.fd = fd;

    var req = new FSReqWrap();
    req.oncomplete = readFileAfterStat;
    req.context = context;
    binding.fstat(fd, req);
}

function readFileAfterStat(err) {
    var context = this.context;

    if (err) {
        return context.close(err);
    }

    // Use stats array directly to avoid creating an fs.Metadata instance just for
    // our internal use.
    var size;
    if ((statValues[1/*mode*/] & S_IFMT) === S_IFREG) {
        size = context.size = statValues[8/*size*/];
    } else {
        size = context.size = 0;
    }

    if (size === 0) {
        context.buffers = [];
        context.read();
        return;
    }

    if (size > kMaxLength) {
        err = new RangeError('File size is greater than possible Buffer: ' +
            `0x${kMaxLength.toString(16)} bytes`);
        return context.close(err);
    }

    try {
        context.buffer = Buffer.allocUnsafeSlow(size);
    } catch (err) {
        return context.close(err);
    }
    context.read();
}

function readFileAfterRead(err, bytesRead) {
    var context = this.context;

    if (err) {
        return context.close(err);
    }

    if (bytesRead === 0) {
        return context.close();
    }

    context.pos += bytesRead;

    if (context.size !== 0) {
        if (context.pos === context.size) {
            context.close();
        } else {
            context.read();
        }
    } else {
        // unknown size, just read until we don't get bytes.
        context.buffers.push(context.buffer.slice(0, bytesRead));
        context.read();
    }
}

function readFileAfterClose(err) {
    var context = this.context;
    var buffer = null;
    var callback = context.callback;

    if (context.err || err) {
        return callback(context.err || err);
    }

    try {
        if (context.size === 0) {
            buffer = Buffer.concat(context.buffers, context.pos);
        } else if (context.pos < context.size) {
            buffer = context.buffer.slice(0, context.pos);
        } else {
            buffer = context.buffer;
        }

        if (context.encoding) {
            buffer = buffer.toString(context.encoding);
        }
    } catch (err) {
        return callback(err);
    }

    callback(null, buffer);
}

function tryStatSync(fd, isUserFd) {
    const ctx = {errno: undefined};
    binding.fstat(fd, undefined, ctx);
    if (ctx.errno !== undefined && !isUserFd) {
        fs.closeSync(fd);
        throw new Error(ctx.errno);
    }
}

function tryCreateBuffer(size, fd, isUserFd) {
    var threw = true;
    var buffer;
    try {
        buffer = Buffer.allocUnsafe(size);
        threw = false;
    } finally {
        if (threw && !isUserFd) {
            fs.closeSync(fd);
        }
    }
    return buffer;
}

function tryReadSync(fd, isUserFd, buffer, pos, len) {
    var threw = true;
    var bytesRead;
    try {
        bytesRead = fs.readSync(fd, buffer, pos, len);
        threw = false;
    } finally {
        if (threw && !isUserFd) {
            fs.closeSync(fd);
        }
    }
    return bytesRead;
}

fs.readFileSync = function (path, options) {
    options = getOptions(options, {flag: 'r'});
    var isUserFd = isFd(path); // file descriptor ownership
    var fd = isUserFd ? path : fs.openSync(path, options.flag || 'r', 0o666);

    tryStatSync(fd, isUserFd);
    // Use stats array directly to avoid creating an fs.Metadata instance just for
    // our internal use.
    var size;
    if ((statValues[1/*mode*/] & S_IFMT) === S_IFREG) {
        size = statValues[8/*size*/];
    } else {
        size = 0;
    }
    var pos = 0;
    var buffer; // single buffer with file data
    var buffers; // list for when size is unknown

    if (size === 0) {
        buffers = [];
    } else {
        buffer = tryCreateBuffer(size, fd, isUserFd);
    }

    var bytesRead;

    if (size !== 0) {
        do {
            bytesRead = tryReadSync(fd, isUserFd, buffer, pos, size - pos);
            pos += bytesRead;
        } while (bytesRead !== 0 && pos < size);
    } else {
        do {
            // the kernel lies about many files.
            // Go ahead and try to read some bytes.
            buffer = Buffer.allocUnsafe(8192);
            bytesRead = tryReadSync(fd, isUserFd, buffer, 0, 8192);
            if (bytesRead !== 0) {
                buffers.push(buffer.slice(0, bytesRead));
            }
            pos += bytesRead;
        } while (bytesRead !== 0);
    }

    if (!isUserFd) {
        fs.closeSync(fd);
    }

    if (size === 0) {
        // data was collected into the buffers list.
        buffer = Buffer.concat(buffers, pos);
    } else if (pos < size) {
        buffer = buffer.slice(0, pos);
    }

    if (options.encoding) {
        buffer = buffer.toString(options.encoding);
    }
    return buffer;
};

fs.close = function (fd, callback) {
    validateUint32(fd, 'fd');
    const req = new FSReqWrap();
    req.oncomplete = makeCallback(callback);
    binding.close(fd, req);
};

fs.closeSync = function (fd) {
    validateUint32(fd, 'fd');

    const ctx = {errno: undefined};
    binding.close(fd, undefined, ctx);
    if (ctx.errno !== undefined) {
        throw errnoException(ctx.errno);
    }
};

function modeNum(m, def?) {
    if (typeof m === 'number') {
        return m;
    }
    if (typeof m === 'string') {
        return parseInt(m, 8);
    }
    if (def) {
        return modeNum(def);
    }
    return undefined;
}

fs.open = function (path, flags, mode, callback_) {
    var callback = makeCallback(arguments[arguments.length - 1]);
    mode = modeNum(mode, 0o666);

    path = getPathFromURL(path);
    validatePath(path);
    validateUint32(mode, 'mode');

    const req = new FSReqWrap();
    req.oncomplete = callback;

    binding.open(pathModule.toNamespacedPath(path),
        stringToFlags(flags),
        mode,
        req);
};

fs.openSync = function (path, flags, mode) {
    mode = modeNum(mode, 0o666);
    path = getPathFromURL(path);
    validatePath(path);
    validateUint32(mode, 'mode');

    return binding.open(pathModule.toNamespacedPath(path),
        stringToFlags(flags), mode);
};

fs.read = function (fd, buffer, offset, length, position, callback) {
    validateUint32(fd, 'fd');
    validateBuffer(buffer);

    offset |= 0;
    length |= 0;

    if (length === 0) {
        return process.nextTick(function () {
            callback && callback(null, 0, buffer);
        });
    }

    validateOffsetLengthRead(offset, length, buffer.length);

    if (!isUint32(position)) {
        position = -1;
    }

    function wrapper(err, bytesRead) {
        // Retain a reference to buffer so that it can't be GC'ed too soon.
        callback && callback(err, bytesRead || 0, buffer);
    }

    const req = new FSReqWrap();
    req.oncomplete = wrapper;

    binding.read(fd, buffer, offset, length, position, req);
};

fs.readSync = function (fd, buffer, offset, length, position) {
    validateUint32(fd, 'fd');
    validateBuffer(buffer);

    offset |= 0;
    length |= 0;

    if (length === 0) {
        return 0;
    }

    validateOffsetLengthRead(offset, length, buffer.length);

    if (!isUint32(position)) {
        position = -1;
    }

    return binding.read(fd, buffer, offset, length, position);
};

// usage:
//  fs.write(fd, buffer[, offset[, length[, position]]], callback);
// OR
//  fs.write(fd, string[, position[, encoding]], callback);
fs.write = function (fd, buffer, offset, length, position, callback) {
    function wrapper(err, written) {
        // Retain a reference to buffer so that it can't be GC'ed too soon.
        callback(err, written || 0, buffer);
    }

    validateUint32(fd, 'fd');

    const req = new FSReqWrap();
    req.oncomplete = wrapper;

    if (isUint8Array(buffer)) {
        callback = maybeCallback(callback || position || length || offset);
        if (typeof offset !== 'number') {
            offset = 0;
        }
        if (typeof length !== 'number') {
            length = buffer.length - offset;
        }
        if (typeof position !== 'number') {
            position = null;
        }
        validateOffsetLengthWrite(offset, length, buffer.byteLength);
        return binding.writeBuffer(fd, buffer, offset, length, position, req);
    }

    if (typeof buffer !== 'string') {
        buffer += '';
    }
    if (typeof position !== 'function') {
        if (typeof offset === 'function') {
            position = offset;
            offset = null;
        } else {
            position = length;
        }
        length = 'utf8';
    }
    callback = maybeCallback(position);
    return binding.writeString(fd, buffer, offset, length, req);
};

// usage:
//  fs.writeSync(fd, buffer[, offset[, length[, position]]]);
// OR
//  fs.writeSync(fd, string[, position[, encoding]]);
fs.writeSync = function (fd, buffer, offset, length, position) {
    validateUint32(fd, 'fd');
    if (isUint8Array(buffer)) {
        if (position === undefined) {
            position = null;
        }
        if (typeof offset !== 'number') {
            offset = 0;
        }
        if (typeof length !== 'number') {
            length = buffer.length - offset;
        }
        validateOffsetLengthWrite(offset, length, buffer.byteLength);
        return binding.writeBuffer(fd, buffer, offset, length, position);
    }
    if (typeof buffer !== 'string') {
        buffer += '';
    }
    if (offset === undefined) {
        offset = null;
    }
    return binding.writeString(fd, buffer, offset, length, position);
};

fs.rename = function (oldPath, newPath, callback) {
    callback = makeCallback(callback);
    oldPath = getPathFromURL(oldPath);
    validatePath(oldPath, 'oldPath');
    newPath = getPathFromURL(newPath);
    validatePath(newPath, 'newPath');
    const req = new FSReqWrap();
    req.oncomplete = callback;
    binding.rename(pathModule.toNamespacedPath(oldPath),
        pathModule.toNamespacedPath(newPath),
        req);
};

fs.renameSync = function (oldPath, newPath) {
    oldPath = getPathFromURL(oldPath);
    validatePath(oldPath, 'oldPath');
    newPath = getPathFromURL(newPath);
    validatePath(newPath, 'newPath');
    const ctx = {path: oldPath, dest: newPath, errno: undefined};
    binding.rename(pathModule.toNamespacedPath(oldPath),
        pathModule.toNamespacedPath(newPath), undefined, ctx);
    if (ctx.errno !== undefined) {
        throw errnoException(ctx);
    }
};

fs.truncate = function (path, len, callback) {
    if (typeof path === 'number') {
        showTruncateDeprecation();
        return fs.ftruncate(path, len, callback);
    }
    if (typeof len === 'function') {
        callback = len;
        len = 0;
    } else if (len === undefined) {
        len = 0;
    }

    callback = maybeCallback(callback);
    fs.open(path, 'r+', function (er, fd) {
        if (er) {
            return callback(er);
        }
        var req = new FSReqWrap();
        req.oncomplete = function oncomplete(er) {
            fs.close(fd, function (er2) {
                callback(er || er2);
            });
        };
        binding.ftruncate(fd, len, req);
    });
};

fs.truncateSync = function (path, len) {
    if (typeof path === 'number') {
        // legacy
        showTruncateDeprecation();
        return fs.ftruncateSync(path, len);
    }
    if (len === undefined) {
        len = 0;
    }
    // allow error to be thrown, but still close fd.
    var fd = fs.openSync(path, 'r+');
    var ret;

    try {
        ret = fs.ftruncateSync(fd, len);
    } finally {
        fs.closeSync(fd);
    }
    return ret;
};

fs.ftruncate = function (fd, len = 0, callback) {
    if (typeof len === 'function') {
        callback = len;
        len = 0;
    }
    validateUint32(fd, 'fd');
    validateLen(len);
    len = Math.max(0, len);
    const req = new FSReqWrap();
    req.oncomplete = makeCallback(callback);
    binding.ftruncate(fd, len, req);
};

fs.ftruncateSync = function (fd, len = 0) {
    validateUint32(fd, 'fd');
    validateLen(len);
    len = Math.max(0, len);
    const ctx = {errno: undefined};
    binding.ftruncate(fd, len, undefined, ctx);
    if (ctx.errno !== undefined) {
        throw errnoException(ctx);
    }
};

fs.rmdir = function (path, callback) {
    callback = maybeCallback(callback);
    path = getPathFromURL(path);
    validatePath(path);
    const req = new FSReqWrap();
    req.oncomplete = callback;
    binding.rmdir(pathModule.toNamespacedPath(path), req);
};

fs.rmdirSync = function (path) {
    path = getPathFromURL(path);
    validatePath(path);
    return binding.rmdir(pathModule.toNamespacedPath(path));
};

fs.fdatasync = function (fd, callback) {
    validateUint32(fd, 'fd');
    const req = new FSReqWrap();
    req.oncomplete = makeCallback(callback);
    binding.fdatasync(fd, req);
};

fs.fdatasyncSync = function (fd) {
    validateUint32(fd, 'fd');
    const ctx = {errno: undefined};
    binding.fdatasync(fd, undefined, ctx);
    if (ctx.errno !== undefined) {
        throw errnoException(ctx);
    }
};

fs.fsync = function (fd, callback) {
    validateUint32(fd, 'fd');
    const req = new FSReqWrap();
    req.oncomplete = makeCallback(callback);
    binding.fsync(fd, req);
};

fs.fsyncSync = function (fd) {
    validateUint32(fd, 'fd');
    const ctx = {errno: undefined};
    binding.fsync(fd, undefined, ctx);
    if (ctx.errno !== undefined) {
        throw errnoException(ctx);
    }
};

fs.mkdir = function (path, mode, callback) {
    if (typeof mode === 'function') {
        callback = mode;
    }
    callback = makeCallback(callback);
    path = getPathFromURL(path);
    validatePath(path);
    mode = modeNum(mode, 0o777);
    validateUint32(mode, 'mode');

    const req = new FSReqWrap();
    req.oncomplete = callback;
    binding.mkdir(pathModule.toNamespacedPath(path), mode, req);
};

fs.mkdirSync = function (path, mode) {
    path = getPathFromURL(path);
    validatePath(path);
    mode = modeNum(mode, 0o777);
    validateUint32(mode, 'mode');
    return binding.mkdir(pathModule.toNamespacedPath(path), mode);
};

fs.readdir = function (path, options, callback) {
    callback = makeCallback(typeof options === 'function' ? options : callback);
    options = getOptions(options, {});
    path = getPathFromURL(path);
    validatePath(path);

    const req = new FSReqWrap();
    req.oncomplete = callback;
    binding.readdir(pathModule.toNamespacedPath(path), options.encoding, req);
};

fs.readdirSync = function (path, options) {
    options = getOptions(options, {});
    path = getPathFromURL(path);
    validatePath(path);
    return binding.readdir(pathModule.toNamespacedPath(path), options.encoding);
};

fs.fstat = function (fd, callback) {
    validateUint32(fd, 'fd');
    const req = new FSReqWrap();
    req.oncomplete = makeStatsCallback(callback);
    binding.fstat(fd, req);
};

fs.lstat = function (path, callback) {
    callback = makeStatsCallback(callback);
    path = getPathFromURL(path);
    validatePath(path);
    const req = new FSReqWrap();
    req.oncomplete = callback;
    binding.lstat(pathModule.toNamespacedPath(path), req);
};

fs.stat = function (path, callback) {
    callback = makeStatsCallback(callback);
    path = getPathFromURL(path);
    validatePath(path);
    const req = new FSReqWrap();
    req.oncomplete = callback;
    binding.stat(pathModule.toNamespacedPath(path), req);
};

fs.fstatSync = function (fd) {
    validateUint32(fd, 'fd');
    const ctx = {fd, errno: undefined};
    binding.fstat(fd, undefined, ctx);
    if (ctx.errno !== undefined) {
        throw errnoException(ctx);
    }
    return statsFromValues();
};

fs.lstatSync = function (path) {
    path = getPathFromURL(path);
    validatePath(path);
    const ctx = {path, errno: undefined};
    binding.lstat(pathModule.toNamespacedPath(path), undefined, ctx);
    if (ctx.errno !== undefined) {
        throw errnoException(ctx);
    }
    return statsFromValues();
};

fs.statSync = function (path) {
    path = getPathFromURL(path);
    validatePath(path);
    const ctx = {path, errno: undefined};
    binding.stat(pathModule.toNamespacedPath(path), undefined, ctx);
    if (ctx.errno !== undefined) {
        throw errnoException(ctx);
    }
    return statsFromValues();
};

fs.readlink = function (path, options, callback) {
    callback = makeCallback(typeof options === 'function' ? options : callback);
    options = getOptions(options, {});
    path = getPathFromURL(path);
    validatePath(path, 'oldPath');
    const req = new FSReqWrap();
    req.oncomplete = callback;
    binding.readlink(pathModule.toNamespacedPath(path), options.encoding, req);
};

fs.readlinkSync = function (path, options) {
    options = getOptions(options, {});
    path = getPathFromURL(path);
    validatePath(path, 'oldPath');
    const ctx = {path, errno: undefined, error: undefined};
    const result = binding.readlink(pathModule.toNamespacedPath(path),
        options.encoding, undefined, ctx);
    if (ctx.errno !== undefined) {
        throw errnoException(ctx);
    } else if (ctx.error) {
        // TODO(joyeecheung): this is an encoding error usually caused by memory
        // problems. We need to figure out proper error code(s) for this.
        Error.captureStackTrace(ctx.error);
        throw ctx.error;
    }
    return result;
};

function preprocessSymlinkDestination(path, type, linkPath) {
    if (!isWindows) {
        // No preprocessing is needed on Unix.
        return path;
    } else if (type === 'junction') {
        // Junctions paths need to be absolute and \\?\-prefixed.
        // A relative target is relative to the link's parent directory.
        path = pathModule.resolve(linkPath, '..', path);
        return pathModule.toNamespacedPath(path);
    } else {
        // Windows symlinks don't tolerate forward slashes.
        return ('' + path).replace(/\//g, '\\');
    }
}

function stringToSymlinkType(type) {
    let flags = 0;
    if (typeof type === 'string') {
        switch (type) {
            case 'dir':
                flags |= constants.UV_FS_SYMLINK_DIR;
                break;
            case 'junction':
                flags |= constants.UV_FS_SYMLINK_JUNCTION;
                break;
            case 'file':
                break;
            default:
                const err = new Error('ERR_FS_INVALID_SYMLINK_TYPE ' + type);
                Error.captureStackTrace(err, stringToSymlinkType);
                throw err;
        }
    }
    return flags;
}

fs.symlink = function (target, path, type_, callback_) {
    var type = (typeof type_ === 'string' ? type_ : null);
    var callback = makeCallback(arguments[arguments.length - 1]);

    target = getPathFromURL(target);
    path = getPathFromURL(path);
    validatePath(target, 'target');
    validatePath(path);

    const flags = stringToSymlinkType(type);
    const req = new FSReqWrap();
    req.oncomplete = callback;

    binding.symlink(preprocessSymlinkDestination(target, type, path),
        pathModule.toNamespacedPath(path), flags, req);
};

fs.symlinkSync = function (target, path, type) {
    type = (typeof type === 'string' ? type : null);
    target = getPathFromURL(target);
    path = getPathFromURL(path);
    validatePath(target, 'target');
    validatePath(path);
    const flags = stringToSymlinkType(type);

    const ctx = {path: target, dest: path, errno: undefined};
    binding.symlink(preprocessSymlinkDestination(target, type, path),
        pathModule.toNamespacedPath(path), flags, undefined, ctx);

    if (ctx.errno !== undefined) {
        throw errnoException(ctx);
    }
};

fs.link = function (existingPath, newPath, callback) {
    callback = makeCallback(callback);

    existingPath = getPathFromURL(existingPath);
    newPath = getPathFromURL(newPath);
    validatePath(existingPath, 'existingPath');
    validatePath(newPath, 'newPath');

    const req = new FSReqWrap();
    req.oncomplete = callback;

    binding.link(pathModule.toNamespacedPath(existingPath),
        pathModule.toNamespacedPath(newPath),
        req);
};

fs.linkSync = function (existingPath, newPath) {
    existingPath = getPathFromURL(existingPath);
    newPath = getPathFromURL(newPath);
    validatePath(existingPath, 'existingPath');
    validatePath(newPath, 'newPath');

    const ctx = {path: existingPath, dest: newPath, errno: undefined};
    const result = binding.link(pathModule.toNamespacedPath(existingPath),
        pathModule.toNamespacedPath(newPath),
        undefined, ctx);
    if (ctx.errno !== undefined) {
        throw errnoException(ctx);
    }
    return result;
};

fs.unlink = function (path, callback) {
    callback = makeCallback(callback);
    path = getPathFromURL(path);
    validatePath(path);
    const req = new FSReqWrap();
    req.oncomplete = callback;
    binding.unlink(pathModule.toNamespacedPath(path), req);
};

fs.unlinkSync = function (path) {
    path = getPathFromURL(path);
    validatePath(path);
    const ctx = {path, errno: undefined};
    binding.unlink(pathModule.toNamespacedPath(path), undefined, ctx);
    if (ctx.errno !== undefined) {
        throw errnoException(ctx);
    }
};

fs.fchmod = function (fd, mode, callback) {
    mode = modeNum(mode);
    validateUint32(fd, 'fd');
    validateUint32(mode, 'mode');
    // values for mode < 0 are already checked via the validateUint32 function
    if (mode > 0o777) {
        throw new RangeError('ERR_OUT_OF_RANGE', 'mode');
    }

    const req = new FSReqWrap();
    req.oncomplete = makeCallback(callback);
    binding.fchmod(fd, mode, req);
};

fs.fchmodSync = function (fd, mode) {
    mode = modeNum(mode);
    validateUint32(fd, 'fd');
    validateUint32(mode, 'mode');
    if (mode < 0 || mode > 0o777) {
        throw new RangeError('ERR_OUT_OF_RANGE', 'mode');
    }
    return binding.fchmod(fd, mode);
};

if (constants.O_SYMLINK !== undefined) {
    fs.lchmod = function (path, mode, callback) {
        callback = maybeCallback(callback);
        fs.open(path, constants.O_WRONLY | constants.O_SYMLINK, function (err, fd) {
            if (err) {
                callback(err);
                return;
            }
            // Prefer to return the chmod error, if one occurs,
            // but still try to close, and report closing errors if they occur.
            fs.fchmod(fd, mode, function (err) {
                fs.close(fd, function (err2) {
                    callback(err || err2);
                });
            });
        });
    };
    fs.lchmodSync = function (path, mode) {
        const fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK);
        // Prefer to return the chmod error, if one occurs,
        // but still try to close, and report closing errors if they occur.
        let ret;
        try {
            ret = fs.fchmodSync(fd, mode);
        } finally {
            fs.closeSync(fd);
        }
        return ret;
    };
}

fs.chmod = function (path, mode, callback) {
    callback = makeCallback(callback);
    path = getPathFromURL(path);
    validatePath(path);
    mode = modeNum(mode);
    validateUint32(mode, 'mode');

    const req = new FSReqWrap();
    req.oncomplete = callback;
    binding.chmod(pathModule.toNamespacedPath(path), mode, req);
};

fs.chmodSync = function (path, mode) {
    path = getPathFromURL(path);
    validatePath(path);
    mode = modeNum(mode);
    validateUint32(mode, 'mode');
    return binding.chmod(pathModule.toNamespacedPath(path), mode);
};

if (constants.O_SYMLINK !== undefined) {
    fs.lchown = function (path, uid, gid, callback) {
        callback = maybeCallback(callback);
        fs.open(path, constants.O_WRONLY | constants.O_SYMLINK, function (err, fd) {
            if (err) {
                callback(err);
                return;
            }
            // Prefer to return the chown error, if one occurs,
            // but still try to close, and report closing errors if they occur.
            fs.fchown(fd, uid, gid, function (err) {
                fs.close(fd, function (err2) {
                    callback(err || err2);
                });
            });
        });
    };
    fs.lchownSync = function (path, uid, gid) {
        const fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK);
        let ret;
        try {
            ret = fs.fchownSync(fd, uid, gid);
        } finally {
            fs.closeSync(fd);
        }
        return ret;
    };
}

fs.fchown = function (fd, uid, gid, callback) {
    validateUint32(fd, 'fd');
    validateUint32(uid, 'uid');
    validateUint32(gid, 'gid');

    const req = new FSReqWrap();
    req.oncomplete = makeCallback(callback);
    binding.fchown(fd, uid, gid, req);
};

fs.fchownSync = function (fd, uid, gid) {
    validateUint32(fd, 'fd');
    validateUint32(uid, 'uid');
    validateUint32(gid, 'gid');

    return binding.fchown(fd, uid, gid);
};

fs.chown = function (path, uid, gid, callback) {
    callback = makeCallback(callback);
    path = getPathFromURL(path);
    validatePath(path);
    validateUint32(uid, 'uid');
    validateUint32(gid, 'gid');

    const req = new FSReqWrap();
    req.oncomplete = callback;
    binding.chown(pathModule.toNamespacedPath(path), uid, gid, req);
};

fs.chownSync = function (path, uid, gid) {
    path = getPathFromURL(path);
    validatePath(path);
    validateUint32(uid, 'uid');
    validateUint32(gid, 'gid');
    return binding.chown(pathModule.toNamespacedPath(path), uid, gid);
};

// converts Date or number to a fractional UNIX timestamp
function toUnixTimestamp(time, name = 'time') {
    // eslint-disable-next-line eqeqeq
    if (typeof time === 'string' && (+time).toString() == time) {
        return +time;
    }
    if (Number.isFinite(time)) {
        if (time < 0) {
            return Date.now() / 1000;
        }
        return time;
    }
    if (util.isDate(time)) {
        // convert to 123.456 UNIX timestamp
        return time.getTime() / 1000;
    }
    throw new TypeError('ERR_INVALID_ARG_TYPE',name, ['Date', 'Time in seconds'],time);
}

// exported for unit tests, not for public consumption
fs._toUnixTimestamp = toUnixTimestamp;

fs.utimes = function (path, atime, mtime, callback) {
    callback = makeCallback(callback);
    path = getPathFromURL(path);
    validatePath(path);

    const req = new FSReqWrap();
    req.oncomplete = callback;
    binding.utimes(pathModule.toNamespacedPath(path),
        toUnixTimestamp(atime),
        toUnixTimestamp(mtime),
        req);
};

fs.utimesSync = function (path, atime, mtime) {
    path = getPathFromURL(path);
    validatePath(path);
    binding.utimes(pathModule.toNamespacedPath(path),
        toUnixTimestamp(atime),
        toUnixTimestamp(mtime));
};

fs.futimes = function (fd, atime, mtime, callback) {
    validateUint32(fd, 'fd');
    atime = toUnixTimestamp(atime, 'atime');
    mtime = toUnixTimestamp(mtime, 'mtime');
    const req = new FSReqWrap();
    req.oncomplete = makeCallback(callback);
    binding.futimes(fd, atime, mtime, req);
};

fs.futimesSync = function (fd, atime, mtime) {
    validateUint32(fd, 'fd');
    atime = toUnixTimestamp(atime, 'atime');
    mtime = toUnixTimestamp(mtime, 'mtime');
    binding.futimes(fd, atime, mtime);
};

function writeAll(fd, isUserFd, buffer, offset, length, position, callback) {
    // write(fd, buffer, offset, length, position, callback)
    fs.write(fd, buffer, offset, length, position, function (writeErr, written) {
        if (writeErr) {
            if (isUserFd) {
                callback(writeErr);
            } else {
                fs.close(fd, function () {
                    callback(writeErr);
                });
            }
        } else if (written === length) {
            if (isUserFd) {
                callback(null);
            } else {
                fs.close(fd, callback);
            }
        } else {
            offset += written;
            length -= written;
            if (position !== null) {
                position += written;
            }
            writeAll(fd, isUserFd, buffer, offset, length, position, callback);
        }
    });
}

fs.writeFile = function (path, data, options, callback) {
    callback = maybeCallback(callback || options);
    options = getOptions(options, {encoding: 'utf8', mode: 0o666, flag: 'w'});
    const flag = options.flag || 'w';

    if (isFd(path)) {
        writeFd(path, true);
        return;
    }

    fs.open(path, flag, options.mode, function (openErr, fd) {
        if (openErr) {
            callback(openErr);
        } else {
            writeFd(fd, false);
        }
    });

    function writeFd(fd, isUserFd) {
        var buffer = isUint8Array(data) ?
            data : Buffer.from('' + data, options.encoding || 'utf8');
        var position = /a/.test(flag) ? null : 0;

        writeAll(fd, isUserFd, buffer, 0, buffer.length, position, callback);
    }
};

fs.writeFileSync = function (path, data, options) {
    options = getOptions(options, {encoding: 'utf8', mode: 0o666, flag: 'w'});
    const flag = options.flag || 'w';

    var isUserFd = isFd(path); // file descriptor ownership
    var fd = isUserFd ? path : fs.openSync(path, flag, options.mode);

    if (!isUint8Array(data)) {
        data = Buffer.from('' + data, options.encoding || 'utf8');
    }
    var offset = 0;
    var length = data.length;
    var position = /a/.test(flag) ? null : 0;
    try {
        while (length > 0) {
            var written = fs.writeSync(fd, data, offset, length, position);
            offset += written;
            length -= written;
            if (position !== null) {
                position += written;
            }
        }
    } finally {
        if (!isUserFd) {
            fs.closeSync(fd);
        }
    }
};

fs.appendFile = function (path, data, options, callback) {
    callback = maybeCallback(callback || options);
    options = getOptions(options, {encoding: 'utf8', mode: 0o666, flag: 'a'});

    // Don't make changes directly on options object
    options = copyObject(options);

    // force append behavior when using a supplied file descriptor
    if (!options.flag || isFd(path)) {
        options.flag = 'a';
    }

    fs.writeFile(path, data, options, callback);
};

fs.appendFileSync = function (path, data, options) {
    options = getOptions(options, {encoding: 'utf8', mode: 0o666, flag: 'a'});

    // Don't make changes directly on options object
    options = copyObject(options);

    // force append behavior when using a supplied file descriptor
    if (!options.flag || isFd(path)) {
        options.flag = 'a';
    }

    fs.writeFileSync(path, data, options);
};

function FSWatcher() {
    EventEmitter.call(this);

    var self = this;
    this._handle = new FSEvent();
    this._handle.owner = this;
    this._handle.onchange = function (status, eventType, filename) {
        if (status < 0) {
            self._handle.close();
            const error = !filename ?
                errnoException(status, 'Error watching file for changes:') :
                errnoException(status, `Error watching file ${filename} for changes:`);
            error.filename = filename;
            self.emit('error', error);
        } else {
            self.emit('change', eventType, filename);
        }
    };
}
util.inherits(FSWatcher, EventEmitter);

// FIXME(joyeecheung): this method is not documented.
// At the moment if filename is undefined, we
// 1. Throw an Error from C++ land if it's the first time .start() is called
// 2. Return silently from C++ land if .start() has already been called
//    on a valid filename and the wrap has been initialized
FSWatcher.prototype.start = function (
    filename,
    persistent,
    recursive,
    encoding
) {
    filename = getPathFromURL(filename);
    nullCheck(filename, 'filename');
    var err = this._handle.start(pathModule.toNamespacedPath(filename),
        persistent,
        recursive,
        encoding);
    if (err) {
        this._handle.close();
        const error = errnoException(err, `watch ${filename}`);
        error.filename = filename;
        throw error;
    }
};

FSWatcher.prototype.close = function () {
    this._handle.close();
};

fs.watch = function (filename, options, listener) {
    if (typeof options === 'function') {
        listener = options;
    }
    options = getOptions(options, {});

    // Don't make changes directly on options object
    options = copyObject(options);

    if (options.persistent === undefined) {
        options.persistent = true;
    }
    if (options.recursive === undefined) {
        options.recursive = false;
    }

    const watcher = new FSWatcher();
    watcher.start(filename,
        options.persistent,
        options.recursive,
        options.encoding);

    if (listener) {
        watcher.addListener('change', listener);
    }

    return watcher;
};

// Stat Change Watchers

function emitStop(self) {
    self.emit('stop');
}

function statsFromPrevValues() {
    return new Metadata(statValues[14], statValues[15], statValues[16],
        statValues[17], statValues[18], statValues[19],
        statValues[20] < 0 ? undefined : statValues[20],
        statValues[21], statValues[22],
        statValues[23] < 0 ? undefined : statValues[23],
        statValues[24], statValues[25], statValues[26],
        statValues[27]);
}
function StatWatcher() {
    EventEmitter.call(this);

    var self = this;
    this._handle = new binding.StatWatcher();

    // uv_fs_poll is a little more powerful than ev_stat but we curb it for
    // the sake of backwards compatibility
    var oldStatus = -1;

    this._handle.onchange = function (newStatus) {
        if (oldStatus === -1 &&
            newStatus === -1 &&
            statValues[2/*new nlink*/] === statValues[16/*old nlink*/]) {
            return;
        }

        oldStatus = newStatus;
        self.emit('change', statsFromValues(), statsFromPrevValues());
    };

    this._handle.onstop = function () {
        process.nextTick(emitStop, self);
    };
}
util.inherits(StatWatcher, EventEmitter);

// FIXME(joyeecheung): this method is not documented.
// At the moment if filename is undefined, we
// 1. Throw an Error from C++ land if it's the first time .start() is called
// 2. Return silently from C++ land if .start() has already been called
//    on a valid filename and the wrap has been initialized
StatWatcher.prototype.start = function (filename, persistent, interval) {
    filename = getPathFromURL(filename);
    nullCheck(filename, 'filename');
    this._handle.start(pathModule.toNamespacedPath(filename),
        persistent, interval);
};

StatWatcher.prototype.stop = function () {
    this._handle.stop();
};

const statWatchers = new Map();

fs.watchFile = function (filename, options, listener) {
    filename = getPathFromURL(filename);
    validatePath(filename);
    filename = pathModule.resolve(filename);
    var stat;

    var defaults = {
        // Poll interval in milliseconds. 5007 is what libev used to use. It's
        // a little on the slow side but let's stick with it for now to keep
        // behavioral changes to a minimum.
        interval: 5007,
        persistent: true
    };

    if (options !== null && typeof options === 'object') {
        options = util._extend(defaults, options);
    } else {
        listener = options;
        options = defaults;
    }

    if (typeof listener !== 'function') {
        throw new TypeError('ERR_INVALID_ARG_TYPE',
            'listener',
            'Function',
            listener);
    }

    stat = statWatchers.get(filename);

    if (stat === undefined) {
        stat = new StatWatcher();
        stat.start(filename, options.persistent, options.interval);
        statWatchers.set(filename, stat);
    }

    stat.addListener('change', listener);
    return stat;
};

fs.unwatchFile = function (filename, listener) {
    filename = getPathFromURL(filename);
    validatePath(filename);
    filename = pathModule.resolve(filename);
    var stat: any = statWatchers.get(filename);

    if (stat === undefined) {
        return;
    }

    if (typeof listener === 'function') {
        stat.removeListener('change', listener);
    } else {
        stat.removeAllListeners('change');
    }

    if (stat.listenerCount('change') === 0) {
        stat.stop();
        statWatchers.delete(filename);
    }
};

var splitRoot;
if (isWindows) {
    // Regex to find the device root on Windows (e.g. 'c:\\'), including trailing
    // slash.
    const splitRootRe = /^(?:[a-zA-Z]:|[\\/]{2}[^\\/]+[\\/][^\\/]+)?[\\/]*/;
    splitRoot = function splitRoot(str) {
        return splitRootRe.exec(str)[0];
    };
} else {
    splitRoot = function splitRoot(str) {
        for (var i = 0; i < str.length; ++i) {
            if (str.charCodeAt(i) !== 47/*'/'*/) {
                return str.slice(0, i);
            }
        }
        return str;
    };
}

function encodeRealpathResult(result, options) {
    if (!options || !options.encoding || options.encoding === 'utf8') {
        return result;
    }
    const asBuffer = Buffer.from(result);
    if (options.encoding === 'buffer') {
        return asBuffer;
    } else {
        return asBuffer.toString(options.encoding);
    }
}
const realpathCacheKey = Symbol('realpathCacheKey')
// Finds the next portion of a (partial) path, up to the next path delimiter
var nextPart;
if (isWindows) {
    nextPart = function nextPart(p, i) {
        for (; i < p.length; ++i) {
            const ch = p.charCodeAt(i);
            if (ch === 92/*'\'*/ || ch === 47/*'/'*/) {
                return i;
            }
        }
        return -1;
    };
} else {
    nextPart = function nextPart(p, i) {
        return p.indexOf('/', i);
    };
}

const emptyObj = Object.create(null);
fs.realpathSync = function realpathSync(p, options) {
    if (!options) {
        options = emptyObj;
    } else {
        options = getOptions(options, emptyObj);
    }
    p = getPathFromURL(p);
    if (typeof p !== 'string') {
        p += '';
    }
    validatePath(p);
    p = pathModule.resolve(p);

    const cache = options[realpathCacheKey];
    const maybeCachedResult = cache && cache.get(p);
    if (maybeCachedResult) {
        return maybeCachedResult;
    }

    const seenLinks = Object.create(null);
    const knownHard = Object.create(null);
    const original = p;

    // current character position in p
    var pos;
    // the partial path so far, including a trailing slash if any
    var current;
    // the partial path without a trailing slash (except when pointing at a root)
    var base;
    // the partial path scanned in the previous round, with slash
    var previous;

    // Skip over roots
    current = base = splitRoot(p);
    pos = current.length;

    // On windows, check that the root exists. On unix there is no need.
    if (isWindows && !knownHard[base]) {
        const ctx = {path: base, errno: undefined};
        binding.lstat(pathModule.toNamespacedPath(base), undefined, ctx);
        if (ctx.errno !== undefined) {
            throw errnoException(ctx);
        }
        knownHard[base] = true;
    }

    // walk down the path, swapping out linked path parts for their real
    // values
    // NB: p.length changes.
    while (pos < p.length) {
        // find the next part
        var result = nextPart(p, pos);
        previous = current;
        if (result === -1) {
            var last = p.slice(pos);
            current += last;
            base = previous + last;
            pos = p.length;
        } else {
            current += p.slice(pos, result + 1);
            base = previous + p.slice(pos, result);
            pos = result + 1;
        }

        // continue if not a symlink, break if a pipe/socket
        if (knownHard[base] || (cache && cache.get(base) === base)) {
            if ((statValues[1/*mode*/] & S_IFMT) === S_IFIFO ||
                (statValues[1/*mode*/] & S_IFMT) === S_IFSOCK) {
                break;
            }
            continue;
        }

        var resolvedLink;
        var maybeCachedResolved = cache && cache.get(base);
        if (maybeCachedResolved) {
            resolvedLink = maybeCachedResolved;
        } else {
            // Use stats array directly to avoid creating an fs.Metadata instance just
            // for our internal use.

            var baseLong = pathModule.toNamespacedPath(base);
            const ctx = {path: base, errno: undefined};
            binding.lstat(baseLong, undefined, ctx);
            if (ctx.errno !== undefined) {
                throw errnoException(ctx);
            }

            if ((statValues[1/*mode*/] & S_IFMT) !== S_IFLNK) {
                knownHard[base] = true;
                if (cache) {
                    cache.set(base, base);
                }
                continue;
            }

            // read the link if it wasn't read before
            // dev/ino always return 0 on windows, so skip the check.
            var linkTarget = null;
            var id;
            if (!isWindows) {
                var dev = statValues[0/*dev*/].toString(32);
                var ino = statValues[7/*ino*/].toString(32);
                id = `${dev}:${ino}`;
                if (seenLinks[id]) {
                    linkTarget = seenLinks[id];
                }
            }
            if (linkTarget === null) {
                const ctx = {path: base, errno: undefined};
                binding.stat(baseLong, undefined, ctx);
                if (ctx.errno !== undefined) {
                    throw errnoException(ctx);
                }
                linkTarget = binding.readlink(baseLong, undefined, undefined, ctx);
                if (ctx.errno !== undefined) {
                    throw errnoException(ctx);
                }
            }
            resolvedLink = pathModule.resolve(previous, linkTarget);

            if (cache) {
                cache.set(base, resolvedLink);
            }
            if (!isWindows) {
                seenLinks[id] = linkTarget;
            }
        }

        // resolve the link, then start over
        p = pathModule.resolve(resolvedLink, p.slice(pos));

        // Skip over roots
        current = base = splitRoot(p);
        pos = current.length;

        // On windows, check that the root exists. On unix there is no need.
        if (isWindows && !knownHard[base]) {
            const ctx = {path: base, errno: undefined};
            binding.lstat(pathModule.toNamespacedPath(base), undefined, ctx);
            if (ctx.errno !== undefined) {
                throw errnoException(ctx);
            }
            knownHard[base] = true;
        }
    }

    if (cache) {
        cache.set(original, p);
    }
    return encodeRealpathResult(p, options);
};

fs.realpathSync.native = function (path, options) {
    options = getOptions(options, {});
    path = getPathFromURL(path);
    validatePath(path);
    return binding.realpath(path, options.encoding);
};

fs.realpath = function realpath(p, options, callback) {
    callback = maybeCallback(typeof options === 'function' ? options : callback);
    if (!options) {
        options = emptyObj;
    } else {
        options = getOptions(options, emptyObj);
    }
    p = getPathFromURL(p);
    if (typeof p !== 'string') {
        p += '';
    }
    validatePath(p);
    p = pathModule.resolve(p);

    const seenLinks = Object.create(null);
    const knownHard = Object.create(null);

    // current character position in p
    var pos;
    // the partial path so far, including a trailing slash if any
    var current;
    // the partial path without a trailing slash (except when pointing at a root)
    var base;
    // the partial path scanned in the previous round, with slash
    var previous;

    current = base = splitRoot(p);
    pos = current.length;

    // On windows, check that the root exists. On unix there is no need.
    if (isWindows && !knownHard[base]) {
        fs.lstat(base, function (err) {
            if (err) {
                return callback(err);
            }
            knownHard[base] = true;
            LOOP();
        });
    } else {
        process.nextTick(LOOP);
    }

    // walk down the path, swapping out linked path parts for their real
    // values
    function LOOP() {
        // stop if scanned past end of path
        if (pos >= p.length) {
            return callback(null, encodeRealpathResult(p, options));
        }

        // find the next part
        var result = nextPart(p, pos);
        previous = current;
        if (result === -1) {
            var last = p.slice(pos);
            current += last;
            base = previous + last;
            pos = p.length;
        } else {
            current += p.slice(pos, result + 1);
            base = previous + p.slice(pos, result);
            pos = result + 1;
        }

        // continue if not a symlink, break if a pipe/socket
        if (knownHard[base]) {
            if ((statValues[1/*mode*/] & S_IFMT) === S_IFIFO ||
                (statValues[1/*mode*/] & S_IFMT) === S_IFSOCK) {
                return callback(null, encodeRealpathResult(p, options));
            }
            return process.nextTick(LOOP);
        }

        return fs.lstat(base, gotStat);
    }

    function gotStat(err) {
        if (err) {
            return callback(err);
        }

        // Use stats array directly to avoid creating an fs.Metadata instance just for
        // our internal use.

        // if not a symlink, skip to the next path part
        if ((statValues[1/*mode*/] & S_IFMT) !== S_IFLNK) {
            knownHard[base] = true;
            return process.nextTick(LOOP);
        }

        // stat & read the link if not read before
        // call gotTarget as soon as the link target is known
        // dev/ino always return 0 on windows, so skip the check.
        let id;
        if (!isWindows) {
            var dev = statValues[0/*ino*/].toString(32);
            var ino = statValues[7/*ino*/].toString(32);
            id = `${dev}:${ino}`;
            if (seenLinks[id]) {
                return gotTarget(null, seenLinks[id], base);
            }
        }
        fs.stat(base, function (err) {
            if (err) {
                return callback(err);
            }

            fs.readlink(base, function (err, target) {
                if (!isWindows) {
                    seenLinks[id] = target;
                }
                gotTarget(err, target);
            });
        });
    }

    function gotTarget(err, target, base?) {
        if (err) {
            return callback(err);
        }

        var resolvedLink = pathModule.resolve(previous, target);
        gotResolvedLink(resolvedLink);
    }

    function gotResolvedLink(resolvedLink) {
        // resolve the link, then start over
        p = pathModule.resolve(resolvedLink, p.slice(pos));
        current = base = splitRoot(p);
        pos = current.length;

        // On windows, check that the root exists. On unix there is no need.
        if (isWindows && !knownHard[base]) {
            fs.lstat(base, function (err) {
                if (err) {
                    return callback(err);
                }
                knownHard[base] = true;
                LOOP();
            });
        } else {
            process.nextTick(LOOP);
        }
    }
};

fs.realpath.native = function (path, options, callback) {
    callback = maybeCallback(callback || options);
    options = getOptions(options, {});
    path = getPathFromURL(path);
    validatePath(path);
    const req = new FSReqWrap();
    req.oncomplete = callback;
    return binding.realpath(path, options.encoding, req);
};

fs.mkdtemp = function (prefix, options, callback) {
    callback = makeCallback(typeof options === 'function' ? options : callback);
    options = getOptions(options, {});
    if (!prefix || typeof prefix !== 'string') {
        throw new TypeError('ERR_INVALID_ARG_TYPE',
            'prefix',
            'string',
            prefix);
    }
    nullCheck(prefix, 'prefix');
    var req = new FSReqWrap();
    req.oncomplete = callback;
    binding.mkdtemp(`${prefix}XXXXXX`, options.encoding, req);
};

fs.mkdtempSync = function (prefix, options) {
    options = getOptions(options, {});
    if (!prefix || typeof prefix !== 'string') {
        throw new TypeError('ERR_INVALID_ARG_TYPE',
            'prefix',
            'string',
            prefix);
    }
    nullCheck(prefix, 'prefix');
    return binding.mkdtemp(`${prefix}XXXXXX`, options.encoding);
};

// Define copyFile() flags.
Object.defineProperties(fs.constants, {
    COPYFILE_EXCL: {enumerable: true, value: constants.UV_FS_COPYFILE_EXCL}
});

fs.copyFile = function (src, dest, flags, callback) {
    if (typeof flags === 'function') {
        callback = flags;
        flags = 0;
    } else if (typeof callback !== 'function') {
        throw new TypeError('ERR_INVALID_ARG_TYPE', 'callback', 'Function');
    }

    src = getPathFromURL(src);
    dest = getPathFromURL(dest);
    validatePath(src, 'src');
    validatePath(dest, 'dest');

    src = pathModule._makeLong(src);
    dest = pathModule._makeLong(dest);
    flags = flags | 0;
    const req = new FSReqWrap();
    req.oncomplete = makeCallback(callback);
    binding.copyFile(src, dest, flags, req);
};

fs.copyFileSync = function (src, dest, flags) {
    src = getPathFromURL(src);
    dest = getPathFromURL(dest);
    validatePath(src, 'src');
    validatePath(dest, 'dest');

    src = pathModule._makeLong(src);
    dest = pathModule._makeLong(dest);
    flags = flags | 0;
    binding.copyFile(src, dest, flags);
};

var pool;

function allocNewPool(poolSize) {
    pool = Buffer.allocUnsafe(poolSize);
    pool.used = 0;
}

fs.createReadStream = function (path, options) {
    return new ReadStream(path, options);
};

util.inherits(ReadStream, Readable);
fs.ReadStream = ReadStream;

function ReadStream(path, options) {
    // if (!(this instanceof ReadStream))
    //     return new ReadStream(path, options);

    // a little bit bigger buffer and water marks by default
    options = copyObject(getOptions(options, {}));
    if (options.highWaterMark === undefined) {
        options.highWaterMark = 64 * 1024;
    }

    Readable.call(this, options);

    // path will be ignored when fd is specified, so it can be falsy
    this.path = getPathFromURL(path);
    this.fd = options.fd === undefined ? null : options.fd;
    this.flags = options.flags === undefined ? 'r' : options.flags;
    this.mode = options.mode === undefined ? 0o666 : options.mode;

    this.start = typeof this.fd !== 'number' && options.start === undefined ?
        0 : options.start;
    this.end = options.end;
    this.autoClose = options.autoClose === undefined ? true : options.autoClose;
    this.pos = undefined;
    this.bytesRead = 0;
    this.closed = false;

    if (this.start !== undefined) {
        if (typeof this.start !== 'number') {
            throw new TypeError('ERR_INVALID_ARG_TYPE',
                'start',
                'number',
                this.start);
        }
        if (this.end === undefined) {
            this.end = Infinity;
        } else if (typeof this.end !== 'number') {
            throw new TypeError('ERR_INVALID_ARG_TYPE',
                'end',
                'number',
                this.end);
        }

        if (this.start > this.end) {
            const errVal = `{start: ${this.start}, end: ${this.end}}`;
            throw new RangeError('ERR_OUT_OF_RANGE',
                'start',
                '<= "end"',
                errVal);
        }

        this.pos = this.start;
    }

    if (typeof this.fd !== 'number') {
        this.open();
    }

    this.on('end', function () {
        if (this.autoClose) {
            this.destroy();
        }
    });
}

fs.FileReadStream = fs.ReadStream; // support the legacy name

ReadStream.prototype.open = function () {
    var self = this;
    fs.open(this.path, this.flags, this.mode, function (er, fd) {
        if (er) {
            if (self.autoClose) {
                self.destroy();
            }
            self.emit('error', er);
            return;
        }

        self.fd = fd;
        self.emit('open', fd);
        // start the flow of data.
        self.read();
    });
};

ReadStream.prototype._read = function (n) {
    if (typeof this.fd !== 'number') {
        return this.once('open', function () {
            this._read(n);
        });
    }

    if (this.destroyed) {
        return;
    }

    if (!pool || pool.length - pool.used < kMinPoolSpace) {
        // discard the old pool.
        allocNewPool(this.readableHighWaterMark);
    }

    // Grab another reference to the pool in the case that while we're
    // in the thread pool another read() finishes up the pool, and
    // allocates a new one.
    var thisPool = pool;
    var toRead = Math.min(pool.length - pool.used, n);
    var start = pool.used;

    if (this.pos !== undefined) {
        toRead = Math.min(this.end - this.pos + 1, toRead);
    }

    // already read everything we were supposed to read!
    // treat as EOF.
    if (toRead <= 0) {
        return this.push(null);
    }

    // the actual read.
    fs.read(this.fd, pool, pool.used, toRead, this.pos, (er, bytesRead) => {
        if (er) {
            if (this.autoClose) {
                this.destroy();
            }
            this.emit('error', er);
        } else {
            var b = null;
            if (bytesRead > 0) {
                this.bytesRead += bytesRead;
                b = thisPool.slice(start, start + bytesRead);
            }

            this.push(b);
        }
    });

    // move the pool positions, and internal position for reading.
    if (this.pos !== undefined) {
        this.pos += toRead;
    }
    pool.used += toRead;
};

ReadStream.prototype._destroy = function (err, cb) {
    const isOpen = typeof this.fd !== 'number';
    if (isOpen) {
        this.once('open', closeFsStream.bind(null, this, cb, err));
        return;
    }

    closeFsStream(this, cb);
    this.fd = null;
};

function closeFsStream(stream, cb, err?) {
    fs.close(stream.fd, (er) => {
        er = er || err;
        cb(er);
        stream.closed = true;
        if (!er) {
            stream.emit('close');
        }
    });
}

ReadStream.prototype.close = function (cb) {
    this.destroy(null, cb);
};

fs.createWriteStream = function (path, options) {
    return new WriteStream(path, options);
};

util.inherits(WriteStream, Writable);
fs.WriteStream = WriteStream;
function WriteStream(path, options) {
    // if (!(this instanceof WriteStream))
    //     return new WriteStream(path, options);

    options = copyObject(getOptions(options, {}));

    Writable.call(this, options);

    // path will be ignored when fd is specified, so it can be falsy
    this.path = getPathFromURL(path);
    this.fd = options.fd === undefined ? null : options.fd;
    this.flags = options.flags === undefined ? 'w' : options.flags;
    this.mode = options.mode === undefined ? 0o666 : options.mode;

    this.start = options.start;
    this.autoClose = options.autoClose === undefined ? true : !!options.autoClose;
    this.pos = undefined;
    this.bytesWritten = 0;
    this.closed = false;

    if (this.start !== undefined) {
        if (typeof this.start !== 'number') {
            throw new TypeError('ERR_INVALID_ARG_TYPE',
                'start',
                'number',
                this.start);
        }
        if (this.start < 0) {
            const errVal = `{start: ${this.start}}`;
            throw new RangeError('ERR_OUT_OF_RANGE',
                'start',
                '>= 0',
                errVal);
        }

        this.pos = this.start;
    }

    if (options.encoding) {
        this.setDefaultEncoding(options.encoding);
    }

    if (typeof this.fd !== 'number') {
        this.open();
    }

    // dispose on finish.
    this.once('finish', function () {
        if (this.autoClose) {
            this.destroy();
        }
    });
}

fs.FileWriteStream = fs.WriteStream; // support the legacy name

WriteStream.prototype.open = function () {
    fs.open(this.path, this.flags, this.mode, (er, fd) => {
        if (er) {
            if (this.autoClose) {
                this.destroy();
            }
            this.emit('error', er);
            return;
        }

        this.fd = fd;
        this.emit('open', fd);
    });
};

WriteStream.prototype._write = function (data, encoding, cb) {
    if (!(data instanceof Buffer)) {
        const err = new TypeError('ERR_INVALID_ARG_TYPE',
            'data',
            'Buffer',
            data);
        return this.emit('error', err);
    }

    if (typeof this.fd !== 'number') {
        return this.once('open', function () {
            this._write(data, encoding, cb);
        });
    }

    fs.write(this.fd, data, 0, data.length, this.pos, (er, bytes) => {
        if (er) {
            if (this.autoClose) {
                this.destroy();
            }
            return cb(er);
        }
        this.bytesWritten += bytes;
        cb();
    });

    if (this.pos !== undefined) {
        this.pos += data.length;
    }
};

function writev(fd, chunks, position, callback) {
    function wrapper(err, written) {
        // Retain a reference to chunks so that they can't be GC'ed too soon.
        callback(err, written || 0, chunks);
    }

    const req = new FSReqWrap();
    req.oncomplete = wrapper;
    binding.writeBuffers(fd, chunks, position, req);
}

WriteStream.prototype._writev = function (data, cb) {
    if (typeof this.fd !== 'number') {
        return this.once('open', function () {
            this._writev(data, cb);
        });
    }

    const self = this;
    const len = data.length;
    const chunks = new Array(len);
    var size = 0;

    for (var i = 0; i < len; i++) {
        var chunk = data[i].chunk;

        chunks[i] = chunk;
        size += chunk.length;
    }

    writev(this.fd, chunks, this.pos, function (er, bytes) {
        if (er) {
            self.destroy();
            return cb(er);
        }
        self.bytesWritten += bytes;
        cb();
    });

    if (this.pos !== undefined) {
        this.pos += size;
    }
};

WriteStream.prototype._destroy = ReadStream.prototype._destroy;
WriteStream.prototype.close = function (cb) {
    if (cb) {
        if (this.closed) {
            process.nextTick(cb);
            return;
        } else {
            this.on('close', cb);
        }
    }

    // If we are not autoClosing, we should call
    // destroy on 'finish'.
    if (!this.autoClose) {
        this.on('finish', this.destroy.bind(this));
    }

    // we use end() instead of destroy() because of
    // https://github.com/nodejs/node/issues/2006
    this.end();
};

// There is no shutdown() for files.
WriteStream.prototype.destroySoon = WriteStream.prototype.end;

// Promises API

class FileHandle {
    constructor(filehandle) {
        this[kHandle] = filehandle;
    }

    getAsyncId() {
        return this[kHandle].getAsyncId();
    }

    get fd() {
        return this[kHandle].fd;
    }

    appendFile(data, options) {
        return promises.appendFile(this, data, options);
    }

    chmod(mode) {
        return promises.fchmod(this, mode);
    }

    chown(uid, gid) {
        return promises.fchown(this, uid, gid);
    }

    datasync() {
        return promises.fdatasync(this);
    }

    sync() {
        return promises.fsync(this);
    }

    read(buffer, offset, length, position) {
        return promises.read(this, buffer, offset, length, position);
    }

    readFile(options) {
        return promises.readFile(this, options);
    }

    stat() {
        return promises.fstat(this);
    }

    truncate(len = 0) {
        return promises.ftruncate(this, len);
    }

    utimes(atime, mtime) {
        return promises.futimes(this, atime, mtime);
    }

    write(buffer, offset, length, position) {
        return promises.write(this, buffer, offset, length, position);
    }

    writeFile(data, options) {
        return promises.writeFile(this, data, options);
    }

    close() {
        return this[kHandle].close();
    }
}

function validateFileHandle(handle) {
    if (!(handle instanceof FileHandle)) {
        throw new TypeError('ERR_INVALID_ARG_TYPE',
            'filehandle', 'FileHandle');
    }
}

async function writeFileHandle(filehandle, data, options) {
    let buffer = isUint8Array(data) ?
        data : Buffer.from('' + data, options.encoding || 'utf8');
    let remaining = buffer.length;
    if (remaining === 0) {
        return;
    }
    do {
        const {bytesWritten} =
            await promises.write(filehandle, buffer, 0,
                Math.min(16384, buffer.length));
        remaining -= bytesWritten;
        buffer = buffer.slice(bytesWritten);
    } while (remaining > 0);
}

async function readFileHandle(filehandle, options) {
    const statFields = await binding.fstat(filehandle.fd, kUsePromises);

    let size;
    if ((statFields[1/*mode*/] & S_IFMT) === S_IFREG) {
        size = statFields[8/*size*/];
    } else {
        size = 0;
    }

    if (size === 0) {
        return Buffer.alloc(0);
    }

    if (size > kMaxLength) {
        throw new RangeError('ERR_BUFFER_TOO_LARGE');
    }

    const chunks = [];
    const chunkSize = Math.min(size, 16384);
    const buf = Buffer.alloc(chunkSize);
    let read = 0;
    do {
        const {bytesRead, buffer} = await promises.read(filehandle, buf, 0, buf.length);
        read = bytesRead;
        if (read > 0) {
            chunks.push(buffer.slice(0, read));
        }
    } while (read === chunkSize);

    return Buffer.concat(chunks);
}

// All of the functions in fs.promises are defined as async in order to
// ensure that errors thrown cause promise rejections rather than being
// thrown synchronously
const promises = {
    async access(path, mode = fs.F_OK) {
        path = getPathFromURL(path);
        validatePath(path);

        mode = mode | 0;
        return binding.access(pathModule.toNamespacedPath(path), mode,
            kUsePromises);
    },

    async copyFile(src, dest, flags) {
        src = getPathFromURL(src);
        dest = getPathFromURL(dest);
        validatePath(src, 'src');
        validatePath(dest, 'dest');
        flags = flags | 0;
        return binding.copyFile(pathModule.toNamespacedPath(src),
            pathModule.toNamespacedPath(dest),
            flags, kUsePromises);
    },

    // Note that unlike fs.open() which uses numeric file descriptors,
    // promises.open() uses the fs.FileHandle class.
    async open(path, flags, mode?) {
        mode = modeNum(mode, 0o666);
        path = getPathFromURL(path);
        validatePath(path);
        validateUint32(mode, 'mode');
        return new FileHandle(
            await binding.openFileHandle(pathModule.toNamespacedPath(path),
                stringToFlags(flags),
                mode, kUsePromises));
    },

    async read(handle, buffer, offset, length, position?) {
        validateFileHandle(handle);
        validateBuffer(buffer);

        offset |= 0;
        length |= 0;

        if (length === 0) {
            return {bytesRead: length, buffer};
        }

        validateOffsetLengthRead(offset, length, buffer.length);

        if (!isUint32(position)) {
            position = -1;
        }

        const bytesRead = (await binding.read(handle.fd, buffer, offset, length,
            position, kUsePromises)) || 0;

        return {bytesRead, buffer};
    },

    async write(handle, buffer, offset, length, position?) {
        validateFileHandle(handle);

        if (buffer.length === 0) {
            return {bytesWritten: 0, buffer};
        }

        if (isUint8Array(buffer)) {
            if (typeof offset !== 'number') {
                offset = 0;
            }
            if (typeof length !== 'number') {
                length = buffer.length - offset;
            }
            if (typeof position !== 'number') {
                position = null;
            }
            validateOffsetLengthWrite(offset, length, buffer.byteLength);
            const bytesWritten =
                (await binding.writeBuffer(handle.fd, buffer, offset,
                    length, position, kUsePromises)) || 0;
            return {bytesWritten, buffer};
        }

        if (typeof buffer !== 'string') {
            buffer += '';
        }
        if (typeof position !== 'function') {
            if (typeof offset === 'function') {
                position = offset;
                offset = null;
            } else {
                position = length;
            }
            length = 'utf8';
        }
        const bytesWritten = (await binding.writeString(handle.fd, buffer, offset,
            length, kUsePromises)) || 0;
        return {bytesWritten, buffer};
    },

    async rename(oldPath, newPath) {
        oldPath = getPathFromURL(oldPath);
        newPath = getPathFromURL(newPath);
        validatePath(oldPath, 'oldPath');
        validatePath(newPath, 'newPath');
        return binding.rename(pathModule.toNamespacedPath(oldPath),
            pathModule.toNamespacedPath(newPath),
            kUsePromises);
    },

    async truncate(path, len = 0) {
        return promises.ftruncate(await promises.open(path, 'r+'), len);
    },

    async ftruncate(handle, len = 0) {
        validateFileHandle(handle);
        validateLen(len);
        len = Math.max(0, len);
        return binding.ftruncate(handle.fd, len, kUsePromises);
    },

    async rmdir(path) {
        path = getPathFromURL(path);
        validatePath(path);
        return binding.rmdir(pathModule.toNamespacedPath(path), kUsePromises);
    },

    async fdatasync(handle) {
        validateFileHandle(handle);
        return binding.fdatasync(handle.fd, kUsePromises);
    },

    async fsync(handle) {
        validateFileHandle(handle);
        return binding.fsync(handle.fd, kUsePromises);
    },

    async mkdir(path, mode) {
        mode = modeNum(mode, 0o777);
        path = getPathFromURL(path);
        validatePath(path);
        validateUint32(mode, 'mode');
        return binding.mkdir(pathModule.toNamespacedPath(path), mode, kUsePromises);
    },

    async readdir(path, options) {
        options = getOptions(options, {});
        path = getPathFromURL(path);
        validatePath(path);
        return binding.readdir(pathModule.toNamespacedPath(path), options.encoding, kUsePromises);
    },

    async readlink(path, options) {
        options = getOptions(options, {});
        path = getPathFromURL(path);
        validatePath(path, 'oldPath');
        return binding.readlink(pathModule.toNamespacedPath(path),
            options.encoding, kUsePromises);
    },

    async symlink(target, path, type_) {
        const type = (typeof type_ === 'string' ? type_ : null);
        target = getPathFromURL(target);
        path = getPathFromURL(path);
        validatePath(target, 'target');
        validatePath(path);
        return binding.symlink(preprocessSymlinkDestination(target, type, path),
            pathModule.toNamespacedPath(path),
            stringToSymlinkType(type),
            kUsePromises);
    },

    async fstat(handle) {
        validateFileHandle(handle);
        return statsFromValues(await binding.fstat(handle.fd, kUsePromises));
    },

    async lstat(path) {
        path = getPathFromURL(path);
        validatePath(path);
        return statsFromValues(
            await binding.lstat(pathModule.toNamespacedPath(path), kUsePromises));
    },

    async stat(path) {
        path = getPathFromURL(path);
        validatePath(path);
        return statsFromValues(
            await binding.stat(pathModule.toNamespacedPath(path), kUsePromises));
    },

    async link(existingPath, newPath) {
        existingPath = getPathFromURL(existingPath);
        newPath = getPathFromURL(newPath);
        validatePath(existingPath, 'existingPath');
        validatePath(newPath, 'newPath');
        return binding.link(pathModule.toNamespacedPath(existingPath),pathModule.toNamespacedPath(newPath),kUsePromises);
    },

    async unlink(path) {
        path = getPathFromURL(path);
        validatePath(path);
        return binding.unlink(pathModule.toNamespacedPath(path), kUsePromises);
    },

    async fchmod(handle, mode) {
        mode = modeNum(mode);
        validateFileHandle(handle);
        validateUint32(mode, 'mode');
        if (mode < 0 || mode > 0o777) {
            throw new RangeError('ERR_OUT_OF_RANGE', 'mode');
        }
        return binding.fchmod(handle.fd, mode, kUsePromises);
    },

    async chmod(path, mode) {
        path = getPathFromURL(path);
        validatePath(path);
        mode = modeNum(mode);
        validateUint32(mode, 'mode');
        return binding.chmod(pathModule.toNamespacedPath(path), mode, kUsePromises);
    },

    async lchmod(path, mode) {
        if (constants.O_SYMLINK !== undefined) {
            const fd = await promises.open(path,
                constants.O_WRONLY | constants.O_SYMLINK);
            return promises['fschmod'](fd, mode).finally(fd.close.bind(fd));
        }
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    },

    async lchown(path, uid, gid) {
        if (constants.O_SYMLINK !== undefined) {
            const fd = await promises.open(path,
                constants.O_WRONLY | constants.O_SYMLINK);
            return promises['fschmod'](fd, uid, gid).finally(fd.close.bind(fd));
        }
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    },

    async fchown(handle, uid, gid) {
        validateFileHandle(handle);
        validateUint32(uid, 'uid');
        validateUint32(gid, 'gid');
        return binding.fchown(handle.fd, uid, gid, kUsePromises);
    },

    async chown(path, uid, gid) {
        path = getPathFromURL(path);
        validatePath(path);
        validateUint32(uid, 'uid');
        validateUint32(gid, 'gid');
        return binding.chown(pathModule.toNamespacedPath(path),
            uid, gid, kUsePromises);
    },

    async utimes(path, atime, mtime) {
        path = getPathFromURL(path);
        validatePath(path);
        return binding.utimes(pathModule.toNamespacedPath(path),
            toUnixTimestamp(atime),
            toUnixTimestamp(mtime),
            kUsePromises);
    },

    async futimes(handle, atime, mtime) {
        validateFileHandle(handle);
        atime = toUnixTimestamp(atime, 'atime');
        mtime = toUnixTimestamp(mtime, 'mtime');
        return binding.futimes(handle.fd, atime, mtime, kUsePromises);
    },

    async realpath(path, options) {
        options = getOptions(options, {});
        path = getPathFromURL(path);
        validatePath(path);
        return binding.realpath(path, options.encoding, kUsePromises);
    },

    async mkdtemp(prefix, options) {
        options = getOptions(options, {});
        if (!prefix || typeof prefix !== 'string') {
            throw new TypeError('ERR_INVALID_ARG_TYPE',
                'prefix',
                'string',
                prefix);
        }
        nullCheck(prefix);
        return binding.mkdtemp(`${prefix}XXXXXX`, options.encoding, kUsePromises);
    },

    async writeFile(path, data, options) {
        options = getOptions(options, {encoding: 'utf8', mode: 0o666, flag: 'w'});
        const flag = options.flag || 'w';

        if (path instanceof FileHandle) {
            return writeFileHandle(path, data, options);
        }

        const fd = await promises.open(path, flag, options.mode);
        return writeFileHandle(fd, data, options).finally(fd.close.bind(fd));
    },

    async appendFile(path, data, options) {
        options = getOptions(options, {encoding: 'utf8', mode: 0o666, flag: 'a'});
        options = copyObject(options);
        options.flag = options.flag || 'a';
        return promises.writeFile(path, data, options);
    },

    async readFile(path, options) {
        options = getOptions(options, {flag: 'r'});

        if (path instanceof FileHandle) {
            return readFileHandle(path, options);
        }

        const fd = await promises.open(path, options.flag, 0o666);
        return readFileHandle(fd, options).finally(fd.close.bind(fd));
    }
};

export {promises}