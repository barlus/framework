import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';
import {FormGroup} from "./FormGroup";

export class Input extends React.PureComponent<InputProps, {}> {
    render() {
        const {
            className,
            // Styles.
            label,
            success,
            error,
            iconLeft,
            iconRight,
            id,
            small,
            large,
            children,
            ...otherProps
        } = this.props;
        const formGroupProps = { label, id };
        const inputProps = { id, ...otherProps };

        let inputComp = <input {...inputProps} className={
            classes(Theme.formInput, {
                [ Theme.isSuccess ]: success,
                [ Theme.isError ]: error,
                [ Theme.inputSm ]: small,
                [ Theme.inputLg ]: large,
            }, className)
        }/>;
        const icon = (iconLeft || iconRight);
        inputComp =  (iconRight || iconLeft) ? (
            <div className={iconRight ? Theme.hasIconRight : Theme.hasIconLeft}>
                {inputComp}
                {React.cloneElement(icon,{"className":classes(icon.props.class,Theme.formIcon)})}
            </div>
        ) : inputComp;
        return (label ? <FormGroup {...formGroupProps}>
            {inputComp}
        </FormGroup> : inputComp)
    }
}

export interface InputProps {
    placeholder?:string,
    className?: string,
    success?:boolean
    error?:boolean
    label?:string,
    id?:string,
    small?: boolean,
    large?: boolean,
    iconLeft?:any ,//todo change any to virtual node (VNode)
    iconRight?:any,//todo change any to virtual node (VNode)
}