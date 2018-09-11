import {process}                  from "@barlus/bone/node/process";
import {Plan, Probe, Suite, Test} from "../core";
import {MatchError}               from "../errors";
import {TestReporter}             from "../reporter";
import {stringify}                from "../stringify";
//#region public APIs and exports
export class IdeaReporter extends TestReporter {
  protected plan: Plan;
  public onPlanStart(plan: Plan) {
    this.log("enteredTheMatrix");
    this.log("testingStarted");
    this.log("testCount", { count: plan.cases.length });
    this.plan = plan;
    plan.duration = Date.now();
  }
  public onSuiteStart(suite: Suite) {
    suite.duration = Date.now();
    this.log("testSuiteStarted", {
      nodeId: suite.key,
      name: suite.description,
      parentNodeId: 0,
      running: "true",
      nodeType: "suite"
    });
  }
  public onTestStart(test: Test) {
    // test.duration = Date.now();
    // this.log("testSuiteStarted", {
    //     nodeId: test.name,
    //     parentNodeId: test.suite.key,
    //     name: test.description,
    //     running: "true",
    //     nodeType: "suite",
    //     locationHint: `file://${test.file}:${test.line}:${test.column}`,
    // });
  }
  public onProbeStart(probe: Probe) {
    probe.duration = Date.now();
    this.log("testStarted", {
      nodeId: this.plan.cases.indexOf(probe) + 1,
      parentNodeId: probe.test.suite.key,
      name: probe.test.description + (probe.primary ? '' : `(${probe.args.join(", ")})`),
      running: "true",
      nodeType: "test",
      locationHint: `file://${probe.test.file}:${probe.test.line}:${probe.test.column}`,
    });
  }
  public onProbeFinish(probe: Probe) {
    const duration = probe.duration = Date.now() - probe.duration;
    let result = "testFinished";
    switch (probe.result) {
      case "ERROR":
      case "FAILED":
        result = "testFailed";
        break;
      case "SKIPED":
        result = "testIgnored";
        break;
    }
    const error = probe.error;
    const command = {
      nodeId: this.plan.cases.indexOf(probe) + 1,
      duration,
    };
    if (probe.test.isIgnored) {
      Object.assign(command, {
        message: probe.test.ignoreReason,
      });
    }
    if (error instanceof Error) {
      Object.assign(command, {
        message: probe.error.message,
        details: probe.error.stack,
      });
    }
    if ((error instanceof MatchError) && error.expected != void 0 && error.actual != void 0) {
      Object.assign(command, {
        expected: stringify(error.expected),
        actual: stringify(error.actual),
      });
    }
    this.log(result, command);
  }
  public onTestFinish(test: Test) {
    // test.duration = Date.now() - test.duration;
    // this.log("testSuiteFinished", {
    //     nodeId: test.name,
    // });
  }
  public onSuiteFinish(suite: Suite) {
    suite.duration = Date.now() - suite.duration;
    this.log("testSuiteFinished", {
      nodeId: suite.key,
    });
  }
  public onPlanFinish(plan: Plan) {
    plan.duration = Date.now() - plan.duration;
    this.log("testingFinished");
  }
  protected log(command: string, params?: any) {
    let args = "";
    if (params) {
      for (const i in params) {
        if (typeof params[ i ] != "undefined") {
          args += ` ${i}='${escapeAttributeValue(params[ i ])}'`;
        }
      }
    }
    process.stdout.write(`##teamcity[${command}${args}]\n`);
  }
}
//#endregion
//#region private utils and formatting
const CHARS = initEscapeChars({
  "n": "\n",
  "r": "\r",
  "x": "\u0085",
  "l": "\u2028",
  "p": "\u2029",
  "|": "|",
  "'": "'",
  "[": "[",
  "]": "]",
});
function escapeAttributeValue(str) {
  if (!isAttributeValueEscapingNeeded(str)) {
    return str;
  }
  let res = "", len = str.length;
  for (let i = 0; i < len; i++) {
    const escaped = CHARS.get(str.charCodeAt(i));
    if (escaped) {
      res += "|";
      res += escaped;
    }
    else {
      res += str.charAt(i);
    }
  }
  return res;
}
function isAttributeValueEscapingNeeded(str) {
  const len = str.length;
  for (let i = 0; i < len; i++) {
    if (CHARS.get(str.charCodeAt(i))) {
      return true;
    }
  }
  return false;
}
function initEscapeChars(map: { [ k: string ]: string }) {
  return Object.keys(map).reduce<{ [ k: number ]: string, get(ch: number): string }>((mapped, key) => {
    const toChar = key;
    const fromChar = map[ key ];
    if (fromChar.length !== 1 || toChar.length !== 1) {
      throw new Error("String length should be 1");
    }
    const fromCharCode = fromChar.charCodeAt(0);
    if (typeof mapped[ fromCharCode ] === "undefined") {
      mapped[ fromCharCode ] = toChar;
    } else {
      throw new Error("Bad mapping");
    }
    return mapped;
  }, {
    get(c) {
      return this[ c ];
    },
  });
}
//#endregion
