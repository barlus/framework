import { RouterStore, HistoryAdapter} from '@barlus/routex';
import { HashHistory } from '@barlus/history';

export class RoutesStore extends RouterStore {
    constructor(docs) {
        super();
        const routes = [];
        Object.keys(docs).forEach(d=>{
            Object.keys(docs[d]).forEach(k=>{
                const name = docs[d][k].id||docs[d][k].name;
                routes.push({
                    name: name,
                    pattern: `/${name}`
                });
            })
        });
        this.init(routes, routes[0].name);
        const history = new HashHistory({
            basename: '/'
        });
        const historyAdapter = new HistoryAdapter(this, history);
        historyAdapter.observeRouterStateChanges();
    }
}