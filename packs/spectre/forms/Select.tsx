import * as React             from "@barlus/react";
import {Theme}                from './theme';
import {classes}              from '../utils/classes';
import {FormGroup}            from "./FormGroup";
import {SelectHTMLAttributes} from "../../react/types";


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
    const selectComp = (<select {...inputProps} className={
      classes(Theme.formSelect, {
        [ Theme.isSuccess ]: success,
        [ Theme.isError ]: error,
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

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  success?: boolean
  error?: boolean
  label?: string,
  small?: boolean,
  large?: boolean,
}