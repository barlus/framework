import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class EmptyAction extends React.PureComponent<EmptyActionProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<div {...otherProps} class={classes(Theme.emptyAction, className)}>
            {children}
        </div>)
    }
}

export interface EmptyActionProps {
    className?: string,
}