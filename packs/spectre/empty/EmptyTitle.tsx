import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';


export class EmptyTitle extends React.PureComponent<EmptyTitleProps, {}> {
  render() {
    const {
      className,
      // Styles.
      children,
      ...otherProps
    } = this.props;
    return (<p {...otherProps} className={classes(Theme.emptyTitle, className)}>
      {children}
    </p>)
  }
}

export interface EmptyTitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string,
}