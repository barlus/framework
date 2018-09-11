import {ensureLength}        from '../utils/index';
import {BoxFunction}         from '../types';
import {CSSLength}           from '../types';
import {BorderOptions}       from '../types';
import {BorderColorProperty} from '@barlus/css';
import {BorderStyleProperty} from '@barlus/css';
import {BorderWidthProperty} from '@barlus/css';
import {list}                from './lists';


/**
 * Returns the value with '' around it.  Any 's will be escaped \' in the output
 */
export function bordered(p: BorderOptions): string {
  return list(p.color, p.style, ensureLength(p.width));
}

export const borderColor = list as BoxFunction<BorderColorProperty>;
export const borderStyle = list as BoxFunction<BorderStyleProperty>;
export const borderWidth = list as BoxFunction<BorderWidthProperty<CSSLength>>;