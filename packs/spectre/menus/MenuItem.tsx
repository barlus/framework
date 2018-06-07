import * as React from "@barlus/react";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class MenuItem extends React.PureComponent<MenuItemProps, {}> {
    render() {
        const {
            className,
            // Styles.
            centered,
            children,
            ...otherProps
        } = this.props;
        return (<li {...otherProps} className={classes(Theme.menuItem ,className)}>
            {children}
        </li>)
    }
}

export interface MenuItemProps {
    className?: string,
}