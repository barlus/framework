import {cssFunction}     from '../utils/index';
import {ColorProperty}   from '@barlus/css';
import {CsxColorStop}    from '../types';
import {StringType}      from '../types';
import {CSSAngle}        from '../types';
import {CSSSideOrCorner} from '../types';
import {CSSGradient}     from '../types';

/**
 * Helper for the linear-gradient function in CSS
 * https://drafts.csswg.org/css-images-3/#funcdef-linear-gradient
 */
export function linearGradient(position: CSSAngle | CSSSideOrCorner, ...colors: (ColorProperty | StringType<ColorProperty> | CsxColorStop)[]): CSSGradient {
  return cssFunction('linear-gradient', [position, ...colors.map(flattenColorStops)])
}

/**
 * Helper for the repeating-linear-gradient function in CSS
 * https://drafts.csswg.org/css-images-3/#funcdef-repeating-linear-gradient
 */
export function repeatingLinearGradient(position: CSSSideOrCorner, ...colors: (ColorProperty | StringType<ColorProperty> | CsxColorStop)[]): CSSGradient {
  return cssFunction('repeating-linear-gradient', [position, ...colors.map(flattenColorStops)]);
}

/**
 * Single CSSColorStop => string conversion is like:
 * 'x'=>'x'
 * ['x', '50%'] => 'x 50%'
 **/
function flattenColorStops(c: ColorProperty | StringType<ColorProperty> | CsxColorStop): string {
  return Array.isArray(c) ? c.map(s => s.toString()).join(' ') : c.toString();
}
