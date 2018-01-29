import {suite,test,expect} from '@barlus/tester';
import {Stream,ReadableStream} from '@vendor/stream';
import {Defer, Track} from '@vendor/stream/util';
import {BaseTest} from './base';
import {WriteAfterEndError} from '@vendor/stream/errors';

@suite
class StreamBasicTest extends BaseTest {

    @test.setup
    protected async setup(){
        await super.setup();
    }

    @test("example test")
    @test.case([1, 2, 3, 4],[2, 4, 6, 8])
    async testBasicSum(a:number[],b:number[]){
        const result = [];
        await Stream.from(a)
            .map((n) => n * 2)
            .forEach((n) => {
                result.push(n)
            });
        expect(result).toEqual(b)
    }

    @test
    @test.case([42,85],[42,85])
    async testGetAfterPut(a:number[],b:number[]){
        for(let num of a){
            this.promises.push(this.s.write(num));
        }
        this.promises.push(this.s.end());
        this.promises.push(this.readInto(this.s, this.results));
        await this.settle(this.promises);
        expect(this.results).toEqual(b);
    }

    @test
    @test.case([42,85],[42,85])
    async testPutAfterGet(a:number[],b:number[]){
        this.promises.push(this.readInto(this.s, this.results));
        for(let num of a){
            this.promises.push(this.s.write(num));
        }
        this.promises.push(this.s.end());
        await this.settle(this.promises);
        expect(this.results).toEqual(b);
    }

    @test
    @test.case([])
    async allowsEndBeforeGet(a:number[]){
        this.promises.push(this.s.end());
        this.promises.push(this.readInto(this.s, this.results));
        await this.settle(this.promises);
        expect(this.results).toEqual(a);
    }

    @test
    @test.case([])
    async allowsGetBeforeEnd(a:number[]){
        this.promises.push(this.s.end());
        this.promises.push(this.readInto(this.s, this.results));
        await this.settle(this.promises);
        expect(this.results).toEqual(a);
    }

    @test
    @test.case(42)
    async disallowsWriteAfterEnd(a:number){
        this.promises.push(this.s.end());
        this.promises.push(this.s.write(a).catch((r) => {
            expect(r instanceof WriteAfterEndError).toBe(true);
        }));
        this.promises.push(this.readInto(this.s, this.results));
        await this.settle(this.promises);
        expect(this.results).toEqual([]);
    }

    @test
    @test.case()
    async disallowsMultipleEnd(){
        const p1 = new Track(this.s.end());
        const p2 = new Track(this.s.end());
        const p3 = new Track(this.readInto(this.s, this.results));
        await this.settle([p1.promise, p2.promise, p3.promise]);
        expect(p1.isFulfilled).toEqual(true);
        expect(p2.reason instanceof WriteAfterEndError).toEqual(true);
        expect(p3.isFulfilled).toEqual(true);
        expect(this.results).toEqual([]);
    }

    @test
    @test.case()
    async writeFailsOnSynchronouslyRejection(){
        const wp1 = new Track(this.s.write(Promise.reject<number>(this.boomError)));
        const wp2 = new Track(this.s.write(42));
        const ep = new Track(this.s.end());
        const rp = new Track(this.readInto(this.s, this.results));
        await this.settle([wp1.promise, wp2.promise, ep.promise, rp.promise]);
        expect(wp1.reason).toEqual(this.boomError);
        expect(wp2.isFulfilled).toEqual(true);
        expect(this.results).toEqual([42]);
        expect(ep.isFulfilled).toEqual(true);
        expect(rp.isFulfilled).toEqual(true);


    }
    @test
    @test.case()
    async writeFailsOnSynchronouslyRejection2(){
        const d = new Defer<number>();
        const wp1 = new Track(this.s.write(d.promise));
        const wp2 = new Track(this.s.write(42));
        const ep = new Track(this.s.end());
        const rp = new Track(this.readInto(this.s, this.results));
        d.reject(this.boomError);
        await this.settle([wp1.promise, wp2.promise, ep.promise, rp.promise]);
        expect(wp1.reason).toEqual(this.boomError);
        expect(wp2.isFulfilled).toEqual(true);
        expect(this.results).toEqual([42]);
        expect(ep.isFulfilled).toEqual(true);
        expect(rp.isFulfilled).toEqual(true);
    }
}
@suite
class StreamWriteTest extends BaseTest {
    @test.setup
    protected async setup() {
        await super.setup();
    }

    @test
    @test.case()
    async handlesEmptyStream(a:number[],b:number[]){
        const result = new Track(this.s.write(undefined));
        await this.settle([result.promise]);
        expect(result.reason instanceof TypeError).toBe(true);
    }

}
