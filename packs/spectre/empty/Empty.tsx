import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';


export class Empty extends React.PureComponent<EmptyProps, {}> {
  render() {
    const {
      className,
      children,
      ...otherProps
    } = this.props;
    return (<div {...otherProps} className={classes(Theme.empty, className)}>
      {children}
    </div>)
  }
}

export interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
}