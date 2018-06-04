import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class Accordion extends React.PureComponent<AccordionProps, {}> {
    render() {
        const {
            className,
            children,
            ...otherProps
        } = this.props;
        return <div class={classes(Theme.accordion,className)} {...otherProps}>
            {children}
            </div>
    }
}
export interface AccordionProps {
    className?: string,
}