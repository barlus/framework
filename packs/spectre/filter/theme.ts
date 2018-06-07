import {$,rem,list,nest,stylesheet} from "@barlus/styles"

export default Theme;
export const enum Theme {
    filter='filter',
    filterBody='filter-body',
    filterNav='filter-nav',
}

const filterCheckedNav = () => {
    let selector = [];
    for(let i = 0; i<=8; i++){
       selector.push(`.filter-tag#tag-${i}:checked~.filter-nav .chip[for=tag-${i}]`)
    }
    return  nest(selector,{
        background:$.primaryColor.rgba,
        color:$.lightColor.rgba
    });
};

const filterCheckedBody = () => {
    let selector = [];
    for(let i = 1; i<=8; i++){
        selector.push(`.filter-tag#tag-${i}:checked~.filter-body .filter-item:not([data-tag~=tag-${i}])`)
    }
    return  nest(selector,{
        display: 'none'
    });
};

stylesheet('filters.ts')('',{
    ...nest([`.${Theme.filter}`],{
        ...nest([`.${Theme.filterNav}`],{
            margin:list(rem($.layoutSpacing),0),
        }),
        ...nest([`.${Theme.filterBody}`],{
            display:'flex',
            flexWrap:'wrap',
        }),
    }),
    ...filterCheckedNav(),
    ...filterCheckedBody(),
});

