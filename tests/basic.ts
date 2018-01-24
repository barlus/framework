import {suite,test,expect} from '@barlus/tester';

@suite
class BasicTest {

    @test
    @test.case(1,1,2)
    @test.case(5,6,11)
    public testBasicSum(a:number,b:number,c:number){
        expect(a+b).toBe(c)
    }
}