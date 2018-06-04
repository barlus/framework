import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';
import {FormGroup} from "./FormGroup";

export class Select extends React.PureComponent<SelectProps, {}> {
    render() {
        const {
            className,
            // Styles.
            label,
            success,
            error,
            id,
            //sizing
            small,
            large,
            children,
            ...otherProps
        } = this.props;
        const formGroupProps = { label, id };
        const inputProps = { id, ...otherProps };
        const selectComp = (<select {...inputProps} class={
            classes(Theme.select, {
                [ Theme.success ]: success,
                [ Theme.error ]: error,
                [ Theme.selectSm ]: small,
                [ Theme.selectLg ]: large,
            }, className)}>
            {children}
        </select>);
        return (label ? <FormGroup {...formGroupProps}>
                 {selectComp}
        </FormGroup> : selectComp)
    }
}

export interface SelectProps {
    className?: string,
    success?:boolean
    error?:boolean
    label?:string,
    id?:string,
    small?: boolean,
    large?: boolean,
}