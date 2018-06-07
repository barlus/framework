import {$,em,list,nest,rem,stylesheet} from "@barlus/styles"
import { taglBase, taglVariant } from '../mixins/tag';

export default Theme;
export const enum Theme {
    h1='h1',
    h2='h2',
    h3='h3',
    h4='h4',
    h5='h5',
    h6='h6',
}


stylesheet('typography.ts')('',{
    ...nest(['code'],{
        background: "#fdf4f4",
        borderRadius: ".1rem",
        color: "#e06870",
        fontSize: "85%",
        lineHeight: 1.2,
        padding: ".1rem .15rem"
    }),
    ...nest([`h1`,`h2`,`h3`,`h4`,`h5`,`h6`],{
        color:'inherit',
        fontWeight:500,
        lineHeight:1.2,
        marginBottom:em(.5),
        marginTop:0,
    }),
    ...nest([`.${Theme.h1}`,`.${Theme.h2}`,`.${Theme.h3}`,`.${Theme.h4}`,`.${Theme.h5}`,`.${Theme.h6}`],{
        fontWeight:500,
    }),
    ...nest([`h1`,`.${Theme.h1}`],{
        fontSize:rem(2),
    }),
    ...nest([`h2`,`.${Theme.h2}`],{
        fontSize:rem(1.6),
    }),
    ...nest([`h3`,`.${Theme.h3}`],{
        fontSize:rem(1.4),
    }),
    ...nest([`h4`,`.${Theme.h4}`],{
        fontSize:rem(1.2),
    }),
    ...nest([`h5`,`.${Theme.h5}`],{
        fontSize:rem(1),
    }),
    ...nest([`h6`,`.${Theme.h6}`],{
        fontSize:rem(.8),
    }),
    ...nest([`p`],{
        margin:list(0,0,rem($.lineHeight)),
    }),
    ...nest([`a`,`ins`,`u`],{
        textDecorationSkip:list('ink','edges'),
    }),
    ...nest([`abbr[title]`],{
        borderBottom:list(rem($.borderWidth),'dotted'),
        cursor:'help',
        textDecoration:'none',
    }),
    ...nest([`kbd`],{
        ...taglBase(),
        ...taglVariant($.lightColor,$.darkColor),
        fontSize:rem($.fontSizeSm),
    }),
    ...nest([`mark`],{
        ...taglVariant($.bodyFontColor,$.highlightColor),
        borderRadius:rem($.borderRadius),
        padding:rem(.05),
    }),
    ...nest([`blockquote`],{
        borderLeft:list(rem($.borderWidthLg),'solid',$.borderColor.rgba),
        marginLeft:0,
        padding:list(rem($.unit2),rem($.unit4)),
        ...nest([`p:last-child`],{
            marginBottom:0,
        }),
    }),
    ...nest([`ul`,`ol`],{
        margin:list(rem($.unit4),0,rem($.unit4),rem($.unit4)),
        padding:0,
        ...nest([`ul`,`ol`],{
            margin:list(rem($.unit4),0,rem($.unit4),rem($.unit4)),
        }),
        ...nest([`li`],{
            marginTop:rem($.unit2),
        }),
    }),
    ...nest([`ul`],{
        listStyle:list('disc','inside'),
        ...nest([`ul`],{
            listStyleType:'circle',
        }),
    }),
    ...nest([`ol`],{
        listStyle:list('decimal','inside'),
        ...nest([`ol`],{
            listStyleType:'lower-alpha',
        }),
    }),
    ...nest([`dl`],{
        ...nest([`dt`],{
            fontWeight:'bold',
        }),
        ...nest([`dd`],{
            margin:list(rem($.unit2),0,rem($.unit4),0),
        }),
    }),
});
