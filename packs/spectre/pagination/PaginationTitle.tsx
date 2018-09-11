import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';


export class PaginationTitle extends React.PureComponent<PaginationTitleProps, {}> {
  render() {
    const {
      className,
      // Styles.
      children,
      ...otherProps
    } = this.props;
    return (<div {...otherProps} className={classes(Theme.pageItemTitle, className)}>
      {children}
    </div>)
  }
}

export interface PaginationTitleProps extends React.HTMLAttributes<HTMLDivElement> {
}