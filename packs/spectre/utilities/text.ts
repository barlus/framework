import {$, em, nest, stylesheet} from "@barlus/styles"
import {textEllipsis}            from '../mixins/text';


export default Theme;
export const enum Theme {
  textBold = 'text-bold',
  textBreak = 'text-break',
  textCapitalize = 'text-capitalize',
  textCenter = 'text-center',
  textClip = 'text-clip',
  textEllipsis = 'text-ellipsis',
  textItalic = 'text-italic',
  textJustify = 'text-justify',
  textLarge = 'text-large',
  textLeft = 'text-left',
  textLowercase = 'text-lowercase',
  textNormal = 'text-normal',
  textRight = 'text-right',
  textUppercase = 'text-uppercase',
}

stylesheet('text.ts')('', {
  ...nest([ `.${Theme.textLeft}` ], {
    textAlign: 'left',
  }),
  ...nest([ `.${Theme.textRight}` ], {
    textAlign: 'right',
  }),
  ...nest([ `.${Theme.textCenter}` ], {
    textAlign: 'center',
  }),
  ...nest([ `.${Theme.textJustify}` ], {
    textAlign: 'justify',
  }),
  ...nest([ `.${Theme.textLowercase}` ], {
    textTransform: 'lowercase',
  }),
  ...nest([ `.${Theme.textUppercase}` ], {
    textTransform: 'uppercase',
  }),
  ...nest([ `.${Theme.textCapitalize}` ], {
    textTransform: 'capitalize',
  }),
  ...nest([ `.${Theme.textNormal}` ], {
    fontWeight: 'normal',
  }),
  ...nest([ `.${Theme.textBold}` ], {
    fontWeight: 'bold',
  }),
  ...nest([ `.${Theme.textItalic}` ], {
    fontStyle: 'italic',
  }),
  ...nest([ `.${Theme.textLarge}` ], {
    fontSize: em(1.2),
  }),
  ...nest([ `.${Theme.textEllipsis}` ], {
    ...textEllipsis(),
  }),
  ...nest([ `.${Theme.textClip}` ], {
    overflow: 'hidden',
    textOverflow: 'clip',
    whiteSpace: 'nowrap',
  }),
  ...nest([ `.${Theme.textBreak}` ], {
    hyphens: 'auto',
    wordBreak: 'break-word',
    wordWrap: 'break-word',
  }),
});
