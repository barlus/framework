import {ContainerMatcher} from './matchers/ContainerMatcher';
import {MixedMatcher}     from "./matchers";
import {FunctionMatcher}  from './matchers/FunctionMatcher';
import {FunctionSpy}      from './spying';
import {PropertySpy}      from './spying';
import {NumberMatcher}    from './matchers/NumberMatcher';
import {PropertyMatcher}  from './matchers/PropertyMatcher';
import {EmptyMatcher}     from './matchers/EmptyMatcher';
import {StringMatcher}    from './matchers/StringMatcher';
import {Matcher}          from './matchers/Matcher';
import {MatchError}       from './errors';


export {PropertyMatcher, PropertySpy, NumberMatcher};
//
export declare type MatcherConstructor = new (actualValue: any) => MixedMatcher;
export declare type MatcherFunction = (actualValue: any) => MixedMatcher;
export interface IExpect {
  (actualValue: number): NumberMatcher;
  (actualValue: string): StringMatcher;
  (actualValue: FunctionSpy | ((...args: any[]) => any)): FunctionMatcher;
  <T>(actualValue: T[]): ContainerMatcher<T[], T>;
  <T>(actualValue: PropertySpy<T>): PropertyMatcher<T>;
  <T>(actualValue: T): Matcher<T>;
  (actualValue: object): EmptyMatcher<object>;
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