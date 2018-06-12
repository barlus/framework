import {ActionTypes} from '../actions/index';
import {Actions}     from '../actions/index';
import {Todo}        from '../state/State';


export function todos(state: Todo[] = [], action: Actions): Todo[] {
  switch (action.type) {
    case ActionTypes.ADD_TODO:
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.payload
        }
      ];
    case ActionTypes.DELETE_TODO:
      return state.filter(todo =>
        todo.id !== action.payload
      );
    case ActionTypes.EDIT_TODO:
      return state.map(todo =>
        todo.id === action.payload.id &&
        todo.text !== action.payload.text ?
          { ...todo, text: action.payload.text } :
          todo
      );
    case ActionTypes.COMPLETE_TODO:
      return state.map(todo =>
        todo.id === action.payload ?
          { ...todo, completed: !todo.completed } :
          todo
      );
    case ActionTypes.COMPLETE_ALL_TODOS:
      const areAllMarked = state.every(todo => todo.completed);
      return state.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }));
    case ActionTypes.CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false);
    default:
      return state
  }
}
