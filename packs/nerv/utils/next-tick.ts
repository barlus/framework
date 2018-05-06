import { isFunction } from './is'
let resolved = Promise.resolve();
export const nextTick: (fn, ...args) => void = (fn, ...args) => {
    fn = isFunction(fn) ? fn.bind(null, ...args) : fn;
    return resolved.then(fn);
};
