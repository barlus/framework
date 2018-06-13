import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';

export class Dropdown extends React.PureComponent<DropdownProps, {}> {
  render() {
    const {
      className,
      // Styles.
      children,
      right, active,
      ...otherProps
    } = this.props;
    return (<div {...otherProps} className={classes(Theme.dropdown, {
      [Theme.dropdownRight]: right,
      [Theme.active]: active
    }, className)}>
      {children}
    </div>)
  }
}

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  right?: boolean
  active?: boolean
}