import * as React from '@barlus/nerv';
import { inject } from '@barlus/storex';
import { observer, store } from '@barlus/storex';
import { AuthStore } from '../stores';
import { RoutesStore } from '../stores/RoutesStore';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

@observer
export class Router extends React.Component {
    @store auth: AuthStore;
    @store router: RoutesStore;



    render() {
        const routeName = this.router.routerState.routeName;
        let page = null;
        if (routeName == 'home') {
            page = <HomePage/>
        } else if (routeName == 'register') {
            page = <RegisterPage/>
        } else {
            page = <LoginPage/>
        }
        return page;
    }
}