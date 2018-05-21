import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class Popover extends React.PureComponent<PopoverProps, {}> {
    render() {
        const {
            className,
            // Styles.
            left,right,bottom,
            children,
            ...otherProps
        } = this.props;
        return (<div {...otherProps} class={classes(Theme.Popover,{
            [Theme.left]:left,
            [Theme.right]:right,
            [Theme.bottom]:bottom
        },className)}>
            {children}
        </div>)
    }
}

export interface PopoverProps {
    className?: string,
    left?:boolean
    right?:boolean
    bottom?:boolean
}