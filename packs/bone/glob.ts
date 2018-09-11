declare const require, process;

const fs = require('fs');
const path = require('path');

import {Minimatch} from './minimatch';


export {glob, Glob, GlobAll, Minimatch};

class File {
  stars = /((\/\*\*)?\/\*)?\.(\w+)$/;
  pattern;
  patternId;
  path;
  fileId;
  include;
  constructor(pattern1, patternId1, path1, fileId1) {
    this.pattern = pattern1;
    this.patternId = patternId1;
    this.path = path1;
    this.fileId = fileId1;
    this.include = true;
    while (this.pattern.charAt(0) === "!") {
      this.include = !this.include;
      this.pattern = this.pattern.substr(1);
    }
  }
  compare(other) {
    const p1 = this.pattern.replace(this.stars, "");
    const p2 = other.pattern.replace(this.stars, "");
    if (p1.length > p2.length) {
      return this;
    } else {
      return other;
    }
  }
  toString() {
    return this.path + " (" + this.patternId + ": " + this.fileId + ": " + this.pattern + ")";
  }
}
class Glob {
  static search(pattern, options = {}) {
    return new Glob(pattern, options).found;
  }
  noprocess: boolean;
  nomount: boolean;
  nodir: boolean;
  root: boolean;
  strict: boolean;
  silent: boolean;
  absolute: boolean;
  cache: boolean;
  follow: boolean;
  symlinks: boolean;
  maxLength: boolean;
  cwd: boolean;
  cwdAbs: boolean;
  realpath: boolean;
  dot: boolean;
  mark: boolean;
  stat: boolean;
  statCache: boolean;
  minimatch: Minimatch;
  found: string[];
  matches: any[];
  constructor(pattern, options = {}) {
    setopts(this, pattern, options);
    if (this.noprocess) {
      return this;
    }
    const n = this.minimatch.set.length;
    this.matches = new Array(n);
    for (let i = 0; i < n; i++) {
      this._process(this.minimatch.set[ i ], i, false)
    }
    this._finish()
  }
  _finish() {
    if (this.realpath) {
      const self = this;
      this.matches.forEach(function (matchset, index) {
        const set = self.matches[ index ] = Object.create(null);
        for (let p in matchset) {
          try {
            p = self._makeAbs(p);
            const real = fs.realpathSync(p);
            set[ real ] = true
          } catch (er) {
            if (er.syscall === 'stat') {
              set[ self._makeAbs(p) ] = true;
            } else {
              throw er
            }
          }
        }
      })
    }
    finish(this);
  }
  _process(pattern, index, inGlobStar) {
    // Get the first [n] parts of pattern that are all strings.
    let n = 0;
    while (typeof pattern[ n ] === 'string') {
      n++
    }
    // now n is the index of the first one that is *not* a string.

    // See if there's anything else
    let prefix;
    switch (n) {
      // if not, then this is rather simple
      case pattern.length:
        this._processSimple(pattern.join('/'), index);
        return;

      case 0:
        // pattern *starts* with some non-trivial item.
        // going to readdir(cwd), but not include the prefix in matches.
        prefix = null;
        break;

      default:
        // pattern has some string bits in the front.
        // whatever it starts with, whether that's 'absolute' like /foo/bar,
        // or 'relative' like '../baz'
        prefix = pattern.slice(0, n).join('/');
        break
    }

    const remain = pattern.slice(n);

    // get the list of entries.
    let read;
    if (prefix === null) {
      read = '.';
    } else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
      if (!prefix || !isAbsolute(prefix)) {
        prefix = '/' + prefix;
      }
      read = prefix
    } else {
      read = prefix;
    }

    const abs = this._makeAbs(read);

    //if ignored, skip processing
    if (childrenIgnored(this, read)) {
      return;
    }

