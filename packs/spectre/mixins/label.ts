import { config } from '../config';
import { rem, css } from '@barlus/styles';

// Label base style
export const labelBase = (borderRadius = config.borderRadius) => ({
    borderRadius: rem(borderRadius),
    lineHeight: 1.2,
    padding: `${rem(.1)} ${rem(.15)}`,
});
export const labelVariant = (color = config.lightColor, bgColor = config.primaryColor) => ({
    background: `${bgColor.toRGBA()}`,
    color: `${color.toRGBA()}`,
});
