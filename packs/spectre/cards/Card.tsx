import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class Card extends React.PureComponent<CardProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<div {...otherProps} class={classes(Theme.Card, className)}>
            {children}
        </div>)
    }
}

export interface CardProps {
    className?: string,
}