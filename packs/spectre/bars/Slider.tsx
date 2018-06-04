import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';
import {Bar} from "./Bar";
import {BarItem} from "./BarItem";
import {Button} from "../buttons/Button";
import {SliderButton} from "./SliderButton";


export class Slider extends React.PureComponent<SliderProps, {}> {
    render() {
        const {
            className,
            // Colors
            children,
            progress,
            ...otherProps
        } = this.props;
        return <Bar {...otherProps} className={classes(Theme.Slider, className)}>
            {progress === undefined || children.length !=0 ? (children) : (<BarItem progress={progress} ><SliderButton/></BarItem>)}
        </Bar>
    }
}

export interface SliderProps {
    children?:any
    className?: string,
    progress?:number,
}