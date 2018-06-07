import * as React from "@barlus/react";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class CardTitle extends React.PureComponent<CardTitleProps, {}> {
    render() {
        const {
            className,
            // Styles.
            h1, h2, h3, h4, h5, h6,
            children,
            ...otherProps
        } = this.props;
        return (<div {...otherProps} className={classes(Theme.cardTitle,{
            [Theme.h1]:h1,
            [Theme.h2]:h2,
            [Theme.h3]:h3,
            [Theme.h4]:h4,
            [Theme.h5]:h5,
            [Theme.h6]:h6
        }, className)}>
            {children}
        </div>)
    }
}

export interface CardTitleProps {
    className?: string,
    h1?:boolean,
    h2?:boolean,
    h3?:boolean,
    h4?:boolean,
    h5?:boolean,
    h6?:boolean
}