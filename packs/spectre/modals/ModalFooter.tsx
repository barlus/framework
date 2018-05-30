import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class ModalFooter extends React.PureComponent<ModalFooterProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<div {...otherProps} class={classes(Theme.modalFooter,className)}>
            {children}
        </div>)
    }
}

export interface ModalFooterProps {
    className?: string,
}