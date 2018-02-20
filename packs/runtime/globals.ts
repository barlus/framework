declare const window, global,require;

export const globals = (function (factory) {
    if (typeof global === 'object') return global;
    if (typeof window === 'object') return window;
    return factory();
})(function () { return this; });

export function polyfill(callback){
    return (target:Function)=>{
        return callback(globals,target,require)||target;
    }
}
