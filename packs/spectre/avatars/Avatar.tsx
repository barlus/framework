import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';
import {AvatarIcon} from "./AvatarIcon";

export class Avatar extends React.PureComponent<AvatarProps, {}> {
    render() {
        const {
            className,
            src,icon,initial,
            // Styles.
            //responsive, contain, cover,
            // Sizinigs
            xl,lg,sm,xs,
            children,
            ...otherProps
        } = this.props;
        return <figure {...otherProps}  data-initial={initial} class={
            classes(Theme.avatar,{
                [ Theme.avatarXl ]: xl,
                [ Theme.avatarLg ]: lg,
                [ Theme.avatarSm ]: sm,
                [ Theme.avatarXs ]: xs,
            }, className)
        }>
            {children}
            {src && <img src={src} />}
            {icon && <AvatarIcon src={icon} />}
        </figure>
    }
}

export interface AvatarProps {
    className?: string,
    src?:string,
    initial?:string,
    icon?:string,
    xl?:boolean
    lg?:boolean
    sm?:boolean
    xs?:boolean
}