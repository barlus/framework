


import {parse,dirname,basename,join} from '@barlus/node/path';

import * as types from './types';
import * as large from './large-numbers';
import {Buffer} from '@barlus/node/buffer';

const TYPE = Symbol('type');

export class Header {
  
  cksumValid = false;
  needPax = false;
  nullBlock = false;
  block = null;
  path = null;
  mode = null;
  uid = null;
  gid = null;
  size = null;
  mtime = null;
  cksum = null;
  linkpath = null;
  uname = null;
  gname = null;
  devmaj = 0;
  devmin = 0;
  atime = null;
  ctime = null;

  constructor(data, off?) {
    this[TYPE] = '0';

    if (Buffer.isBuffer(data)) {
      this.decode(data, off || 0)
    } else if (data)
      this.set(data)
  }

  decode(buf, off) {
    if (!off)
      off = 0;

    if (!buf || !(buf.length >= off + 512))
      throw new Error('need 512 bytes for header');

    this.path = decString(buf, off, 100);
    this.mode = decNumber(buf, off + 100, 8);
    this.uid = decNumber(buf, off + 108, 8);
    this.gid = decNumber(buf, off + 116, 8);
    this.size = decNumber(buf, off + 124, 12);
    this.mtime = decDate(buf, off + 136, 12);
    this.cksum = decNumber(buf, off + 148, 12);

    // old tar versions marked dirs as a file with a trailing /
    this[TYPE] = decString(buf, off + 156, 1);
    if (this[TYPE] === '')
      this[TYPE] = '0';
    if (this[TYPE] === '0' && this.path.substr(-1) === '/')
      this[TYPE] = '5';

    // tar implementations sometimes incorrectly put the stat(dir).size
    // as the size in the tarball, even though Directory entries are
    // not able to have any body at all.  In the very rare chance that
    // it actually DOES have a body, we weren't going to do anything with
    // it anyway, and it'll just be a warning about an invalid header.
    if (this[TYPE] === '5')
      this.size = 0;

    this.linkpath = decString(buf, off + 157, 100);
    if (buf.slice(off + 257, off + 265).toString() === 'ustar\u000000') {
      this.uname = decString(buf, off + 265, 32);
      this.gname = decString(buf, off + 297, 32);
      this.devmaj = decNumber(buf, off + 329, 8);
      this.devmin = decNumber(buf, off + 337, 8);
      if (buf[off + 475] !== 0) {
        // definitely a prefix, definitely >130 chars.
        const prefix = decString(buf, off + 345, 155);
        this.path = prefix + '/' + this.path
      } else {
        const prefix = decString(buf, off + 345, 130);
        if (prefix)
          this.path = prefix + '/' + this.path;
        this.atime = decDate(buf, off + 476, 12);
        this.ctime = decDate(buf, off + 488, 12)
      }
    }

    let sum = 8 * 0x20;
    for (let i = off; i < off + 148; i++) {
      sum += buf[i]
    }
    for (let i = off + 156; i < off + 512; i++) {
      sum += buf[i]
    }
    this.cksumValid = sum === this.cksum;
    if (this.cksum === null && sum === 8 * 0x20)
      this.nullBlock = true
  }

  encode(buf?, off?) {
    if (!buf) {
      buf = this.block = Buffer.alloc(512);
      off = 0
    }

    if (!off)
      off = 0;

    if (!(buf.length >= off + 512))
      throw new Error('need 512 bytes for header');

    const prefixSize = this.ctime || this.atime ? 130 : 155;
    const split = splitPrefix(this.path || '', prefixSize);
    const path = split[0];
    const prefix = split[1];
    this.needPax = split[2];

    this.needPax = encString(buf, off, 100, path) || this.needPax;
    this.needPax = encNumber(buf, off + 100, 8, this.mode) || this.needPax;
    this.needPax = encNumber(buf, off + 108, 8, this.uid) || this.needPax;
    this.needPax = encNumber(buf, off + 116, 8, this.gid) || this.needPax;
    this.needPax = encNumber(buf, off + 124, 12, this.size) || this.needPax;
    this.needPax = encDate(buf, off + 136, 12, this.mtime) || this.needPax;
    buf[off + 156] = this[TYPE].charCodeAt(0);
    this.needPax = encString(buf, off + 157, 100, this.linkpath) || this.needPax;
    buf.write('ustar\u000000', off + 257, 8);
    this.needPax = encString(buf, off + 265, 32, this.uname) || this.needPax;
    this.needPax = encString(buf, off + 297, 32, this.gname) || this.needPax;
    this.needPax = encNumber(buf, off + 329, 8, this.devmaj) || this.needPax;
    this.needPax = encNumber(buf, off + 337, 8, this.devmin) || this.needPax;
    this.needPax = encString(buf, off + 345, prefixSize, prefix) || this.needPax;
    if (buf[off + 475] !== 0)
      this.needPax = encString(buf, off + 345, 155, prefix) || this.needPax;
    else {
      this.needPax = encString(buf, off + 345, 130, prefix) || this.needPax;
      this.needPax = encDate(buf, off + 476, 12, this.atime) || this.needPax;
      this.needPax = encDate(buf, off + 488, 12, this.ctime) || this.needPax
    }

    let sum = 8 * 0x20;
    for (let i = off; i < off + 148; i++) {
      sum += buf[i]
    }
    for (let i = off + 156; i < off + 512; i++) {
      sum += buf[i]
    }
    this.cksum = sum;
    encNumber(buf, off + 148, 8, this.cksum);
    this.cksumValid = true;

    return this.needPax
  }

