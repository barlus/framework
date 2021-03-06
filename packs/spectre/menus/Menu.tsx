import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';


export class Menu extends React.PureComponent<MenuProps, {}> {
  render() {
    const {
      className,
      // Styles.
      children,
      ...otherProps
    } = this.props;
    return (<ul {...otherProps} className={classes(Theme.menu, className)}>
      {children}
    </ul>)
  }
}

export interface MenuProps extends React.HTMLAttributes<HTMLUListElement> {
}