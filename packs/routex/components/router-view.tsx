import * as React from '@barlus/nerv';
import { VirtualNode } from '@barlus/nerv/shared/index';
//import { observer } from '../../stores';
import { RouterStore } from '../router-store';

export interface ViewMap {
    [routeName: string]: VirtualNode;
}

export interface RouterViewProps {
    routerStore: RouterStore;
    //viewMap: ViewMap;
}

/**
 * Watches the router state and instantiates the associated UI component.
 * It expects two props: the `routerStore` and a `viewMap`. The `viewMap`
 * is a simple mapping from `routeNames` to React components.
 */
//@observer
export class RouterView extends React.Component<RouterViewProps, {}> {
    componentWillMount(){
        const {routerStore,children} = this.props;
        const routes = [];
        React.Children.forEach(children,(c)=>{
            routes.push({
                name:c.props.name,
                pattern:c.props.pattern
            })
        });
        routerStore.init(routes,'notFound')
    }
    render() {
        const {
            routerStore: { routerState },
            children
        } = this.props;
        let view = '';
        React.Children.forEach(children,(c)=>{
            if(routerState.routeName == c.props.name){
                view = c
            }
        },{});
        return view;
    }
}
