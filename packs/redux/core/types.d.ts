/**
 * An *action* is a plain object that represents an intention to change the
 * state. Actions are the only way to get data into the store. Any data,
 * whether from UI events, network callbacks, or other sources such as
 * WebSockets needs to eventually be dispatched as actions.
 *
 * Actions must have a `type` field that indicates the type of action being
 * performed. Types can be defined as constants and imported from another
 * module. It's better to use strings for `type` than Symbols because strings
 * are serializable.
 *
 * Other than `type`, the structure of an action object is really up to you.
 * If you're interested, check out Flux Standard Action for recommendations on
 * how actions should be constructed.
 *
 * @template T the type of the action's `type` tag.
 */
export interface Action<T = any> {
  type: T;
}

/**
 * An Action type which accepts any other properties.
 * This is mainly for the use of the `Reducer` type.
 * This is not part of `Action` itself to prevent users who are extending `Action.
 */
export interface AnyAction extends Action {
  // Allows any extra properties to be defined in an action.
  [ extraProps: string ]: any;
}

/* reducers */

/**
 * A *reducer* (also called a *reducing function*) is a function that accepts
 * an accumulation and a value and returns a new accumulation. They are used
 * to reduce a collection of values down to a single value
 *
 * Reducers are not unique to Redux—they are a fundamental concept in
 * functional programming.  Even most non-functional languages, like
 * JavaScript, have a built-in API for reducing. In JavaScript, it's
 * `Array.prototype.reduce()`.
 *
 * In Redux, the accumulated value is the state object, and the values being
 * accumulated are actions. Reducers calculate a new state given the previous
 * state and an action. They must be *pure functions*—functions that return
 * the exact same output for given inputs. They should also be free of
 * side-effects. This is what enables exciting features like hot reloading and
 * time travel.
 *
 * Reducers are the most important concept in Redux.
 *
 * *Do not put API calls into reducers.*
 *
 * @template S The type of state consumed and produced by this reducer.
 * @template A The type of actions the reducer can potentially respond to.
 */
export type Reducer<S = any, A extends Action = AnyAction> = (state: S | undefined, action: A) => S;

/**
 * Object whose values correspond to different reducer functions.
 *
 * @template A The type of actions the reducers can potentially respond to.
 */
export type ReducersMapObject<S = any, A extends Action = Action> = {
  [K in keyof S]: Reducer<S[K], A>;
}

/* store */

/**
 * A *dispatching function* (or simply *dispatch function*) is a function that
 * accepts an action or an async action; it then may or may not dispatch one
 * or more actions to the store.
 *
 * We must distinguish between dispatching functions in general and the base
 * `dispatch` function provided by the store instance without any middleware.
 *
 * The base dispatch function *always* synchronously sends an action to the
 * store's reducer, along with the previous state returned by the store, to
 * calculate a new state. It expects actions to be plain objects ready to be
 * consumed by the reducer.
 *
 * Middleware wraps the base dispatch function. It allows the dispatch
 * function to handle async actions in addition to actions. Middleware may
 * transform, delay, ignore, or otherwise interpret actions or async actions
 * before passing them to the next middleware.
 *
 * @template A The type of things (actions or otherwise) which may be
 *   dispatched.
 */
export interface Dispatch<A extends Action = AnyAction> {
  <T extends A>(action: T): T;
}

/**
 * Function to remove listener added by `Store.subscribe()`.
 */
export interface Unsubscribe {
  (): void;
}

/**
 * A store is an object that holds the application's state tree.
 * There should only be a single store in a Redux app, as the composition
 * happens on the reducer level.
 *
 * @template S The type of state held by this store.
 * @template A the type of actions which may be dispatched by this store.
 */
export interface Store<S = any, A extends Action = AnyAction> {
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will be
   * considered the **next** state of the tree, and the change listeners will
   * be notified.
   *
   * The base implementation only supports plain object actions. If you want
   * to dispatch a Promise, an Observable, a thunk, or something else, you
   * need to wrap your store creating function into the corresponding
   * middleware. For example, see the documentation for the `redux-thunk`
   * package. Even the middleware will eventually dispatch plain object
   * actions using this method.
   *
   * @param action A plain object representing “what changed”. It is a good
   *   idea to keep actions serializable so you can record and replay user
   *   sessions, or use the time travelling `redux-devtools`. An action must
   *   have a `type` property which may not be `undefined`. It is a good idea
   *   to use string constants for action types.
   *
   * @returns For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  dispatch: Dispatch<A>;

