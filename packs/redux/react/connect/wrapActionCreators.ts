import {bindActionCreators} from '../../core/index'

export function wrapActionCreators(actionCreators) {
  return dispatch => bindActionCreators(actionCreators, dispatch)
}
