import * as React from '@barlus/nerv/index';
import { observer, store} from '@barlus/storex';
import { AuthStore, RoutesStore } from '../../stores';

@observer
export class RegisterPage extends React.Component {
    @store auth: AuthStore;
    @store router: RoutesStore;
    render() {
        return (
            <div>
                <h1>Register Page</h1>
                <ul>
                    <li><a href="/#">Home</a></li>
                    <li><a href="/#/login">Login</a></li>
                </ul>
            </div>
        );
    }
}
