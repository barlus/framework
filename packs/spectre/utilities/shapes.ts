import {$, nest, percent, stylesheet, rem} from "@barlus/styles"


export default Theme;
export const enum Theme {
  circle = 'circle',
  rounded = 'rounded',
}
stylesheet('shapes.ts')('', {
  ...nest([ `.${Theme.rounded}` ], {
    borderRadius: rem($.borderRadius),
  }),
  ...nest([ `.${Theme.circle}` ], {
    borderRadius: percent(50),
  }),
});
