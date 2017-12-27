import {process} from "@barlus/node/process";

declare const ts;

console.info(`Hello From`);
console.info(`  -> Node: ${process.version}`);
console.info(`  -> TypeScript: ${ts.version}`);