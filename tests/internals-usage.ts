import {Child, Parent} from './internals';
import {internal} from '@barlus/runtime';

const parent:Parent = new Parent();
const child:Child = new Child();


internal.of(parent).__veryUnsafeFunction();
internal.of(child);

console.info(child);
console.info(JSON.stringify(child));