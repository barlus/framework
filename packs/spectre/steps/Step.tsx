import * as React from "@barlus/react";
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
        return (<ul {...otherProps} className={classes(Theme.step,className)}>
            {children}
        </ul>)
    }
}

export interface StepProps {
    className?: string,
}