// Avatar mixin
import $ from '../config';
import { rem } from '@barlus/styles';

const avatarBase = (size = $.unit8) => ({
    fontSize: rem(size / 2),
    height: rem(size),
    width: rem(size),
});
