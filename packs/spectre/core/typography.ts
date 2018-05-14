import { stylesheet, rem, css, em } from '@barlus/styles';
import { config } from '../config';
import { labelBase, labelVariant } from '../mixins/label';

export const rule = stylesheet('typography.css');

// Typography
// Headings
rule(`h1, h2, h3, h4, h5, h6`, {
    color: 'inherit',
    fontWeight: 500,
    lineHeight: 1.2,
    marginBottom: em(.5),
    marginTop: 0,
});
rule(`.h1, .h2, .h3, .h4, .h5, .h6`, {
    fontWeight: 500,
});
rule(`h1, .h1`, {
    fontSize: rem(2)
});
rule(`h2, .h2`, {
    fontSize: rem(1.6),
});
rule(`h3, .h3`, {
    fontSize: rem(1.4),
});
rule(`h4, .h4`, {
    fontSize: rem(1.2),
});
rule(`h5, .h5`, {
    fontSize: rem(1),
});
rule(`h6, .h6`, {
    fontSize: rem(.8),
});

// Paragraphs
rule(`p`, {
    margin: css.values(0, 0, rem(config.lineHeight)),
});
// Semantic text elements

rule(`a, ins, u`, {
    textDecorationSkip: css.values('ink', 'edges'),
});
rule(`abbr[title]`, {
    borderBottom: css.values(rem(config.borderWidth), 'dotted'),
    cursor: 'help',
    textDecoration: 'none',
});
rule(`kbd`, {
    ...labelBase(),
    ...labelVariant(config.lightColor, config.darkColor),
    fontSize: rem(config.fontSizeSm),
});
rule(`mark`, {
    ...labelVariant(config.bodyFontColor, config.highlightColor),
    borderRadius: rem(config.borderRadius),
    padding: rem(.05),
});
//
// Blockquote
rule(`blockquote`, {
    borderLeft: css.values(config.borderWidthLg, css.value.solid, config.borderColor.rgba),
    marginLeft: 0,
    padding: css.values(rem(config.unit2), rem(config.unit4)),
    ...css.nest(`p:last-child`, {
        marginBottom: 0,
    }),
});

// Lists
rule(`ul, ol`, {
    margin: css.values(rem(config.unit4), 0, rem(config.unit4), rem(config.unit4)),
    padding: 0,
    ...css.nest(`ul, ol`, {
        margin: css.values(
            rem(config.unit4),
            rem(0),
            rem(config.unit4),
            rem(config.unit4)
        ),
    }),
    ...css.nest(`li`, {
        marginTop: rem(config.unit2),
    }),
});

rule(`ul`, {
    listStyle: 'disc inside',
    ...css.nest(`ul`, {
        listStyleType: 'circle',
    }),
});
rule(`ol`, {
    listStyle: 'decimal inside',
    ...css.nest('ol', {
        listStyleType: 'lower-alpha',
    }),
});
rule(`dl`, {
    ...css.nest(`dt`, {
        fontWeight: 'bold',
    }),
    ...css.nest(`dd`, {
        margin: css.values(rem(config.unit2), 0, rem(config.unit4), 0),
    }),
});