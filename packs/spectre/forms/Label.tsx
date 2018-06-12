import * as React from "@barlus/react";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class Label extends React.PureComponent<LabelProps, {}> {
    render() {
        const {
            className,
            // Styles.
            label,
            id,
            // sizeing
            small,
            large,
            children,
            ...otherProps
        } = this.props;
        return (<label className={
                classes(Theme.formLabel, {
                    [ Theme.labelSm ]: small,
                    [ Theme.labelLg ]: large,
                }, className)
            }{...otherProps}>
            {children}
        </label>
        )
    }
}

export interface LabelProps {
    [k:string]:any;
    className?: string,
    id?:string,
    small?: boolean,
    large?: boolean,
}