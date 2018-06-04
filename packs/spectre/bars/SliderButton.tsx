import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';
import {Button,ButtonProps} from "../buttons/Button";

export class SliderButton extends React.PureComponent<SliderButtonProp, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<Button role='slider' className={
                classes(Theme.barSliderBtn, className)
            }{...otherProps}>
                {children}
            </Button>
        )
    }
}

export interface SliderButtonProp extends ButtonProps{
    className?: string,
}