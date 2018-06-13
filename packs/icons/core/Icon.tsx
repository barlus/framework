import * as React      from "@barlus/react";
import {Theme}         from './theme';

export class Icon extends React.PureComponent<IconProps, {}> {
  static defaultProps = {
    viewBox: '0 0 24 24',
  };

  render() {
    const {
      className,
      children,
      titleAccess,
      nativeColor,
      viewBox,
      ...otherProps
    } = this.props;
    return (
      <svg
        className={`${Theme.svgIcon} ${className || ""}`}
        focusable="false"
        viewBox={viewBox}
        color={nativeColor}
        aria-hidden={titleAccess ? 'false' : 'true'}
        {...otherProps}
      >
        {titleAccess ? <title>{titleAccess}</title> : null}
        {children}
      </svg>
    )
  }
}

export interface IconProps extends React.SVGAttributes<SVGElement> {
  titleAccess?: string,
  nativeColor?: string,
}