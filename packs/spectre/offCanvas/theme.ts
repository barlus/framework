import { stylesheet, rem, css } from '@barlus/styles';
import { config } from '../config';
import { buttonVariant } from '../mixins/button';
import { controlShadow } from '../mixins/shadow';
import { controlTransition } from '../mixins/transition';

export const enum Theme {
    OffCanvas = "off-canvas",
    toggle = "off-canvas-toggle ",
    sidebar = "off-canvas-sidebar",
    sidebarShow = "off-canvas-sidebar-show",
    overlay = "off-canvas-overlay",
    content = "off-canvas-content",
    active = "active",
}
