import {Actions}     from '../actions/index';
import {ActionTypes} from '../actions/index';
import {Show}        from '../state/State'

export function visibilityFilter(state: Show = Show.ALL, action: Actions) {
  switch (action.type) {
    case ActionTypes.SET_VISIBILITY_FILTER:
      return action.payload;
    default:
      return state
  }
}