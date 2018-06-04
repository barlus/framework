import { HttpApplication, Handler, Context, HttpStatus,HttpHeaders} from '@barlus/bone/http'
import { Buffer } from '@barlus/bone/node/buffer';
import { process } from '@barlus/bone/node/process';


class MyHandler implements Handler {
    async * response(message:string) {
        yield Buffer.from(message)
    }
    async handle(cnx: Context, next: () => Promise<any>): Promise<any> {
        cnx.response.setStatus(HttpStatus.OK);
        cnx.response.setHeaders(HttpHeaders.from({
            'Content-Type':'text/plain;charset=utf-8'
        }));
        cnx.response.setBody(this.response('Hello World'))
    }
}

class MyServer extends HttpApplication {
    static async start(){
        const server = new MyServer();
        const address = await server.listen(8000,'0.0.0.0');
        console.info(`Server started`)
        console.info(` -> http://${address.address}:${address.port}/`);
    }
    constructor() {
        super();
        this.use(new MyHandler())
    }
}

//^2.9.0-dev.20180506
