import {$, list, em, viewHeight, media, nest, percent, rem, rgba, s, stylesheet, translateX} from "@barlus/styles"


export default Theme;
export const enum Theme {
  active = 'active',
  offCanvas = 'off-canvas',
  offCanvasContent = 'off-canvas-content',
  offCanvasOverlay = 'off-canvas-overlay',
  offCanvasSidebar = 'off-canvas-sidebar',
  offCanvasSidebarShow = 'off-canvas-sidebar-show',
  offCanvasToggle = 'off-canvas-toggle',
}

stylesheet('off-canvas.ts')('', {
  ...nest([ `.${Theme.offCanvas}` ], {
    display: 'flex',
    flexFlow: 'nowrap',
    height: viewHeight(100),
    position: 'relative',
    width: percent(100),
    ...nest([ `.${Theme.offCanvasToggle}` ], {
      display: 'block',
      position: 'absolute',
      top: rem($.layoutSpacing),
      transition: 'none',
      zIndex: $.zIndex0,
      left: rem($.layoutSpacing),
    }),
    ...nest([ `.${Theme.offCanvasSidebar}` ], {
      background: $.bgColor.rgba,
      bottom: 0,
      minWidth: rem(10),
      overflowY: 'auto',
      position: 'fixed',
      top: 0,
      transition: list('transform', s(.25), 'ease'),
      zIndex: $.zIndex2,
      left: 0,
      transform: translateX(percent(-100)),
    }),
    ...nest([ `.${Theme.offCanvasContent}` ], {
      flex: list(1, 1, 'auto'),
      height: percent(100),
      padding: list($.layoutSpacing, $.layoutSpacing, $.layoutSpacing, rem(4)),
    }),
    ...nest([ `.${Theme.offCanvasOverlay}` ], {
      background: $.darkColor.fade(.1).toString(),
      borderColor: 'transparent',
      borderRadius: 0,
      bottom: 0,
      display: 'none',
      height: percent(100),
      left: 0,
      position: 'fixed',
      right: 0,
      top: 0,
      width: percent(100),
    }),
    ...nest([ `&.${Theme.active}` ], {
      ...nest([ `.${Theme.offCanvasContent}` ], {
        transform: translateX(em(12)),
      }),
      ...nest([ `.${Theme.offCanvasSidebar}` ], {
        transform: translateX(em(0)),
      }),
      ...nest([ `.${Theme.offCanvasOverlay}` ], {
        display: 'block',
        zIndex: $.zIndex1
      }),
    }),
  }),
  ...media({ minWidth: $.sizeLg }, {
    ...nest([ `.${Theme.offCanvas}` ], {
      ...nest([ `&.${Theme.offCanvasSidebarShow}` ], {
        ...nest([ `.${Theme.offCanvasToggle}` ], {
          display: 'none',
        }),
        ...nest([ `.${Theme.offCanvasSidebar}` ], {
          flex: list(0, 0, 'auto'),
          position: 'relative',
          transform: 'none',
        }),
      }),
    }),
  }),
});
