import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class CardHeader extends React.PureComponent<CardHeaderProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<div {...otherProps} class={classes(Theme.cardHeader, className)}>
            {children}
        </div>)
    }
}

export interface CardHeaderProps {
    className?: string,
}