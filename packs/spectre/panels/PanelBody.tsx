import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class PanelBody extends React.PureComponent<PanelBodyProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<div {...otherProps} class={classes(Theme.body,className)}>
            {children}
        </div>)
    }
}

export interface PanelBodyProps {
    className?: string,
}