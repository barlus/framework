import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';


export class Panel extends React.PureComponent<PanelProps, {}> {
  render() {
    const {
      className,
      // Styles.
      children,
      ...otherProps
    } = this.props;
    return (<div {...otherProps} className={classes(Theme.panel, className)}>
      {children}
    </div>)
  }
}

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
}