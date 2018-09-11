import * as React from "@barlus/react";


export class TableBody extends React.PureComponent<TableBodyProps, {}> {
  render() {
    const {
      className,
      children,
      ...otherProps
    } = this.props;
    return <tbody {...otherProps} className={className}>
    {children}
    </tbody>
  }
}

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
}