import {suite, test, expect} from '@barlus/tester';

@suite
class BasicTest {
    @test("example test")
    @test.timeout(2000)
    @test.case([1, 2, 3, 4], ["Start", "C1", "C2", "C3", "Hello"])
    @test.case([1, 2, 4], ["Start", "C1", "C2", "C4", "Hello"])
    async testBasicSum(a: number[], b: number[]) {

    }
}
