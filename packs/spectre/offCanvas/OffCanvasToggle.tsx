import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';
import {Button,ButtonProps} from "../buttons/Button";

export class OffCanvasToggle extends React.PureComponent<OffCanvasToggleProp, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<Button  className={
                classes(Theme.offCanvasToggle, className)
            }{...otherProps}>
                {children}
            </Button>
        )
    }
}

export interface OffCanvasToggleProp extends ButtonProps{
    className?: string,
}