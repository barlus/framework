import { NestedCSSProperties, CSSValue, CSSLength, stylesheet, rem, params, color } from '@barlus/styles';

const component = 'btn';
const modifiers = {
    primary: 'btn-primary'
};
const cssRule = stylesheet('button.css');
const fontSize = 0.80;
const controlSize = 1.8;
const bgColorLight = "#fff";
const borderWidth = 0.05;
const borderRadius = 0.10;
const primaryColor = "#5755d9";
const lineHeight = 1.00;
const controlPadding = .40;

export { cssRule }

function appearance(value: CSSValue<'auto' | 'none'>): NestedCSSProperties {
    return {
        "-webkit-appearance": value,
        "-moz-appearance": value,
        "appearance": value,
    }
}
function userSelect(value: NestedCSSProperties['userSelect']): NestedCSSProperties {
    return {
        "-webkit-user-select": value,
        "-moz-user-select": value,
        "-ms-user-select": value,
        "userSelect": value,
    }
}
function controlBorder(width: CSSLength = rem(borderWidth), color: string = primaryColor, style: NestedCSSProperties['borderStyle'] = 'solid', radius = rem(borderRadius)): NestedCSSProperties {
    return {
        borderColor: color,
        borderWidth: width,
        borderStyle: style,
        borderRadius: radius
    }
}
function controlPaddings(padding = controlPadding, size = controlSize, controlLineHeight = lineHeight, controlBorderWidth = borderWidth) {
    return {
        padding: params(rem((controlSize - controlLineHeight) / 2 - controlBorderWidth), rem(padding))
    }
}
function controlTransition() {
    return {
        transition: `all .2s ease`
    }
}
function controlShadow(shadowColor = primaryColor) {
    return {
        boxShadow: `0 0 0 .1rem ${color(shadowColor).fade(0.2).toRGBA()}`
    }
}
function and(selectors: string | string[], props: NestedCSSProperties): { [ k: string ]: NestedCSSProperties } {
    if (!Array.isArray(selectors)) {
        selectors = [ selectors ]
    }
    return selectors.reduce((css, selector) => (
        css[ `&${selector}` ] = props, css
    ), {})
}
function nest(nested:{ [ k: string ]: NestedCSSProperties }[]):NestedCSSProperties{
    const result = {$nest:{}};
    nested.forEach(n=>{
        Object.assign(result.$nest,n);
    });
    return result;
}
//Button
cssRule(`.${component}`, {
    cursor: "pointer",
    display: "inline-block",
    background: bgColorLight,
    color: primaryColor,
    fontSize: rem(fontSize),
    height: rem(controlSize),
    lineHeight: rem(lineHeight),
    outline: 0,
    textAlign: "center",
    textDecoration: "none",
    verticalAlign: "middle",
    whiteSpace: "nowrap",
    ...appearance('none'),
    ...userSelect('none'),
    ...controlBorder(),
    ...controlPaddings(),
    ...controlTransition(),
    ...nest([
        and([ ':focus', '.focus' ],  {
            background: "#f1f1fc",
            borderColor: "#4b48d6",
            textDecoration: "none",
            ... controlShadow(),
        }),
        and([ ':hover', '.hover' ], {
            background: "#f1f1fc",
            borderColor: "#4b48d6",
            textDecoration: "none"
        }),
        and([ ':active', '.active' ], {
            background: "#4b48d6",
            borderColor: "#3634d2",
            color: "#fff",
            textDecoration: "none",
            ...nest([
                and('&.loading::after',{
                    borderBottomColor: "#fff",
                    borderLeftColor: "#fff"
                })
            ])
        }),
        and(".btn-primary", {
            background: "#5755d9",
            borderColor: "#4b48d6",
            color: "#fff",
            ...nest([
                and([':focus',':hover'],{
                    background: "#4240d4",
                    borderColor: "#3634d2",
                    color: "#fff"
                })
            ])
        })
    ])
});
cssRule('.btn.disabled,.btn:disabled,.btn[disabled]', {
    "cursor": "default",
    "opacity": 0.5,
    "pointerEvents": "none"
});
cssRule('.btn.btn-primary.active,.btn.btn-primary:active', {
    "background": "#3a38d2",
    "borderColor": "#302ecd",
    "color": "#fff"
});
cssRule('.btn.btn-primary.loading::after', {
    "borderBottomColor": "#fff",
    "borderLeftColor": "#fff"
});
cssRule('.btn.btn-success', {
    "background": "#32b643",
    "borderColor": "#2faa3f",
    "color": "#fff"
});
cssRule('.btn.btn-success:focus', {
    "boxShadow": "0 0 0 .1rem rgba(50,182,67,.2)"
});
cssRule('.btn.btn-success:focus,.btn.btn-success:hover', {
    "background": "#30ae40",
    "borderColor": "#2da23c",
    "color": "#fff"
});
cssRule('.btn.btn-success.active,.btn.btn-success:active', {
    "background": "#2a9a39",
    "borderColor": "#278e34",
    "color": "#fff"
});
cssRule('.btn.btn-success.loading::after', {
    "borderBottomColor": "#fff",
    "borderLeftColor": "#fff"
});
cssRule('.btn.btn-error', {
    "background": "#e85600",
    "borderColor": "#d95000",
    "color": "#fff"
});
cssRule('.btn.btn-error:focus', {
    "boxShadow": "0 0 0 .1rem rgba(232,86,0,.2)"
});
cssRule('.btn.btn-error:focus,.btn.btn-error:hover', {
    "background": "#de5200",
    "borderColor": "#cf4d00",
    "color": "#fff"
});
cssRule('.btn.btn-error.active,.btn.btn-error:active', {
    "background": "#c44900",
    "borderColor": "#b54300",
    "color": "#fff"
});
cssRule('.btn.btn-error.loading::after', {
    "borderBottomColor": "#fff",
    "borderLeftColor": "#fff"
});
cssRule('.btn.btn-link', {
    "background": "0 0",
    "borderColor": "transparent",
    "color": "#5755d9"
});
cssRule('.btn.btn-link.active,.btn.btn-link:active,.btn.btn-link:focus,.btn.btn-link:hover', {
    "color": "#4240d4"
});
cssRule('.btn.btn-sm', {
    "fontSize": ".7rem",
    "height": "1.4rem",
    "padding": ".15rem .3rem"
});
cssRule('.btn.btn-lg', {
    "fontSize": ".9rem",
    "height": "2rem",
    "padding": ".45rem .6rem"
});
cssRule('.btn.btn-block', {
    "display": "block",
    "width": "100%"
});
cssRule('.btn.btn-action', {
    "paddingLeft": 0,
    "paddingRight": 0,
    "width": "1.8rem"
});
cssRule('.btn.btn-action.btn-sm', {
    "width": "1.4rem"
});
cssRule('.btn.btn-action.btn-lg', {
    "width": "2rem"
});
cssRule('.btn.btn-clear', {
    "background": "0 0",
    "border": 0,
    "color": "currentColor",
    "height": ".8rem",
    "lineHeight": ".8rem",
    "marginLeft": ".2rem",
    "marginRight": "-2px",
    "opacity": 1,
    "padding": 0,
    "textDecoration": "none",
    "width": ".8rem"
});
cssRule('.btn.btn-clear:hover', {
    "opacity": 0.95
});
cssRule('.btn.btn-clear::before', {
    "content": "\"\\2715\""
});
cssRule('.btn-group', {
    "display": [
        "inline-flex",
        "-ms-inline-flexbox"
    ],
    "-ms-flex-wrap": "wrap",
    "flexWrap": "wrap"
});
cssRule('.btn-group .btn', {
    "-ms-flex": "1 0 auto",
    "flex": "1 0 auto"
});
cssRule('.btn-group .btn:first-child:not(:last-child)', {
    "borderBottomRightRadius": 0,
    "borderTopRightRadius": 0
});
cssRule('.btn-group .btn:not(:first-child):not(:last-child)', {
    "borderRadius": 0,
    "marginLeft": "-.05rem"
});
cssRule('.btn-group .btn:last-child:not(:first-child)', {
    "borderBottomLeftRadius": 0,
    "borderTopLeftRadius": 0,
    "marginLeft": "-.05rem"
});
cssRule('.btn-group .btn.active,.btn-group .btn:active,.btn-group .btn:focus,.btn-group .btn:hover', {
    "zIndex": 1
});
cssRule('.btn-group.btn-group-block', {
    "display": [
        "flex",
        "-ms-flexbox"
    ]
});
cssRule('.btn-group.btn-group-block .btn', {
    "-ms-flex": "1 0 0",
    "flex": "1 0 0"
});