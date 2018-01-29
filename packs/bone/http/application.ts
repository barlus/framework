import {HttpServer} from './server';
import {HttpRequest} from './request';
import {Context} from '../../http/server/context';

export interface Middleware {
    (cnx: Context, next:()=>Promise<any>): Promise<any>;
}
class Application extends HttpServer {
    protected middlewares: Middleware[];
    public use(middleware: Middleware) {
        this.middlewares.push(middleware);
    }
    async handle(request: HttpRequest) {
        compose(this.middlewares);
        return null;
    }
}

/**
 * Chaining middleware list
 */
function compose(middleware:Middleware[]) {
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
    return async (context:Context, next:Middleware) => {
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
            return await fn(context, async () => {
                return dispatch(i + 1)
            })
        }
    }
}
