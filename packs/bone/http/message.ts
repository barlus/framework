import {Buffer} from '../node/buffer';
import {HttpHeaders} from './headers';

export class HttpMessage {
    readonly headers?:HttpHeaders;
    readonly body?:AsyncIterable<Buffer>;
    public setHeaders(headers:HttpHeaders|object){
        Object.assign(this,{headers});
    }
    public setBody(body:AsyncIterable<Buffer>|string|Buffer){
        if(typeof body=='string'){
            body = Buffer.from(body);
        }
        if (Buffer.isBuffer(body)){
            body = generator([body])
        }
        Object.assign(this,{body});
    }
    protected constructor(headers:HttpHeaders=new HttpHeaders(), body?:AsyncIterable<Buffer>){
        this.setHeaders(headers);
        this.setBody(body);
    }
}

//todo move to utils
async function * generator<T>(elements:Iterable<T>){
    for(const value of elements){
        yield value;
    }
}