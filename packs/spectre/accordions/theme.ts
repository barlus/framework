// import { stylesheet, rem, css } from '@barlus/styles';
// import { config } from '../config';
// import { buttonVariant } from '../mixins/button';
// import { controlShadow } from '../mixins/shadow';
// import { controlTransition } from '../mixins/transition';

import {$, deg, list, nest, rem, rotate, s, stylesheet} from "@barlus/styles"


export default Theme;
export const enum Theme {
  accordion = 'accordion',
  accordionBody = 'accordion-body',
  accordionHeader = 'accordion-header',
  icon = 'icon',
  //
  primary = 'primary',
  link = 'link',
  action = 'action',
  circle = 'circle',
  success = 'success',
  error = 'error',
  warning = 'warning',
  active = 'active',
  disabled = 'disabled',
  loading = 'loading',
  block = 'block',
  clear = 'clear',
  large = 'large',
  small = 'sm',
  focus = 'focus',
  hover = 'hover',
}
stylesheet("accordion.css")('', {
  ...nest([ `.${Theme.accordion}` ], {
    ...nest([ `input:checked ~`, `&[open]` ], {
      ...nest([ `& .${Theme.accordionHeader}` ], {
        ...nest([ `.${Theme.icon}` ], {
          transform: rotate(deg(90)),
        }),
      }),
      ...nest([ `& .${Theme.accordionBody}` ], {
        maxHeight: rem(50),
      }),
    }),
    ...nest([ `.${Theme.accordionHeader}` ], {
      display: 'block',
      padding: list($.unit1, $.unit2),
      ...nest([ `.${Theme.icon}` ], {
        transition: list('all', s(.2), 'ease'),
      }),
    }),
    ...nest([ `.${Theme.accordionBody}` ], {
      marginBottom: $.layoutSpacing,
      maxHeight: 0,
      overflow: 'hidden',
      transition: list('max-height', s(.2), 'ease'),
    }),
  }),
  ...nest([ `summary.${Theme.accordionHeader}` ], {
    ...nest([ `&::-webkit-details-marker` ], {
      display: 'none',
    }),
  }),
});


