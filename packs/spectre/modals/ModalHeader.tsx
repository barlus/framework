import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class ModalHeader extends React.PureComponent<ModalHeaderProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<div {...otherProps} class={classes(Theme.modalHeader,className)}>
            {children}
        </div>)
    }
}

export interface ModalHeaderProps {
    className?: string,
}