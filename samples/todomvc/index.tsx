import * as React from '@barlus/react'
import { createStore, Provider } from '@barlus/redux';

import App from './components/App';
import reducer from './reducers/index';

const store = createStore(reducer,
    window['__REDUX_DEVTOOLS_EXTENSION__'] &&
    window['__REDUX_DEVTOOLS_EXTENSION__']()
);


React.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
