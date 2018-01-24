import {ContainerMatcher} from './matchers/ContainerMatcher';
import {MixedMatcher} from "./matchers";
import {FunctionMatcher} from './matchers/FunctionMatcher';
import {FunctionSpy, PropertySpy} from './spying';
import {NumberMatcher} from './matchers/NumberMatcher';
import {PropertyMatcher} from './matchers/PropertyMatcher';
import {EmptyMatcher} from './matchers/EmptyMatcher';
import {StringMatcher} from './matchers/StringMatcher';
import {Matcher} from './matchers/Matcher';
import {MatchError} from './errors';
export {PropertyMatcher,PropertySpy};
//
export declare type MatcherConstructor = new (actualValue: any) => MixedMatcher;
export declare type MatcherFunction = (actualValue: any) => MixedMatcher;
export interface IExpect {
    /**
     * Allows checking of test outcomes
     * @param actualValue - the value or function under test
     */
    <T>(actualValue: Array<T>): ContainerMatcher<Array<T>, T>;
    <T>(actualValue: PropertySpy<T>): PropertyMatcher<T>;
    <T>(actualValue: T): Matcher<T>;
    (actualValue: FunctionSpy | ((...args: Array<any>) => any)): FunctionMatcher;
    (actualValue: number): NumberMatcher;
    (actualValue: object): EmptyMatcher<object>;
    (actualValue: string): StringMatcher;
    /**
     * Fails the test with the given message
     * @param message - the message that will be shown in the failure
     */
    fail(message: string): void;
}
//
export const expect = buildExpect<IExpect>(ExpectFunction);
export function buildExpect<ExpectType extends IExpect>(expectFunction: MatcherFunction | MatcherConstructor): ExpectType {
    const EXPECT = ((actualValue: any) => new (expectFunction as MatcherConstructor)(actualValue)) as ExpectType;
    EXPECT.fail = fail;
    return EXPECT;
}
export function ExpectFunction<ActualType>(actualValue: ActualType): Matcher<ActualType> {
    return new MixedMatcher(actualValue);
}
export function fail(message: string) {
    throw new MatchError(message);
}