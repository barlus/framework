import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class NavbarBrand extends React.PureComponent<NavbarBrandProps, {}> {
    render() {
        const {
            className,
            children,
            href,
            ...otherProps
        } = this.props;

        return <a href={href || '#'} {...otherProps} className={classes(Theme.navbarBrand, className)}>
            {children}
        </a>
    }
}

export interface NavbarBrandProps {
    className?: string,
    href?:string
}