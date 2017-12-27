'use strict';

// tar -u

import r from './replace';
import { options } from './high-level-opt';
// just call tar.r with the filter and mtimeCache

export default function (opt_, files, cb) {
  const opt = options(opt_);

  if (!opt.file)
    throw new TypeError('file is required');

  if (opt.gzip)
    throw new TypeError('cannot append to compressed archives');

  if (!files || !Array.isArray(files) || !files.length)
    throw new TypeError('no files or directories specified');

  files = Array.from(files);

  mtimeFilter(opt);
  return r(opt, files, cb)
}

export function mtimeFilter(opt) {
  const filter = opt.filter;

  if (!opt.mtimeCache)
    opt.mtimeCache = new Map();

  opt.filter = filter ? (path, stat) =>
    filter(path, stat) && !(opt.mtimeCache.get(path) > stat.mtime)
    : (path, stat) => !(opt.mtimeCache.get(path) > stat.mtime)
}
