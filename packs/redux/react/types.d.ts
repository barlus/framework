// Type definitions for react-redux 6.0.1
// Project: https://github.com/rackt/react-redux
// Definitions by: Qubo <https://github.com/tkqubo>,
//                 Thomas Hasner <https://github.com/thasner>,
//                 Kenzie Togami <https://github.com/kenzierocks>,
//                 Curits Layne <https://github.com/clayne11>
//                 Frank Tan <https://github.com/tansongyang>
//                 Nicholas Boll <https://github.com/nicholasboll>
//                 Dibyo Majumdar <https://github.com/mdibyo>
//                 Prashant Deva <https://github.com/pdeva>
//                 Thomas Charlat <https://github.com/kallikrein>
//                 Valentin Descamps <https://github.com/val1984>
//                 Johann Rakotoharisoa <https://github.com/jrakotoharisoa>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

// Known Issue:
// There is a known issue in TypeScript, which doesn't allow decorators to change the signature of the classes
// they are decorating. Due to this, if you are using @connect() decorator in your code,
// you will see a bunch of errors from TypeScript. The current workaround is to use connect() as a function call on
// a separate line instead of as a decorator. Discussed in this github issue:
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796

// NOTE about the wrong react-redux version in the header comment:
// The actual react-redux version is not 6.0.0, but we had to increase the major version
// to update this type definitions for redux@4.x from redux@3.x.
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/25321

import * as React                                          from '@barlus/react';
import {ActionCreator, Dispatch, Store, Action, AnyAction} from '@barlus/redux';


type ComponentClass<P> = React.ComponentClass<P>;
type StatelessComponent<P> = React.StatelessComponent<P>;
type Component<P> = React.ComponentType<P>;
type ReactNode = React.ReactNode;

//type ActionCreator<A> = Redux.ActionCreator<A>;

// Diff / Omit taken from https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-311923766
type Omit<T, K extends keyof T> = Pick<T, ({ [P in keyof T]: P } & { [P in K]: never } & { [ x: string ]: never, [ x: number ]: never })[keyof T]>;

export interface DispatchProp<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

interface AdvancedComponentDecorator<TProps, TOwnProps> {
  (component: Component<TProps>): ComponentClass<TOwnProps>;
}

/**
 * a property P will be present if :
 * - it is present in both DecorationTargetProps and InjectedProps
 * - DecorationTargetProps[P] extends InjectedProps[P]
 * ie: decorated component can accept more types than decorator is injecting
 *
 * For decoration, inject props or ownProps are all optionnaly
 * required by the decorated (right hand side) component.
 * But any property required by the decorated component must extend the injected property
 */
type Shared<InjectedProps,
  DecorationTargetProps extends Shared<InjectedProps, DecorationTargetProps>> = {
  [P in Extract<keyof InjectedProps, keyof DecorationTargetProps>]?: DecorationTargetProps[P] extends InjectedProps[P] ? InjectedProps[P] : never;
};

// Injects props and removes them from the prop requirements.
// Will not pass through the injected props if they are passed in during
// render. Also adds new prop requirements from TNeedsProps.
export interface InferableComponentEnhancerWithProps<TInjectedProps, TNeedsProps> {
  (
    component: StatelessComponent<TInjectedProps>
  ): ComponentClass<TNeedsProps> & { WrappedComponent: StatelessComponent<TInjectedProps> }
  <P extends Shared<TInjectedProps, P>>(
    component: Component<P>
  ): ComponentClass<Omit<P, keyof Shared<TInjectedProps, P>> & TNeedsProps> & { WrappedComponent: Component<P> }
}

// Injects props and removes them from the prop requirements.
// Will not pass through the injected props if they are passed in during
// render.
export type InferableComponentEnhancer<TInjectedProps> =
  InferableComponentEnhancerWithProps<TInjectedProps, {}>

interface MapStateToProps<TStateProps, TOwnProps, State> {
  (state: State, ownProps: TOwnProps): TStateProps;
}

interface MapStateToPropsFactory<TStateProps, TOwnProps, State> {
  (initialState: State, ownProps: TOwnProps): MapStateToProps<TStateProps, TOwnProps, State>;
}

type MapStateToPropsParam<TStateProps, TOwnProps, State> =
  MapStateToPropsFactory<TStateProps, TOwnProps, State>
  | MapStateToProps<TStateProps, TOwnProps, State>
  | null
  | undefined;

