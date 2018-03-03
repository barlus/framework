import {HttpApplication} from "@barlus/bone/http";
import {process} from "@barlus/bone/node/process";
import {ProjectRoute} from "@barlus/bone/http/handlers/projects";


class MyApplication extends HttpApplication {
    static instance:MyApplication;
    static async start(){
        if(!this.instance){
            const app = new MyApplication();
            const {address,port} = await app.listen(10001,'0.0.0.0');
            console.info("Application started");
            console.info(` -> http://${address}:${port}`);
            this.instance = app;
        }
        return this.instance;
    }
    constructor(){
        super();
        this.use(new ProjectRoute({
            root:process.cwd(),
            project:'@vendor/client'
        }))
    }
}

MyApplication.start().catch(console.error);
