import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';


export class VideoContainer extends React.PureComponent<VideoContainerProps, {}> {
  render() {
    const {
      className,
      // Styles.
      responsive, contain, cover,
      children,
      ...otherProps
    } = this.props;
    return <div {...otherProps} className={
      classes({
        [ Theme.videoResponsive ]: responsive,
        [ Theme.videoResponsive11 ]: responsive == '1:1',
        [ Theme.videoResponsive43 ]: responsive == '4:3',
        [ Theme.imgFitContain ]: contain,
        [ Theme.imgFitCover ]: cover,
      }, className)
    }>{children}/></div>
  }
}

export interface VideoContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  contain?: boolean
  cover?: boolean
  responsive?: boolean | "1:1" | "4:3";
}