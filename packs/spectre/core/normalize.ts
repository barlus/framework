import { stylesheet } from '@barlus/styles';

export const rule = stylesheet('normalize.css');

rule('html', {
    "fontFamily": "sans-serif",
    "-webkit-text-size-adjust": '100%',
    "-ms-text-size-adjust": '100%'
});
rule('body', {
    margin: 0
});
rule('article,aside,footer,header,nav,section', {
    display: 'block'
});
rule('h1', {
    "fontSize": "2em",
    "margin": ".67em 0"
});
rule('figcaption,figure,main', {
    "display": "block"
});
rule('hr', {
    "boxSizing": "content-box",
    "height": 0,
    "overflow": "visible"
});
rule('a', {
    "backgroundColor": "transparent",
    "-webkit-text-decoration-skip": "objects"
});
rule('a:active,a:hover', {
    "outlineWidth": 0
});
rule('address', {
    "fontStyle": "normal"
});
rule('b,strong', {
    "fontWeight": "inherit"
});
rule('b,strong', {
    "fontWeight": "bolder"
});
rule('code,kbd,pre,samp', {
    "fontFamily": `"SF Mono","Segoe UI Mono","Roboto Mono","Menlo","Courier","monospace"`,
    "fontSize": "1em"
});
rule('dfn', {
    "fontStyle": "italic"
});
rule('small', {
    "fontSize": "80%",
    "fontWeight": 400
});
rule('sub,sup', {
    "fontSize": "75%",
    "lineHeight": 0,
    "position": "relative",
    "verticalAlign": "baseline"
});
rule('sub', {
    "bottom": "-.25em"
});
rule('sup', {
    "top": "-.5em"
});
rule('audio,video', {
    "display": "inline-block"
});
rule('audio:not([controls])', {
    "display": "none",
    "height": 0
});
rule('img', {
    "borderStyle": "none"
});
rule('svg:not(:root)', {
    "overflow": "hidden"
});
rule('button,input,optgroup,select,textarea', {
    "fontFamily": "inherit",
    "fontSize": "inherit",
    "lineHeight": "inherit",
    "margin": 0
});
rule('button,input', {
    "overflow": "visible"
});
rule('button,select', {
    "textTransform": "none"
});
rule('[type=reset],[type=submit],button,html [type=button]', {
    "-webkit-appearance": "button"
});
rule("[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner", {
    "borderStyle": "none",
    "padding": 0
});
rule('fieldset', {
    "border": 0,
    "margin": 0,
    "padding": 0
});
rule('legend', {
    "boxSizing": "border-box",
    "color": "inherit",
    "display": "table",
    "maxWidth": "100%",
    "padding": 0,
    "whiteSpace": "normal"
});
rule('progress', {
    "display": "inline-block",
    "verticalAlign": "baseline"
});
rule('textarea', {
    "overflow": "auto"
});
rule('[type=checkbox],[type=radio]', {
    "boxSizing": "border-box",
    "padding": 0
});
rule('[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button', {
    "height": "auto"
});
rule('[type=search]', {
    "-webkit-appearance": "textfield",
    "outlineOffset": "-2px"
});
rule('[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration', {
    "-webkit-appearance": "none"
});
rule('::-webkit-file-upload-button', {
    "-webkit-appearance": "button",
    "font": "inherit"
});
rule('details,menu', {
    "display": "block"
});
rule('summary', {
    "display": "list-item",
    "outline": 0
});
rule('canvas', {
    "display": "inline-block"
});
rule('template', {
    "display": "none"
});
rule('[hidden]', {
    "display": "none"
});