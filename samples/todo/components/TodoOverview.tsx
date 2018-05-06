import * as React from '@barlus/nerv';
import { inject,observer } from '@barlus/storex';
import { ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';
import { TodoStore } from '../stores/TodoStore';
import { ViewStore } from '../stores/ViewStore';

import { TodoItem } from './TodoItem';

@inject('todoStore', 'viewStore')
@observer
export class TodoOverview extends React.Component<TodoOverviewProps> {
    render() {
        const { todoStore, viewStore } = this.props;
        if (todoStore.todos.length === 0) {
            return '';
        }
        return <section className="main">
            <input
                className="toggle-all"
                type="checkbox"
                onChange={this.toggleAll}
                checked={todoStore.activeTodoCount === 0}
            />
            <ul className="todo-list">
                {this.getVisibleTodos().map(todo =>
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        viewStore={viewStore}
                    />
                )}
            </ul>
        </section>
    }
    getVisibleTodos() {
        return this.props.todoStore.todos.filter(todo => {
            switch (this.props.viewStore.todoFilter) {
                case ACTIVE_TODOS:
                    return !todo.completed;
                case COMPLETED_TODOS:
                    return todo.completed;
                default:
                    return true;
            }
        });
    }

    toggleAll = (event) => {
        var checked = event.target.checked;
        this.props.todoStore.toggleAll(checked);
    };
}

interface TodoOverviewProps {
    viewStore?: ViewStore,
    todoStore?: TodoStore
}