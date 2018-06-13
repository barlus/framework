import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';

export class StepItem extends React.PureComponent<StepItemProps, {}> {
  render() {
    const {
      className,
      // Styles.
      children,
      active,
      ...otherProps
    } = this.props;
    return (<li {...otherProps} className={classes(Theme.stepItem, { [Theme.active]: active }, className)}>
      {children}
    </li>)
  }
}

export interface StepItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  active?: boolean
}