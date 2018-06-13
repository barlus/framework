import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';

export class PanelHeader extends React.PureComponent<PanelHeaderProps, {}> {
  render() {
    const {
      className,
      // Styles.
      children,
      ...otherProps
    } = this.props;
    return (<div {...otherProps} className={classes(Theme.panelHeader, className)}>
      {children}
    </div>)
  }
}

export interface PanelHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
}