import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class Step extends React.PureComponent<StepProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<ul {...otherProps} class={classes(Theme.Step,className)}>
            {children}
        </ul>)
    }
}

export interface StepProps {
    className?: string,
}