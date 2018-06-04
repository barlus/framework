import { cssRule } from '../styles/index';

// Themes

import './mixins';

import './core/normalize';
import './core/base';
import "./layout/theme";
import './typography/theme';
import './label/theme';
import './buttons/theme';
import './toasts/theme';
import './accordions/theme';
import './tables/theme';
import './forms/theme';
import './media/theme';
import './avatars/theme';
import './badges/theme';
import './navbar/theme';
import './bars/theme';
import './tooltips/theme';
import './breadcrumbs/theme';
import './cards/theme';
import './chips/theme';
import './empty/theme';
import './tiles/theme';
import './menus/theme';
import './modals/theme';
import './navs/theme';
import './pagination/theme';
import './panels/theme';
import './tabs/theme';
import './popovers/theme';
import './steps/theme';
import './calendars/theme';
import './autocomplete/theme';
import './offCanvas/theme';

import "./carousel/theme";
import "./comparison/theme";
import "./filter/theme";
import "./meter/theme";
import "./paralax/theme";
import "./progress/theme";
import "./slider/theme";
import "./timeline/theme";





cssRule('.text-primary', {
    "color": "#5755d9"
});
cssRule('a.text-primary:focus,a.text-primary:hover', {
    "color": "#4240d4"
});
cssRule('.text-secondary', {
    "color": "#e5e5f9"
});
cssRule('a.text-secondary:focus,a.text-secondary:hover', {
    "color": "#d1d0f4"
});
cssRule('.text-gray', {
    "color": "#acb3c2"
});
cssRule('a.text-gray:focus,a.text-gray:hover', {
    "color": "#9ea6b7"
});
cssRule('.text-light', {
    "color": "#fff"
});
cssRule('a.text-light:focus,a.text-light:hover', {
    "color": "#f2f2f2"
});
cssRule('.text-success', {
    "color": "#32b643"
});
cssRule('a.text-success:focus,a.text-success:hover', {
    "color": "#2da23c"
});
cssRule('.text-warning', {
    "color": "#ffb700"
});
cssRule('a.text-warning:focus,a.text-warning:hover', {
    "color": "#e6a500"
});
cssRule('.text-error', {
    "color": "#e85600"
});
cssRule('a.text-error:focus,a.text-error:hover', {
    "color": "#cf4d00"
});

cssRule('.bg-primary', {
    "background": "#5755d9",
    "color": "#fff"
});
cssRule('.bg-secondary', {
    "background": "#f1f1fc"
});
cssRule('.bg-dark', {
    "background": "#454d5d",
    "color": "#fff"
});
cssRule('.bg-gray', {
    "background": "#f8f9fa"
});
cssRule('.bg-success', {
    "background": "#32b643",
    "color": "#fff"
});
cssRule('.bg-warning', {
    "background": "#ffb700",
    "color": "#fff"
});
cssRule('.bg-error', {
    "background": "#e85600",
    "color": "#fff"
});

