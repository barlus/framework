import {suite, test, expect} from '@barlus/tester';
import {
    ReadableStream,
    ArraySink,
    ArraySource,
    WritableStream,
    Transformer,
    TransformStream
} from '@barlus/bone/streams';
import {TransformController} from '../packs/bone/streams/interfaces';

@suite
class BasicTest {
    @test("example test")
    @test.timeout(2000)
    @test.case([1, 2, 3, 4], ["Start", "C1", "C2", "C3", "Hello"])
    @test.case([1, 2, 4], ["Start", "C1", "C2", "C4", "Hello"])
    async testBasicSum(a: number[], b: number[]) {
        const source = new ArraySource(a);
        const sink = new ArraySink<number>();
        const transformer = new Transformer<string, number>({
            async start(controller:TransformController<string,number>){
                controller.enqueue(`Start`);
            },
            async transform(chunk: number | undefined, controller:TransformController<string,number>){
                if(chunk==3){
                    controller.terminate();
                }
                controller.enqueue(`C${chunk}`);
            },
            async flush(controller:TransformController<string,number>) {
                controller.enqueue("Hello");
            }
        });
        let readable = new ReadableStream(source).pipeThrough(new TransformStream(transformer));
        await readable.pipeTo(new WritableStream(sink));
        expect(sink.chunks).toEqual(b);
    }
}
