import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';


export class BarItem extends React.PureComponent<BarItemProps, {}> {
  render() {
    const {
      className,
      children,
      progress,
      style,
      ...otherProps
    } = this.props;
    const styles = { ...style, width: `${progress}%` };
    return <div {...otherProps} role="progressbar" style={styles}
                className={classes(Theme.barItem, className)}>{children}</div>
  }
}

export interface BarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  progress?: number,
}