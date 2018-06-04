import {$,nest,rem,stylesheet} from "@barlus/styles"
import { labelBase, labelVariant } from '../mixins/label';

export default Theme;
export const enum Theme {
    label='label',
    labelError='label-error',
    labelPrimary='label-primary',
    labelRounded='label-rounded',
    labelSecondary='label-secondary',
    labelSuccess='label-success',
    labelWarning='label-warning',
}

stylesheet('/Users/Sergey/Work/EXP/spectre/scss/_labels.ts')('',{
    ...nest([`.${Theme.label}`],{
        ...labelBase(),
        ...labelVariant($.bodyFontColor.lighten(0.05),$.bgColorDark),
        display:'inline-block',
        ...nest([`&.${Theme.labelRounded}`],{
            borderRadius:rem(5),
            paddingLeft:rem(.4),
            paddingRight:rem(.4),
        }),
        ...nest([`&.${Theme.labelPrimary}`],{
            ...labelVariant($.lightColor,$.primaryColor),
        }),
        ...nest([`&.${Theme.labelSecondary}`],{
            ...labelVariant($.primaryColor,$.secondaryColor),
        }),
        ...nest([`&.${Theme.labelSuccess}`],{
            ...labelVariant($.lightColor,$.successColor),
        }),
        ...nest([`&.${Theme.labelWarning}`],{
            ...labelVariant($.lightColor,$.warningColor),
        }),
        ...nest([`&.${Theme.labelError}`],{
            ...labelVariant($.lightColor,$.errorColor),
        }),
    }),
});