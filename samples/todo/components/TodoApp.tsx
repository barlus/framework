import * as React from '@barlus/nerv';
import { inject, observer } from '@barlus/storex';
import { TodoStore } from '../stores/TodoStore';
import { ViewStore } from '../stores/ViewStore';
import { TodoEntry } from './TodoEntry';
import { TodoOverview } from './TodoOverview';
import { TodoFooter } from './TodoFooter';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';
import {Theme} from "./styles/TodoApp";
import { cssRule } from '@barlus/styles';


cssRule('.form-autocomplete', {
    "position": "relative"
});

declare const Router;

interface TodoAppProps {

}

@inject('todoStore','viewStore')
@observer
export class TodoApp extends React.Component<TodoAppProps> {
    render() {
        const { todoStore, viewStore } = this.context.mobxStores;
        return (
            <div class={Theme.TodoApp}>
                <header class={Theme.Header}>
                    <h1 >todos</h1>
                    <TodoEntry />
                </header>
                <TodoOverview/>
                <TodoFooter/>
            </div>
        );
    }
    componentDidMount() {
        const viewStore = this.context.mobxStores.viewStore;
        const router = Router({
            '/': function () {
                viewStore.todoFilter = ALL_TODOS;
            },
            '/active': function () {
                viewStore.todoFilter = ACTIVE_TODOS;
            },
            '/completed': function () {
                viewStore.todoFilter = COMPLETED_TODOS;
            }
        });
        router.init('/');
    }
}
//
// TodoApp.propTypes = {
//     viewStore: PropTypes.object.isRequired,
//     todoStore: PropTypes.object.isRequired
// };
