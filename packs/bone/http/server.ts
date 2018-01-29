import '@barlus/std';

import {HttpRequest} from './request';
import {HttpResponse} from './response';

export class HttpServer {
    async handle(request:HttpRequest):Promise<HttpResponse>{
        return;
    }
}