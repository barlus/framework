import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';


export class ButtonGroup extends React.PureComponent<GroupProps, {}> {
  static defaultProps = {
    className: '' as string,
    link: false as boolean,
  };

  render() {
    const { block, children, className, ...otherProps } = this.props;
    return (
      <div {...otherProps} className={
        classes(Theme.ButtonGroup, {
          [ Theme.block ]: block
        }, className)
      }>{children}</div>
    )
  }
}

export interface GroupProps extends React.HTMLAttributes<HTMLDivElement> {
  block?: boolean,
}
