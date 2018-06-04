import $ from '../config';
import { rem } from '@barlus/styles';

// Component focus shadow
export const controlShadow = (color = $.primaryColor) => ({
    boxShadow: `0 0 0 ${rem(.1)} ${color.fade(0.2).toRGBA()}`,
});

// Shadow mixin
export const shadowVariant = (offset,darkColor=$.darkColor) => ({
    boxShadow: `0 ${rem(offset)} ${rem(offset + .05 * 2)} ${darkColor.fade(0.3).toRGBA()}`,
});
