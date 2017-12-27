///<reference path="./dom.d.ts"/>
///<reference path="./jsx.d.ts"/>

import { Component } from "./component";
import { PreactElement,createElement,cloneElement } from "./vnode";
import { render } from "./render";



import { options } from "./options";

export { Component, render, cloneElement, createElement, options , createElement as h};
export default { Component, render, cloneElement, h: createElement, options , createElement:createElement };

export type Key = string | number;
export type Ref<T> = string | {
    bivarianceHack(instance: T | null): any
}["bivarianceHack"];

export interface DangerouslySetInnerHTML {
    __html: string;
}
export interface Attributes {
    key?: Key;
}
export interface ClassAttributes<T> {
    ref?: Ref<T>;
}



export interface PreactAttributes {
    children?: PreactElement | PreactElement[] | string;
    dangerouslySetInnerHTML?: {
        __html: string;
    };
}


declare global {
    namespace JSX {
        interface IntrinsicAttributes extends Attributes { }
        interface IntrinsicClassAttributes<T> extends ClassAttributes<T> { }
        interface HTMLAttributes extends PreactAttributes { }
        interface Element extends PreactElement { }
        interface ElementClass extends Component<any, any> { }
        interface ElementAttributesProperty { props: {}; }
        interface ElementChildrenAttribute { children: {}; }
        interface ElementAttributesProperty { props: {}; }
    }
}



