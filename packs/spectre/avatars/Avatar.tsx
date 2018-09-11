import * as React   from "@barlus/react";
import {Theme}      from './theme';
import {classes}    from '../utils/classes';
import {AvatarIcon} from "./AvatarIcon";


export class Avatar extends React.PureComponent<AvatarProps, {}> {
  render() {
    const {
      className,
      src, icon, initial,
      xl, lg, sm, xs,
      children,
      ...otherProps
    } = this.props;
    return <figure {...otherProps} data-initial={initial} className={
      classes(Theme.avatar, {
        [ Theme.avatarXl ]: xl,
        [ Theme.avatarLg ]: lg,
        [ Theme.avatarSm ]: sm,
        [ Theme.avatarXs ]: xs,
      }, className)
    }>
      {children}
      {src && <img src={src}/>}
      {icon && <AvatarIcon src={icon}/>}
    </figure>
  }
}

export interface AvatarProps extends React.HTMLAttributes<HTMLElement> {
  initial?: string,
  src?: string,
  icon?: string,
  xl?: boolean
  lg?: boolean
  sm?: boolean
  xs?: boolean
}