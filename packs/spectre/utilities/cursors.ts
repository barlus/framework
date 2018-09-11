import {nest, stylesheet} from "@barlus/styles"


export default Theme;
export const enum Theme {
  cAuto = 'c-auto',
  cHand = 'c-hand',
  cMove = 'c-move',
  cNotAllowed = 'c-not-allowed',
  cZoomIn = 'c-zoom-in',
  cZoomOut = 'c-zoom-out',
}

stylesheet('cursors.ts')('', {
  ...nest([ `.${Theme.cHand}` ], {
    cursor: 'pointer',
  }),
  ...nest([ `.${Theme.cMove}` ], {
    cursor: 'move',
  }),
  ...nest([ `.${Theme.cZoomIn}` ], {
    cursor: 'zoom-in',
  }),
  ...nest([ `.${Theme.cZoomOut}` ], {
    cursor: 'zoom-out',
  }),
  ...nest([ `.${Theme.cNotAllowed}` ], {
    cursor: 'not-allowed',
  }),
  ...nest([ `.${Theme.cAuto}` ], {
    cursor: 'auto',
  }),
});
