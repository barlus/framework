import {HttpRequest} from './request';
import {HttpResponse} from './response';
import {Server} from '../node/http';

export class HttpServer {
    private native: Server;
    protected callback() {
        return async (req, res) => {
            res.end();
        }
    }
    public async listen(...args) {
        this.native = new Server(this.callback());
        await new Promise((accept, reject) => {
            const cleanup = (error) => {
                this.native.removeListener('listening', cleanup);
                this.native.removeListener('error', cleanup);
                if (error) {
                    reject()
                } else {
                    accept()
                }
            };
            this.native.once('listening', cleanup);
            this.native.once('error', cleanup);
            this.native.listen(...args)
        });
        return this.native.address();
    }
}