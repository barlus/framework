import {
  $,
  deg,
  px,
  linearGradient,
  list,
  nest,
  color,
  CSSProperties,
  percent,
  perspective,
  rotateX,
  rotateY,
  s,
  scale,
  stylesheet,
  translate3d,
  translateZ,
} from "@barlus/styles"


export default Theme;
export const enum Theme {
  parallax = 'parallax',
  parallaxBottomLeft = 'parallax-bottom-left',
  parallaxBottomRight = 'parallax-bottom-right',
  parallaxContent = 'parallax-content',
  parallaxFront = 'parallax-front',
  parallaxTopLeft = 'parallax-top-left',
  parallaxTopRight = 'parallax-top-right',
}

const parallaxFadeColor = color('#ffffff');
const parallaxDir: CSSProperties = {
  height: percent(50),
  outline: 0,
  position: "absolute",
  width: percent(50),
  zIndex: 100
}
stylesheet('parallax.ts')('', {
  ...nest([ `.${Theme.parallax}` ], {
    display: 'block',
    height: 'auto',
    position: 'relative',
    width: 'auto',
    ...nest([ `.${Theme.parallaxContent}` ], {
      boxShadow: "0 1rem 2.1rem rgba(69,77,93,.3)",
      height: 'auto',
      transform: perspective(px(1000)),
      transformStyle: 'preserve-3d',
      transition: list('all', s(.4), 'ease'),
      width: percent(100),
      ...nest([ `&::before` ], {
        content: "\"\"",
        display: 'block',
        height: percent(100),
        left: 0,
        position: 'absolute',
        top: 0,
        width: percent(100),
      }),
    }),
    ...nest([ `.${Theme.parallaxFront}` ], {
      alignItems: 'center',
      color: $.lightColor.rgba,
      display: 'flex',
      height: percent(100),
      justifyContent: 'center',
      left: 0,
      position: 'absolute',
      textAlign: 'center',
      textShadow: list(0, 0, 20, $.darkColor.fade(.75)),
      top: 0,
      transform: list(translateZ(px(50)), scale(.95)),
      transition: list('all', s(.4), 'ease'),
      width: percent(100),
      zIndex: $.zIndex0,
    }),
    ...nest([ `.${Theme.parallaxTopLeft}` ], {
      ...parallaxDir,
      left: 0,
      top: 0,
      ...nest([ `&:focus ~ .${Theme.parallaxContent}`, `&:hover ~ .${Theme.parallaxContent}` ], {
        transform: list(perspective(px(1000)), rotateX(deg(3)), rotateY(deg(-3))),
        ...nest([ `&::before` ], {
          background: linearGradient(deg(135), list(parallaxFadeColor.rgba, percent(0)), list('transparent', percent(50))),
          opacity: .35
        }),
        ...nest([ `.${Theme.parallaxFront}` ], {
          transform: list(translate3d(4.5, 4.5, 50), scale(.95)),
        }),
      }),
    }),
    ...nest([ `.${Theme.parallaxTopRight}` ], {
      ...parallaxDir,
      right: 0,
      top: 0,
      ...nest([ `&:focus ~ .${Theme.parallaxContent}`, `&:hover ~ .${Theme.parallaxContent}` ], {
        transform: list(perspective(px(1000)), rotateX(deg(3)), rotateY(deg(3))),
        ...nest([ `&::before` ], {
          background: linearGradient(deg(-135), list(parallaxFadeColor.rgba, percent(0)), list('transparent', percent(50))),
          opacity: .35,
        }),
        ...nest([ `.${Theme.parallaxFront}` ], {
          transform: list(translate3d(-(4.5), 4.5, 50), scale(50)),
        }),
      }),
    }),
    ...nest([ `.${Theme.parallaxBottomLeft}` ], {
      ...parallaxDir,
      bottom: 0,
      left: 0,
      ...nest([ `&:focus ~ .${Theme.parallaxContent}`, `&:hover ~ .${Theme.parallaxContent}` ], {
        transform: list(perspective(px(1000)), rotateX(deg(-3)), rotateY(deg(-3))),
        ...nest([ `&::before` ], {
          background: linearGradient(deg(45), list(parallaxFadeColor.rgba, percent(0)), list('transparent', percent(50))),
          opacity: .35,
        }),
        ...nest([ `.${Theme.parallaxFront}` ], {
          transform: list(translate3d(4.5, -(4.5), 50), scale(50)),
        }),
      }),
    }),
    ...nest([ `.${Theme.parallaxBottomRight}` ], {
      ...parallaxDir,
      bottom: 0,
      right: 0,
      ...nest([ `&:focus ~ .${Theme.parallaxContent}`, `&:hover ~ .${Theme.parallaxContent}` ], {
        transform: list(perspective(px(1000)), rotateX((deg(-3))), rotateY(deg(3))),
        ...nest([ `&::before` ], {
          background: linearGradient(deg(-45), list(parallaxFadeColor.rgba, percent(0)), list('transparent', percent(50))),
          opacity: .35,
        }),
        ...nest([ `.${Theme.parallaxFront}` ], {
          transform: list(translate3d(-(4.5), -(4.5), 50), scale(50)),
        }),
      }),
    }),
  }),
});
