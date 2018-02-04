import '@barlus/std';
import * as HTTP from '@barlus/node/http';
import * as HTTPS from '@barlus/node/https';
import {AsyncStream} from '@barlus/node/stream';
import {HttpRequest} from './request';
import {HttpResponse} from './response';
import {HttpHeaders} from './headers';

export class HttpClient {
    async send(request: HttpRequest): Promise<HttpResponse> {
        let transport = request.url.protocol == 'https:' ? HTTPS.request : HTTP.request;
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