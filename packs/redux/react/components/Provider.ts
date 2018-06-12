import {Component}      from '@barlus/react'
import {PropTypes}      from '@barlus/react'
import {Children}       from '@barlus/react'
import {ReactNode}      from '@barlus/react'
import {ComponentClass} from '@barlus/react'
import {ValidationMap}  from '@barlus/react'

import {Store}             from '@barlus/redux';
import {storeShape}        from '../utils/PropTypes'
import {subscriptionShape} from '../utils/PropTypes'
import {warning}           from '../utils/warning'


/**
 * Creates a new <Provider> which will set the Redux Store on the passed key of the context. You probably only need this
 * if you are in the inadvisable position of having multiple stores. You will also need to pass the same storeKey to the
 * options argument of connect.
 *
 * @param storeKey The key of the context on which to set the store.
 */

export function createProvider(storeKey: string = 'store'): ComponentClass<ProviderProps> {
  const subscriptionKey = `${storeKey}Subscription`;
  class Provider extends Component<ProviderProps> {
    static propTypes: ValidationMap<ProviderProps> = {
      store: storeShape.isRequired,
      children: PropTypes.element.isRequired,
    } as any;
    static childContextTypes: ValidationMap<ProviderProps> = {
      [ storeKey ]: storeShape.isRequired,
      [ subscriptionKey ]: subscriptionShape,
    } as any;
    getChildContext() {
      return {
        [ storeKey ]: this[ storeKey ],
        [ subscriptionKey ]: null
      }
    }
    constructor(props, context) {
      super(props, context);
      this[ storeKey ] = props.store;
    }

    render() {
      return Children.only(this.props.children)
    }
  }
  if (process.env.NODE_ENV !== 'production') {
    Provider.prototype.componentWillReceiveProps = function (nextProps) {
      if (this[ storeKey ] !== nextProps.store) {
        warnAboutReceivingStore()
      }
    }
  }
  return Provider;
}
export interface ProviderProps {
  /**
   * The single Redux store in your application.
   */
  store?: Store<any>;
  children?: ReactNode;
}

/**
 * Makes the Redux store available to the connect() calls in the component hierarchy below.
 */
export const Provider = createProvider();

let didWarnAboutReceivingStore = false;
function warnAboutReceivingStore() {
  if (didWarnAboutReceivingStore) {
    return
  }
  didWarnAboutReceivingStore = true;

  warning(
    '<Provider> does not support changing `store` on the fly. ' +
    'It is most likely that you see this error because you updated to ' +
    'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' +
    'automatically. See https://github.com/reduxjs/react-redux/releases/' +
    'tag/v2.0.0 for the migration instructions.'
  )
}