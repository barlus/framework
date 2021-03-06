import {$, em, list, nest, percent, px, rem, stylesheet} from "@barlus/styles"
import {controlShadow}                                   from '../mixins/shadow';


stylesheet('normalize.ts')('', {
  ...nest([ `*`, `*::before`, `*::after` ], {
    boxSizing: 'inherit',
  }),
  ...nest([ `html` ], {
    boxSizing: 'border-box',
    fontFamily: 'sans-serif',
    fontSize: $.htmlFontSize,
    lineHeight: $.htmlLineHeight,
    '-webkit-tap-highlight-color': 'transparent',
    '-webkit-text-size-adjust': '100%',
  }),
  ...nest([ `body` ], {
    background: $.bodyBg.rgba,
    color: $.bodyFontColor.rgba,
    fontFamily: $.bodyFontFamily,
    fontSize: rem($.fontSize),
    overflowX: 'hidden',
    textRendering: 'optimizeLegibility',
    margin: 0,
  }),
  ...nest([ `article`, `aside`, `footer`, `header`, `nav`, `section` ], {
    display: 'block',
  }),
  ...nest([ `h1` ], {
    fontSize: em(2),
    margin: list(em(0.67), 0),
  }),
  ...nest([ `figcaption`, `figure`, `main` ], {
    display: 'block',
  }),
  ...nest([ `hr` ], {
    boxSizing: 'content-box',
    height: 0,
    overflow: 'visible',
  }),
  ...nest([ `a` ], {
    color: $.linkColor.rgba,
    outline: 'none',
    textDecoration: 'none',
    ...nest([ `&:focus` ], {
      ...controlShadow(),
    }),
    ...nest([ `&:focus`, `&:hover`, `&:active`, `&.active` ], {
      color: $.linkColorDark.rgba,
      textDecoration: 'underline',
    }),
    ...nest([ `&:active`, `&:hover` ], {
      outlineWidth: 0,
    }),
    backgroundColor: 'transparent',
    '-webkit-text-decoration-skip': 'objects',
  }),

  ...nest([ `address` ], {
    fontStyle: 'normal',
  }),
  ...nest([ `b`, `strong` ], {
    fontWeight: 'inherit',
  }),
  ...nest([ `b`, `strong` ], {
    fontWeight: 'bolder',
  }),
  ...nest([ `code`, `kbd`, `pre`, `samp` ], {
    fontFamily: $.monoFontFamily,
    fontSize: em(1),
  }),
  ...nest([ `dfn` ], {
    fontStyle: 'italic',
  }),
  ...nest([ `small` ], {
    fontSize: percent(80),
    fontWeight: 400,
  }),
  ...nest([ `sub`, `sup` ], {
    fontSize: percent(75),
    lineHeight: 0,
    position: 'relative',
    verticalAlign: 'baseline',
  }),
  ...nest([ `sub` ], {
    bottom: em(-0.25),
  }),
  ...nest([ `sup` ], {
    top: em(-0.5),
  }),
  ...nest([ `audio`, `video` ], {
    display: 'inline-block',
  }),
  ...nest([ `audio:not([controls])` ], {
    $unique: true,
    display: 'none',
    height: 0,
  }),
  ...nest([ `img` ], {
    borderStyle: 'none',
  }),
  ...nest([ `svg:not(:root)` ], {
    overflow: 'hidden',
  }),
  ...nest([ `button`, `input`, `optgroup`, `select`, `textarea` ], {
    $unique: true,
    fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    margin: 0,
  }),
  ...nest([ `button`, `input` ], {
    overflow: 'visible',
  }),
  ...nest([ `button`, `select` ], {
    textTransform: 'none',
  }),
  ...nest([ `button`, `html [type=button]`, `[type=reset]`, `[type=submit]` ], {
    '-webkit-appearance': 'button',
  }),
  ...nest([ `button::-moz-focus-inner`, `[type=button]::-moz-focus-inner`, `[type=reset]::-moz-focus-inner`, `[type=submit]::-moz-focus-inner` ], {
    borderStyle: 'none',
    padding: 0,
  }),
  ...nest([ `fieldset` ], {
    border: 0,
    margin: 0,
    padding: 0,
  }),
  ...nest([ `legend` ], {
    boxSizing: 'border-box',
    color: 'inherit',
    display: 'table',
    maxWidth: percent(100),
    padding: 0,
    whiteSpace: 'normal',
  }),
  ...nest([ `progress` ], {
    display: 'inline-block',
    verticalAlign: 'baseline',
  }),
  ...nest([ `textarea` ], {
    overflow: 'auto',
  }),
  ...nest([ `[type=checkbox]`, `[type=radio]` ], {
    $unique: true,
    boxSizing: 'border-box',
    padding: 0,
  }),
  ...nest([ `[type=number]::-webkit-inner-spin-button`, `[type=number]::-webkit-outer-spin-button` ], {
    $unique: true,
    height: 'auto',
  }),
  ...nest([ `[type=search]` ], {
    $unique: true,
    '-webkit-appearance': 'textfield',
    outlineOffset: px(-2),
  }),
  ...nest([ `[type=search]::-webkit-search-cancel-button`, `[type=search]::-webkit-search-decoration` ], {
    $unique: true,
    '-webkit-appearance': 'none',
  }),
  ...nest([ `::-webkit-file-upload-button` ], {
    $unique: true,
    '-webkit-appearance': 'button',
    font: 'inherit',
  }),
  ...nest([ `details`, `menu` ], {
    display: 'block',
  }),
  ...nest([ `summary` ], {
    display: 'list-item',
    outline: 'none',
  }),
  ...nest([ `canvas` ], {
    display: 'inline-block',
  }),
  ...nest([ `template` ], {
    display: 'none',
  }),
  ...nest([ `[hidden]` ], {
    display: 'none',
  }),

});
