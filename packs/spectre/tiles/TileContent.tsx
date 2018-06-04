import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class TileContent extends React.PureComponent<TileContentProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<div {...otherProps} class={classes(Theme.tileContent, className)}>
            {children}
        </div>)
    }
}

export interface TileContentProps {
    className?: string,
}