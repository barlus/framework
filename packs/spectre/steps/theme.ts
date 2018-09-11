import {$, list, nest, percent, px, rem, stylesheet, translateX} from "@barlus/styles"


export default Theme;
export const enum Theme {
  active = 'active',
  step = 'step',
  stepItem = 'step-item',
}

stylesheet('steps.ts')('', {
  ...nest([ `.${Theme.step}` ], {
    display: 'flex',
    flexWrap: 'nowrap',
    listStyle: 'none',
    margin: list(rem($.unit1), 0),
    width: percent(100),
    ...nest([ `.${Theme.stepItem}` ], {
      flex: '1 1 0',
      marginTop: 0,
      minHeight: rem(1),
      textAlign: 'center',
      position: 'relative',
      ...nest([ `&:not(:first-child)::before` ], {
        background: $.primaryColor.rgba,
        content: "\"\"",
        height: px(2),
        left: percent(-50),
        position: 'absolute',
        top: px(9),
        width: percent(100),
      }),
      ...nest([ `a` ], {
        color: $.grayColor.rgba,
        display: 'inline-block',
        padding: list(px(20), px(10), 0),
        textDecoration: 'none',
        ...nest([ `&::before` ], {
          background: $.primaryColor.rgba,
          border: list($.borderWidthLg, 'solid', $.lightColor.rgba),
          borderRadius: percent(50),
          content: "\"\"",
          display: 'block',
          height: rem($.unit3),
          left: percent(50),
          position: 'absolute',
          top: rem($.unit1),
          transform: translateX(percent(-50)),
          width: rem($.unit3),
          zIndex: $.zIndex0,
        }),
      }),
      ...nest([ `&.${Theme.active}` ], {
        ...nest([ `a` ], {
          ...nest([ `&::before` ], {
            background: $.lightColor.rgba,
            border: list(rem($.borderWidthLg), 'solid', $.primaryColor.rgba),
          }),
        }),
        ...nest([ `& ~ .${Theme.stepItem}` ], {
          ...nest([ `&::before` ], {
            background: $.borderColor.rgba,
          }),
          ...nest([ `a` ], {
            ...nest([ `&::before` ], {
              background: $.grayColorLight.rgba,
            }),
          }),
        }),
      }),
    }),
  }),
});
