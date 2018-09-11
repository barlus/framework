import {nest, px, stylesheet} from "@barlus/styles"


export default Theme;
export const enum Theme {
  dBlock = 'd-block',
  dFlex = 'd-flex',
  dHide = 'd-hide',
  dInline = 'd-inline',
  dInlineBlock = 'd-inline-block',
  dInlineFlex = 'd-inline-flex',
  dInvisible = 'd-invisible',
  dNone = 'd-none',
  dVisible = 'd-visible',
  textAssistive = 'text-assistive',
  textHide = 'text-hide',
}

stylesheet('display.ts')('', {
  ...nest([ `.${Theme.dBlock}` ], {
    display: 'block',
  }),
  ...nest([ `.${Theme.dInline}` ], {
    display: 'inline',
  }),
  ...nest([ `.${Theme.dInlineBlock}` ], {
    display: 'inline-block',
  }),
  ...nest([ `.${Theme.dFlex}` ], {
    display: 'flex',
  }),
  ...nest([ `.${Theme.dInlineFlex}` ], {
    display: 'inline-flex',
  }),
  ...nest([ `.${Theme.dNone}`, `.${Theme.dHide}` ], {
    display: 'none',
  }),
  ...nest([ `.${Theme.dVisible}` ], {
    visibility: 'visible',
  }),
  ...nest([ `.${Theme.dInvisible}` ], {
    visibility: 'hidden',
  }),
  ...nest([ `.${Theme.textHide}` ], {
    background: 'transparent',
    border: 0,
    color: 'transparent',
    fontSize: 0,
    lineHeight: 0,
    textShadow: 'none',
  }),
  ...nest([ `.${Theme.textAssistive}` ], {
    border: 0,
    clip: `rect(0,0,0,0)`,
    height: px(1),
    margin: px(-1),
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    width: px(1),
  }),
});
