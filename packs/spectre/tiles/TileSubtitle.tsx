import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class TileSubtitle extends React.PureComponent<TileSubtitleProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<p {...otherProps} class={classes(Theme.tileSubtitle, className)}>
            {children}
        </p>)
    }
}

export interface TileSubtitleProps {
    className?: string,
}