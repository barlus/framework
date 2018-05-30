import { config } from '../config';
import { css } from '@barlus/styles';

// Background color utility mixin
const bgColorVariant = (name: string = ".bg-primary", color = config.primaryColor) => ({
    ...css.nest(`${name}`, {
        background: color,
        ...css.when(color.lightness() < 60, {
            color: config.lightColor.toRGBA(),
        })
    })
});
// Text color utility mixin
const textColorVariant = (name: string = ".text-primary", color = config.primaryColor) => ({
    ...css.nest(`${name}`, {
        color: `${color.toRGBA()}`,
    }),
    ...css.nest(`${name}`, {
        ...css.nest(`&:focus, &:hover`, {
            color: `${color.darken(0.05).toRGBA()}`,
        })
    }),
});
