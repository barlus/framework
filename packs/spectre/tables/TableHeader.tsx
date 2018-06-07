import * as React from "@barlus/react";

export class TableHeader extends React.PureComponent<TableHeaderProps, {}> {
    render() {
        const {
            className,
            children,
            ...otherProps
        } = this.props;
        return <thead {...otherProps} className={className}>
            {children}
        </thead>
    }
}

export interface TableHeaderProps {
    className?: string,
}