interface MapDispatchToPropsFunction<TDispatchProps, TOwnProps> {
  (dispatch: Dispatch, ownProps: TOwnProps): TDispatchProps;
}

type MapDispatchToProps<TDispatchProps, TOwnProps> =
  MapDispatchToPropsFunction<TDispatchProps, TOwnProps> | TDispatchProps;

interface MapDispatchToPropsFactory<TDispatchProps, TOwnProps> {
  (dispatch: Dispatch, ownProps: TOwnProps): MapDispatchToProps<TDispatchProps, TOwnProps>;
}

type MapDispatchToPropsParam<TDispatchProps, TOwnProps> =
  MapDispatchToPropsFactory<TDispatchProps, TOwnProps>
  | MapDispatchToProps<TDispatchProps, TOwnProps>;

interface MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps> {
  (stateProps: TStateProps, dispatchProps: TDispatchProps, ownProps: TOwnProps): TMergedProps;
}

interface Options<State = {}, TStateProps = {}, TOwnProps = {}, TMergedProps = {}> extends ConnectOptions {
  /**
   * If true, implements shouldComponentUpdate and shallowly compares the result of mergeProps,
   * preventing unnecessary updates, assuming that the component is a “pure” component
   * and does not rely on any input or state other than its props and the selected Redux store’s state.
   * Defaults to true.
   * @default true
   */
  pure?: boolean;

  /**
   * When pure, compares incoming store state to its previous value.
   * @default strictEqual
   */
  areStatesEqual?: (nextState: State, prevState: State) => boolean;

  /**
   * When pure, compares incoming props to its previous value.
   * @default shallowEqual
   */
  areOwnPropsEqual?: (nextOwnProps: TOwnProps, prevOwnProps: TOwnProps) => boolean;

  /**
   * When pure, compares the result of mapStateToProps to its previous value.
   * @default shallowEqual
   */
  areStatePropsEqual?: (nextStateProps: TStateProps, prevStateProps: TStateProps) => boolean;

  /**
   * When pure, compares the result of mergeProps to its previous value.
   * @default shallowEqual
   */
  areMergedPropsEqual?: (nextMergedProps: TMergedProps, prevMergedProps: TMergedProps) => boolean;
}

/**
 * Initializes a selector function (during each instance's constructor). That selector function is called any time the
 * connector component needs to compute new props, as a result of a store state change or receiving new props. The
 * result of <code>selector</code> is expected to be a plain object, which is passed as the props to the wrapped
 * component. If a consecutive call to <code>selector</code> returns the same object (<code>===</code>) as its previous
 * call, the component will not be re-rendered. It's the responsibility of <code>selector</code> to return that
 * previous object when appropriate.
 */
export interface SelectorFactory<S, TProps, TOwnProps, TFactoryOptions> {
  (dispatch: Dispatch, factoryOptions: TFactoryOptions): Selector<S, TProps, TOwnProps>
}

export interface Selector<S, TProps, TOwnProps> {
  (state: S, ownProps: TOwnProps): TProps
}

export interface ConnectOptions {
  /**
   * Computes the connector component's displayName property relative to that of the wrapped component. Usually
   * overridden by wrapper functions.
   *
   * @default name => 'ConnectAdvanced('+name+')'
   * @param componentName
   */
  getDisplayName?: (componentName: string) => string
  /**
   * Shown in error messages. Usually overridden by wrapper functions.
   *
   * @default 'connectAdvanced'
   */
  methodName?: string
  /**
   * If defined, a property named this value will be added to the props passed to the wrapped component. Its value
   * will be the number of times the component has been rendered, which can be useful for tracking down unnecessary
   * re-renders.
   *
   * @default undefined
   */
  renderCountProp?: string
  /**
   * Controls whether the connector component subscribes to redux store state changes. If set to false, it will only
   * re-render on <code>componentWillReceiveProps</code>.
   *
   * @default true
   */
  shouldHandleStateChanges?: boolean
  /**
   * The key of props/context to get the store. You probably only need this if you are in the inadvisable position of
   * having multiple stores.
   *
   * @default 'store'
   */
  storeKey?: string
  /**
   * If true, stores a ref to the wrapped component instance and makes it available via getWrappedInstance() method.
   *
   * @default false
   */
  withRef?: boolean
}

