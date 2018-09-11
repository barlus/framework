import {$, stylesheet, rem, nest, list} from '@barlus/styles';
import {buttonVariant}                  from '../mixins/button';
import {controlShadow}                  from '../mixins/shadow';
import {controlTransition}              from '../mixins/transition';


export const enum Theme {
  Button = 'Button',
  ButtonGroup = 'ButtonGroup',
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

// Buttons
stylesheet('buttons.css')('*', {
  ...nest(`&.${Theme.Button}`, {
    appearance /*     */: 'none',
    background /*     */: $.bgColorLight.rgba,
    borderWidth /*    */: rem($.borderWidth),
    borderStyle /*    */: 'solid',
    borderColor /*    */: $.primaryColor.rgba,
    borderRadius /*   */: rem($.borderRadius),
    color /*          */: $.primaryColor.rgba,
    cursor /*         */: 'pointer',
    display /*        */: 'inline-block',
    fontSize /*       */: rem($.fontSize),
    height /*         */: rem($.controlSize),
    lineHeight /*     */: rem($.lineHeight),
    outline /*        */: $.borderWidth,
    padding /*        */: list([
      rem($.controlPaddingY),
      rem($.controlPaddingX)
    ]),
    textAlign /*      */: 'center',
    textDecoration /* */: 'none',
    userSelect /*     */: 'none',
    verticalAlign /*  */: 'middle',
    whiteSpace /*     */: 'nowrap',
    ...controlTransition(),
    ...nest(`&:${Theme.focus}`, {
      ...controlShadow(),
    }),
    ...nest([ `&:${Theme.focus}`, `&:${Theme.hover}` ], {
      background /*      */: $.secondaryColor.rgba,
      borderColor /*     */: $.primaryColorDark.rgba,
      textDecoration /*  */: 'none',
    }),
    ...nest([ `&:${Theme.active}`, `&.${Theme.active}` ], {
      background: $.primaryColorDark.rgba,
      borderColor: $.primaryColorDark.darken(0.05).rgba,
      color: $.lightColor.rgba,
      textDecoration: 'none',
      ...nest(`&.${Theme.loading}`, {
        ...nest(`&::after`, {
          borderBottomColor: $.lightColor.rgba,
          borderLeftColor: $.lightColor.rgba,
        }),
      }),
    }),
    ...nest([ `&[${Theme.disabled}]`, `&:${Theme.disabled}`, `&.${Theme.disabled}` ], {
      cursor: 'default',
      opacity: .5,
      pointerEvents: 'none',
    }),
    // Button primary
    ...nest(`&.${Theme.primary}`, {
      background: $.primaryColor.rgba,
      borderColor: $.primaryColorDark.rgba,
      color: $.lightColor.rgba,
      ...nest([ `&:${Theme.focus}`, `&:${Theme.hover}` ], {
        background: $.primaryColorDark.darken(0.02).rgba,
        borderColor: $.primaryColorDark.darken(0.05).rgba,
        color: $.lightColor.rgba,
      }),
      ...nest([ `&:${Theme.active}`, `&.${Theme.active}` ], {
        background: $.primaryColorDark.darken(0.04).rgba,
        borderColor: $.primaryColorDark.darken(0.07).rgba,
        color: $.lightColor.rgba,
      }),
      ...nest(`&.${Theme.loading}`, {
        ...nest(`&::after`, {
          borderBottomColor: $.lightColor.rgba,
          borderLeftColor: $.lightColor.rgba,
        }),
      }),
    }),
    // Button Colors
    ...nest(`&.${Theme.success}`, buttonVariant($.successColor)),
    ...nest(`&.${Theme.error}`, buttonVariant($.errorColor)),
    ...nest(`&.${Theme.warning}`, buttonVariant($.warningColor)),
    // Button link
    ...nest(`&.${Theme.link}`, {
      background: 'transparent',
      borderColor: 'transparent',
      color: $.linkColor.rgba,
      ...nest([
        `&:${Theme.focus}`,
        `&:${Theme.hover}`,
        `&:${Theme.active}`,
        `&.${Theme.active}`
      ], {
        color: $.linkColorDark.rgba,
      }),
    }),
    // Button Sizes
    ...nest(`&.${Theme.small}`, {
      fontSize: rem($.fontSizeSm),
      height: rem($.controlSizeSm),
      padding: list([
        rem($.controlPaddingYSm),
        rem($.controlPaddingXSm)
      ]),
    }),
    ...nest(`&.${Theme.large}`, {
      fontSize: rem($.fontSizeLg),
      height: rem($.controlSizeLg),
      padding: list([
        rem($.controlPaddingYLg),
        rem($.controlPaddingXLg)
      ]),
    }),
    // Button block
    ...nest(`&.${Theme.block}`, {
      display: 'block',
      width: `100%`,
    }),
    // Button action
    ...nest(`&.${Theme.action}`, {
      width: rem($.controlSize),
      paddingLeft: rem(0),
      paddingRight: rem(0),
      ...nest(`&.${Theme.small}`, {
        width: rem($.controlSizeSm),
      }),
      ...nest(`&.${Theme.large}`, {
        width: rem($.controlSizeLg),
      }),
    }),
    // Button clear
    ...nest(`&.${Theme.clear}`, {
      background: 'transparent',
      border: 0,
      color: `currentColor`,
      height: rem($.unit4),
      lineHeight: rem($.unit4),
      marginLeft: rem($.unit1),
      marginRight: `-2px`,
      opacity: 1,
      padding: rem(0),
      textDecoration: 'none',
      width: rem($.unit4),
      ...nest(`&:hover`, {
        opacity: .95,
      }),
      ...nest(`&::before`, {
        content: `"\\2715"`,
      }),
    }),
  }),
  ...nest(`&.${Theme.ButtonGroup}`, {
    display: 'inline-flex',
    flexWrap: 'wrap',
    ...nest(`.${Theme.Button}`, {
      flex: list(1, 0, 'auto'),
      ...nest(`&:first-child:not(:last-child)`, {
        borderBottomRightRadius: rem(0),
        borderTopRightRadius: rem(0),
      }),
      ...nest(`&:not(:first-child):not(:last-child)`, {
        borderRadius: rem(0),
        marginLeft: rem(-$.borderWidth),
      }),
      ...nest(`&:last-child:not(:first-child)`, {
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        marginLeft: rem(-$.borderWidth),
      }),
      ...nest(`&:focus, &:hover, &:active, &.active`, {
        zIndex: $.zIndex0,
      }),
    }),
    ...nest(`&.${Theme.block}`, {
      display: 'flex',
      ...nest(`.${Theme.Button}`, {
        flex: list(1, 0, 0),
      }),
    }),
  }),
});
