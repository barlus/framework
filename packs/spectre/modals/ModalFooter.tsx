import * as React from "@barlus/react";
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
        return (<div {...otherProps} className={classes(Theme.modalFooter,className)}>
            {children}
        </div>)
    }
}

export interface ModalFooterProps {
    className?: string,
}