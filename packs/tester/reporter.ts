import {Probe, Plan, Suite, Test} from './core';
export class TestReporter {
    protected log(...args) {
        console.log(...args);
    }
    public onPlanStart(plan: Plan) {
    }
    public onSuiteStart(suite: Suite) {
        this.log(`${suite.key} # ${suite.description}`);
    }
    public onTestStart(test: Test) {
        this.log(`  ${test.key} # ${test.description}`);
        this.log(`    at ${test.file}:${test.line}`);
    }
    public onProbeStart(input: Probe) {
    }
    public onCaseFinish(output: Probe) {
        let result = ` ✓`;
        switch (output.result) {
            case 'ERROR':
            case 'FAILED':
                result = ` ✘`;
                break;
            case 'SKIPED':
                result = ` !`;
                break;
        }
        this.log(`    ${result} ${output.args.join()}${output.error ? '\n' + output.error.stack : ''}`);
    }
    public onTestFinish(plan: Test) {
    }
    public onSuiteFinish(plan: Suite) {
    }
    public onPlanFinish(plan: Plan) {
    }
}