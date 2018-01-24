import {injectable, named} from "@barlus/runtime/inject/decorators";
import {container} from "@barlus/runtime/inject/injection";
import {process} from "@barlus/node/process";


declare const ts;
console.info(`Hello From`);
console.info(`  -> Node: ${process.version} ${process.cwd()}`);
console.info(`  -> TypeScript: ${ts.version} ${ts.path}`);