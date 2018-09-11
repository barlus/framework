import {process}                  from "@barlus/bone/node/process";
import {colors}                   from "@barlus/bone/utils/colors";
import {Plan, Probe, Suite, Test} from "../core";
import {TestReporter}             from "../reporter";


const line: string = colors.gray(pad(80));
export class CliReporter extends TestReporter {
  protected plan: Plan;
  protected suite: Suite;
  protected test: Test;
  protected case: Probe;
  constructor() {
    super();
  }
  protected log(...args) {
    process.stdout.write(args.join(" "));
  }
  public onPlanStart(plan: Plan) {
    this.plan = plan;
  }
  public onSuiteStart(suite: Suite) {
    this.suite = suite;
    const description = colors.yellow(`# ${suite.description}`);
    this.log(line + "\n");
    this.log(`${colors.white(suite.key)} ${description}\n`);
  }
  public onTestStart(test: Test) {
    this.test = test;
    const description = colors.yellow(`# ${test.description}`);
    const location = colors.cyan(`at ${test.file}:${test.line}:${test.column}`);
    this.log(`  ${test.key} ${description}\n`);
    this.log(`  ${location}\n`);
  }
  public onProbeStart(input: Probe) {
    this.case = input;
  }
  public onProbeFinish(output: Probe) {
    const id = output.test.cases.indexOf(output) + 1;
    let result = colors.green(` ✓${id}`);
    switch (output.result) {
      case "ERROR":
      case "FAILED":
        result = colors.red(` ✘${id}`);
        break;
      case "SKIPED":
        result = colors.blue(` !${id}`);
        break;
    }
    this.log(`  ${result} ${colors.gray(output.test.key)} (${output.args.join(", ")})${formatError(output.error)}\n`);
  }
  public onTestFinish(plan: Test) {
  }
  public onSuiteFinish(plan: Suite) {
  }
  public onPlanFinish(plan: Plan) {
  }
}
function pad(count: number, char: string = "-") {
  let str = "";
  for (let i = 0; i < count; i++) {
    str += char;
  }
  return str;
}
function formatError(e) {
  if (e) {
    const stack = e.stack.split("\n").map((s) => {
      s = s.trim();
      if (s.indexOf("at ") == 0) {
        return "      " + colors.gray(s);
      } else {
        return "    " + colors.red(s);
      }
    });
    return "\n" + stack.join("\n");
  } else {
    return "";
  }
}
