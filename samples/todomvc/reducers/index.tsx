import {combineReducers}  from '@barlus/redux';
import {State}            from '../state/State';
import {todos}            from './todos';
import {visibilityFilter} from './visibilityFilter';

const rootReducer = combineReducers<State>({
  todos,
  visibilityFilter
});

export default rootReducer;
