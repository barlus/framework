import * as React         from "@barlus/react";
import {Theme}            from './theme';
import {classes}          from '../utils/classes';
import {LiHTMLAttributes} from "../../react/types";

export class MenuDivider extends React.PureComponent<MenuDividerProps, {}> {
  render() {
    const {
      children,
      className,
      // Styles.
      content,
      ...otherProps
    } = this.props;
    return <li {...otherProps} data-content={content} className={classes(Theme.divider, className)}/>
  }
}

export interface MenuDividerProps extends React.LiHTMLAttributes<HTMLLIElement> {
  content?: string
}