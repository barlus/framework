import * as React       from "@barlus/react";
import {Theme}          from './theme';
import {classes}        from '../utils/classes';
import {HTMLAttributes} from "../../react/types";

export class NavbarSection extends React.PureComponent<NavbarSectionProps, {}> {
  render() {
    const {
      className,
      children,
      center,
      ...otherProps
    } = this.props;

    return <section {...otherProps} className={classes({
      [Theme.navbarSection]: !center,
      [Theme.navbarCenter]: center
    }, className)}>
      {children}
    </section>
  }
}

export interface NavbarSectionProps extends React.HTMLAttributes<HTMLElement> {
  center?: boolean
}