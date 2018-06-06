// TODO
// import {$,list,nest,percent,px,stylesheet} from "@barlus/styles"
// export default Theme;
// export const enum Theme {
//     iconLg='icon-lg',
//     timeline='timeline',
//     timelineContent='timeline-content',
//     timelineIcon='timeline-icon',
//     timelineItem='timeline-item',
//     timelineLeft='timeline-left',
// }
//
// stylesheet('timelines.ts')('',{
//     ...nest([`.${Theme.timeline}`],{
//         ...nest([`.${Theme.timelineItem}`],{
//             display:'flex',
//             marginBottom:$.unit6,
//             position:'relative',
//             ...nest([`&::before`],{
//                 background:$.borderColor,
//                 content:"",
//                 height:percent(100),
//                 left:px(11),
//                 position:'absolute',
//                 top:$.unit6,
//                 width:px(2),
//             }),
//             ...nest([`.${Theme.timelineLeft}`],{
//                 flex:list(0,0,'auto'),
//             }),
//             ...nest([`.${Theme.timelineContent}`],{
//                 flex:list(1,1,'auto'),
//                 padding:list(px(2),0,px(2),$.layoutSpacingLg),
//             }),
//             ...nest([`.${Theme.timelineIcon}`],{
//                 borderRadius:percent(50),
//                 color:$.lightColor,
//                 display:'block',
//                 height:$.unit6,
//                 textAlign:'center',
//                 width:$.unit6,
//                 ...nest([`&::before`],{
//                     border:list($.borderWidthLg,'solid',$.primaryColor),
//                     borderRadius:percent(50),
//                     content:"",
//                     display:'block',
//                     height:$.unit2,
//                     left:$.unit2,
//                     position:'absolute',
//                     top:$.unit2,
//                     width:$.unit2,
//                 }),
//                 ...nest([`&.${Theme.iconLg}`],{
//                     background:$.primaryColor,
//                     lineHeight:$.lineHeight,
//                     ...nest([`&::before`],{
//                         content:'none',
//                     }),
//                 }),
//             }),
//         }),
//     }),
// });


import { cssRule } from '@barlus/styles';

cssRule('.timeline .timeline-item', {
    "display": [
        "flex",
        "-ms-flexbox"
    ],
    "marginBottom": "1.2rem",
    "position": "relative"
});
cssRule('.timeline .timeline-item::before', {
    "background": "#e7e9ed",
    "content": "\"\"",
    "height": "100%",
    "left": "11px",
    "position": "absolute",
    "top": "1.2rem",
    "width": "2px"
});
cssRule('.timeline .timeline-item .timeline-left', {
    "-ms-flex": "0 0 auto",
    "flex": "0 0 auto"
});
cssRule('.timeline .timeline-item .timeline-content', {
    "-ms-flex": "1 1 auto",
    "flex": "1 1 auto",
    "padding": "2px 0 2px .8rem"
});
cssRule('.timeline .timeline-item .timeline-icon', {
    "borderRadius": "50%",
    "color": "#fff",
    "display": "block",
    "height": "1.2rem",
    "textAlign": "center",
    "width": "1.2rem"
});
cssRule('.timeline .timeline-item .timeline-icon::before', {
    "border": ".1rem solid #5755d9",
    "borderRadius": "50%",
    "content": "\"\"",
    "display": "block",
    "height": ".4rem",
    "left": ".4rem",
    "position": "absolute",
    "top": ".4rem",
    "width": ".4rem"
});
cssRule('.timeline .timeline-item .timeline-icon.icon-lg', {
    "background": "#5755d9",
    "lineHeight": "1rem"
});
cssRule('.timeline .timeline-item .timeline-icon.icon-lg::before', {
    "content": "none"
});