/// <reference path="./builtins.d.ts"/>
export function builtin(module,init) {
    return (target)=>{
        return init(module.default||module)
    }
}