import {$, stylesheet}                    from "@barlus/styles"
import {bgColorVariant, textColorVariant} from '../mixins/color';


export default Theme;
export const enum Theme {
  textPrimary = "text-primary",
  textSecondary = "text-secondary",
  textGray = "text-gray",
  textLight = "text-light",
  textSuccess = "text-success",
  textWarning = "text-warning",
  textError = "text-error",
  bgPrimary = "bg-primary",
  bgSecondary = "bg-secondary",
  bgDark = "bg-dark",
  bgGray = "bg-gray",
  bgSuccess = "bg-success",
  bgWarning = "bg-warning",
  bgError = "bg-error",
}

stylesheet('colors.ts')('', {
  ...textColorVariant(`.${Theme.textPrimary}`, $.primaryColor),
  ...textColorVariant(`.${Theme.textSecondary}`, $.secondaryColorDark),
  ...textColorVariant(`.${Theme.textGray}`, $.grayColor),
  ...textColorVariant(`.${Theme.textLight}`, $.lightColor),
  ...textColorVariant(`.${Theme.textSuccess}`, $.successColor),
  ...textColorVariant(`.${Theme.textWarning}`, $.warningColor),
  ...textColorVariant(`.${Theme.textError}`, $.errorColor),
  ...bgColorVariant(`.${Theme.bgPrimary}`, $.primaryColor),
  ...bgColorVariant(`.${Theme.bgSecondary}`, $.secondaryColor),
  ...bgColorVariant(`.${Theme.bgDark}`, $.darkColor),
  ...bgColorVariant(`.${Theme.bgGray}`, $.bgColor),
  ...bgColorVariant(`.${Theme.bgSuccess}`, $.successColor),
  ...bgColorVariant(`.${Theme.bgWarning}`, $.warningColor),
  ...bgColorVariant(`.${Theme.bgError}`, $.errorColor),
});
