import '@barlus/runtime';
import {container} from "@barlus/runtime/inject/injection";
import {injectable} from '@barlus/runtime/inject/decorators';

import {TypeStyle, ReactComponent} from '@barlus/bui';
import {NestedCSSProperties} from './typing/css';

class CSSHelper {
    static extend(source:NestedCSSProperties,target:NestedCSSProperties){
        for ( let key in target ) {
            if ( key in source ) {
                if ( (typeof target[key] == 'object') || (typeof source[key] == 'object') ) {
                    source[key] = this.extend(source[key],target[key]);
                } else {
                    source[key] = target[key];
                }
            } else {
                source[key] = target[key];
            }
        }
        return source;
    }

    static merge(...args:NestedCSSProperties[]):NestedCSSProperties{
        let properties:NestedCSSProperties = args.shift();

        for ( let p of args ) {
            properties = this.extend(properties,(p as NestedCSSProperties));
        }

        return properties;
    }
}

let decorator:Decorator;
export function style(css: NestedCSSProperties|NestedCSSProperties[]) {
    if(!decorator){
        decorator = container.resolve(Decorator);
    }
    return (target: Function) => {
        decorator.style(target,css);
    }
}
export class Component<T,S = {}> extends ReactComponent<T,S> {
    get classNames():Array<string>{
        return Object.defineProperty(this,'classNames',{
            value:function(thiz):Array<string>{
                let classes:Array<string> = [];
                let parent = Object.getPrototypeOf(thiz);
                while (parent instanceof Component) {
                    if ( Reflect.hasOwnMetadata('component:style',parent.constructor) ) {
                        let cname = parent.constructor.name;
                        classes.push(cname);
                    }
                    parent = Object.getPrototypeOf(parent);

                }

                if( thiz.props.className ) {
                    thiz.props.className.trim().split(/\s+/).forEach(c => {
                        if (!classes.includes(c)) {
                            classes.push(c);
                        }
                    });
                }

                return classes;
            }(this),
            writable:true
        }).classNames;
    }
}

@injectable
export class Decorator {
    private ts:TypeStyle;
    constructor( ts:TypeStyle){
        this.ts = ts;
    }
    style(target:Function,css:NestedCSSProperties|NestedCSSProperties[]){
        Reflect.defineMetadata('component:style',css,target);
        if (!(target.prototype instanceof Component)) {
            throw new Error('Elements must extends base class Element')
        }
        const className: string = target.name;
        const render = target.prototype.render;
        if (Array.isArray(css)){
            css = CSSHelper.merge(...css);
        }
        this.ts.cssRule(`.${className}`, css as NestedCSSProperties);
    }
}


