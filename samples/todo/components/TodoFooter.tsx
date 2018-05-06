import * as React from '@barlus/nerv';
import { inject,observer } from '@barlus/storex';
import { TodoStore } from '../stores/TodoStore';
import { ViewStore } from '../stores/ViewStore';
import { pluralize } from '../utils';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';

@inject('todoStore','viewStore')
@observer
export class TodoFooter extends React.Component<TodoFooterProps> {

    render() {
        const todoStore = this.props.todoStore;
        if (!todoStore.activeTodoCount && !todoStore.completedCount) {
            return '';
        }

        const activeTodoWord = pluralize(todoStore.activeTodoCount, 'item');

        return (
            <footer className="footer">
				<span className="todo-count">
					<strong>{todoStore.activeTodoCount}</strong> {activeTodoWord} left
				</span>
                <ul className="filters">
                    {this.renderFilterLink(ALL_TODOS, "", "All")}
                    {this.renderFilterLink(ACTIVE_TODOS, "active", "Active")}
                    {this.renderFilterLink(COMPLETED_TODOS, "completed", "Completed")}
                </ul>
                {todoStore.completedCount === 0
                    ? ''
                    : <button
                        className="clear-completed"
                        onClick={this.clearCompleted}>
                        Clear completed
                    </button>
                }
            </footer>
        );
    }

    renderFilterLink(filterName, url, caption) {
        return (<li>
            <a href={"#/" + url}
               className={filterName === this.props.viewStore.todoFilter ? "selected" : ""}>
                {caption}
            </a>
            {' '}
        </li>)
    }

    clearCompleted = () => {
        this.props.todoStore.clearCompleted();
    };
}

interface TodoFooterProps {
    viewStore?: ViewStore,
    todoStore?: TodoStore
}