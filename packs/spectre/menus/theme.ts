import {$, list, nest, percent, rem, s, stylesheet, translateY, viewHeight} from "@barlus/styles"
import {shadowVariant}                                                      from '../mixins/shadow';


export default Theme;
export const enum Theme {
  dropdown = "dropdown",
  dropdownRight = 'dropdown-right',
  dropdownToggle = "dropdown-toggle",
  divider = "divider",

  active = 'active',
  btn = 'btn',
  btnGroup = 'btn-group',
  formCheckbox = 'form-checkbox',
  formRadio = 'form-radio',
  formSwitch = 'form-switch',
  menu = 'menu',
  menuBadge = 'menu-badge',
  menuItem = 'menu-item',
  menuNav = 'menu-nav',
}

stylesheet('menus.ts')('', {
  ...nest([ `.${Theme.dropdown}` ], {
    display: 'inline-block',
    position: 'relative',
    ...nest([ `.${Theme.menu}` ], {
      animation: `slide-down .15s ease 1`,
      display: 'none',
      left: 0,
      maxHeight: viewHeight(50),
      overflowY: 'auto',
      position: 'absolute',
      top: percent(100),
    }),
    ...nest([ `&.${Theme.dropdownRight}` ], {
      ...nest([ `.${Theme.menu}` ], {
        left: 'auto',
        right: 0,
      }),
    }),
    ...nest([ `&.${Theme.active} .menu`, `.${Theme.dropdownToggle}:focus + .menu`, `.${Theme.menu}:hover` ], {
      display: 'block',
    }),
    ...nest([ `.${Theme.btnGroup}` ], {
      ...nest([ `.${Theme.dropdownToggle}:nth-last-child(2)` ], {
        borderBottomRightRadius: rem($.borderRadius),
        borderTopRightRadius: rem($.borderRadius),
      }),
    }),
  }),
  ...nest([ `.${Theme.menu}` ], {
    ...shadowVariant(.05),
    background: $.bgColorLight.rgba,
    borderRadius: rem($.borderRadius),
    listStyle: 'none',
    margin: 0,
    minWidth: $.controlWidthXs,
    padding: rem($.unit2),
    transform: translateY(rem($.layoutSpacingSm)),
    zIndex: $.zIndex3,
    ...nest([ `&.${Theme.menuNav}` ], {
      background: 'transparent',
      boxShadow: 'none',
    }),
    ...nest([ `.${Theme.menuItem}` ], {
      marginTop: 0,
      padding: list(0, rem($.unit2)),
      textDecoration: 'none',
      userSelect: 'none',
      ...nest([ `& > a` ], {
        borderRadius: rem($.borderRadius),
        color: 'inherit',
        display: 'block',
        margin: list(0, rem(-$.unit2)),
        padding: list(rem($.unit1), rem($.unit2)),
        textDecoration: 'none',
        ...nest([ `&:focus`, `&:hover` ], {
          background: $.secondaryColor.rgba,
          color: $.primaryColor.rgba,
        }),
        ...nest([ `&:active`, `&.${Theme.active}` ], {
          background: $.secondaryColor.rgba,
          color: $.primaryColor.rgba,
        }),
      }),
      ...nest([ `.${Theme.formCheckbox}`, `.${Theme.formRadio}`, `.${Theme.formSwitch}` ], {
        margin: list(rem($.unitH), 0),
      }),
      ...nest([ `& + .${Theme.menuItem}` ], {
        marginTop: rem($.unit1),
      }),
    }),
    ...nest([ `.${Theme.menuBadge}` ], {
      float: 'right',
      padding: list(rem($.unit1), 0),
      ...nest([ `.${Theme.btn}` ], {
        marginTop: rem(-$.unitH),
      }),
    }),
  }),
});
