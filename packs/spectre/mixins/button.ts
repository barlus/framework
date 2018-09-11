import {config}        from '../config';
import {nest}          from '@barlus/styles';
import {controlShadow} from './shadow';

// Button variant mixin
export const buttonVariant = (color = config.primaryColor) => ({
  background: `${color.toRGBA()}`,
  borderColor: `${color.darken(0.03).toRGBA()}`,
  color: `${config.lightColor}`,
  ...nest(`&:focus`, {
    ...controlShadow(color),
  }),
  ...nest(`&:focus, &:hover`, {
    background: `${color.darken(0.02).toRGBA()}`,
    borderColor: `${color.darken(0.05).toRGBA()}`,
    color: `${config.lightColor.toRGBA()}`,
  }),
  ...nest(`&:active, &.active`, {
    background: `${color.darken(0.07).toRGBA()}`,
    borderColor: `${color.darken(0.10).toRGBA()}`,
    color: `${config.lightColor.toRGBA()}`,
  }),
  ...nest(`&.loading`, {
    ...nest(`&::after`, {
      borderBottomColor: `${config.lightColor.toRGBA()}`,
      borderLeftColor: `${config.lightColor.toRGBA()}`,
    }),
  }),
});
export const buttonOutlineVariant = (color = config.primaryColor) => ({
  background: `${config.lightColor.toRGBA()}`,
  borderColor: `${color.toRGBA()}`,
  color: `${color.toRGBA()}`,
  ...nest(`&:focus`, {
    ...controlShadow(color),
  }),
  ...nest(`&:focus, &:hover`, {
    background: `${color.lighten(0.50).toRGBA()}`,
    borderColor: `${color.darken(0.02).toRGBA()}`,
    color: `${color.toRGBA()}`,
  }),
  ...nest(`&:active, &.active`, {
    background: `$color.toRGBA()`,
    borderColor: `${color.darken(0.05).toRGBA()}`,
    color: `${config.lightColor.toRGBA()}`,
  }),
  ...nest(`&.loading`, {
    ...nest(`&::after`, {
      borderBottomColor: `${color.toRGBA()}`,
      borderLeftColor: `${color.toRGBA()}`,
    }),
  })
});
