import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';

export class PanelBody extends React.PureComponent<PanelBodyProps, {}> {
  render() {
    const {
      className,
      // Styles.
      children,
      ...otherProps
    } = this.props;
    return (<div {...otherProps} className={classes(Theme.panelBody, className)}>
      {children}
    </div>)
  }
}

export interface PanelBodyProps extends React.HTMLAttributes<HTMLDivElement> {
}