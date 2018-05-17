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
        return (<p class={
                classes(Theme.hint, className)
            }{...otherProps}>
                {children}
            </p>
        )
    }
}

export interface HintProp {
    className?: string,
}