import "@barlus/std";
import {cloneElement, createElement, JsxComponent} from "./jsx";
import {globals} from '../runtime/globals';

declare global {
    namespace React {
        export function createElement<P, S>(node: JSX.ComponentConstructor<P, S> | JSX.FunctionalComponent<P> | string, attributes: JSX.Attributes & P, ...children: JSX.Nodes[]): JSX.Element;
        export function render(node: JSX.Element, parent?: Element, merge?: Element): Node;
    }
}

// render modes
const NO_RENDER = 0;
const SYNC_RENDER = 1;
const FORCE_RENDER = 2;
const ASYNC_RENDER = 3;
//
const ATTR_KEY = Symbol('attributes');
const COMPONENT = Symbol('Component');
const COMPONENT_CLASS = Symbol('ComponentClass');
const COMPONENT_NAME = Symbol('ComponentName');
const COMPONENT_EVENTS = Symbol('ComponentEvents');
const IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
const defer = Promise.resolve().then.bind(Promise.resolve());
const options = JSX.options;

export class Component<P = {}, S = {}> extends JsxComponent<P, S> {
    public _disable: boolean;
    public _parentComponent?: Component<any, any>;
    public _component?: Component<any, any>;
    public _dirty: boolean;
    public __key: boolean;
    public __ref: (component: Component) => void;
    public _renderCallbacks: Function[];
    public context: any;
    public base: Element;
    public state: S;
    public props: P & JSX.ComponentProps<this>;
    public prevProps?: P;
    public prevState?: S;
    public prevContext?: any;
    public nextBase?: Element;
    public getChildContext: () => any;
    constructor(props?: P, context?: any) {
        super();
        this._dirty = true;
        this.context = context;
        this.props = props as P;
        this.state = this.state || ({} as S);
    }
    static displayName?: string;
    static defaultProps?: any;
    linkState: (name: string) => (event: Event) => void;
    setState(state: Partial<S> | ((prev: S, props?: P) => Partial<S>), callback?: () => void): void {
        let s = this.state;
        if (!this.prevState) {
            this.prevState = Object.assign({}, s);
        }
        Object.assign(s, typeof state === "function" ? state(s, this.props) : state);
        if (callback) {
            if (!this._renderCallbacks) {
                this._renderCallbacks = [];
            }
            this._renderCallbacks.push(callback);
        }
        //queue.render(this);
        JSX.requestRender(this);
    }
    forceUpdate(callback?: () => void): void {
        if (callback) {
            if (!this._renderCallbacks) {
                this._renderCallbacks = [];
            }
            this._renderCallbacks.push(callback);
        }
        //queue.render(this, true);
        JSX.requestRender(this, true);
    }
    componentWillMount?(): void;
    componentDidMount?(): void;
    componentWillUnmount?(): void;
    componentWillReceiveProps?(nextProps: P, nextContext: any): void;
    shouldComponentUpdate?(nextProps: P, nextState: S, nextContext: any): boolean;
    componentWillUpdate?(nextProps: P, nextState: S, nextContext: any): void;
    componentDidUpdate?(previousProps: P, previousState: S, previousContext: any): void;
    render(props?: P, state?: S, context?: any): JSX.Element | null{
        return null;
    }
}
export class Renderer {
    protected diffLevel:number = 0;
    protected isSvgMode:boolean = false;
    protected hydrating:boolean = false;
    protected mounts: any = [];
    protected components: any = {};
    protected items: Component[] = [];
    protected dom:Document = null;
    public setup(dom:Document){
        this.dom = dom;
        JSX.renderer.render = <P=any, S=any>(component: JSX.Component, force?: boolean, state?: Partial<S> | ((prev: S, props?: P) => Partial<S>), callback?: () => void): boolean => {
            if(force){
                this.renderComponent(component as Component, FORCE_RENDER);
            }else{
                this.queueComponent(component as Component)
            }
            return true;
        };
    }
    public render(node: JSX.Element, parent?: Element, merge?: Element): Node {
        if(!this.dom){
            this.setup(document);
        }
        return this.diff(merge, node, {}, false, parent, false);
    }
    protected diff(node: Element, element: JSX.Element, context: any, mountAll?: boolean, parent?: Node, componentRoot?: boolean) {
        // diffLevel having been 0 here indicates initial entry into the diff (not a sub diff)
        if (!this.diffLevel++) {
            // when first starting the diff, check if we're diffing an SVG or within an SVG
            this.isSvgMode = this.isSvgNode(parent);
            // hydration is indicated by the existing element to be diffed not having a prop cache
            this.hydrating = node != null && !(node[ATTR_KEY]);
        }
        let ret = this.internalDiff(node, element, context, mountAll, componentRoot);
        // append the element if its a new parent
        if (parent && ret.parentNode !== parent) {
            parent.appendChild(ret);
        }
        // diffLevel being reduced to 0 means we're exiting the diff
        if (!--this.diffLevel) {
            this.hydrating = false;
            // invoke queued componentDidMount lifecycle methods
            if (!componentRoot) {
                this.flushMounts();
            }
        }
        return ret;
    }
    protected internalDiff(node: Node, element: JSX.Node, context: any, mountAll: boolean, componentRoot?: boolean): Node {
        let out = node;
        let prevSvgMode = this.isSvgMode;
        // empty values (null, undefined, booleans) render as empty Text nodes
        if (element == null || typeof element === 'boolean') {
            element = '';
        }
        if (typeof element === 'number') {
            element = `${element}`
        }
        // Fast case: Strings & Numbers create/update Text nodes.
        if (typeof element === 'string') {
            // update if it's already a Text element:
            if (this.isTextNode(node) && node.parentNode && (!node[COMPONENT] || componentRoot)) {
                if (node.nodeValue != element) {
                    node.nodeValue = `${element}`;
                }
            } else {
                // it wasn't a Text element: replace it with one and recycle the old Element
                out = this.dom.createTextNode(element);
                if (node) {
                    if (node.parentNode) {
                        node.parentNode.replaceChild(out, node);
                    }
                    this.recollectNodeTree(node, true);
                }
            }
            out[ATTR_KEY] = true;
            return out;
        }
        let elm = element as JSX.Element;
        // If the VNode represents a Tag, perform a component diff:
        let elementName = elm.name;
        if (typeof elementName === 'function') {
            return this.buildComponentFromVNode(node, elm, context, mountAll);
        }
        // Tracks entering and exiting SVG namespace when descending through the tree.
        this.isSvgMode = elementName === 'svg' ? true : elementName === 'foreignObject' ? false : this.isSvgMode;
        // If there's no existing element or it's the wrong type, create a new one:
        elementName = `${elementName}`;
        if (!node || !this.isNamedNode(node, elementName)) {
            out = this.createNode(elementName, this.isSvgMode);
            if (node) {
                // move children into the replacement element
                while (node.firstChild) {
                    out.appendChild(node.firstChild);
                }
                // if the previous Element was mounted into the DOM, replace it inline
                if (node.parentNode) {
                    node.parentNode.replaceChild(out, node);
                }
                // recycle the old element (skips non-Element element types)
                this.recollectNodeTree(node, true);
            }
        }
        let fc = out.firstChild;
        let props = out[ATTR_KEY];
        let elementChildren = elm.children;
        if (props == null) {
            props = out[ATTR_KEY] = {};
            for (let a = out.attributes, i = a.length; i--;) {
                props[a[i].name] = a[i].value;
            }
        }
        // Optimization: fast-path for elements containing a single TextNode:
        let firstChild: string = elementChildren && elementChildren.length === 1 && typeof elementChildren[0] === 'string' ? elementChildren[0] as string : void 0;
        if (!this.hydrating && firstChild && fc != null && this.isTextNode(fc) && fc.nextSibling == null) {
            if (fc.nodeValue != firstChild) {
                fc.nodeValue = firstChild;
            }
        } else
        // otherwise, if there are existing or new children, diff them:
        if (elementChildren && elementChildren.length || fc != null) {
            this.innerDiffNode(out, elementChildren, context, mountAll, this.hydrating || props.dangerouslySetInnerHTML != null);
        }
        // Apply attributes/props from VNode to the DOM Element:
        this.diffAttributes(out, elm.attributes, props);
        // restore previous SVG mode: (in case we're exiting an SVG namespace)
        this.isSvgMode = prevSvgMode;
        return out;
    }
    protected innerDiffNode(element: Node, vchildren: any[], context: object, mountAll: boolean, isHydrating: boolean) {
        let originalChildren = element.childNodes;
        let children = [];
        let keyed = {};
        let keyedLen = 0;
        let min = 0;
        let len = originalChildren.length;
        let childrenLen = 0;
        let vlen = vchildren ? vchildren.length : 0;
        let j, c, f, vchild, child;
        // Build up a map of keyed children and an Array of unkeyed children:
        if (len !== 0) {
            for (let i = 0; i < len; i++) {
                let child = originalChildren[i],
                    props = child[ATTR_KEY],
                    key = vlen && props ? child[COMPONENT] ? child[COMPONENT].__key : props.key : null;
                if (key != null) {
                    keyedLen++;
                    keyed[key] = child;
                }
                else if (props || (this.isTextNode(child) ? (isHydrating ? child.nodeValue.trim() : true) : isHydrating)) {
                    children[childrenLen++] = child;
                }
            }
        }
        if (vlen !== 0) {
            for (let i = 0; i < vlen; i++) {
                vchild = vchildren[i];
                child = null;
                // attempt to find a node based on key matching
                let key = vchild.key;
                if (key != null) {
                    if (keyedLen && keyed[key] !== undefined) {
                        child = keyed[key];
                        keyed[key] = undefined;
                        keyedLen--;
                    }
                } else
                // attempt to pluck a node of the same type from the existing children
                if (!child && min < childrenLen) {
                    for (j = min; j < childrenLen; j++) {
                        if (children[j] !== undefined && this.isSameNodeType(c = children[j], vchild, isHydrating)) {
                            child = c;
                            children[j] = undefined;
                            if (j === childrenLen - 1) {
                                childrenLen--;
                            }
                            if (j === min) {
                                min++;
                            }
                            break;
                        }
                    }
                }
                // morph the matched/found/created DOM child to match vchild (deep)
                child = this.internalDiff(child, vchild, context, mountAll);
                f = originalChildren[i];
                if (child && child !== element && child !== f) {
                    if (f == null) {
                        element.appendChild(child);
                    } else
                    // child is next node
                    if (child === f.nextSibling) {
                        this.removeNode(f);
                    } else {
                        element.insertBefore(child, f);
                    }
                }
            }
        }
        // remove unused keyed children:
        if (keyedLen) {
            for (let i in keyed) {
                if (keyed[i] !== undefined) {
                    this.recollectNodeTree(keyed[i], false);
                }
            }
        }
        // remove orphaned unkeyed children:
        while (min <= childrenLen) {
            if ((child = children[childrenLen--]) !== undefined) {
                this.recollectNodeTree(child, false);
            }
        }
    }
    protected recollectNodeTree(node: Node, unmountOnly: boolean) {
        let component = node[COMPONENT];
        if (component) {
            // if node is owned by a Tag, unmount that component (ends up recursing back here)
            this.unmountComponent(component);
        } else {
            // If the node's VNode had a ref function, invoke it with null here.
            // (this is part of the React spec, and smart for unsetting references)
            if (node[ATTR_KEY] != null && node[ATTR_KEY].ref) {
                node[ATTR_KEY].ref(null);
            }
            if (unmountOnly === false || node[ATTR_KEY] == null) {
                this.removeNode(node);
            }
            this.removeChildren(node);
        }
    }
    protected removeChildren(node: Node) {
        node = node.lastChild;
        while (node) {
            let next = node.previousSibling;
            this.recollectNodeTree(node, true);
            node = next;
        }
    }
    protected diffAttributes(node: Node, attrs: any, old: any) {
        let name;
        // remove attributes no longer present on the vnode by setting them to undefined
        for (name in old) {
            if (!(attrs && attrs[name] != null) && old[name] != null) {
                this.setAccessor(node as HTMLElement, name, old[name], old[name] = undefined, this.isSvgMode);
            }
        }
        // add new & update changed attributes
        for (name in attrs) {
            if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? node[name] : old[name]))) {
                this.setAccessor(node as HTMLElement, name, old[name], old[name] = attrs[name], this.isSvgMode);
            }
        }
    }
    protected flushMounts() {
        let c;
        while ((c = this.mounts.pop())) {
            if (options.afterMount) {
                options.afterMount(c);
            }
            if (c.componentDidMount) {
                c.componentDidMount();
            }
        }
    }
    protected queueComponent(component: Component){
        if (!component._dirty && (component._dirty = true) && this.items.push(component) == 1) {
            defer(() => {
                const list = this.items;
                this.items = [];
                let p;
                while ((p = list.pop())) {
                    if (p._dirty) {
                        this.renderComponent(p);
                    }
                }
            });
        }
    }
    protected renderComponent(component: Component, opts?: number, mountAll?: any, isChild?: any) {
        if (component._disable) {
            return;
        }
        let props = component.props,
            state = component.state,
            context = component.context,
            previousProps = component.prevProps || props,
            previousState = component.prevState || state,
            previousContext = component.prevContext || context,
            isUpdate = component.base,
            nextBase = component.nextBase,
            initialBase = isUpdate || nextBase,
            initialChildComponent = component._component,
            skip = false,
            rendered, inst, cbase;
        // if updating
        if (isUpdate) {
            component.props = previousProps;
            component.state = previousState;
            component.context = previousContext;
            if (opts !== FORCE_RENDER &&
                component.shouldComponentUpdate &&
                component.shouldComponentUpdate(props, state, context) === false
            ) {
                skip = true;
            } else if (component.componentWillUpdate) {
                component.componentWillUpdate(props, state, context);
            }
            component.props = props;
            component.state = state;
            component.context = context;
        }
        component.prevProps = component.prevState = component.prevContext = component.nextBase = null as any;
        component._dirty = false;
        if (!skip) {
            rendered = component.render(props, state, context);
            // context to pass to the child, can be updated via (grand-)parent component
            if (component.getChildContext) {
                context = Object.assign(Object.assign({}, context), component.getChildContext());
            }
            let childComponent = rendered && rendered.name, toUnmount, base;
            if (typeof childComponent === 'function' && rendered) {
                // set up high order component link
                let childProps = this.getNodeProps(rendered);
                inst = initialChildComponent;
                if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
                    this.setComponentProps(inst, childProps, SYNC_RENDER, context, false);
                }
                else {
                    toUnmount = inst;
                    component._component = inst = this.createComponent(childComponent, childProps, context);
                    inst.nextBase = inst.nextBase || nextBase;
                    inst._parentComponent = component;
                    this.setComponentProps(inst, childProps, NO_RENDER, context, false);
                    this.renderComponent(inst, SYNC_RENDER, mountAll, true);
                }
                base = inst.base;
            } else {
                cbase = initialBase;
                // destroy high order component link
                toUnmount = initialChildComponent;
                if (toUnmount) {
                    cbase = component._component = void 0;
                }
                if (initialBase || opts === SYNC_RENDER) {
                    if (cbase) {
                        cbase[COMPONENT] = void 0;
                    }
                    base = this.diff(cbase, rendered as any, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
                }
            }
            if (initialBase && base !== initialBase && inst !== initialChildComponent) {
                let baseParent = initialBase.parentNode;
                if (baseParent && base !== baseParent) {
                    baseParent.replaceChild(base, initialBase);
                    if (!toUnmount) {
                        initialBase[COMPONENT] = null;
                        this.recollectNodeTree(initialBase, false);
                    }
                }
            }
            if (toUnmount) {
                this.unmountComponent(toUnmount);
            }
            component.base = base;
            if (base && !isChild) {
                let componentRef = component;
                let t: any = component;
                while ((t = t._parentComponent)) {
                    (componentRef = t).base = base;
                }
                base[COMPONENT] = componentRef;
                base[COMPONENT_CLASS] = componentRef.constructor;
            }
        }
        if (!isUpdate || mountAll) {
            this.mounts.unshift(component);
        } else if (!skip) {
            // Ensure that pending componentDidMount() hooks of child components
            // are called before the componentDidUpdate() hook in the parent.
            // Note: disabled as it causes duplicate hooks, see https://github.com/developit/preact/issues/750
            // flushMounts();
            if (component.componentDidUpdate) {
                component.componentDidUpdate(previousProps, previousState, previousContext);
            }
            if (options.afterUpdate) {
                options.afterUpdate(component);
            }
        }
        if (component._renderCallbacks != null) {
            while (component._renderCallbacks.length) {
                const callback = component._renderCallbacks.pop();
                if (callback) {
                    callback.call(component);
                }
            }
        }
        if (!this.diffLevel && !isChild) {
            this.flushMounts();
        }
    }
    protected setComponentProps(component: Component, props: Dictionary, opts: number, context: object, mountAll: boolean) {
        if (component._disable) {
            return;
        }
        component._disable = true;
        if ((component.__ref = props.ref)) {
            delete props.ref;
        }
        if ((component.__key = props.key)) {
            delete props.key;
        }
        if (!component.base || mountAll) {
            if (component.componentWillMount) {
                component.componentWillMount();
            }
        } else
        // component has props receiver
        if (component.componentWillReceiveProps) {
            component.componentWillReceiveProps(props, context);
        }
        if (context && context !== component.context) {
            if (!component.prevContext) {
                component.prevContext = component.context;
            }
            component.context = context;
        }
        if (!component.prevProps) {
            component.prevProps = component.props;
        }
        component.props = props;
        component._disable = false;
        if (opts !== NO_RENDER) {
            if (opts === SYNC_RENDER || options.syncComponentUpdates !== false || !component.base) {
                this.renderComponent(component, SYNC_RENDER, mountAll);
            }
            else {
                this.queueComponent(component);
            }
        }
        if (component.__ref) {
            component.__ref(component);
        }
    }
    protected buildComponentFromVNode(node: Node, element: JSX.Element, context: any, mountAll: any) {
        let c = node && node[COMPONENT],
            originalComponent = c,
            oldDom = node,
            isDirectOwner = c && node[COMPONENT_CLASS] === element.name,
            isOwner = isDirectOwner,
            props = this.getNodeProps(element);
        while (c && !isOwner && (c = c._parentComponent)) {
            isOwner = c.constructor === element.name;
        }
        if (c && isOwner && (!mountAll || c[COMPONENT])) {
            this.setComponentProps(c, props, ASYNC_RENDER, context, mountAll);
            node = c.base;
        }
        else {
            if (originalComponent && !isDirectOwner) {
                this.unmountComponent(originalComponent);
                node = oldDom = null;
            }
            c = this.createComponent(element.name as Function, props, context);
            if (node && !c.nextBase) {
                c.nextBase = node;
                // passing dom/oldDom as nextBase will recycle it if unused, so bypass recycling on L229:
                oldDom = null;
            }
            this.setComponentProps(c, props, SYNC_RENDER, context, mountAll);
            node = c.base;
            if (oldDom && node !== oldDom) {
                oldDom[COMPONENT] = null;
                this.recollectNodeTree(oldDom, false);
            }
        }
        return node;
    }
    protected unmountComponent(component: Component) {
        if (options.beforeUnmount) {
            options.beforeUnmount(component);
        }
        let base = component.base;
        component._disable = true;
        if (component.componentWillUnmount) {
            component.componentWillUnmount();
        }
        component.base = null;
        // recursively tear down & recollect high-order component children:
        let inner = component._component;
        if (inner) {
            this.unmountComponent(inner);
        } else if (base) {
            if (base[ATTR_KEY] && base[ATTR_KEY].ref) {
                base[ATTR_KEY].ref(null);
            }
            component.nextBase = base;
            this.removeNode(base);
            this.collectComponent(component);
            this.removeChildren(base);
        }
        if (component.__ref) {
            component.__ref(null);
        }
    }
    protected collectComponent(component: object) {
        let name = component.constructor.name;
        let comp = this.components[name];
        if (!comp) {
            comp = this.components[name] = []
        }
        comp.push(component);
    }
    protected createComponent(Ctor: Function, props: object, context: any) {
        let list = this.components[Ctor.name];
        let inst: any = new (this.createComponentClass(Ctor))(props, context);
        if (list) {
            for (let i = list.length; i--;) {
                if (list[i].constructor === Ctor) {
                    inst.nextBase = list[i].nextBase;
                    list.splice(i, 1);
                    break;
                }
            }
        }
        return inst;
    }
    protected createComponentClass(Ctor: Function): JSX.ComponentConstructor<any, any> {
        let Comp: any;
        if (Ctor.prototype && Ctor.prototype instanceof Component) {
            Comp = Ctor
        } else {
            Comp = Ctor[COMPONENT_CLASS];
            if (!Comp) {
                Comp = class FunctionComponent extends Component<any, any> {
                    render(props: any, state: any) {
                        return Ctor.call(this, props, state);
                    }
                };
                Object.defineProperty(Ctor, COMPONENT_CLASS, {value: Comp});
            }
        }
        return Comp;
    }
    protected isSvgNode(el: Node): el is SVGElement {
        return ((el instanceof SVGElement) && el.ownerSVGElement !== undefined);
    }
    protected isTextNode(el: Node): el is Text {
        return ((el instanceof Text) && el.splitText !== undefined);
    }
    protected createNode(nodeName: string, isSvg: boolean): Node {
        let node: any = isSvg
            ? this.dom.createElementNS('http://www.w3.org/2000/svg', nodeName)
            : this.dom.createElement(nodeName);
        node[COMPONENT_NAME] = nodeName;
        return node;
    }
    protected removeNode(node: Node) {
        let parentNode = node.parentNode;
        if (parentNode) {
            parentNode.removeChild(node)
        }
    }
    protected setAccessor(node: HTMLElement, name: any, old: any, value: any, isSvg: boolean) {
        if (name === 'className') {
            name = 'class'
        }
        if (name === 'key') {
            // ignore
        }
        else if (name === 'ref') {
            if (old) {
                old(null);
            }
            if (value) {
                value(node);
            }
        }
        else if (name === 'class' && !isSvg) {
            node.className = value || '';
        }
        else if (name === 'style') {
            if (!value || typeof value === 'string' || typeof old === 'string') {
                node.style.cssText = value || '';
            }
            if (value && typeof value === 'object') {
                if (typeof old !== 'string') {
                    for (let i in old) {
                        if (!(i in value)) {
                            node.style[i] = '';
                        }
                    }
                }
                for (let i in value) {
                    node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? (value[i] + 'px') : value[i];
                }
            }
        }
        else if (name === 'dangerouslySetInnerHTML') {
            if (value) {
                node.innerHTML = value.__html || '';
            }
        }
        else if (name[0] == 'o' && name[1] == 'n') {
            let useCapture = name !== (name = name.replace(/Capture$/, ''));
            name = name.toLowerCase().substring(2);
            if (value) {
                if (!old) {
                    node.addEventListener(name, eventProxy, useCapture);
                }
            }
            else {
                node.removeEventListener(name, eventProxy, useCapture);
            }
            (node[COMPONENT_EVENTS] || (node[COMPONENT_EVENTS] = {}))[name] = value;
        }
        else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
            this.setProperty(node, name, value == null ? '' : value);
            if (value == null || value === false) {
                node.removeAttribute(name);
            }
        }
        else {
            let ns = isSvg && (name !== (name = name.replace(/^xlink\:?/, '')));
            if (value == null || value === false) {
                if (ns) {
                    node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());
                } else {
                    node.removeAttribute(name);
                }
            }
            else if (typeof value !== 'function') {
                if (ns) {
                    node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);
                } else {
                    node.setAttribute(name, value);
                }
            }
        }
    }
    protected setProperty(node: HTMLElement, name: any, value: any) {
        try {
            node[name] = value;
        } catch (e) {
        }
    }
    protected isSameNodeType(node: Node, vnode: JSX.Element, hydrating: boolean) {
        if (typeof vnode === 'string' || typeof vnode === 'number') {
            return this.isTextNode(node);
        }
        if (typeof vnode.name === 'string') {
            return !node[COMPONENT_CLASS] && this.isNamedNode(node, vnode.name);
        }
        return hydrating || node[COMPONENT_CLASS] === vnode.name;
    }
    protected isNamedNode(node: Node, nodeName: string) {
        return node[COMPONENT_NAME] === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
    }
    protected getNodeProps(vnode: JSX.Element) {
        let props = Object.assign({}, vnode.attributes) as Dictionary;
        props.children = vnode.children;
        let defaultProps = (vnode.name as any).defaultProps;
        if (defaultProps !== undefined) {
            for (let i in defaultProps) {
                if (props[i] === undefined) {
                    props[i] = defaultProps[i];
                }
            }
        }
        return props;
    }
}

function eventProxy(this: Node, e: Event) {
    return this[COMPONENT_EVENTS][e.type](options.event(e) || e);
}

export const React = globals.React = {
    get renderer():Renderer {
        return Object.defineProperty(this,'renderer',{
            value : new this.Renderer()
        }).renderer;
    },
    Component: Component,
    Renderer: Renderer,
    createElement: createElement,
    cloneElement: cloneElement,
    render(node: JSX.Element, parent?: Element, merge?: Element): Node {
        return this.renderer.render(node,parent,merge)
    }
};



