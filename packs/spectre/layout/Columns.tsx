import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';


export class Columns extends React.PureComponent<ColumnsProps, {}> {
  render() {
    const { children, className, gapless, oneline, ...otherProps } = this.props;
    const classNames = classes(
      Theme.columns,
      {
        [Theme.colGapless]: gapless,
        [Theme.colOneline]: oneline
      },
      className
    );
    return (
      <div className={classNames} {...otherProps}>
        {children}
      </div>
    )
  }
}

interface ColumnsProps extends React.HTMLAttributes<HTMLDivElement> {
  gapless?: boolean,
  oneline?: boolean
}

