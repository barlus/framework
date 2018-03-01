import {BlockingQueue} from '@barlus/runtime/async/queue';
import {suite, test, expect} from '@barlus/tester';

@suite
class BasicTest {
    @test
    async testBasicSum() {
        //console.info("Mello", new BlockingQueue());
    }

    @test
    @test.case(1)
    @test.case(2)
    async testOtherSum(i:number) {
        // if(i==1){
        //     throw new Error('failed')
        // }
        //console.info("Mello", new BlockingQueue());
    }

}


//
// declare const global,process;
//
//
// const q = g.q = new AsyncQueue<string>();
//
// q.dequeue().then(r=>{});
// const c = g.c = {
//     done:true,
//     start(fn){
//         this.done = false;
//         const randomDelay = (fn) => {
//             let ms = Math.random() * 1000;
//             let id = setTimeout(() => {
//                 clearTimeout(id);
//                 this.done = fn(Math.round(ms));
//                 if (!this.done) {
//                     randomDelay(fn);
//                 }
//             }, ms);
//             return id;
//         };
//         randomDelay(fn);
//     },
//     stop(){
//         this.done = false;
//     },
//     async test(){
//         let seq = 0, done = false;
//         this.start((ms) => {
//             q.enqueue(`T:${seq++}:${ms} AA`).then(
//                 console.info,
//                 console.info
//             );
//             return done;
//         });
//         for await(const item of q) {
//             console.info(item);
//             if (done = seq >= 10) {
//                 break;
//             }
//         }
//     }
// };
//
//
