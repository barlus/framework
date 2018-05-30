import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class OffCanvasSidebar extends React.PureComponent<OffCanvasSidebarProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<div {...otherProps} class={classes(Theme.sidebar,className)}>
            {children}
        </div>)
    }
}

export interface OffCanvasSidebarProps {
    className?: string,
}