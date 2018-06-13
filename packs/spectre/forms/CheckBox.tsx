import * as React            from "@barlus/react";
import {Theme}               from './theme';
import {classes}             from '../utils/classes';
import {FormGroup}           from "./FormGroup";
import {Label}               from "./Label";
import {InputHTMLAttributes} from "../../react/types";

export class CheckBox extends React.Component<CheckBoxProps, {}> {
  render() {
    const {
      children,
      className,
      // Styles.
      label,
      success,
      error,
      // sizing
      small,
      large,
      ...otherProps
    } = this.props;

    return <Label className={
      classes(Theme.formCheckbox, {
        [Theme.inputLg]: large,
        [Theme.inputSm]: small,
        [Theme.isSuccess]: success,
        [Theme.isError]: error,
      }, className)
    }>
      <input {...otherProps} type="checkbox"/>
      <i className={classes(Theme.formIcon)}/>
      {label}
    </Label>

  }
}

export interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  success?: boolean
  error?: boolean
  label?: string,
  small?: boolean,
  large?: boolean
}