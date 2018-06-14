import {
  WidthProperty,
  BorderBlockStartStyleProperty,
  BackgroundImageProperty,
  BackgroundPositionProperty,
  BackgroundSizeProperty,
  BackgroundRepeatProperty,
  BackgroundOriginProperty,
  BackgroundClipProperty,
  BackgroundAttachmentProperty,
  ColorProperty,
  BorderStyleProperty,
  BorderWidthProperty,
  Globals
} from '@barlus/css';

export interface StringType<T extends string> {
  toString(): T;
}

export type CSSAngle = WidthProperty<string | number>;
export type CSSLength = WidthProperty<string | number>;

export type CSSPercentage = WidthProperty<string | number>;
export type CsxColorStop = [string | StringType<string>, CSSPercentage | CSSLength];
export type CSSTransformFunction = string;
export type CSSLineStyle = BorderBlockStartStyleProperty;

export type CsxBackgroundOptions = {
  image?: BackgroundImageProperty;
  position?: BackgroundPositionProperty<CSSLength>;
  size?: BackgroundSizeProperty<CSSLength>;
  repeat?: BackgroundRepeatProperty;
  origin?: BackgroundOriginProperty;
  clip?: BackgroundClipProperty;
  attachment?: BackgroundAttachmentProperty;
  color?: ColorProperty;
};
export type CSSSideOrCorner = 'left' | 'right' | 'top' | 'bottom'
  | 'to left' | 'to right' | 'to top' | 'to bottom'
  | 'left top' | 'right top' | 'left bottom' | 'right bottom'
  | 'top left' | 'top right' | 'bottom left' | 'bottom right'
  | 'to left top' | 'to right top' | 'to left bottom' | 'to right bottom'
  | 'to top left' | 'to top right' | 'to bottom left' | 'to bottom right';
export type CSSGradient = Globals | string;

export interface BorderOptions {
  color?: ColorProperty,
  style?: BorderStyleProperty,
  width?: BorderWidthProperty<CSSLength>
}

export interface BoxFunction<T> {
  (allSides: T): string;
  (top: T, rightLeft: T, bottom: T): string;
  (topBottom: T, rightLeft: T): string;
  (top: T, right: T, bottom: T, left: T): string;
}
export interface List<T> {
  length: number;

  [index: number]: T;
}
export type NamedColor
  = 'aliceblue'
  | 'antiquewhite'
  | 'aqua'
  | 'aquamarine'
  | 'azure'
  | 'beige'
  | 'bisque'
  | 'black'
  | 'blanchedalmond'
  | 'blue'
  | 'blueviolet'
  | 'brown'
  | 'burlywood'
  | 'cadetblue'
  | 'chartreuse'
  | 'chocolate'
  | 'coral'
  | 'cornflowerblue'
  | 'cornsilk'
  | 'crimson'
  | 'cyan'
  | 'darkblue'
  | 'darkcyan'
  | 'darkgoldenrod'
  | 'darkgray'
  | 'darkgreen'
  | 'darkgrey'
  | 'darkkhaki'
  | 'darkmagenta'
  | 'darkolivegreen'
  | 'darkorange'
  | 'darkorchid'
  | 'darkred'
  | 'darksalmon'
  | 'darkseagreen'
  | 'darkslateblue'
  | 'darkslategray'
  | 'darkslategrey'
  | 'darkturquoise'
  | 'darkviolet'
  | 'deeppink'
  | 'deepskyblue'
  | 'dimgray'
  | 'dimgrey'
  | 'dodgerblue'
  | 'firebrick'
  | 'floralwhite'
  | 'forestgreen'
  | 'fuchsia'
  | 'gainsboro'
  | 'ghostwhite'
  | 'gold'
  | 'goldenrod'
  | 'gray'
  | 'green'
  | 'greenyellow'
  | 'grey'
  | 'honeydew'
  | 'hotpink'
  | 'indianred'
  | 'indigo'
  | 'ivory'
  | 'khaki'
  | 'lavender'
  | 'lavenderblush'
  | 'lawngreen'
  | 'lemonchiffon'
  | 'lightblue'
  | 'lightcoral'
  | 'lightcyan'
  | 'lightgoldenrodyellow'
  | 'lightgray'
  | 'lightgreen'
  | 'lightgrey'
  | 'lightpink'
  | 'lightsalmon'
  | 'lightseagreen'
  | 'lightskyblue'
  | 'lightslategray'
  | 'lightslategrey'
  | 'lightsteelblue'
  | 'lightyellow'
  | 'lime'
  | 'limegreen'
  | 'linen'
  | 'maroon'
  | 'mediumaquamarine'
  | 'mediumblue'
  | 'mediumorchid'
  | 'mediumpurple'
  | 'mediumseagreen'
  | 'mediumslateblue'
  | 'mediumspringgreen'
  | 'mediumturquoise'
  | 'mediumvioletred'
  | 'midnightblue'
  | 'mintcream'
  | 'mistyrose'
  | 'moccasin'
  | 'navajowhite'
  | 'navy'
  | 'oldlace'
  | 'olive'
  | 'olivedrab'
  | 'orange'
  | 'purple'
  | 'rebeccapurple'
  | 'red'
  | 'silver'
  | 'teal'
  | 'transparent'
  | 'white'
  | 'yellow';

