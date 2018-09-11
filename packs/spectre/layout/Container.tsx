import * as React from "@barlus/react";

import {Theme}   from './theme';
import {classes} from '../utils/classes';


export class Container extends React.PureComponent<ContainerProps, {}> {
  render() {
    const { children, className, ...otherProps } = this.props;
    const classNames = classes(Theme.container, className);
    return (
      <div className={classNames} {...otherProps}>
        {children}
      </div>
    )
  }
}

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
}

