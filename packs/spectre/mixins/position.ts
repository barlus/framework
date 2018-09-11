import {config}    from '../config';
import {rem, nest} from '@barlus/styles';

// Margin utility mixin
export const marginVariant = (id = 1, size = config.unit1) => ({
  ...nest(`.m-${id}`, {
    margin: rem(size),
  }),
  ...nest(`.mb-${id}`, {
    marginBottom: rem(size),
  }),
  ...nest(`.ml-${id}`, {
    marginLeft: rem(size),
  }),
  ...nest(`.mr-${id}`, {
    marginRight: rem(size),
  }),
  ...nest(`.mt-${id}`, {
    marginTop: rem(size),
  }),
  ...nest(`.mx-${id}`, {
    marginLeft: size,
    marginRight: rem(size),
  }),
  ...nest(`.my-${id}`, {
    marginBottom: rem(size),
    marginTop: rem(size),
  })
});
export const paddingVariant = (id = 1, size = config.unit1) => ({
  ...nest(`.p-${id}`, {
    padding: rem(size),
  }),

  ...nest(`.pb-${id}`, {
    paddingBottom: rem(size),
  }),

  ...nest(`.pl-${id}`, {
    paddingLeft: rem(size),
  }),

  ...nest(`.pr-${id}`, {
    paddingRight: rem(size),
  }),

  ...nest(`.pt-${id}`, {
    paddingTop: rem(size),
  }),

  ...nest(`.px-${id}`, {
    paddingLeft: rem(size),
    paddingRight: rem(size),
  }),

  ...nest(`.py-${id}`, {
    paddingBottom: rem(size),
    paddingTop: rem(size),
  }),
});

