
import {lookup} from './mime-types';
import {preferredLanguages} from "./language";
import {preferredMediaTypes} from "./mediaType";
import {preferredEncodings} from "./encoding";
import {preferredCharsets} from "./charset";


export class Negotiator {
  request: any;

  public constructor(request) {
    this.request = request;
  }

  public charset(available) {
    var set = this.charsets(available);
    return set && set[0];
  }
  public charsets(available) {
    return preferredCharsets(this.request.headers['accept-charset'], available);
  }
  public encoding(available) {
    var set = this.encodings(available);
    return set && set[0];
  }
  public encodings(available) {
    return preferredEncodings(this.request.headers['accept-encoding'], available);
  }
  public language(available) {
    var set = this.languages(available);
    return set && set[0];
  }
  public languages(available) {
    return preferredLanguages(this.request.headers['accept-language'], available);
  }
  public mediaType(available) {
    var set = this.mediaTypes(available);
    return set && set[0];
  }
  public mediaTypes(available) {
    return preferredMediaTypes(this.request.headers.accept, available);
  }
}

/**
 * Create a new Accepts object for the given req.
 *
 * @param {object} req
 * @public
 */
export class Accepts {

  /**
   * Convert extnames to mime.lookup
   *
   * @param {String} type
   * @return {String}
   * @private
   */
  static extToMime(type) {
    return type.indexOf('/') === -1
      ? lookup(type)
      : type;
  }

  /**
   * Check if mime is valid.
   *
   * @param {String} type
   * @return {String}
   * @private
   */
  static validMime(type) {
    return typeof type === 'string'
  }

  headers: any;
  negotiator: any;

  public constructor(req) {
    this.headers = req.headers;
    this.negotiator = new Negotiator(req)
  }

  /**
   * Check if the given `type(s)` is acceptable, returning
   * the best match when true, otherwise `undefined`, in which
   * case you should respond with 406 "Not Acceptable".
   *
   * The `type` value may be a single mime type string
   * such as "application/json", the extension name
   * such as "json" or an array `["json", "html", "text/plain"]`. When a list
   * or array is given the _best_ match, if any is returned.
   *
   * Examples:
   *
   *     // Accept: text/html
   *     this.types('html');
   *     // => "html"
   *
   *     // Accept: text/*, application/json
   *     this.types('html');
   *     // => "html"
   *     this.types('text/html');
   *     // => "text/html"
   *     this.types('json', 'text');
   *     // => "json"
   *     this.types('application/json');
   *     // => "application/json"
   *
   *     // Accept: text/*, application/json
   *     this.types('image/png');
   *     this.types('png');
   *     // => undefined
   *
   *     // Accept: text/*;q=.5, application/json
   *     this.types(['html', 'json']);
   *     this.types('html', 'json');
   *     // => "json"
   *
   * @param {String|Array} types...
   * @return {String|Array|Boolean}
   * @public
   */
  public types(...types: string[]) {
    // no types, return all requested types
    if (types.length === 0) {
      return this.negotiator.mediaTypes()
    }

    // no accept header, return first given type
    if (!this.headers.accept) {
      return types[0]
    }

    const mimes = types.map(Accepts.extToMime);
    const accepts = this.negotiator.mediaTypes(mimes.filter(Accepts.validMime));
    const first = accepts[0];

    return first ? types[mimes.indexOf(first)] : false;
  }

  /**
   * Return accepted encodings or best fit based on `encodings`.
   *
   * Given `Accept-Encoding: gzip, deflate`
   * an array sorted by quality is returned:
   *
   *     ['gzip', 'deflate']
   *
   * @param  encodings...
   * @return {String|Array}
   * @public
   */
  public encodings(...encodings: string[]) {
    // no encodings, return all requested encodings
    if (!encodings || encodings.length === 0) {
      return this.negotiator.encodings()
    }
    return this.negotiator.encodings(encodings)[0] || false
  }

  /**
   * Return accepted charsets or best fit based on `charsets`.
   *
   * Given `Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5`
   * an array sorted by quality is returned:
   *
   *     ['utf-8', 'utf-7', 'iso-8859-1']
   *
   * @param {String|Array} charsets...
   * @return {String|Array}
   * @public
   */
  public charsets(...charsets: string[]) {
    // no charsets, return all requested charsets
    if (charsets.length === 0) {
      return this.negotiator.charsets()
    }
    return this.negotiator.charsets(charsets)[0] || false;
  }

  /**
   * Return accepted languages or best fit based on `langs`.
   *
   * Given `Accept-Language: en;q=0.8, es, pt`
   * an array sorted by quality is returned:
   *
   *     ['es', 'pt', 'en']
   *
   * @param {String|Array} langs...
   * @return {Array|String}
   * @public
   */

  public languages(...languages: string[]) {
    // no languages, return all requested languages
    if (languages.length === 0) {
      return this.negotiator.languages()
    }

    return this.negotiator.languages(languages)[0] || false
  }
}


