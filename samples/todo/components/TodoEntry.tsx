import * as React from '@barlus/nerv';
import { inject, observer } from '@barlus/storex';
import { TodoStore } from '../stores/TodoStore';

const ENTER_KEY = 13;

interface TodoEntryProps {
    todoStore?: TodoStore
}

@inject('todoStore')
@observer
export class TodoEntry extends React.Component<TodoEntryProps> {
    render() {
        return <input
            ref="newField"
            className="new-todo"
            placeholder="What needs to be done?"
            onKeyDown={this.handleNewTodoKeyDown}
            autoFocus={true}
        />;
    }

    handleNewTodoKeyDown = (event) => {
        if (event.keyCode !== ENTER_KEY) {
            return;
        }

        event.preventDefault();

        const val = React.findDOMNode(this.refs.newField).value.trim();

        if (val) {

            this.props.todoStore.addTodo(val);
            React.findDOMNode(this.refs.newField).value = '';
        }
    };
}

// TodoEntry.propTypes = {
//     todoStore: PropTypes.object.isRequired
// };
