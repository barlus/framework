import { ContainerMatcher } from "./ContainerMatcher";
import { EmptyMatcher } from "./EmptyMatcher";
import { FunctionMatcher } from "./FunctionMatcher";
import { FunctionSpyMatcher } from "./FunctionSpyMatcher";
import { Matcher } from "./Matcher";
import { NumberMatcher } from "./NumberMatcher";
import { PropertyMatcher } from "./PropertyMatcher";
import { StringMatcher } from "./StringMatcher";

/**
 * Mixin version of all matchers to allow any function to be used at runtime
 */
export class MixedMatcher extends Matcher<any> {

}

applyMixins(
    MixedMatcher,
    ContainerMatcher,
    EmptyMatcher,
    FunctionMatcher,
    FunctionSpyMatcher,
    NumberMatcher,
    PropertyMatcher,
    StringMatcher,
);

function applyMixins(derivedCtor: any, ...baseCtors: any[]) {
    baseCtors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
