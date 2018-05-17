import { stylesheet, rem, css } from '@barlus/styles';
import { config } from '../config';
import { buttonVariant } from '../mixins/button';
import { controlShadow } from '../mixins/shadow';
import { controlTransition } from '../mixins/transition';

export const enum Theme {
    //image
    imgResponsive = "img-responsive",
    imgContain = "img-fit-contain",
    imgCover = "img-fit-cover",

    videoResponsive = "video-responsive", //19:9
    videoResponsive11 = "video-responsive-1-1",
    videoResponsive43 = "video-responsive-4-3",

    figure = "figure",
    figureCaption = "figure-caption",
}
