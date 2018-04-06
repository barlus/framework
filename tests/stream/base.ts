import {expect} from '@barlus/tester';
import {Stream, ReadableStream} from '@vendor/stream';
import {Defer, delay} from '@vendor/stream/util';
import {process} from '@barlus/node/process';


let unhandledRejectionCount = 0;
process.on("unhandledRejection", (reason: Error): void => {
    console.log("unhandled rejection:", reason);
    unhandledRejectionCount++;
    //throw reason;
});
process.prependListener("exit", (code: number): void => {
    if (code === 0 && unhandledRejectionCount !== 0) {
        process.exit(1);
    }
});

export class BaseTest {
    protected noop(n: number): void {
    }
    protected identity<T>(arg: T): T {
        return arg
    }
    protected pushResult(n: number): void {
        this.results.push(n);
    }
    protected settle(promises: PromiseLike<any>[]): Promise<void> {
        const result = new Defer();
        let count = promises.length;
        const check = (): void => {
            count--;
            if (count === 0) {
                result.resolve();
            }
        };
        for (const promise of promises) {
            promise.then(check, check);
        }
        return result.promise;
    }
    protected readInto<T>(stream: ReadableStream<T>, into: T[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            stream.forEach(
                (value: T) => {
                    expect(this instanceof BaseTest).toBe(true);
                    into.push(value);
                },
                (err?: Error) => {
                    expect(this instanceof BaseTest).toBe(true);
                    if (err) {
                        reject(err);
                    } else {
                        resolve(undefined);
                    }
                }
            ).catch(this.noop);
        });
    }

    protected s: Stream<number>;
    protected boomError: Error;
    protected abortError: Error;
    protected results: any[];
    protected promises: any[];
    protected unhandled:any[]=[];
    constructor() {
        process.on('unhandledRejection',this.onUnhandledPromise.bind(this));
    }
    protected onUnhandledPromise(reason, p) {
        this.unhandled.push(reason);
    }
    protected async setup() {
        this.s = new Stream<number>();
        this.boomError = new Error("boom");
        this.abortError = new Error("abort error");
        this.results = [];
        this.promises = [];
    }


}
