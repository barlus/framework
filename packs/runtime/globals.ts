declare const window, global;

export const globals = (function (factory) {
    if (typeof global === 'object') return global;
    if (typeof window === 'object') return window;
    return factory();
})(function () { return this; });

export default globals;
