import {HttpServer} from './server';
import {HttpRequest} from './request';
import {Context} from './context';
import {ServerRequest, ServerResponse} from '../node/http';
import {HttpResponse} from './response';
import {HttpUrl} from './url';
import {HttpHeaders} from './headers';
import {AsyncStream} from '../node/stream';
import {HttpStatus} from "./contsants";

export interface Handler {
    handle(cnx: Context, next: () => Promise<any>): Promise<any>;
}

export interface Middleware {
    (cnx: Context, next: () => Promise<any>): Promise<any>;
}

export class HttpApplication extends HttpServer {
    protected handlers: Handler[] = [];
    protected handler: Middleware;
    public use(handler: Handler) {
        this.handlers.push(handler);
    }
    callback() {
        this.handler = compose(this.handlers.map(m => m.handle.bind(m)));
        return async (req: ServerRequest, res: ServerResponse) => {
            const url = HttpUrl.from(`http://${req.headers.host}${req.url}`);
            const headers = HttpHeaders.from(req.headers);
            const body = AsyncStream.from(req);
            const request = new HttpRequest(req.method, url, headers, body);
            const response = new HttpResponse();
            const context = new Context(request, response);
            try {
                await this.handler(context, null);
            }catch (e){
                response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR,"Internal Server Error");

            }
            if(!response.headers){
                response.setHeaders(new HttpHeaders());
            }
            if(!response.status){
                response.setStatus(HttpStatus.NOT_FOUND)
            }
            res.writeHead(
                response.status,
                response.message,
                response.headers.toJSON()
            );
            if (response.body) {
                await AsyncStream.write(response.body, res);
            } else {
                console.info("NO BODY?")
                res.end();
            }
        }
    }
}

/**
 * Chaining middleware list
 */
function compose(middleware: Middleware[]): Middleware {
    if (!Array.isArray(middleware)) {
        throw new TypeError('Middleware stack must be an array!');
    }
    for (const fn of middleware) {
        if (typeof fn !== 'function') {
            throw new TypeError('Middleware must be composed of functions!')
        }
    }
    /**
     * @param {Object} context
     * @return {Promise}
     * @api public
     */
    return async (context: Context, next: Middleware) => {
        // last called middleware #
        let index = -1;
        return dispatch(0);
        async function dispatch(i) {
            if (i <= index) {
                throw new Error('next() called multiple times');
            }
            index = i;
            let fn = middleware[i];
            if (i === middleware.length) {
                fn = next;
            }
            if (!fn) {
                return;
            }
            return fn(context, () => dispatch(i + 1))
        }
    }
}