cssRule('.c-hand', {
    "cursor": "pointer"
});
cssRule('.c-move', {
    "cursor": "move"
});
cssRule('.c-zoom-in', {
    "cursor": "zoom-in"
});
cssRule('.c-zoom-out', {
    "cursor": "zoom-out"
});
cssRule('.c-not-allowed', {
    "cursor": "not-allowed"
});
cssRule('.c-auto', {
    "cursor": "auto"
});
cssRule('.d-block', {
    "display": "block"
});
cssRule('.d-inline', {
    "display": "inline"
});
cssRule('.d-inline-block', {
    "display": "inline-block"
});
cssRule('.d-flex', {
    "display": [
        "flex",
        "-ms-flexbox"
    ]
});
cssRule('.d-inline-flex', {
    "display": [
        "inline-flex",
        "-ms-inline-flexbox"
    ]
});
cssRule('.d-hide,.d-none', {
    "display": "none"
});
cssRule('.d-visible', {
    "visibility": "visible"
});
cssRule('.d-invisible', {
    "visibility": "hidden"
});
cssRule('.text-hide', {
    "background": "0 0",
    "border": 0,
    "color": "transparent",
    "fontSize": 0,
    "lineHeight": 0,
    "textShadow": "none"
});
cssRule('.text-assistive', {
    "border": 0,
    "clip": "rect(0,0,0,0)",
    "height": "1px",
    "margin": "-1px",
    "overflow": "hidden",
    "padding": 0,
    "position": "absolute",
    "width": "1px"
});
cssRule('.divider,.divider-vert', {
    "display": "block",
    "position": "relative"
});
cssRule('.divider-vert[data-content]::after,.divider[data-content]::after', {
    "background": "#fff",
    "color": "#acb3c2",
    "content": "attr(data-content)",
    "display": "inline-block",
    "fontSize": ".7rem",
    "padding": "0 .4rem",
    "transform": "translateY(-.65rem)"
});
cssRule('.divider', {
    "borderTop": ".05rem solid #e7e9ed",
    "height": ".05rem",
    "margin": ".4rem 0"
});
cssRule('.divider[data-content]', {
    "margin": ".8rem 0"
});
cssRule('.divider-vert', {
    "display": "block",
    "padding": ".8rem"
});
cssRule('.divider-vert::before', {
    "borderLeft": ".05rem solid #e7e9ed",
    "bottom": ".4rem",
    "content": "\"\"",
    "display": "block",
    "left": "50%",
    "position": "absolute",
    "top": ".4rem",
    "transform": "translateX(-50%)"
});
cssRule('.divider-vert[data-content]::after', {
    "left": "50%",
    "padding": ".2rem 0",
    "position": "absolute",
    "top": "50%",
    "transform": "translate(-50%,-50%)"
});
cssRule('.loading', {
    "color": "transparent!important",
    "minHeight": ".8rem",
    "pointerEvents": "none",
    "position": "relative"
});
cssRule('.loading::after', {
    "animation": "loading .5s infinite linear",
    "border": ".1rem solid #5755d9",
    "borderRadius": "50%",
    "borderRightColor": "transparent",
    "borderTopColor": "transparent",
    "content": "\"\"",
    "display": "block",
    "height": ".8rem",
    "left": "50%",
    "marginLeft": "-.4rem",
    "marginTop": "-.4rem",
    "position": "absolute",
    "top": "50%",
    "width": ".8rem",
    "zIndex": 1
});
cssRule('.loading.loading-lg', {
    "minHeight": "2rem"
});
cssRule('.loading.loading-lg::after', {
    "height": "1.6rem",
    "marginLeft": "-.8rem",
    "marginTop": "-.8rem",
    "width": "1.6rem"
});
cssRule('.clearfix::after,.container::after', {
    "clear": "both",
    "content": "\"\"",
    "display": "table"
});
cssRule('.float-left', {
    "float": "left"
});
cssRule('.float-right', {
    "float": "right"
});
cssRule('.relative', {
    "position": "relative"
});
cssRule('.absolute', {
    "position": "absolute"
});
cssRule('.fixed', {
    "position": "fixed"
});
cssRule('.centered', {
    "display": "block",
    "float": "none",
    "marginLeft": "auto",
    "marginRight": "auto"
});
cssRule('.flex-centered', {
    "alignItems": "center",
    "display": [
        "flex",
        "-ms-flexbox"
    ],
    "-ms-flex-align": "center",
    "-ms-flex-pack": "center",
    "justifyContent": "center"
});
cssRule('.m-0', {
    "margin": 0
});
cssRule('.mb-0', {
    "marginBottom": 0
});
cssRule('.ml-0', {
    "marginLeft": 0
});
cssRule('.mr-0', {
    "marginRight": 0
});
cssRule('.mt-0', {
    "marginTop": 0
});
cssRule('.mx-0', {
    "marginLeft": 0,
    "marginRight": 0
});
cssRule('.my-0', {
    "marginBottom": 0,
    "marginTop": 0
});
cssRule('.m-1', {
    "margin": ".2rem"
});
cssRule('.mb-1', {
    "marginBottom": ".2rem"
});
cssRule('.ml-1', {
    "marginLeft": ".2rem"
});
cssRule('.mr-1', {
    "marginRight": ".2rem"
});
cssRule('.mt-1', {
    "marginTop": ".2rem"
});
cssRule('.mx-1', {
    "marginLeft": ".2rem",
    "marginRight": ".2rem"
});
cssRule('.my-1', {
    "marginBottom": ".2rem",
    "marginTop": ".2rem"
});
cssRule('.m-2', {
    "margin": ".4rem"
});
cssRule('.mb-2', {
    "marginBottom": ".4rem"
});
cssRule('.ml-2', {
    "marginLeft": ".4rem"
});
cssRule('.mr-2', {
    "marginRight": ".4rem"
});
cssRule('.mt-2', {
    "marginTop": ".4rem"
});
cssRule('.mx-2', {
    "marginLeft": ".4rem",
    "marginRight": ".4rem"
});
cssRule('.my-2', {
    "marginBottom": ".4rem",
    "marginTop": ".4rem"
});
cssRule('.p-0', {
    "padding": 0
});
cssRule('.pb-0', {
    "paddingBottom": 0
});
cssRule('.pl-0', {
    "paddingLeft": 0
});
cssRule('.pr-0', {
    "paddingRight": 0
});
cssRule('.pt-0', {
    "paddingTop": 0
});
cssRule('.px-0', {
    "paddingLeft": 0,
    "paddingRight": 0
});
cssRule('.py-0', {
    "paddingBottom": 0,
    "paddingTop": 0
});
cssRule('.p-1', {
    "padding": ".2rem"
});
cssRule('.pb-1', {
    "paddingBottom": ".2rem"
});
cssRule('.pl-1', {
    "paddingLeft": ".2rem"
});
cssRule('.pr-1', {
    "paddingRight": ".2rem"
});
cssRule('.pt-1', {
    "paddingTop": ".2rem"
});
cssRule('.px-1', {
    "paddingLeft": ".2rem",
    "paddingRight": ".2rem"
});
cssRule('.py-1', {
    "paddingBottom": ".2rem",
    "paddingTop": ".2rem"
});
cssRule('.p-2', {
    "padding": ".4rem"
});
cssRule('.pb-2', {
    "paddingBottom": ".4rem"
});
cssRule('.pl-2', {
    "paddingLeft": ".4rem"
});
cssRule('.pr-2', {
    "paddingRight": ".4rem"
});
cssRule('.pt-2', {
    "paddingTop": ".4rem"
});
cssRule('.px-2', {
    "paddingLeft": ".4rem",
    "paddingRight": ".4rem"
});
cssRule('.py-2', {
    "paddingBottom": ".4rem",
    "paddingTop": ".4rem"
});
cssRule('.rounded', {
    "borderRadius": ".1rem"
});
cssRule('.circle', {
    "borderRadius": "50%"
});
cssRule('.text-left', {
    "textAlign": "left"
});
cssRule('.text-right', {
    "textAlign": "right"
});
cssRule('.text-center', {
    "textAlign": "center"
});
cssRule('.text-justify', {
    "textAlign": "justify"
});
cssRule('.text-lowercase', {
    "textTransform": "lowercase"
});
cssRule('.text-uppercase', {
    "textTransform": "uppercase"
});
cssRule('.text-capitalize', {
    "textTransform": "capitalize"
});
cssRule('.text-normal', {
    "fontWeight": 400
});
cssRule('.text-bold', {
    "fontWeight": 700
});
cssRule('.text-italic', {
    "fontStyle": "italic"
});
cssRule('.text-large', {
    "fontSize": "1.2em"
});
cssRule('.text-ellipsis', {
    "overflow": "hidden",
    "textOverflow": "ellipsis",
    "whiteSpace": "nowrap"
});
cssRule('.text-clip', {
    "overflow": "hidden",
    "textOverflow": "clip",
    "whiteSpace": "nowrap"
});
cssRule('.text-break', {
    "-webkit-hyphens": "auto",
    "-ms-hyphens": "auto",
    "hyphens": "auto",
    "wordBreak": "break-word",
    "wordWrap": "break-word"
});

