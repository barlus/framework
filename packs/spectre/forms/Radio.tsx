import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';
import {Label}    from "./Label";


export class Radio extends React.Component<RadioProps, {}> {
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
      classes(Theme.formRadio, {
        [ Theme.inputSm ]: small,
        [ Theme.inputLg ]: large,
        [ Theme.isSuccess ]: success,
        [ Theme.isError ]: error,
      }, className)
    }>
      <input {...otherProps} type="radio"/>
      <i className={classes(Theme.formIcon)}/>
      {label}
    </Label>

  }
}

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  success?: boolean,
  error?: boolean,
  label?: string,
  small?: boolean,
  large?: boolean,
}