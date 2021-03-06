import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';


export class MenuBadge extends React.PureComponent<MenuBadgeProps, {}> {
  render() {
    const {
      className,
      // Styles.
      children,
      ...otherProps
    } = this.props;
    return (<div {...otherProps} className={classes(Theme.menuBadge, className)}>
      {children}
    </div>)
  }
}

export interface MenuBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
}