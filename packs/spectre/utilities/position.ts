import {$,nest,stylesheet} from "@barlus/styles"
import { clearfix } from '../mixins/clearfix';
import { paddingVariant,marginVariant } from '../mixins/position';

export default Theme;
export const enum Theme {
    absolute='absolute',
    centered='centered',
    clearfix='clearfix',
    fixed='fixed',
    flexCentered='flex-centered',
    floatLeft='float-left',
    floatRight='float-right',
    relative='relative',
}

stylesheet('position.ts')('',{
    ...nest([`.${Theme.clearfix}`],{
        ...clearfix(),
    }),
    ...nest([`.${Theme.floatLeft}`],{
        float:'left',
    }),
    ...nest([`.${Theme.floatRight}`],{
        float:'right',
    }),
    ...nest([`.${Theme.relative}`],{
        position:'relative',
    }),
    ...nest([`.${Theme.absolute}`],{
        position:'absolute',
    }),
    ...nest([`.${Theme.fixed}`],{
        position:'fixed',
    }),
    ...nest([`.${Theme.centered}`],{
        display:'block',
        float:'none',
        marginLeft:'auto',
        marginRight:'auto',
    }),
    ...nest([`.${Theme.flexCentered}`],{
        alignItems:'center',
        display:'flex',
        justifyContent:'center',
    }),
    ...marginVariant(0,0),
    ...marginVariant(1,$.unit1),
    ...marginVariant(2,$.unit2),
    ...paddingVariant(0,0),
    ...paddingVariant(1,$.unit1),
    ...paddingVariant(2,$.unit2),
});

// cssRule('.float-left', {
//     "float": "left"
// });
// cssRule('.float-right', {
//     "float": "right"
// });
// cssRule('.relative', {
//     "position": "relative"
// });
// cssRule('.absolute', {
//     "position": "absolute"
// });
// cssRule('.fixed', {
//     "position": "fixed"
// });
// cssRule('.centered', {
//     "display": "block",
//     "float": "none",
//     "marginLeft": "auto",
//     "marginRight": "auto"
// });
// cssRule('.flex-centered', {
//     "alignItems": "center",
//     "display": [
//         "flex",
//         "-ms-flexbox"
//     ],
//     "-ms-flex-align": "center",
//     "-ms-flex-pack": "center",
//     "justifyContent": "center"
// });
// cssRule('.m-0', {
//     "margin": 0
// });
// cssRule('.mb-0', {
//     "marginBottom": 0
// });
// cssRule('.ml-0', {
//     "marginLeft": 0
// });
// cssRule('.mr-0', {
//     "marginRight": 0
// });
// cssRule('.mt-0', {
//     "marginTop": 0
// });
// cssRule('.mx-0', {
//     "marginLeft": 0,
//     "marginRight": 0
// });
// cssRule('.my-0', {
//     "marginBottom": 0,
//     "marginTop": 0
// });
// cssRule('.m-1', {
//     "margin": ".2rem"
// });
// cssRule('.mb-1', {
//     "marginBottom": ".2rem"
// });
// cssRule('.ml-1', {
//     "marginLeft": ".2rem"
// });
// cssRule('.mr-1', {
//     "marginRight": ".2rem"
// });
// cssRule('.mt-1', {
//     "marginTop": ".2rem"
// });
// cssRule('.mx-1', {
//     "marginLeft": ".2rem",
//     "marginRight": ".2rem"
// });
// cssRule('.my-1', {
//     "marginBottom": ".2rem",
//     "marginTop": ".2rem"
// });
// cssRule('.m-2', {
//     "margin": ".4rem"
// });
// cssRule('.mb-2', {
//     "marginBottom": ".4rem"
// });
// cssRule('.ml-2', {
//     "marginLeft": ".4rem"
// });
// cssRule('.mr-2', {
//     "marginRight": ".4rem"
// });
// cssRule('.mt-2', {
//     "marginTop": ".4rem"
// });
// cssRule('.mx-2', {
//     "marginLeft": ".4rem",
//     "marginRight": ".4rem"
// });
// cssRule('.my-2', {
//     "marginBottom": ".4rem",
//     "marginTop": ".4rem"
// });
// cssRule('.p-0', {
//     "padding": 0
// });
// cssRule('.pb-0', {
//     "paddingBottom": 0
// });
// cssRule('.pl-0', {
//     "paddingLeft": 0
// });
// cssRule('.pr-0', {
//     "paddingRight": 0
// });
// cssRule('.pt-0', {
//     "paddingTop": 0
// });
// cssRule('.px-0', {
//     "paddingLeft": 0,
//     "paddingRight": 0
// });
// cssRule('.py-0', {
//     "paddingBottom": 0,
//     "paddingTop": 0
// });
// cssRule('.p-1', {
//     "padding": ".2rem"
// });
// cssRule('.pb-1', {
//     "paddingBottom": ".2rem"
// });
// cssRule('.pl-1', {
//     "paddingLeft": ".2rem"
// });
// cssRule('.pr-1', {
//     "paddingRight": ".2rem"
// });
// cssRule('.pt-1', {
//     "paddingTop": ".2rem"
// });
// cssRule('.px-1', {
//     "paddingLeft": ".2rem",
//     "paddingRight": ".2rem"
// });
// cssRule('.py-1', {
//     "paddingBottom": ".2rem",
//     "paddingTop": ".2rem"
// });
// cssRule('.p-2', {
//     "padding": ".4rem"
// });
// cssRule('.pb-2', {
//     "paddingBottom": ".4rem"
// });
// cssRule('.pl-2', {
//     "paddingLeft": ".4rem"
// });
// cssRule('.pr-2', {
//     "paddingRight": ".4rem"
// });
// cssRule('.pt-2', {
//     "paddingTop": ".4rem"
// });
// cssRule('.px-2', {
//     "paddingLeft": ".4rem",
//     "paddingRight": ".4rem"
// });
// cssRule('.py-2', {
//     "paddingBottom": ".4rem",
//     "paddingTop": ".4rem"
// });