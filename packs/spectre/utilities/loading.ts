import { $, list, nest, percent, rem, stylesheet } from "@barlus/styles"


export default Theme;
export const enum Theme {
    loading='loading',
    loadingLg='loading-lg',
}

stylesheet('loading.ts')('',{
    ...nest([`.${Theme.loading}`],{
        color:'transparent',
        minHeight:rem($.unit4),
        pointerEvents:'none',
        position:'relative',
        ...nest([`&::after`],{
            animation:list('loading','500ms','infinite','linear'),
            border:list(rem($.borderWidthLg),'solid',$.primaryColor.rgba),
            borderRadius:percent(50),
            borderRightColor:'transparent',
            borderTopColor:'transparent',
            content:"\"\"",
            display:'block',
            height:rem($.unit4),
            left:percent(50),
            marginLeft:rem(-$.unit2),
            marginTop:rem(-$.unit2),
            position:'absolute',
            top:percent(50),
            width:rem($.unit4),
            zIndex:$.zIndex0,
        }),
        ...nest([`&.${Theme.loadingLg}`],{
            minHeight:rem($.unit10),
            ...nest([`&::after`],{
                height:rem($.unit8),
                marginLeft:rem(-$.unit4),
                marginTop:rem(-$.unit4),
                width:rem($.unit8),
            }),
        }),
    }),
});

