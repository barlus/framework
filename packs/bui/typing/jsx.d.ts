///<reference path="./dom.d.ts"/>
// interface Element {}
// interface Event {}
// interface Node {}
declare namespace JSX {
    export type Node = Element|string|number|boolean|null|(Element|string|number|boolean|null)[];
    export type Nodes = Node[]|Node;
    export interface Component<P=any, S=any> {
        render(p?:P,s?:S,c?:any):Element | null;
    }
    export interface ComponentConstructor<P, S> extends Function {
        prototype:Component<P, S>;
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
    export type AnyComponent<P, S> = FunctionalComponent<P> | ComponentConstructor<P, S>;

    export interface Event {}
    export interface EventHandler<E extends Event=Event> {
        (event: E): void;
    }
    export interface Attributes {
        id?: string;
        class?: string | { [key: string]: boolean };
        style?: any;
        onLoad?: EventHandler;
        children?:Nodes;
    }
    export interface Element {}
    export interface ElementClass { }
    export interface ElementAttributesProperty { props: {}; }
    export interface ElementChildrenAttribute { children: {}; }
    export interface IntrinsicAttributes { }
    export interface IntrinsicClassAttributes<T> { }
    export interface IntrinsicElements {
        a: Attributes;
        b: Attributes;
        div: Attributes;
        span: Attributes;
    }
}
