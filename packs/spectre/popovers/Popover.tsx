import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';


export class Popover extends React.PureComponent<PopoverProps, {}> {
  render() {
    const {
      className,
      // Styles.
      left, right, bottom,
      children,
      ...otherProps
    } = this.props;
    return <div {...otherProps} className={classes(Theme.popover, {
      [ Theme.popoverLeft ]: left,
      [ Theme.popoverRight ]: right,
      [ Theme.popoverBottom ]: bottom
    }, className)}>{children}</div>
  }
}

export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  left?: boolean
  right?: boolean
  bottom?: boolean
}