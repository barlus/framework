import { Component, Children, PropTypes } from '@barlus/react'

import { storeShape, subscriptionShape } from '../utils/PropTypes'
import warning from '../utils/warning'

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

export function createProvider(storeKey:string = 'store') {
    const subscriptionKey = `${storeKey}Subscription`;

    class Provider extends Component<any> {
        static propTypes = {
            store: storeShape.isRequired,
            children: PropTypes.element.isRequired,
        };
        static childContextTypes = {
            [storeKey]: storeShape.isRequired,
            [subscriptionKey]: subscriptionShape,
        };
        getChildContext() {
          return {
              [storeKey]: this[storeKey],
              [subscriptionKey]: null }
        }
        constructor(props, context) {
          super(props, context);
          this[storeKey] = props.store;
        }

        render() {
          return Children.only(this.props.children)
        }
    }
    if (process.env.NODE_ENV !== 'production') {
      Provider.prototype.componentWillReceiveProps = function (nextProps) {
        if (this[storeKey] !== nextProps.store) {
          warnAboutReceivingStore()
        }
      }
    }
    return Provider
}

export default createProvider()
