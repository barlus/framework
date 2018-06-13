import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';

export class PaginationSubtitle extends React.PureComponent<PaginationSubtitleProps, {}> {
  render() {
    const {
      className,
      // Styles.
      children,
      ...otherProps
    } = this.props;
    return (<div {...otherProps} className={classes(Theme.pageItemSubtitle, className)}>
      {children}
    </div>)
  }
}

export interface PaginationSubtitleProps extends React.HTMLAttributes<HTMLDivElement> {
}