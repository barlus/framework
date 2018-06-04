import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class AvatarIcon extends React.PureComponent<AvatarIconProps, {}> {
    render() {
        const {
            className,
            // Styles.
            responsive, contain, cover,
            // Sizinigs
            xl,lg,sm,xs,
            children,
            ...otherProps
        } = this.props;
        return <img {...otherProps} class={
            classes(Theme.icon,{
            }, className)
        }/>

    }
}

export interface AvatarIconProps {
    className?: string,
}