import { stylesheet, rem, nest} from '@barlus/styles';
import { config } from '../config';
import { controlShadow } from '../mixins/shadow';

export const rule = stylesheet('base.css');

rule('*,::after,::before', {
    boxSizing: 'inherit',
});
rule('html', {
    boxSizing: 'border-box',
    fontSize: config.htmlFontSize,
    lineHeight: config.htmlLineHeight,
    "-webkit-tap-highlight-color": 'transparent'
});
rule('body', {
    background: config.bodyBg.rgba,
    color: config.bodyFontColor.rgba,
    fontFamily: config.baseFontFamily,
    fontSize: rem(config.fontSize),
    overflowX: 'hidden',
    textRendering: "optimizeLegibility"
});
rule('a', {
    color: config.linkColor.rgba,
    outline: 0,
    textDecoration: 'none',
    ...nest('&:focus',{
        ...controlShadow()
    }),
    ...nest('&:focus, &:hover, &:active, &.active',{
        color: config.linkColorDark.rgba,
        textDecoration: "underline"
    }),
});