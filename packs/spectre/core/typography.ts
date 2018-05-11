import { stylesheet } from '@barlus/styles';
export const cssRule = stylesheet('typography.css');

cssRule('h1,h2,h3,h4,h5,h6', {
    "color": "inherit",
    "fontWeight": 500,
    "lineHeight": 1.2,
    "marginBottom": ".5em",
    "marginTop": 0
});
cssRule('.h1,.h2,.h3,.h4,.h5,.h6', {
    "fontWeight": 500
});
cssRule('.h1,h1', {
    "fontSize": "2rem"
});
cssRule('.h2,h2', {
    "fontSize": "1.6rem"
});
cssRule('.h3,h3', {
    "fontSize": "1.4rem"
});
cssRule('.h4,h4', {
    "fontSize": "1.2rem"
});
cssRule('.h5,h5', {
    "fontSize": "1rem"
});
cssRule('.h6,h6', {
    "fontSize": ".8rem"
});
cssRule('p', {
    "margin": "0 0 1rem"
});
cssRule('a,ins,u', {
    "-webkit-text-decoration-skip": "ink edges",
    "textDecorationSkip": "ink edges"
});
cssRule('abbr[title]', {
    "borderBottom": ".05rem dotted",
    "cursor": "help",
    "textDecoration": "none"
});
cssRule('kbd', {
    "background": "#454d5d",
    "borderRadius": ".1rem",
    "color": "#fff",
    "fontSize": ".7rem",
    "lineHeight": 1.2,
    "padding": ".1rem .15rem"
});
cssRule('mark', {
    "background": "#ffe9b3",
    "borderRadius": ".1rem",
    "color": "#50596c",
    "padding": ".05rem"
});
cssRule('blockquote', {
    "borderLeft": ".1rem solid #e7e9ed",
    "marginLeft": 0,
    "padding": ".4rem .8rem"
});
cssRule('blockquote p:last-child', {
    "marginBottom": 0
});
cssRule('ol,ul', {
    "margin": ".8rem 0 .8rem .8rem",
    "padding": 0
});
cssRule('ol ol,ol ul,ul ol,ul ul', {
    "margin": ".8rem 0 .8rem .8rem"
});
cssRule('ol li,ul li', {
    "marginTop": ".4rem"
});
cssRule('ul', {
    "listStyle": "disc inside"
});
cssRule('ul ul', {
    "listStyleType": "circle"
});
cssRule('ol', {
    "listStyle": "decimal inside"
});
cssRule('ol ol', {
    "listStyleType": "lower-alpha"
});
cssRule('dl dt', {
    "fontWeight": 700
});
cssRule('dl dd', {
    "margin": ".4rem 0 .8rem 0"
});