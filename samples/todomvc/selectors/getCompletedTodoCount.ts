import {createSelector} from '@barlus/redux/index';
import {getTodos} from './getTodos';
export const getCompletedTodoCount: any = createSelector(
  [ getTodos ],
  todos => (
    todos.reduce((count, todo) =>
        todo.completed ? count + 1 : count,
      0
    )
  )
);