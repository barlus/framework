import * as React       from "@barlus/react";
import {Theme}          from './theme';
import {classes}        from '../utils/classes';
import {BarItem}        from "./BarItem";

export class Bar extends React.PureComponent<BarProps, {}> {
  render() {
    const {
      className,
      small,
      children,
      progress,
      ...otherProps
    } = this.props;
    const childrenCount = React.Children.count(children);
    return <div {...otherProps} className={
      classes(Theme.bar, {
        [Theme.barSm]: small,
      }, className)}>
      {(progress === undefined || childrenCount != 0)
        ? (children)
        : (<BarItem progress={progress}/>)}
    </div>
  }
}

export interface BarProps extends React.HTMLAttributes<HTMLDivElement> {
  progress?: number,
  small?: boolean,
}