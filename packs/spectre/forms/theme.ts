import { stylesheet, rem, css } from '@barlus/styles';
import { config } from '../config';
import { buttonVariant } from '../mixins/button';
import { controlShadow } from '../mixins/shadow';
import { controlTransition } from '../mixins/transition';

export const enum Theme {
    FormGroup = 'form-group',
    horizontal = 'form-horizontal',

    label = 'form-label',
    input = 'form-input',
    inputInline = 'input-inline',
    select = 'form-select',
    radio = 'form-radio',
    checkbox = 'form-checkbox',
    switch = 'form-switch',
    inputGroup = "input-group",
    inputGroupAddon = "input-group-addon",
    inputGroupButton = "input-group-btn",
    hint = "form-input-hint",
    icon = 'form-icon',

    inputSm ='input-sm',
    inputLg ='input-lg',
    selectSm ='select-sm',
    selectLg ='select-lg',
    labelSm ='label-sm',
    labelLg ='label-lg',
    addonSm = 'addon-sm',
    addonLg = 'addon-Lg',
    iconLeft= 'has-icon-left',
    iconRight= 'has-icon-right',

    success= 'is-success',
    error= 'is-error',
    hasError = 'has-error',
    hasSuccess= 'has-success',
    //

}
