import { stylesheet, rem, css } from '@barlus/styles';
import { config } from '../config';
import { buttonVariant } from '../mixins/button';
import { controlShadow } from '../mixins/shadow';
import { controlTransition } from '../mixins/transition';

export const enum Theme {
    avatar = "avatar",
    avatarXl = "avatar-xl",
    avatarLg = "avatar-lg",
    avatarSm = "avatar-sm",
    avatarXs = "avatar-xs",
    icon = "avatar-icon",
    presence = "avatar-presence",
    online = "online",
    busy = "busy",
    away = "away",
}
