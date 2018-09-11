// Text Ellipsis
import {CSSProperties} from '@barlus/styles/types';


export const textEllipsis = (): CSSProperties => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
