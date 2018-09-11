import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';


export class Tooltip extends React.PureComponent<TooltipProps, {}> {
  render() {
    const {
      className,
      label, left, right, bottom,
      children,
      ...otherProps
    } = this.props;
    const c = classes(Theme.tooltip, {
      [ Theme.tooltipLeft ]: left,
      [ Theme.tooltipRight ]: right,
      [ Theme.tooltipBottom ]: bottom
    });
    const badged = React.Children.map(children, (child: React.ReactElement<any>) => {
      const className = classes(c, child.props.className);
      const props = {
        className,
        'data-tooltip': label
      };
      return React.cloneElement(child, props)
    });
    return (badged)
  }
}

export interface TooltipProps {
  className?: string,
  label: string
  left?: boolean
  right?: boolean
  bottom?: boolean
}