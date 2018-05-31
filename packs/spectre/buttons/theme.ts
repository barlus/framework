import { stylesheet, rem, css } from '@barlus/styles';
import { config } from '../config';
import { buttonVariant } from '../mixins/button';
import { controlShadow } from '../mixins/shadow';
import { controlTransition } from '../mixins/transition';

export const enum Theme {
    Button = 'Button',
    ButtonGroup = 'ButtonGroup',
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



// Buttons
stylesheet('theme/buttons.css')('*',{
    ...css.nest(`&.${Theme.Button}`,{
        appearance /*     */: 'none',
        background /*     */: config.bgColorLight.rgba,
        borderWidth /*    */: rem(config.borderWidth),
        borderStyle /*    */: css.value.solid,
        borderColor /*    */: config.primaryColor.rgba,
        borderRadius /*   */: rem(config.borderRadius),
        color /*          */: config.primaryColor.rgba,
        cursor /*         */: css.value.pointer,
        display /*        */: css.value.inlineBlock,
        fontSize /*       */: rem(config.fontSize),
        height /*         */: rem(config.controlSize),
        lineHeight /*     */: rem(config.lineHeight),
        outline /*        */: css.theme.borderWidth,
        padding /*        */: css.values([
            rem(config.controlPaddingY),
            rem(config.controlPaddingX)
        ]),
        textAlign /*      */: css.value.center,
        textDecoration /* */: css.value.none,
        userSelect /*     */: css.value.none,
        verticalAlign /*  */: css.value.middle,
        whiteSpace /*     */: css.value.nowrap,
        ...controlTransition(),
        ...css.nest(`&:${Theme.focus}`, {
            ...controlShadow(),
        }),
        ...css.nest([ `&:${Theme.focus}`, `&:${Theme.hover}` ], {
            background /*      */: config.secondaryColor.rgba,
            borderColor /*     */: config.primaryColorDark.rgba,
            textDecoration /*  */: css.value.none,
        }),
        ...css.nest([ `&:${Theme.active}`, `&.${Theme.active}` ], {
            background: config.primaryColorDark.rgba,
            borderColor: config.primaryColorDark.darken(0.05).rgba,
            color: config.lightColor.rgba,
            textDecoration: css.value.none,
            ...css.nest(`&.${Theme.loading}`, {
                ...css.nest(`&::after`, {
                    borderBottomColor: config.lightColor.rgba,
                    borderLeftColor: config.lightColor.rgba,
                }),
            }),
        }),
        ...css.nest([ `&[${Theme.disabled}]`, `&:${Theme.disabled}`, `&.${Theme.disabled}` ], {
            cursor: css.value.default,
            opacity: .5,
            pointerEvents: css.value.none,
        }),
        // Button primary
        ...css.nest(`&.${Theme.primary}`, {
            background: config.primaryColor.rgba,
            borderColor: config.primaryColorDark.rgba,
            color: config.lightColor.rgba,
            ...css.nest([ `&:${Theme.focus}`, `&:${Theme.hover}` ], {
                background: config.primaryColorDark.darken(0.02).rgba,
                borderColor: config.primaryColorDark.darken(0.05).rgba,
                color: config.lightColor.rgba,
            }),
            ...css.nest([ `&:${Theme.active}`, `&.${Theme.active}` ], {
                background: config.primaryColorDark.darken(0.04).rgba,
                borderColor: config.primaryColorDark.darken(0.07).rgba,
                color: config.lightColor.rgba,
            }),
            ...css.nest(`&.${Theme.loading}`, {
                ...css.nest(`&::after`, {
                    borderBottomColor: config.lightColor.rgba,
                    borderLeftColor: config.lightColor.rgba,
                }),
            }),
        }),
        // Button Colors
        ...css.nest(`&.${Theme.success}`, buttonVariant(config.successColor)),
        ...css.nest(`&.${Theme.error}`, buttonVariant(config.errorColor)),
        ...css.nest(`&.${Theme.warning}`, buttonVariant(config.warningColor)),
        // Button link
        ...css.nest(`&.${Theme.link}`, {
            background: css.value.transparent,
            borderColor: css.value.transparent,
            color: config.linkColor.rgba,
            ...css.nest([
                `&:${Theme.focus}`,
                `&:${Theme.hover}`,
                `&:${Theme.active}`,
                `&.${Theme.active}`
            ], {
                color: config.linkColorDark.rgba,
            }),
        }),
        // Button Sizes
        ...css.nest(`&.${Theme.small}`, {
            fontSize: rem(config.fontSizeSm),
            height: rem(config.controlSizeSm),
            padding: css.values([
                rem(config.controlPaddingYSm),
                rem(config.controlPaddingXSm)
            ]),
        }),
        ...css.nest(`&.${Theme.large}`, {
            fontSize: rem(config.fontSizeLg),
            height: rem(config.controlSizeLg),
            padding: css.values([
                rem(config.controlPaddingYLg),
                rem(config.controlPaddingXLg)
            ]),
        }),
        // Button block
        ...css.nest(`&.${Theme.block}`, {
            display: css.value.block,
            width: `100%`,
        }),
        // Button action
        ...css.nest(`&.${Theme.action}`, {
            width: rem(config.controlSize),
            paddingLeft: rem(0),
            paddingRight: rem(0),
            ...css.nest(`&.${Theme.small}`, {
                width: rem(config.controlSizeSm),
            }),
            ...css.nest(`&.${Theme.large}`, {
                width: rem(config.controlSizeLg),
            }),
        }),
        // Button clear
        ...css.nest(`&.${Theme.clear}`, {
            background: css.value.transparent,
            border: 0,
            color: `currentColor`,
            height: rem(config.unit4),
            lineHeight: rem(config.unit4),
            marginLeft: rem(config.unit1),
            marginRight: `-2px`,
            opacity: 1,
            padding: rem(0),
            textDecoration: css.value.none,
            width: rem(config.unit4),
            ...css.nest(`&:hover`, {
                opacity: .95,
            }),
            ...css.nest(`&::before`, {
                content: `"\\2715"`,
            }),
        }),
    }),
    ...css.nest(`&.${Theme.ButtonGroup}`,{
        display: css.value.inlineFlex,
        flexWrap: css.value.wrap,
        ...css.nest(`.${Theme.Button}`, {
            flex: css.values(1, 0, css.value.auto),
            ...css.nest(`&:first-child:not(:last-child)`, {
                borderBottomRightRadius: rem(0),
                borderTopRightRadius: rem(0),
            }),
            ...css.nest(`&:not(:first-child):not(:last-child)`, {
                borderRadius: rem(0),
                marginLeft: rem(-config.borderWidth),
            }),
            ...css.nest(`&:last-child:not(:first-child)`, {
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 0,
                marginLeft: rem(-config.borderWidth),
            }),
            ...css.nest(`&:focus, &:hover, &:active, &.active`, {
                zIndex: config.zIndex0,
            }),
        }),
        ...css.nest(`&.${Theme.block}`, {
            display: css.value.flex,
            ...css.nest(`.${Theme.Button}`, {
                flex: css.values(1, 0, 0),
            }),
        }),
    }),
});
