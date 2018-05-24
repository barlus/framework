import { AsyncDefer } from "@barlus/runtime/async/defer";
import { internal } from "@barlus/runtime/internal";

export class BlockingExchangeQueue<P, C = void> {
    @internal '#': {
        barriers: {
            consumer: AsyncDefer<C>,
            producer: AsyncDefer<P>
        }[]
    };
    get done(): Promise<void> {
        return;
    }
    public constructor() {
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
    public dequeue(payload?:(p: P) => Promise<C>): Promise<P> {
        const my = internal.of(this);
        let record = this.barrier(my.barriers.length && my.barriers[0].producer.accepted);
        if(payload){
            record.producer.promise.then(p=>{
                payload(p).then(c=>{
                    record.consumer.accept(c);
                })
            })
        }
        else{
            record.consumer.accept(undefined);
        }
        return record.producer.promise;
    }
    public close(): Promise<void> {
        return
    }
    public error(reason: Error): Promise<void> {
        return
    }
    purge() {
        const my = internal.of(this);
        while (my.barriers.length && my.barriers[0].producer.accepted) {
            my.barriers.shift()
        }
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