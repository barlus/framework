import { cssRule } from '../../styles/index';

cssRule('.meter', {
    $unique:true,
    "-webkit-appearance": "none",
    "-moz-appearance": "none",
    "appearance": "none",
    "background": "#f8f9fa",
    "border": 0,
    "borderRadius": ".1rem",
    "display": "block",
    "height": ".8rem",
    "width": "100%"
});
cssRule('.meter::-webkit-meter-inner-element', {
    $unique:true,
    "display": "block"
});
cssRule('.meter::-webkit-meter-bar,.meter::-webkit-meter-even-less-good-value,.meter::-webkit-meter-optimum-value,.meter::-webkit-meter-suboptimum-value', {
    $unique:true,
    "borderRadius": ".1rem"
});
cssRule('.meter::-webkit-meter-bar', {
    $unique:true,
    "background": "#f8f9fa"
});
cssRule('.meter::-webkit-meter-optimum-value', {
    $unique:true,
    "background": "#32b643"
});
cssRule('.meter::-webkit-meter-suboptimum-value', {
    $unique:true,
    "background": "#ffb700"
});
cssRule('.meter::-webkit-meter-even-less-good-value', {
    $unique:true,
    "background": "#e85600"
});
cssRule('.meter:-moz-meter-optimum,.meter:-moz-meter-sub-optimum,.meter:-moz-meter-sub-sub-optimum,.meter::-moz-meter-bar', {
    $unique:true,
    "borderRadius": ".1rem"
});
cssRule('.meter:-moz-meter-optimum::-moz-meter-bar', {
    $unique:true,
    "background": "#32b643"
});
cssRule('.meter:-moz-meter-sub-optimum::-moz-meter-bar', {
    $unique:true,
    "background": "#ffb700"
});
cssRule('.meter:-moz-meter-sub-sub-optimum::-moz-meter-bar', {
    $unique:true,
    "background": "#e85600"
});
