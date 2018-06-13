import * as React       from "@barlus/react";
import {Theme}          from './theme';
import {classes}        from '../utils/classes';

export class Figure extends React.PureComponent<FigureProps, {}> {
  render() {
    const {
      className,
      // Styles.
      children,

      ...otherProps
    } = this.props;
    return (<figure className={
        classes(Theme.figure, className)
      }{...otherProps}>
        {children}
      </figure>
    )
  }
}

export interface FigureProps extends React.HTMLAttributes<HTMLElement> {
}