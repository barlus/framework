import {cssRule, fontFace} from '@barlus/styles';


cssRule('.version::after', {
  "content": "\"0.5.1\""
});
cssRule('.off-canvas .off-canvas-toggle', {
  "fontSize": "1rem",
  "left": "1.5rem",
  "position": "fixed",
  "top": "1rem"
});
cssRule('.off-canvas .off-canvas-sidebar', {
  "width": "12rem"
});
cssRule('.docs-navbar', {
  "height": "3.8rem",
  "position": "fixed",
  "right": 0,
  "top": 0,
  "zIndex": 100
});
cssRule('.docs-navbar .btn', {
  "position": "absolute",
  "right": "1.5rem",
  "top": "1rem"
});
cssRule('.docs-sidebar .docs-nav', {
  "bottom": "1.5rem",
  "-webkit-overflow-scrolling": "touch",
  "overflowY": "auto",
  "padding": ".5rem 1.5rem",
  "position": "fixed",
  "top": "3.5rem",
  "width": "12rem"
});
cssRule('.docs-sidebar .accordion', {
  "marginBottom": ".75rem"
});
cssRule('.docs-sidebar .accordion input~.accordion-header', {
  "color": "#5b657a",
  "fontSize": ".65rem",
  "fontWeight": 600,
  "textTransform": "uppercase"
});
cssRule('.docs-sidebar .accordion input:checked~.accordion-header', {
  "color": "#667189"
});
cssRule('.docs-sidebar .accordion .menu .menu-item', {
  "fontSize": ".7rem",
  "paddingLeft": "1rem"
});
cssRule('.docs-sidebar .accordion .menu .menu-item>a', {
  "background": "0 0",
  "color": "#667189",
  "display": "inline-block"
});
cssRule('.docs-content', {
  "-ms-flex": "1 1 auto",
  "flex": "1 1 auto",
  "width": "calc(100vw - 12rem)"
});
cssRule('.docs-content.off-canvas-content', {
  "padding": "0 4rem"
});
cssRule('.docs-content>.container', {
  "marginLeft": 0,
  "maxWidth": "800px",
  "paddingBottom": "1.5rem"
});
cssRule('.docs-content .anchor', {
  "color": "#6362dc",
  "height": 0,
  "marginLeft": "-2em",
  "overflow": "hidden",
  "padding": "0 1em",
  "position": "absolute",
  "textAlign": "center",
  "width": 0,
  "zIndex": 100
});
cssRule('.docs-content .anchor:focus,.docs-content .anchor:hover', {
  "boxShadow": "none",
  "height": "auto",
  "textDecoration": "none",
  "width": "2em"
});
cssRule('.docs-content .s-subtitle,.docs-content .s-title', {
  "color": "#414857",
  "lineHeight": "1.8rem",
  "marginBottom": 0,
  "paddingBottom": "1rem",
  "paddingTop": "1rem",
  "position": "static"
});
cssRule('.docs-content .s-subtitle:hover .anchor,.docs-content .s-title:hover .anchor', {
  "height": "auto",
  "width": "1em"
});
cssRule('.docs-content .s-subtitle+.docs-note,.docs-content .s-title+.docs-note', {
  "marginTop": ".4rem"
});
cssRule('.docs-content .docs-note', {
  "margin": "1.5rem 0",
  border: `0.1rem dotted #bdbd47`,
  padding: `0.5rem`,
  backgroundColor: `#ffffed`,
  [ "p" as '*' ]: {
    margin: 0
  }

});
cssRule('.docs-content .docs-ad', {
  "background": "#f8f9fa",
  "borderRadius": ".1rem",
  "display": "inline-block",
  "padding": ".4rem",
  "position": "relative"
});
cssRule('.docs-content .docs-ad::before', {
  "color": "#acb3c2",
  "content": "\"AD\"",
  "fontSize": ".7rem",
  "position": "absolute",
  "right": ".4rem",
  "top": ".1rem"
});
cssRule('.docs-content .docs-ad.docs-ad-sidebar::before', {
  "content": "none"
});
cssRule('.docs-content .carbon-wrap .carbon-img', {
  "display": "block"
});
cssRule('.docs-content .carbon-wrap .carbon-text', {
  "color": "#667189",
  "display": "block",
  "fontSize": ".7rem"
});
cssRule('.docs-content .carbon-poweredby', {
  "color": "#acb3c2",
  "fontSize": ".7rem"
});
cssRule('.docs-content .column', {
  "padding": ".4rem"
});
cssRule('.docs-content .docs-block', {
  "borderRadius": ".1rem",
  "padding": ".4rem"
});
cssRule('.docs-content .docs-block.bg-gray', {
  "background": "#f0f1f4"
});
cssRule('.docs-content .docs-shape', {
  "height": "4.8rem",
  "lineHeight": "1.2rem",
  "padding": "1.8rem 0",
  "width": "4.8rem"
});
cssRule('.docs-content .docs-dot', {
  "borderRadius": "50%",
  "display": "inline-block",
  "height": ".5rem",
  "padding": 0,
  "width": ".5rem"
});
cssRule('.docs-content .docs-table td,.docs-content .docs-table th', {
  "padding": ".75rem .25rem"
});
cssRule('.docs-content .docs-color', {
  "borderRadius": ".1rem",
  "margin": ".25rem 0",
  "padding": ".5rem"
});
cssRule('.docs-content .docs-color .color-subtitle', {
  "fontSize": ".7rem",
  "opacity": 0.75
});
cssRule('.docs-content .code', {
  "color": "#667189"
});
cssRule('.docs-content .code .com', {
  "color": "#acb3c2"
});
cssRule('.docs-content .code .tag', {
  "color": "#5755d9"
});
cssRule('.docs-content .code .atn', {
  "color": "#667189"
});
cssRule('.docs-content .code .atv', {
  "color": "#e06870"
});
cssRule('.docs-content .code[data-lang=Bash] .tag', {
  "marginRight": "1em",
  "-webkit-user-select": "none",
  "-moz-user-select": "none",
  "-ms-user-select": "none",
  "userSelect": "none"
});
cssRule('.docs-content .panel', {
  "height": "75vh"
});
cssRule('.docs-content .panel .tile', {
  "margin": ".75rem 0"
});
cssRule('.docs-content .parallax', {
  "margin": "2rem auto"
});
cssRule('.docs-content .form-autocomplete .menu', {
  "position": "static"
});
cssRule('.docs-content .example-tile-icon', {
  "alignContent": "space-around",
  "alignItems": "center",
  "background": "#5755d9",
  "borderRadius": ".1rem",
  "color": "#fff",
  "display": [
    "flex",
    "-ms-flexbox"
  ],
  "fontSize": "1.2rem",
  "height": "2rem",
  "width": "2rem"
});
cssRule('.docs-content .example-tile-icon .icon', {
  "margin": "auto"
});
cssRule('.docs-content .comparison-slider', {
  "height": "auto",
  "paddingBottom": "56.2222%"
});
cssRule('.docs-content .comparison-slider .filter-grayscale', {
  "filter": "grayscale(75%)"
});
cssRule('.docs-content .off-canvas', {
  "position": "relative"
});
cssRule('.docs-content .off-canvas .off-canvas-toggle', {
  "left": ".4rem",
  "position": "absolute",
  "top": ".4rem",
  "zIndex": 1
});
cssRule('.docs-brand', {
  "color": "#5755d9",
  "left": "1.5rem",
  "position": "fixed",
  "top": ".85rem"
});
cssRule('.docs-brand .docs-logo', {
  "alignItems": "center",
  "borderRadius": ".1rem",
  "display": [
    "inline-flex",
    "-ms-inline-flexbox"
  ],
  "height": "2rem",
  "padding": ".2rem",
  "width": "auto"
});
cssRule('.docs-brand .docs-logo:focus,.docs-brand .docs-logo:hover', {
  "textDecoration": "none"
});
cssRule('.docs-brand .docs-logo img', {
  "display": "inline",
  "height": "auto",
  "width": "1.6rem"
});
cssRule('.docs-brand .docs-logo h2', {
  "display": "inline",
  "fontSize": ".8rem",
  "fontWeight": 700,
  "lineHeight": "1.5rem",
  "marginBottom": 0,
  "marginLeft": ".5rem",
  "marginRight": ".5rem"
});
cssRule('.docs-footer', {
  "color": "#acb3c2",
  "padding": ".5rem .5rem 1.5rem .5rem"
});
cssRule('.docs-footer a', {
  "color": "#667189"
});
cssRule('.btn .feather', {
  "height": "1rem",
  "verticalAlign": "middle"
});
cssRule('.section-hero', {
  "padding": "1rem .5rem"
});
cssRule('.section-hero .docs-brand', {
  "position": "absolute",
  "top": ".85rem"
});
cssRule('.section-hero .docs-brand h2', {
  "color": "#5755d9"
});
cssRule('.section-hero .column', {
  "padding": ".4rem"
});
cssRule('.section-updates', {
  "padding": "4.5rem .5rem 3.5rem .5rem"
});
cssRule('.section-updates .card', {
  "border": 0,
  "color": "#727e96",
  "marginBottom": "1rem"
});
cssRule('.section-features', {
  "padding": "4.5rem .5rem"
});
cssRule('.section-features .column', {
  "padding": ".4rem"
});
cssRule('.section-footer', {
  "color": "#acb3c2",
  "padding": "1.8rem .75rem 1rem .75rem",
  "position": "relative",
  "zIndex": 200
});
cssRule('.section-footer a', {
  "color": "#667189"
});
cssRule('.grid-hero', {
  "paddingBottom": "2rem",
  "paddingTop": "6rem"
});
cssRule('.grid-hero h1', {
  "color": "#50596c",
  "fontSize": "1.6rem",
  "marginBottom": "1.5rem"
});
cssRule('.grid-hero h2', {
  "color": "#5b657a",
  "fontSize": ".9rem",
  "fontWeight": 400,
  "lineHeight": "1.5rem",
  "marginBottom": "1.5rem"
});
cssRule('.grid-hero h2 u', {
  "borderBottom": ".1rem solid currentColor",
  "paddingBottom": ".05rem",
  "textDecoration": "none"
});
cssRule('.grid-hero .card', {
  "background": "0 0",
  "border": 0,
  "color": "#727e96",
  "padding": ".5rem"
});
cssRule('.grid-hero .card .card-title', {
  "color": "#5755d9",
  "fontSize": ".9rem",
  "marginBottom": 0
});
cssRule('@media (max-width:960px)', {
  "$nest": {
    ".off-canvas .off-canvas-toggle": {
      "zIndex": 300
    },
    ".docs-sidebar .docs-brand": {
      "margin": ".85rem 1.5rem",
      "padding": 0,
      "position": "static"
    },
    ".docs-sidebar .docs-nav": {
      "marginTop": "1rem",
      "position": "static"
    },
    ".docs-sidebar .menu .menu-item>a": {
      "padding": ".3rem .4rem"
    },
    ".docs-navbar": {
      "-webkit-backdrop-filter": "blur(5px)",
      "backdropFilter": "blur(5px)",
      "background": "rgba(248,249,250,.65)",
      "left": 0
    },
    ".docs-content.off-canvas-content": {
      "minWidth": "auto",
      "padding": "0 1.5rem",
      "width": "100%"
    },
    ".docs-content .s-subtitle,.docs-content .s-title": {
      "paddingTop": "5rem",
      "position": "static"
    },
    ".docs-content .s-subtitle::before,.docs-content .s-title::before": {
      "content": "none"
    },
    ".section-hero .s-brand": {
      "height": "5rem",
      "padding": "1.5rem .5rem",
      "textAlign": "center",
      "width": "100%"
    },
    ".section-hero .s-brand .s-logo": {
      "height": "auto"
    },
    ".section-hero .s-brand img": {
      "height": "3.2rem",
      "width": "3.2rem"
    },
    ".section-hero .s-brand h2": {
      "display": "none"
    }
  }
});
cssRule('@media (max-width:600px)', {
  "$nest": {
    ".grid-hero h2": {
      "fontSize": ".9rem"
    },
    ".grid-hero .card": {
      "padding": 0
    },
    ".off-canvas .off-canvas-toggle": {
      "left": ".5rem"
    },
    ".docs-navbar .btn": {
      "right": "1rem"
    },
    ".grid-hero .docs-brand": {
      "left": "1rem"
    },
    ".docs-sidebar .docs-brand": {
      "margin": ".85rem 1rem"
    },
    ".docs-sidebar .docs-nav": {
      "padding": ".5rem 1rem"
    },
    ".docs-content.off-canvas-content": {
      "padding": "0 .5rem"
    },
    ".docs-content .docs-block": {
      "padding": ".4rem .1rem"
    },
    ".docs-content .anchor": {
      "display": "none"
    }
  }
});
cssRule('@media (min-width:1366px)', {
  "$nest": {
    ".docs-ad.docs-ad-sidebar": {
      "bottom": "1rem",
      "position": "fixed",
      "right": "1rem",
      "width": "7.3rem"
    }
  }
});
cssRule('.hljs', {
  display: 'block',
  overflowX: 'auto',
  padding: '1em',
  background: '#f8f9fa',
  color: '#5b5861',
});
cssRule('.hljs-comment,.hljs-quote,.hljs-variable', {
  color: '#71b734'
});
cssRule('.hljs-keyword,.hljs-selector-tag,.hljs-built_in,.hljs-name,.hljs-tag', {
  color: '#207cc1'
});
cssRule('.hljs-string,.hljs-title,.hljs-section,.hljs-attribute,.hljs-literal,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-addition', {
  color: '#a31515'
});
cssRule('.hljs-deletion,.hljs-selector-attr,.hljs-selector-pseudo,.hljs-meta', {
  color: '#2b91af'
});
cssRule('.hljs-doctag', {
  color: '#808080'
});
cssRule('.hljs-attr', {
  color: '#47bbd0'
});
cssRule('.hljs-symbol,.hljs-bullet,.hljs-link', {
  color: '#00b0e8'
});
cssRule('.hljs-emphasis', {
  fontStyle: 'italic'
});
cssRule('.hljs-strong', {
  fontWeight: 'bold'
});


