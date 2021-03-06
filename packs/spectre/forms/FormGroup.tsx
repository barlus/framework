import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';
import {Label}    from "./Label";


export class FormGroup extends React.PureComponent<FormGroupProps, {}> {
  render() {
    const {
      className,
      // Styles.
      success,
      error,
      label,
      id,
      children,
      ...otherProps
    } = this.props;
    return <div {...otherProps} className={classes(Theme.formGroup, {
      [ Theme.hasSuccess ]: success,
      [ Theme.hasError ]: error,
    }, className)}>
      {label && (
        <Label htmlFor={id}> {label} </Label>
      )}
      {children}
    </div>
  }
}

export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string,
  horizontal?: boolean
  id?: string
  label?: string
  success?: boolean,
  error?: boolean
}