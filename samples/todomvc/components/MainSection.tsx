import * as React              from '@barlus/react'
import {connected}             from '@barlus/redux';
import {Actions}               from '../actions/index';
import {getCompletedTodoCount} from '../selectors/index';
import {Footer}                from './Footer'
import {TodoList}              from './TodoList'


@connected
export class MainSection extends React.Component<{}> {

  @connected
  get actions() {
    return connected.actions(Actions)
  }

  @connected
  get store() {
    return connected.state((state) => {
      return {
        todosCount: state.todos.length,
        completedCount: getCompletedTodoCount(state)
      }
    })
  }

  render() {
    const { todosCount, completedCount } = this.store;
    return <section className="main">
      {!!todosCount && <span>
        <input
          className="toggle-all"
          type="checkbox"
          checked={completedCount === todosCount}
        />
        <label onClick={this.actions.completeAllTodos}/>
      </span>}
      <TodoList/>
      {!!todosCount && <Footer
        completedCount={completedCount}
        activeCount={todosCount - completedCount}
        onClearCompleted={this.actions.clearCompleted}
      />}
    </section>
  }
}