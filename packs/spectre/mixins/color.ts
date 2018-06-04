import { config } from '../config';
import { nest,when } from '@barlus/styles';

// Background color utility mixin
const bgColorVariant = (name: string = ".bg-primary", color = config.primaryColor) => ({
    ...nest(`${name}`, {
        background: color,
        ...when(color.lightness() < 60, {
            color: config.lightColor.toRGBA(),
        })
    })
});
// Text color utility mixin
const textColorVariant = (name: string = ".text-primary", color = config.primaryColor) => ({
    ...nest(`${name}`, {
        color: `${color.toRGBA()}`,
    }),
    ...nest(`${name}`, {
        ...nest(`&:focus, &:hover`, {
            color: `${color.darken(0.05).toRGBA()}`,
        })
    }),
});
