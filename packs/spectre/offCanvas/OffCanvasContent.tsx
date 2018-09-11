import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';


export class OffCanvasContent extends React.PureComponent<OffCanvasContentProps, {}> {
  render() {
    const {
      className,
      // Styles.
      children,
      ...otherProps
    } = this.props;
    return (<div {...otherProps} className={classes(Theme.offCanvasContent, className)}>
      {children}
    </div>)
  }
}

export interface OffCanvasContentProps extends React.HTMLAttributes<HTMLDivElement> {
}