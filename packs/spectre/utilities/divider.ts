import {
  $,
  list,
  nest,
  percent,
  stylesheet,
  translate,
  translateX,
  translateY,
  rem
} from "@barlus/styles"


export default Theme;
export const enum Theme {
  divider = 'divider',
  dividerVert = 'divider-vert',
}

stylesheet('divider.ts')('', {
  ...nest([ `.${Theme.divider}`, `.${Theme.dividerVert}` ], {
    display: 'block',
    position: 'relative',
    ...nest([ `&[data-content]::after` ], {
      background: $.bgColorLight.rgba,
      color: $.grayColor.rgba,
      content: `attr(data-content)`,
      display: 'inline-block',
      fontSize: rem($.fontSizeSm),
      padding: list(0, rem($.unit2)),
      transform: translateY(rem($.borderWidth - $.fontSizeSm)),
    }),
  }),
  ...nest([ `.${Theme.divider}` ], {
    borderTop: list($.borderWidth, 'solid', $.borderColor),
    height: rem($.borderWidth),
    margin: list(rem($.unit2), 0),
    ...nest([ `&[data-content]` ], {
      margin: list(rem($.unit4), 0),
    }),
  }),
  ...nest([ `.${Theme.dividerVert}` ], {
    display: 'block',
    padding: rem($.unit4),
    ...nest([ `&::before` ], {
      borderLeft: list(rem($.borderWidth), 'solid', $.borderColor.rgba),
      bottom: rem($.unit2),
      content: "\"\"",
      display: 'block',
      left: percent(50),
      position: 'absolute',
      top: rem($.unit2),
      transform: translateX(percent(-50)),
    }),
    ...nest([ `&[data-content]::after` ], {
      left: percent(50),
      padding: list(rem($.unit1), 0),
      position: 'absolute',
      top: percent(50),
      transform: translate(percent(-50), percent(-50)),
    }),
  }),
});