    const isGlobStar = remain[ 0 ] === Minimatch.GLOBSTAR;
    if (isGlobStar) {
      this._processGlobStar(prefix, read, abs, remain, index, inGlobStar);
    } else {
      this._processReaddir(prefix, read, abs, remain, index, inGlobStar)
    }
  }
  _processReaddir(prefix, read, abs, remain, index, inGlobStar) {
    let entries = this._readdir(abs, inGlobStar);

    // if the abs isn't a dir, then nothing can match!
    if (!entries) {
      return;
    }

    // It will only match dot entries if it starts with a dot, or if
    // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
    const pn = remain[ 0 ];
    const negate = !!this.minimatch.negate;
    const rawGlob = pn._glob;
    const dotOk = this.dot || rawGlob.charAt(0) === '.';

    const matchedEntries = [];
    for (var i = 0; i < entries.length; i++) {
      var e = entries[ i ];
      if (e.charAt(0) !== '.' || dotOk) {
        let m;
        if (negate && !prefix) {
          m = !e.match(pn)
        } else {
          m = e.match(pn)
        }
        if (m) {
          matchedEntries.push(e)
        }
      }
    }

    const len = matchedEntries.length;
    // If there are no matched entries, then nothing matches.
    if (len === 0) {
      return;
    }

    // if this is the last remaining pattern bit, then no need for
    // an additional stat *unless* the user has specified mark or
    // stat explicitly.  We know they exist, since readdir returned
    // them.

    if (remain.length === 1 && !this.mark && !this.stat) {
      if (!this.matches[ index ]) {
        this.matches[ index ] = Object.create(null);
      }

      for (var i = 0; i < len; i++) {
        var e = matchedEntries[ i ];
        if (prefix) {
          if (prefix.slice(-1) !== '/') {
            e = prefix + '/' + e;
          } else {
            e = prefix + e
          }
        }

        if (e.charAt(0) === '/' && !this.nomount) {
          e = path.join(this.root, e)
        }
        this._emitMatch(index, e)
      }
      // This was the last one, and no stats were needed
      return
    }

    // now test all matched entries as stand-ins for that part
    // of the pattern.
    remain.shift();
    for (var i = 0; i < len; i++) {
      var e = matchedEntries[ i ];
      let newPattern;
      if (prefix) {
        newPattern = [ prefix, e ];
      } else {
        newPattern = [ e ];
      }
      this._process(newPattern.concat(remain), index, inGlobStar)
    }
  }
  _emitMatch(index, e) {
    if (isIgnored(this, e)) {
      return;
    }

    const abs = this._makeAbs(e);

    if (this.mark) {
      e = this._mark(e);
    }

    if (this.absolute) {
      e = abs
    }

    if (this.matches[ index ][ e ]) {
      return;
    }

    if (this.nodir) {
      const c = this.cache[ abs ];
      if (c === 'DIR' || Array.isArray(c)) {
        return
      }
    }

    this.matches[ index ][ e ] = true;

    if (this.stat) {
      this._stat(e)
    }
  }
  _readdirInGlobStar(abs) {
    // follow all symlinked directories forever
    // just proceed as if this is a non-globstar situation
    if (this.follow) {
      return this._readdir(abs, false);
    }

    let entries;
    let lstat;
    let stat;
    try {
      lstat = fs.lstatSync(abs)
    } catch (er) {
      if (er.code === 'ENOENT') {
        // lstat failed, doesn't exist
        return null
      }
    }

    let isSym = lstat && lstat.isSymbolicLink();
    this.symlinks[ abs ] = isSym;

    // If it's not a symlink or a dir, then it's definitely a regular file.
    // don't bother doing a readdir in that case.
    if (!isSym && lstat && !lstat.isDirectory()) {
      this.cache[ abs ] = 'FILE';
    } else {
      entries = this._readdir(abs, false);
    }

    return entries
  }
  _readdir(abs, inGlobStar) {
    let entries;

    if (inGlobStar && !ownProp(this.symlinks, abs)) {
      return this._readdirInGlobStar(abs);
    }

    if (ownProp(this.cache, abs)) {
      let c = this.cache[ abs ];
      if (!c || c === 'FILE') {
        return null;
      }

      if (Array.isArray(c)) {
        return c
      }
    }

    try {
      return this._readdirEntries(abs, fs.readdirSync(abs))
    } catch (er) {
      this._readdirError(abs, er);
      return null
    }
  }
  _readdirEntries(abs, entries) {
    // if we haven't asked to stat everything, then just
    // assume that everything in there exists, so we can avoid
    // having to stat it a second time.
    if (!this.mark && !this.stat) {
      for (let i = 0; i < entries.length; i++) {
        let e = entries[ i ];
        if (abs === '/') {
          e = abs + e;
        } else {
          e = abs + '/' + e;
        }
        this.cache[ e ] = true
      }
    }

    this.cache[ abs ] = entries;

    // mark and cache dir-ness
    return entries
  }
  _readdirError(f, er) {
    // handle errors, and cache the information
    switch (er.code) {
      case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
      case 'ENOTDIR': // totally normal. means it *does* exist.
        const abs = this._makeAbs(f);
        this.cache[ abs ] = 'FILE';
        if (abs === this.cwdAbs) {
          const error: any = new Error(er.code + ' invalid cwd ' + this.cwd);
          error.path = this.cwd;
          error.code = er.code;
          throw error
        }
        break;

      case 'ENOENT': // not terribly unusual
      case 'ELOOP':
      case 'ENAMETOOLONG':
      case 'UNKNOWN':
        this.cache[ this._makeAbs(f) ] = false;
        break;

      default: // some unusual error.  Treat as failure.
        this.cache[ this._makeAbs(f) ] = false;
        if (this.strict) {
          throw er;
        }
        if (!this.silent) {
          console.error('glob error', er);
        }
        break
    }
  }
  _processGlobStar(prefix, read, abs, remain, index, inGlobStar) {
    let entries = this._readdir(abs, inGlobStar);
    // no entries means not a dir, so it can never have matches
    // foo.txt/** doesn't match foo.txt
    if (!entries) {
      return;
    }

    // test without the globstar, and with every child both below
    // and replacing the globstar.
    const remainWithoutGlobStar = remain.slice(1);
    const gspref = prefix ? [ prefix ] : [];
    const noGlobStar = gspref.concat(remainWithoutGlobStar);

    // the noGlobStar pattern exits the inGlobStar state
    this._process(noGlobStar, index, false);

    const len = entries.length;
    const isSym = this.symlinks[ abs ];

    // If it's a symlink, and we're in a globstar, then stop
    if (isSym && inGlobStar) {
      return;
    }

    for (let i = 0; i < len; i++) {
      const e = entries[ i ];
      if (e.charAt(0) === '.' && !this.dot) {
        continue;
      }

      // these two cases enter the inGlobStar state
      const instead = gspref.concat(entries[ i ], remainWithoutGlobStar);
      this._process(instead, index, true);

      const below = gspref.concat(entries[ i ], remain);
      this._process(below, index, true)
    }
  }
  _processSimple(prefix, index) {
    // XXX review this.  Shouldn't it be doing the mounting etc
    // before doing stat?  kinda weird?
    let exists = this._stat(prefix);

    if (!this.matches[ index ]) {
      this.matches[ index ] = Object.create(null);
    }

    // If it doesn't exist, then just mark the lack of results
    if (!exists) {
      return;
    }

    if (prefix && isAbsolute(prefix) && !this.nomount) {
      const trail = /[\/\\]$/.test(prefix);
      if (prefix.charAt(0) === '/') {
        prefix = path.join(this.root, prefix)
      } else {
        prefix = path.resolve(this.root, prefix);
        if (trail) {
          prefix += '/'
        }
      }
    }

    if (process.platform === 'win32') {
      prefix = prefix.replace(/\\/g, '/');
    }

    // Mark this as a match
    this._emitMatch(index, prefix)
  }
  _stat(f) {
    const abs = this._makeAbs(f);
    let needDir = f.slice(-1) === '/';

    if (f.length > this.maxLength) {
      return false;
    }
    if (!this.stat && ownProp(this.cache, abs)) {
      let c = this.cache[ abs ];
      if (Array.isArray(c)) {
        c = 'DIR';
      }
      // It exists, but maybe not how we need it
      if (!needDir || c === 'DIR') {
        return c;
      }
      if (needDir && c === 'FILE') {
        return false
      }
      // otherwise we have to stat, because maybe c=true
      // if we know it exists, but not what it is.
    }

    let exists;
    let stat = this.statCache[ abs ];
    if (!stat) {
      let lstat;
      try {
        lstat = fs.lstatSync(abs)
      } catch (er) {
        if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
          this.statCache[ abs ] = false;
          return false
        }
      }

      if (lstat && lstat.isSymbolicLink()) {
        try {
          stat = fs.statSync(abs)
        } catch (er) {
          stat = lstat
        }
      } else {
        stat = lstat
      }
    }

    this.statCache[ abs ] = stat;

    let c: any = true;
    if (stat) {
      c = stat.isDirectory() ? 'DIR' : 'FILE';
    }

    this.cache[ abs ] = this.cache[ abs ] || c;

    if (needDir && c === 'FILE') {
      return false;
    }
    return c;
  }
  _mark(p) {
    return mark(this, p)
  }
  _makeAbs(f) {
    return makeAbs(this, f)
  }
}
// cleanup and convert to normal file system
class GlobAll {
  static search(patterns: string[], opts = {}) {
    return new GlobAll(patterns, opts).run();
  }
  patterns: string[];
  statCache: any;
  opts: any;
  set: any;
  results: any;
  globs: any;
  constructor(patterns: string | string[], opts: any = {}) {
    // init array
    if (typeof patterns === "string") {
      patterns = [ patterns ];
    }
    // use copy of array
    this.patterns = patterns.slice();
    // all globs share the same stat cache
    this.statCache = opts.statCache = opts.statCache || {};
    this.opts = opts;
    this.set = {};
    this.results = null;
    this.globs = [];
  }
  run() {
    this.globNext();
    return this.results;
  }
  globNext() {
    let g, pattern, include = true;
    if (this.patterns.length === 0) {
      return this.globbedAll();
    }
    pattern = this.patterns[ 0 ]; // peek!
    // check whether this is an exclude pattern and
    // strip the leading ! if it is
    if (pattern.charAt(0) === "!") {
      include = false;
      pattern = pattern.substr(1);
    }
    // sync - callback straight away
    g = new Glob(pattern, this.opts);
    this.globs.push(g);
    this.globbedOne(include, g.found);
  }
  globbedOne(include, files) {
    const patternId = this.patterns.length;
    const pattern = this.patterns.shift();
    // insert each into the results set
    for (let fileId = 0; fileId < files.length; fileId++) {
      // convert to file instance
      const path = files[ fileId ];
      const f = new File(pattern, patternId, path, fileId);
      let existing = this.set[ path ];
      // new item
      if (!existing) {
        if (include) {
          this.set[ path ] = f;
        }
        continue;
      }
      // compare or delete
      if (include) {
        this.set[ path ] = f.compare(existing);
      } else {
        delete this.set[ path ];
      }
    }
    // run next
    this.globNext();
  }
  globbedAll() {
    // map result set into an array
    const files = [];
    for (let k in this.set) {
      files.push(this.set[ k ]);
    }
    // sort files by index
    files.sort(function (a, b) {
      if (a.patternId < b.patternId) {
        return 1;
      }
      if (a.patternId > b.patternId) {
        return -1;
      }
      if (a.fileId >= b.fileId) {
        return 1;
      } else {
        return -1;
      }
    });
    // finally, convert back into a path string
    this.results = files.map(function (f) {
      return f.path;
    });
    return this.results;
  }
}
function glob(patterns: string[], options?: any): string[] {
  return GlobAll.search(patterns, options);
}
// commons
function isAbsolute(path) {
  return path.charAt(0) === '/';
}

