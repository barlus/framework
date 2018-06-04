import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';
import {FormGroup} from "./FormGroup";
import {Label} from "./Label";

export class CheckBox extends React.Component<CheckBoxProps, {}> {
    render() {
        const {
            className,
            // Styles.
            label,
            success,
            error,
            id,
            // sizing
            small,
            large,
            children,
            ...otherProps
        } = this.props;

        return <Label className={
            classes(Theme.checkbox, {
                [ Theme.inputLg ]: large,
                [ Theme.inputSm ]: small,
                [ Theme.success ]: success,
                [ Theme.error ]: error,
            }, className)
        }>
            <input {...otherProps} type="checkbox" />
            <i class={classes(Theme.icon)} />
            {label}
        </Label>

    }
}

export interface CheckBoxProps {
    className?: string,
    success?: boolean
    error?: boolean
    label?: string,
    small?: boolean,
    large?: boolean
}