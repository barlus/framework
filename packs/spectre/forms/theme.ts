import {
    $,
    color,
    deg,
    list,
    nest,
    percent,
    px,
    rem,
    rotate,
    stylesheet,
    translate,
    translateY,
    url/*,div,mul,neg,sub,*/
} from "@barlus/styles"
import { appearance } from '../mixins/appearance';
import { controlShadow } from '../mixins/shadow';
import { controlTransition } from '../mixins/transition';

// import { stylesheet, rem } from '@barlus/styles';
// import { config } from '../config';
// import { buttonVariant } from '../mixins/button';
// import { controlShadow } from '../mixins/shadow';
// import { controlTransition } from '../mixins/transition';
export default Theme;
export const enum Theme {
    addonLg = 'addon-lg',
    addonSm = 'addon-sm',
    disabled = 'disabled',
    formCheckbox = 'form-checkbox',
    formGroup = 'form-group',
    formHorizontal = 'form-horizontal',
    formIcon = 'form-icon',
    formInput = 'form-input',
    formInputHint = 'form-input-hint',
    formLabel = 'form-label',
    formRadio = 'form-radio',
    formSelect = 'form-select',
    formSwitch = 'form-switch',
    hasError = 'has-error',
    hasIconLeft = 'has-icon-left',
    hasIconRight = 'has-icon-right',
    hasSuccess = 'has-success',
    inputGroup = 'input-group',
    inputGroupAddon = 'input-group-addon',
    inputGroupBtn = 'input-group-btn',
    inputInline = 'input-inline',
    inputLg = 'input-lg',
    inputSm = 'input-sm',
    isError = 'is-error',
    isSuccess = 'is-success',
    labelLg = 'label-lg',
    labelSm = 'label-sm',
    selectLg = 'select-lg',
    selectSm = 'select-sm',
}
stylesheet('forms.ts')('', {
    ...nest([ `.${Theme.formGroup}` ], {
        ...nest([ `&:not(:last-child)` ], {
            marginBottom: rem($.layoutSpacing),
        }),
    }),
    ...nest([ `fieldset` ], {
        marginBottom: rem($.layoutSpacingLg),
    }),
    ...nest([ `legend` ], {
        fontSize: rem($.fontSizeLg),
        fontWeight: 500,
        marginBottom: rem($.layoutSpacingLg),
    }),
    ...nest([ `.${Theme.formLabel}` ], {
        display: 'block',
        lineHeight: rem($.lineHeight),
        padding: list(rem($.controlPaddingY + $.borderWidth), 0),
        ...nest([ `&.${Theme.labelSm}` ], {
            fontSize: rem($.fontSizeSm),
            padding: list(rem($.controlPaddingYSm + $.borderWidth), 0),
        }),
        ...nest([ `&.${Theme.labelLg}` ], {
            fontSize: rem($.fontSizeLg),
            padding: list(rem($.controlPaddingYLg + $.borderWidth), 0),
        }),
    }),
    ...nest([ `.${Theme.formInput}` ], {
        ...controlTransition(),
        ...appearance('none'),

        background: $.bgColorLight.rgba,
        backgroundImage: 'none',
        border: list(rem($.borderWidth), 'solid', $.borderColorDark.rgba),
        borderRadius: rem($.borderRadius),
        color: $.bodyFontColor.rgba,
        display: 'block',
        fontSize: rem($.fontSize),
        height: rem($.controlSize),
        lineHeight: rem($.lineHeight),
        maxWidth: percent(100),
        outline: 'none',
        padding: list(rem($.controlPaddingY), rem($.controlPaddingX)),
        position: 'relative',
        width: percent(100),
        ...nest([ `&:focus` ], {
            ...controlShadow(),
            borderColor: $.primaryColor.rgba,
        }),
        ...nest([ `&::placeholder` ], {
            color: $.grayColor.rgba,
        }),
        ...nest([ `&.${Theme.inputSm}` ], {
            fontSize: rem($.fontSizeSm),
            height: rem($.controlSizeSm),
            padding: list(rem($.controlPaddingYSm), rem($.controlPaddingXSm)),
        }),
        ...nest([ `&.${Theme.inputLg}` ], {
            fontSize: rem($.fontSizeLg),
            height: rem($.controlSizeLg),
            padding: list(rem($.controlPaddingYLg), rem($.controlPaddingXLg)),
        }),
        ...nest([ `&.${Theme.inputInline}` ], {
            display: 'inline-block',
            verticalAlign: 'middle',
            width: 'auto',
        }),
        ...nest([ `&[type=file]` ], {
            height: 'auto',
        }),
        ...nest([ `&:not(:placeholder-shown)` ], {
            ...nest([ `&:invalid` ], {
                borderColor: $.errorColor.rgba,
                ...nest([ `&:focus` ], {
                    ...controlShadow($.errorColor),
                }),
                ...nest([ `& + .${Theme.formInputHint}` ], {
                    color: $.errorColor.rgba,
                }),
            }),
        }),
        ...nest([ `&[readonly]` ], {
            backgroundColor: $.bgColor.rgba,
        }),
    }),
    ...nest([ `textarea.${Theme.formInput}` ], {
        height: 'auto',
    }),
    ...nest([ `.${Theme.formInputHint}` ], {
        color: $.grayColor.rgba,
        fontSize: rem($.fontSizeSm),
        marginTop: rem($.unit1),
        ...nest([ `.${Theme.hasSuccess} &`, `.${Theme.isSuccess} + &` ], {
            color: $.successColor.rgba,
        }),
        ...nest([ `.${Theme.hasError} &`, `.${Theme.isError} + &` ], {
            color: $.errorColor.rgba,
        }),
    }),
    ...nest([ `.${Theme.formSelect}` ], {
        ...appearance('none'),
        border: list(rem($.borderWidth), 'solid', $.borderColorDark.rgba),
        borderRadius: rem($.borderRadius),
        color: 'inherit',
        fontSize: rem($.fontSize),
        height: rem($.controlSize),
        lineHeight: rem($.lineHeight),
        outline: 'none',
        padding: list(rem($.controlPaddingY), rem($.controlPaddingX)),
        verticalAlign: 'middle',
        width: percent(100),
        ...nest([ `&[size]`, `&[multiple]` ], {
            height: 'auto',
            ...nest([ `option` ], {
                padding: list(rem($.unitH), rem($.unit1)),
            }),
        }),
        ...nest([ `&:not([multiple]):not([size])` ], {
            background: list(color('#fff'), url($.multiSelectIcon), 'no-repeat', 'right', rem(.35), 'center/.4rem', rem(.5)),
            paddingRight: rem($.controlIconSize + $.controlPaddingX),
        }),
        ...nest([ `&:focus` ], {
            ...controlShadow(),
            borderColor: $.primaryColor.rgba,
        }),
        ...nest([ `&::-ms-expand` ], {
            display: 'none',
        }),
        ...nest([ `&.${Theme.selectSm}` ], {
            fontSize: rem($.fontSizeSm),
            height: rem($.controlSizeSm),
            padding: list(rem($.controlPaddingYSm), rem($.controlIconSize + $.controlPaddingXSm), rem($.controlPaddingYSm), rem($.controlPaddingXSm)),
        }),
        ...nest([ `&.${Theme.selectLg}` ], {
            fontSize: rem($.fontSizeLg),
            height: rem($.controlSizeLg),
            padding: list(rem($.controlPaddingYLg), rem($.controlIconSize + $.controlPaddingXLg), rem($.controlPaddingYLg), rem($.controlPaddingXLg)),
        }),
    }),
    ...nest([ `.${Theme.hasIconLeft}`, `.${Theme.hasIconRight}` ], {
        position: 'relative',
        ...nest([ `.${Theme.formIcon}` ], {
            height: rem($.controlIconSize),
            margin: list(0, rem($.controlPaddingY)),
            position: 'absolute',
            top: percent(50),
            transform: translateY(percent(-50)),
            width: rem($.controlIconSize),
            zIndex: $.zIndex0 + 1,
        }),
    }),
    ...nest([ `.${Theme.hasIconLeft}` ], {
        ...nest([ `.${Theme.formIcon}` ], {
            left: rem($.borderWidth),
        }),
        ...nest([ `.${Theme.formInput}` ], {
            paddingLeft: rem($.controlIconSize + $.controlPaddingY * 2),
        }),
    }),
    ...nest([ `.${Theme.hasIconRight}` ], {
        ...nest([ `.${Theme.formIcon}` ], {
            right: rem($.borderWidth),
        }),
        ...nest([ `.${Theme.formInput}` ], {
            paddingRight: rem($.controlIconSize + $.controlPaddingY * 2),
        }),
    }),
    ...nest([ `.${Theme.formCheckbox}`, `.${Theme.formRadio}`, `.${Theme.formSwitch}` ], {
        display: 'inline-block',
        lineHeight: rem($.lineHeight),
        margin: list(rem(($.controlSize - $.controlSizeSm) / 2), 0),
        minHeight: rem(1.2),
        padding: list(
            rem(($.controlSizeSm - $.lineHeight) / 2),
            rem($.controlPaddingX),
            rem(($.controlSizeSm - $.lineHeight) / 2),
            rem($.controlIconSize + $.controlPaddingX)
        ),
        position: 'relative',
        ...nest([ `input` ], {
            clip: 'rect(0,0,0,0)',
            height: px(1),
            margin: px(-1),
            overflow: 'hidden',
            position: 'absolute',
            width: px(1),
            ...nest([ `&:focus + .${Theme.formIcon}` ], {
                ...controlShadow(),
                borderColor: $.primaryColor.rgba,
            }),
            ...nest([ `&:checked + .${Theme.formIcon}` ], {
                backgroundColor: $.primaryColor.rgba,
                borderColor: $.primaryColor.rgba,
            }),
        }),
        ...nest([ `.${Theme.formIcon}` ], {
            ...controlTransition(),
            border: list(rem($.borderWidth), 'solid', $.borderColorDark.rgba),
            cursor: 'pointer',
            display: 'inline-block',
            position: 'absolute',
        }),
        ...nest([ `&.${Theme.inputSm}` ], {
            fontSize: rem($.fontSizeSm),
            margin: 0,
        }),
        ...nest([ `&.${Theme.inputLg}` ], {
            fontSize: rem($.fontSizeLg),
            margin: list(rem(($.controlSizeLg - $.controlSizeSm) / 2), 0),
        }),
        ...nest([ `.${Theme.hasError} &`, `&.${Theme.isError}` ], {
            ...nest([ `.${Theme.formIcon}` ], {
                borderColor: $.errorColor.rgba,
            }),
            ...nest([ `input` ], {
                ...nest([ `&:checked + .${Theme.formIcon}` ], {
                    background: $.errorColor.rgba,
                    borderColor: $.errorColor.rgba,
                }),
                ...nest([ `&:focus + .${Theme.formIcon}` ], {
                    ...controlShadow($.errorColor),
                    borderColor: $.errorColor.rgba,
                }),
            }),
        }),
    }),
    ...nest([ `.${Theme.formCheckbox}`, `.${Theme.formRadio}` ], {
        ...nest([ `.${Theme.formIcon}` ], {
            background: $.bgColorLight.rgba,
            height: rem($.controlIconSize),
            left: 0,
            top: rem(($.controlSizeSm - $.controlIconSize) / 2),
            width: rem($.controlIconSize),
        }),
        ...nest([ `input` ], {
            ...nest([ `&:active + .${Theme.formIcon}` ], {
                background: $.bgColorDark.rgba,
            }),
        }),
    }),
    ...nest([ `.${Theme.formCheckbox}` ], {
        ...nest([ `.${Theme.formIcon}` ], {
            borderRadius: rem($.borderRadius),
        }),
        ...nest([ `input` ], {
            ...nest([ `&:checked + .${Theme.formIcon}` ], {
                ...nest([ `&::before` ], {
                    backgroundClip: 'padding-box',
                    border: list(rem($.borderWidthLg), 'solid', $.lightColor.rgba),
                    borderLeftWidth: 0,
                    borderTopWidth: 0,
                    content: "\"\"",
                    height: px(12),
                    left: percent(50),
                    marginLeft: px(-4),
                    marginTop: px(-8),
                    position: 'absolute',
                    top: percent(50),
                    transform: rotate(deg(45)),
                    width: px(8),
                }),
            }),
            ...nest([ `&:indeterminate + .${Theme.formIcon}` ], {
                background: $.primaryColor.rgba,
                borderColor: $.primaryColor.rgba,
                ...nest([ `&::before` ], {
                    background: $.bgColorLight.rgba,
                    content: "\"\"",
                    height: px(2),
                    left: percent(50),
                    marginLeft: px(-5),
                    marginTop: px(-1),
                    position: 'absolute',
                    top: percent(50),
                    width: px(10),
                }),
            }),
        }),
    }),
    ...nest([ `.${Theme.formRadio}` ], {
        ...nest([ `.${Theme.formIcon}` ], {
            borderRadius: percent(50),
        }),
        ...nest([ `input` ], {
            ...nest([ `&:checked + .${Theme.formIcon}` ], {
                ...nest([ `&::before` ], {
                    background: $.bgColorLight.rgba,
                    borderRadius: percent(50),
                    content: "\"\"",
                    height: px(4),
                    left: percent(50),
                    position: 'absolute',
                    top: percent(50),
                    transform: translate(percent(-50), percent(-50)),
                    width: px(4),
                }),
            }),
        }),
    }),
    ...nest([ `.${Theme.formSwitch}` ], {
        paddingLeft: rem($.unit8 + $.controlPaddingX),
        ...nest([ `.${Theme.formIcon}` ], {
            background: $.grayColorLight.rgba,
            backgroundClip: 'padding-box',
            borderRadius: rem($.unit2 + $.borderWidth),
            height: rem($.unit4 + ($.borderWidth * 2)),
            left: 0,
            top: rem((($.controlSizeSm - $.unit4) / 2) - $.borderWidth),
            width: rem($.unit8),
            ...nest([ `&::before` ], {
                ...controlTransition(),
                background: $.bgColorLight.rgba,
                borderRadius: percent(50),
                content: "\"\"",
                display: 'block',
                height: rem($.unit4),
                left: 0,
                position: 'absolute',
                top: 0,
                width: rem($.unit4),
            }),
        }),
        ...nest([ `input` ], {
            ...nest([ `&:checked + .${Theme.formIcon}` ], {
                ...nest([ `&::before` ], {
                    left: px(14),
                }),
            }),
            ...nest([ `&:active + .${Theme.formIcon}` ], {
                ...nest([ `&::before` ], {
                    background: $.bgColor.rgba,
                }),
            }),
            ...nest([ `&:disabled`, `&.${Theme.disabled}` ], {
                ...nest([ `& + .${Theme.formIcon}::before` ], {
                    background: $.bgColorLight.rgba,
                }),
            }),
        }),
    }),
    ...nest([ `.${Theme.inputGroup}` ], {
        display: 'flex',
        ...nest([ `.${Theme.inputGroupAddon}` ], {
            background: $.bgColor.rgba,
            border: list(rem($.borderWidth), 'solid', $.borderColorDark.rgba),
            borderRadius: rem($.borderRadius),
            lineHeight: rem($.lineHeight),
            padding: list(rem($.controlPaddingY), rem($.controlPaddingX)),
            whiteSpace: 'nowrap',
            ...nest([ `&.${Theme.addonSm}` ], {
                fontSize: rem($.fontSizeSm),
                padding: list(rem($.controlPaddingYSm), rem($.controlPaddingXSm)),
            }),
            ...nest([ `&.${Theme.addonLg}` ], {
                fontSize: rem($.fontSizeLg),
                padding: list(rem($.controlPaddingYLg), rem($.controlPaddingXLg)),
            }),
        }),
        ...nest([ `.${Theme.formInput}`, `.${Theme.formSelect}` ], {
            flex: `1 1 auto`,
        }),
        ...nest([ `.${Theme.inputGroupBtn}` ], {
            zIndex: $.zIndex0,
        }),
        ...nest([ `.${Theme.formInput}`, `.${Theme.formSelect}`, `.${Theme.inputGroupAddon}`, `.${Theme.inputGroupBtn}` ], {
            ...nest([ `&:first-child:not(:last-child)` ], {
                borderBottomRightRadius: 0,
                borderTopRightRadius: 0,
            }),
            ...nest([ `&:not(:first-child):not(:last-child)` ], {
                borderRadius: 0,
                marginLeft: rem(-$.borderWidth),
            }),
            ...nest([ `&:last-child:not(:first-child)` ], {
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 0,
                marginLeft: rem(-$.borderWidth),
            }),
            ...nest([ `&:focus` ], {
                zIndex: $.zIndex0 + 1,
            }),
        }),
        ...nest([ `.${Theme.formSelect}` ], {
            width: 'auto',
        }),
        ...nest([ `&.${Theme.inputInline}` ], {
            display: 'inline-flex',
        }),
    }),
    ...nest([ `.${Theme.formInput}`, `.${Theme.formSelect}` ], {
        ...nest([ `.${Theme.hasSuccess} &`, `&.${Theme.isSuccess}` ], {
            borderColor: $.successColor.rgba,
            ...nest([ `&:focus` ], {
                ...controlShadow($.successColor),
            }),
        }),
        ...nest([ `.${Theme.hasError} &`, `&.${Theme.isError}` ], {
            borderColor: $.errorColor.rgba,
            ...nest([ `&:focus` ], {
                ...controlShadow($.errorColor),
            }),
        }),
        ...nest([ `&:disabled`, `&.${Theme.disabled}` ], {
            backgroundColor: $.bgColorDark.rgba,
            cursor: 'not-allowed',
            opacity: .5,
        }),
    }),
    ...nest([ `input` ], {
        ...nest([ `&:disabled`, `&.${Theme.disabled}` ], {
            ...nest([ `& + .${Theme.formIcon}` ], {
                background: $.bgColorDark.rgba,
                cursor: 'not-allowed',
                opacity: .5,
            }),
        }),
    }),
    ...nest([ `.${Theme.formHorizontal}` ], {
        padding: list(rem($.layoutSpacing), 0),
        ...nest([ `.${Theme.formGroup}` ], {
            display: 'flex',
            flexWrap: 'wrap',
        }),
    }),
});
