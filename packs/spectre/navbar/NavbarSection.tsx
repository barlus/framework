import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class NavbarSection extends React.PureComponent<NavbarSectionProps, {}> {
    render() {
        const {
            className,
            children,
            center,
            ...otherProps
        } = this.props;

        return <section {...otherProps} class={classes({
            [Theme.navbarSection]:!center,
            [Theme.navbarCenter]:center
        }, className)}>
            {children}
        </section>
    }
}

export interface NavbarSectionProps {
    className?: string,
    center?:boolean
}