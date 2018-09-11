import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';


export class PanelNav extends React.PureComponent<PanelNavProps, {}> {
  render() {
    const {
      className,
      // Styles.
      children,
      ...otherProps
    } = this.props;
    return (<nav {...otherProps} className={classes(Theme.panelNav, className)}>
      {children}
    </nav>)
  }
}

export interface PanelNavProps extends React.HTMLAttributes<HTMLElement> {
  className?: string,
}