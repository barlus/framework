import * as React from "@barlus/react";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class CardBody extends React.PureComponent<CardBodyProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<div {...otherProps} className={classes(Theme.cardBody, className)}>
            {children}
        </div>)
    }
}

export interface CardBodyProps {
    className?: string,
}