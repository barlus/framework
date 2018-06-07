import * as React from "@barlus/react";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class Form extends React.PureComponent<FormProps, {}> {
    render() {
        const {
            className,
            // Styles.
            horizontal,
            children,
            ...otherProps
        } = this.props;
        return <form {...otherProps} className={
            classes({
                [ Theme.formHorizontal ]: horizontal,
            }, className)
        }>{children}</form>
    }
}

export interface FormProps {
    className?: string,
    horizontal?:boolean
}