import {defineMetadata, getOwnMetadata, metadata} from "@barlus/runtime/Reflect";
import {Pattern}                                  from "@barlus/runtime/pattern";
import {Handler}                                  from '../application';
import {Context}                                  from '../context';
import {Jwt}                                      from "../../utils/Jwt";
import {HttpStatus}                               from "../../http";


export type RouterHandlerOptions = {
  apiPath: string,
  resources: Class<Resource>[],
  secret?: string
}

export class Resource {
  context: Context;
}
interface Route {
  type: Class<Resource>;
  method: string;
  action: string;
  scopes: string[]
}
export class RouteHandler implements Handler {
  protected secret: string;
  public patterns: Pattern<Route>[];
  constructor(options: RouterHandlerOptions) {
    let apiPath = options.apiPath || "/";
    let resources = options.resources || [];
    this.patterns = [];
    this.secret = options.secret;
    resources.forEach(r => {
      const resourcePath = getOwnMetadata('path', r);
      const resourceScopes = getOwnMetadata('scopes', r);
      Object.getOwnPropertyNames(r.prototype).forEach(k => {
        if (k != 'constructor') {
          const methodPath = getOwnMetadata('path', r.prototype, k);
          const methodType = getOwnMetadata('method', r.prototype, k);
          const methodScopes = getOwnMetadata('scopes', r.prototype, k) || resourceScopes;
          const routePath = `${apiPath}${resourcePath}${methodPath}`.replace(/\/{2,}/m, '/');
          const routePattern = Pattern.regexp(routePath, {
            type: r,
            method: methodType,
            action: k,
            scopes: methodScopes
          } as Route);
          this.patterns.push(routePattern);
        }
      })
    })
  }
  async handle(cnx: Context, next: () => Promise<any>) {
    let sendUnauthorized = (options) => {
      cnx.response.setStatus(HttpStatus.UNAUTHORIZED);
      cnx.response.headers.set('Content-Type', 'application/json');
      cnx.response.setBody(JSON.stringify(options));
      return;
    };
    const request = cnx.request;
    const pathname = request.url.pathname;
    for (let pattern of this.patterns) {
      try {
        const route = pattern.meta;
        if (route.method == request.method) {
          let params = pattern.exec(pathname);
          if (params) {
            const handler = new route.type();
            let isProtected = route.scopes && route.scopes.length;
            if (isProtected) {
              if (!this.secret) {
                return sendUnauthorized({
                  secretMissing: true
                })
              }
              let token = cnx.request.headers.get("authorization") as string;
              if (!token) {
                return sendUnauthorized({
                  authHeaderMissing: true
                });
              }
              token = token.replace(/Bearer\s+/, '');
              let { payload } = Jwt.toJson(token);
              if (!payload) {
                cnx.response.setStatus(HttpStatus.UNAUTHORIZED);
                return sendUnauthorized({
                  payloadMissing: true
                });
              }
              let verify = Jwt.verify({
                token,
                secret: this.secret
              });
              if (!verify) {
                return sendUnauthorized(verify)
              }
              let hasAccess = route.scopes.reduce((p, c) => {
                return payload.scopes.indexOf(c) >= 0 && p
              }, true);
              if (!hasAccess) {
                cnx.response.setStatus(HttpStatus.FORBIDDEN);
                return
              }
            }
            handler.context = cnx;
            let result = await handler[ route.action ](...params.slice(1));
            if (!cnx.response.status) {
              cnx.response.setStatus(HttpStatus.OK);
            }
            if (typeof result == "boolean") {
              result = `${result}`
            }
            if (typeof result == 'string') {
              if (!cnx.response.headers.has('Content-Type')) {
                cnx.response.headers.set('Content-Type', 'text/plain');
              }
              cnx.response.setBody(result);
            } else if (typeof result == 'object' && result != null) {
              if (!cnx.response.headers.has('Content-Type')) {
                cnx.response.headers.set('Content-Type', 'text/plain');
              }
              if (result[ Symbol.asyncIterator ]) {
                cnx.response.setBody(result);
              } else {
                cnx.response.setBody(JSON.stringify(result));
              }

            }
            return;
          }
        }
      } catch (e) {
        if (!cnx.response.headers.has('Content-Type')) {
          cnx.response.headers.set('Content-Type', 'text/plain');
        }
        cnx.response.setBody(`${e.stack || e}`);
      }

    }
    return next();
  }
}
export type route = ClassDecorator & {
  scope(...scopes: string[]): ClassDecorator & MethodDecorator;
  (description: string): ClassDecorator;
  get: MethodDecorator & {
    (path: string): MethodDecorator;
  }
  put: MethodDecorator & {
    (path: string): MethodDecorator;
  }
  post: MethodDecorator & {
    (path: string): MethodDecorator;
  }
  detete: MethodDecorator & {
    (path: string): MethodDecorator;
  }
};
export const route: route = Object.assign<any, any>(routeDecorator, {
  scope(...scopes) {
    return (target: Function | string, key?: string) => {
      if (typeof target == "object" && key) {
        //console.info("Key",target,key,scopes)
        defineMetadata('scopes', scopes, target, key);
      }
      if (typeof target == "function" && !key) {
        //console.info("Class",target,key,scopes)
        defineMetadata('scopes', scopes, target);
      }
    }
  },
  get(target: Function | string, key?: string, desc?: PropertyDescriptor) {
    const method = 'GET';
    if (typeof target == 'object') {
      return routeDecoratorForMethod(method, '/')(target, key, desc)
    } else
    // if target is sting then path is provided
    if (typeof target == 'string') {
      return routeDecoratorForMethod(method, target)
    } else {
      throw new TypeError('Invalid argument for route decorator');
    }
  },
  put(target: Function | string, key?: string, desc?: PropertyDescriptor) {
    const method = 'PUT';
    if (typeof target == 'object') {
      return routeDecoratorForMethod(method, '/')(target, key, desc)
    } else
    // if target is sting then path is provided
    if (typeof target == 'string') {
      return routeDecoratorForMethod(method, target)
    } else {
      throw new TypeError('Invalid argument for route decorator');
    }
  },
  post(target: Function | string, key?: string, desc?: PropertyDescriptor) {
    const method = 'POST';
    if (typeof target == 'object') {
      return routeDecoratorForMethod(method, '/')(target, key, desc)
    } else
    // if target is sting then path is provided
    if (typeof target == 'string') {
      return routeDecoratorForMethod(method, target)
    } else {
      throw new TypeError('Invalid argument for route decorator');
    }
  },
  detete(target: Function | string, key?: string, desc?: PropertyDescriptor) {
    const method = 'DELETE';
    if (typeof target == 'object') {
      return routeDecoratorForMethod(method, '/')(target, key, desc)
    } else
    // if target is sting then path is provided
    if (typeof target == 'string') {
      return routeDecoratorForMethod(method, target)
    } else {
      throw new TypeError('Invalid argument for route decorator');
    }
  },
});
function routeDecorator(target: Function | string): any {
  function routeDecoratorForClass(path: string = '/') {
    return metadata('path', path)
  }
  if (typeof target == 'object') {
    return routeDecoratorForClass()(target)
  } else
  // if target is sting then path is provided
  if (typeof target == 'string') {
    return routeDecoratorForClass(target)
  } else {
    throw new TypeError('Invalid argument for route decorator');
  }
}
function routeDecoratorForMethod(method: string, path: string) {
  return (target, key, desc) => {
    defineMetadata('method', method, target, key);
    defineMetadata('path', path, target, key);
  }
}
