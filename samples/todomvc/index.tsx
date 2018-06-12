import '@barlus/runtime/Reflect'

import * as React    from '@barlus/react';
import {Provider}    from '@barlus/redux';
import {createStore} from '@barlus/redux';

import {TodoApp} from './components/TodoApp';
import reducer   from './reducers/index';

const store = createStore(reducer,
  window[ '__REDUX_DEVTOOLS_EXTENSION__' ] &&
  window[ '__REDUX_DEVTOOLS_EXTENSION__' ]()
);

React.render(
  <Provider store={store}>
    <TodoApp/>
  </Provider>,
  document.getElementById('root')
);
