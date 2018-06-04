// import { stylesheet, rem } from '@barlus/styles';
// import { config } from '../config';
// import { buttonVariant } from '../mixins/button';
// import { controlShadow } from '../mixins/shadow';
// import { controlTransition } from '../mixins/transition';

import { $, list, nest, rem, stylesheet } from "@barlus/styles"

export default Theme;
export const enum Theme {
    breadcrumb='breadcrumb',
    breadcrumbItem='breadcrumb-item',
}

stylesheet('breadcrumbs.ts')('',{
    ...nest([`.${Theme.breadcrumb}`],{
        listStyle:'none',
        margin:list(rem($.unit1),0),
        padding:list(rem($.unit1),0),
        ...nest([`.${Theme.breadcrumbItem}`],{
            color:$.grayColorDark.rgba,
            display:'inline-block',
            margin:0,
            padding:list(rem($.unit1),0),
            ...nest([`&:not(:last-child)`],{
                marginRight:rem($.unit1),
                ...nest([`a`],{
                    color:$.grayColorDark.rgba,
                }),
            }),
            ...nest([`&:not(:first-child)`],{
                ...nest([`&::before`],{
                    color:$.grayColorLight.rgba,
                    content:'"/"',
                    paddingRight:rem($.unit2),
                }),
            }),
        }),
    }),
});
