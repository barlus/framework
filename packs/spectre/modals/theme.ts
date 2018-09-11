import {$, list, nest, percent, rem, rgba, s, stylesheet, viewHeight} from "@barlus/styles"
import {shadowVariant}                                                from '../mixins/shadow';


export default Theme;
export const enum Theme {
  active = 'active',
  modal = 'modal',
  modalBody = 'modal-body',
  modalContainer = 'modal-container',
  modalFooter = 'modal-footer',
  modalHeader = 'modal-header',
  modalLg = 'modal-lg',
  modalOverlay = 'modal-overlay',
  modalSm = 'modal-sm',
}

stylesheet('modals.css')('', {
  ...nest([ `.${Theme.modal}` ], {
    alignItems: 'center',
    bottom: 0,
    display: 'none',
    justifyContent: 'center',
    left: 0,
    opacity: 0,
    overflow: 'hidden',
    padding: rem($.layoutSpacing),
    position: 'fixed',
    right: 0,
    top: 0,
    ...nest([ `&:target`, `&.${Theme.active}` ], {
      display: 'flex',
      opacity: 1,
      zIndex: $.zIndex4,
      ...nest([ `.${Theme.modalOverlay}` ], {
        background: $.bgColor.fade(0.75).rgba,
        bottom: 0,
        cursor: 'default',
        display: 'block',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
      }),
      ...nest([ `.${Theme.modalContainer}` ], {
        animation: `slide-down .2s ease 1`,
        maxWidth: $.controlWidthMd,
        width: percent(100),
        zIndex: $.zIndex0,
      }),
    }),
    ...nest([ `&.${Theme.modalSm}` ], {
      ...nest([ `.${Theme.modalContainer}` ], {
        maxWidth: $.controlWidthSm,
        padding: list(0, rem($.unit2)),
      }),
    }),
    ...nest([ `&.${Theme.modalLg}` ], {
      ...nest([ `.${Theme.modalOverlay}` ], {
        background: $.bgColorLight.rgba,
      }),
      ...nest([ `.${Theme.modalContainer}` ], {
        boxShadow: 'none',
        maxWidth: $.controlWidthLg,
      }),
    }),
  }),
  ...nest([ `.${Theme.modalContainer}` ], {
    ...shadowVariant(.2),
    background: $.bgColorLight.rgba,
    borderRadius: rem($.borderRadius),
    display: 'block',
    padding: list(0, $.unit4),
    ...nest([ `.${Theme.modalHeader}` ], {
      padding: rem($.unit4),
    }),
    ...nest([ `.${Theme.modalBody}` ], {
      maxHeight: viewHeight(50),
      overflowY: 'auto',
      padding: rem($.unit4),
      position: 'relative',
    }),
    ...nest([ `.${Theme.modalFooter}` ], {
      padding: rem($.unit4),
      textAlign: 'right',
    }),
  }),
});
