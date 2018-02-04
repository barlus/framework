import {HttpRequest} from './request';
import {HttpResponse} from './response';
import {createServer} from '../../node/http';

export class HttpServer {
    protected callback() {
        return async(req, res) => {
            res.end();
        }
    }
    public async listen(...args) {
        const server = createServer(this.callback());
        await new Promise((accept, reject) => {
            const cleanup = (error) => {
                server.removeListener('listening', cleanup);
                server.removeListener('error', cleanup);
                if (error) {
                    reject()
                } else {
                    accept()
                }
            };
            server.once('listening', cleanup);
            server.once('error', cleanup);
            server.listen(...args)
        });
        return server.address();
    }
}