import {Path} from "@barlus/bone/node/path";
import {process} from "@barlus/bone/node/process";
import {IdeaReporter} from "@barlus/tester/reporters/idea";
import {TestRunner} from "@barlus/tester/runner";

type TOptions = MochaRunner["options"];

class MochaRunner extends TestRunner {
    public readonly options: {
        files: string[];
        reporter: string;
        timeout?: string;
    };

    public constructor(options: TOptions = getCliOptions()) {
        const ideaReporter = new IdeaReporter();
        const reporterFilename = Path.basename(options.reporter).toLowerCase();
        if (reporterFilename === "mochaintellijreporter.js") {
            super(ideaReporter);
        }
        this.options = options;
    }

    // load and run test modules
    public async run() {
        await this.load();
        return super.run();
    }
    // load modules
    public async load() {
        for (const m of this.options.files) {
            await import(m);
        }
    }
}
const runner = new MochaRunner();
runner.run().catch((ex) => {
    console.error(ex);
    process.exit(1);
});
function getCliOptions(): TOptions {
    const opts = {} as TOptions;
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
}
