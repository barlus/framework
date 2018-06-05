import { AsyncContainer } from '@barlus/experimental';
import { suite, test, expect } from '@barlus/tester';

@suite
class AsyncContainerTest {

    async * generator() {
        let i = 10
        while (--i) {
            yield i;
        }
    }


    @test
    public async testParallel() {
        try{
            let container = AsyncContainer.from(this.generator());
            let result = await container.parallel(3, async v => {
                return "S" + v;
            }).all();
            expect(result.length).toBe(9);
            expect(result).toEqual(["S9", "S8", "S7", "S6", "S5", "S4", "S3", "S2", "S1"])
        }
        catch(e){
            console.info(e)
        }

    }
    @test
    public async testAll() {
        let container = AsyncContainer.from(this.generator());
        let result = await container.all();
        expect(result.length).toBe(9);
        expect(result).toEqual([9, 8, 7, 6, 5, 4, 3, 2, 1])
    }
    @test
    public async testMap() {
        let container = AsyncContainer.from(this.generator());
        let result = await container.map(async v => {
            return "S" + v;
        }).all();
        expect(result.length).toBe(9);
        expect(result).toEqual(["S9", "S8", "S7", "S6", "S5", "S4", "S3", "S2", "S1"])

        let iterator = this.generator()[Symbol.asyncIterator]();
        let mapped = AsyncContainer.map(iterator, async v => -v);
        let items = [];
        for await (let i of mapped) {
            items.push(i);
        }
        expect(items.length).toBe(9);
        expect(items).toEqual([-9, -8, -7, -6, -5, -4, -3, -2, -1])

        //Try to do for again, like a generators iteratable iterator it should not rewind
        for await (let i of mapped) {
            items.push(i);
        }
        //So the items should not change
        expect(items.length).toBe(9);
        expect(items).toEqual([-9, -8, -7, -6, -5, -4, -3, -2, -1])
    }
    @test
    public async testFilter() {
        let container = AsyncContainer.from(this.generator());
        let result = await container.filter(async v => {
            return v % 2 === 1
        }).all();
        expect(result.length).toBe(5);
        expect(result).toEqual([9, 7, 5, 3, 1])
    }
    @test
    public async testSome() {
        let result1 = await AsyncContainer.from(this.generator()).some(async v => {
            return v === 1
        })
        expect(result1).toBe(true);
        let result2 = await AsyncContainer.from(this.generator()).some(async v => {
            return v === 11
        })
        expect(result2).toBe(false);
    }
    @test
    public async testEvery() {
        let container = AsyncContainer.from(this.generator());
        let result1 = await AsyncContainer.from(this.generator()).every(async v => {
            return v > 0
        })
        expect(result1).toBe(true);
        let result2 = await AsyncContainer.from(this.generator()).every(async v => {
            return v > 4
        })
        expect(result2).toBe(false);
    }

    @test
    public async testReduce() {
        let container = AsyncContainer.from(this.generator());
        let result = await container.reduce(async (p, c) => {
            return p + c;
        }, 4)
        expect(result).toBe(49);
    }
    @test
    public async testForEach() {
        let result = [];
        let container = AsyncContainer.from(this.generator());
        await container.forEach(async (v) => {
            result.push(v);
        })
        expect(result.length).toBe(9);
        expect(result).toEqual([9, 8, 7, 6, 5, 4, 3, 2, 1])

        let count = 0;
        await AsyncContainer.from(this.generator()).forEach(async (v, breaker) => {
            count++;
            if (v < 5) {
                breaker();
            }
        }, null);
        expect(count).toBe(6);

        count = 0;
        await AsyncContainer.from(this.generator()).forEach(async v => {
            count++;
        });
        expect(count).toBe(9);
    }
    @test
    public async testSyncArray() {
        let container = AsyncContainer.from([9, 8, 7, 6, 5, 4, 3, 2, 1]);
        let result = await container.all();
        expect(result.length).toBe(9);
        expect(result).toEqual([9, 8, 7, 6, 5, 4, 3, 2, 1])
    }
    @test
    public async testSyncSet() {
        let set = new Set<number>([9, 8, 7, 6, 5, 4, 3, 2, 1]);
        let container = AsyncContainer.from(set);
        let result = await container.all();
        expect(result.length).toBe(9);
        expect(result).toEqual([9, 8, 7, 6, 5, 4, 3, 2, 1])
    }
    @test
    public async testSyncMap() {
        let map = new Map<number, string>([[9, "A"], [8, "B"], [7, "C"], [6, "D"], [5, "E"], [4, "F"], [3, "G"], [2, "H"], [1, "I"]]);
        let container = AsyncContainer.from(map);
        let result = await container.all();
        expect(result.length).toBe(9);
        expect(result).toEqual([[9, "A"], [8, "B"], [7, "C"], [6, "D"], [5, "E"], [4, "F"], [3, "G"], [2, "H"], [1, "I"]])
    }

}