import { stylesheet, rem, css } from '@barlus/styles';
import { config } from '../config';
import { buttonVariant } from '../mixins/button';
import { controlShadow } from '../mixins/shadow';
import { controlTransition } from '../mixins/transition';

export const enum Theme {
    Empty = "empty",
    emptyIcon = "empty-icon",
    emptyTitle = "empty-title",
    emptySubtitle = "empty-subtitle",
    emptyAction = "empty-action"
}
