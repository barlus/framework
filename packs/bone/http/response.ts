import {Buffer} from '../node/buffer';
import {HttpStatus} from './contsants';
import {HttpHeaders} from './headers';
import {HttpMessage} from './message';
import {Signal, signal} from "@barlus/runtime/decor";

export class HttpResponse extends HttpMessage {
    readonly status: number;
    readonly message: string;
    @signal readonly onFinish: Signal<(e?) => void>;
    @signal readonly onClose : Signal<(e?) => void>;
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
