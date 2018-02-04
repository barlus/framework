import {Buffer} from './buffer';
import {HttpHeaders} from './headers';

export class HttpMessage {
    readonly headers?:HttpHeaders;
    readonly body?:AsyncIterable<Buffer>;
    public setHeaders(headers:HttpHeaders|object){
        Object.assign(this,{headers});
    }
    public setBody(body:AsyncIterable<Buffer>|string|Buffer){
        Object.assign(this,{body});
    }
    protected constructor(headers:HttpHeaders=new HttpHeaders(), body?:AsyncIterable<Buffer>){
        this.setHeaders(headers);
        this.setBody(body);
    }
}