import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';

export class Chip extends React.PureComponent<ChipProps, {}> {
  render() {
    const {
      className,
      // Styles.
      children,
      ...otherProps
    } = this.props;
    return (<span className={classes(Theme.chip, className)} {...otherProps}>
            {children}
        </span>)
  }
}

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
}