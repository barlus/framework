import * as React from "@barlus/nerv";

export class TableHeader extends React.PureComponent<TableHeaderProps, {}> {
    render() {
        const {
            className,
            children,
            ...otherProps
        } = this.props;
        return <thead {...otherProps} class={className}>
            {children}
        </thead>
    }
}

export interface TableHeaderProps {
    className?: string,
}