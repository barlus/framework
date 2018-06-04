import { stylesheet, rem, css } from '@barlus/styles';
import { config } from '../config';
import { buttonVariant } from '../mixins/button';
import { controlShadow } from '../mixins/shadow';
import { controlTransition } from '../mixins/transition';

export const enum Theme {
    Pagination = "pagination",
    paginationItem = "page-item",
    paginationPrev = "page-prev",
    paginationNext = "page-next",
    paginationTitle = "page-item-title",
    paginationSubTitle = "page-item-subtitle",
    active = "active",
    disabled = "disabled",
}
