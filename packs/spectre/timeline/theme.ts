import {$, list, nest, percent, px, stylesheet, rem} from "@barlus/styles"


export default Theme;
export const enum Theme {
  iconLg = 'icon-lg',
  timeline = 'timeline',
  timelineContent = 'timeline-content',
  timelineIcon = 'timeline-icon',
  timelineItem = 'timeline-item',
  timelineLeft = 'timeline-left',
}

stylesheet('timelines.ts')('', {
  ...nest([ `.${Theme.timeline}` ], {
    ...nest([ `.${Theme.timelineItem}` ], {
      display: 'flex',
      marginBottom: rem($.unit6),
      position: 'relative',
      ...nest([ `&::before` ], {
        background: $.borderColor.rgba,
        content: "\"\"",
        height: percent(100),
        left: 11,
        position: 'absolute',
        top: rem($.unit6),
        width: 2,
      }),
      ...nest([ `.${Theme.timelineLeft}` ], {
        flex: '0 0 auto',
      }),
      ...nest([ `.${Theme.timelineContent}` ], {
        flex: '1 1 auto',
        padding: list(2, 0, 2, rem($.layoutSpacingLg)),
      }),
      ...nest([ `.${Theme.timelineIcon}` ], {
        borderRadius: percent(50),
        color: $.lightColor.rgba,
        display: 'block',
        height: rem($.unit6),
        textAlign: 'center',
        width: rem($.unit6),
        ...nest([ `&::before` ], {
          border: list(rem($.borderWidthLg), 'solid', $.primaryColor.rgba),
          borderRadius: percent(50),
          content: "\"\"",
          display: 'block',
          height: rem($.unit2),
          left: rem($.unit2),
          position: 'absolute',
          top: rem($.unit2),
          width: rem($.unit2),
        }),
        ...nest([ `&.${Theme.iconLg}` ], {
          background: $.primaryColor.rgba,
          lineHeight: rem($.lineHeight),
          ...nest([ `&::before` ], {
            content: 'none',
          }),
        }),
      }),
    }),
  }),
});