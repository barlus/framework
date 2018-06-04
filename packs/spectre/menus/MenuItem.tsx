import * as React from "@barlus/nerv";
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
        return (<li {...otherProps} class={classes(Theme.menuItem ,className)}>
            {children}
        </li>)
    }
}

export interface MenuItemProps {
    className?: string,
}