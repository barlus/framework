// tslint:disable:no-console
import {process} from "@barlus/node/process";
import {resolve} from "@barlus/node/path";
import {writeFileSync} from "@barlus/node/fs";
import {CliReporter} from "@barlus/tester/reporters/cli";
import {TestRunner} from "@barlus/tester/runner";

async function load(tests:string){
    for(const test of tests){
        await import(resolve(test))
    }
}

async function run(getCliOptions){
    try {
        const options = getCliOptions();
        await load(options.files);
        //
        const reporter = new CliReporter();
        const runner = new TestRunner(reporter);
        await runner.run();
        if(options.report){
           const file = resolve(options.report);
           const junit = runner.plan.toString();
           writeFileSync(file,junit,'utf8');
        }
    } catch (ex) {
        console.error(ex);
    }
}

run(()=>{
    const opts = {} as any;
    const args = [];
    const argv = process.argv.slice(2);
    while (argv.length) {
        const key = argv.shift();
        if (key[0] === key[1] && key[0] === "-") {
            opts[key.substring(2)] = argv.shift();
        } else {
            args.push(key);
        }
    }
    return Object.assign(opts, {files: args});
}).catch(ex=>{
    console.error(ex);
    process.exit(1)
});