import { Component } from './component'
import { shallowEqual } from '../utils/index'

export class PureComponent<P, S> extends Component<P, S> {
    isPureComponent = true;
    shouldComponentUpdate(nextProps: P, nextState: S) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState)
    }
}

