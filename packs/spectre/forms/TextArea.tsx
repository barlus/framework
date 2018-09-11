import * as React  from "@barlus/react";
import {Theme}     from './theme';
import {classes}   from '../utils/classes';
import {FormGroup} from "./FormGroup";


export class TextArea extends React.PureComponent<TextAreaProps, {}> {
  render() {
    const {
      className,
      // Styles.
      label,
      success,
      error,
      id,
      children,
      ...otherProps
    } = this.props;
    const formGroupProps = { label, id };
    const inputProps = { id, ...otherProps };
    return <FormGroup {...formGroupProps}>
      <textarea {...inputProps} className={
        classes(Theme.formInput, {
          [ Theme.isSuccess ]: success,
          [ Theme.isError ]: error,
        }, className)
      }>
        {children}
      </textarea>
    </FormGroup>
  }
}

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  success?: boolean
  error?: boolean
  label?: string,
}