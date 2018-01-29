
import {Keygrip} from './utils/keygrip'

const cache = {};

/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */
const fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
/**
 * RegExp to match Same-Site cookie attribute value.
 */
const sameSiteRegExp = /^(?:lax|strict)$/i;

export interface CookieOptions {
  keys: any;
  secure: boolean;
}

export class Cookies {

  secure: any;
  request: any;
  response: any;
  keys: any;

  static connect(keys) {
    return function (req, res, next) {
      req.cookies =
        res.cookies =
          new Cookies(req, res, {
            keys: keys
          });
      next();
    }
  }

  public constructor(request, response, options) {
    this.secure = undefined;
    this.request = request;
    this.response = response;
    if (options) {
      this.keys = Array.isArray(options.keys) ? new Keygrip(options.keys) : options.keys;
      this.secure = options.secure;
    }
  }

  public get(name, opts?) {
    const sigName = name + ".sig"
    ;let header, match, value, remote, data, index
      , signed = opts && opts.signed !== undefined ? opts.signed : !!this.keys;

    header = this.request.headers["cookie"];
    if (!header) {
      return;
    }

    match = header.match(getPattern(name));
    if (!match) {
      return;
    }

    value = match[1];
    if (!opts || !signed) {
      return value;
    }

    remote = this.get(sigName);
    if (!remote) {
      return;
    }

    data = name + "=" + value;
    if (!this.keys) {
      throw new Error('.keys required for signed cookies');
    }
    index = this.keys.index(data, remote);

    if (index < 0) {
      this.set(sigName, null, {path: "/", signed: false})
    } else {
      index && this.set(sigName, this.keys.sign(data), {signed: false});
      return value
    }
  }

  public set(name, value, opts?) {
    const res = this.response, req = this.request;
    let headers = res.getHeader("Set-Cookie") || [];
    let secure = this.secure !== undefined ? !!this.secure : req.protocol === 'https' || req.connection.encrypted;
    const cookie = new Cookie(name, value, opts);
    let signed = opts && opts.signed !== undefined ? opts.signed : !!this.keys;

    if (typeof headers == "string") {
      headers = [headers];
    }

    if (!secure && opts && opts.secure) {
      throw new Error('Cannot send secure cookie over unencrypted connection')
    }

    cookie.secure = secure;
    if (opts && "secure" in opts) {
      cookie.secure = opts.secure;
    }


    headers = pushCookie(headers, cookie);

    if (opts && signed) {
      if (!this.keys) {
        throw new Error('.keys required for signed cookies');
      }
      cookie.value = this.keys.sign(cookie.toString());
      cookie.name += ".sig";
      headers = pushCookie(headers, cookie)
    }
    //
    // const setHeader = res.set ? OutgoingMessage.prototype.setHeader : res.setHeader;
    // setHeader.call(res, 'Set-Cookie', headers);
      res.setHeader('Set-Cookie',headers);
    return this
  }
}
export class Cookie {

  public name: string;
  public value: string;
  public path = "/";
  public expires = undefined;
  public domain = undefined;
  public httpOnly = false;
  public sameSite: string | boolean = false;
  public secure = false;
  public overwrite = false;
  public maxAge: number;

  constructor(name, value, attrs?) {
    if (!fieldContentRegExp.test(name)) {
      throw new TypeError('argument name is invalid');
    }

    if (value && !fieldContentRegExp.test(value)) {
      throw new TypeError('argument value is invalid');
    }

    value || (this.expires = new Date(0));

    this.name = name;
    this.value = value || "";

    for (let name in attrs) {
      this[name] = attrs[name]
    }

    if (this.path && !fieldContentRegExp.test(this.path)) {
      throw new TypeError('option path is invalid');
    }

    if (this.domain && !fieldContentRegExp.test(this.domain)) {
      throw new TypeError('option domain is invalid');
    }

    if (this.sameSite && this.sameSite !== true && !sameSiteRegExp.test(this.sameSite)) {
      throw new TypeError('option sameSite is invalid')
    }
  }

  public toString() {
    return this.name + "=" + this.value
  }

  public toHeader() {
    let header = this.toString();

    if (this.maxAge) {
      this.expires = new Date(Date.now() + this.maxAge);
    }

    if (this.path) {
      header += "; path=" + this.path;
    }
    if (this.expires) {
      header += "; expires=" + this.expires.toUTCString();
    }
    if (this.domain) {
      header += "; domain=" + this.domain;
    }
    if (this.sameSite) {
      header += "; samesite=" + (
        this.sameSite === true
          ? 'strict'
          : this.sameSite.toLowerCase()
      );
    }
    if (this.secure) {
      header += "; secure";
    }
    if (this.httpOnly) {
      header += "; httponly";
    }

    return header
  };

}


function getPattern(name) {
  if (cache[name]) {
    return cache[name];
  }

  return cache[name] = new RegExp(
    "(?:^|;) *" +
    name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") +
    "=([^;]*)"
  )
}

function pushCookie(cookies, cookie) {
  if (cookie.overwrite) {
    cookies = cookies.filter(function (c) {
      return c.indexOf(cookie.name + '=') !== 0
    })
  }
  cookies.push(cookie.toHeader());
  return cookies
}