function mark(self, p) {
  const abs = makeAbs(self, p);
  const c = self.cache[ abs ];
  let m = p;
  if (c) {
    let isDir = c === 'DIR' || Array.isArray(c);
    let slash = p.slice(-1) === '/';

    if (isDir && !slash) {
      m += '/'
    } else if (!isDir && slash) {
      m = m.slice(0, -1)
    }

    if (m !== p) {
      const mabs = makeAbs(self, m);
      self.statCache[ mabs ] = self.statCache[ abs ]
      self.cache[ mabs ] = self.cache[ abs ]
    }
  }

  return m
}
function makeAbs(self, f) {
  let abs = f;
  if (f.charAt(0) === '/') {
    abs = path.join(self.root, f)
  } else if (isAbsolute(f) || f === '') {
    abs = f
  } else if (self.changedCwd) {
    abs = path.resolve(self.cwd, f)
  } else {
    abs = path.resolve(f)
  }

  if (process.platform === 'win32') {
    abs = abs.replace(/\\/g, '/')
  }

  return abs
}

function finish(self) {
  let nou = self.nounique;
  let all = nou ? [] : Object.create(null);

  for (let i = 0, l = self.matches.length; i < l; i++) {
    let matches = self.matches[ i ];
    if (!matches || Object.keys(matches).length === 0) {
      if (self.nonull) {
        // do like the shell, and spit out the literal glob
        const literal = self.minimatch.globSet[ i ];
        if (nou) {
          all.push(literal)
        } else {
          all[ literal ] = true
        }
      }
    } else {
      // had matches
      let m = Object.keys(matches)
      if (nou) {
        all.push.apply(all, m)
      } else {
        m.forEach(function (m) {
          all[ m ] = true
        })
      }
    }
  }

  if (!nou) {
    all = Object.keys(all)
  }

  if (!self.nosort) {
    all = all.sort(self.nocase ? alphaSortI : alphaSort)
  }

  // at *some* point we statted all of these
  if (self.mark) {
    for (var i = 0; i < all.length; i++) {
      all[ i ] = self._mark(all[ i ])
    }
    if (self.nodir) {
      all = all.filter(function (e) {
        let notDir = !(/\/$/.test(e));
        const c = self.cache[ e ] || self.cache[ makeAbs(self, e) ];
        if (notDir && c) {
          notDir = c !== 'DIR' && !Array.isArray(c)
        }
        return notDir
      })
    }
  }

  if (self.ignore.length) {
    all = all.filter(function (m) {
      return !isIgnored(self, m)
    })
  }

  self.found = all
}

