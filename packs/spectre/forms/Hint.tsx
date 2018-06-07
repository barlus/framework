import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class Hint extends React.PureComponent<HintProp, {}> {
    render() {
        const {
            className,
            children,
            ...otherProps
        } = this.props;
        return (<p className={
                classes(Theme.formInputHint, className)
            }{...otherProps}>
                {children}
            </p>
        )
    }
}

export interface HintProp {
    className?: string,
}