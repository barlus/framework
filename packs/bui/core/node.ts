///<reference path="../typing/jsx.d.ts"/>
import {globals} from '@barlus/runtime/globals';
import {options} from './options';

export class PreactElement<P=any, S=any> implements JSX.Element {


    readonly nodeName: JSX.ComponentConstructor<P, S> | JSX.FunctionalComponent<P> | string;
    readonly children: JSX.Nodes[];
    readonly attributes?: Dictionary;
    readonly key?: string;
    constructor(name: JSX.ComponentConstructor<P, S> | JSX.FunctionalComponent<P> | string, children: JSX.Nodes[], attributes?: Dictionary, key?: string) {
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
        export interface Element extends PreactElement {}
        export function createElement<P,S>(node: ComponentConstructor<P, S> | FunctionalComponent<P> | string, attributes: Attributes & P, ...children: Nodes[]): Element;
        export function cloneElement(element: JSX.Element, props: any): JSX.Element;
    }
}

export function cloneElement(element: JSX.Element, props: any): JSX.Element {
    return createElement(
        element.nodeName,
        Object.assign(Object.assign({}, element.attributes), props),
        arguments.length>2 ? Array.prototype.slice.call(arguments, 2) : element.children
    );
}
export function createElement<P,S>(node: JSX.ComponentConstructor<P, S> | JSX.FunctionalComponent<P> | string, attributes: JSX.Attributes & P = null, ...children: JSX.Nodes[]): JSX.Element {
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

globals.JSX = {
    cloneElement:cloneElement,
    createElement:createElement,
};