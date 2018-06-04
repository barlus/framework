import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class Breadcrumb extends React.PureComponent<BreadcrumbProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<ul {...otherProps} class={classes(Theme.breadcrumb, className)}>
            {children}
        </ul>)
    }
}

export interface BreadcrumbProps {
    className?: string,
}