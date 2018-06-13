import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';

export class CardFooter extends React.PureComponent<CardFooterProps, {}> {
  render() {
    const {
      className,
      // Styles.
      children,
      ...otherProps
    } = this.props;
    return (<div {...otherProps} className={classes(Theme.cardFooter, className)}>
      {children}
    </div>)
  }
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
}