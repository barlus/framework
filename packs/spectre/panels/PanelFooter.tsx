import * as React from "@barlus/nerv";
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
        return (<div {...otherProps} class={classes(Theme.footer,className)}>
            {children}
        </div>)
    }
}

export interface PanelFooterProps {
    className?: string,
}