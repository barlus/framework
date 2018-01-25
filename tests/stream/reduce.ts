import {suite, test, expect} from '@barlus/tester';
import {Defer, delay, swallow, Track} from '@vendor/stream/util';
import {BaseTest} from './base';
import {Stream} from '@vendor/stream';


@suite
class StreamReduceTest extends BaseTest {
    @test.setup
    protected async setup() {
        await super.setup();
    }
    @test
    @test.case()
    async handlesEmptyStream(a: number[], b: number[]) {
    }
    @test
    @test.case()
    async canBeUsedToSumValues() {
        const x = Stream.from([1, 2, 3, 4]);
        const value = await x.reduce((a, b) => a + b);
        expect(value).toEqual(10);
    }
    @test @test.case()
    async canBeUsedToSumValuesSeed() {
        const x = Stream.from([1, 2, 3, 4]);
        const value = await x.reduce((a, b) => a + b, 10);
        expect(value).toEqual(20);
    }
    @test @test.case()
    async canBeUsedToImplementToArray() {
        const x = Stream.from([1, 2, 3, 4]);
        const value = await x.reduce(
            (arr: number[], v: number) => {
                arr.push(v);
                return arr;
            },
            []
        );
        expect(value).toEqual([1, 2, 3, 4]);
    }
    @test @test.case()
    async callsReducerWithoutInitial() {
        const arr = [1, 2, 3, 4];
        let calls: any[][];
        let previouses: number[];
        function reducer(...args: any[]): number {
            // Skip the last arg though (either the array or stream)
            calls.push(args.slice(0, 3));
            return previouses.shift();
        }

        calls = [];
        previouses = [-10, -20, -30];
        const arrResult = arr.reduce(reducer);
        const arrCalls = calls;
        expect(previouses).toEqual([]);

        calls = [];
        previouses = [-10, -20, -30];
        const x = Stream.from(arr);
        const value = await x.reduce(reducer);
        expect(value).toEqual(arrResult);
        expect(previouses).toEqual([]);
        expect(calls).toEqual(arrCalls);
    }
    @test @test.case()
    async callsReducerWithInitialValue() {
        const arr = [1, 2, 3, 4];
        let calls: any[][];
        let previouses: number[];
        function reducer(...args: any[]): number {
            // Skip the last arg though (either the array or stream)
            calls.push(args.slice(0, 3));
            return previouses.shift();
        }

        calls = [];
        previouses = [-20, -30, -40, -50];
        const arrResult = arr.reduce(reducer, -10);
        const arrCalls = calls;
        expect(previouses).toEqual([]);

        calls = [];
        previouses = [-20, -30, -40, -50];
        const x = Stream.from(arr);
        const value = await x.reduce(reducer, -10);

        expect(value).toEqual(arrResult);
        expect(previouses).toEqual([]);
        expect(calls).toEqual(arrCalls);
    }
    @test @test.case()
    async callsReducerRightStream() {
        const x = Stream.from([1, 2, 3, 4]);
        const calls: any[][] = [];
        const previouses = [-1, -2, -3];
        function reducer(...args: any[]): number {
            calls.push(args);
            return previouses.shift();
        }
        const value = await x.reduce(reducer);
        expect(value).toEqual(-3);
        expect(previouses).toEqual([]);
        expect(calls).toEqual([
            [1, 2, 1, x],
            [-1, 3, 2, x],
            [-2, 4, 3, x],
        ]);
    }
    @test @test.case()
    async acceptPromiseFromReducer() {
        const d = new Defer<number>();
        const reduceResult = new Track(this.s.reduce(() => d.promise, 0));

        const writeResult = new Track(this.s.write(1));
        await delay(1);
        expect(reduceResult.isPending).toEqual(true);
        expect(writeResult.isPending).toEqual(true);

        d.resolve(100);
        await this.settle([writeResult.promise]);
        expect(reduceResult.isPending).toEqual(true);
        expect(writeResult.isFulfilled).toEqual(true);

        this.s.end();
        await this.settle([reduceResult.promise]);
        expect(reduceResult.value).toEqual(100);
    }
    @test @test.case()
    async returnsErrorWhenStreamIsEmpty() {
        const reduceResult = new Track(this.s.reduce(() => 0));
        this.s.end();
        await this.settle([reduceResult.promise]);
        expect(reduceResult.reason instanceof TypeError).toBe(true);
    }
    @test @test.case()
    async returnThrownErrorToWriter() {
        const reduceResult = new Track(this.s.reduce((prev, curr): number => {
            throw this.boomError;
        }, 0));
        const writeResult = new Track(this.s.write(1));
        await this.settle([writeResult.promise]);
        expect(reduceResult.isPending).toEqual(true);
        expect(writeResult.reason).toEqual(this.boomError);
        this.s.end();
        await this.settle([reduceResult.promise]);
        expect(reduceResult.isFulfilled).toEqual(true);
    }
    @test @test.case()
    async returnRejectedErrorToWriter() {
        const reduceResult = new Track(this.s.reduce((prev, curr) => Promise.reject<number>(this.boomError), 0));
        const writeResult = new Track(this.s.write(1));
        await this.settle([writeResult.promise]);
        expect(reduceResult.isPending).toEqual(true);
        expect(writeResult.reason).toEqual(this.boomError);
        this.s.end();
        await this.settle([reduceResult.promise]);
        expect(reduceResult.isFulfilled).toEqual(true);
    }
    @test @test.case()
    async returnsAllValues() {
        const value = await Stream.from([1, 2, 3, 4]).toArray();
        expect(value).toEqual([1, 2, 3, 4]);
    }
    @test @test.case()
    async returnsEmptyArrayForEmpty() {
        const value = await Stream.from([]).toArray();
        expect(value).toEqual([]);
    }
    @test @test.case()
    async returnsEndErrorIfEndedWithError() {
        swallow(this.s.result());
        const result = new Track(this.s.toArray());
        swallow(this.s.end(this.boomError));
        await this.settle([result.promise]);
        expect(result.reason).toEqual(this.boomError);
    }
    @test @test.case()
    async callsCallbackUntilUndefined() {
        const values = [1, 2, undefined, 3];
        const writeResult = new Track(this.s.writeEach(() => values.shift()));
        await this.s.forEach((v) => {
            this.results.push(v);
        });
        expect(this.s.isEnded()).toEqual(true);
        expect(this.results).toEqual([1, 2]);
        expect(values).toEqual([3]);
        expect(writeResult.isFulfilled).toEqual(true);
    }
    @test @test.case()
    async waitForNextCallUntilPreviousProcessed() {
        const values = [1, 2];
        const writeResult = new Track(this.s.writeEach(() => values.shift()));
        await delay(1);
        expect(values).toEqual([2]);

        const fe = this.s.forEach((v) => {
            this.results.push(v);
        });
        await this.settle([fe, writeResult.promise]);
        expect(this.results).toEqual([1, 2]);
        expect(writeResult.isFulfilled).toEqual(true);
    }
    @test @test.case()
    async handlesSynchronousExceptionInWriter() {
        swallow(this.s.result());
        const writeResult = new Track(this.s.writeEach(() => {
            throw this.boomError;
        }));
        const fe = this.s.forEach(this.noop);
        await this.settle([fe, writeResult.promise]);
        expect(this.s.isEnded()).toEqual(true);
        expect(writeResult.reason).toEqual(this.boomError);
    }
    @test @test.case()
    async handlesAllValuesAndStreamEndAsPromises() {
        const values = [1, 2];
        const writeResult = new Track(this.s.writeEach(() => Promise.resolve(values.shift())));
        const fe = this.s.forEach((v) => {
            this.results.push(v);
        });
        await this.settle([fe, writeResult.promise]);
        expect(this.results).toEqual([1, 2]);
        expect(writeResult.isFulfilled).toEqual(true);
    }
    @test @test.case()
    async abortsAndEndsWithErrorOnWriteError() {
        swallow(this.s.result());
        const ab = new Track(this.s.aborted());
        const values = [1, 2, 3];
        const writeResult = new Track(this.s.writeEach(() => values.shift()));
        let endResult: Error = null;
        const forEachResult = new Track(this.s.forEach(
            (v) => {
                if (v === 2) {
                    return Promise.reject(this.boomError);
                }
            },
            (error?: Error) => {
                endResult = error;
            }
        ));
        await this.settle([ab.promise, forEachResult.promise, writeResult.promise]);
        expect(values).toEqual([3]);
        expect(this.s.isEnded()).toEqual(true);
        expect(ab.reason).toEqual(this.boomError);
        expect(endResult).toEqual(this.boomError);
        expect(forEachResult.reason).toEqual(this.boomError);
        expect(writeResult.reason).toEqual(this.boomError);
    }
    @test @test.case()
    async abortsAndEndsWithErrorOnNormalEndError() {
        swallow(this.s.result());
        const ab = new Track(this.s.aborted());
        const values = [1, 2];
        const writeResult = new Track(this.s.writeEach(() => values.shift()));
        const forEachResult = new Track(this.s.forEach(
            this.noop,
            (error?: Error) => Promise.reject(this.boomError)
        ));
        await this.settle([ab.promise, forEachResult.promise, writeResult.promise]);
        expect(values).toEqual([]);
        expect(this.s.isEnded()).toEqual(true);
        expect(ab.reason).toEqual(this.boomError);
        expect(forEachResult.reason).toEqual(this.boomError);
        expect(writeResult.reason).toEqual(this.boomError);
    }
    @test @test.case()
    async endsWithErrorOnEndErrorAfterAbort() {
        swallow(this.s.result());
        const ab = new Track(this.s.aborted());
        const values = [1, 2];
        const writeResult = new Track(this.s.writeEach(() => values.shift()));
        this.s.abort(this.abortError);
        const forEachResult = new Track(this.s.forEach(
            this.noop,
            (error?: Error) => Promise.reject(this.boomError)
        ));
        await this.settle([ab.promise, forEachResult.promise, writeResult.promise]);
        expect(values).toEqual([1, 2]);
        expect(this.s.isEnded()).toEqual(true);
        expect(ab.reason).toEqual(this.abortError);
        expect(forEachResult.reason).toEqual(this.boomError);
        expect(writeResult.reason).toEqual(this.boomError);
    }
    @test @test.case()
    async handlesAbortBounce() {
        swallow(this.s.result());
        swallow(this.s.aborted());
        const values = [1, 2, 3];
        const writeResult = new Track(this.s.writeEach(() => values.shift()));
        const forEachResult = new Track(this.s.forEach(
            (v) => {
                if (v === 2) {
                    return Promise.reject(this.boomError);
                }
            }
            // Note: no end handler, so default, which 'bounces' the given
            // error
        ));
        await this.settle([forEachResult.promise, writeResult.promise]);
        expect(values).toEqual([3]);
        expect(this.s.isEnded()).toEqual(true);
        expect(forEachResult.reason).toEqual(this.boomError);
        expect(writeResult.reason).toEqual(this.boomError);
    }
    @test @test.case()
    async endsOnAbort() {
        swallow(this.s.result());
        swallow(this.s.aborted());
        const values = [1, 2, 3];
        const writeResult = new Track(this.s.writeEach(() => values.shift()));
        let endResult: Error = null;
        const d = new Defer();
        const forEachResult = new Track(this.s.forEach(
            (v) => d.promise,
            (err?) => {
                endResult = err;
            }
        ));
        await delay(1);
        expect(values).toEqual([2, 3]);
        this.s.abort(this.abortError);
        d.resolve();
        await this.settle([forEachResult.promise, writeResult.promise]);
        expect(values).toEqual([2, 3]);
        expect(this.s.isEnded()).toEqual(true);
        expect(endResult).toEqual(this.abortError);
        expect(forEachResult.reason).toEqual(this.abortError);
        expect(writeResult.reason).toEqual(this.abortError);
    }
    @test @test.case()
    async producesAllValuesThenEnds() {
        const x = Stream.from([1, 2]);
        await x.forEach((v) => {
            this.results.push(v);
        });
        expect(x.isEnded()).toEqual(true);
        expect(this.results).toEqual([1, 2]);
    }
    @test @test.case()
    async supportsPromiseForArray() {
        const x = Stream.from(Promise.resolve([1, 2]));
        await x.forEach((v) => {
            this.results.push(v);
        });
        expect(this.results).toEqual([1, 2]);
    }
    @test @test.case()
    async supportsArrayOfPromises() {
        const x = Stream.from([Promise.resolve(1), Promise.resolve(2)]);
        await x.forEach((v) => {
            this.results.push(v);
        });
        expect(this.results).toEqual([1, 2]);
    }
    @test @test.case()
    async supportsPromiseForArrayOfPromises() {
        const x = Stream.from(Promise.resolve([Promise.resolve(1), Promise.resolve(2)]));
        await x.forEach((v: number) => {
            this.results.push(v);
        });
        expect(this.results).toEqual([1, 2]);
    }
    @test @test.case()
    async endsOnFirstUndefined() {
        const x = Stream.from([1, 2, undefined, 3]);
        await x.forEach((v) => {
            this.results.push(v);
        });
        expect(x.isEnded()).toEqual(true);
        expect(this.results).toEqual([1, 2]);
    }
    @test @test.case()
    async abortsOnWriteError() {
        const x = Stream.from([1, 2]);
        swallow(x.result());
        swallow(x.aborted());
        let endResult: Error = null;
        const result = new Track(x.forEach(
            (v) => {
                if (v === 2) {
                    return Promise.reject(this.boomError);
                }
            },
            (error?: Error) => {
                endResult = error;
            }
        ));
        await this.settle([result.promise]);
        expect(x.isEnded()).toEqual(true);
        expect(endResult).toEqual(this.boomError);
        expect(result.reason).toEqual(this.boomError);
    }
    @test @test.case()
    async handlesAbortBounce2() {
        const x = Stream.from([1, 2]);
        swallow(x.result());
        swallow(x.aborted());
        const result = new Track(x.forEach(
            (v) => {
                if (v === 2) {
                    return Promise.reject(this.boomError);
                }
            }
            // Note: no end handler, so default, which 'bounces' the given
            // error
        ));
        await this.settle([result.promise]);
        expect(x.isEnded()).toEqual(true);
        expect(result.reason).toEqual(this.boomError);
    }
    @test @test.case()
    async endsOnAbort2() {
        const x = Stream.from([1, 2]);
        swallow(x.result());
        swallow(x.aborted());
        let endResult: Error = null;
        const d = new Defer();
        const result = new Track(x.forEach(
            (v) => d.promise,
            (err?) => {
                endResult = err;
            }
        ));
        await delay(1);
        x.abort(this.abortError);
        d.resolve();
        await this.settle([result.promise]);
        expect(x.isEnded()).toEqual(true);
        expect(endResult).toEqual(this.abortError);
        expect(result.reason).toEqual(this.abortError);
    }
}
