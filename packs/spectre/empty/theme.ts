import { $, list, nest, rem, stylesheet } from "@barlus/styles"

export default Theme;
export const enum Theme {
    empty='empty',
    emptyAction='empty-action',
    emptyIcon='empty-icon',
    emptySubtitle='empty-subtitle',
    emptyTitle='empty-title',
}

stylesheet('empty.ts')('',{
    ...nest([`.${Theme.empty}`],{
        background:$.bgColor.rgba,
        borderRadius:rem($.borderRadius),
        color:$.grayColorDark.rgba,
        textAlign:'center',
        padding:list(rem($.unit16),rem($.unit8)),
        ...nest([`.${Theme.emptyIcon}`],{
            marginBottom:rem($.layoutSpacingLg),
        }),
        ...nest([`.${Theme.emptyTitle}`,`.${Theme.emptySubtitle}`],{
            margin:list(rem($.layoutSpacing),'auto'),
        }),
        ...nest([`.${Theme.emptyAction}`],{
            marginTop:rem($.layoutSpacingLg),
        }),
    }),
});