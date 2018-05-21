import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class EmptyIcon extends React.PureComponent<EmptyIconProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<div {...otherProps} class={classes(Theme.emptyIcon, className)}>
            {children}
        </div>)
    }
}

export interface EmptyIconProps {
    className?: string,
}