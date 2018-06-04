import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class PaginationSubtitle extends React.PureComponent<PaginationSubtitleProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<div {...otherProps} class={classes(Theme.paginationSubTitle,className)}>
            {children}
        </div>)
    }
}

export interface PaginationSubtitleProps {
    className?: string,
}