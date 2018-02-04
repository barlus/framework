import '@barlus/std';
import {Internal,internal} from '@barlus/runtime';
import {createServer,Server} from '@barlus/node/http';
import {HttpClient,HttpRequest,HttpMethod,HttpUrl,HttpHeaders} from '@barlus/bone/http';
import {suite,test,expect} from '@barlus/tester';
import {Buffer} from '@barlus/node/buffer';




@suite
class HttpTest {
    server:Server;
    @suite.setup
    async setup(){

        this.server = createServer((req,res)=>{
            if(req.url=='/pipe'){
                req.pipe(res);
            }else{
                res.writeHead(200,'OK');
                res.end(JSON.stringify({
                    method: req.method,
                    url: req.url,
                    headers: req.headers
                }));
            }
        });
        this.server.listen(15555,'0.0.0.0');
    }
    @suite.teardown
    async teardown(){
        this.server.close(()=>{
            this.server.unref();
            console.info("DOWN");
        })
    }

    @test("example test")
    @test.case([1, 2, 3, 4],[1, 2, 3, 4])
    async testBasicSum(a:number[],b:number[]){
        const req = new HttpRequest(
            HttpMethod.GET,
            new HttpUrl('http://0.0.0.0:15555/path?q=v'),
            new HttpHeaders(),
            body(['Hello','World','Jan'])
        );
        const client = new HttpClient();
        const res = await client.send(req);
        console.info(res.status.code);
        console.info(res.status.message);
        console.info(res.headers);

        if(res.body){
            console.info(res.body[Symbol.asyncIterator])
            for await (const chunk of res.body){
                console.info(chunk.toString());
            }
        }
        expect(a).toEqual(b);
    }

    @test("promise test")
    @test.case()
    async testPromise(){
        console.info("HTTP TEST JAN");
    }
}

async function * body(data:string[]){
    for(const chunk of data){
        yield Buffer.from(chunk);
    }
}
