import * as React from "@barlus/react";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class FigureCaption extends React.PureComponent<FigureCaptionProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,

            ...otherProps
        } = this.props;
        return (<figcaption className={
                classes(Theme.figureCaption,className)
            }{...otherProps}>
            {children}
        </figcaption>
        )
    }
}

export interface FigureCaptionProps {
    className?: string,
}