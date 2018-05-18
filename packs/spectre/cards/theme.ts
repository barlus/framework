import { stylesheet, rem, css } from '@barlus/styles';
import { config } from '../config';
import { buttonVariant } from '../mixins/button';
import { controlShadow } from '../mixins/shadow';
import { controlTransition } from '../mixins/transition';

export const enum Theme {
    Card = "card",
    CardImage = "card-image",
    CardHeader= "card-header",
    CardTitle = "card-title",
    CardSubtitle = "card-subtitle",
    CardBody = "card-body",
    CardFooter= "card-footer",
    h1 = "h1",
    h2 = "h2",
    h3 = "h3",
    h4 = "h4",
    h5 = "h5",
    h6 = "h6",
}
