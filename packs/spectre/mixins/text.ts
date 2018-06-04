// Text Ellipsis
import { CSSProperties } from '@barlus/styles/css';

export const textEllipsis = ():CSSProperties=>({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
