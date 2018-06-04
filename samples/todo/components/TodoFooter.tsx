import * as React from '@barlus/nerv';
import { inject,observer } from '@barlus/storex';
import { TodoStore } from '../stores/TodoStore';
import { ViewStore } from '../stores/ViewStore';
import { pluralize } from '../utils';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';

import {Theme} from './styles/TodoFooter';

@inject('todoStore','viewStore')
@observer
export class TodoFooter extends React.Component<TodoFooterProps> {

    render() {
        const todoStore = this.context.mobxStores.todoStore;
        if (!todoStore.activeTodoCount && !todoStore.completedCount) {
            return '';
        }

        const activeTodoWord = pluralize(todoStore.activeTodoCount, 'item');

        return (
            <footer class={Theme.TodoFooter}>
				<span class={Theme.TodoCount}>
					<strong>{todoStore.activeTodoCount}</strong> {activeTodoWord} left
				</span>
                <ul class={Theme.TodoFilters}>
                    {this.renderFilterLink(ALL_TODOS, "", "All")}
                    {this.renderFilterLink(ACTIVE_TODOS, "active", "Active")}
                    {this.renderFilterLink(COMPLETED_TODOS, "completed", "Completed")}
                </ul>
                {todoStore.completedCount === 0
                    ? ''
                    : <button
                        class={Theme.TodoFooterClearCompleted}
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
               className={filterName === this.context.mobxStores.viewStore.todoFilter ? "selected" : ""}>
                {caption}
            </a>
            {' '}
        </li>)
    }

    clearCompleted = () => {
        this.context.mobxStores.todoStore.clearCompleted();
    };
}

interface TodoFooterProps {
    viewStore?: ViewStore,
    todoStore?: TodoStore
}