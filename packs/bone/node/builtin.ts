/// <reference path="./builtins.d.ts"/>
import "@barlus/runtime";


export function builtin(module, init) {
  return (target) => {
    return init(module.default || module)
  }
}