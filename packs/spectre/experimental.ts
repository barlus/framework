import { cssRule, fontFace } from '@barlus/styles';


cssRule('.form-autocomplete', {
    "position": "relative"
});
cssRule('.form-autocomplete .form-autocomplete-input', {
    "alignContent": "flex-start",
    "display": [
        "flex",
        "-ms-flexbox"
    ],
    "-ms-flex-line-pack": "start",
    "-ms-flex-wrap": "wrap",
    "flexWrap": "wrap",
    "height": "auto",
    "minHeight": "1.6rem",
    "padding": ".1rem"
});
cssRule('.form-autocomplete .form-autocomplete-input.is-focused', {
    "borderColor": "#5755d9",
    "boxShadow": "0 0 0 .1rem rgba(87,85,217,.2)"
});
cssRule('.form-autocomplete .form-autocomplete-input .form-input', {
    "borderColor": "transparent",
    "boxShadow": "none",
    "display": "inline-block",
    "-ms-flex": "1 0 auto",
    "flex": "1 0 auto",
    "height": "1.2rem",
    "lineHeight": ".8rem",
    "margin": ".1rem",
    "width": "auto"
});
cssRule('.form-autocomplete .menu', {
    "left": 0,
    "position": "absolute",
    "top": "100%",
    "width": "100%"
});
cssRule('.form-autocomplete.autocomplete-oneline .form-autocomplete-input', {
    "-ms-flex-wrap": "nowrap",
    "flexWrap": "nowrap",
    "overflowX": "auto"
});
cssRule('.form-autocomplete.autocomplete-oneline .chip', {
    "-ms-flex": "1 0 auto",
    "flex": "1 0 auto"
});
cssRule('.calendar', {
    "border": ".05rem solid #e7e9ed",
    "borderRadius": ".1rem",
    "display": "block",
    "minWidth": "280px"
});
cssRule('.calendar .calendar-nav', {
    "alignItems": "center",
    "background": "#f8f9fa",
    "borderTopLeftRadius": ".1rem",
    "borderTopRightRadius": ".1rem",
    "display": [
        "flex",
        "-ms-flexbox"
    ],
    "-ms-flex-align": "center",
    "fontSize": ".9rem",
    "padding": ".4rem"
});
cssRule('.calendar .calendar-body,.calendar .calendar-header', {
    "display": [
        "flex",
        "-ms-flexbox"
    ],
    "-ms-flex-pack": "center",
    "-ms-flex-wrap": "wrap",
    "flexWrap": "wrap",
    "justifyContent": "center",
    "padding": ".4rem 0"
});
cssRule('.calendar .calendar-body .calendar-date,.calendar .calendar-header .calendar-date', {
    "-ms-flex": "0 0 14.28%",
    "flex": "0 0 14.28%",
    "maxWidth": "14.28%"
});
cssRule('.calendar .calendar-header', {
    "background": "#f8f9fa",
    "borderBottom": ".05rem solid #e7e9ed",
    "color": "#acb3c2",
    "fontSize": ".7rem",
    "textAlign": "center"
});
cssRule('.calendar .calendar-body', {
    "color": "#667189"
});
cssRule('.calendar .calendar-date', {
    "border": 0,
    "padding": ".2rem"
});
cssRule('.calendar .calendar-date .date-item', {
    "-webkit-appearance": "none",
    "-moz-appearance": "none",
    "appearance": "none",
    "background": "0 0",
    "border": ".05rem solid transparent",
    "borderRadius": "50%",
    "color": "#667189",
    "cursor": "pointer",
    "fontSize": ".7rem",
    "height": "1.4rem",
    "lineHeight": "1rem",
    "outline": 0,
    "padding": ".1rem",
    "position": "relative",
    "textAlign": "center",
    "textDecoration": "none",
    "transition": "all .2s ease",
    "verticalAlign": "middle",
    "whiteSpace": "nowrap",
    "width": "1.4rem"
});
cssRule('.calendar .calendar-date .date-item.date-today', {
    "borderColor": "#e5e5f9",
    "color": "#5755d9"
});
cssRule('.calendar .calendar-date .date-item:focus', {
    "boxShadow": "0 0 0 .1rem rgba(87,85,217,.2)"
});
cssRule('.calendar .calendar-date .date-item:focus,.calendar .calendar-date .date-item:hover', {
    "background": "#fefeff",
    "borderColor": "#e5e5f9",
    "color": "#5755d9",
    "textDecoration": "none"
});
cssRule('.calendar .calendar-date .date-item.active,.calendar .calendar-date .date-item:active', {
    "background": "#4b48d6",
    "borderColor": "#3634d2",
    "color": "#fff"
});
cssRule('.calendar .calendar-date .date-item.badge::after', {
    "position": "absolute",
    "right": "3px",
    "top": "3px",
    "transform": "translate(50%,-50%)"
});
cssRule('.calendar .calendar-date .calendar-event:disabled,.calendar .calendar-date .date-item:disabled,.calendar .calendar-date.disabled .calendar-event,.calendar .calendar-date.disabled .date-item', {
    "cursor": "default",
    "opacity": 0.25,
    "pointerEvents": "none"
});
cssRule('.calendar .calendar-range', {
    "position": "relative"
});
cssRule('.calendar .calendar-range::before', {
    "background": "#f1f1fc",
    "content": "\"\"",
    "height": "1.4rem",
    "left": 0,
    "position": "absolute",
    "right": 0,
    "top": "50%",
    "transform": "translateY(-50%)"
});
cssRule('.calendar .calendar-range.range-start::before', {
    "left": "50%"
});
cssRule('.calendar .calendar-range.range-end::before', {
    "right": "50%"
});
cssRule('.calendar .calendar-range .date-item', {
    "color": "#5755d9"
});
cssRule('.calendar.calendar-lg .calendar-body', {
    "padding": 0
});
cssRule('.calendar.calendar-lg .calendar-body .calendar-date', {
    "borderBottom": ".05rem solid #e7e9ed",
    "borderRight": ".05rem solid #e7e9ed",
    "display": [
        "flex",
        "-ms-flexbox"
    ],
    "-ms-flex-direction": "column",
    "flexDirection": "column",
    "height": "5.5rem",
    "padding": 0
});
cssRule('.calendar.calendar-lg .calendar-body .calendar-date:nth-child(7n)', {
    "borderRight": 0
});
cssRule('.calendar.calendar-lg .calendar-body .calendar-date:nth-last-child(-n+7)', {
    "borderBottom": 0
});
cssRule('.calendar.calendar-lg .date-item', {
    "alignSelf": "flex-end",
    "-ms-flex-item-align": "end",
    "height": "1.4rem",
    "marginRight": ".2rem",
    "marginTop": ".2rem"
});
cssRule('.calendar.calendar-lg .calendar-range::before', {
    "top": "19px"
});
cssRule('.calendar.calendar-lg .calendar-range.range-start::before', {
    "left": "auto",
    "width": "19px"
});
cssRule('.calendar.calendar-lg .calendar-range.range-end::before', {
    "right": "19px"
});
cssRule('.calendar.calendar-lg .calendar-events', {
    "flexGrow": 1,
    "-ms-flex-positive": 1,
    "lineHeight": 1,
    "overflowY": "auto",
    "padding": ".2rem"
});
cssRule('.calendar.calendar-lg .calendar-event', {
    "borderRadius": ".1rem",
    "display": "block",
    "fontSize": ".7rem",
    "margin": ".1rem auto",
    "overflow": "hidden",
    "padding": "3px 4px",
    "textOverflow": "ellipsis",
    "whiteSpace": "nowrap"
});
cssRule('.carousel', {
    "background": "#f8f9fa",
    "display": "block",
    "overflow": "hidden",
    "-webkit-overflow-scrolling": "touch",
    "position": "relative",
    "width": "100%",
    "zIndex": 1
});
cssRule('.carousel .carousel-container', {
    "height": "100%",
    "left": 0,
    "position": "relative"
});
cssRule('.carousel .carousel-container::before', {
    "content": "\"\"",
    "display": "block",
    "paddingBottom": "56.25%"
});
cssRule('.carousel .carousel-container .carousel-item', {
    "animation": "carousel-slideout 1s ease-in-out 1",
    "height": "100%",
    "left": 0,
    "margin": 0,
    "opacity": 0,
    "position": "absolute",
    "top": 0,
    "width": "100%"
});
cssRule('.carousel .carousel-container .carousel-item:hover .item-next,.carousel .carousel-container .carousel-item:hover .item-prev', {
    "opacity": 1
});
cssRule('.carousel .carousel-container .item-next,.carousel .carousel-container .item-prev', {
    "background": "rgba(231,233,237,.25)",
    "borderColor": "rgba(231,233,237,.5)",
    "color": "#e7e9ed",
    "opacity": 0,
    "position": "absolute",
    "top": "50%",
    "transform": "translateY(-50%)",
    "transition": "all .4s ease",
    "zIndex": 100
});
cssRule('.carousel .carousel-container .item-prev', {
    "left": "1rem"
});
cssRule('.carousel .carousel-container .item-next', {
    "right": "1rem"
});
cssRule('.carousel .carousel-locator:nth-of-type(1):checked~.carousel-container .carousel-item:nth-of-type(1),.carousel .carousel-locator:nth-of-type(2):checked~.carousel-container .carousel-item:nth-of-type(2),.carousel .carousel-locator:nth-of-type(3):checked~.carousel-container .carousel-item:nth-of-type(3),.carousel .carousel-locator:nth-of-type(4):checked~.carousel-container .carousel-item:nth-of-type(4)', {
    "animation": "carousel-slidein .75s ease-in-out 1",
    "opacity": 1,
    "zIndex": 100
});
cssRule('.carousel .carousel-locator:nth-of-type(1):checked~.carousel-nav .nav-item:nth-of-type(1),.carousel .carousel-locator:nth-of-type(2):checked~.carousel-nav .nav-item:nth-of-type(2),.carousel .carousel-locator:nth-of-type(3):checked~.carousel-nav .nav-item:nth-of-type(3),.carousel .carousel-locator:nth-of-type(4):checked~.carousel-nav .nav-item:nth-of-type(4)', {
    "color": "#e7e9ed"
});
cssRule('.carousel .carousel-nav', {
    "bottom": ".4rem",
    "display": [
        "flex",
        "-ms-flexbox"
    ],
    "-ms-flex-pack": "center",
    "justifyContent": "center",
    "left": "50%",
    "position": "absolute",
    "transform": "translateX(-50%)",
    "width": "10rem",
    "zIndex": 100
});
cssRule('.carousel .carousel-nav .nav-item', {
    "color": "rgba(231,233,237,.5)",
    "display": "block",
    "-ms-flex": "1 0 auto",
    "flex": "1 0 auto",
    "height": "1.6rem",
    "margin": ".2rem",
    "maxWidth": "2.5rem",
    "position": "relative"
});
cssRule('.carousel .carousel-nav .nav-item::before', {
    "background": "currentColor",
    "content": "\"\"",
    "display": "block",
    "height": ".1rem",
    "position": "absolute",
    "top": ".5rem",
    "width": "100%"
});
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
cssRule('.filter .filter-tag#tag-0:checked~.filter-nav .chip[for=tag-0],.filter .filter-tag#tag-1:checked~.filter-nav .chip[for=tag-1],.filter .filter-tag#tag-2:checked~.filter-nav .chip[for=tag-2],.filter .filter-tag#tag-3:checked~.filter-nav .chip[for=tag-3],.filter .filter-tag#tag-4:checked~.filter-nav .chip[for=tag-4],.filter .filter-tag#tag-5:checked~.filter-nav .chip[for=tag-5],.filter .filter-tag#tag-6:checked~.filter-nav .chip[for=tag-6],.filter .filter-tag#tag-7:checked~.filter-nav .chip[for=tag-7],.filter .filter-tag#tag-8:checked~.filter-nav .chip[for=tag-8]', {
    "background": "#5755d9",
    "color": "#fff"
});
cssRule('.filter .filter-tag#tag-1:checked~.filter-body .filter-item:not([data-tag~=tag-1]),.filter .filter-tag#tag-2:checked~.filter-body .filter-item:not([data-tag~=tag-2]),.filter .filter-tag#tag-3:checked~.filter-body .filter-item:not([data-tag~=tag-3]),.filter .filter-tag#tag-4:checked~.filter-body .filter-item:not([data-tag~=tag-4]),.filter .filter-tag#tag-5:checked~.filter-body .filter-item:not([data-tag~=tag-5]),.filter .filter-tag#tag-6:checked~.filter-body .filter-item:not([data-tag~=tag-6]),.filter .filter-tag#tag-7:checked~.filter-body .filter-item:not([data-tag~=tag-7]),.filter .filter-tag#tag-8:checked~.filter-body .filter-item:not([data-tag~=tag-8])', {
    "display": "none"
});
cssRule('.filter .filter-nav', {
    "margin": ".4rem 0"
});
cssRule('.filter .filter-body', {
    "display": [
        "flex",
        "-ms-flexbox"
    ],
    "-ms-flex-wrap": "wrap",
    "flexWrap": "wrap"
});
cssRule('.meter', {
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
    "display": "block"
});
cssRule('.meter::-webkit-meter-bar,.meter::-webkit-meter-even-less-good-value,.meter::-webkit-meter-optimum-value,.meter::-webkit-meter-suboptimum-value', {
    "borderRadius": ".1rem"
});
cssRule('.meter::-webkit-meter-bar', {
    "background": "#f8f9fa"
});
cssRule('.meter::-webkit-meter-optimum-value', {
    "background": "#32b643"
});
cssRule('.meter::-webkit-meter-suboptimum-value', {
    "background": "#ffb700"
});
cssRule('.meter::-webkit-meter-even-less-good-value', {
    "background": "#e85600"
});
cssRule('.meter:-moz-meter-optimum,.meter:-moz-meter-sub-optimum,.meter:-moz-meter-sub-sub-optimum,.meter::-moz-meter-bar', {
    "borderRadius": ".1rem"
});
cssRule('.meter:-moz-meter-optimum::-moz-meter-bar', {
    "background": "#32b643"
});
cssRule('.meter:-moz-meter-sub-optimum::-moz-meter-bar', {
    "background": "#ffb700"
});
cssRule('.meter:-moz-meter-sub-sub-optimum::-moz-meter-bar', {
    "background": "#e85600"
});
cssRule('.off-canvas', {
    "display": [
        "flex",
        "-ms-flexbox"
    ],
    "-ms-flex-flow": "nowrap",
    "flexFlow": "nowrap",
    "height": "100%",
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
    "padding": ".4rem .4rem .4rem 4rem"
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
cssRule('.off-canvas .off-canvas-sidebar.active,.off-canvas .off-canvas-sidebar:target', {
    "transform": "translateX(0)"
});
cssRule('.off-canvas .off-canvas-sidebar.active~.off-canvas-overlay,.off-canvas .off-canvas-sidebar:target~.off-canvas-overlay', {
    "display": "block",
    "zIndex": 100
});
cssRule('.parallax', {
    "display": "block",
    "height": "auto",
    "position": "relative",
    "width": "auto"
});
cssRule('.parallax .parallax-content', {
    "boxShadow": "0 1rem 2.1rem rgba(69,77,93,.3)",
    "height": "auto",
    "transform": "perspective(1000px)",
    "transformStyle": "preserve-3d",
    "transition": "all .4s ease",
    "width": "100%"
});
cssRule('.parallax .parallax-content::before', {
    "content": "\"\"",
    "display": "block",
    "height": "100%",
    "left": 0,
    "position": "absolute",
    "top": 0,
    "width": "100%"
});
cssRule('.parallax .parallax-front', {
    "alignItems": "center",
    "color": "#fff",
    "display": [
        "flex",
        "-ms-flexbox"
    ],
    "-ms-flex-align": "center",
    "-ms-flex-pack": "center",
    "height": "100%",
    "justifyContent": "center",
    "left": 0,
    "position": "absolute",
    "textAlign": "center",
    "textShadow": "0 0 20px rgba(69,77,93,.75)",
    "top": 0,
    "transform": "translateZ(50px) scale(.95)",
    "transition": "all .4s ease",
    "width": "100%",
    "zIndex": 1
});
cssRule('.parallax .parallax-top-left', {
    "height": "50%",
    "left": 0,
    "outline": 0,
    "position": "absolute",
    "top": 0,
    "width": "50%",
    "zIndex": 100
});
cssRule('.parallax .parallax-top-left:focus~.parallax-content,.parallax .parallax-top-left:hover~.parallax-content', {
    "transform": "perspective(1000px) rotateX(3deg) rotateY(-3deg)"
});
cssRule('.parallax .parallax-top-left:focus~.parallax-content::before,.parallax .parallax-top-left:hover~.parallax-content::before', {
    "background": "linear-gradient(135deg,rgba(255,255,255,.35) 0,transparent 50%)"
});
cssRule('.parallax .parallax-top-left:focus~.parallax-content .parallax-front,.parallax .parallax-top-left:hover~.parallax-content .parallax-front', {
    "transform": "translate3d(4.5px,4.5px,50px) scale(.95)"
});
cssRule('.parallax .parallax-top-right', {
    "height": "50%",
    "outline": 0,
    "position": "absolute",
    "right": 0,
    "top": 0,
    "width": "50%",
    "zIndex": 100
});
cssRule('.parallax .parallax-top-right:focus~.parallax-content,.parallax .parallax-top-right:hover~.parallax-content', {
    "transform": "perspective(1000px) rotateX(3deg) rotateY(3deg)"
});
cssRule('.parallax .parallax-top-right:focus~.parallax-content::before,.parallax .parallax-top-right:hover~.parallax-content::before', {
    "background": "linear-gradient(-135deg,rgba(255,255,255,.35) 0,transparent 50%)"
});
cssRule('.parallax .parallax-top-right:focus~.parallax-content .parallax-front,.parallax .parallax-top-right:hover~.parallax-content .parallax-front', {
    "transform": "translate3d(-4.5px,4.5px,50px) scale(.95)"
});
cssRule('.parallax .parallax-bottom-left', {
    "bottom": 0,
    "height": "50%",
    "left": 0,
    "outline": 0,
    "position": "absolute",
    "width": "50%",
    "zIndex": 100
});
cssRule('.parallax .parallax-bottom-left:focus~.parallax-content,.parallax .parallax-bottom-left:hover~.parallax-content', {
    "transform": "perspective(1000px) rotateX(-3deg) rotateY(-3deg)"
});
cssRule('.parallax .parallax-bottom-left:focus~.parallax-content::before,.parallax .parallax-bottom-left:hover~.parallax-content::before', {
    "background": "linear-gradient(45deg,rgba(255,255,255,.35) 0,transparent 50%)"
});
cssRule('.parallax .parallax-bottom-left:focus~.parallax-content .parallax-front,.parallax .parallax-bottom-left:hover~.parallax-content .parallax-front', {
    "transform": "translate3d(4.5px,-4.5px,50px) scale(.95)"
});
cssRule('.parallax .parallax-bottom-right', {
    "bottom": 0,
    "height": "50%",
    "outline": 0,
    "position": "absolute",
    "right": 0,
    "width": "50%",
    "zIndex": 100
});
cssRule('.parallax .parallax-bottom-right:focus~.parallax-content,.parallax .parallax-bottom-right:hover~.parallax-content', {
    "transform": "perspective(1000px) rotateX(-3deg) rotateY(3deg)"
});
cssRule('.parallax .parallax-bottom-right:focus~.parallax-content::before,.parallax .parallax-bottom-right:hover~.parallax-content::before', {
    "background": "linear-gradient(-45deg,rgba(255,255,255,.35) 0,transparent 50%)"
});
cssRule('.parallax .parallax-bottom-right:focus~.parallax-content .parallax-front,.parallax .parallax-bottom-right:hover~.parallax-content .parallax-front', {
    "transform": "translate3d(-4.5px,-4.5px,50px) scale(.95)"
});
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
    "background": "0 0",
    "borderRadius": ".1rem"
});
cssRule('.progress::-webkit-progress-value', {
    "background": "#5755d9",
    "borderRadius": ".1rem"
});
cssRule('.progress::-moz-progress-bar', {
    "background": "#5755d9",
    "borderRadius": ".1rem"
});
cssRule('.progress:indeterminate', {
    "animation": "progress-indeterminate 1.5s linear infinite",
    "background": "#f0f1f4 linear-gradient(to right,#5755d9 30%,#f0f1f4 30%) top left/150% 150% no-repeat"
});
cssRule('.progress:indeterminate::-moz-progress-bar', {
    "background": "0 0"
});
cssRule('.slider', {
    "-webkit-appearance": "none",
    "-moz-appearance": "none",
    "appearance": "none",
    "background": "0 0",
    "display": "block",
    "height": "1.2rem",
    "width": "100%"
});
cssRule('.slider:focus', {
    "boxShadow": "0 0 0 .1rem rgba(87,85,217,.2)",
    "outline": 0
});
cssRule('.slider.tooltip:not([data-tooltip])::after', {
    "content": "attr(value)"
});
cssRule('.slider::-webkit-slider-thumb', {
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
    "background": "#5755d9",
    "border": 0,
    "borderRadius": "50%",
    "height": ".6rem",
    "transition": "transform .2s ease",
    "width": ".6rem"
});
cssRule('.slider::-ms-thumb', {
    "background": "#5755d9",
    "border": 0,
    "borderRadius": "50%",
    "height": ".6rem",
    "transition": "transform .2s ease",
    "width": ".6rem"
});
cssRule('.slider:active::-webkit-slider-thumb', {
    "transform": "scale(1.25)"
});
cssRule('.slider:active::-moz-range-thumb', {
    "transform": "scale(1.25)"
});
cssRule('.slider:active::-ms-thumb', {
    "transform": "scale(1.25)"
});
cssRule('.slider.disabled::-webkit-slider-thumb,.slider:disabled::-webkit-slider-thumb', {
    "background": "#e7e9ed",
    "transform": "scale(1)"
});
cssRule('.slider.disabled::-moz-range-thumb,.slider:disabled::-moz-range-thumb', {
    "background": "#e7e9ed",
    "transform": "scale(1)"
});
cssRule('.slider.disabled::-ms-thumb,.slider:disabled::-ms-thumb', {
    "background": "#e7e9ed",
    "transform": "scale(1)"
});
cssRule('.slider::-webkit-slider-runnable-track', {
    "background": "#f0f1f4",
    "borderRadius": ".1rem",
    "height": ".1rem",
    "width": "100%"
});
cssRule('.slider::-moz-range-track', {
    "background": "#f0f1f4",
    "borderRadius": ".1rem",
    "height": ".1rem",
    "width": "100%"
});
cssRule('.slider::-ms-track', {
    "background": "#f0f1f4",
    "borderRadius": ".1rem",
    "height": ".1rem",
    "width": "100%"
});
cssRule('.slider::-ms-fill-lower', {
    "background": "#5755d9"
});
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
cssRule('@keyframes carousel-slidein', {
    "$nest": {
        "0%": {
            "transform": "translateX(100%)"
        },
        "100%": {
            "transform": "translateX(0)"
        }
    }
});
cssRule('@keyframes carousel-slideout', {
    "$nest": {
        "0%": {
            "opacity": 1,
            "transform": "translateX(0)"
        },
        "100%": {
            "opacity": 1,
            "transform": "translateX(-50%)"
        }
    }
});
cssRule('@keyframes first-run', {
    "$nest": {
        "0%": {
            "width": 0
        },
        "25%": {
            "width": "2.4rem"
        },
        "50%": {
            "width": ".8rem"
        },
        "75%": {
            "width": "1.2rem"
        },
        "100%": {
            "width": 0
        }
    }
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
cssRule('@keyframes progress-indeterminate', {
    "$nest": {
        "0%": {
            "backgroundPosition": "200% 0"
        },
        "100%": {
            "backgroundPosition": "-200% 0"
        }
    }
});
