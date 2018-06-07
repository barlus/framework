import * as React from "@barlus/react";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class PanelFooter extends React.PureComponent<PanelFooterProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<div {...otherProps} className={classes(Theme.panelFooter,className)}>
            {children}
        </div>)
    }
}

export interface PanelFooterProps {
    className?: string,
}