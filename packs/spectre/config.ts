import { $, color, Settings } from '@barlus/styles';

declare module '@barlus/styles' {
    interface Settings extends Config {
    }
}

export class Config {
    // Core variables
    version = "0.5.1";

    // Core features
    rtl = false;

    // Core colors
    primaryColor = color('#5755d9');
    primaryColorDark = this.primaryColor.darken(0.03);
    primaryColorLight = this.primaryColor.lighten(0.03);
    secondaryColor = this.primaryColor.lighten(0.375);
    secondaryColorDark = this.secondaryColor.darken(0.03);
    secondaryColorLight = this.secondaryColor.lighten(0.03);

    // Gray colors
    darkColor = color('#454d5d');
    lightColor = color('#fff');
    grayColor = this.darkColor.lighten(0.40);
    grayColorDark = this.grayColor.darken(0.25);
    grayColorLight = this.grayColor.lighten(0.20);

    borderColor = this.darkColor.lighten(0.60);
    borderColorDark = this.borderColor.darken(0.10);
    bgColor = this.darkColor.lighten(0.66);
    bgColorDark = this.bgColor.darken(0.03);
    bgColorLight = this.lightColor;

    // Control colors
    successColor = color('#32b643');
    warningColor = color('#ffb700');
    errorColor = color('#e85600');

    // Other colors
    codeColor = color('#e06870');
    highlightColor = color('#ffe9b3');
    bodyBg = this.bgColorLight;
    bodyFontColor = this.darkColor.lighten(0.05);
    linkColor = this.primaryColor;
    linkColorDark = this.linkColor.darken(0.05);

    // Fonts
    // Credit: https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/
    baseFontFamily = '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto';
    monoFontFamily = '"SF Mono", "Segoe UI Mono", "Roboto Mono", Menlo, Courier, monospace';
    fallbackFontFamily = '"Helvetica Neue", sans-serif';
    cjkZhFontFamily = `${this.baseFontFamily}, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", ${this.fallbackFontFamily}`;
    cjkJpFontFamily = `${this.baseFontFamily}, "Hiragino Sans", "Hiragino Kaku Gothic Pro", "Yu Gothic", YuGothic, Meiryo, $fallbackFontFamily`;
    cjkKoFontFamily = `${this.baseFontFamily}, "Malgun Gothic", $fallbackFontFamily`;
    bodyFontFamily = `${this.baseFontFamily}, ${this.fallbackFontFamily}`;

    // Unit sizes
    unitO  /*   */ = 0.05; // rem
    unitH  /*   */ = 0.10; // rem
    unit1  /*   */ = 0.20; // rem
    unit2  /*   */ = 0.40; // rem
    unit3  /*   */ = 0.60; // rem
    unit4  /*   */ = 0.80; // rem
    unit5  /*   */ = 1.00; // rem
    unit6  /*   */ = 1.20; // rem
    unit7  /*   */ = 1.40; // rem
    unit8  /*   */ = 1.60; // rem
    unit9  /*   */ = 1.80; // rem
    unit10 /*   */ = 2.00; // rem
    unit12 /*   */ = 2.40; // rem
    unit16 /*   */ = 3.20; // rem

    // Font sizes
    htmlFontSize /*     */ = 20; // px
    htmlLineHeight /*   */ = 1.5; // ?
    fontSize /*         */ = 0.8; // rem
    fontSizeSm /*       */ = 0.7; // rem
    fontSizeLg /*       */ = 0.9; // rem
    lineHeight /*       */ = 1.0; // rem

    // Sizes
    layoutSpacing /*       */ = this.unit2; // rem
    layoutSpacingSm /*     */ = this.unit1; // rem
    layoutSpacingLg /*     */ = this.unit4; // rem
    borderRadius /*        */ = this.unitH; // rem
    borderWidth /*         */ = this.unitO; // rem
    borderWidthLg /*       */ = this.unitH; // rem
    controlSize /*         */ = this.unit9; // rem
    controlSizeSm /*       */ = this.unit7; // rem
    controlSizeLg /*       */ = this.unit10; // rem
    controlPaddingX /*     */ = this.unit2; // rem
    controlPaddingXSm /*   */ = this.unit2 * 0.75; // rem
    controlPaddingXLg /*   */ = this.unit2 * 1.50; // rem
    controlPaddingY /*     */ = (this.controlSize - this.lineHeight) / 2 - this.borderWidth; // rem
    controlPaddingYSm /*   */ = (this.controlSizeSm - this.lineHeight) / 2 - this.borderWidth; // rem
    controlPaddingYLg /*   */ = (this.controlSizeLg - this.lineHeight) / 2 - this.borderWidth; // rem
    controlIconSize /*     */ = 0.80; // rem

    controlWidthXs = 180;   // px
    controlWidthSm = 320;   // px
    controlWidthMd = 640;   // px
    controlWidthLg = 960;   // px
    controlWidthXl = 1280;  // px

    // Responsive breakpoints
    sizeXs = 480;   // px
    sizeSm = 600;   // px
    sizeMd = 840;   // px
    sizeLg = 960;   // px
    sizeXl = 1280;  // px
    size2x = 1440;  // px

    responsiveBreakpoint = this.sizeXs;

    // Z-index
    zIndex0 = 1;
    zIndex1 = 100;
    zIndex2 = 200;
    zIndex3 = 300;
    zIndex4 = 400;
    multiSelectIcon = '"data:image/svg+xml;charset=utf8,%3Csvg%20xmlns=\'http://www.w3.org/2000/svg\'%20viewBox=\'0%200%204%205\'%3E%3Cpath%20fill=\'%23667189\'%20d=\'M2%200L0%202h4zm0%205L0%203h4z\'/%3E%3C/svg%3E"'
}

export const config = Object.assign($,new Config());