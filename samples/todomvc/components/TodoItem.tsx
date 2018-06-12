import * as React      from '@barlus/react'
import {connected}     from '@barlus/redux';

import {Actions}       from '../actions/index';
import {Todo}          from '../state/State';
import {classes}       from '../utils/classes'
import {TodoTextInput} from './TodoTextInput'

@connected
export class TodoItem extends React.PureComponent<{ todo:Todo }> {

  @connected
  get actions(){
    return connected.actions(Actions)
  }

  readonly state = {
    editing: false
  };

  handleDoubleClick = () => {
    this.setState({ editing: true })
  };

  handleSave = (id, text) => {
    if (text.length === 0) {
      this.actions.deleteTodo(id)
    } else {
      this.actions.editTodo(id, text)
    }
    this.setState({ editing: false })
  };

  render() {
    const { todo } = this.props;
    const { completeTodo, deleteTodo } = this.actions;
    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={this.state.editing}
          onSave={(text) => this.handleSave(todo.id, text)}/>
      )
    } else {
      element = <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => completeTodo(todo.id)}
        />
        <label onDoubleClick={this.handleDoubleClick}>{todo.text}</label>
        <button className="destroy" onClick={() => deleteTodo(todo.id)}/>
      </div>;

    }
    const classNames = classes('todoitem', {
      completed: todo.completed,
      editing: this.state.editing
    });
    return <li className={classNames}>{element}</li>;
  }
}
