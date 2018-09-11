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
          reject(error)
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
  public async close(): Promise<void> {
    return new Promise<void>((accept, reject) => {
      this.native.close(() => {
        try {
          this.native.removeAllListeners('request');
          this.native.unref();
          accept();
        } catch (e) {
          reject(e)
        }
      })
    })
  }
}