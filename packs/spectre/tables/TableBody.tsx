import * as React from "@barlus/nerv";


export class TableBody extends React.PureComponent<TableBodyProps, {}> {
    render() {
        const {
            className,
            children,
            ...otherProps
        } = this.props;
        return <tbody {...otherProps} class={className}>
        {children}
        </tbody>
    }
}

export interface TableBodyProps {
    className?: string,
}