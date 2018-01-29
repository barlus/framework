import '@barlus/runtime';
import {container} from "@barlus/runtime/inject/injection";
import {injectable} from '@barlus/runtime/inject/decorators';

import {TypeStyle, ReactComponent} from '@barlus/bui';
import {NestedCSSProperties} from './typing/css';

// new TypeStyle({
//     autoGenerateTag: true
// });

let decorator:Decorator;
export function style(css: NestedCSSProperties) {
    if(!decorator){
        decorator = container.resolve(Decorator);
    }
    return (target: Function) => {
        decorator.style(target,css);
    }
}
export class Component<T> extends ReactComponent<T> {

}

@injectable
export class Decorator {
    private ts:TypeStyle;
    constructor(ts:TypeStyle){
        this.ts = ts;
    }
    style(target:Function,css:NestedCSSProperties){
        if (!(target.prototype instanceof Component)) {
            throw new Error('Elements must extends base class Element')
        }
        const className: string = target.name;
        const render = target.prototype.render;
        this.ts.cssRule(`.${className}`, css);
        Object.defineProperty(target.prototype, 'render', {
            value() {
                let parent = target.prototype;
                let classes = [];
                while (parent instanceof Component) {
                    let cname = parent.constructor.name;
                    classes.push(cname);
                    parent = Object.getPrototypeOf(parent);
                }
                const node: JSX.Element = render.apply(this, arguments);
                if (typeof node.name != 'string') {
                    console.info("Warning used on proxy")
                }
                if (!node.attributes) {
                    Object.assign(node, {attributes: {}});
                }
                if (node.attributes.class) {
                    node.attributes.class.trim().split(/\s+/).forEach(c => {
                        if (!classes.includes(c)) {
                            classes.push(c);
                        }
                    });
                }
                node.attributes.class = classes.join(' ');
                return node;
            }
        })
    }
}


