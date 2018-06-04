import { ensureLength } from '../utils/index';
import { CSSColor, CSSLength, CSSLineStyle } from '../../css';
import { BoxFunction, BorderOptions } from '../types';
import { join } from './lists';
/**
 * Returns the value with '' around it.  Any 's will be escaped \' in the output
 */
export function bordered(p: BorderOptions): string {
  return join(p.color, p.style, ensureLength(p.width));
}
 
export const borderColor = join as BoxFunction<CSSColor>;
export const borderStyle = join as BoxFunction<CSSLineStyle>;
export const borderWidth = join as BoxFunction<CSSLength>;