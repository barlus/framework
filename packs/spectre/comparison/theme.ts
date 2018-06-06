import { cssRule } from '@barlus/styles';
cssRule('.comparison-slider', {
    "height": "50vh",
    "overflow": "hidden",
    "-webkit-overflow-scrolling": "touch",
    "position": "relative",
    "width": "100%"
});
cssRule('.comparison-slider .comparison-after,.comparison-slider .comparison-before', {
    "height": "100%",
    "left": 0,
    "margin": 0,
    "overflow": "hidden",
    "position": "absolute",
    "top": 0
});
cssRule('.comparison-slider .comparison-after img,.comparison-slider .comparison-before img', {
    "height": "100%",
    "objectFit": "cover",
    "objectPosition": "left center",
    "position": "absolute",
    "width": "100%"
});
cssRule('.comparison-slider .comparison-before', {
    "width": "100%",
    "zIndex": 1
});
cssRule('.comparison-slider .comparison-before .comparison-label', {
    "right": ".8rem"
});
cssRule('.comparison-slider .comparison-after', {
    "maxWidth": "100%",
    "minWidth": 0,
    "zIndex": 2
});
cssRule('.comparison-slider .comparison-after::before', {
    "background": "0 0",
    "content": "\"\"",
    "cursor": "default",
    "height": "100%",
    "left": 0,
    "position": "absolute",
    "right": ".8rem",
    "top": 0,
    "zIndex": 1
});
cssRule('.comparison-slider .comparison-after::after', {
    "background": "currentColor",
    "borderRadius": "50%",
    "boxShadow": "0 -5px,0 5px",
    "color": "#fff",
    "content": "\"\"",
    "height": "3px",
    "position": "absolute",
    "right": ".4rem",
    "top": "50%",
    "transform": "translate(50%,-50%)",
    "width": "3px"
});
cssRule('.comparison-slider .comparison-after .comparison-label', {
    "left": ".8rem"
});
cssRule('.comparison-slider .comparison-resizer', {
    "animation": "first-run 1.5s 1 ease-in-out",
    "cursor": "ew-resize",
    "height": ".8rem",
    "left": 0,
    "maxWidth": "100%",
    "minWidth": ".8rem",
    "opacity": 0,
    "outline": 0,
    "position": "relative",
    "resize": "horizontal",
    "top": "50%",
    "transform": "translateY(-50%) scaleY(30)",
    "width": 0
});
cssRule('.comparison-slider .comparison-label', {
    "background": "rgba(69,77,93,.5)",
    "bottom": ".8rem",
    "color": "#fff",
    "padding": ".2rem .4rem",
    "position": "absolute",
    "-webkit-user-select": "none",
    "-moz-user-select": "none",
    "-ms-user-select": "none",
    "userSelect": "none"
});
