import { RouterStore, HistoryAdapter} from '@barlus/routex';
import { HashHistory, BrowserHistory, MemoryHistory} from '@barlus/history';

export class RoutesStore extends RouterStore {
    constructor() {
        super();
        this.init([
            { name: 'login', pattern: '/login' },
            { name: 'register', pattern: '/register' },
            { name: 'home', pattern: '/' },
        ], 'notFound');

        const history = new HashHistory();
        //const history = new BrowserHistory({basename: '/'});
        //const history = new MemoryHistory({basename: '/'});
        window['thistory']=history;
        const historyAdapter = new HistoryAdapter(this, history);
        historyAdapter.observeRouterStateChanges();
    }
}