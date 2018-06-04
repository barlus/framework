import { stylesheet, rem, css } from '@barlus/styles';
import { config } from '../config';
import { buttonVariant } from '../mixins/button';
import { controlShadow } from '../mixins/shadow';
import { controlTransition } from '../mixins/transition';

export const enum Theme {
    Panel = "panel",
    header = "panel-header",
    title = "panel-title",
    subtitle = "panel-subtitle",
    nav = "panel-nav",
    body = "panel-body",
    footer = "panel-footer",

}