cssRule('@media (max-width:1280px)', {
    "$nest": {
        ".col-xl-1,.col-xl-10,.col-xl-11,.col-xl-12,.col-xl-2,.col-xl-3,.col-xl-4,.col-xl-5,.col-xl-6,.col-xl-7,.col-xl-8,.col-xl-9": {
            "-ms-flex": "none",
            "flex": "none"
        },
        ".col-xl-12": {
            "width": "100%"
        },
        ".col-xl-11": {
            "width": "91.66666667%"
        },
        ".col-xl-10": {
            "width": "83.33333333%"
        },
        ".col-xl-9": {
            "width": "75%"
        },
        ".col-xl-8": {
            "width": "66.66666667%"
        },
        ".col-xl-7": {
            "width": "58.33333333%"
        },
        ".col-xl-6": {
            "width": "50%"
        },
        ".col-xl-5": {
            "width": "41.66666667%"
        },
        ".col-xl-4": {
            "width": "33.33333333%"
        },
        ".col-xl-3": {
            "width": "25%"
        },
        ".col-xl-2": {
            "width": "16.66666667%"
        },
        ".col-xl-1": {
            "width": "8.33333333%"
        },
        ".hide-xl": {
            "display": "none"
        },
        ".show-xl": {
            "display": "block"
        }
    }
});
cssRule('@media (max-width:960px)', {
    "$nest": {
        ".col-lg-1,.col-lg-10,.col-lg-11,.col-lg-12,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9": {
            "-ms-flex": "none",
            "flex": "none"
        },
        ".col-lg-12": {
            "width": "100%"
        },
        ".col-lg-11": {
            "width": "91.66666667%"
        },
        ".col-lg-10": {
            "width": "83.33333333%"
        },
        ".col-lg-9": {
            "width": "75%"
        },
        ".col-lg-8": {
            "width": "66.66666667%"
        },
        ".col-lg-7": {
            "width": "58.33333333%"
        },
        ".col-lg-6": {
            "width": "50%"
        },
        ".col-lg-5": {
            "width": "41.66666667%"
        },
        ".col-lg-4": {
            "width": "33.33333333%"
        },
        ".col-lg-3": {
            "width": "25%"
        },
        ".col-lg-2": {
            "width": "16.66666667%"
        },
        ".col-lg-1": {
            "width": "8.33333333%"
        },
        ".hide-lg": {
            "display": "none"
        },
        ".show-lg": {
            "display": "block"
        }
    }
});
cssRule('@media (max-width:840px)', {
    "$nest": {
        ".col-md-1,.col-md-10,.col-md-11,.col-md-12,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9": {
            "-ms-flex": "none",
            "flex": "none"
        },
        ".col-md-12": {
            "width": "100%"
        },
        ".col-md-11": {
            "width": "91.66666667%"
        },
        ".col-md-10": {
            "width": "83.33333333%"
        },
        ".col-md-9": {
            "width": "75%"
        },
        ".col-md-8": {
            "width": "66.66666667%"
        },
        ".col-md-7": {
            "width": "58.33333333%"
        },
        ".col-md-6": {
            "width": "50%"
        },
        ".col-md-5": {
            "width": "41.66666667%"
        },
        ".col-md-4": {
            "width": "33.33333333%"
        },
        ".col-md-3": {
            "width": "25%"
        },
        ".col-md-2": {
            "width": "16.66666667%"
        },
        ".col-md-1": {
            "width": "8.33333333%"
        },
        ".hide-md": {
            "display": "none"
        },
        ".show-md": {
            "display": "block"
        }
    }
});
cssRule('@media (max-width:600px)', {
    "$nest": {
        ".col-sm-1,.col-sm-10,.col-sm-11,.col-sm-12,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9": {
            "-ms-flex": "none",
            "flex": "none"
        },
        ".col-sm-12": {
            "width": "100%"
        },
        ".col-sm-11": {
            "width": "91.66666667%"
        },
        ".col-sm-10": {
            "width": "83.33333333%"
        },
        ".col-sm-9": {
            "width": "75%"
        },
        ".col-sm-8": {
            "width": "66.66666667%"
        },
        ".col-sm-7": {
            "width": "58.33333333%"
        },
        ".col-sm-6": {
            "width": "50%"
        },
        ".col-sm-5": {
            "width": "41.66666667%"
        },
        ".col-sm-4": {
            "width": "33.33333333%"
        },
        ".col-sm-3": {
            "width": "25%"
        },
        ".col-sm-2": {
            "width": "16.66666667%"
        },
        ".col-sm-1": {
            "width": "8.33333333%"
        },
        ".hide-sm": {
            "display": "none"
        },
        ".show-sm": {
            "display": "block"
        }
    }
});
cssRule('@media (max-width:480px)', {
    "$nest": {
        ".col-xs-1,.col-xs-10,.col-xs-11,.col-xs-12,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9": {
            "-ms-flex": "none",
            "flex": "none"
        },
        ".col-xs-12": {
            "width": "100%"
        },
        ".col-xs-11": {
            "width": "91.66666667%"
        },
        ".col-xs-10": {
            "width": "83.33333333%"
        },
        ".col-xs-9": {
            "width": "75%"
        },
        ".col-xs-8": {
            "width": "66.66666667%"
        },
        ".col-xs-7": {
            "width": "58.33333333%"
        },
        ".col-xs-6": {
            "width": "50%"
        },
        ".col-xs-5": {
            "width": "41.66666667%"
        },
        ".col-xs-4": {
            "width": "33.33333333%"
        },
        ".col-xs-3": {
            "width": "25%"
        },
        ".col-xs-2": {
            "width": "16.66666667%"
        },
        ".col-xs-1": {
            "width": "8.33333333%"
        },
        ".hide-xs": {
            "display": "none"
        },
        ".show-xs": {
            "display": "block"
        }
    }
});
cssRule('@keyframes loading', {
    "$nest": {
        "0%": {
            "transform": "rotate(0)"
        },
        "100%": {
            "transform": "rotate(360deg)"
        }
    }
});
cssRule('@keyframes slide-down', {
    "$nest": {
        "0%": {
            "opacity": 0,
            "transform": "translateY(-1.6rem)"
        },
        "100%": {
            "opacity": 1,
            "transform": "translateY(0)"
        }
    }
});
