import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';


export class EmptyIcon extends React.PureComponent<EmptyIconProps, {}> {
  render() {
    const {
      className,
      // Styles.
      children,
      ...otherProps
    } = this.props;
    return (<div {...otherProps} className={classes(Theme.emptyIcon, className)}>
      {children}
    </div>)
  }
}

export interface EmptyIconProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string,
}