import * as React       from "@barlus/react";
import {Theme}          from './theme';
import {classes}        from '../utils/classes';

export class Navbar extends React.PureComponent<NavbarProps, {}> {
  render() {
    const {
      className,
      children,
      ...otherProps
    } = this.props;

    return <header {...otherProps} className={classes(Theme.navbar, className)}>
      {children}
    </header>
  }
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {

}