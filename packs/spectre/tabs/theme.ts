import { stylesheet, rem, css } from '@barlus/styles';
import { config } from '../config';
import { buttonVariant } from '../mixins/button';
import { controlShadow } from '../mixins/shadow';
import { controlTransition } from '../mixins/transition';

export const enum Theme {
    Tab = 'tab',
    //
    tabItem ='tab-item',
    tabBlock='tab-block',
    tabAction ='tab-action',
    active ='active',
}