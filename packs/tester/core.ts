import "@barlus/runtime/Reflect";
import {Constructor} from "./interfaces";
import {error} from '../node/util';

export {Result, Plan, Suite, Test, Probe};

type Result = "ERROR" | "FAILED" | "PASSED" | "SKIPED";

class Plan {
    public static suits() {
        return Array.from(classMap.values());
    }
    public duration: number;
    public suits: Suite[];
    public cases: Probe[];
    public tests: Test[];

    constructor(suits: Suite[] = Plan.suits()) {
        this.suits = [];
        this.cases = [];
        this.tests = [];
        suits.forEach((s) => {
            this.suits.push(s);
            s.tests.forEach((t) => {
                this.tests.push(t);
                t.cases.forEach((c) => {
                    this.cases.push(c);
                });
            });
        });
    }

    public toString() {
        const buffer = ["<testsuites>"];
        this.suits.forEach((s) => {
            buffer.push(`  <testsuite name="${s.key}" skipped="${s.isIgnored}">`);
            s.tests.forEach((t) => {
                t.cases.forEach((c, i) => {
                    buffer.push(`    <testcase name="${t.key}.${i}" classname="${s.key}">`);
                    buffer.push(`      <system-out><![CDATA[${JSON.stringify(c.args)}]]></system-out>`);
                    if(t.isIgnored){
                        buffer.push(`      <skipped/>`)
                    }else if(c.error){
                        buffer.push(`      <error message="${c.error.message}" type="${c.error.constructor.name}"><![CDATA[${c.error.stack}]]></error>`);
                    }
                    buffer.push(`    </testcase>`);
                });
            });
            buffer.push(`  </testsuite>`);
        });
        buffer.push("</testsuites>");
        return buffer.join("\n");
    }
}
class Suite {
    public static for(constructor: Constructor | object): Suite {
        const SuiteClass = classFor(constructor);
        if (!SuiteClass) {
            throw new Error("Invalid suite metadata target");
        }
        if (!classMap.has(SuiteClass)) {
            classMap.set(SuiteClass, new Suite(SuiteClass));
        }
        return classMap.get(SuiteClass);
    }
    public key: string;
    public isAsync: boolean;
    public isIgnored: boolean;
    public isFocused: boolean;
    public ignoreReason: string;
    public description: string;
    public duration: number;
    public testSetupMethod: string;
    public testTeardownMethod: string;
    public suiteSetupMethod: string;
    public suiteTeardownMethod: string;
    public class: Constructor;
    public tests: Test[];
    constructor(constructor: Constructor) {
        this.isAsync = false;
        this.isIgnored = false;
        this.isFocused = false;
        this.ignoreReason = "";
        this.class = constructor;
        this.key = constructor.name;
        this.description = constructor.name;
        this.tests = [];
    }
    public ignore(reason?: string) {
        this.isIgnored = true;
        this.ignoreReason = reason;
    }
    public test(key: string): Test {
        const closure = this.class.prototype[key];
        if (!closure.test) {
            this.tests.push(closure.test = new Test(this, key));
        }
        return closure.test;
    }

}
class Test {
    public isAsync: boolean;
    public isIgnored: boolean;
    public isFocused: boolean;
    public ignoreReason?: string;
    public timeout: number;
    public key: string;
    public name: string;
    public description: string;
    public suite: Suite;
    public cases: Probe[];
    public file: string;
    public line: number;
    public column: number;
    public duration: number;
    constructor(suite: Suite, key: string) {
        this.key = key;
        this.suite = suite;
        this.cases = [];
        this.isAsync = false;
        this.isIgnored = false;
        this.isFocused = false;
    }
    public ignore(reason?: string) {
        this.isIgnored = true;
        this.ignoreReason = reason;
    }
    public case(args: any[]) {
        this.cases.push(new Probe(this, args));
    }
}
class Probe {
    public test: Test;
    public args: any[];
    public result: Result;
    public error: Error;
    public duration: number;
    constructor(test: Test, args: any[]) {
        this.test = test;
        this.args = args;
        this.result = null;
        this.error = null;
    }
}
//#region private implementation
const classMap = new Map<Constructor, Suite>();
const classFor = (type: Constructor | object): Constructor => {
    if (typeof type === "function") {
        return type;
    }
    if (typeof type === "object" && "constructor" in type && typeof type.constructor == "function") {
        return type.constructor as Constructor;
    }
};
//#endregion
