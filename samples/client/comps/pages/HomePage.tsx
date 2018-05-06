import * as React from '@barlus/nerv/index';
import { observer, store} from '@barlus/storex';
import { AuthStore, RoutesStore } from '../../stores';

@observer
export class HomePage extends React.Component {
    @store auth: AuthStore;
    @store router: RoutesStore;
    render() {
        return (
            <div>
                <h1>Home Page</h1>
                <ul>
                    <li><a href="/#/login">Login</a></li>
                    <li><a href="/#/register">Register</a></li>
                </ul>
            </div>
        );
    }
}
