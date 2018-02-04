import {HttpUrl} from './url';
import {HttpMessage} from './message';
import {Buffer} from './buffer';
import {HttpHeaders} from './headers';

export class HttpRequest extends HttpMessage {
    readonly url:HttpUrl;
    readonly method:string;
    constructor(method:string, url:HttpUrl, headers?:HttpHeaders, body?:AsyncIterable<Buffer>){
        super(headers,body);
        this.method = method;
        this.url = url;
    }
}