import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class OffCanvasOverlay extends React.PureComponent<OffCanvasOverlayProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<div {...otherProps} className={classes(Theme.overlay,className)}>
            {children}
        </div>)
    }
}

export interface OffCanvasOverlayProps {
    className?: string,
}