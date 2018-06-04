import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class BreadcrumbItem extends React.PureComponent<BreadcrumbItemProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<li {...otherProps} class={classes(Theme.breadcrumbItem, className)}>
            {children}
        </li>)
    }
}

export interface BreadcrumbItemProps {
    className?: string,
}