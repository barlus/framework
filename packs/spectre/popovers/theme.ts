import {$, list, nest, percent, rem, s, scale, stylesheet, translate} from "@barlus/styles"
import {shadowVariant}                                                from '../mixins/shadow';


export default Theme;
export const enum Theme {
  card = 'card',
  popover = 'popover',
  popoverBottom = 'popover-bottom',
  popoverContainer = 'popover-container',
  popoverLeft = 'popover-left',
  popoverRight = 'popover-right',
}

stylesheet('popovers.css')('', {
  ...nest([ `.${Theme.popover}` ], {
    display: 'inline-block',
    position: 'relative',
    ...nest([ `.${Theme.popoverContainer}` ], {
      left: percent(50),
      opacity: 0,
      padding: rem($.layoutSpacing),
      position: 'absolute',
      top: 0,
      transform: list(translate(percent(-50), percent(-50)), scale(0)),
      transition: list('transform', s(.2), 'ease'),
      width: $.controlWidthSm,
      zIndex: $.zIndex3,
    }),
    ...nest([ `&:focus + .${Theme.popoverContainer}`, `&:hover .${Theme.popoverContainer}`, `.${Theme.popoverContainer}:hover` ], {
      display: 'block',
      opacity: 1,
      transform: list(translate(percent(-50), percent(-100)), scale(1)),
    }),
    ...nest([ `&.${Theme.popoverRight}` ], {
      ...nest([ `.${Theme.popoverContainer}` ], {
        left: percent(100),
        top: percent(50),
      }),
      ...nest([
        `:focus + .${Theme.popoverContainer}`,
        `&:hover .${Theme.popoverContainer}`,
        `.${Theme.popoverContainer}:hover`
      ], {
        transform: list(translate(0, percent(-50)), scale(1)),
      }),
    }),
    ...nest([ `&.${Theme.popoverBottom}` ], {
      ...nest([ `.${Theme.popoverContainer}` ], {
        left: percent(50),
        top: percent(100),
      }),
      ...nest([ `:focus + .${Theme.popoverContainer}`, `&:hover .${Theme.popoverContainer}`, `.${Theme.popoverContainer}:hover` ], {
        transform: list(translate(percent(-50), 0), scale(1)),
      }),
    }),
    ...nest([ `&.${Theme.popoverLeft}` ], {
      ...nest([ `.${Theme.popoverContainer}` ], {
        left: 0,
        top: percent(50),
      }),
      ...nest([ `:focus + .${Theme.popoverContainer}`, `&:hover .${Theme.popoverContainer}`, `.${Theme.popoverContainer}:hover` ], {
        transform: list(translate(percent(-100), percent(-50)), scale(1)),
      }),
    }),
    ...nest([ `.${Theme.card}` ], {
      ...shadowVariant(.2),
      border: 0,
    }),
  }),
});
