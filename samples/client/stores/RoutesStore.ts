import { RouterStore, HistoryAdapter} from '@barlus/routex';
import { createHashHistory } from '@barlus/history';

export class RoutesStore extends RouterStore {
    constructor() {
        super();
        this.init([
            { name: 'login', pattern: '/login' },
            { name: 'register', pattern: '/register' },
            { name: 'home', pattern: '/' },
        ], 'notFound');
        const history = createHashHistory({
            basename: '/'
        });
        const historyAdapter = new HistoryAdapter(this, history);
        historyAdapter.observeRouterStateChanges();
    }
}