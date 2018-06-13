import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';

export class Image extends React.PureComponent<ImageProps, {}> {
  render() {
    const {
      className,
      // Styles.
      responsive, contain, cover,
      children,
      ...otherProps
    } = this.props;
    return <img {...otherProps} className={
      classes({
        [Theme.imgResponsive]: responsive,
        [Theme.imgFitContain]: contain,
        [Theme.imgFitCover]: cover,
      }, className)
    }/>
  }
}

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  responsive?: boolean
  contain?: boolean
  cover?: boolean
}