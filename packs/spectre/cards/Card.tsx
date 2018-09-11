import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';


export class Card extends React.PureComponent<CardProps, {}> {
  render() {
    const {
      className,
      children,
      ...otherProps
    } = this.props;
    return (<div {...otherProps} className={classes(Theme.card, className)}>
      {children}
    </div>)
  }
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
}