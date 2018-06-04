import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class MenuDivider extends React.PureComponent<MenuDividerProps, {}> {
    render() {
        const {
            className,
            // Styles.
            content,
            children,
            ...otherProps
        } = this.props;
        return <li {...otherProps} data-content={content} class={classes(Theme.divider, className)}/>
    }
}

export interface MenuDividerProps {
    className?: string,
    content?: string
}