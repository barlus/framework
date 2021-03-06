import {$, list, nest, percent, rem, s, stylesheet, translate} from "@barlus/styles"


export default Theme;
export const enum Theme {
  disabled = 'disabled',
  tooltip = 'tooltip',
  tooltipBottom = 'tooltip-bottom',
  tooltipLeft = 'tooltip-left',
  tooltipRight = 'tooltip-right',
}

stylesheet('tooltips.css')('', {
  ...nest([ `.${Theme.tooltip}` ], {
    position: 'relative',
    ...nest([ `&::after` ], {
      background: $.darkColor.fade(.9).rgba,
      borderRadius: rem($.borderRadius),
      bottom: percent(100),
      color: $.lightColor.rgba,
      content: `attr(data-tooltip)`,
      display: 'block',
      fontSize: rem($.fontSizeSm),
      left: percent(50),
      maxWidth: $.controlWidthSm,
      opacity: 0,
      overflow: 'hidden',
      padding: list(rem($.unit1), rem($.unit2)),
      pointerEvents: 'none',
      position: 'absolute',
      textOverflow: 'ellipsis',
      transform: translate(percent(-50), rem($.unit2)),
      transition: list('all', s(.2), 'ease'),
      whiteSpace: 'pre',
      zIndex: $.zIndex3,
    }),
    ...nest([ `&:focus`, `&:hover` ], {
      ...nest([ `&::after` ], {
        opacity: 1,
        transform: translate(percent(-50), rem(-$.unit1)),
      }),
    }),
    ...nest([ `&[disabled]`, `&.${Theme.disabled}` ], {
      pointerEvents: 'auto',
    }),
    ...nest([ `&.${Theme.tooltipRight}` ], {
      ...nest([ `&::after` ], {
        bottom: percent(50),
        left: percent(100),
        transform: translate(rem(-$.unit1), percent(50)),
      }),
      ...nest([ `&:focus`, `&:hover` ], {
        ...nest([ `&::after` ], {
          transform: translate(rem($.unit1), percent(50)),
        }),
      }),
    }),
    ...nest([ `&.${Theme.tooltipBottom}` ], {
      ...nest([ `&::after` ], {
        bottom: 'auto',
        top: percent(100),
        transform: translate(percent(-50), rem(-$.unit2)),
      }),
      ...nest([ `&:focus`, `&:hover` ], {
        ...nest([ `&::after` ], {
          transform: translate(percent(-50), rem($.unit1)),
        }),
      }),
    }),
    ...nest([ `&.${Theme.tooltipLeft}` ], {
      ...nest([ `&::after` ], {
        bottom: percent(50),
        left: 'auto',
        right: percent(100),
        transform: translate(rem($.unit2), percent(50)),
      }),
      ...nest([ `&:focus`, `&:hover` ], {
        ...nest([ `&::after` ], {
          transform: translate(rem(-$.unit1), percent(50)),
        }),
      }),
    }),
  }),
});
