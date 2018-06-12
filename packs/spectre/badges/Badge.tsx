import * as React from "@barlus/react";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class Badge extends React.PureComponent<BadgeProps, {}> {
    render() {
        const {
            className,
            // Styles.
            label,
            children,
            ...otherProps
        } = this.props;
        const badged = React.Children.map(children,(child:React.ReactElement<any>)=>{
            const className = classes(Theme.badge, child.props.className);
            const props = {
                className,
                'data-badge': (label && label >= 0 )? label : ''
            }
            return React.cloneElement(child, props)
        });
        return (badged)
    }
}

export interface BadgeProps {
    className?: string,
    label?:number
}