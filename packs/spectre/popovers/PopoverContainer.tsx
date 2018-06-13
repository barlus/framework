import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';

export class PopoverContainer extends React.PureComponent<PopoverContainerProps, {}> {
  render() {
    const {
      className,
      // Styles.
      children,
      ...otherProps
    } = this.props;
    return (<div {...otherProps} className={classes(Theme.popoverContainer, className)}>
      {children}
    </div>)
  }
}

export interface PopoverContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string,
}