  /**
   * Reads the state tree managed by the store.
   *
   * @returns The current state tree of your application.
   */
  getState(): S;

  /**
   * Adds a change listener. It will be called any time an action is
   * dispatched, and some part of the state tree may potentially have changed.
   * You may then call `getState()` to read the current state tree inside the
   * callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked,
   * this will not have any effect on the `dispatch()` that is currently in
   * progress. However, the next `dispatch()` call, whether nested or not,
   * will use a more recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all states changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param listener A callback to be invoked on every dispatch.
   * @returns A function to remove this change listener.
   */
  subscribe(listener: () => void): Unsubscribe;

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param nextReducer The reducer for the store to use instead.
   */
  replaceReducer(nextReducer: Reducer<S, A>): void;
}

export type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> };

/**
 * A store enhancer is a higher-order function that composes a store creator
 * to return a new, enhanced store creator. This is similar to middleware in
 * that it allows you to alter the store interface in a composable way.
 *
 * Store enhancers are much the same concept as higher-order components in
 * React, which are also occasionally called “component enhancers”.
 *
 * Because a store is not an instance, but rather a plain-object collection of
 * functions, copies can be easily created and modified without mutating the
 * original store. There is an example in `compose` documentation
 * demonstrating that.
 *
 * Most likely you'll never write a store enhancer, but you may use the one
 * provided by the developer tools. It is what makes time travel possible
 * without the app being aware it is happening. Amusingly, the Redux
 * middleware implementation is itself a store enhancer.
 *
 * @template Ext Store extension that is mixed into the Store type.
 * @template StateExt State extension that is mixed into the state type.
 */

export type StoreEnhancer<Ext = {}, StateExt = {}> = (next: StoreEnhancerStoreCreator) => StoreEnhancerStoreCreator<Ext, StateExt>;
export type StoreEnhancerStoreCreator<Ext = {}, StateExt = {}> = <S = any, A extends Action = AnyAction>(reducer: Reducer<S, A>, preloadedState?: DeepPartial<S>) => Store<S & StateExt, A> & Ext;

/* middleware */

export interface MiddlewareAPI<D extends Dispatch = Dispatch, S = any> {
  dispatch: D;
  getState(): S;
}

/**
 * A middleware is a higher-order function that composes a dispatch function
 * to return a new dispatch function. It often turns async actions into
 * actions.
 *
 * Middleware is composable using function composition. It is useful for
 * logging actions, performing side effects like routing, or turning an
 * asynchronous API call into a series of synchronous actions.
 *
 * @template DispatchExt Extra Dispatch signature added by this middleware.
 * @template S The type of the state supported by this middleware.
 * @template D The type of Dispatch of the store where this middleware is
 *   installed.
 */
export interface Middleware<DispatchExt = {}, S = any, D extends Dispatch = Dispatch> {
  (api: MiddlewareAPI<D, S>): (next: Dispatch<AnyAction>) => (action: any) => any;
}

/* action creators */

/**
 * An *action creator* is, quite simply, a function that creates an action. Do
 * not confuse the two terms—again, an action is a payload of information, and
 * an action creator is a factory that creates an action.
 *
 * Calling an action creator only produces an action, but does not dispatch
 * it. You need to call the store's `dispatch` function to actually cause the
 * mutation. Sometimes we say *bound action creators* to mean functions that
 * call an action creator and immediately dispatch its result to a specific
 * store instance.
 *
 * If an action creator needs to read the current state, perform an API call,
 * or cause a side effect, like a routing transition, it should return an
 * async action instead of an action.
 *
 * @template A Returned action type.
 */
export interface ActionCreator<A> {
  (...args: any[]): A;
}

/**
 * Object whose values are action creator functions.
 */
export interface ActionCreatorsMapObject<A = any> {
  [ key: string ]: ActionCreator<A>;
}

/* compose */

