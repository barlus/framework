///<reference path="../typing/dom.d.ts"/>
import {globals} from "@barlus/runtime/globals";
import {FORCE_RENDER} from "./constants";
import {queue, render} from "./render";
import {PreactElement,Component,ComponentConstructor,FunctionalComponent,ComponentProps} from "./node";


export abstract class Tag<P = {}, S = {}> implements Component<P,S> {
    static create<P,S>(node: ComponentConstructor<P, S> | FunctionalComponent<P> | string, attributes: JSX.HTMLAttributes & P = null, ...children: JSX.Nodes[]): JSX.Element {
        return PreactElement.create<P,S>(node, attributes, ...children);
    }
    static render(node: JSX.Element, parent?: Element | Document, merge?: Element): Node {
        return render(node, parent, merge);
    }
    public _disable: boolean;
    public _parentComponent?: Tag<any, any>;
    public _component?: Tag<any, any>;
    public _dirty: boolean;
    public __key: boolean;
    public __ref: (component: Tag) => void;
    public _renderCallbacks: Function[];
    public context: any;
    public base: Element;
    public state: S;
    public props: P & ComponentProps<this>;
    public prevProps?: P;
    public prevState?: S;
    public prevContext?: any;
    public nextBase?: Element;
    public getChildContext: () => any;
    constructor(props?: P, context?: any) {
        this._dirty = true;
        this.context = context;
        this.props = props as P;
        this.state = this.state || ({} as S);
    }
    static displayName?: string;
    static defaultProps?: any;
    linkState: (name: string) => (event: Event) => void;
    setState<K extends keyof S>(state: ((prev: S, props: P | void) => Pick<S, K>) | Pick<S, K>, callback?: () => void): void {
        let s = this.state;
        if (!this.prevState) {
            this.prevState = Object.assign({}, s);
        }
        Object.assign(s,typeof state === "function" ? state(s, this.props) : state
        );
        if (callback) {
            if (!this._renderCallbacks) {
                this._renderCallbacks = [];
            }
            this._renderCallbacks.push(callback);
        }
        queue.add(this);
    }
    forceUpdate(callback?: () => void): void {
        if (callback) {
            if (!this._renderCallbacks) {
                this._renderCallbacks = [];
            }
            this._renderCallbacks.push(callback);
        }
        queue.renderComponent(this, FORCE_RENDER);
    }
    componentWillMount?(): void;
    componentDidMount?(): void;
    componentWillUnmount?(): void;
    componentWillReceiveProps?(nextProps: P, nextContext: any): void;
    shouldComponentUpdate?(nextProps: P, nextState: S, nextContext: any): boolean;
    componentWillUpdate?(nextProps: P, nextState: S, nextContext: any): void;
    componentDidUpdate?(previousProps: P, previousState: S, previousContext: any): void;
    abstract render(props?: P, state?: S, context?: any): JSX.Element | null;
}

declare global{
    namespace React {
        export function createElement<P,S>(node: ComponentConstructor<P, S> | FunctionalComponent<P> | string, attributes: JSX.HTMLAttributes & P, ...children: JSX.Nodes[]): JSX.Element
        export function render(node: JSX.Element, parent?: Element | Document, merge?: Element): Node;
    }
}
globals.React = {
    createElement:PreactElement.create,
    render:render,
    Fragment:'c'
};