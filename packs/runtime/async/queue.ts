import {internal} from '../internal';
import {AsyncDefer} from './defer';


export abstract class AsyncQueue<P, C> implements AsyncIterable<P> {
    [Symbol.asyncIterator](): AsyncIterator<P> {
        return {
            next: async (value: C) => {
                return {
                    done: false,
                    value: await this.dequeue(value)
                }
            }
        }
    }

    readonly done: Promise<void>;
    abstract close(): Promise<void>;
    abstract error(reason: Error): Promise<void>;

    abstract enqueue(payload: P): Promise<C> | void;
    abstract dequeue(payload?: C): Promise<P>
}

export class BlockingQueue<P, C = void> extends AsyncQueue<P, C> {
    @internal '#': {
        barriers: {
            consumer: AsyncDefer<C>,
            producer: AsyncDefer<P>
        }[]
    };
    get done(): Promise<void>{
        return;
    }
    public constructor() {
        super();
        Object.assign(internal.of(this), {
            barriers: []
        })
    }
    public enqueue(payload: P): Promise<C> {
        const my = internal.of(this);
        let record = this.barrier(my.barriers.length && my.barriers[0].consumer.accepted);
        record.producer.accept(payload);
        return record.consumer.promise;
    }
    public dequeue(payload?: C): Promise<P> {
        const my = internal.of(this);
        let record = this.barrier(my.barriers.length && my.barriers[0].producer.accepted);
        record.consumer.accept(payload);
        return record.producer.promise;
    }
    public close(): Promise<void> {
        return
    }
    public error(reason: Error): Promise<void> {
        return
    }
    purge(){
        const my = internal.of(this);
        while(my.barriers.length && my.barriers[0].producer.accepted){
            my.barriers.shift()
        }
    }
    get position() {
        let barriers = internal.of(this).barriers;
        if (barriers.length && barriers[0].consumer.accepted) {
            return -barriers.length
        }
        return barriers.length
    }
    //
    private barrier(late: boolean) {
        const my = internal.of(this);
        if (late) {
            return my.barriers.shift();
        }
        let barrier = {
            consumer: new AsyncDefer<C>(),
            producer: new AsyncDefer<P>()
        };
        my.barriers.push(barrier);
        return barrier;
    }

}
export class BufferedQueue<P> extends AsyncQueue<P, never> {
    @internal '#': {
        barriers: AsyncDefer<P>[]
    };
    public get done(): Promise<void>{
        return;
    }
    public constructor() {
        super();
        Object.assign(internal.of(this), {
            barriers: []
        })
    }
    public enqueue(payload: P): void {
        const my = internal.of(this);
        let record = this.barrier(my.barriers.length && !my.barriers[0].accepted);
        record.accept(payload);
    }
    public dequeue(): Promise<P> {
        const my = internal.of(this);
        return this.barrier(my.barriers.length && my.barriers[0].accepted).promise;
    }
    public close(): Promise<void> {
        return
    }
    public error(reason: Error): Promise<void> {
        return
    }
    private barrier(late: boolean) {
        const my = internal.of(this);
        if (late) {
            return my.barriers.shift();
        }
        const barrier = new AsyncDefer<P>();
        my.barriers.push(barrier);
        return barrier;
    }
}

// class AsyncResult<T> implements IteratorResult<T>{
//     readonly done:boolean;
//     readonly value:T;
//     readonly promise:Promise<this>;
//     accept?(value:T,done:boolean);
//     reject?(value:any,done:boolean);
//     get isPending(){
//         return this.promise!==null;
//     }
//     constructor(later:boolean,value:T=undefined,done:boolean=false){
//         this.value=value;
//         this.done=done;
//         this.promise = null;
//         this.accept = null;
//         this.reject = null;
//         if(later){
//             this.promise = new Promise<this>((a,r)=>{
//                 this.accept = (value:T,done:boolean)=> {
//                     (this as any).done = done;
//                     (this as any).value = value;
//                     (this as any).promise = null;
//                     (this as any).accept = null;
//                     (this as any).reject = null;
//                     a(this);
//                 };
//                 this.reject = (value:any,done:boolean)=> {
//                     (this as any).done = done;
//                     (this as any).value = value;
//                     (this as any).promise = null;
//                     (this as any).accept = null;
//                     (this as any).reject = null;
//                     r(this);
//                 }
//             });
//         }
//     }
// }

// class AsyncQueue<T> implements AsyncIterableIterator<T> {
//     [Symbol.asyncIterator](): AsyncIterableIterator<T> {
//         return this;
//     }
//     private [size]: number = 0;
//     private [stack]: AsyncResult<T>[] = [];
//     public get size() {
//         return this[size];
//     }
//     public get isEmpty() {
//         return this.size == 0;
//     }
//     public get isPulling() {
//         return this.size < 0;
//     }
//     public get isPushing() {
//         return this.size > 0;
//     }
//     public push(value: T): number {
//         if (this.isPulling) {
//             this[size]++;
//             const next = this[stack].pop();
//             if (!next || !next.isPending) {
//                 throw new error("Something wrong");
//             } else {
//                 next.accept(value,false);
//                 return this.size;
//             }
//         } else {
//             this[size]++;
//             const next = new AsyncResult<T>(false,value,false);
//             this[stack].push(next);
//             return this.size;
//         }
//     }
//     public next(): Promise<IteratorResult<T>> {
//         if (this.isPushing) {
//             this[size]--;
//             const next = this[stack].shift();
//             if (!next || next.isPending) {
//                 throw new error("Something wrong");
//             } else {
//                 return next.promise;
//             }
//         } else {
//             this[size]--;
//             const next = new AsyncResult<T>(true);
//             this[stack].push(next);
//             return next.promise;
//         }
//     }
//     public return(value?: any): Promise<IteratorResult<T>> {
//         return Promise.resolve({value, done: true});
//     }
// }

// class Queue<T> implements AsyncIterableIterator<T> {
//     [Symbol.asyncIterator](): AsyncIterableIterator<T> {
//         return this;
//     }
//     private [size]: number = 0;
//     private [stack]: Defer<IteratorResult<T>>[] = [];
//     public get size() {
//         return this[size];
//     }
//     public get isEmpty() {
//         return this.size == 0;
//     }
//     public get isPulling() {
//         return this.size < 0;
//     }
//     public get isPushing() {
//         return this.size > 0;
//     }
//     public push(value: T): number {
//         if (this.isPulling) {
//             this[size]++;
//             const next = this[stack].pop();
//             if (!next || next.state!=='pending') {
//                 throw new error("Something wrong");
//             } else {
//                 next.accept({done: false, value});
//                 return this.size;
//             }
//         } else {
//             this[size]++;
//             const next = Promise.defer<IteratorResult<T>>();
//             this[stack].push(next);
//             next.accept({done: false, value});
//             return this.size;
//         }
//     }
//     public next(): Promise<IteratorResult<T>> {
//         if (this.isPushing) {
//             this[size]--;
//             const next = this[stack].shift();
//             if (!next || next.state==='pending') {
//                 throw new error("Something wrong");
//             } else {
//                 return next;
//             }
//         } else {
//             this[size]--;
//             const next = Promise.defer<IteratorResult<T>>();
//             this[stack].push(next);
//             return next;
//         }
//     }
//     public return(value?: any): Promise<IteratorResult<T>> {
//         return Promise.resolve({value, done: true});
//     }
// }
