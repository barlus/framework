import { $, list, nest, rem, stylesheet } from "@barlus/styles"

export default Theme;
export const enum Theme {
    navbar='navbar',
    navbarBrand='navbar-brand',
    navbarCenter='navbar-center',
    navbarSection='navbar-section',
}

stylesheet('navbar.ts')('',{
    ...nest([`.${Theme.navbar}`],{
        alignItems:'stretch',
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'space-between',
        ...nest([`.${Theme.navbarSection}`],{
            alignItems:'center',
            display:'flex',
            flex:'1 0 0',
            ...nest([`&:not(:first-child):last-child`],{
                justifyContent:'flex-end',
            }),
        }),
        ...nest([`.${Theme.navbarCenter}`],{
            alignItems:'center',
            display:'flex',
            flex:'0 0 auto',
        }),
        ...nest([`.${Theme.navbarBrand}`],{
            fontSize:rem($.fontSizeLg),
            fontWeight:500,
            textDecoration:'none',
        }),
    }),
});
