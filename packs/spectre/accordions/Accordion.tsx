import * as React from "@barlus/react";
import { ReactElement } from '../../react/types';
import { AccordionHeader } from './AccordionHeader';
import { Theme } from './theme';
import { classes } from '../utils/classes';


export class Accordion extends React.PureComponent<AccordionProps, {}> {
    static id = 0;
    static defaultProps:AccordionProps = {
        id:undefined,
        name:undefined,
        type:'checkbox',
    };
    render() {
        const {
            id,
            type,
            name='A'+id,
            className,
            children,
            defaultChecked,
            ...otherProps
        } = this.props;
        const childs = React.Children.map(children, (child:React.ReactElement<any>) => {
            if (child.type === AccordionHeader) {
                return React.cloneElement(child, {
                    id: id,
                    name : name
                })
            } else {
                return child;
            }
        });
        return <div className={classes(Theme.accordion, className)} {...otherProps}>
            <input type={type} id={id} name={name} hidden defaultChecked={defaultChecked}/>
            {childs}
        </div>
    }
}
export interface AccordionProps {
    defaultChecked?:boolean;
    className?: string,
    header?: any,
    name?: any,
    type?: 'checkbox'|'radio',
    id: any,
}