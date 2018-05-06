import { action, observable, comparer } from '@barlus/mobx';


export class AuthStore {
    @observable user = {
        username:'sergey',
        password:'pass'
    };
    @observable child = {
        username:'sergey',
        password:'pass'
    };
}
