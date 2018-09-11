import {Decorator} from '@barlus/runtime/decorator';


export function dec(target: any, key?: any, desc?: any): any {
  console.info(Decorator.info(arguments).toString());
}