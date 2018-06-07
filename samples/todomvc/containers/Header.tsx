import * as React from '@barlus/react'
import { connect } from '@barlus/redux'

import TodoTextInput from '../components/TodoTextInput'
import { addTodo } from '../actions/index'

export const Header = ({ addTodo }) => (
    <header className="header">
        <h1>todos</h1>
        <TodoTextInput
            newTodo
            onSave={(text) => {
                if (text.length !== 0) {
                    addTodo(text)
                }
            }}
            placeholder="What needs to be done ?"
        />
    </header>
);

export default connect(null, { addTodo })(Header)