import {$, list, nest, percent, s, scale, stylesheet, rem} from "@barlus/styles"
import {controlShadow}                                     from "../mixins/shadow";
import {appearance}                                        from "../mixins/appearance";


export default Theme;
export const enum Theme {
  disabled = 'disabled',
  slider = 'slider',
  tooltip = 'tooltip',
}

stylesheet('sliders.ts')('', {
  ...nest([ `.${Theme.slider}` ], {
    ...appearance('none'),
    display: 'block',
    width: percent(100),
    height: rem($.unit6),
    ...nest([ `&:focus` ], {
      ...controlShadow(),
      outline: 'none',
    }),
    ...nest([ `&.${Theme.tooltip}:not([data-tooltip])` ], {
      ...nest([ `&::after` ], {
        content: 'attr(value)',
      }),
    }),
    ...nest([ `&::-webkit-slider-thumb` ], {
      ...appearance('none'),
      background: $.primaryColor.rgba,
      border: 0,
      borderRadius: percent(50),
      height: rem($.unit3),
      marginTop: rem(($.unitH - $.unit3) / 2),
      transition: list('transform', s(.2), 'ease'),
      width: rem($.unit3),
    }),
    ...nest([ `&:active` ], {
      ...nest([ `&::-webkit-slider-thumb` ], {
        transform: scale(1.25),
      }),
    }),
    ...nest([ `&:disabled`, `&.${Theme.disabled}` ], {
      ...nest([ `&::-webkit-slider-thumb` ], {
        background: $.grayColorLight.rgba,
        transform: scale(1),
      })
    }),
    ...nest([ `&::-webkit-slider-runnable-track` ], {
      background: $.bgColorDark.rgba,
      borderRadius: rem($.borderRadius),
      height: rem($.unitH),
      width: percent(100),
    }),
  }),
});
