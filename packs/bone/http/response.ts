import {Buffer} from '../node/buffer';
import {HttpStatus} from './contsants';
import {HttpHeaders} from './headers';
import {HttpMessage} from './message';

export class HttpResponse extends HttpMessage {
    readonly status: number;
    readonly message: string;
    public setStatus(status: number, message?: string) {
        message = message ? message : HttpStatus[status];
        Object.assign(this, {
            status, message
        });
    }
    constructor(status?: number, headers?:HttpHeaders,body?:AsyncIterable<Buffer>) {
        super(headers,body);
        this.setStatus(status);
    }
}
