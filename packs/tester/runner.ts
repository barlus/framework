import {Probe, Plan, Suite, Test} from './core';
import {TestTimeoutError} from './errors';
import {TestReporter} from './reporter';
//
export class TestRunner {
    public plan: Plan;
    public reporter: TestReporter;
    public constructor(reporter: TestReporter = new TestReporter()) {
        this.reporter = reporter;
    }
    public async run(plan:Plan = new Plan(), timeout: number=500) {
        this.plan = plan;
        const focusedSuite = plan.suits.find(s=>s.isFocused);
        for(const s of plan.suits){
            if(focusedSuite && !s.isFocused){
                s.ignore(s.ignoreReason||"Focused on other tests")
            }
            const focusedTest = s.tests.find(t=>t.isFocused);
            for(const t of s.tests){
                // if there is one fosued test then all tests which is not focused need to be ignored
                if(focusedTest && !t.isFocused){
                    t.ignore(t.ignoreReason||"Focused on other tests")
                }
                // if suite is ignored all child tests need to be ignored
                if(s.isIgnored){
                    t.ignore('Ignored by suite'+(s.ignoreReason?` because of : ${s.ignoreReason}`:''));
                }
            }
        }

        if (plan.cases.length === 0) {
            throw new Error("no tests to run.");
        }
        this.reporter.onPlanStart(plan);
        for(const suite of plan.suits){
            await this.runSuite(suite);
        }
        this.reporter.onPlanFinish(plan);
    }
    protected instance:any;
    protected async runSuite(suite:Suite){
        await this.setupSuite(suite);
        this.reporter.onSuiteStart(suite);
        for(const test of suite.tests){
            await this.runTest(test);
        }
        this.reporter.onSuiteFinish(suite);
        await this.teardownSuite(suite);
    }
    protected async runTest(test:Test){
        this.reporter.onTestStart(test);
        for(const c of test.cases){
            await this.runProbe(c);
        }
        this.reporter.onTestFinish(test);
    }
    protected async runProbe(probe:Probe){
        this.reporter.onProbeStart(probe);
        if(probe.test.isIgnored) {
            probe.result = 'SKIPED';
        }else{
            try {
                await this.setupTest(probe);
                if (isAsync(this.instance[probe.test.key])) {
                    await timeout(this.instance[probe.test.key](...probe.args), probe.test.timeout);
                } else {
                    this.instance[probe.test.key](...probe.args)
                }
                probe.result = 'PASSED';
                probe.error = null;
            } catch (error) {
                probe.result = 'ERROR';
                probe.error = error;
            } finally {
                try {
                    await this.teardownTest(probe);
                }catch(error) {
                    probe.result = 'ERROR';
                    probe.error = error;
                }
            }
        }
        this.reporter.onCaseFinish(probe);
    }
    protected async setupTest(probe:Probe){
        if(probe.test.suite.testSetupMethod){
            await this.instance[probe.test.suite.testSetupMethod](probe);
        }
    }
    protected async setupSuite(suite:Suite){
        this.instance = new suite.class();
        if(suite.suiteSetupMethod){
            await this.instance[suite.suiteSetupMethod](suite);
        }
    }
    protected async teardownSuite(suite:Suite){
        if(suite.suiteTeardownMethod){
            await this.instance[suite.suiteTeardownMethod](suite);
        }
    }
    protected async teardownTest(forCase:Probe){
        if(forCase.test.suite.testTeardownMethod){
            await this.instance[forCase.test.suite.testTeardownMethod](forCase);
        }
    }
}
const AsyncFunction = Object.getPrototypeOf(async()=>{}).constructor;
const isAsync = (fn)=>{
    return fn instanceof AsyncFunction;
};
const timeout = async (promise,delay=1000) => {
    let timer = null;
    return await Promise.race([
        new Promise((resolve, reject) => {
            timer = setTimeout(reject, delay, new TestTimeoutError(delay));
            return timer;
        }),
        promise.then((value) => {
            clearTimeout(timer);
            return value;
        })
    ]);
};