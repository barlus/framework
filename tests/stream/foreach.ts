import {suite,test,expect} from '@barlus/tester';
import {swallowErrors, track} from '@vendor/stream/util';
import {BaseTest} from './base';
import {AlreadyHaveReaderError} from '@vendor/stream/errors';

@suite
class StreamForEachTest extends BaseTest {
    @test.setup
    protected async setup() {
        await super.setup();
    }
    @test
    @test.case()
    async handlesEmptyStream(a:number[],b:number[]){
        let endResult: Error = null; // null, to distinguish from 'undefined' that gets assigned by ender
        const res = track(this.s.forEach(r=>this.pushResult(r), (e?: Error) => { endResult = e; }));
        this.s.end();
        await res.promise;
        expect(this.results).toEqual([]);
        expect(endResult).toEqual(undefined);
        expect(res.isFulfilled).toEqual(true);
    }
    @test
    @test.case()
    async handlesSingleValue(a:number[],b:number[]){
        let endResult: Error = null; // null, to distinguish from 'undefined' that gets assigned by ender
        const res = track(this.s.forEach(r=>this.pushResult(r), (e?: Error) => { endResult = e; }));
        this.s.write(1);
        this.s.end();
        await res.promise;
        expect(this.results).toEqual([1]);
        expect(endResult).toEqual(undefined);
        expect(res.isFulfilled).toEqual(true);
    }
    @test
    @test.case()
    async handlesMultipleValues(a:number[],b:number[]){
        let endResult: Error = null; // null, to distinguish from 'undefined' that gets assigned by ender
        const res = track(this.s.forEach(r=>this.pushResult(r), (e?: Error) => { endResult = e; }));
        this.s.write(1);
        this.s.write(2);
        this.s.write(3);
        this.s.end();
        await res.promise;
        expect(this.results).toEqual([1, 2, 3]);
        expect(endResult).toEqual(undefined);
        expect(res.isFulfilled).toEqual(true);
    }
    @test
    @test.case()
    async handlesErrorInReader(a:number[],b:number[]){
        // Error thrown in reader should ONLY reflect back to writer, not to reader
        // Allows writer to decide to send another value, abort, end normally, etc.
        const endError = new Error("end boom");
        let endResult: Error = null; // null, to distinguish from 'undefined' that gets assigned by ender
        const res = track(this.s.forEach(
            (n) => { throw this.boomError; },
            (e?: Error) => { endResult = e; }
        ));

        // Write a value, will be rejected by reader and returned from write
        const wp = track(this.s.write(1));
        await this.settle([wp.promise]);
        expect(endResult).toEqual(null);
        expect(wp.reason).toEqual(this.boomError);

        // Then end the stream with an error, the end() itself should return
        // void promise
        const ep = track(this.s.end(endError));
        await this.settle([ep.promise, res.promise]);
        expect(endResult).toEqual(endError);
        expect(ep.value).toEqual(undefined);
        expect(res.reason).toEqual(endError);
    }
    @test
    @test.case()
    async canUseDefaultEnder(a:number[],b:number[]){
        const res = track(this.s.forEach(
            (v) => { this.results.push(v); }
        ));
        this.s.write(1);
        this.s.write(2);
        this.s.end();
        await res.promise;
        expect(this.results).toEqual([1, 2]);
        expect(res.isFulfilled).toEqual(true);
    }
    @test
    @test.case()
    async returnsErrorsByDefault(a:number[],b:number[]){
        swallowErrors(this.s.result());
        const res = track(this.s.forEach(
            (v) => { this.results.push(v); }
        ));
        this.s.write(1);
        this.s.write(2);
        const we = track(this.s.end(this.boomError));
        await this.settle([res.promise, we.promise]);
        expect(this.results).toEqual([1, 2]);
        expect(we.reason).toEqual(this.boomError);
        expect(res.reason).toEqual(this.boomError);
    }
    @test
    @test.case()
    async noMultipleAttach(a:number[],b:number[]){
        this.s.forEach(this.noop);
        const result = track(this.s.forEach(this.noop));
        await this.settle([result.promise]);
        expect(result.reason instanceof AlreadyHaveReaderError).toBe(true);
    }
}

