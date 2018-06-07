import * as React from '@barlus/react'
import TodoItem from './TodoItem'

const TodoList = ({ filteredTodos, actions }) => (
  <ul className="todo-list">
    {filteredTodos.map(todo =>
      <TodoItem key={todo.id} todo={todo} {...actions} />
    )}
  </ul>
);


export default TodoList
