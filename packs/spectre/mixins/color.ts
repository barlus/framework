import { config } from '../config';
import { nest,when } from '@barlus/styles';

// Background color utility mixin
export const bgColorVariant = (name: string = ".bg-primary", color = config.primaryColor) => ({
    ...nest(`${name}`, {
        background: color.rgba,
        ...when(color.lightness() < 0.6, {
            color: config.lightColor.rgba,
        })
    })
});
// Text color utility mixin
export const textColorVariant = (name: string = ".text-primary", color = config.primaryColor) => ({
    ...nest(`${name}`, {
        color: color.rgba,
    }),
    ...nest(`a${name}`, {
        ...nest(`&:focus, &:hover`, {
            color: color.darken(0.05).rgba,
        })
    }),
});
