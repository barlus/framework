import * as React from "@barlus/react";
import { Theme } from './theme';
import { classes } from '../utils/classes';
import {Button,ButtonProps} from "../buttons/Button";

export class InputGroupButton extends React.PureComponent<InputGroupButtonProp, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<Button className={
                classes(Theme.inputGroupBtn, className)
            }{...otherProps}>
            {children}
        </Button>
        )
    }
}

export interface InputGroupButtonProp extends ButtonProps{
    className?: string,
}