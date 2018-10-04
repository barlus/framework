import {Buffer}       from '../node/buffer';
import {HttpRequest}  from './request';
import {HttpResponse} from './response';
import {HttpUrl}      from './url';


export class Context {
  readonly request: HttpRequest;
  readonly response: HttpResponse;
  readonly state: any;
  constructor(request: HttpRequest, response: HttpResponse) {
    this.request = request;
    this.response = response;
    Object.defineProperty(this, 'state', {
      value: Object.create(null)
    });
  }
  async form() {
    if (typeof this.state.form == 'undefined') {
      let body = await this.text();
      if (body !== null) {
        this.state.form = HttpUrl.query(body);
      } else {
        this.state.form = null;
      }
    }
    return this.state.form;
  }
  async json(reviver?:(key:string,value:any)=>any) {
    if (typeof this.state.json == 'undefined') {
      let body = await this.text();
      if (body !== null) {
        this.state.json = JSON.parse(body,reviver)
      } else {
        this.state.json = null;
      }
    }
    return this.state.json;
  }
  async body(): Promise<Buffer> {
    if (typeof this.state.body == 'undefined') {
      if (this.request.body) {
        const chunks: Buffer[] = [];
        for await(const chunk of this.request.body) {
          chunks.push(chunk);
        }
        this.state.body = chunks.length ? Buffer.concat(chunks) : null;
      } else {
        this.state.body = null;
      }
    }
    return this.state.body;
  }

  async text() {
    if (typeof this.state.text == 'undefined') {
      let body = await this.body();
      if (body !== null) {
        this.state.text = body.toString('utf8')
      } else {
        this.state.text = null;
      }
    }
    return this.state.text;
  }
}