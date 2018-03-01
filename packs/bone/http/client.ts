import '@barlus/std';
import {Http} from '../node/http';
//import * as HTTPS from '../node/https';
import {AsyncStream} from '../node/stream';
import {HttpRequest} from './request';
import {HttpResponse} from './response';
import {HttpHeaders} from './headers';

export class HttpClient {
    async send(request: HttpRequest): Promise<HttpResponse> {
        //let transport = request.url.protocol == 'https:' ? Http.request : HTTP.request;
        let transport =  Http.request;
        let promised;
        let promise = new Promise<HttpResponse>((accept, reject) => {
            promised = {accept, reject};
        });
        const req = transport({
            method: request.method,
            protocol: request.url.protocol,
            hostname: request.url.hostname,
            port: request.url.port,
            pathname: request.url.pathname,
            headers: request.headers.toJSON(),
        }, (res) => {
            const response = new HttpResponse();
            response.setStatus(res.statusCode, res.statusMessage);
            response.setHeaders(HttpHeaders.from(res.headers));
            response.setBody(AsyncStream.from(res));
            promised.accept(response);
        });
        req.once('error', e => promised.reject(e));
        req.flushHeaders();
        if (request.body) {
            await AsyncStream.write(request.body, req)
        } else {
            req.end();
        }
        return await promise;
    }
}