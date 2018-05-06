import { isProduction } from '../env';
import { Atom } from "../core/atom"
import { IObservableArray } from "../types/observablearray"
import { ObservableMap } from "../types/observablemap"
import { IComputedValue } from "../core/computedvalue"
import { Lambda } from "../utils/utils"
import { getAtom } from "../types/type-utils"
import { IObservable } from "../core/observable"
import { fail } from "../utils/utils"

export function onBecomeObserved(
    value: IObservable | IComputedValue<any> | IObservableArray<any> | ObservableMap<any, any>,
    listener: Lambda
): Lambda
export function onBecomeObserved<K, V = any>(
    value: ObservableMap<K, V> | Object,
    property: K,
    listener: Lambda
): Lambda
export function onBecomeObserved(thing, arg2, arg3?): Lambda {
    return interceptHook("onBecomeObserved", thing, arg2, arg3)
}
Atom.prototype.init = function(onBecomeObservedHandler,onBecomeUnobservedHandler){
    onBecomeObserved(this, onBecomeObservedHandler);
    onBecomeUnobserved(this, onBecomeUnobservedHandler);
};
export function onBecomeUnobserved(
    value: IObservable | IComputedValue<any> | IObservableArray<any> | ObservableMap<any, any>,
    listener: Lambda
): Lambda
export function onBecomeUnobserved<K, V = any>(
    value: ObservableMap<K, V> | Object,
    property: K,
    listener: Lambda
): Lambda
export function onBecomeUnobserved(thing, arg2, arg3?): Lambda {
    return interceptHook("onBecomeUnobserved", thing, arg2, arg3)
}

function interceptHook(hook: "onBecomeObserved" | "onBecomeUnobserved", thing, arg2, arg3) {
    const atom: IObservable =
        typeof arg2 === "string" ? getAtom(thing, arg2) : getAtom(thing) as any
    const cb = typeof arg2 === "string" ? arg3 : arg2
    const orig = atom[hook]

    if (typeof orig !== "function")
        return fail(!isProduction && "Not an atom that can be (un)observed")

    atom[hook] = function() {
        orig.call(this)
        cb.call(this)
    }
    return function() {
        atom[hook] = orig
    }
}
