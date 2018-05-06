import "@barlus/runtime"
import * as React from '@barlus/nerv';
import { Provider } from '@barlus/storex';
import { TodoStore } from './stores/TodoStore';
import { ViewStore } from './stores/ViewStore';
import { TodoApp } from './components/TodoApp';

import { initDevTools } from '@barlus/nerv/devtools';

const todoStore = TodoStore.fromJS([]);
const viewStore = new ViewStore();

todoStore.subscribeLocalstorageToStore();
initDevTools();
React.render(
    <Provider todoStore={todoStore} viewStore={viewStore}>
        <TodoApp/>
    </Provider>,
    document.body
);