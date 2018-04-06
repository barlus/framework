import {suite,test,expect} from '@barlus/tester';

import {BaseTest} from './base';


@suite
class StreamCleanupTest extends BaseTest {
    @test.setup
    protected async setup() {
        await super.setup();
    }

    @test
    @test.case([1,2,3],[1,2,3])
    async testForEach(a:number[],b:number[]){
        const results = [];
        let result = this.s.forEach(r=>{
            results.push(r);
        });
        for (let element of a) {
            await this.s.write(element)
        }
        await this.s.end();
        await result;
        expect(results).toEqual(b)
    }

}

