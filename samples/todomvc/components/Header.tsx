import * as React           from '@barlus/react'
import {Dispatch}           from '@barlus/redux'
import {connected}          from '@barlus/redux'
import {bindActionCreators} from '@barlus/redux'
import {TodoTextInput}      from './TodoTextInput'
import {Actions}            from '../actions/index'


@connected
export class Header extends React.Component<HeaderProps> {

  @connected
  get actions() {
    return connected.actions((dispatch) => {
      return bindActionCreators(Actions, dispatch)
    })
  }

  render() {
    return <header className="header">
      <h1>todos</h1>
      <TodoTextInput
        newTodo
        placeholder="What needs to be done ?"
        onSave={(text) => {
          if (text.length !== 0) {
            this.actions.addTodo(text)
          }
        }}
      />
    </header>
  }
}

interface HeaderProps {
  dispatch?: Dispatch<Actions>
}


