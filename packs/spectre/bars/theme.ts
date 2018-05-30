import { stylesheet, rem, css } from '@barlus/styles';
import { config } from '../config';
import { buttonVariant } from '../mixins/button';
import { controlShadow } from '../mixins/shadow';
import { controlTransition } from '../mixins/transition';

export const enum Theme {
    Bar = 'bar',
    BarItem = 'bar-item',
    Slider = 'bar-slider',
    sliderButton = 'bar-slider-btn',
    small = 'bar-sm',
}
