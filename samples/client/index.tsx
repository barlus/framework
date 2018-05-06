import '@barlus/runtime';
import * as React from '@barlus/nerv';
import * as Css from '@barlus/styles';
import { initDevTools } from '@barlus/nerv/devtools';
import { Provider } from '@barlus/storex';
import { Router } from './comps/Router';
import { RoutesStore, AuthStore } from './stores';

const routerStore = new RoutesStore();
const authStore = new AuthStore();
// routerStore.init([
//     {name:'home',pattern:'/'},
//     {name:'department',pattern:'/department/:name'}
// ]);


class App extends React.Component<{}> {
    render() {
        return <Provider router={routerStore} auth={authStore}>
            <Router/>
        </Provider>
    }
}

Css.normalize();
Css.setupPage('body',false);
Css.cssRule('body',{
    fontFamily:'Roboto',
    display:'flex',
    fontWeight:'normal'
});
Css.cssRule('h2',{
    fontWeight:300,
    fontSize:20
});
Css.cssRule('label',{
    fontWeight:400,
    fontSize:9
});
Css.cssRule('h1,h2,h3,h4,h5',{
    fontWeight:'lighter',
    margin:0
});


initDevTools();
React.render(<App/>, document.body);