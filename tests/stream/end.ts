import {suite,test,expect} from '@barlus/tester';
import {Defer, delay, swallowErrors, track} from '@vendor/stream/util';
import {BaseTest} from './base';
import {AlreadyHaveReaderError} from '@vendor/stream/errors';
import {Transform} from '@vendor/stream';


@suite
class StreamEndingTest extends BaseTest {
    @test.setup
    protected async setup() {
        await super.setup();
    }

    @test
    @test.case()
    async mapsValues(a:number[],b:number[]){
        const mapped = this.s.map((n) => n * 2);
        const writes = [track(this.s.write(1)), track(this.s.write(2)), track(this.s.end())];
        this.readInto(mapped, this.results);
        await this.s.result();
        expect(this.results).toEqual([2, 4]);
        expect(writes[0].isFulfilled).toEqual(true);
        expect(writes[1].isFulfilled).toEqual(true);
        expect(writes[2].isFulfilled).toEqual(true);
    }
    @test
    @test.case()
    async bouncesThrownError(a:number[],b:number[]){
        const mapped = this.s.map((n) => {
            if (n === 1) {
                throw this.boomError;
            } else {
                return n * 2;
            }
        });
        const writes = [track(this.s.write(1)), track(this.s.write(2)), track(this.s.end())];
        writes.forEach((t): void => {
            swallowErrors(t.promise);
        });
        this.readInto(mapped, this.results);
        await this.settle([this.s.result()]);
        expect(this.results).toEqual([4]);
        expect(writes[0].reason).toEqual(this.boomError);
        expect(writes[1].isFulfilled).toEqual(true);
        expect(writes[2].isFulfilled).toEqual(true);
    }
    @test
    @test.case()
    async bouncesReturnedRejection(a:number[],b:number[]){
        const mapped = this.s.map((n) => {
            if (n === 1) {
                return Promise.reject<number>(this.boomError);
            } else {
                return n * 2;
            }
        });
        const writes = [track(this.s.write(1)), track(this.s.write(2)), track(this.s.end())];
        writes.forEach((t): void => {
            swallowErrors(t.promise);
        });
        this.readInto(mapped, this.results);
        await this.settle([this.s.result()]);
        expect(this.results).toEqual([4]);
        expect(writes[0].reason).toEqual(this.boomError);
        expect(writes[1].isFulfilled).toEqual(true);
        expect(writes[2].isFulfilled).toEqual(true);
    }
    @test
    @test.case()
    async waitsForSourceEnd(a:number[],b:number[]){
        const d = new Defer();
        const slowEndingSource = this.s.transform<number>((readable, writable) => {
            readable.forEach(
                (v) => writable.write(v),
                (error?: Error) => {
                    writable.end(error, readable.result());
                    return d.promise;
                }
            );
        });
        const writes = [track(this.s.write(1)), track(this.s.write(2)), track(this.s.end())];

        const mapped = slowEndingSource.map((n) => n * 2);
        const mres = track(mapped.result());
        this.readInto(mapped, this.results);

        await this.settle([writes[0].promise, writes[1].promise]);
        await delay(1);
        expect(this.results).toEqual([2, 4]);
        expect(writes[0].isFulfilled).toEqual(true);
        expect(writes[1].isFulfilled).toEqual(true);
        expect(writes[2].isFulfilled).toEqual(false);
        expect(mres.isFulfilled).toEqual(false);

        d.resolve();
        await this.settle([mres.promise]);
    }
    @test
    @test.case()
    async waitsForDestinationEnd(a:number[],b:number[]){
        const d = new Defer();
        const slowEnder: Transform<number, number> = (readable, writable) => {
            readable.forEach(
                (v) => writable.write(v),
                (error?: Error) => {
                    writable.end(error, readable.result());
                    return d.promise;
                }
            );
        };
        const w1 = track(this.s.write(1));
        const w2 = track(this.s.write(2));
        const we = track(this.s.end());

        const mapped = this.s.map((n) => n * 2);
        const mres = track(mapped.result());
        const slowed = mapped.transform(slowEnder);
        const sres = track(slowed.result());
        this.readInto(slowed, this.results);

        await delay(1);
        expect(this.results).toEqual([2, 4]);
        expect(w1.isFulfilled).toEqual(true);
        expect(w2.isFulfilled).toEqual(true);
        expect(we.isFulfilled).toEqual(false);
        expect(mres.isFulfilled).toEqual(false);
        expect(sres.isFulfilled).toEqual(false);

        d.resolve();
        await this.settle([mres.promise, sres.promise]);
    }
    @test
    @test.case()
    async callsEnderAndAwaitsResult(a:number[],b:number[]){
        const d = new Defer();
        let endResult: Error = null;
        const mapped = this.s.map(
            (n) => n * 2,
            (e) => { endResult = e; return d.promise; }
        );
        this.readInto(mapped, this.results);
        const w1 = track(this.s.write(1));
        const we = track(this.s.end());

        await delay(1);
        expect(this.results).toEqual([2]);
        expect(mapped.isEnded()).toEqual(false);
        expect(endResult).toEqual(undefined);
        expect(w1.isFulfilled).toEqual(true);
        expect(we.isPending).toEqual(true);

        d.resolve();
        await we.promise;
        expect(we.isFulfilled).toEqual(true);
        expect(mapped.isEnded()).toEqual(true);
    }
    @test
    @test.case()
    async returnsAsynchronousErrorInEnder(a:number[],b:number[]){
        const d = new Defer();
        let endResult: Error = null;
        const mapped = this.s.map(
            (n) => n * 2,
            (e) => { endResult = e; return d.promise; }
        );
        const r = track(this.readInto(mapped, this.results));
        const w1 = track(this.s.write(1));
        const we = track(this.s.end());
        const res = track(this.s.result());
        [r, w1, we, res].forEach((t): void => {
            swallowErrors(t.promise);
        });
        swallowErrors(mapped.result());

        await delay(1);
        expect(this.results).toEqual([2]);
        expect(mapped.isEnded()).toEqual(false);
        expect(endResult).toEqual(undefined);
        expect(w1.isFulfilled).toEqual(true);
        expect(we.isPending).toEqual(true);

        d.reject(this.boomError);
        await this.settle([r.promise, res.promise]);
        expect(we.reason).toEqual(this.boomError);
        expect(mapped.isEnded()).toEqual(true);
        expect(this.s.isEnded()).toEqual(true);
        expect(res.reason).toEqual(this.boomError);
        expect(r.reason).toEqual(this.boomError);
    }
    @test
    @test.case()
    async returnsSynchronousErrorInEnderDownstreamFails(a:number[],b:number[]){
        let endResult: Error = null;
        const mapped = this.s.map(
            (n) => n * 2,
            (e) => { endResult = e; throw this.boomError; }
        );
        let forEachEndResult: Error = null;
        mapped.forEach(
            (n) => { this.results.push(n); },
            (e) => {
                forEachEndResult = e;
                throw new Error("some other error");
            }
        );
        const w1 = track(this.s.write(1));
        const we = track(this.s.end());
        const res = track(this.s.result());
        [w1, we, res].forEach((t): void => {
            swallowErrors(t.promise);
        });
        swallowErrors(mapped.result());

        await this.settle([res.promise]);
        expect(this.results).toEqual([2]);
        expect(endResult).toEqual(undefined);
        expect(w1.isFulfilled).toEqual(true);
        expect(we.reason).toEqual(this.boomError);
        expect(mapped.isEnded()).toEqual(true);
        expect(this.s.isEnded()).toEqual(true);
        expect(res.reason).toEqual(this.boomError);
        expect(forEachEndResult).toEqual(this.boomError);
    }
    @test
    @test.case()
    async leavesOriginalEndErrorAntEnd(a:number[],b:number[]){
        const endError = new Error("endError");
        let mapEndResult: Error = null;
        const mapped = this.s.map(
            (n) => n * 2,
            (e) => { mapEndResult = e; throw this.boomError; }
        );
        const w1 = track(this.s.write(1));
        const we = track(this.s.end(endError));
        const res = track(this.s.result());
        swallowErrors(mapped.result());

        let forEachEndResult: Error = null;
        const d = new Defer();
        mapped.forEach(
            (n) => { this.results.push(n); },
            (e) => {
                forEachEndResult = e;
                return d.promise;
            }
        );

        while (!mapped.isEnding()) {
            await delay(1);
        }
        expect(mapEndResult).toEqual(endError);
        expect(w1.isFulfilled).toEqual(true);
        expect(we.isPending).toEqual(true);
        expect(mapped.isEnding()).toEqual(true);
        expect(mapped.isEnded()).toEqual(false);
        expect(res.isPending).toEqual(true);

        d.resolve();
        await this.settle([res.promise, we.promise]);
        expect(this.results).toEqual([2]);
        expect(we.reason).toEqual(this.boomError);
        expect(mapped.isEnded()).toEqual(true);
        expect(this.s.isEnded()).toEqual(true);
        expect(res.reason).toEqual(this.boomError);
        expect(forEachEndResult).toEqual(endError);
    }
    @test
    @test.case()
    async supportsAborter(a:number[],b:number[]){
        let abortResult: Error = null;
        const abortSeen = new Defer();
        const mapped = this.s.map(
            (n) => n * 2,
            undefined,
            (e) => {
                abortResult = e;
                abortSeen.resolve();
            }
        );
        mapped.abort(this.abortError);
        await abortSeen.promise;
        expect(abortResult).toEqual(this.abortError);
    }
    @test
    @test.case()
    async abortsFromSource(a:number[],b:number[]){
        const sink = this.s.map(this.identity).map(this.identity);
        const ab = track(sink.aborted());
        this.s.abort(this.abortError);
        await this.settle([ab.promise]);
        expect(ab.reason).toEqual(this.abortError);
    }
    @test
    @test.case()
    async abortsFromSink(a:number[],b:number[]){
        const ab = track(this.s.aborted());
        const sink = this.s.map(this.identity).map(this.identity);
        sink.abort(this.abortError);
        await this.settle([ab.promise]);
        expect(ab.reason).toEqual(this.abortError);
    }
}
