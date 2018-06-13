import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';

export class CardHeader extends React.PureComponent<CardHeaderProps, {}> {
  render() {
    const {
      className,
      children,
      ...otherProps
    } = this.props;
    return (<div {...otherProps} className={classes(Theme.cardHeader, className)}>
      {children}
    </div>)
  }
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
}