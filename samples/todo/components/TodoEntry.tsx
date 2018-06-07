import * as React from '@barlus/nerv';
import { inject, observer } from '@barlus/storex';
import {Theme} from './styles/TodoEntry';

const ENTER_KEY = 13;

interface TodoEntryProps {}

@inject('todoStore')
@observer
export class TodoEntry extends React.Component<TodoEntryProps> {
    render() {
        return <input
            ref="newField"
            placeholder="What needs to be done?"
            onKeyDown={this.handleNewTodoKeyDown}
            autoFocus={true}
            class={Theme.TodoEntry}
        />;
    }

    handleNewTodoKeyDown = (event) => {
        if (event.keyCode !== ENTER_KEY) {
            return;
        }

        event.preventDefault();

        const val = React.findDOMNode(this.refs.newField).value.trim();

        if (val) {

            this.context.mobxStores.todoStore.addTodo(val);
            React.findDOMNode(this.refs.newField).value = '';
        }
    };
}

// TodoEntry.propTypes = {
//     todoStore: PropTypes.object.isRequired
// };
