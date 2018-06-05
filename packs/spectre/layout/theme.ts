import { cssRule, media, nest } from '@barlus/styles';

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

media({ maxWidth: 1280 }, {
    ...nest([ '.col-xl-1', '.col-xl-10', '.col-xl-11', '.col-xl-12', '.col-xl-2', '.col-xl-3', '.col-xl-4', '.col-xl-5', '.col-xl-6', '.col-xl-7', '.col-xl-8', '.col-xl-9' ], {
        "flex": "none"
    }),
    ...nest([ '.col-xl-12' ], {
        "width": "100%"
    })
});

cssRule('@media (max-width:1280px)', {
    "$nest": {
        "": {
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