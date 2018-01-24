import {stringify} from "./stringify";
import {INameable} from './interfaces';
import {SpyCallCountType} from './matchers';
import {FunctionSpy} from './spying';
export class MatchError extends Error {
    protected _actual: any;
    public get actual(): any {
        return this._actual;
    }
    protected _expected: any;
    public get expected(): any {
        return this._expected;
    }
    public constructor(message?: string, expectedValue?: any, actualValue?: any) {
        super(message);
        this._actual = actualValue;
        this._expected = expectedValue;
        Object.setPrototypeOf(this,new.target.prototype);
        this.name = new.target.name;
    }
}
export class ContentsMatchError extends MatchError {
    public constructor(actualValue: any, expectedContent: any, shouldMatch: boolean) {
        super();
        this.message = `Expected ${stringify(actualValue)} ${!shouldMatch ? "not " : ""}` +
            `to contain ${stringify(expectedContent)}.`;
        this._actual = actualValue;
        this._expected = expectedContent;
    }
}
export class EmptyMatchError extends MatchError {

    public constructor(actualValue: any, shouldMatch: boolean) {
        super();

        const value = (typeof actualValue === "string") ? actualValue : stringify(actualValue);

        this.message = `Expected "${value}" ${shouldMatch ? "to be" : "not to be"} empty.`;

        this._actual = actualValue;
    }
}
export class EqualMatchError extends MatchError {

    public constructor(actualValue: any, expectedValue: any, shouldMatch: boolean) {
        super();

        this.message = `Expected ${stringify(actualValue)} ${!shouldMatch ? "not " : ""}` +
            `to be equal to ${stringify(expectedValue)}.`;
        this._expected = expectedValue;
        this._actual = actualValue;
    }
}
export class ErrorMatchError extends MatchError {

    public constructor(actualError: Error | null,
                       shouldMatch: boolean,
                       expectedErrorType?: new (...args: Array<any>) => Error,
                       expectedErrorMessage?: string) {
        super();

        this._setErrorMessage(actualError, shouldMatch, expectedErrorType, expectedErrorMessage);

        this._actual = `${actualError ? (actualError.constructor as INameable).name + " " : ""}` +
            `error was ${!actualError ? "not " : ""}thrown` +
            `${actualError ? " with message \"" + actualError.message + "\"" : ""}.`;

        this._expected = `${expectedErrorType ? (expectedErrorType as INameable).name + " " : ""}` +
            `error ${!shouldMatch ? "not " : ""}to be thrown` +
            `${expectedErrorMessage ? " with message \"" + expectedErrorMessage + "\"" : ""}.`;
    }

    private _setErrorMessage(actualError: Error | null,
                             shouldMatch: boolean,
                             expectedErrorType?: new (...args: Array<any>) => Error,
                             expectedErrorMessage?: string) {

        if (expectedErrorType || expectedErrorMessage) {
            this._setWrongSpecificErrorMessage(actualError, shouldMatch, expectedErrorType, expectedErrorMessage);
        }
        else {
            if (shouldMatch) {
                this.message = `Expected an error to be thrown but no errors were thrown.`;
            }
            else {
                this.message = `Expected an error not to be thrown but an error was thrown.`;
            }
        }
    }

    private _setWrongSpecificErrorMessage(actualError: Error | null,
                                          shouldMatch: boolean,
                                          expectedErrorType?: new (...args: Array<any>) => Error,
                                          expectedErrorMessage?: string) {

        if (!expectedErrorType
            || (expectedErrorMessage &&
                actualError instanceof expectedErrorType &&
                expectedErrorMessage !== actualError.message)) {

            this._setWrongMessageMessage(shouldMatch, expectedErrorMessage);
        }
        else if (expectedErrorMessage === undefined ||
            (actualError &&
                expectedErrorMessage === actualError.message &&
                !(actualError instanceof expectedErrorType))) {

            this._setWrongTypeMessage(actualError, shouldMatch, expectedErrorType);
        }
        else {
            this._setWrongMessageAndTypeMessage(shouldMatch, expectedErrorType, expectedErrorMessage);
        }
    }

    private _setWrongMessageMessage(shouldMatch: boolean, expectedErrorMessage?: string) {
        this.message = `Expected an error with message "${expectedErrorMessage}" ` +
            `to ${!shouldMatch ? "not " : ""}have been thrown, ` +
            `but it was${!shouldMatch ? "" : "n't"}.`;
    }

    private _setWrongMessageAndTypeMessage(shouldMatch: boolean,
                                           expectedErrorType?: new (...args: Array<any>) => Error,
                                           expectedErrorMessage?: string) {

        this.message = `Expected an error with message "${expectedErrorMessage}" ` +
            `and type ${(expectedErrorType as INameable).name} to ${!shouldMatch ? "not " : ""}` +
            `have been thrown, but it was${!shouldMatch ? "" : "n't"}.`;
    }

    private _setWrongTypeMessage(actualError: Error | null,
                                 shouldMatch: boolean,
                                 expectedErrorType?: new (...args: Array<any>) => Error) {

        this.message = `Expected an error of type ${(expectedErrorType as INameable).name} ` +
            `to ${!shouldMatch ? "not " : ""}have been thrown, ` +
            `but ${shouldMatch ? (actualError as INameable).name + " was thrown instead" : "it was"}.`;
    }
}
export class ExactMatchError extends MatchError {
    public constructor(actualValue: any, expectedValue: any, shouldMatch: boolean) {
        super();
        this.message = `Expected ${stringify(actualValue)} ${!shouldMatch ? "not " : ""}` +
            `to be ${stringify(expectedValue)}.`;
        this._expected = expectedValue;
        this._actual = actualValue;

    }
}
export class FunctionCallCountMatchError extends MatchError {

