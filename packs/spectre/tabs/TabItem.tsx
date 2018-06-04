import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class TabItem extends React.PureComponent<TabItemProps, {}> {
    render() {
        const {
            className,
            // Styles.
            active,
            action,
            children,

            ...otherProps
        } = this.props;
        return (<li {...otherProps} class={classes(Theme.tabItem,{[Theme.active]:active,[Theme.tabAction]:action},className)}>
            {children}
        </li>)
    }
}

export interface TabItemProps {
    className?: string,
    active?:boolean
    action?:boolean
}