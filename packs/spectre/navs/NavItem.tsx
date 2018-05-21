import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class NavItem extends React.PureComponent<NavItemProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            active,
            ...otherProps
        } = this.props;
        return (<li {...otherProps} class={classes(Theme.navItem,{[Theme.active]:active},className)}>
            {children}
        </li>)
    }
}

export interface NavItemProps {
    className?: string,
    active?:boolean
}