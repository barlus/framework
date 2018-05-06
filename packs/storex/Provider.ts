import * as React from '@barlus/nerv';

const specialKeys = {
    children: true,
    key: true,
    ref: true
};

export class Provider<P, S> extends React.Component<P, S> {
    public render() {
        return this.props.children;
    }
    public getChildContext() {
        const stores = {} as any;
        // inherit stores
        const props = this.props;
        const baseStores = this.context.mobxStores;
        if (baseStores) {
            for (const key in baseStores) {
                stores[key] = baseStores[key];
            }
        }
        // add own stores
        for (const key in props) {
            if ((specialKeys as any)[key] === void 0 && key !== 'suppressChangedStoreWarning') {
                stores[key] = props[key];
            }
        }
        return {
            mobxStores: stores
        };
    }
}
