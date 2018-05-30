import { stylesheet, rem, css } from '@barlus/styles';
import { config } from '../config';
import { controlShadow } from '../mixins/shadow';

export const rule = stylesheet('base.css');

rule('*,::after,::before', {
    boxSizing: css.value.inherit,
});
rule('html', {
    boxSizing: css.value.borderBox,
    fontSize: config.htmlFontSize,
    lineHeight: config.htmlLineHeight,
    "-webkit-tap-highlight-color": css.value.transparent
});
rule('body', {
    background: config.bodyBg.rgba,
    color: config.bodyFontColor.rgba,
    fontFamily: config.baseFontFamily,
    fontSize: rem(config.fontSize),
    overflowX: css.value.hidden,
    textRendering: "optimizeLegibility"
});
rule('a', {
    color: config.linkColor.rgba,
    outline: 0,
    textDecoration: css.value.none,
    ...css.nest('&:focus',{
        ...controlShadow()
    }),
    ...css.nest('&:focus, &:hover, &:active, &.active',{
        color: config.linkColorDark.rgba,
        textDecoration: "underline"
    }),
});