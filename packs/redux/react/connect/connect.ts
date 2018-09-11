import {connectAdvanced}                    from '../components/connectAdvanced'
import {
  DispatchProp,
  InferableComponentEnhancer,
  InferableComponentEnhancerWithProps,
  MapDispatchToPropsParam, MapStateToPropsParam, MergeProps,
  Options
}                                           from '../types';
import {shallowEqual}                       from '../utils/shallowEqual'
import {defaultMapDispatchToPropsFactories} from './mapDispatchToProps'
import {defaultMapStateToPropsFactories}    from './mapStateToProps'
import {defaultMergePropsFactories}         from './mergeProps'
import {defaultSelectorFactory}             from './selectorFactory'

/*
  connect is a facade over connectAdvanced. It turns its args into a compatible
  selectorFactory, which has the signature:

    (dispatch, options) => (nextState, nextOwnProps) => nextFinalProps
  
  connect passes its args to connectAdvanced as options, which will in turn pass them to
  selectorFactory each time a Connect component instance is instantiated or hot reloaded.

  selectorFactory returns a final props selector from its mapStateToProps,
  mapStateToPropsFactories, mapDispatchToProps, mapDispatchToPropsFactories, mergeProps,
  mergePropsFactories, and pure args.

  The resulting final props selector is called by the Connect component instance whenever
  it receives new props or store state.
 */

function match(arg, factories, name) {
  for (let i = factories.length - 1; i >= 0; i--) {
    const result = factories[ i ](arg);
    if (result) {
      return result
    }
  }

  return (dispatch, options) => {
    throw new Error(`Invalid value of type ${typeof arg} for ${name} argument when connecting component ${options.wrappedComponentName}.`)
  }
}

function strictEqual(a, b) {
  return a === b
}

// createConnect with default args builds the 'official' connect behavior. Calling it with
// different options opens up some testing and extensibility scenarios
export function createConnect({
                                connectHOC = connectAdvanced,
                                mapStateToPropsFactories = defaultMapStateToPropsFactories,
                                mapDispatchToPropsFactories = defaultMapDispatchToPropsFactories,
                                mergePropsFactories = defaultMergePropsFactories,
                                selectorFactory = defaultSelectorFactory,
                              } = {}): Connect {
  return function connect(mapStateToProps, mapDispatchToProps?, mergeProps?, options = {} as any) {
    const {
      pure = true,
      areStatesEqual = strictEqual,
      areOwnPropsEqual = shallowEqual,
      areStatePropsEqual = shallowEqual,
      areMergedPropsEqual = shallowEqual,
      ...extraOptions
    } = options;
    const initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
    const initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
    const initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');

    return connectHOC(selectorFactory, {
      // used in error messages
      methodName: 'connect',

      // used to compute Connect's displayName from the wrapped component's displayName.
      getDisplayName: name => `Connect(${name})`,

      // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
      shouldHandleStateChanges: Boolean(mapStateToProps),

      // passed through to selectorFactory
      initMapStateToProps,
      initMapDispatchToProps,
      initMergeProps,
      pure,
      areStatesEqual,
      areOwnPropsEqual,
      areStatePropsEqual,
      areMergedPropsEqual,

      // any extra options args can override defaults of connect or connectAdvanced
      ...extraOptions
    })
  } as any as Connect;
}

/**
 * Connects a React component to a Redux store.
 *
 * - Without arguments, just wraps the component, without changing the behavior / props
 *
 * - If 2 params are passed (3rd param, mergeProps, is skipped), default behavior
 * is to override ownProps (as stated in the docs), so what remains is everything that's
 * not a state or dispatch prop
 *
 * - When 3rd param is passed, we don't know if ownProps propagate and whether they
 * should be valid component props, because it depends on mergeProps implementation.
 * As such, it is the user's responsibility to extend ownProps interface from state or
 * dispatch props or both when applicable
 *
 * @param mapStateToProps
 * @param mapDispatchToProps
 * @param mergeProps
 * @param options
 */
export interface Connect {
  (): InferableComponentEnhancer<DispatchProp>;

  <TStateProps = {}, no_dispatch = {}, TOwnProps = {}, State = {}>(
    mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>
  ): InferableComponentEnhancerWithProps<TStateProps & DispatchProp, TOwnProps>;

  <no_state = {}, TDispatchProps = {}, TOwnProps = {}>(
    mapStateToProps: null | undefined,
    mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>
  ): InferableComponentEnhancerWithProps<TDispatchProps, TOwnProps>;

  <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {}>(
    mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
    mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>
  ): InferableComponentEnhancerWithProps<TStateProps & TDispatchProps, TOwnProps>;

  <TStateProps = {}, no_dispatch = {}, TOwnProps = {}, TMergedProps = {}, State = {}>(
    mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
    mapDispatchToProps: null | undefined,
    mergeProps: MergeProps<TStateProps, undefined, TOwnProps, TMergedProps>,
  ): InferableComponentEnhancerWithProps<TMergedProps, TOwnProps>;

  <no_state = {}, TDispatchProps = {}, TOwnProps = {}, TMergedProps = {}>(
    mapStateToProps: null | undefined,
    mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
    mergeProps: MergeProps<undefined, TDispatchProps, TOwnProps, TMergedProps>,
  ): InferableComponentEnhancerWithProps<TMergedProps, TOwnProps>;

  <no_state = {}, no_dispatch = {}, TOwnProps = {}, TMergedProps = {}>(
    mapStateToProps: null | undefined,
    mapDispatchToProps: null | undefined,
    mergeProps: MergeProps<undefined, undefined, TOwnProps, TMergedProps>,
  ): InferableComponentEnhancerWithProps<TMergedProps, TOwnProps>;

  <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, TMergedProps = {}, State = {}>(
    mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
    mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
    mergeProps: MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>,
  ): InferableComponentEnhancerWithProps<TMergedProps, TOwnProps>;

  <TStateProps = {}, no_dispatch = {}, TOwnProps = {}, State = {}>(
    mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
    mapDispatchToProps: null | undefined,
    mergeProps: null | undefined,
    options: Options<State, TStateProps, TOwnProps>
  ): InferableComponentEnhancerWithProps<DispatchProp & TStateProps, TOwnProps>;

  <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}>(
    mapStateToProps: null | undefined,
    mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
    mergeProps: null | undefined,
    options: Options<{}, TStateProps, TOwnProps>
  ): InferableComponentEnhancerWithProps<TDispatchProps, TOwnProps>;

  <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {}>(
    mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
    mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
    mergeProps: null | undefined,
    options: Options<State, TStateProps, TOwnProps>
  ): InferableComponentEnhancerWithProps<TStateProps & TDispatchProps, TOwnProps>;

  <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, TMergedProps = {}, State = {}>(
    mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
    mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
    mergeProps: MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>,
    options: Options<State, TStateProps, TOwnProps, TMergedProps>
  ): InferableComponentEnhancerWithProps<TMergedProps, TOwnProps>;
}

/**
 * The connect function. See {@type Connect} for details.
 */

export const connect: Connect = createConnect();
