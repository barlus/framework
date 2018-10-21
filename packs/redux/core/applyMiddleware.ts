import {Middleware}    from './types';
import {Reducer}       from './types';
import {StoreEnhancer} from './types';
import {compose}       from './compose';


export function applyMiddleware(): StoreEnhancer;
export function applyMiddleware<Ext1, S>(middleware1: Middleware<Ext1, S, any>): StoreEnhancer<{ dispatch: Ext1 }>;
export function applyMiddleware<Ext1, Ext2, S>(middleware1: Middleware<Ext1, S, any>, middleware2: Middleware<Ext2, S, any>): StoreEnhancer<{ dispatch: Ext1 & Ext2 }>;
export function applyMiddleware<Ext1, Ext2, Ext3, S>(middleware1: Middleware<Ext1, S, any>, middleware2: Middleware<Ext2, S, any>, middleware3: Middleware<Ext3, S, any>): StoreEnhancer<{ dispatch: Ext1 & Ext2 & Ext3 }>;
export function applyMiddleware<Ext1, Ext2, Ext3, Ext4, S>(middleware1: Middleware<Ext1, S, any>, middleware2: Middleware<Ext2, S, any>, middleware3: Middleware<Ext3, S, any>, middleware4: Middleware<Ext4, S, any>): StoreEnhancer<{ dispatch: Ext1 & Ext2 & Ext3 & Ext4 }>;
export function applyMiddleware<Ext1, Ext2, Ext3, Ext4, Ext5, S>(middleware1: Middleware<Ext1, S, any>, middleware2: Middleware<Ext2, S, any>, middleware3: Middleware<Ext3, S, any>, middleware4: Middleware<Ext4, S, any>, middleware5: Middleware<Ext5, S, any>): StoreEnhancer<{ dispatch: Ext1 & Ext2 & Ext3 & Ext4 & Ext5 }>;
export function applyMiddleware<Ext, S = any>(...middlewares: Middleware<any, S, any>[]): StoreEnhancer<{ dispatch: Ext }>;
/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as
 * expressing asynchronous actions in a concise manner, or logging every
 * action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState`
 * functions as named arguments.
 *
 * @param middlewares The middleware chain to be applied.
 * @returns A store enhancer applying the middleware.
 *
 * @template Ext Dispatch signature added by a middleware.
 * @template S The type of the state supported by a middleware.
 */
export function applyMiddleware(...middlewares) {
  return (createStore => <S>(reducer: Reducer<S>, ...rest) => {
    const store = createStore(reducer as any, ...rest);
    let dispatch = (...args) => {
      throw new Error(
        `Dispatching while constructing your middleware is not allowed. ` +
        `Other middleware would not be applied to this dispatch.`
      );
    };
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    };
    const chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch) as any;
    return {
      ...store,
      dispatch
    }
  })
}
