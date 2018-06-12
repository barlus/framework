import * as React from "@barlus/react";
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
        return <img {...otherProps} className={
            classes(Theme.avatarIcon,{}, className)
        }/>

    }
}

export interface AvatarIconProps {
    className?: string,
    [k:string]:any;//todo fix me
}