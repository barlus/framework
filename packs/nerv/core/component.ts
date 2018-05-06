import { isFunction, extend, clone } from '../utils/index'
import { enqueueRender } from './render-queue'
import { updateComponent } from './lifecycle'
import { Props, ComponentLifecycle, Refs, EMPTY_OBJ } from '../shared/index'

// interface IComponent<P = {}, S = {}> extends ComponentLifecycle<P, S> {
//     _rendered: any
//     dom: any
// }

export class Component<P = {}, S = {}> implements ComponentLifecycle<P, S> {
    public static defaultProps: {};
    componentWillMount?(): void
    componentDidMount?(): void
    componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void
    shouldComponentUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean
    componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void
    componentDidUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>, prevContext: any): void
    componentWillUnmount?(): void
    componentDidCatch?(error?): void

    state: Readonly<S>;
    props: Readonly<P> & Readonly<Props>;
    context: any;
    refs: Refs;
    protected _dirty = true;
    protected _disable = true;
    protected _pendingStates: any[] = [];
    protected _pendingCallbacks: Function[];

    // Is a React Component.
    // tslint:disable-next-line:max-line-length
    // see: https://github.com/facebook/react/blob/3c977dea6b96f6a9bb39f09886848da870748441/packages/react/src/ReactBaseClasses.js#L26
    isReactComponent = EMPTY_OBJ;

    constructor(props?: P, context?: any) {
        if (!this.state) {
            this.state = {} as S
        }
        this.props = props || ({} as P);
        this.context = context || EMPTY_OBJ;
        this.refs = {}
    }

    setState<K extends keyof S>(
        state:
            | ((prevState: Readonly<S>, props: P) => Pick<S, K> | S)
            | (Pick<S, K> | S),
        callback?: () => void
    ): void {
        if (state) {
            (this._pendingStates = this._pendingStates || []).push(state)
        }
        if (isFunction(callback)) {
            (this._pendingCallbacks = this._pendingCallbacks || []).push(callback)
        }
        if (!this._disable) {
            enqueueRender(this)
        }
    }

    getState() {
        const { _pendingStates, state, props } = this;
        if (!_pendingStates.length) {
            return state;
        }
        const stateClone = clone(state);
        const queue = _pendingStates.concat();
        this._pendingStates.length = 0;
        queue.forEach((nextState) => {
            if (isFunction(nextState)) {
                nextState = nextState.call(this, state, props)
            }
            extend(stateClone, nextState)
        });
        return stateClone
    }
    forceUpdate(callback?: Function) {
        if (isFunction(callback)) {
            (this._pendingCallbacks = this._pendingCallbacks || []).push(callback)
        }
        updateComponent(this, true)
    }
    public render(nextProps?: P, nextState?, nextContext?): any {
    }

}


