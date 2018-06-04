import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class Menu extends React.PureComponent<MenuProps, {}> {
    render() {
        const {
            className,
            // Styles.
            centered,
            children,
            ...otherProps
        } = this.props;
        return (<ul {...otherProps} class={classes(Theme.menu ,className)}>
            {children}
        </ul>)
    }
}

export interface MenuProps {
    className?: string,
}