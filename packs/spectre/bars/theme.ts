// import { stylesheet, rem } from '@barlus/styles';
// import { config } from '../config';
// import { buttonVariant } from '../mixins/button';
// import { controlShadow } from '../mixins/shadow';
// import { controlTransition } from '../mixins/transition';

// export const enum Theme {
//     Bar = 'bar',
//     BarItem = 'bar-item',
//     Slider = 'bar-slider',
//     sliderButton = 'bar-slider-btn',
//     small = 'bar-sm',
// }
import {$, list, nest, percent, rem, stylesheet, translate} from "@barlus/styles"


export default Theme;
export const enum Theme {
  bar = 'bar',
  barItem = 'bar-item',
  barSlider = 'bar-slider',
  barSliderBtn = 'bar-slider-btn',
  barSm = 'bar-sm',
}

stylesheet('bars.ts')('', {
  ...nest([ `.${Theme.bar}` ], {
    background: $.bgColorDark.rgba,
    borderRadius: rem($.borderRadius),
    display: 'flex',
    flexWrap: 'nowrap',
    height: rem($.unit4),
    width: percent(100),
    ...nest([ `&.${Theme.barSm}` ], {
      height: rem($.unit1),
    }),
    ...nest([ `.${Theme.barItem}` ], {
      background: $.primaryColor.rgba,
      color: $.lightColor.rgba,
      display: 'block',
      fontSize: rem($.fontSizeSm),
      flexShrink: 0,
      lineHeight: rem($.unit4),
      height: percent(100),
      position: 'relative',
      textAlign: 'center',
      width: 0,
      ...nest([ `&:first-child` ], {
        borderBottomLeftRadius: rem($.borderRadius),
        borderTopLeftRadius: rem($.borderRadius),
      }),
      ...nest([ `&:last-child` ], {
        borderBottomRightRadius: rem($.borderRadius),
        borderTopRightRadius: rem($.borderRadius),
        flexShrink: 1,
      }),
    }),
  }),
  ...nest([ `.${Theme.barSlider}` ], {
    height: rem($.borderWidthLg),
    margin: list($.layoutSpacing, 0),
    position: 'relative',
    ...nest([ `.${Theme.barItem}` ], {
      left: 0,
      padding: 0,
      position: 'absolute',
      ...nest([ `&:not(:last-child):first-child` ], {
        background: $.bgColorDark.rgba,
        zIndex: $.zIndex0,
      }),
    }),
    ...nest([ `.${Theme.barSliderBtn}` ], {
      background: $.primaryColor.rgba,
      border: 0,
      borderRadius: percent(50),
      height: rem($.unit3),
      padding: 0,
      position: 'absolute',
      right: 0,
      top: percent(50),
      transform: translate(percent(50), percent(-50)),
      width: rem($.unit3),
      ...nest([ `&:active` ], {
        boxShadow: list(0, 0, 0, rem(.1), $.primaryColor.rgba),
      }),
    }),
  }),
});
