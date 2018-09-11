import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';


export class PanelTitle extends React.PureComponent<PanelTitleProps, {}> {
  render() {
    const {
      className,
      // Styles.
      children,
      ...otherProps
    } = this.props;
    return (<div {...otherProps} className={classes(Theme.panelTitle, className)}>
      {children}
    </div>)
  }
}

export interface PanelTitleProps extends React.HTMLAttributes<HTMLDivElement> {
}