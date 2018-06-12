import {createSelector}      from '@barlus/redux'
import {Show, Todo}          from '../state/State';
import {State}               from '../state/State';
import {getTodos}            from './getTodos';
import {getVisibilityFilter} from './getVisibilityFilter';


export const getVisibleTodos: (state: State) => Todo[] = createSelector(
  [ getVisibilityFilter, getTodos ],
  (visibilityFilter:Show, todos:Todo[]) => {
    switch (visibilityFilter) {
      case Show.ALL:
        return todos;
      case Show.COMPLETED:
        return todos.filter(t => t.completed);
      case Show.ACTIVE:
        return todos.filter(t => !t.completed);
      default:
        throw new Error('Unknown filter: ' + visibilityFilter)
    }
  }
);