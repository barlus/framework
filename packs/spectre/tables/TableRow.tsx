import * as React from "@barlus/react";
import {classes}  from "../utils/classes";
import {Theme}    from "./theme";

export class TableRow extends React.PureComponent<TableRowProps, {}> {
  render() {
    const {
      className,
      children,
      active,
      ...otherProps
    } = this.props;
    return <tr  {...otherProps} className={classes(className, { [Theme.active]: active })}>
      {children}
    </tr>
  }
}

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  active?: boolean
}