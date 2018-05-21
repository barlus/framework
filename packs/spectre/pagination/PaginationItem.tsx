import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class PaginationItem extends React.PureComponent<PaginationItemProps, {}> {
    render() {
        const {
            className,
            // Styles.
            prev,next,disabled,active,
            children,
            ...otherProps
        } = this.props;
        return (<li {...otherProps} class={classes(Theme.paginationItem,{
            [Theme.paginationPrev]:prev,
            [Theme.paginationNext]:next,
            [Theme.disabled]:disabled,
            [Theme.active]:active,
        },className)}>
            {children}
        </li>)
    }
}

export interface PaginationItemProps {
    className?: string,
    prev?: boolean,
    next?: boolean,
    disabled?: boolean,
    active?: boolean,
}