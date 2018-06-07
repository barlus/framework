import * as React from "@barlus/react";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class TileTitle extends React.PureComponent<TileTitleProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<p {...otherProps} className={classes(Theme.tileTitle, className)}>
            {children}
        </p>)
    }
}

export interface TileTitleProps {
    className?: string,
}