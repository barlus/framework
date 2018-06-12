import {ActionCreator,}          from './types';
import {ActionCreatorsMapObject} from './types';
import {Dispatch}                from './types';


/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param actionCreator An object whose values are action creator functions.
 *   One handy way to obtain it is to use ES6 `import * as` syntax. You may
 *   also pass a single function.
 *
 * @param dispatch The `dispatch` function available on your Redux store.
 *
 * @returns The object mimicking the original object, but with every action
 *   creator wrapped into the `dispatch` call. If you passed a function as
 *   `actionCreator`, the return value will also be a single function.
 */
export function bindActionCreators<A, C extends ActionCreator<A>>(actionCreator: C, dispatch: Dispatch): C;
export function bindActionCreators<A extends ActionCreator<any>, B extends ActionCreator<any>>(actionCreator: A, dispatch: Dispatch): B;
export function bindActionCreators<A, M extends ActionCreatorsMapObject<A>>(actionCreators: M, dispatch: Dispatch): M;
export function bindActionCreators<M extends ActionCreatorsMapObject<any>, N extends ActionCreatorsMapObject<any>>(actionCreators: M, dispatch: Dispatch): N;
export function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error(
      `bindActionCreators expected an object or a function, instead received ${
        actionCreators === null ? 'null' : typeof actionCreators
        }. ` +
      `Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`
    )
  }

  const keys = Object.keys(actionCreators)
  const boundActionCreators = {}
  for (let i = 0; i < keys.length; i++) {
    const key = keys[ i ]
    const actionCreator = actionCreators[ key ]
    if (typeof actionCreator === 'function') {
      boundActionCreators[ key ] = bindActionCreator(actionCreator, dispatch)
    }
  }
  return boundActionCreators
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments))
  }
}