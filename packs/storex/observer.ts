import { createAtom, Reaction, _allowStateChanges } from '@barlus/mobx/index';
import { shallowEqual } from '@barlus/nerv/utils/shallow-equal';
const ID = Symbol('id');
const COMPONENT = Symbol('component');
const REACTION = Symbol('reaction');
export function observer<T extends Function>(component: T): T {
    const target = component.prototype;
    let componentWillMountBase = target.componentWillMount;
    let componentWillUnmountBase = target.componentWillUnmount;
    let shouldComponentUpdateBase = target.shouldComponentUpdate;
    function componentWillMount() {
        //this.__$mobxIsUnmounted = false;
        console.info(this)
        const constr = this.constructor;
        // Generate friendly name for debugging
        const initialName = constr.displayName || constr.name;
        const rootNodeID = constr[ ID ] ? constr[ ID ]++ : (constr[ ID ] = 1);
        const me = this;
        const render = this.render.bind(this);
        const baseRender = () => render(me.props, me.state, me.context);
        let reaction: Reaction | null = null;
        let isRenderingPending = false;
        const initialRender = () => {
            reaction = new Reaction(`${initialName}#${rootNodeID}.render()`, () => {
                if (!isRenderingPending) {
                    // N.B. Getting here *before mounting* means that a component constructor has side effects (see the relevant test in misc.js)
                    // This unidiomatic React usage but React will correctly warn about this so we continue as usual
                    // See #85 / Pull #44
                    isRenderingPending = true;
                    if (typeof this.componentWillReact === 'function') {
                        this.componentWillReact(); // TODO: wrap in action?
                    }
                    if (this.__$mobxIsUnmounted !== true) {
                        this.forceUpdate();
                    }
                }
            });
            reaction[COMPONENT] = this;
            reactiveRender[REACTION] = reaction;
            this.render = reactiveRender;
            return reactiveRender();
        };
        const reactiveRender = () => {
            isRenderingPending = false;
            let exception;
            let rendering = null;
            reaction.track(() => {
                try {
                    rendering = _allowStateChanges(false, baseRender);
                } catch (e) {
                    exception = e;
                }
            });
            if (exception) {
                throw exception;
            }
            return rendering;
        };
        this.render = initialRender;
        if (componentWillMountBase) {
            componentWillMountBase.apply(this, arguments)
        }
    }
    function componentWillUnmount() {
        if (componentWillUnmountBase) {
            componentWillUnmountBase.apply(this, arguments)
        }
        if (this.render[REACTION]) {
            this.render[REACTION].dispose();
        }
        this.__$mobxIsUnmounted = true;
        console.info(this)
    }
    function shouldComponentUpdate(nextProps, nextState) {
        if (shouldComponentUpdateBase) {
            return shouldComponentUpdateBase.apply(this, arguments)
        }
        // update on any state changes (as is the default)
        if (this.state !== nextState) {
            return true;
        }
        // update if props are shallowly not equal, inspired by PureRenderMixin
        // we could return just 'false' here, and avoid the `skipRender` checks etc
        // however, it is nicer if lifecycle events are triggered like usually,
        // so we return true here if props are shallowly modified.
        return shallowEqual(this.props, nextProps);
    }
    Object.assign(target, {
        componentWillMount,
        componentWillUnmount,
        shouldComponentUpdate,
    });
    return component;
}
export function inject(...storeNames: string[]): any {
    return function <T extends Function>(componentClass: T): T {
        return componentClass;
    }
}

export function store(target: object, key: string, desc?: PropertyDescriptor): any {
    return {
        get() {
            return this.context.mobxStores[ key ]
        }
    }
}