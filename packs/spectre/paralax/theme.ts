import { cssRule } from '@barlus/styles';
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
