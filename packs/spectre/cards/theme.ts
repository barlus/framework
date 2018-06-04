import { $, list, nest, rem, stylesheet } from "@barlus/styles"

export default Theme;
export const enum Theme {
    cardTitle = "card-title",
    cardSubtitle = "card-subtitle",
    card='card',
    cardBody='card-body',
    cardFooter='card-footer',
    cardHeader='card-header',
    cardImage='card-image',
    h1 = "h1",
    h2 = "h2",
    h3 = "h3",
    h4 = "h4",
    h5 = "h5",
    h6 = "h6",
}

stylesheet('cards.css')('',{
    ...nest([`.${Theme.card}`],{
        background:$.bgColorLight.rgba,
        border:list(rem($.borderWidth),'solid',$.borderColor.rgba),
        borderRadius:rem($.borderRadius),
        display:'flex',
        flexDirection:'column',
        ...nest([`.${Theme.cardHeader}`,`.${Theme.cardBody}`,`.${Theme.cardFooter}`],{
            padding:rem($.layoutSpacingLg),
            paddingBottom:0,
            ...nest([`&:last-child`],{
                paddingBottom:rem($.layoutSpacingLg),
            }),
        }),
        ...nest([`.${Theme.cardImage}`],{
            paddingTop:rem($.layoutSpacingLg),
            ...nest([`&:first-child`],{
                paddingTop:0,
                ...nest([`img`],{
                    borderTopLeftRadius:rem($.borderRadius),
                    borderTopRightRadius:rem($.borderRadius),
                }),
            }),
            ...nest([`&:last-child`],{
                ...nest([`img`],{
                    borderBottomLeftRadius:rem($.borderRadius),
                    borderBottomRightRadius:rem($.borderRadius),
                }),
            }),
        }),
    }),
});
