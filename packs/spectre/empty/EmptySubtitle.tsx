import * as React       from "@barlus/react";
import {Theme}          from './theme';
import {classes}        from '../utils/classes';
import {HTMLAttributes} from "../../react/types";


export class EmptySubtitle extends React.PureComponent<EmptySubtitleProps, {}> {
  render() {
    const {
      className,
      children,
      ...otherProps
    } = this.props;
    return (<p {...otherProps} className={classes(Theme.emptySubtitle, className)}>
      {children}
    </p>)
  }
}

export interface EmptySubtitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
}