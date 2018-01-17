///<reference path="./typing/dom.d.ts"/>
import {globals} from '@barlus/runtime/globals';
declare global {
    namespace JSX {
        export type Node = Element | string | number | boolean | null | (Element | string | number | boolean | null)[];
        export type NodeFactory<P, S> = FunctionalComponent<P> | ComponentConstructor<P, S>;
        export type NodeName<P, S> = NodeFactory<P, S> | string;
        export type Nodes = Node[] | Node;
        export const renderer: {
            render(component: Component,options?:any);
        };
        export const options: {
            syncComponentUpdates: boolean;
            event(e: any);
            onElementCreated(element: JSX.Element);
            afterMount(component: JSX.Component);
            afterUpdate(component: JSX.Component);
            beforeUnmount(component: JSX.Component);
        };
        export interface Component<P=any, S=any> {
            props: P & ComponentProps<this>;
            state: S;
            render(p?: P, s?: S, c?: any): Element | null;
        }
        export interface ComponentConstructor<P, S> extends Function {
            prototype: Component<P, S>;
            new(props?: P, context?: any): Component<P, S>;
        }
        export interface FunctionalComponent<P> extends Function {
            (props?: P & ComponentProps<this>, context?: any): JSX.Element;
            displayName?: string;
            defaultProps?: any;
        }
        export interface ComponentProps<C extends Component<any, any> | FunctionalComponent<any>> {
            children?: JSX.Node[];
            key?: string | number | any;
            ref?: (el: C) => void;
        }
        export interface Event {
        }
        export interface EventHandler<E extends Event=Event> {
            (event: E): void;
        }
        export interface Attributes {
            id?: string;
            class?: string | { [key: string]: boolean };
            style?: any;
            onLoad?: EventHandler;
            children?: Nodes;
        }
        export interface ElementClass {
        }
        export interface ElementAttributesProperty {
            props: {};
        }
        export interface ElementChildrenAttribute {
            children: {};
        }
        export interface IntrinsicAttributes {
        }
        export interface IntrinsicClassAttributes<T> {
        }
        export interface IntrinsicElements {
            a: Attributes & { href?: string };
            b: Attributes;
            div: Attributes;
            span: Attributes;
        }
        //
        export interface Element extends JsxElement {
        }
        export function createElement<P, S>(node: NodeName<P, S>, attributes: Attributes & P, ...children: Nodes[]): Element;
        export function cloneElement(element: Element, props: any): Element;
        export function requestRender<P,S>(component: JSX.Component, force?: boolean, state?:Partial<S>|((prev: S, props?: P) => Partial<S>), callback?:()=>void): boolean;
    }
}
export const renderer = {
    render<P,S>(component: JSX.Component, force?: boolean, state?:Partial<S>|((prev: S, props?: P) => Partial<S>), callback?:()=>void): boolean{
        return false;
    }
};
export const options = {
    syncComponentUpdates: true,
    event(e: any) {
    },
    onElementCreated(element: JSX.Element) {
    },
    afterMount(component: JSX.Component) {
    },
    afterUpdate(component: JSX.Component) {
    },
    beforeUnmount(component: JSX.Component) {
    }
};
export class JsxElement<P=any, S=any> implements JSX.Element {
    readonly name: JSX.ComponentConstructor<P, S> | JSX.FunctionalComponent<P> | string;
    readonly children: JSX.Nodes[];
    readonly attributes?: Dictionary;
    readonly key?: string;
    constructor(node: JSX.ComponentConstructor<P, S> | JSX.FunctionalComponent<P> | string, attributes: Dictionary, children: JSX.Nodes[], key?: string) {
        if (attributes && attributes.children != null) {
            if (!Array.isArray(attributes.children)) {
                attributes.children = [attributes.children];
            }
            if (children.length === 0) {
                children = attributes.children as JSX.Node[];
            }
            delete attributes.children;
        }
        let normalized = [];
        while (children.length) {
            let child = children.shift();
            if (child && Array.isArray(child)) {
                for (let i = child.length; i--;) {
                    children.unshift(child[i]);
                }
            } else {
                if (typeof child === 'boolean') {
                    child = null
                }
                if (typeof node !== 'function') {
                    if (child == null) {
                        child = ''
                    } else if (typeof child === 'number') {
                        child = `${child}`;
                    }
                }
                normalized.push(child);
            }
        }
        this.name = node;
        this.children = normalized;
        this.attributes = attributes == null ? void 0 : attributes;
        this.key = key || attributes == null ? void 0 : attributes.key;
    }
}
export class JsxComponent<P = {}, S = {}> implements JSX.Component<P,S> {
    public props : P & JSX.ComponentProps<this>;
    public state : S;
    public context : any;
    setState(state: (Partial<S>|((prev: S, props?: P) => Partial<S>)), callback?: () => void): void {
        JSX.requestRender(this,false, state, callback);
    }
    forceUpdate(callback?: () => void): void {
        JSX.requestRender(this,true, this.state, callback);
    }
    render(p?: P, s?: S, c?: any): JSX.Element | null {
        return null;
    }
}
export function requestRender<S,P>(component: JSX.Component, force?: boolean, state?:Partial<S>|((prev: S, props?: P) => Partial<S>), callback?:()=>void): boolean {
    if(renderer){
        return renderer.render(component,force,state,callback);
    }else{
        return false;
    }
}
export function cloneElement(element: JSX.Element, props: any): JSX.Element {
    return createElement(
        element.name,
        Object.assign(Object.assign({}, element.attributes), props),
        arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : element.children
    );
}
export function createElement<P, S>(node: JSX.NodeName<P,S>, attributes: JSX.Attributes & P = null, ...children: JSX.Nodes[]): JSX.Element {
    let p = new JsxElement(node, attributes, children);
    if (options.onElementCreated !== undefined) {
        options.onElementCreated(p);
    }
    return p;
}
globals.JSX = {
    options,
    renderer,
    cloneElement,
    createElement,
    requestRender
};