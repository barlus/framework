import {nest, em, px, stylesheet} from "@barlus/styles"

export default Theme;

export const enum Theme {
  svgIcon = 'svg-icon',
}

stylesheet('svgIcons.css')('', {
  ...nest([`.${Theme.svgIcon}`], {
    userSelect: 'none',
    fontSize: px(24),
    width: em(1),
    height: em(1),
    display: 'inline-block',
    fill: 'currentColor',
    flexShrink: 0,
    transition: `fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`
  })
});
