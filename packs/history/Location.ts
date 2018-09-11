export type LocationKey = string;
export type LocationState = any;
export type Path = string;
export type Href = string;
export type Pathname = string;
export type Search = string;
export type Hash = string;
export interface LocationDescriptorObject {
  pathname?: Pathname;
  search?: Search;
  state?: LocationState;
  hash?: Hash;
  key?: LocationKey;
}
export class Location implements LocationDescriptorObject {
  public pathname: Pathname;
  public search: Search;
  public state: LocationState;
  public hash: Hash;
  public key?: LocationKey;

  constructor(path, state?, key?, currentLocation?) {
    if (typeof path === "string") {
      // Two-arg form: push(path, state)
      this.parsePath(path);
      this.state = state;
    } else {
      // One-arg form: push(location)
      Object.assign(this, path);
      location = { ...path };

      if (this.pathname === undefined) {
        this.pathname = "";
      }

      if (this.search) {
        if (this.search.charAt(0) !== "?") {
          this.search = "?" + this.search;
        }
      } else {
        this.search = "";
      }

      if (this.hash) {
        if (this.hash.charAt(0) !== "#") {
          this.hash = "#" + this.hash;
        }
      } else {
        location.hash = "";
      }

      if (state !== undefined && this.state === undefined) {
        this.state = state;
      }
    }

    try {
      this.pathname = decodeURI(this.pathname);
    } catch (e) {
      if (e instanceof URIError) {
        throw new URIError(
          'Pathname "' +
          this.pathname +
          '" could not be decoded. ' +
          "This is likely caused by an invalid percent-encoding."
        );
      } else {
        throw e;
      }
    }

    if (key) {
      this.key = key;
    }

    if (currentLocation) {
      // Resolve incomplete/relative pathname relative to current location.
      if (!this.pathname) {
        this.pathname = currentLocation.pathname;
      } else if (this.pathname.charAt(0) !== "/") {
        this.pathname = Location.resolvePathname(
          this.pathname,
          currentLocation.pathname
        );
      }
    } else {
      // When there is no prior location and pathname is empty, set it to /
      if (!this.pathname) {
        this.pathname = "/";
      }
    }
  }

  private parsePath(path: string): void {
    let pathname = path || "/";
    let search = "";
    let hash = "";

    const hashIndex = pathname.indexOf("#");
    if (hashIndex !== -1) {
      hash = pathname.substr(hashIndex);
      pathname = pathname.substr(0, hashIndex);
    }

    const searchIndex = pathname.indexOf("?");
    if (searchIndex !== -1) {
      search = pathname.substr(searchIndex);
      pathname = pathname.substr(0, searchIndex);
    }
    this.pathname = pathname;
    this.search = search === "?" ? "" : search;
    this.hash = hash === "#" ? "" : hash;
  }

  static isAbsolute(pathname: string): boolean {
    return pathname.charAt(0) === '/'
  }

  static spliceOne(list: any[], index: number) {
    for (let i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
      list[ i ] = list[ k ]
    }
    list.pop()
  }

  static resolvePathname(to: string, from: string = '') {
    const toParts = to && to.split('/') || [];
    let fromParts = from && from.split('/') || [];

    const isToAbs = to && Location.isAbsolute(to);
    const isFromAbs = from && Location.isAbsolute(from);
    const mustEndAbs = isToAbs || isFromAbs;

    if (to && Location.isAbsolute(to)) {
      // to is absolute
      fromParts = toParts
    } else if (toParts.length) {
      // to is relative, drop the filename
      fromParts.pop();
      fromParts = fromParts.concat(toParts)
    }

    if (!fromParts.length) {
      return '/';
    }

    let hasTrailingSlash;
    if (fromParts.length) {
      const last = fromParts[ fromParts.length - 1 ];
      hasTrailingSlash = (last === '.' || last === '..' || last === '')
    } else {
      hasTrailingSlash = false
    }

    let up = 0;
    for (let i = fromParts.length; i >= 0; i--) {
      const part = fromParts[ i ];

      if (part === '.') {
        Location.spliceOne(fromParts, i)
      } else if (part === '..') {
        Location.spliceOne(fromParts, i);
        up++
      } else if (up) {
        Location.spliceOne(fromParts, i);
        up--
      }
    }

    if (!mustEndAbs) {
      for (; up--; up) {
        fromParts.unshift('..')
      }
    }

    if (mustEndAbs && fromParts[ 0 ] !== '' && (!fromParts[ 0 ] || !Location.isAbsolute(fromParts[ 0 ]))) {
      fromParts.unshift('');
    }

    let result = fromParts.join('/');

    if (hasTrailingSlash && result.substr(-1) !== '/') {
      result += '/';
    }

    return result
  }

  static areEqual(a: LocationDescriptorObject, b: LocationDescriptorObject): boolean {
    return a.pathname === b.pathname &&
      a.search === b.search &&
      a.hash === b.hash &&
      a.key === b.key &&
      Location.valueEqual(a.state, b.state);
  }

  static valueEqual(a: any, b: any) {
    if (a === b) {
      return true;
    }

    if (a == null || b == null) {
      return false;
    }

    if (Array.isArray(a)) {
      return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
        return Location.valueEqual(item, b[ index ])
      })
    }

    const aType = typeof a;
    const bType = typeof b;

    if (aType !== bType) {
      return false;
    }

    if (aType === 'object') {
      const aValue = a.valueOf();
      const bValue = b.valueOf();

      if (aValue !== a || bValue !== b) {
        return Location.valueEqual(aValue, bValue);
      }

      const aKeys = Object.keys(a);
      const bKeys = Object.keys(b);

      if (aKeys.length !== bKeys.length) {
        return false;
      }

      return aKeys.every(function (key) {
        return Location.valueEqual(a[ key ], b[ key ])
      })
    }

    return false
  }

  static createPath(location: LocationDescriptorObject): string {
    const { pathname, search, hash } = location;

    let path = pathname || "/";

    if (search && search !== "?") {
      path += search.charAt(0) === "?" ? search : `?${search}`;
    }

    if (hash && hash !== "#") {
      path += hash.charAt(0) === "#" ? hash : `#${hash}`;
    }

    return path;
  }

  static addLeadingSlash(path: string): string {
    return path.charAt(0) === "/" ? path : "/" + path;
  }

  static stripLeadingSlash(path: string): string {
    return path.charAt(0) === "/" ? path.substr(1) : path;
  }

  static hasBasename(path: string, prefix: string): boolean {
    return new RegExp("^" + prefix + "(\\/|\\?|#|$)", "i").test(path);
  }

  static stripBasename(path: string, prefix: string): string {
    return Location.hasBasename(path, prefix) ? path.substr(prefix.length) : path;
  }

  static stripTrailingSlash(path: string): string {
    return path.charAt(path.length - 1) === "/" ? path.slice(0, -1) : path;
  }
}