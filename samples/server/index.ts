import { HttpApplication, Context, Handler } from "@barlus/bone/http";
import { process } from "@barlus/bone/node/process";
import { ProjectRoute } from "@barlus/bone/http/handlers/projects";
import { RouteHandler, Resource, route } from "@barlus/bone/http/handlers/router";

@route('/users')
export class MyApiRoute extends Resource {

    @route.get
    getUsers() {
        return [ {
            hello: 'World'
        } ]
    }

    @route.get('/:id')
    getUser(id: string) {
        return [ {
            id: id,
            hello: 'World'
        } ]
    }

}

class ApiRouter extends RouteHandler {
    constructor() {
        super({
            apiPath: '/api',
            resources: [
                MyApiRoute
            ]
        });
    }
    async handle(cnx: Context, next: () => Promise<any>) {
        return super.handle(cnx, next);
    }
}

class ScssHandler implements Handler {
    async handle(cnx: Context, next: () => Promise<any>) {
        const path = cnx.request.url.pathname;
        if (path.match(/^\/(.*)\.css$/)) {
            cnx.response.headers.set('Content-Type', 'text/css; charset=utf8');
            cnx.response.setBody('.myClass { color:red }');
        } else {
            return next();
        }
    }
}

class MyApplication extends HttpApplication {
    static instance: MyApplication;
    static async start() {
        if (!this.instance) {
            const app = new MyApplication();
            const { address, port } = await app.listen(10001, '0.0.0.0');
            console.info("Application started");
            console.info(` -> http://${address}:${port}`);
            this.instance = app;
        }
        return this.instance;
    }
    constructor() {
        super();
        this.use(new ScssHandler());
        this.use(new ApiRouter());
        this.use(new ProjectRoute({
            jsx: 'React.createElement',
            root: process.cwd(),
            project: '@vendor/client',//@vendor/todo
            ignore: [ 'typescript', '@barlus/bui', /*'@vendor/client'*/ ]
        }))
    }
}

MyApplication.start().catch(console.error);
