import * as React from '@barlus/nerv';
import { inject, observer } from '@barlus/storex';
import { observable, computed } from '@barlus/mobx';
import { TodoModel } from '../models/TodoModel';
import { ViewStore } from '../stores/ViewStore';

import {Theme} from './styles/TodoItem';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

@inject('viewStore')
@observer
export class TodoItem extends React.Component<TodoItemProps> {
    @observable editText = "";

    render() {
        const viewStore = this.context.mobxStores.viewStore;
        const { todo } = this.props;
        return (
            <li className={[
                todo.completed ? Theme.TodoItemCompleted : "",
                computed(() => todo === viewStore.todoBeingEdited ? Theme.TodoItemEditing : ""),
                Theme.TodoItem
            ].join(" ")}>
                <div class={Theme.TodoItemView}>
                    <input
                        class={Theme.TodoItemToggle}
                        type="checkbox"
                        checked={todo.completed}
                        onChange={this.handleToggle}
                    />
                    <label onDoubleClick={this.handleEdit}>
                        {todo.title}
                    </label>
                    <button class={Theme.TodoItemDestroy} onClick={this.handleDestroy}/>
                </div>
                <input
                    ref="editField"
                    class={Theme.TodoEntry}
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
        this.context.mobxStores.viewStore.todoBeingEdited = null;
    };

    handleDestroy = () => {
        this.props.todo.destroy();
        this.context.mobxStores.viewStore.todoBeingEdited = null;
    };

    handleEdit = () => {
        const todo = this.props.todo;
        this.context.mobxStores.viewStore.todoBeingEdited = todo;
        this.editText = todo.title;
    };

    handleKeyDown = (event) => {
        if (event.which === ESCAPE_KEY) {
            this.editText = this.props.todo.title;
            this.context.mobxStores.viewStore.todoBeingEdited = null;
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
