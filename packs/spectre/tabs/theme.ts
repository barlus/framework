import {$, list, nest, rem, stylesheet, translate} from "@barlus/styles"


export default Theme;
export const enum Theme {
  active = 'active',
  badge = 'badge',
  btnClear = 'btn-clear',
  tab = 'tab',
  tabAction = 'tab-action',
  tabBlock = 'tab-block',
  tabItem = 'tab-item',
}

stylesheet('tabs.css')('', {
  ...nest([ `.${Theme.tab}` ], {
    alignItems: 'center',
    borderBottom: list(rem($.borderWidth), 'solid', $.borderColor.rgba),
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    margin: list(rem($.unit1), 0, rem($.unit1 - $.borderWidth), 0),
    ...nest([ `.${Theme.tabItem}` ], {
      marginTop: 0,
      ...nest([ `a` ], {
        borderBottom: list(rem($.borderWidthLg), 'solid', 'transparent'),
        color: 'inherit',
        display: 'block',
        margin: list(0, rem($.unit2), 0, 0),
        padding: list(rem($.unit2), rem($.unit1), rem($.unit2 - $.borderWidthLg), rem($.unit1)),
        textDecoration: 'none',
        ...nest([ `&:focus`, `&:hover` ], {
          color: $.linkColor.rgba,
        }),
      }),
      ...nest([ `&.${Theme.active} a`, `a.${Theme.active}` ], {
        borderBottomColor: $.primaryColor.rgba,
        color: $.linkColor.rgba,
      }),
      ...nest([ `&.${Theme.tabAction}` ], {
        flex: '1 0 auto',
        textAlign: 'right',
      }),
      ...nest([ `.${Theme.btnClear}` ], {
        marginTop: rem(-$.unit1),
      }),
    }),
    ...nest([ `&.${Theme.tabBlock}` ], {
      ...nest([ `.${Theme.tabItem}` ], {
        flex: '1 0 0',
        textAlign: 'center',
        ...nest([ `a` ], {
          margin: 0,
        }),
        ...nest([ `.${Theme.badge}` ], {
          ...nest([ `&[data-badge]::after` ], {
            position: 'absolute',
            right: rem($.unitH),
            top: rem($.unitH),
            transform: translate(0, 0),
          }),
        }),
      }),
    }),
    ...nest([ `&:not(.${Theme.tabBlock})` ], {
      ...nest([ `.${Theme.badge}` ], {
        paddingRight: 0,
      }),
    }),
  }),
});
