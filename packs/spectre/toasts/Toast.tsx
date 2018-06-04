import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';


export class Toast extends React.PureComponent<ToastProps, {}> {
    render() {
        const {
            className,
            // Colors
            primary,success, error, warning,
            children,
            ...otherProps
        } = this.props;
        return <div {...otherProps} class={
            classes(Theme.Toast, {
            [ Theme.success ]: success,
            [ Theme.primary ]: primary,
            [ Theme.error ]: error,
            [ Theme.success ]: success,
            [ Theme.warning ]: warning,
        }, className)
    }>{children}</div>
    }
}

export interface ToastProps {
    className?: string,
    success?: boolean,
    primary?: boolean,
    warning?: boolean,
    error?: boolean
}