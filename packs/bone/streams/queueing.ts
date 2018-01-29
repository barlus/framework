import {Strategy,KwArgs} from './interfaces';
import {getApproximateByteSize} from './util';

export class QueuingStrategy<T> implements Strategy<T> {
    highWaterMark: number;
    constructor(kwArgs: KwArgs) {
        this.highWaterMark = kwArgs.highWaterMark;
    }
}
export class ByteLengthQueuingStrategy<T> extends QueuingStrategy<T> {
    size(chunk?: T | null): number {
        if ((<any> chunk).byteLength !== undefined) {
            return (<any> chunk).byteLength;
        }
        else {
            return getApproximateByteSize(chunk);
        }
    }
}
export class CountQueuingStrategy<T> extends QueuingStrategy<T> {
    size(chunk?: T | null): number {
        return 1;
    }
}


