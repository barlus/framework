import * as React from "@barlus/react";
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
        return (<li {...otherProps} className={classes(Theme.tabItem,{[Theme.active]:active,[Theme.tabAction]:action},className)}>
            {children}
        </li>)
    }
}

export interface TabItemProps {
    className?: string,
    active?:boolean
    action?:boolean
}