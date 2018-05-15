import { stylesheet } from '@barlus/styles';
export const cssRule = stylesheet('table.css');

//Table
cssRule('.table', {
    "borderCollapse": "collapse",
    "borderSpacing": 0,
    "textAlign": "left",
    "width": "100%"
});
cssRule('.table.table-striped tbody tr:nth-of-type(odd)', {
    "background": "#f8f9fa"
});
cssRule('.table tbody tr.active,.table.table-striped tbody tr.active', {
    "background": "#f0f1f4"
});
cssRule('.table.table-hover tbody tr:hover', {
    "background": "#f0f1f4"
});
cssRule('.table.table-scroll', {
    "display": "block",
    "overflowX": "auto",
    "paddingBottom": ".75rem",
    "whiteSpace": "nowrap"
});
cssRule('.table td,.table th', {
    "borderBottom": ".05rem solid #e7e9ed",
    "padding": ".6rem .4rem"
});
cssRule('.table th', {
    "borderBottomWidth": ".1rem"
});