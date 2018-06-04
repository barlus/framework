import {$,list,nest,percent,stylesheet,rem} from '@barlus/styles';

export default Theme;
export const enum Theme {
    active='active',
    disabled='disabled',
    pageItem='page-item',
    pageItemSubtitle='page-item-subtitle',
    pageItemTitle='page-item-title',
    pageNext='page-next',
    pagePrev='page-prev',
    pagination='pagination',
}

stylesheet('pagination.css')('',{
    ...nest([`.${Theme.pagination}`],{
        display:'flex',
        listStyle:'none',
        margin:list(rem($.unit1),0),
        padding:list(rem($.unit1),0),
        ...nest([`.${Theme.pageItem}`],{
            margin:list(rem($.unit1),rem($.unitO)),
            ...nest([`span`],{
                display:'inline-block',
                padding:list(rem($.unit1),rem($.unit1)),
            }),
            ...nest([`a`],{
                borderRadius:rem($.borderRadius),
                color:$.grayColorDark.rgba,
                display:'inline-block',
                padding:list(rem($.unit1),rem($.unit2)),
                textDecoration:'none',
                ...nest([`&:focus`,`&:hover`],{
                    color:$.primaryColor.rgba,
                }),
            }),
            ...nest([`&.${Theme.disabled}`],{
                ...nest([`a`],{
                    cursor:'default',
                    opacity:.5,
                    pointerEvents:'none',
                }),
            }),
            ...nest([`&.${Theme.active}`],{
                ...nest([`a`],{
                    background:$.primaryColor.rgba,
                    color:$.lightColor.rgba,
                }),
            }),
            ...nest([`&.${Theme.pagePrev}`,`&.${Theme.pageNext}`],{
                flex:`1 0 50%`,
            }),
            ...nest([`&.${Theme.pageNext}`],{
                textAlign:'right',
            }),
            ...nest([`.${Theme.pageItemTitle}`],{
                margin:0,
            }),
            ...nest([`.${Theme.pageItemSubtitle}`],{
                margin:0,
                opacity:.5,
            }),
        }),
    }),
});
