import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class Dropdown extends React.PureComponent<DropdownProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            right,active,
            ...otherProps
        } = this.props;
        return (<div {...otherProps} class={classes(Theme.Dropdown,{[Theme.right]:right,[Theme.active]:active},className)}>
            {children}
        </div>)
    }
}

export interface DropdownProps {
    className?: string,
    right?:boolean
    active?:boolean
}