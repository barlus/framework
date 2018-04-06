import {pathToRegexp} from '../utils/path-to-regexp'
import {methods} from '../methods'

const debug = (...args)=>{};

export interface Router {
  get(path: string, handler: (...args) => Promise<any>): () => Promise<any>
  post(path: string, handler: (...args) => Promise<any>): () => Promise<any>
  put(path: string, handler: (...args) => Promise<any>): () => Promise<any>
  trace(path: string, handler: (...args) => Promise<any>): () => Promise<any>
  head(path: string, handler: (...args) => Promise<any>): () => Promise<any>
  delete(path: string, handler: (...args) => Promise<any>): () => Promise<any>
  options(path: string, handler: (...args) => Promise<any>): () => Promise<any>
}

export const router: Router = Object.create(null);

methods.forEach((method) => {
  router[method] = create(method);
});

//router.del = router.delete;
//router.all = create();

function create(method?: string) {
  if (method) {
    method = method.toUpperCase();
  }

  return function (path, fn, opts) {
    const re = pathToRegexp(path, opts);
    debug('%s %s -> %s', method || 'ALL', path, re);

    const createRoute = function (routeFunc) {
      return async (ctx, next) => {
        // method
        if (!matches(ctx, method)) {
          return next();
        }

        // path
        const m = re.exec(ctx.path);
        if (m) {
          const args = m.slice(1).map(decode);
          ctx.routePath = path;
          debug('%s %s matches %s %j', ctx.method, path, ctx.path, args);
          //args.unshift(ctx);
          args.push(next);
          return await routeFunc.apply(ctx, args);
        }
        // miss
        return next();
      }
    };

    if (fn) {
      return createRoute(fn);
    } else {
      return createRoute;
    }
  }
}

/**
 * Decode value.
 */

function decode(val) {
  if (val) {
    return decodeURIComponent(val);
  }
}

/**
 * Check request method.
 */
function matches(ctx, method) {
  if (!method) {
    return true;
  }
  if (ctx.method === method) {
    return true;
  }
  if (method === 'GET' && ctx.method === 'HEAD') {
    return true;
  }
  return false;
}
