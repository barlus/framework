import { cssRule } from '../../styles/index';

cssRule('.slider', {
    $unique:true,
    "-webkit-appearance": "none",
    "-moz-appearance": "none",
    "appearance": "none",
    "background": "0 0",
    "display": "block",
    "height": "1.2rem",
    "width": "100%"
});
cssRule('.slider:focus', {
    $unique:true,
    "boxShadow": "0 0 0 .1rem rgba(87,85,217,.2)",
    "outline": 0
});
cssRule('.slider.tooltip:not([data-tooltip])::after', {
    $unique:true,
    "content": "attr(value)"
});
cssRule('.slider::-webkit-slider-thumb', {
    $unique:true,
    "-webkit-appearance": "none",
    "background": "#5755d9",
    "border": 0,
    "borderRadius": "50%",
    "height": ".6rem",
    "marginTop": "-.25rem",
    "transition": "transform .2s ease",
    "width": ".6rem"
});
cssRule('.slider::-moz-range-thumb', {
    $unique:true,
    "background": "#5755d9",
    "border": 0,
    "borderRadius": "50%",
    "height": ".6rem",
    "transition": "transform .2s ease",
    "width": ".6rem"
});
cssRule('.slider::-ms-thumb', {
    $unique:true,
    "background": "#5755d9",
    "border": 0,
    "borderRadius": "50%",
    "height": ".6rem",
    "transition": "transform .2s ease",
    "width": ".6rem"
});
cssRule('.slider:active::-webkit-slider-thumb', {
    $unique:true,
    "transform": "scale(1.25)"
});
cssRule('.slider:active::-moz-range-thumb', {
    $unique:true,
    "transform": "scale(1.25)"
});
cssRule('.slider:active::-ms-thumb', {
    $unique:true,
    "transform": "scale(1.25)"
});
cssRule('.slider.disabled::-webkit-slider-thumb,.slider:disabled::-webkit-slider-thumb', {
    $unique:true,
    "background": "#e7e9ed",
    "transform": "scale(1)"
});
cssRule('.slider.disabled::-moz-range-thumb,.slider:disabled::-moz-range-thumb', {
    $unique:true,
    "background": "#e7e9ed",
    "transform": "scale(1)"
});
cssRule('.slider.disabled::-ms-thumb,.slider:disabled::-ms-thumb', {
    $unique:true,
    "background": "#e7e9ed",
    "transform": "scale(1)"
});
cssRule('.slider::-webkit-slider-runnable-track', {
    $unique:true,
    "background": "#f0f1f4",
    "borderRadius": ".1rem",
    "height": ".1rem",
    "width": "100%"
});
cssRule('.slider::-moz-range-track', {
    $unique:true,
    "background": "#f0f1f4",
    "borderRadius": ".1rem",
    "height": ".1rem",
    "width": "100%"
});
cssRule('.slider::-ms-track', {
    $unique:true,
    "background": "#f0f1f4",
    "borderRadius": ".1rem",
    "height": ".1rem",
    "width": "100%"
});
cssRule('.slider::-ms-fill-lower', {
    $unique:true,
    "background": "#5755d9"
});
