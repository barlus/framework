import * as React from '@barlus/nerv';
import { inject, observer } from '@barlus/storex';
import { observable, computed } from '@barlus/mobx';
import { TodoModel } from '../models/TodoModel';
import { ViewStore } from '../stores/ViewStore';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

@inject('viewStore')
@observer
export class TodoItem extends React.Component<TodoItemProps> {
    @observable editText = "";

    render() {
        const { viewStore, todo } = this.props;
        return (
            <li className={[
                todo.completed ? "completed" : "",
                computed(() => todo === viewStore.todoBeingEdited ? "editing" : "")
            ].join(" ")}>
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={todo.completed}
                        onChange={this.handleToggle}
                    />
                    <label onDoubleClick={this.handleEdit}>
                        {todo.title}
                    </label>
                    <button className="destroy" onClick={this.handleDestroy}/>
                </div>
                <input
                    ref="editField"
                    className="edit"
                    value={this.editText}
                    onBlur={this.handleSubmit}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                />
            </li>
        );
    }

    handleSubmit = (event) => {
        const val = this.editText.trim();
        if (val) {
            this.props.todo.setTitle(val);
            this.editText = val;
        } else {
            this.handleDestroy();
        }
        this.props.viewStore.todoBeingEdited = null;
    };

    handleDestroy = () => {
        this.props.todo.destroy();
        this.props.viewStore.todoBeingEdited = null;
    };

    handleEdit = () => {
        const todo = this.props.todo;
        this.props.viewStore.todoBeingEdited = todo;
        this.editText = todo.title;
    };

    handleKeyDown = (event) => {
        if (event.which === ESCAPE_KEY) {
            this.editText = this.props.todo.title;
            this.props.viewStore.todoBeingEdited = null;
        } else if (event.which === ENTER_KEY) {
            this.handleSubmit(event);
        }
    };

    handleChange = (event) => {
        this.editText = event.target.value;
    };

    handleToggle = () => {
        this.props.todo.toggle();
    };
}

interface TodoItemProps {
    viewStore: ViewStore,
    todo: TodoModel
}
