import {suite,test,expect} from '@barlus/tester';
import {Defer, delay, swallow, Track} from '@vendor/stream/util';
import {BaseTest} from './base';
import {WriteAfterEndError} from '@vendor/stream/errors';

@suite
class StreamAbortTest extends BaseTest {
    @test.setup
    protected async setup(){
        await super.setup();
    }
    @test
    @test.case()
    async abortsPendingWrites(a:number[],b:number[]){
        const w1 = new Track(this.s.write(1));
        const w2 = new Track(this.s.write(2));
        this.s.abort(this.abortError);
        await this.settle([w1.promise, w2.promise]);
        expect(w1.reason).toEqual(this.abortError);
        expect(w2.reason).toEqual(this.abortError);
    }
    @test
    @test.case()
    async abortsPendingWrites2(a:number[],b:number[]){
        this.s.abort(this.abortError);
        const w1 = new Track(this.s.write(1));
        const w2 = new Track(this.s.write(2));
        await this.settle([w1.promise, w2.promise]);
        expect(w1.reason).toEqual(this.abortError);
        expect(w2.reason).toEqual(this.abortError);
    }

    @test
    @test.case()
    async waitForReadThenAbort(a:number[],b:number[]){
        swallow(this.s.aborted());
        swallow(this.s.result());

        const endDef = new Defer();
        const endSeen = new Defer();
        swallow(endDef.promise);
        const r1 = new Defer();
        const reads = [r1.promise];
        let endResult: Error = null;

        const w1 = new Track(this.s.write(1));
        const w2 = new Track(this.s.write(2));

        swallow(this.s.forEach(
            (v) => {
                this.results.push(v);
                return reads.shift();
            },
            (err) => {
                endResult = err;
                endSeen.resolve();
                return endDef.promise;
            }
        ));

        await delay(1);
        expect(w1.isPending).toEqual(true);
        expect(w2.isPending).toEqual(true);
        expect(this.results).toEqual([1]);

        this.s.abort(this.abortError);
        const w3 = new Track(this.s.write(3));
        await delay(1);
        expect(w1.isPending).toEqual(true);
        expect(w2.isPending).toEqual(true);
        expect(w3.isPending).toEqual(true);
        expect(this.results).toEqual([1]);

        r1.reject(this.boomError); // could do resolve() too, error is more interesting :)
        await this.settle([w1.promise, w2.promise, w3.promise]);
        expect(w1.reason).toEqual(this.boomError);
        expect(w2.reason).toEqual(this.abortError);
        expect(w3.reason).toEqual(this.abortError);
        expect(this.results).toEqual([1]);
        expect(endResult).toEqual(null);

        const we = new Track(this.s.end(new Error("end error")));
        await endSeen.promise;
        expect(endResult).toEqual(this.abortError);
        expect(we.isPending).toEqual(true);

        const enderError = new Error("ender error");
        endDef.reject(enderError);
        try {
            await we.promise;
            expect(false).toEqual(Error);
        } catch (e) {
            expect(e).toEqual(enderError);
        }

        try {
            await this.s.end();
            expect(false).toEqual(Error);
        } catch (e) {
            expect(e instanceof WriteAfterEndError).toBe(true);
        }
    }
    @test
    @test.case()
    async cabBeCalledInReader(a:number[],b:number[]){
        swallow(this.s.aborted());
        swallow(this.s.result());
        let endResult: Error = null;
        const w1 = new Track(this.s.write(1));
        const w2 = new Track(this.s.write(2));
        const r1 = new Defer();
        swallow(this.s.forEach(
            (v) => { this.s.abort(this.abortError); return r1.promise; },
            (e) => { endResult = e; }
        ));
        await delay(1);
        expect(w1.isPending).toEqual(true);
        expect(w2.isPending).toEqual(true);
        expect(endResult).toEqual(null);

        r1.resolve();
        await this.settle([w1.promise, w2.promise]);
        expect(w1.value).toEqual(undefined);
        expect(w2.reason).toEqual(this.abortError);
        expect(endResult).toEqual(null);

        const we = new Track(this.s.end());
        await this.settle([we.promise]);
        expect(endResult).toEqual(this.abortError);
        expect(we.value).toEqual(undefined);
    }
    @test
    @test.case()
    async cabBeCalledInReader2(a:number[],b:number[]){
        swallow(this.s.aborted());
        swallow(this.s.result());
        let endResult: Error = null;
        const w1 = new Track(this.s.write(1));
        const r1 = new Defer();
        const firstAbortError = new Error("first abort error");
        this.s.abort(firstAbortError);
        this.s.forEach(
            (v) => { expect.fail("Should not reach") },
            (e) => { endResult = e; }
        );

        await this.settle([w1.promise]);
        expect(w1.reason).toEqual(firstAbortError);
        expect(endResult).toEqual(null);

        this.s.abort(this.abortError);
        r1.resolve();
        const we = new Track(this.s.end());
        await this.settle([we.promise]);
        expect(endResult).toEqual(firstAbortError);
        expect(we.value).toEqual(undefined);
    }
    @test
    @test.case()
    async asynchronouslyCallAbortWhenAlreadyReading(a:number[],b:number[]){
        let abortResult: Error = null;
        const w1 = new Track(this.s.write(1));
        const r1 = new Defer();
        this.s.forEach(
            (v) => r1.promise,
            undefined,
            (e) => { abortResult = e; }
        );
        await delay(1);

        this.s.abort(this.abortError);
        expect(abortResult).toEqual(null);

        await delay(1);
        expect(abortResult).toEqual(this.abortError);
        expect(w1.isPending).toEqual(true);

        r1.resolve();
        await this.settle([w1.promise]);
        expect(w1.isFulfilled).toEqual(true);
    }
    @test
    @test.case()
    async asynchronouslyCallAbortWhenNotReading(a:number[],b:number[]){
        swallow(this.s.aborted());
        swallow(this.s.result());
        let abortResult: Error = null;
        const abortSeen = new Defer();
        const w1 = new Track(this.s.write(1));
        this.s.forEach(
            (v) => undefined,
            undefined,
            (e) => {
                abortResult = e;
                abortSeen.resolve();
            }
        );
        await delay(1);

        this.s.abort(this.abortError);
        expect(abortResult).toEqual(null);

        await abortSeen.promise;
        expect(abortResult).toEqual(this.abortError);
        expect(w1.isFulfilled).toEqual(true);
    }
    @test
    @test.case()
    async asynchronouslyCallAbortWhenAttachingLate(a:number[],b:number[]){
        swallow(this.s.aborted());
        swallow(this.s.result());

        const w1 = new Track(this.s.write(1));
        await delay(1);
        this.s.abort(this.abortError);

        await this.settle([w1.promise]);
        expect(w1.reason).toEqual(this.abortError);

        let abortResult: Error = null;
        const abortSeen = new Defer();
        swallow(this.s.forEach(
            (v) => undefined,
            undefined,
            (e) => {
                abortResult = e;
                abortSeen.resolve();
            }
        ));
        expect(abortResult).toEqual(null);

        await abortSeen.promise;
        expect(abortResult).toEqual(this.abortError);
    }
    @test
    @test.case()
    async noLongerCallsAbortOnFinish(a:number[],b:number[]) {
        const w1 = new Track(this.s.write(1));
        const we = new Track(this.s.end());
        let abortResult: Error = null;
        this.s.forEach(
            (v) => undefined,
            undefined,
            (e) => { abortResult = e; }
        );

        await this.settle([w1.promise, we.promise]);
        expect(abortResult).toEqual(null);
        expect(this.s.isEnded()).toEqual(true);
        expect(w1.isFulfilled).toEqual(true);
        expect(we.isFulfilled).toEqual(true);

        this.s.abort(this.abortError);
        const ab = new Track(this.s.aborted());

        await this.settle([ab.promise]);
        await delay(1);
        expect(abortResult).toEqual(null);
        expect(ab.reason).toEqual(this.abortError);
    }
    @test
    @test.case()
    async rejectWhenAbortCalled(a:number[],b:number[]) {
        const ab = new Track(this.s.aborted());
        await delay(1);
        expect(ab.isPending).toEqual(true);
        this.s.abort(this.abortError);
        await this.settle([ab.promise]);
        expect(ab.reason).toEqual(this.abortError);
    }
    @test
    @test.case()
    async rejectWhenAbortCalledAfterEnd(a:number[],b:number[]) {
        const ab = new Track(this.s.aborted());
        this.s.end();
        await this.s.forEach(()=>void 0);
        expect(ab.isPending).toEqual(true);
        expect(this.s.isEnded()).toEqual(true);

        this.s.abort(this.abortError);
        await this.settle([ab.promise]);
        expect(ab.reason).toEqual(this.abortError);
    }
}
