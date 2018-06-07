import * as React from "@barlus/react";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class InputGroupAddon extends React.PureComponent<InputGroupAddonProp, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            small,
            large,
            ...otherProps
        } = this.props;
        return (<span className={
                classes(Theme.inputGroupAddon,{
                    [ Theme.addonSm ]: small,
                    [ Theme.addonLg ]: large,
                }, className)
            }{...otherProps}>
            {children}
        </span>
        )
    }
}

export interface InputGroupAddonProp {
    className?: string,
    small?:boolean
    large?:boolean
}