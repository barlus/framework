import {$, list, nest, rem, stylesheet} from "@barlus/styles"


export default Theme;
export const enum Theme {
  active = 'active',
  nav = 'nav',
  navItem = 'nav-item',
}

stylesheet('navs.css')('', {
  ...nest([ `.${Theme.nav}` ], {
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    margin: list(rem($.unit1), 0),
    ...nest([ `.${Theme.navItem}` ], {
      ...nest([ `a` ], {
        color: $.grayColorDark.rgba,
        padding: list(rem($.unit1), rem($.unit2)),
        textDecoration: 'none',
        ...nest([ `&:focus`, `&:hover` ], {
          color: $.primaryColor.rgba,
        }),
      }),
      ...nest([ `&.${Theme.active}` ], {
        ...nest([ `& > a` ], {
          color: $.grayColorDark.darken(0.10).rgba,
          fontWeight: 'bold',
          ...nest([ `&:focus`, `&:hover` ], {
            color: $.primaryColor.rgba,
          }),
        }),
      }),
    }),
    ...nest([ `& .${Theme.nav}` ], {
      marginBottom: rem($.unit2),
      marginLeft: rem($.unit4),
    }),
  }),
});
