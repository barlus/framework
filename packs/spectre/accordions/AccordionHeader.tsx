import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class AccordionHeader extends React.PureComponent<AccordionHeaderProps, {}> {
    static defaultProps = {
        type : "checkbox"
    };
    render() {
        const {
            className,
            id,
            children,
            type,
            name,
            defaultChecked,
            ...otherProps
        } = this.props;
        return [
            <input type={type} id={id} name={name} hidden defaultChecked={defaultChecked} />,
            <label  class={classes(Theme.AccordionHeader,className)} htmlFor={id} {...otherProps}>
                {children}
            </label>,
        ]
    }
}
export interface AccordionHeaderProps {
    id:string,
    type?:"checkbox"|"radio"
    name?:string,
    defaultChecked?:boolean
    className?: string,
}