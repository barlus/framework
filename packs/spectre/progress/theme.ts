import {$,linearGradient,list,nest,percent,s,stylesheet,rem} from "@barlus/styles"
import {appearance} from "../mixins/appearance";

export default Theme;
export const enum Theme {
    progress='progress',
}

stylesheet('/Users/Sergey/Work/EXP/spectre/scss/_progress.ts')('',{
    ...nest([`.${Theme.progress}`],{
        ...appearance('none'),
        background:$.bgColorDark.rgba,
        border:0,
        borderRadius:rem($.borderRadius),
        color:$.primaryColor.rgba,
        height:rem($.unit1),
        position:'relative',
        width:percent(100),
        ...nest([`&::-webkit-progress-bar`],{
            background:'transparent',
            borderRadius:rem($.borderRadius),
        }),
        ...nest([`&::-webkit-progress-value`],{
            background:$.primaryColor.rgba,
            borderRadius:rem($.borderRadius),
        }),
        ...nest([`&:indeterminate`],{
            animation:list('progress-indeterminate',s(1.5),'linear','infinite'),
            background:`${$.bgColorDark.rgba} linear-gradient(to right,${$.primaryColor} 30%,${$.bgColorDark} 30%) top left/150% 150% no-repeat`,
            ...nest([`&::-moz-progress-bar`],{
                background:'transparent',
            }),
        }),
    }),
});