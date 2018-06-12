import {Show} from '../state/State';

import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL_TODOS,
  CLEAR_COMPLETED,
  SET_VISIBILITY_FILTER
} from '../constants/ActionTypes'


interface Action<T extends string> {
  type: T;
}
interface ActionWithPayload<T extends string, P> extends Action<T> {
  payload: P;
}
export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;
export function createAction<T extends string, P>(type: T, payload?: P) {
  return typeof payload == 'undefined' ? { type } : { type, payload }
}

type FunctionType = (...args: any[]) => any;
type ActionCreatorMap = { [ actionCreator: string ]: FunctionType };
type ActionUnion<A extends ActionCreatorMap> = ReturnType<A[keyof A]>;
export type Actions = ActionUnion<typeof Actions>;

// export const Actions = {
//   addTodo: (text: string) => createAction(ADD_TODO, text),
//   deleteTodo: (id: number) => createAction(DELETE_TODO, id),
//   editTodo: (id: number, text: string) => createAction(EDIT_TODO, { id, text }),
//   completeTodo: (id: number) => createAction(COMPLETE_TODO, id),
//   completeAllTodos: () => createAction(COMPLETE_ALL_TODOS),
//   clearCompleted: () => createAction(CLEAR_COMPLETED),
//   setVisibilityFilter: (filter: Show) => createAction(SET_VISIBILITY_FILTER, filter),
// };

export const enum ActionTypes {
  ADD_TODO = 'ADD_TODO',
  DELETE_TODO = 'DELETE_TODO',
  EDIT_TODO = 'EDIT_TODO',
  COMPLETE_TODO = 'COMPLETE_TODO',
  COMPLETE_ALL_TODOS = 'COMPLETE_ALL_TODOS',
  CLEAR_COMPLETED = 'CLEAR_COMPLETED',
  SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER',
}

export const Actions = {
  addTodo: (text: string) => createAction(ActionTypes.ADD_TODO, text),
  deleteTodo: (id: number) => createAction(ActionTypes.DELETE_TODO, id),
  editTodo: (id: number, text: string, status?: string) => createAction(ActionTypes.EDIT_TODO, { id, text, status }),
  completeTodo: (id: number) => createAction(ActionTypes.COMPLETE_TODO, id),
  completeAllTodos: () => createAction(ActionTypes.COMPLETE_ALL_TODOS),
  clearCompleted: () => createAction(ActionTypes.CLEAR_COMPLETED),
  setVisibilityFilter: (filter: Show) => createAction(ActionTypes.SET_VISIBILITY_FILTER, filter),
};
