import { stylesheet, rem, css } from '@barlus/styles';
import { config } from '../config';
import { buttonVariant } from '../mixins/button';
import { controlShadow } from '../mixins/shadow';
import { controlTransition } from '../mixins/transition';

export const enum Theme {
    Tooltip = "tooltip",
    left = "tooltip-left",
    right = "tooltip-right",
    bottom = "tooltip-bottom",

}
