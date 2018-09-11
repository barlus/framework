import * as React    from '@barlus/react'
import {Header}      from './Header'
import {MainSection} from './MainSection';
import {Theme}       from "./TodoAppStyle"


export {TodoApp};

class TodoApp extends React.Component<{}> {
  render() {
    return <div className={Theme.TodoApp}>
      <Header/>
      <MainSection/>
    </div>
  }
}

