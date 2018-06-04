import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class CardSubTitle extends React.PureComponent<CardSubTitleProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<div {...otherProps} class={classes(Theme.cardSubtitle, className)}>
            {children}
        </div>)
    }
}

export interface CardSubTitleProps {
    className?: string,
}