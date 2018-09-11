import {$, list, nest, percent, rem, stylesheet} from "@barlus/styles"


export default Theme;
export const enum Theme {
  figure = 'figure',
  figureCaption = 'figure-caption',
  imgFitContain = 'img-fit-contain',
  imgFitCover = 'img-fit-cover',
  imgResponsive = 'img-responsive',
  videoResponsive = 'video-responsive',
  videoResponsive11 = 'video-responsive-1-1',
  videoResponsive43 = 'video-responsive-4-3',
}

stylesheet('media.ts')('', {
  ...nest([ `.${Theme.imgResponsive}` ], {
    display: 'block',
    height: 'auto',
    maxWidth: percent(100),
  }),
  ...nest([ `.${Theme.imgFitCover}` ], {
    objectFit: 'cover',
  }),
  ...nest([ `.${Theme.imgFitContain}` ], {
    objectFit: 'contain',
  }),
  ...nest([ `.${Theme.videoResponsive}` ], {
    display: 'block',
    overflow: 'hidden',
    padding: 0,
    position: 'relative',
    width: percent(100),
    ...nest([ `&::before` ], {
      content: "\"\"",
      display: 'block',
      paddingBottom: percent(56.25),
    }),
    ...nest([ `iframe`, `object`, `embed` ], {
      border: 0,
      bottom: 0,
      height: percent(100),
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      width: percent(100),
    }),
  }),
  ...nest([ `video.${Theme.videoResponsive}` ], {
    height: 'auto',
    maxWidth: percent(100),
    ...nest([ `&::before` ], {
      content: 'none',
    }),
  }),
  ...nest([ `.${Theme.videoResponsive43}` ], {
    ...nest([ `&::before` ], {
      paddingBottom: percent(75),
    }),
  }),
  ...nest([ `.${Theme.videoResponsive11}` ], {
    ...nest([ `&::before` ], {
      paddingBottom: percent(100),
    }),
  }),
  ...nest([ `.${Theme.figure}` ], {
    margin: list(0, 0, rem($.layoutSpacing), 0),
    ...nest([ `.${Theme.figureCaption}` ], {
      color: $.grayColorDark.rgba,
      marginTop: rem($.layoutSpacing),
    }),
  }),
});
