import {
  $,
  join,
  list,
  nest,
  percent,
  px,
  rgba,
  s,
  scaleY,
  stylesheet,
  translate,
  translateY,
  viewHeight,
  rem
} from "@barlus/styles"


export default Theme;
export const enum Theme {
  comparisonAfter = 'comparison-after',
  comparisonBefore = 'comparison-before',
  comparisonLabel = 'comparison-label',
  comparisonResizer = 'comparison-resizer',
  comparisonSlider = 'comparison-slider',
}

stylesheet('comparison.ts')('', {
  ...nest([ `.${Theme.comparisonSlider}` ], {
    height: viewHeight(50),
    overflow: 'hidden',
    position: 'relative',
    width: percent(100),
    '-webkit-overflow-scrolling': 'touch',
    ...nest([ `.${Theme.comparisonBefore}`, `.${Theme.comparisonAfter}` ], {
      height: percent(100),
      left: 0,
      margin: 0,
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      ...nest([ `img` ], {
        height: percent(100),
        objectFit: 'cover',
        objectPosition: list('left', 'center'),
        position: 'absolute',
        width: percent(100),
      }),
    }),
    ...nest([ `.${Theme.comparisonBefore}` ], {
      width: percent(100),
      zIndex: 1,
      ...nest([ `.${Theme.comparisonLabel}` ], {
        right: rem($.unit4),
      }),
    }),
    ...nest([ `.${Theme.comparisonAfter}` ], {
      maxWidth: percent(100),
      minWidth: 0,
      zIndex: 2,
      ...nest([ `&::before` ], {
        background: 'transparent',
        content: "\"\"",
        cursor: 'default',
        height: percent(100),
        left: 0,
        position: 'absolute',
        right: rem($.unit4),
        top: 0,
        zIndex: $.zIndex0,
      }),
      ...nest([ `&::after` ], {
        background: 'currentColor',
        borderRadius: percent(50),
        boxShadow: join(list(0, px(-5)), list(0, px(5))),
        color: $.lightColor.rgba,
        content: "\"\"",
        height: px(3),
        position: 'absolute',
        right: rem($.unit2),
        top: percent(50),
        transform: translate(percent(50), percent(-50)),
        width: px(3),
      }),
      ...nest([ `.${Theme.comparisonLabel}` ], {
        left: rem($.unit4),
      }),
    }),
    ...nest([ `.${Theme.comparisonResizer}` ], {
      animation: 'first-run 1.5s 1 ease-in-out',
      cursor: 'ew-resize',
      height: rem($.unit4),
      left: 0,
      maxWidth: percent(100),
      minWidth: rem($.unit4),
      opacity: 0,
      outline: 'none',
      position: 'relative',
      resize: 'horizontal',
      top: percent(50),
      transform: list(translateY(percent(-50)), scaleY(30)),
      width: 0,
    }),
    ...nest([ `.${Theme.comparisonLabel}` ], {
      background: $.darkColor.fade(.5).rgba,
      bottom: rem($.unit4),
      color: $.lightColor.rgba,
      padding: list(rem($.unit1), rem($.unit2)),
      position: 'absolute',
      userSelect: 'none',
    }),
  }),
});