import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';


export class AvatarIcon extends React.PureComponent<AvatarIconProps, {}> {
  render() {
    const {
      children,
      className,
      ...otherProps
    } = this.props;
    return <img {...otherProps} className={
      classes(Theme.avatarIcon, {}, className)
    }/>

  }
}

export interface AvatarIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {

}