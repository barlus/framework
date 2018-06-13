import * as React  from "@barlus/react";
import {Theme}     from './theme';
import {classes}   from '../utils/classes';
import {Label}     from "./Label";

export class Switch extends React.Component<SwitchProps, {}> {
  render() {
    const {
      className,
      // Styles.
      label,
      success,
      error,
      small,
      large,
      children,
      ...otherProps
    } = this.props;

    return <Label className={
      classes(Theme.formSwitch, {
        [Theme.inputSm]: small,
        [Theme.inputLg]: large,
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

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  success?: boolean
  error?: boolean
  label?: string,
  small?: boolean,
  large?: boolean,
}