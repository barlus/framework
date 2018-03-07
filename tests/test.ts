import { HttpApplication, Context, HttpClient, Handler, HttpRequest, HttpResponse } from "@barlus/bone/http"
import { RouteHandler, Resource, route } from "@barlus/bone/http/handlers/router"
import { HttpStatus, HttpMethod, HttpHeaders } from '@barlus/bone/http';
import { Buffer } from '@barlus/bone/node/buffer';
import { randomBytes } from '@barlus/node/crypto';
import { HttpUrl } from '@barlus/bone/http/url';

@route('/users')
class MyResourceOne extends Resource {

    @route.get
    public get() {
        return {
            query: this.context.request
        };
    }
    @route.get('/:id(.+).xml')
    public async getUserXml(id: string) {
        this.context.response.headers.set('Content-Type', 'application/xml');
        return `<Voice>${id}</Voice>`;
    }
    @route.get('/:id')
    public async getUser(id: string) {
        return { user: { id }, query: this.context.request.url.query };
    }

    @route.post('/:id')
    public async postUser(id: string) {
        const body = await this.context.json();
        return { id, body };
    }
}

class MyFirstHandler implements Handler {
    async handle(cnx: Context, next: () => Promise<any>) {
        cnx.response.setStatus(HttpStatus.OK);
        cnx.response.setHeaders(new HttpHeaders());
        return next();
    }
}
class MySecondHandler implements Handler {
    async handle(cnx: Context, next: () => Promise<any>) {
        cnx.response.setBody(this.transform(cnx.request.body));
    }
    async * transform(body: AsyncIterable<Buffer>) {
        let length = 0;
        for await (const chunk of body) {
            length += chunk.byteLength;
            //console.info("TRANSFORMED",chunk.length);
            yield Buffer.from(chunk.toString('hex'));
        }
        //console.info("TRANSFORMED DONE",length);
    }
}
class MyApplication extends HttpApplication {
    constructor() {
        super();
        this.use(new RouteHandler({
            apiPath: '/api',
            resources: [ MyResourceOne ]
        }));
        this.use(new MyFirstHandler());
        this.use(new MySecondHandler());
    }
}
async function delay<T>(timeout = 200, value?: T) {
    return new Promise<T>(a => setTimeout(a, timeout, value));
}
async function* body(size = 10000, count = 10, timeout = 500) {
    for (let i = 0; i < count; i++) {
        yield delay(timeout, randomBytes(size));
    }

}
async function main() {
    const app = new MyApplication();
    await app.listen(10001, '0.0.0.0');
    const client = new HttpClient();
    const request = new HttpRequest(
        HttpMethod.POST,
        HttpUrl.from('http://127.0.0.1:10001'),
        new HttpHeaders(),
        body(1024, 20, 0)
    );
    const response = await client.send(request);
    let length = 0;
    for await(const chunk of response.body) {
        length += chunk.byteLength;
        //console.info("RECEIVED",chunk.length);
    }
    //console.info("RECEIVED DONE",length);
}
main().catch(console.error);