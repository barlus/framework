import * as fs from '@barlus/node/fs'
import * as path from '@barlus/node/path'
import {Buffer} from '@barlus/node/buffer'

import { options } from './high-level-opt'
import { Parser } from './parse'

import { ReadStream } from '../ext/minipass-fs'

export default function (opt_, files?, cb?) {
	if (typeof opt_ === 'function')
		cb = opt_, files = null, opt_ = {};
	else if (Array.isArray(opt_))
		files = opt_, opt_ = {};

	if (typeof files === 'function')
		cb = files, files = null;

	if (!files)
		files = [];
	else
		files = Array.from(files);

	const opt = options(opt_);

	if (opt.sync && typeof cb === 'function')
		throw new TypeError('callback not supported for sync tar functions');

	if (!opt.file && typeof cb === 'function')
		throw new TypeError('callback only supported with file option');

	if (files.length)
		filesFilter(opt, files);

	if (!opt.noResume)
		onentryFunction(opt);

	return opt.file && opt.sync ? listFileSync(opt)
		: opt.file ? listFile(opt, cb)
			: list(opt)
}

export function onentryFunction(opt) {
	const onentry = opt.onentry;
	opt.onentry = onentry ? e => {
		onentry(e);
		e.resume()
	} : e => e.resume()
}

// construct a filter that limits the file entries listed
// include child entries if a dir is included
export function filesFilter(opt, files) {
	const map = new Map(files.map(f => [f.replace(/\/+$/, ''), true]));
	const filter = opt.filter;

	const mapHas = (file, r?) => {
		const root = r || path.parse(file).root || '.';
		const ret = file === root ? false
			: map.has(file) ? map.get(file)
				: mapHas(path.dirname(file), root);

		map.set(file, ret);
		return ret
	};

	opt.filter = filter
		? (file, entry) => filter(file, entry) && mapHas(file.replace(/\/+$/, ''))
		: file => mapHas(file.replace(/\/+$/, ''))
}

export function listFileSync(opt) {
	const p = list(opt);
	const file = opt.file;
	let threw = true;
	let fd;
	try {
		const stat = fs.statSync(file);
		const readSize = opt.maxReadSize || 16 * 1024 * 1024;
		if (stat.size < readSize) {
			p.end(fs.readFileSync(file))
		} else {
			let pos = 0;
			const buf = Buffer.allocUnsafe(readSize);
			fd = fs.openSync(file, 'r');
			while (pos < stat.size) {
				let bytesRead = fs.readSync(fd, buf, 0, readSize, pos);
				pos += bytesRead;
				p.write(buf.slice(0, bytesRead))
			}
			p.end()
		}
		threw = false
	} finally {
		if (threw && fd)
			try { fs.closeSync(fd) } catch (er) { }
	}
}

export function listFile(opt, cb) {
	const parse = new Parser(opt);
	const readSize = opt.maxReadSize || 16 * 1024 * 1024;

	const file = opt.file;
	const p = new Promise((resolve, reject) => {
		parse.on('error', reject);
		parse.on('end', resolve);

		fs.stat(file, (er, stat) => {
			if (er)
				reject(er);
			else {
				const stream = new ReadStream(file, {
					readSize: readSize,
					size: stat.size
				});
				stream.on('error', reject);
				stream.pipe(parse)
			}
		})
	});
	return cb ? p.then(cb, cb) : p
}

export function list(opt) {
	return new Parser(opt)
}
