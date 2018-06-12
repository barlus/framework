import * as React                                   from '../react/index';
import {bindActionCreators}                         from './core/bindActionCreators';
import {Action, ActionCreatorsMapObject, AnyAction} from './core/types';
import {Dispatch}                                   from './core/types';
import {connect}                                    from './react/connect/connect';


export interface State {
}

export function connected<T extends React.ComponentClass<any>>(target: T): T
export function connected(target: React.Component<any>, key: string, desc: PropertyDescriptor): PropertyDescriptor
export function connected(target, key?: string, desc?: PropertyDescriptor) {
  if (typeof target == 'function' && !key) {
    let mapStateToProps = null, mapDispatchToProps = null;
    Object.getOwnPropertyNames(target.prototype).forEach(key => {
      const desc = Object.getOwnPropertyDescriptor(target.prototype, key);
      const type = desc.get && desc.get[ connected.propery ];
      if (type == connected.state) {
        mapStateToProps = desc.get;
        Object.defineProperty(target.prototype, key, {
          get() {
            return this.props;
          }
        })
      }
      if (type == connected.actions) {
        mapDispatchToProps = (dispatch, props) => {
          return { [ key ]: (desc.get as any)(dispatch, props) }
        };
        Object.defineProperty(target.prototype, key, {
          get() {
            return this.props[ key ];
          }
        })
      }
    });
    return connect(mapStateToProps, mapDispatchToProps)(target);
  } else
  // decorated propertyactions
  if (typeof target == 'object' && key) {
    const desc = Object.getOwnPropertyDescriptor(target, key);
    desc.get = desc.get();
    return desc;
  }

}
export namespace connected {
  export const propery = Symbol('ConnectedProperty');
  export function state<T extends (state: State, props: any) => any>(call: T): ReturnType<T> {
    return Object.assign(call, { [ propery ]: state }) as any;
  }
  export function actions<T extends (dispatch: Dispatch<AnyAction>, props: any) => ActionCreatorsMapObject>(call: T): ReturnType<T>
  export function actions<A>(call: A): A;
  export function actions(call) {
    if (typeof call != 'function') {
      return Object.assign((dispatch) => bindActionCreators(call, dispatch), { [ propery ]: actions }) as any;
    } else {
      return Object.assign(call, { [ propery ]: actions }) as any;
    }

  }
}