import { bindActionCreators } from '../../core/index'

export default function wrapActionCreators(actionCreators) {
    return dispatch => bindActionCreators(actionCreators, dispatch)
}
