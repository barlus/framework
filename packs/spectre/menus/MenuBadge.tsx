import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class MenuBadge extends React.PureComponent<MenuBadgeProps, {}> {
    render() {
        const {
            className,
            // Styles.
            centered,
            children,
            ...otherProps
        } = this.props;
        return (<div {...otherProps} class={classes(Theme.menuBadge ,className)}>
            {children}
        </div>)
    }
}

export interface MenuBadgeProps {
    className?: string,
}