import '@barlus/std';

import {HttpRequest} from './request';
import {HttpResponse} from './response';

export class HttpClient {
    async send(request:HttpRequest):Promise<HttpResponse>{
        return;
    }
}