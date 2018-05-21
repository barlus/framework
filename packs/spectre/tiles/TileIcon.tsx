import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class TileIcon extends React.PureComponent<TileIconProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<div {...otherProps} class={classes(Theme.tileIcon, className)}>
            {children}
        </div>)
    }
}

export interface TileIconProps {
    className?: string,
}