  set(data) {
    for (let i in data) {
      if (data[i] !== null && data[i] !== undefined)
        this[i] = data[i]
    }
  }

  get type() {
    return types.name.get(this[TYPE]) || this[TYPE]
  }

  get typeKey() {
    return this[TYPE]
  }

  set type(type) {
    if (types.code.has(type))
      this[TYPE] = types.code.get(type);
    else
      this[TYPE] = type
  }
}

const splitPrefix = (p, prefixSize) => {
  const pathSize = 100;
  let pp = p;
  let prefix = '';
  let ret;
  const root = parse(p).root || '.';

  if (Buffer.byteLength(pp) < pathSize)
    ret = [pp, prefix, false];
  else {
    // first set prefix to the dir, and path to the base
    prefix = dirname(pp);
    pp = basename(pp);

    do {
      // both fit!
      if (Buffer.byteLength(pp) <= pathSize &&
        Buffer.byteLength(prefix) <= prefixSize)
        ret = [pp, prefix, false];

      // prefix fits in prefix, but path doesn't fit in path
      else if (Buffer.byteLength(pp) > pathSize &&
        Buffer.byteLength(prefix) <= prefixSize)
        ret = [pp.substr(0, pathSize - 1), prefix, true];

      else {
        // make path take a bit from prefix
        pp = join(basename(prefix), pp);
        prefix = dirname(prefix)
      }
    } while (prefix !== root && !ret);

    // at this point, found no resolution, just truncate
    if (!ret)
      ret = [p.substr(0, pathSize - 1), '', true]
  }
  return ret
};

const decString = (buf, off, size) =>
  buf.slice(off, off + size).toString('utf8').replace(/\0.*/, '');

const decDate = (buf, off, size) =>
  numToDate(decNumber(buf, off, size));

const numToDate = num => num === null ? null : new Date(num * 1000);

const decNumber = (buf, off, size) =>
  buf[off] & 0x80 ? large.parse(buf.slice(off, off + size))
    : decSmallNumber(buf, off, size);

const nanNull = value => isNaN(value) ? null : value;

const decSmallNumber = (buf, off, size) =>
  nanNull(parseInt(
    buf.slice(off, off + size)
      .toString('utf8').replace(/\0.*$/, '').trim(), 8));

// the maximum encodable as a null-terminated octal, by field size
const MAXNUM = {
  12: 0o77777777777,
  8: 0o7777777 };

const encNumber = (buf, off, size, number) =>
  number === null ? false :
    number > MAXNUM[size] || number < 0
      ? (large.encode(number, buf.slice(off, off + size)), true)
      : (encSmallNumber(buf, off, size, number), false);

const encSmallNumber = (buf, off, size, number) =>
  buf.write(octalString(number, size), off, size, 'ascii');

const octalString = (number, size) =>
  padOctal(Math.floor(number).toString(8), size);

const padOctal = (string, size) =>
  (string.length === size - 1 ? string
    : new Array(size - string.length - 1).join('0') + string + ' ') + '\0';

const encDate = (buf, off, size, date) =>
  date === null ? false :
    encNumber(buf, off, size, date.getTime() / 1000);

// enough to fill the longest string we've got
const NULLS = new Array(156).join('\0');
// pad with nulls, return true if it's longer or non-ascii
const encString = (buf, off, size, string) =>
  string === null ? false :
    (buf.write(string + NULLS, off, size, 'utf8'),
      string.length !== Buffer.byteLength(string) || string.length > size);

