import {resolve} from '@barlus/node/path';
// tar -c
import {options} from './high-level-opt';
import {Pack, PackSync} from './pack';
import {WriteStream, WriteStreamSync} from '../ext/minipass-fs';
//import t from './list';


export default function t(opt_, files?, cb?) {
  if (typeof files === 'function')
    cb = files;

  if (Array.isArray(opt_))
    files = opt_, opt_ = {};

  if (!files || !Array.isArray(files) || !files.length)
    throw new TypeError('no files or directories specified');

  files = Array.from(files);

  const opt = options(opt_);

  if (opt.sync && typeof cb === 'function')
    throw new TypeError('callback not supported for sync tar functions');

  if (!opt.file && typeof cb === 'function')
    throw new TypeError('callback only supported with file option');

  return opt.file && opt.sync ? createFileSync(opt, files)
    : opt.file ? createFile(opt, files, cb)
      : opt.sync ? createSync(opt, files)
        : create(opt, files)
}

export function createFileSync(opt, files) {
  const p = new PackSync(opt);
  const stream = new WriteStreamSync(opt.file, {
    mode: opt.mode || 0o666
  });
  p.pipe(stream);
  addFilesSync(p, files)
}

export function createFile(opt, files, cb) {
  const p = new Pack(opt);
  const stream = new WriteStream(opt.file, {
    mode: opt.mode || 0o666
  });
  p.pipe(stream);

  const promise = new Promise((res, rej) => {
    stream.on('error', rej);
    stream.on('close', res);
    p.on('error', rej)
  });

  addFilesAsync(p, files);

  return cb ? promise.then(cb, cb) : promise
}

export function addFilesSync(p, files) {
  files.forEach(file => {
    if (file.charAt(0) === '@')
      t({
        file: resolve(p.cwd, file.substr(1)),
        sync: true,
        noResume: true,
        onentry: entry => p.add(entry)
      });
    else
      p.add(file)
  });
  p.end()
}

export function addFilesAsync(p, files) {
  while (files.length) {
    const file = files.shift();
    if (file.charAt(0) === '@')
      return (t({
        file: resolve(p.cwd, file.substr(1)),
        noResume: true,
        onentry: entry => p.add(entry)
      }) as Promise<any>).then(_ => addFilesAsync(p, files));
    else
      p.add(file)
  }
  p.end()
}

export function createSync(opt, files) {
  const p = new PackSync(opt);
  addFilesSync(p, files);
  return p
}

export function create(opt, files) {
  const p = new Pack(opt);
  addFilesAsync(p, files);
  return p
}
