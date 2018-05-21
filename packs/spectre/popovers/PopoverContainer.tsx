import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class PopoverContainer extends React.PureComponent<PopoverContainerProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<div {...otherProps} class={classes(Theme.popoverContainer,className)}>
            {children}
        </div>)
    }
}

export interface PopoverContainerProps {
    className?: string,

}