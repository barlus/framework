import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';


export class InputGroup extends React.PureComponent<InputGroupProps, {}> {
  render() {
    const {
      className,
      // Styles.
      inline,
      success,
      error,
      children,
      ...otherProps
    } = this.props;
    return (<div className={
        classes(Theme.inputGroup, {
          [ Theme.hasSuccess ]: success,
          [ Theme.inputInline ]: inline,
          [ Theme.hasError ]: error,
        }, className)
      }{...otherProps}>
        {children}
      </div>
    )
  }
}

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  inline?: boolean,
  success?: boolean,
  error?: boolean,
}