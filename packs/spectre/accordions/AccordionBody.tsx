import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class AccordionBody extends React.PureComponent<AccordionBodyProps, {}> {
    render() {
        const {
            className,
            children,
            ...otherProps
        } = this.props;
        return <div class={classes(Theme.AccordionBody,className)} {...otherProps}>
            {children}
        </div>
    }
}
export interface AccordionBodyProps {
    className?: string,
}