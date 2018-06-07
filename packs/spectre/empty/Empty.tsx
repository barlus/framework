import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class Empty extends React.PureComponent<EmptyProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<div {...otherProps} className={classes(Theme.empty, className)}>
            {children}
        </div>)
    }
}

export interface EmptyProps {
    className?: string,
}