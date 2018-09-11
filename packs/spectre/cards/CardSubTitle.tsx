import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';


export class CardSubTitle extends React.PureComponent<CardSubTitleProps, {}> {
  render() {
    const {
      className,
      children,
      ...otherProps
    } = this.props;
    return (<div {...otherProps} className={classes(Theme.cardSubtitle, className)}>
      {children}
    </div>)
  }
}

export interface CardSubTitleProps extends React.HTMLAttributes<HTMLDivElement> {
}