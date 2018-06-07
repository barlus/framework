import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class Button extends React.PureComponent<ButtonProps, {}> {
    render() {
        const {
            className,
            // Styles.
            primary, link,
            // Colors
            success, error, warning,
            // Sizes
            block, small, large, action, circle,clear,
            // States
            active, loading,
            children,
            ...otherProps
        } = this.props;
        return <button {...otherProps} className={
            classes(Theme.Button, {
                [ Theme.primary ]: primary,
                [ Theme.link ]: link,
                [ Theme.success ]: success,
                [ Theme.error ]: error,
                [ Theme.warning ]: warning,
                [ Theme.block ]: block,
                [ Theme.small ]: small,
                [ Theme.large ]: large,
                [ Theme.action ]: action || circle,
                [ Theme.circle ]: circle,
                [ Theme.clear ]: clear,
                [ Theme.active ]: active,
                [ Theme.loading ]: loading
            }, className)
        }>{children}</button>
    }
}

export interface ButtonProps {
    className?: string,
    primary?: boolean,
    link?: boolean,
    success?: boolean,
    warning?: boolean,
    error?: boolean,
    block?: boolean,
    small?: boolean,
    large?: boolean,
    clear?: boolean,
    action?: boolean,
    circle?: boolean,
    active?: boolean,
    loading?: boolean
}