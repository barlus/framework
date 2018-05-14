import { stylesheet, rem, css, percent } from '@barlus/styles';
import { config } from '../config';
export const rule = stylesheet('table.css');

// Tables
rule(`.table`, {
    borderCollapse: css.value.collapse,
    borderSpacing: rem(0),
    width: percent(100),
    textAlign: css.value.left,
    ...css.nest(`&.table-striped`, {
        ...css.nest(`tbody`, {
            ...css.nest(`tr:nth-of-type(odd)`, {
                background: config.bgColor.rgba,
            }),
        }),
    }),
    ...css.nest(`&,&.table-striped`, {
        ...css.nest(`tbody`, {
            ...css.nest(`tr`, {
                ...css.nest(`&.active`, {
                    background: config.bgColorDark.rgba,
                }),
            }),
        }),
    }),
    ...css.nest(`&.table-hover`, {
        ...css.nest(`tbody`, {
            ...css.nest(`tr`, {
                ...css.nest(`&:hover`, {
                    background: config.bgColorDark.rgba,
                }),
            }),
        }),
    }),
    // Tables with horizontal scrollbar
    ...css.nest(`&.table-scroll`, {
        display: css.value.block,
        overflowX: css.value.auto,
        paddingBottom: rem(.75),
        whiteSpace: css.value.nowrap,
    }),
    ...css.nest(`td,th`, {
        borderBottom: css.values(rem(config.borderWidth), css.value.solid, config.borderColor.rgba),
        padding: css.values(rem(config.unit3), rem(config.unit2)),
    }),
    ...css.nest(`th`, {
        borderBottomWidth: rem(config.borderWidthLg),
    }),
});
