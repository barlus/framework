import { stylesheet, rem, css } from '@barlus/styles';
import { config } from '../config';
import { buttonVariant } from '../mixins/button';
import { controlShadow } from '../mixins/shadow';
import { controlTransition } from '../mixins/transition';

export const enum Theme {
    Accordion = 'accordion',
    AccordionHeader = 'accordion-header',
    AccordionBody = 'accordion-body',
    //
    primary = 'primary',
    link = 'link',
    action = 'action',
    circle = 'circle',
    success = 'success',
    error = 'error',
    warning = 'warning',
    active = 'active',
    disabled = 'disabled',
    loading = 'loading',
    block = 'block',
    clear = 'clear',
    large = 'large',
    small = 'sm',
    focus = 'focus',
    hover = 'hover',
}