    private static _bulidMessage(shouldMatch: boolean,
                                 expectedCallCount: number,
                                 countType: SpyCallCountType,
                                 args?: Array<any>) {

        return `Expected function ${!shouldMatch ? "not " : ""}to be called` +
            `${args ? " with " + stringify(args) : ""}` +
            `${countType === SpyCallCountType.GreaterThan ? " greater than" : ""}` +
            `${countType === SpyCallCountType.LessThan ? " less than" : ""} ${expectedCallCount} time` +
            `${expectedCallCount === 1 ? "" : "s"}.`;
    }

    private static _buildExpectedValue(shouldMatch: boolean,
                                       expectedCallCount: number,
                                       countType: SpyCallCountType,
                                       args?: Array<any>) {
        return `function ${!shouldMatch ? "not " : ""}to be called` +
            `${args ? " with " + stringify(args) : ""}` +
            `${countType === SpyCallCountType.GreaterThan ? " greater than" : ""}` +
            `${countType === SpyCallCountType.LessThan ? " less than" : ""} ` +
            `${expectedCallCount} time${expectedCallCount === 1 ? "" : "s"}.`;
    }

    private static _buildActualValue(actualValue: FunctionSpy, args?: Array<any>) {
        return `function was called` +
            `${args && actualValue.calls.length ? " with " +
                actualValue.calls.map(call => stringify(call.args)).join(", ") : ""} `
            + `${actualValue.calls.length} time${actualValue.calls.length === 1 ? "" : "s"}.`;
    }

    public constructor(actualValue: FunctionSpy,
                       shouldMatch: boolean,
                       expectedCallCount: number,
                       countType: SpyCallCountType,
                       args?: Array<any>) {

        super(FunctionCallCountMatchError._bulidMessage(shouldMatch, expectedCallCount, countType, args),
            FunctionCallCountMatchError._buildExpectedValue(shouldMatch, expectedCallCount, countType, args),
            FunctionCallCountMatchError._buildActualValue(actualValue, args));
    }
}
export class FunctionCallMatchError extends MatchError {

    public constructor(actualValue: FunctionSpy, shouldMatch: boolean, args?: Array<any>) {

        super(
            `Expected function ${!shouldMatch ? "not " : ""}to be called` +
            `${args ? " with " + stringify(args) : ""}.`);

        const calls = actualValue.calls;

        this._actual = `function was ${shouldMatch && !(args && calls.length) ? "not " : ""}called` +
            `${args && calls.length ? " with " + calls.map(call => stringify(call.args)).join(", ") : ""}.`;

        this._expected =
            `function ${!shouldMatch ? "not " : ""}to be called` +
            `${args ? " with " + stringify(args) : ""}.`;
    }
}
export class GreaterThanMatchError extends MatchError {

    public constructor(actualValue: number, lowerLimit: number, shouldMatch: boolean) {
        super(`Expected ${actualValue} ${!shouldMatch ? "not " : ""}to be greater than ${lowerLimit}.`);

        this._actual = actualValue;
        this._expected = `a number ${shouldMatch ? "" : "not "}greater than ${lowerLimit}`;
    }
}
export class LessThanMatchError extends MatchError {

    public constructor(actualValue: number, upperLimit: number, shouldMatch: boolean) {
        super(`Expected ${actualValue} ${!shouldMatch ? "not " : ""}to be less than ${upperLimit}.`);

        this._actual = actualValue;
        this._expected = `a number ${shouldMatch ? "" : "not "}less than ${upperLimit}`;
    }
}
export class PropertySetMatchError extends MatchError {

    public constructor(actualValue: any, shouldMatch: boolean, value?: any) {

        super(
            `Expected property ${!shouldMatch ? "not " : ""}to be set` +
            `${arguments.length === 3 ? " to " + stringify(value) + "" : ""}.`);

        const setCalls = actualValue.setCalls;

        this._actual =
            `property was ${shouldMatch && !(arguments.length === 3 && setCalls.length) ? "not " : ""}` +
            `set${arguments.length === 3 && setCalls.length ? " to " + this._stringifyArguments(setCalls) : ""}.`;

        this._expected =
            `property ${!shouldMatch ? "not " : ""}to be set${arguments.length === 3 ? " to " + stringify(value) : ""}.`;
    }

    private _stringifyArguments(setCalls: any): string {
        return setCalls.map((call: any) => stringify(call.args[0])).join(", ");
    }
}
export class RegexMatchError extends MatchError {

    public constructor(actualValue: any, expectedRegex: RegExp, shouldMatch: boolean) {
        super(`Expected ${stringify(actualValue)} ${!shouldMatch ? "not " : ""}to conform to ${expectedRegex}.`,
            expectedRegex,
            actualValue);
    }
}
export class TestTimeoutError extends MatchError {
    public constructor(testTimeout: number) {
        super(`The test exceeded the given timeout of ${testTimeout}ms.`);
    }
}
export class TruthyMatchError extends MatchError {
    public constructor(actualValue: any, shouldMatch: boolean) {
        super(`Expected ${stringify(actualValue)} ${!shouldMatch ? "not " : ""}to be truthy.`);

        this._actual = actualValue;
        this._expected = `${shouldMatch ? "truthy" : "falsy"}`;
    }
}