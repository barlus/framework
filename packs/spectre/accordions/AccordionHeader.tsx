
import * as React from "@barlus/react";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class AccordionHeader extends React.PureComponent<AccordionHeaderProps, {}> {
    static defaultProps = {
        type: "checkbox"
    };
    render() {
        const {
            className,
            id,
            children,
            ...otherProps
        } = this.props;
        //<input type={type} id={id} name={name} hidden defaultChecked={defaultChecked} />
        return <label className={classes(Theme.accordionHeader, className)} htmlFor={id} {...otherProps}>
            {children}
        </label>
    }

}

export interface AccordionHeaderProps {
    [k:string]:any;//todo fix me
    id?:string;
    className?: string,
    defaultChecked?
}