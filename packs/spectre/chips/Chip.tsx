import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class Chip extends React.PureComponent<ChipProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<span {...otherProps} class={classes(Theme.Chip, className)}>
            {children}
        </span>)
    }
}

export interface ChipProps {
    className?: string,
}