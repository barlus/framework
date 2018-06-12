declare module '@barlus/redux/connected' {
  export interface State extends ConnectedState {
  }
}

export const enum Show {
  ALL = 'all',
  COMPLETED = 'completed',
  ACTIVE = 'active',
}

export interface Todo {
  id: number;
  completed: boolean;
  text: string;
}

export interface State {
  visibilityFilter: Show;
  todos: Todo[]
}

interface ConnectedState extends State {

}