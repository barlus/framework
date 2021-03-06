import * as React from "@barlus/react";
import {Theme}    from './theme';
import {classes}  from '../utils/classes';


export class Tile extends React.PureComponent<TileProps, {}> {
  render() {
    const {
      className,
      // Styles.
      centered,
      children,
      ...otherProps
    } = this.props;
    return <div {...otherProps} className={classes(Theme.tile, { [ Theme.tileCentered ]: centered }, className)}>
      {children}
    </div>
  }
}

export interface TileProps extends React.HTMLAttributes<HTMLDivElement> {
  centered?: boolean
}