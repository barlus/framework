import {CSSProperties} from '@barlus/styles/types';

// Avatar mixin
import {config} from '../config';

// Toast variant mixin
export const toastVariant = (color = config.darkColor): CSSProperties => ({
  background: color.fade(0.9).rgba,
  borderColor: color.rgba,
});
