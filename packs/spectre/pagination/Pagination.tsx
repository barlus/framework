import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class Pagination extends React.PureComponent<PaginationProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<ul {...otherProps} class={classes(Theme.Pagination,className)}>
            {children}
        </ul>)
    }
}

export interface PaginationProps {
    className?: string,
}