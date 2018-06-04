import { $, list, nest, rem, stylesheet } from "@barlus/styles"

export default Theme;
export const enum Theme {
    panel='panel',
    panelBody='panel-body',
    panelFooter='panel-footer',
    panelHeader='panel-header',
    panelNav='panel-nav',
    panelTitle='panel-subtitle',
    panelSubtitle='panel-subtitle',
}

stylesheet('panels.css')('',{
    ...nest([`.${Theme.panel}`],{
        border:list(rem($.borderWidth),'solid',$.borderColor.rgba),
        borderRadius:rem($.borderRadius),
        display:'flex',
        flexDirection:'column',
        ...nest([`.${Theme.panelHeader}`,`.${Theme.panelFooter}`],{
            flex:'0 0 auto',
            padding:rem($.layoutSpacingLg),
        }),
        ...nest([`.${Theme.panelNav}`],{
            flex:'0 0 auto',
        }),
        ...nest([`.${Theme.panelBody}`],{
            flex:'1 1 auto',
            overflowY:'auto',
            padding:list(0,rem($.layoutSpacingLg)),
        }),
    }),
});
