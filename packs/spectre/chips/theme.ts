import {$, list, nest, percent, rem, stylesheet} from "@barlus/styles"


export default Theme;
export const enum Theme {
  active = 'active',
  avatar = 'avatar',
  chip = 'chip',
}

stylesheet('chips.css')('', {
  ...nest([ `.${Theme.chip}` ], {
    alignItems: 'center',
    background: $.bgColorDark.rgba,
    borderRadius: rem(5),
    color: $.grayColorDark.rgba,
    display: 'inline-flex',
    fontSize: percent(90),
    height: rem($.unit6),
    lineHeight: rem($.unit4),
    margin: rem($.unitH),
    maxWidth: percent(100),
    padding: list(rem($.unit1), rem($.unit2)),
    textDecoration: 'none',
    verticalAlign: 'middle',
    ...nest([ `&.${Theme.active}` ], {
      background: $.primaryColor.rgba,
      color: $.lightColor.rgba,
    }),
    ...nest([ `.${Theme.avatar}` ], {
      marginLeft: rem(-$.unit2),
      marginRight: rem($.unit1),
    }),
  }),
});
