import { stylesheet, rem, css } from '@barlus/styles';
import { config } from '../config';
import { buttonVariant } from '../mixins/button';
import { controlShadow } from '../mixins/shadow';
import { controlTransition } from '../mixins/transition';

export const enum Theme {
    Tile = "tile",
    centered = "tile-centered",
    tileContent = "tile-content",
    tileIcon = "tile-icon",
    tileTitle = "tile-title",
    tileSubtitle = "tile-subtitle",
    tileAction = "tile-action"
}
