import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';

export class BreadcrumbItem extends React.PureComponent<BreadcrumbItemProps, {}> {
  render() {
    const {
      className,
      // Styles.
      children,
      ...otherProps
    } = this.props;
    return (<li {...otherProps} className={classes(Theme.breadcrumbItem, className)}>
      {children}
    </li>)
  }
}

export interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  className?: string,
}