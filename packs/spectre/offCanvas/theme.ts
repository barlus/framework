import { cssRule } from '@barlus/styles';

export const enum Theme {
    OffCanvas = "off-canvas",
    toggle = "off-canvas-toggle ",
    sidebar = "off-canvas-sidebar",
    sidebarShow = "off-canvas-sidebar-show",
    overlay = "off-canvas-overlay",
    content = "off-canvas-content",
    active = "active",
}

cssRule('.off-canvas', {
    "display": [
        "flex",
        "-ms-flexbox"
    ],
    "-ms-flex-flow": "nowrap",
    "flexFlow": "nowrap",
    "height": "100vh",
    "position": "relative",
    "width": "100%"
});
cssRule('.off-canvas .off-canvas-toggle', {
    "display": "block",
    "left": ".4rem",
    "position": "absolute",
    "top": ".4rem",
    "transition": "none",
    "zIndex": 1
});
cssRule('.off-canvas .off-canvas-sidebar', {
    "background": "#f8f9fa",
    "bottom": 0,
    "left": 0,
    "minWidth": "10rem",
    "overflowY": "auto",
    "position": "fixed",
    "top": 0,
    "transform": "translateX(-100%)",
    "transition": "transform .25s ease",
    "zIndex": 200
});
cssRule('.off-canvas .off-canvas-content', {
    "-ms-flex": "1 1 auto",
    "flex": "1 1 auto",
    "height": "100%",
    "padding": ".4rem .4rem .4rem 4rem",
    "transition": "transform .25s ease"

});
cssRule('.off-canvas .off-canvas-overlay', {
    "background": "rgba(69,77,93,.1)",
    "borderColor": "transparent",
    "borderRadius": 0,
    "bottom": 0,
    "display": "none",
    "height": "100%",
    "left": 0,
    "position": "fixed",
    "right": 0,
    "top": 0,
    "width": "100%"
});
cssRule('.off-canvas.active .off-canvas-content', {
    "transform": "translateX(12em)",
});
cssRule('.off-canvas.active .off-canvas-sidebar', {
    "transform": "translateX(0)"
});
cssRule('.off-canvas.active .off-canvas-overlay', {
    "display": "block",
    "zIndex": 100
});

cssRule('@media (min-width:960px)', {
    "$nest": {
        ".off-canvas.off-canvas-sidebar-show .off-canvas-toggle": {
            "display": "none"
        },
        ".off-canvas.off-canvas-sidebar-show .off-canvas-sidebar": {
            "-ms-flex": "0 0 auto",
            "flex": "0 0 auto",
            "position": "relative",
            "transform": "none"
        }
    }
});
