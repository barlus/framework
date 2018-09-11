import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';
import {Image}    from "../media/Image";


export class CardImage extends React.PureComponent<CardImageProps, {}> {
  render() {
    const {
      children,
      className,
      ...otherProps
    } = this.props;
    return (<div className={classes(Theme.cardImage)}>
      <Image responsive {...otherProps} className={classes(className)}/>
    </div>)
  }
}

export interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
}