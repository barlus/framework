import {$, list, nest, percent, px, rem, stylesheet} from "@barlus/styles"
import {toastVariant}                                from '../mixins/toast';


export default Theme;
export const enum Theme {
  active = 'active',
  btnClear = 'btn-clear',
  toast = 'toast',
  toastError = 'toast-error',
  toastPrimary = 'toast-primary',
  toastSuccess = 'toast-success',
  toastWarning = 'toast-warning',
}

stylesheet('toasts.ts')('', {
  ...nest([ `.${Theme.toast}` ], {
    ...toastVariant($.darkColor),
    border: list(rem($.borderWidth), 'solid', $.darkColor.rgba),
    borderRadius: rem($.borderRadius),
    color: $.lightColor.rgba,
    display: 'block',
    padding: rem($.layoutSpacing),
    width: percent(100),
    ...nest([ `&.${Theme.toastPrimary}` ], {
      ...toastVariant($.primaryColor),
    }),
    ...nest([ `&.${Theme.toastSuccess}` ], {
      ...toastVariant($.successColor),
    }),
    ...nest([ `&.${Theme.toastWarning}` ], {
      ...toastVariant($.warningColor),
    }),
    ...nest([ `&.${Theme.toastError}` ], {
      ...toastVariant($.errorColor),
    }),
    ...nest([ `a` ], {
      color: $.lightColor.rgba,
      textDecoration: 'underline',
      ...nest([ `&:focus`, `&:hover`, `&:active`, `&.${Theme.active}` ], {
        opacity: .75,
      }),
    }),
    ...nest([ `.${Theme.btnClear}` ], {
      margin: list(px(4), px(-2), px(4), px(4)),
    }),
  }),
});
