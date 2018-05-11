import { stylesheet } from '@barlus/styles';
export const cssRule = stylesheet('base.css');
cssRule('*,::after,::before', {
    "boxSizing": "inherit"
});
cssRule('html', {
    "boxSizing": "border-box",
    "fontSize": "20px",
    "lineHeight": 1.5,
    "-webkit-tap-highlight-color": "transparent"
});
cssRule('body', {
    "background": "#fff",
    "color": "#50596c",
    "fontFamily": "-apple-system,system-ui,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",sans-serif",
    "fontSize": ".8rem",
    "overflowX": "hidden",
    "textRendering": "optimizeLegibility"
});
cssRule('a', {
    "color": "#5755d9",
    "outline": 0,
    "textDecoration": "none"
});
cssRule('a:focus', {
    "boxShadow": "0 0 0 .1rem rgba(87,85,217,.2)"
});
cssRule('a.active,a:active,a:focus,a:hover', {
    "color": "#4240d4",
    "textDecoration": "underline"
});