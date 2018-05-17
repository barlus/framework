import * as React from "@barlus/nerv";


export class TableCell extends React.PureComponent<TableCellProps, {}> {
    render() {
        const {
            className,
            children,
            ...otherProps
        } = this.props;
        return <td  {...otherProps} class={className}>
        {children}
        </td >
    }
}

export interface TableCellProps {
    className?: string,
}