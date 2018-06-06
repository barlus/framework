import { cssRule } from '@barlus/styles';

cssRule('.progress', {

    "-webkit-appearance": "none",
    "-moz-appearance": "none",
    "appearance": "none",
    "background": "#f0f1f4",
    "border": 0,
    "borderRadius": ".1rem",
    "color": "#5755d9",
    "height": ".2rem",
    "position": "relative",
    "width": "100%"
});
cssRule('.progress::-webkit-progress-bar', {
    $unique:true,
    "background": "0 0",
    "borderRadius": ".1rem"
});
cssRule('.progress::-webkit-progress-value', {
    $unique:true,
    "background": "#5755d9",
    "borderRadius": ".1rem"
});
cssRule('.progress::-moz-progress-bar', {
    $unique:true,
    "background": "#5755d9",
    "borderRadius": ".1rem"
});
cssRule('.progress:indeterminate', {
    $unique:true,
    "animation": "progress-indeterminate 1.5s linear infinite",
    "background": "#f0f1f4 linear-gradient(to right,#5755d9 30%,#f0f1f4 30%) top left/150% 150% no-repeat"
});
cssRule('.progress:indeterminate::-moz-progress-bar', {
    $unique:true,
    "background": "0 0"
});

