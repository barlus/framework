import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';


export class ModalBody extends React.PureComponent<ModalBodyProps, {}> {
  render() {
    const {
      className,
      // Styles.
      children,
      ...otherProps
    } = this.props;
    return (<div {...otherProps} className={classes(Theme.modalBody, className)}>
      {children}
    </div>)
  }
}

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {

}