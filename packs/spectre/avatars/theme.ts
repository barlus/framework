// import { stylesheet, rem, css } from '@barlus/styles';
// import { config } from '../config';
// import { buttonVariant } from '../mixins/button';
// import { controlShadow } from '../mixins/shadow';
// import { controlTransition } from '../mixins/transition';

// export const enum Theme {
//     avatar = "avatar",
//     avatarXl = "avatar-xl",
//     avatarLg = "avatar-lg",
//     avatarSm = "avatar-sm",
//     avatarXs = "avatar-xs",
//     icon = "avatar-icon",
//     presence = "avatar-presence",
//     online = "online",
//     busy = "busy",
//     away = "away",
// }

import { $, em, join, list, nest, percent, rem, stylesheet, translate } from "@barlus/styles"
import { avatarBase } from "../mixins/avatar"

export default Theme;
export const enum Theme {
    avatar = 'avatar',
    avatarIcon = 'avatar-icon',
    avatarLg = 'avatar-lg',
    avatarPresence = 'avatar-presence',
    avatarSm = 'avatar-sm',
    avatarXl = 'avatar-xl',
    avatarXs = 'avatar-xs',
    away = 'away',
    busy = 'busy',
    online = 'online',
    icon = 'icon',
}

stylesheet('avatars.css')('', {
    ...nest([ `.${Theme.avatar}` ], {
        ...avatarBase(),
        background: $.primaryColor.rgba,
        borderRadius: percent(50),
        color: $.lightColor.fade(.85).rgba,
        display: 'inline-block',
        fontWeight: 300,
        lineHeight: 1.25,
        margin: 0,
        position: 'relative',
        verticalAlign: 'middle',
        ...nest([ `&.${Theme.avatarXs}` ], avatarBase($.unit4)),
        ...nest([ `&.${Theme.avatarSm}` ], avatarBase($.unit6)),
        ...nest([ `&.${Theme.avatarLg}` ], avatarBase($.unit12)),
        ...nest([ `&.${Theme.avatarXl}` ], avatarBase($.unit16)),
        ...nest([ `img` ], {
            borderRadius: percent(50),
            height: percent(100),
            position: 'relative',
            width: percent(100),
            zIndex: $.zIndex0,
        }),
        ...nest([ `.${Theme.avatarIcon}`, `.${Theme.avatarPresence}` ], {
            background: $.bgColorLight.rgba,
            bottom: percent(14.64),
            height: percent(50),
            padding: rem($.borderWidthLg),
            position: 'absolute',
            right: percent(14.64),
            transform: translate(percent(50), percent(50)),
            width: percent(50),
            zIndex: $.zIndex0+1,
        }),
        ...nest([ `.${Theme.avatarPresence}` ], {
            background: $.grayColor.rgba,
            boxShadow: list(0, 0, 0, rem($.borderWidthLg), $.lightColor.rgba),
            borderRadius: percent(50),
            height: em(.5),
            width: em(.5),
            ...nest([ `&.${Theme.online}` ], {
                background: $.successColor.rgba,
            }),
            ...nest([ `&.${Theme.busy}` ], {
                background: $.errorColor.rgba,
            }),
            ...nest([ `&.${Theme.away}` ], {
                background: $.warningColor.rgba,
            }),
        }),
        ...nest([ `&[data-initial]::before` ], {
            color: 'currentColor',
            content: `attr(data-initial)`,
            left: percent(50),
            position: 'absolute',
            top: percent(50),
            transform: translate(percent(-50), percent(-50)),
            zIndex: $.zIndex0,
        }),
    }),
});
