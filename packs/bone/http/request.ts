import {Buffer}         from '../node/buffer';
import {HttpUrl}        from './url';
import {HttpMessage}    from './message';
import {HttpHeaders}    from './headers';
import {Signal, signal} from "@barlus/runtime/decor";


export class HttpRequest extends HttpMessage {
  readonly url: HttpUrl;
  readonly method: string;
  @signal readonly onAbort: Signal<(e?) => void>;
  @signal readonly onClose: Signal<(e?) => void>;
  constructor(method: string, url: HttpUrl, headers?: HttpHeaders, body?: AsyncIterable<Buffer>) {
    super(headers, body);
    this.method = method;
    this.url = url;
  }
}