// Avatar mixin
import { config } from '../config';
import { rem } from '@barlus/styles';

export const avatarBase = (size = config.unit8) => ({
    fontSize: rem(size / 2),
    height: rem(size),
    width: rem(size),
});
