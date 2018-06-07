import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class TileAction extends React.PureComponent<TileActionProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<div {...otherProps} className={classes(Theme.tileAction, className)}>
            {children}
        </div>)
    }
}

export interface TileActionProps {
    className?: string,
}