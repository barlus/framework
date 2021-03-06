import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';


export class ModalHeader extends React.PureComponent<ModalHeaderProps, {}> {
  render() {
    const {
      className,
      // Styles.
      children,
      ...otherProps
    } = this.props;
    return (<div {...otherProps} className={classes(Theme.modalHeader, className)}>
      {children}
    </div>)
  }
}

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string,
}