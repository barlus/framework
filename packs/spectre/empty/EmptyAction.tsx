import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';


export class EmptyAction extends React.PureComponent<EmptyActionProps, {}> {
  render() {
    const {
      className,
      children,
      ...otherProps
    } = this.props;
    return (<div {...otherProps} className={classes(Theme.emptyAction, className)}>
      {children}
    </div>)
  }
}

export interface EmptyActionProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string,
}