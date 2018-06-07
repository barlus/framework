import {$,nest,percent,stylesheet,rem} from "@barlus/styles"

export default Theme;
export const enum Theme {
    meter='meter',
}

stylesheet('meters.ts')('',{
    ...nest([`.${Theme.meter}`],{
        appearance:'none',
        background:$.bgColor.rgba,
        border:0,
        borderRadius:rem($.borderRadius),
        display:'block',
        width:percent(100),
        height:rem($.unit4),
        ...nest([`&::-webkit-meter-inner-element`],{
            display:'block',
        }),
        ...nest([`&::-webkit-meter-bar`,`&::-webkit-meter-optimum-value`,`&::-webkit-meter-suboptimum-value`,`&::-webkit-meter-even-less-good-value`],{
            borderRadius:rem($.borderRadius),
        }),
        ...nest([`&::-webkit-meter-bar`],{
            background:$.bgColor.rgba,
        }),
        ...nest([`&::-webkit-meter-optimum-value`],{
            background:$.successColor.rgba,
        }),
        ...nest([`&::-webkit-meter-suboptimum-value`],{
            background:$.warningColor.rgba,
        }),
        ...nest([`&::-webkit-meter-even-less-good-value`],{
            background:$.errorColor.rgba,
        }),
    }),
});
