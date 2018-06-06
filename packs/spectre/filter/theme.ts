import { cssRule } from '@barlus/styles';

cssRule('.filter .filter-tag#tag-0:checked~.filter-nav .chip[for=tag-0],.filter .filter-tag#tag-1:checked~.filter-nav .chip[for=tag-1],.filter .filter-tag#tag-2:checked~.filter-nav .chip[for=tag-2],.filter .filter-tag#tag-3:checked~.filter-nav .chip[for=tag-3],.filter .filter-tag#tag-4:checked~.filter-nav .chip[for=tag-4],.filter .filter-tag#tag-5:checked~.filter-nav .chip[for=tag-5],.filter .filter-tag#tag-6:checked~.filter-nav .chip[for=tag-6],.filter .filter-tag#tag-7:checked~.filter-nav .chip[for=tag-7],.filter .filter-tag#tag-8:checked~.filter-nav .chip[for=tag-8]', {
    "background": "#5755d9",
    "color": "#fff"
});
cssRule('.filter .filter-tag#tag-1:checked~.filter-body .filter-item:not([data-tag~=tag-1]),.filter .filter-tag#tag-2:checked~.filter-body .filter-item:not([data-tag~=tag-2]),.filter .filter-tag#tag-3:checked~.filter-body .filter-item:not([data-tag~=tag-3]),.filter .filter-tag#tag-4:checked~.filter-body .filter-item:not([data-tag~=tag-4]),.filter .filter-tag#tag-5:checked~.filter-body .filter-item:not([data-tag~=tag-5]),.filter .filter-tag#tag-6:checked~.filter-body .filter-item:not([data-tag~=tag-6]),.filter .filter-tag#tag-7:checked~.filter-body .filter-item:not([data-tag~=tag-7]),.filter .filter-tag#tag-8:checked~.filter-body .filter-item:not([data-tag~=tag-8])', {
    "display": "none"
});
cssRule('.filter .filter-nav', {
    "margin": ".4rem 0"
});
cssRule('.filter .filter-body', {
    "display": [
        "flex",
        "-ms-flexbox"
    ],
    "-ms-flex-wrap": "wrap",
    "flexWrap": "wrap"
});
