import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';


export class PaginationItem extends React.PureComponent<PaginationItemProps, {}> {
  render() {
    const {
      className,
      // Styles.
      prev, next, disabled, active,
      children,
      ...otherProps
    } = this.props;
    return (<li {...otherProps} className={classes(Theme.pageItem, {
      [ Theme.pagePrev ]: prev,
      [ Theme.pageNext ]: next,
      [ Theme.disabled ]: disabled,
      [ Theme.active ]: active,
    }, className)}>
      {children}
    </li>)
  }
}

export interface PaginationItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  prev?: boolean,
  next?: boolean,
  disabled?: boolean,
  active?: boolean,
}