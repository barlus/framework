import { cssRule, fontFace } from '@barlus/styles';
cssRule('.icon', {
  "boxSizing": "border-box",
  "display": "inline-block",
  "fontSize": "inherit",
  "fontStyle": "normal",
  "height": "1em",
  "position": "relative",
  "textIndent": "-9999px",
  "verticalAlign": "middle",
  "width": "1em"
});
cssRule('.icon::after,.icon::before', {
  "display": "block",
  "left": "50%",
  "position": "absolute",
  "top": "50%",
  "transform": "translate(-50%,-50%)"
});
cssRule('.icon.icon-2x', {
  "fontSize": "1.6rem"
});
cssRule('.icon.icon-3x', {
  "fontSize": "2.4rem"
});
cssRule('.icon.icon-4x', {
  "fontSize": "3.2rem"
});
cssRule('.accordion .icon,.Button .icon,.menu .icon,.toast .icon', {
  "verticalAlign": "-10%"
});
cssRule('.Button-lg .icon', {
  "verticalAlign": "-15%"
});
cssRule('.icon-arrow-down::before,.icon-arrow-left::before,.icon-arrow-right::before,.icon-arrow-up::before,.icon-back::before,.icon-downward::before,.icon-forward::before,.icon-upward::before', {
  "border": ".1rem solid currentColor",
  "borderBottom": 0,
  "borderRight": 0,
  "content": "\"\"",
  "height": ".65em",
  "width": ".65em"
});
cssRule('.icon-arrow-down::before', {
  "transform": "translate(-50%,-75%) rotate(225deg)"
});
cssRule('.icon-arrow-left::before', {
  "transform": "translate(-25%,-50%) rotate(-45deg)"
});
cssRule('.icon-arrow-right::before', {
  "transform": "translate(-75%,-50%) rotate(135deg)"
});
cssRule('.icon-arrow-up::before', {
  "transform": "translate(-50%,-25%) rotate(45deg)"
});
cssRule('.icon-back::after,.icon-forward::after', {
  "background": "currentColor",
  "content": "\"\"",
  "height": ".1rem",
  "width": ".8em"
});
cssRule('.icon-downward::after,.icon-upward::after', {
  "background": "currentColor",
  "content": "\"\"",
  "height": ".8em",
  "width": ".1rem"
});
cssRule('.icon-back::after', {
  "left": "55%"
});
cssRule('.icon-back::before', {
  "transform": "translate(-50%,-50%) rotate(-45deg)"
});
cssRule('.icon-downward::after', {
  "top": "45%"
});
cssRule('.icon-downward::before', {
  "transform": "translate(-50%,-50%) rotate(-135deg)"
});
cssRule('.icon-forward::after', {
  "left": "45%"
});
cssRule('.icon-forward::before', {
  "transform": "translate(-50%,-50%) rotate(135deg)"
});
cssRule('.icon-upward::after', {
  "top": "55%"
});
cssRule('.icon-upward::before', {
  "transform": "translate(-50%,-50%) rotate(45deg)"
});
cssRule('.icon-caret::before', {
  "borderLeft": ".3em solid transparent",
  "borderRight": ".3em solid transparent",
  "borderTop": ".3em solid currentColor",
  "content": "\"\"",
  "height": 0,
  "transform": "translate(-50%,-25%)",
  "width": 0
});
cssRule('.icon-menu::before', {
  "background": "currentColor",
  "boxShadow": "0 -.35em,0 .35em",
  "content": "\"\"",
  "height": ".1rem",
  "width": "100%"
});
cssRule('.icon-apps::before', {
  "background": "currentColor",
  "boxShadow": "-.35em -.35em,-.35em 0,-.35em .35em,0 -.35em,0 .35em,.35em -.35em,.35em 0,.35em .35em",
  "content": "\"\"",
  "height": "3px",
  "width": "3px"
});
cssRule('.icon-resize-horiz::after,.icon-resize-horiz::before,.icon-resize-vert::after,.icon-resize-vert::before', {
  "border": ".1rem solid currentColor",
  "borderBottom": 0,
  "borderRight": 0,
  "content": "\"\"",
  "height": ".45em",
  "width": ".45em"
});
cssRule('.icon-resize-horiz::before,.icon-resize-vert::before', {
  "transform": "translate(-50%,-90%) rotate(45deg)"
});
cssRule('.icon-resize-horiz::after,.icon-resize-vert::after', {
  "transform": "translate(-50%,-10%) rotate(225deg)"
});
cssRule('.icon-resize-horiz::before', {
  "transform": "translate(-90%,-50%) rotate(-45deg)"
});
cssRule('.icon-resize-horiz::after', {
  "transform": "translate(-10%,-50%) rotate(135deg)"
});
cssRule('.icon-more-horiz::before,.icon-more-vert::before', {
  "background": "currentColor",
  "borderRadius": "50%",
  "boxShadow": "-.4em 0,.4em 0",
  "content": "\"\"",
  "height": "3px",
  "width": "3px"
});
cssRule('.icon-more-vert::before', {
  "boxShadow": "0 -.4em,0 .4em"
});
cssRule('.icon-cross::before,.icon-minus::before,.icon-plus::before', {
  "background": "currentColor",
  "content": "\"\"",
  "height": ".1rem",
  "width": "100%"
});
cssRule('.icon-cross::after,.icon-plus::after', {
  "background": "currentColor",
  "content": "\"\"",
  "height": "100%",
  "width": ".1rem"
});
cssRule('.icon-cross::before', {
  "width": "100%"
});
cssRule('.icon-cross::after', {
  "height": "100%"
});
cssRule('.icon-cross::after,.icon-cross::before', {
  "transform": "translate(-50%,-50%) rotate(45deg)"
});
cssRule('.icon-check::before', {
  "border": ".1rem solid currentColor",
  "borderRight": 0,
  "borderTop": 0,
  "content": "\"\"",
  "height": ".5em",
  "transform": "translate(-50%,-75%) rotate(-45deg)",
  "width": ".9em"
});
cssRule('.icon-stop', {
  "border": ".1rem solid currentColor",
  "borderRadius": "50%"
});
cssRule('.icon-stop::before', {
  "background": "currentColor",
  "content": "\"\"",
  "height": ".1rem",
  "transform": "translate(-50%,-50%) rotate(45deg)",
  "width": "1em"
});
cssRule('.icon-shutdown', {
  "border": ".1rem solid currentColor",
  "borderRadius": "50%",
  "borderTopColor": "transparent"
});
cssRule('.icon-shutdown::before', {
  "background": "currentColor",
  "content": "\"\"",
  "height": ".5em",
  "top": ".1em",
  "width": ".1rem"
});
cssRule('.icon-refresh::before', {
  "border": ".1rem solid currentColor",
  "borderRadius": "50%",
  "borderRightColor": "transparent",
  "content": "\"\"",
  "height": "1em",
  "width": "1em"
});
cssRule('.icon-refresh::after', {
  "border": ".2em solid currentColor",
  "borderLeftColor": "transparent",
  "borderTopColor": "transparent",
  "content": "\"\"",
  "height": 0,
  "left": "80%",
  "top": "20%",
  "width": 0
});
cssRule('.icon-search::before', {
  "border": ".1rem solid currentColor",
  "borderRadius": "50%",
  "content": "\"\"",
  "height": ".75em",
  "left": "5%",
  "top": "5%",
  "transform": "translate(0,0) rotate(45deg)",
  "width": ".75em"
});
cssRule('.icon-search::after', {
  "background": "currentColor",
  "content": "\"\"",
  "height": ".1rem",
  "left": "80%",
  "top": "80%",
  "transform": "translate(-50%,-50%) rotate(45deg)",
  "width": ".4em"
});
cssRule('.icon-edit::before', {
  "border": ".1rem solid currentColor",
  "content": "\"\"",
  "height": ".4em",
  "transform": "translate(-40%,-60%) rotate(-45deg)",
  "width": ".85em"
});
cssRule('.icon-edit::after', {
  "border": ".15em solid currentColor",
  "borderRightColor": "transparent",
  "borderTopColor": "transparent",
  "content": "\"\"",
  "height": 0,
  "left": "5%",
  "top": "95%",
  "transform": "translate(0,-100%)",
  "width": 0
});
cssRule('.icon-delete::before', {
  "border": ".1rem solid currentColor",
  "borderBottomLeftRadius": ".1rem",
  "borderBottomRightRadius": ".1rem",
  "borderTop": 0,
  "content": "\"\"",
  "height": ".75em",
  "top": "60%",
  "width": ".75em"
});
cssRule('.icon-delete::after', {
  "background": "currentColor",
  "boxShadow": "-.25em .2em,.25em .2em",
  "content": "\"\"",
  "height": ".1rem",
  "top": ".05rem",
  "width": ".5em"
});
cssRule('.icon-share', {
  "border": ".1rem solid currentColor",
  "borderRadius": ".1rem",
  "borderRight": 0,
  "borderTop": 0
});
cssRule('.icon-share::before', {
  "border": ".1rem solid currentColor",
  "borderLeft": 0,
  "borderTop": 0,
  "content": "\"\"",
  "height": ".4em",
  "left": "100%",
  "top": ".25em",
  "transform": "translate(-125%,-50%) rotate(-45deg)",
  "width": ".4em"
});
cssRule('.icon-share::after', {
  "border": ".1rem solid currentColor",
  "borderBottom": 0,
  "borderRadius": "75% 0",
  "borderRight": 0,
  "content": "\"\"",
  "height": ".5em",
  "width": ".6em"
});
cssRule('.icon-flag::before', {
  "background": "currentColor",
  "content": "\"\"",
  "height": "1em",
  "left": "15%",
  "width": ".1rem"
});
cssRule('.icon-flag::after', {
  "border": ".1rem solid currentColor",
  "borderBottomRightRadius": ".1rem",
  "borderLeft": 0,
  "borderTopRightRadius": ".1rem",
  "content": "\"\"",
  "height": ".65em",
  "left": "60%",
  "top": "35%",
  "width": ".8em"
});
cssRule('.icon-bookmark::before', {
  "border": ".1rem solid currentColor",
  "borderBottom": 0,
  "borderTopLeftRadius": ".1rem",
  "borderTopRightRadius": ".1rem",
  "content": "\"\"",
  "height": ".9em",
  "width": ".8em"
});
cssRule('.icon-bookmark::after', {
  "border": ".1rem solid currentColor",
  "borderBottom": 0,
  "borderLeft": 0,
  "borderRadius": ".1rem",
  "content": "\"\"",
  "height": ".5em",
  "transform": "translate(-50%,35%) rotate(-45deg) skew(15deg,15deg)",
  "width": ".5em"
});
cssRule('.icon-download,.icon-upload', {
  "borderBottom": ".1rem solid currentColor"
});
cssRule('.icon-download::before,.icon-upload::before', {
  "border": ".1rem solid currentColor",
  "borderBottom": 0,
  "borderRight": 0,
  "content": "\"\"",
  "height": ".5em",
  "transform": "translate(-50%,-60%) rotate(-135deg)",
  "width": ".5em"
});
cssRule('.icon-download::after,.icon-upload::after', {
  "background": "currentColor",
  "content": "\"\"",
  "height": ".6em",
  "top": "40%",
  "width": ".1rem"
});
cssRule('.icon-upload::before', {
  "transform": "translate(-50%,-60%) rotate(45deg)"
});
cssRule('.icon-upload::after', {
  "top": "50%"
});
cssRule('.icon-time', {
  "border": ".1rem solid currentColor",
  "borderRadius": "50%"
});
cssRule('.icon-time::before', {
  "background": "currentColor",
  "content": "\"\"",
  "height": ".4em",
  "transform": "translate(-50%,-75%)",
  "width": ".1rem"
});
cssRule('.icon-time::after', {
  "background": "currentColor",
  "content": "\"\"",
  "height": ".3em",
  "transform": "translate(-50%,-75%) rotate(90deg)",
  "transformOrigin": "50% 90%",
  "width": ".1rem"
});
cssRule('.icon-mail::before', {
  "border": ".1rem solid currentColor",
  "borderRadius": ".1rem",
  "content": "\"\"",
  "height": ".8em",
  "width": "1em"
});
cssRule('.icon-mail::after', {
  "border": ".1rem solid currentColor",
  "borderRight": 0,
  "borderTop": 0,
  "content": "\"\"",
  "height": ".5em",
  "transform": "translate(-50%,-90%) rotate(-45deg) skew(10deg,10deg)",
  "width": ".5em"
});
cssRule('.icon-people::before', {
  "border": ".1rem solid currentColor",
  "borderRadius": "50%",
  "content": "\"\"",
  "height": ".45em",
  "top": "25%",
  "width": ".45em"
});
cssRule('.icon-people::after', {
  "border": ".1rem solid currentColor",
  "borderRadius": "50% 50% 0 0",
  "content": "\"\"",
  "height": ".4em",
  "top": "75%",
  "width": ".9em"
});
cssRule('.icon-message', {
  "border": ".1rem solid currentColor",
  "borderBottom": 0,
  "borderRadius": ".1rem",
  "borderRight": 0
});
cssRule('.icon-message::before', {
  "border": ".1rem solid currentColor",
  "borderBottomRightRadius": ".1rem",
  "borderLeft": 0,
  "borderTop": 0,
  "content": "\"\"",
  "height": ".8em",
  "left": "65%",
  "top": "40%",
  "width": ".7em"
});
cssRule('.icon-message::after', {
  "background": "currentColor",
  "borderRadius": ".1rem",
  "content": "\"\"",
  "height": ".3em",
  "left": "10%",
  "top": "100%",
  "transform": "translate(0,-90%) rotate(45deg)",
  "width": ".1rem"
});
cssRule('.icon-photo', {
  "border": ".1rem solid currentColor",
  "borderRadius": ".1rem"
});
cssRule('.icon-photo::before', {
  "border": ".1rem solid currentColor",
  "borderRadius": "50%",
  "content": "\"\"",
  "height": ".25em",
  "left": "35%",
  "top": "35%",
  "width": ".25em"
});
cssRule('.icon-photo::after', {
  "border": ".1rem solid currentColor",
  "borderBottom": 0,
  "borderLeft": 0,
  "content": "\"\"",
  "height": ".5em",
  "left": "60%",
  "transform": "translate(-50%,25%) rotate(-45deg)",
  "width": ".5em"
});
cssRule('.icon-link::after,.icon-link::before', {
  "border": ".1rem solid currentColor",
  "borderRadius": "5em 0 0 5em",
  "borderRight": 0,
  "content": "\"\"",
  "height": ".5em",
  "width": ".75em"
});
cssRule('.icon-link::before', {
  "transform": "translate(-70%,-45%) rotate(-45deg)"
});
cssRule('.icon-link::after', {
  "transform": "translate(-30%,-55%) rotate(135deg)"
});
cssRule('.icon-location::before', {
  "border": ".1rem solid currentColor",
  "borderRadius": "50% 50% 50% 0",
  "content": "\"\"",
  "height": ".8em",
  "transform": "translate(-50%,-60%) rotate(-45deg)",
  "width": ".8em"
});
cssRule('.icon-location::after', {
  "border": ".1rem solid currentColor",
  "borderRadius": "50%",
  "content": "\"\"",
  "height": ".2em",
  "transform": "translate(-50%,-80%)",
  "width": ".2em"
});
cssRule('.icon-emoji', {
  "border": ".1rem solid currentColor",
  "borderRadius": "50%"
});
cssRule('.icon-emoji::before', {
  "borderRadius": "50%",
  "boxShadow": "-.17em -.15em,.17em -.15em",
  "content": "\"\"",
  "height": ".1em",
  "width": ".1em"
});
cssRule('.icon-emoji::after', {
  "border": ".1rem solid currentColor",
  "borderBottomColor": "transparent",
  "borderRadius": "50%",
  "borderRightColor": "transparent",
  "content": "\"\"",
  "height": ".5em",
  "transform": "translate(-50%,-40%) rotate(-135deg)",
  "width": ".5em"
});
