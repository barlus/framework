import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class PanelNav extends React.PureComponent<PanelNavProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<nav {...otherProps} class={classes(Theme.nav,className)}>
            {children}
        </nav>)
    }
}

export interface PanelNavProps {
    className?: string,
}