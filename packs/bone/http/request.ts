import {Chunk} from './chunk';

import {ReadableStream} from '../streams/readable';
import {WritableStream} from '../streams/writable';
import {TransformStream} from '../streams/transform';
import {Strategy} from '../streams/interfaces';

export class HttpRequest<T=Chunk>  {
    [Symbol.asyncIterator]:()=>AsyncIterableIterator<Chunk>;
    readonly url:string;
    readonly method:'GET'|'POST';
    readonly headers:any;
    readonly body:string|object|ReadableStream<Chunk>|AsyncIterableIterator<Chunk>|Chunk[]|Chunk;
}

const nums = new class Req extends HttpRequest {
    get url(){
        return  'https://gago.com'
    };
    get method():'POST'{
        return 'POST'
    }
    get headers (){
        return {
            'Content-Type':'application-something'
        }
    }
    get body(){
        return new Chunk()
    }
};
