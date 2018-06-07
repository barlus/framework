import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class EmptySubtitle extends React.PureComponent<EmptySubtitleProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<p {...otherProps} className={classes(Theme.emptySubtitle, className)}>
            {children}
        </p>)
    }
}

export interface EmptySubtitleProps {
    className?: string,
}