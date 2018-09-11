import {$, list, nest, percent, rem, s, stylesheet, translateX, translateY} from "@barlus/styles"


export default Theme;
export const enum Theme {
  carousel = 'carousel',
  carouselContainer = 'carousel-container',
  carouselItem = 'carousel-item',
  carouselLocator = 'carousel-locator',
  carouselNav = 'carousel-nav',
  itemNext = 'item-next',
  itemPrev = 'item-prev',
  navItem = 'nav-item',
}

stylesheet('carousels.ts')('', {
  ...nest([ `.${Theme.carousel}` ], {
    background: $.bgColor.rgba,
    display: 'block',
    overflow: 'hidden',
    position: 'relative',
    width: percent(100),
    '-webkit-overflow-scrolling': 'touch',
    zIndex: $.zIndex0,
    ...nest([ `.${Theme.carouselContainer}` ], {
      height: percent(100),
      left: 0,
      position: 'relative',
      ...nest([ `&::before` ], {
        content: "\"\"",
        display: 'block',
        paddingBottom: percent(56.25),
      }),
      ...nest([ `.${Theme.carouselItem}` ], {
        animation: `carousel-slideout 1s ease-in-out 1`,
        height: percent(100),
        left: 0,
        margin: 0,
        opacity: 0,
        position: 'absolute',
        top: 0,
        width: percent(100),
        ...nest([ `&:hover` ], {
          ...nest([ `.${Theme.itemPrev}`, `.${Theme.itemNext}` ], {
            opacity: 1,
          }),
        }),
      }),
      ...nest([ `.${Theme.itemPrev}`, `.${Theme.itemNext}` ], {
        background: $.grayColorLight.fade(.25).rgba,
        borderColor: $.grayColorLight.fade(.5).rgba,
        color: $.grayColorLight.rgba,
        opacity: 0,
        position: 'absolute',
        top: percent(50),
        transition: list('all', s(.4), 'ease'),
        transform: translateY(percent(-50)),
        zIndex: $.zIndex1,
      }),
      ...nest([ `.${Theme.itemPrev}` ], {
        left: rem(1),
      }),
      ...nest([ `.${Theme.itemNext}` ], {
        right: rem(1),
      }),
    }),
    ...nest([ `.${Theme.carouselLocator}` ], {
      ...nest([ `&:nth-of-type(1):checked ~ .${Theme.carouselContainer} .carousel-item:nth-of-type(1)`, `&:nth-of-type(2):checked ~ .${Theme.carouselContainer} .carousel-item:nth-of-type(2)`, `&:nth-of-type(3):checked ~ .${Theme.carouselContainer} .carousel-item:nth-of-type(3)`, `&:nth-of-type(4):checked ~ .${Theme.carouselContainer} .carousel-item:nth-of-type(4)` ], {
        animation: `carousel-slidein 0.75s ease-in-out 1`,
        opacity: 1,
        zIndex: $.zIndex1,
      }),
      ...nest([ `&:nth-of-type(1):checked ~ .${Theme.carouselNav} .nav-item:nth-of-type(1)`, `&:nth-of-type(2):checked ~ .${Theme.carouselNav} .nav-item:nth-of-type(2)`, `&:nth-of-type(3):checked ~ .${Theme.carouselNav} .nav-item:nth-of-type(3)`, `&:nth-of-type(4):checked ~ .${Theme.carouselNav} .nav-item:nth-of-type(4)` ], {
        color: $.grayColorLight.rgba,
      }),
    }),
    ...nest([ `.${Theme.carouselNav}` ], {
      bottom: rem($.layoutSpacing),
      display: 'flex',
      justifyContent: 'center',
      left: percent(50),
      position: 'absolute',
      transform: translateX(percent(-50)),
      width: rem(10),
      zIndex: $.zIndex1,
      ...nest([ `.${Theme.navItem}` ], {
        color: $.grayColorLight.fade(.5).rgba,
        display: 'block',
        flex: '1 0 auto',
        height: rem($.unit8),
        margin: rem($.unit1),
        maxWidth: rem(2.5),
        position: 'relative',
        ...nest([ `&::before` ], {
          background: 'currentColor',
          content: "\"\"",
          display: 'block',
          height: rem($.unitH),
          position: 'absolute',
          top: rem(.5),
          width: percent(100),
        }),
      }),
    }),
  }),
});