function childrenIgnored(self, path) {
  if (!self.ignore.length) {
    return false;
  }
  return self.ignore.some((item) => !!(
    item.gmatcher && item.gmatcher.match(path)
  ));
}
function setopts(self, pattern, options: any = {}) {
  // base-matching: just use globstar for that.
  if (options.matchBase && -1 === pattern.indexOf("/")) {
    if (options.noglobstar) {
      throw new Error("base matching requires globstar")
    }
    pattern = "**/" + pattern
  }

  self.silent = !!options.silent;
  self.pattern = pattern;
  self.strict = options.strict !== false;
  self.realpath = !!options.realpath;
  self.realpathCache = options.realpathCache || Object.create(null);
  self.follow = !!options.follow;
  self.dot = !!options.dot;
  self.mark = !!options.mark;
  self.nodir = !!options.nodir;
  if (self.nodir) {
    self.mark = true
  }
  self.sync = !!options.sync;
  self.nounique = !!options.nounique;
  self.nonull = !!options.nonull;
  self.nosort = !!options.nosort;
  self.nocase = !!options.nocase;
  self.stat = !!options.stat;
  self.noprocess = !!options.noprocess;
  self.absolute = !!options.absolute;

  self.maxLength = options.maxLength || Infinity
  self.cache = options.cache || Object.create(null)
  self.statCache = options.statCache || Object.create(null)
  self.symlinks = options.symlinks || Object.create(null)

  setupIgnores(self, options);

  self.changedCwd = false;
  const cwd = process.cwd();
  if (!ownProp(options, "cwd")) {
    self.cwd = cwd
  }
  else {
    self.cwd = path.resolve(options.cwd);
    self.changedCwd = self.cwd !== cwd;
  }

  self.root = options.root || path.resolve(self.cwd, "/")
  self.root = path.resolve(self.root)
  if (process.platform === "win32") {
    self.root = self.root.replace(/\\/g, "/")
  }

  // TODO: is an absolute `cwd` supposed to be resolved against `root`?
  // e.g. { cwd: '/test', root: __dirname } === path.join(__dirname, '/test')
  self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd)
  if (process.platform === "win32") {
    self.cwdAbs = self.cwdAbs.replace(/\\/g, "/")
  }
  self.nomount = !!options.nomount;

  // disable comments and negation in Minimatch.
  // Note that they are not supported in Glob itself anyway.
  options.nonegate = true;
  options.nocomment = true;

  self.minimatch = new Minimatch(pattern, options)
  self.options = self.minimatch.options
}

function ownProp(obj, field) {
  return Object.prototype.hasOwnProperty.call(obj, field)
}
function isIgnored(self, path) {
  if (!self.ignore.length) {
    return false;
  }
  return self.ignore.some((item) => {
    return item.matcher.match(path) || !!(
      item.gmatcher && item.gmatcher.match(path)
    )
  })
}
function alphaSortI(a: string, b: string): number {
  return a.toLowerCase().localeCompare(b.toLowerCase())
}
function alphaSort(a, b) {
  return a.localeCompare(b)
}
function setupIgnores(self, options) {
  self.ignore = options.ignore || [];
  if (!Array.isArray(self.ignore)) {
    self.ignore = [ self.ignore ];
  }
  if (self.ignore.length) {
    self.ignore = self.ignore.map(ignoreMap)
  }
}
// ignore patterns are always in dot:true mode.
function ignoreMap(pattern) {
  let gmatcher = null;
  if (pattern.slice(-3) === '/**') {
    const gpattern = pattern.replace(/(\/\*\*)+$/, '');
    gmatcher = new Minimatch(gpattern, { dot: true })
  }

  return {
    matcher: new Minimatch(pattern, { dot: true }),
    gmatcher: gmatcher
  }
}