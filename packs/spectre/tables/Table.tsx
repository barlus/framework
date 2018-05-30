import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class Table extends React.PureComponent<TableProps, {}> {
    render() {
        const {
            className,
            // Styles.
            striped , scroll,
            // States
            hover,
            children,
            ...otherProps
        } = this.props;

        return <table {...otherProps} class={
            classes(Theme.Table, {
                [ Theme.striped ]: striped,
                [ Theme.scroll ]: scroll,
                [ Theme.hover ]: hover,
            }, className)
        }>{children}</table>
    }
}

export interface TableProps {
    className?: string,
    striped?:boolean,
    hover?:boolean
    scroll?:boolean
}