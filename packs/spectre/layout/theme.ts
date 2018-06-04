import { cssRule } from '../../styles/styling';

export const enum Theme {
    Container = 'container',
    Columns = 'columns',
    Column = 'column',
    //
    gapless = 'col-gapless',
    oneline = 'col-oneline',
}

cssRule('.container', {
    "marginLeft": "auto",
    "marginRight": "auto",
    "paddingLeft": ".4rem",
    "paddingRight": ".4rem",
    "width": "100%"
});
cssRule('.container.grid-xl', {
    "maxWidth": "1296px"
});
cssRule('.container.grid-lg', {
    "maxWidth": "976px"
});
cssRule('.container.grid-md', {
    "maxWidth": "856px"
});
cssRule('.container.grid-sm', {
    "maxWidth": "616px"
});
cssRule('.container.grid-xs', {
    "maxWidth": "496px"
});
cssRule('.show-lg,.show-md,.show-sm,.show-xl,.show-xs', {
    "display": "none"
});
cssRule('.columns', {
    "display": [
        "flex",
        "-ms-flexbox"
    ],
    "-ms-flex-wrap": "wrap",
    "flexWrap": "wrap",
    "marginLeft": "-.4rem",
    "marginRight": "-.4rem"
});
cssRule('.columns.col-gapless', {
    "marginLeft": 0,
    "marginRight": 0
});
cssRule('.columns.col-gapless>.column', {
    "paddingLeft": 0,
    "paddingRight": 0
});
cssRule('.columns.col-oneline', {
    "-ms-flex-wrap": "nowrap",
    "flexWrap": "nowrap",
    "overflowX": "auto"
});
cssRule('.column', {
    "-ms-flex": 1,
    "flex": 1,
    "maxWidth": "100%",
    "paddingLeft": ".4rem",
    "paddingRight": ".4rem"
});
cssRule('.column.col-1,.column.col-10,.column.col-11,.column.col-12,.column.col-2,.column.col-3,.column.col-4,.column.col-5,.column.col-6,.column.col-7,.column.col-8,.column.col-9', {
    "-ms-flex": "none",
    "flex": "none"
});
cssRule('.col-12', {
    "width": "100%"
});
cssRule('.col-11', {
    "width": "91.66666667%"
});
cssRule('.col-10', {
    "width": "83.33333333%"
});
cssRule('.col-9', {
    "width": "75%"
});
cssRule('.col-8', {
    "width": "66.66666667%"
});
cssRule('.col-7', {
    "width": "58.33333333%"
});
cssRule('.col-6', {
    "width": "50%"
});
cssRule('.col-5', {
    "width": "41.66666667%"
});
cssRule('.col-4', {
    "width": "33.33333333%"
});
cssRule('.col-3', {
    "width": "25%"
});
cssRule('.col-2', {
    "width": "16.66666667%"
});
cssRule('.col-1', {
    "width": "8.33333333%"
});
cssRule('.col-auto', {
    "-ms-flex": "0 0 auto",
    "flex": "0 0 auto",
    "maxWidth": "none",
    "width": "auto"
});
cssRule('.col-mx-auto', {
    "marginLeft": "auto",
    "marginRight": "auto"
});
cssRule('.col-ml-auto', {
    "marginLeft": "auto"
});
cssRule('.col-mr-auto', {
    "marginRight": "auto"
});