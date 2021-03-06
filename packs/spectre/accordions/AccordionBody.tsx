import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';


export class AccordionBody extends React.PureComponent<AccordionBodyProps, {}> {
  render() {
    const {
      className,
      children,
      ...otherProps
    } = this.props;
    return <div className={classes(Theme.accordionBody, className)} {...otherProps}>
      {children}
    </div>
  }
}

export interface AccordionBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string,
}