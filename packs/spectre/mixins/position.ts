import { config } from '../config';
import { rem, css } from '@barlus/styles';

// Margin utility mixin
export const marginVariant = (id = 1, size = config.unit1) => ({
    ...css.nest(`.m-${id}`, {
        margin: rem(size),
    }),
    ...css.nest(`.mb-${id}`, {
        marginBottom: rem(size),
    }),

    ...css.nest(`.ml-${id}`, {
        marginLeft: rem(size),
    }),

    ...css.nest(`.mr-${id}`, {
        marginRight: rem(size),
    }),

    ...css.nest(`.mt-${id}`, {
        marginTop: rem(size),
    }),

    ...css.nest(`.mx-${id}`, {
        marginLeft: size,
        marginRight: rem(size),
    }),

    ...css.nest(`.my-${id}`, {
        marginBottom: rem(size),
        marginTop: rem(size),
    })
});
export const paddingVariant = (id = 1, size = config.unit1) => ({
    ...css.nest(`.p-${id}`, {
        padding: rem(size),
    }),

    ...css.nest(`.pb-${id}`, {
        paddingBottom: rem(size),
    }),

    ...css.nest(`.pl-${id}`, {
        paddingLeft: rem(size),
    }),

    ...css.nest(`.pr-${id}`, {
        paddingRight: rem(size),
    }),

    ...css.nest(`.pt-${id}`, {
        paddingTop: rem(size),
    }),

    ...css.nest(`.px-${id}`, {
        paddingLeft: rem(size),
        paddingRight: rem(size),
    }),

    ...css.nest(`.py-${id}`, {
        paddingBottom: rem(size),
        paddingTop: rem(size),
    }),
});

