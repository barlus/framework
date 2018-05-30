import * as React from "@barlus/nerv";
import {classes} from "../utils/classes";
import {Theme} from "./theme";


export class TableRow extends React.PureComponent<TableRowProps, {}> {
    render() {
        const {
            className,
            children,
            active,
            ...otherProps
        } = this.props;
        return <tr  {...otherProps} class={classes(className, {[ Theme.active ]: active})}>
            {children}
        </tr >
    }
}

export interface TableRowProps {
    className?: string,
    active?:boolean
}