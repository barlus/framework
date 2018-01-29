import {suite,test,expect} from '@barlus/tester';

@suite
class BasicTest {
    @test("example test")
    @test.case([1, 2, 3, 4],[1, 2, 3, 4])
    async testBasicSum(a:number[],b:number[]){
        expect(a).toEqual(b);
    }
}
