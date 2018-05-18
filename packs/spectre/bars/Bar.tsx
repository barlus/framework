import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';
import {BarItem} from "./BarItem";


export class Bar extends React.PureComponent<BarProps, {}> {
    render() {
        const {
            className,
            // Colors
            small,
            children,
            progress,
            ...otherProps
        } = this.props;
        return <div {...otherProps} class={
            classes(Theme.Bar, {
                [ Theme.small ]: small,
            }, className)}>
            {progress === undefined || children.length !=0 ? (children) : (<BarItem progress={progress} />)}
        </div>
    }
}

export interface BarProps {
    children?:any
    className?: string,
    progress? :number,
    small?: boolean,
}