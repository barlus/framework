import * as React from "@barlus/react";

export class TableHeading extends React.PureComponent<TableHeadingProps, {}> {
  render() {
    const {
      className,
      children,
      ...otherProps
    } = this.props;
    return <th  {...otherProps} className={className}>
      {children}
    </th>
  }
}

export interface TableHeadingProps extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
  className?: string,
}