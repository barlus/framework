import { stylesheet, rem, css } from '@barlus/styles';
import { config } from '../config';
import { buttonVariant } from '../mixins/button';
import { controlShadow } from '../mixins/shadow';
import { controlTransition } from '../mixins/transition';

export const enum Theme {
    Table = 'table',
    //
    striped ='table-striped',
    hover = 'table-hover',
    scroll = 'table-scroll',
    active = 'active'
}