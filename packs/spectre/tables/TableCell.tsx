import * as React from "@barlus/react";

export class TableCell extends React.PureComponent<TableCellProps, {}> {
  render() {
    const {
      className,
      children,
      ...otherProps
    } = this.props;
    return <td  {...otherProps} className={className}>
      {children}
    </td>
  }
}

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableDataCellElement> {
}