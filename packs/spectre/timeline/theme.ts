import { cssRule } from '../../styles/index';
cssRule('.timeline .timeline-item', {
    "display": [
        "flex",
        "-ms-flexbox"
    ],
    "marginBottom": "1.2rem",
    "position": "relative"
});
cssRule('.timeline .timeline-item::before', {
    "background": "#e7e9ed",
    "content": "\"\"",
    "height": "100%",
    "left": "11px",
    "position": "absolute",
    "top": "1.2rem",
    "width": "2px"
});
cssRule('.timeline .timeline-item .timeline-left', {
    "-ms-flex": "0 0 auto",
    "flex": "0 0 auto"
});
cssRule('.timeline .timeline-item .timeline-content', {
    "-ms-flex": "1 1 auto",
    "flex": "1 1 auto",
    "padding": "2px 0 2px .8rem"
});
cssRule('.timeline .timeline-item .timeline-icon', {
    "borderRadius": "50%",
    "color": "#fff",
    "display": "block",
    "height": "1.2rem",
    "textAlign": "center",
    "width": "1.2rem"
});
cssRule('.timeline .timeline-item .timeline-icon::before', {
    "border": ".1rem solid #5755d9",
    "borderRadius": "50%",
    "content": "\"\"",
    "display": "block",
    "height": ".4rem",
    "left": ".4rem",
    "position": "absolute",
    "top": ".4rem",
    "width": ".4rem"
});
cssRule('.timeline .timeline-item .timeline-icon.icon-lg', {
    "background": "#5755d9",
    "lineHeight": "1rem"
});
cssRule('.timeline .timeline-item .timeline-icon.icon-lg::before', {
    "content": "none"
});