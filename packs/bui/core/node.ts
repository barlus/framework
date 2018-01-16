import {options} from './options';
import {Tag} from './component';

export type AnyComponent<P, S> = FunctionalComponent<P> | ComponentConstructor<P, S>;

export interface Component<P,S> {
    render(p:P,s:S);
}

export interface ComponentConstructor<P, S> {
    new(props?: P, context?: any): Component<P, S>;
}

export interface FunctionalComponent<P> {
    (props?: P & ComponentProps<this>, context?: any): JSX.Element;
    displayName?: string;
    defaultProps?: any;
}

export interface ComponentProps<C extends Component<any, any> | FunctionalComponent<any>> {
    children?: JSX.Nodes;
    key?: string | number | any;
    ref?: (el: C) => void;
}
export class PreactElement<P=any, S=any> {
    static create<P,S>(node: ComponentConstructor<P, S> | FunctionalComponent<P> | string, attributes: JSX.HTMLAttributes & P = null, ...children: JSX.Nodes[]): JSX.Element {
        if (attributes && attributes.children != null) {
            if(children.length === 0){
                children = attributes.children as JSX.Node[];
            }
            delete attributes.children;
        }
        let normalized = [];
        while (children.length) {
            let child = children.shift();
            if (child && Array.isArray(child)) {
                for(let i = child.length; i--;){
                    children.unshift(child[i]);
                }
            } else {
                if (typeof child === 'boolean') {
                    child = null
                }
                if (typeof node !== 'function') {
                    if (child == null) {
                        child = ''
                    } else
                    if (typeof child === 'number') {
                        child = `${child}`;
                    }
                }
                normalized.push(child);
            }
        }
        let p = new PreactElement(node,normalized,attributes);
        if (options.onElementCreated !== undefined) {
            options.onElementCreated(p);
        }
        return p;
    }
    static clone(element: JSX.Element, props: any): JSX.Element {
        return this.create(
            element.nodeName,
            Object.assign(Object.assign({}, element.attributes), props),
            arguments.length>2 ? Array.prototype.slice.call(arguments, 2) : element.children
        );
    }
    readonly nodeName: ComponentConstructor<P, S> | FunctionalComponent<P> | string;
    readonly children: JSX.Nodes[];
    readonly attributes?: Dictionary;
    readonly key?: string;
    constructor(name: ComponentConstructor<P, S> | FunctionalComponent<P> | string, children: JSX.Nodes[], attributes?: Dictionary, key?: string) {
        this.nodeName = name;
        this.children = children;
        this.attributes = attributes == null ? void 0 : attributes;
        this.key = key || attributes == null ? void 0 : attributes.key;
    }
}

export interface Attributes {
    key?: Key;
}
export type Key = string | number;
export type Ref<T> = string | {
    bivarianceHack(instance: T | null): any
}["bivarianceHack"];
export interface ClassAttributes<T> {
    children:any;
    ref?: Ref<T>;
}
export interface PreactAttributes {
    children?: JSX.Nodes;
    dangerouslySetInnerHTML?: {
        __html: string;
    };
}
declare global {
    namespace JSX {
        type Node = Element|string|boolean|number;
        type Nodes = (Node|Node[])|(Node|Node[])[];
        interface IntrinsicAttributes extends Attributes { }
        interface IntrinsicClassAttributes<T> extends ClassAttributes<T> { }
        interface HTMLAttributes extends PreactAttributes {}
        interface Element extends PreactElement { }
        interface ElementClass extends Tag<any, any> { }
        interface ElementAttributesProperty { props: {}; }
        interface ElementChildrenAttribute { children: {}; }
        interface ElementAttributesProperty { props: {}; }
    }
}