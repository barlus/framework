import {$, list, nest, percent, rem, stylesheet} from "@barlus/styles"


export default Theme;
export const enum Theme {
  active = 'active',
  table = 'table',
  tableHover = 'table-hover',
  tableScroll = 'table-scroll',
  tableStriped = 'table-striped',
}

stylesheet('tables.css')('', {
  ...nest([ `.${Theme.table}` ], {
    borderCollapse: 'collapse',
    borderSpacing: 0,
    width: percent(100),
    textAlign: 'left',
    ...nest([ `&.${Theme.tableStriped}` ], {
      ...nest([ `tbody` ], {
        ...nest([ `tr:nth-of-type(odd)` ], {
          background: $.bgColor.rgba,
        }),
      }),
    }),
    ...nest([ `&`, `&.${Theme.tableStriped}` ], {
      ...nest([ `tbody` ], {
        ...nest([ `tr` ], {
          ...nest([ `&.${Theme.active}` ], {
            background: $.bgColorDark.rgba,
          }),
        }),
      }),
    }),
    ...nest([ `&.${Theme.tableHover}` ], {
      ...nest([ `tbody` ], {
        ...nest([ `tr` ], {
          ...nest([ `&:hover` ], {
            background: $.bgColorDark.rgba,
          }),
        }),
      }),
    }),
    ...nest([ `&.${Theme.tableScroll}` ], {
      display: 'block',
      overflowX: 'auto',
      paddingBottom: rem(.75),
      whiteSpace: 'nowrap',
    }),
    ...nest([ `td`, `th` ], {
      borderBottom: list(rem($.borderWidth), 'solid', $.borderColor.rgba),
      padding: list(rem($.unit3), rem($.unit2)),
    }),
    ...nest([ `th` ], {
      borderBottomWidth: rem($.borderWidthLg),
    }),
  }),
});
