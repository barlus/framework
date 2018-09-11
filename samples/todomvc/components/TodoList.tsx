import * as React        from '@barlus/react'
import {connected}       from '@barlus/redux';
import {Actions}         from '../actions/index'
import {getVisibleTodos} from '../selectors/index'
import {TodoItem}        from './TodoItem'


@connected
export class TodoList extends React.PureComponent<TodoListProps> {

  @connected
  get store() {
    return connected.state((state) => {
      return {
        filteredTodos: getVisibleTodos(state)
      }
    })
  }

  render() {
    const { filteredTodos } = this.store;
    return <ul className="todo-list">
      {filteredTodos.map(todo =>
        <TodoItem key={todo.id} todo={todo}/>
      )}
    </ul>
  }
}

interface Todo {
  id: string;
}

interface TodoListProps {
  filteredTodos?: Todo[];
  actions?: typeof Actions
}



