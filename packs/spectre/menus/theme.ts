import { stylesheet, rem, css } from '@barlus/styles';
import { config } from '../config';
import { buttonVariant } from '../mixins/button';
import { controlShadow } from '../mixins/shadow';
import { controlTransition } from '../mixins/transition';

export const enum Theme {
    Dropdown = "dropdown",
    right = 'dropdown-right',
    active = 'active',
    DropdownToggle = "dropdown-toggle",
    Menu = "menu",
    MenuItem = "menu-item",
    MenuBadge = "menu-badge",
    divider = "divider",
}
