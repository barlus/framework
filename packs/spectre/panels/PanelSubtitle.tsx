import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class PanelSubtitle extends React.PureComponent<PanelSubtitleProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<div {...otherProps} class={classes(Theme.panelSubtitle,className)}>
            {children}
        </div>)
    }
}

export interface PanelSubtitleProps {
    className?: string,
}