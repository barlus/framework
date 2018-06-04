import { $, nest, rem, stylesheet } from "@barlus/styles"
import { textEllipsis } from '../mixins/text';

export default Theme;
export const enum Theme {
    tile='tile',
    tileAction='tile-action',
    tileCentered='tile-centered',
    tileContent='tile-content',
    tileIcon='tile-icon',
    tileSubtitle='tile-subtitle',
    tileTitle='tile-title',
}

stylesheet('tiles.ts')('',{
    ...nest([`.${Theme.tile}`],{
        alignContent:'space-between',
        alignItems:'flex-start',
        display:'flex',
        ...nest([`.${Theme.tileIcon}`,`.${Theme.tileAction}`],{
            flex:'0 0 auto',
        }),
        ...nest([`.${Theme.tileContent}`],{
            flex:'1 1 auto',
            ...nest([`&:not(:first-child)`],{
                paddingLeft:rem($.unit2),
            }),
            ...nest([`&:not(:last-child)`],{
                paddingRight:rem($.unit2),
            }),
        }),
        ...nest([`.${Theme.tileTitle}`,`.${Theme.tileSubtitle}`],{
            lineHeight:rem($.lineHeight),
        }),
        ...nest([`&.${Theme.tileCentered}`],{
            alignItems:'center',
            ...nest([`.${Theme.tileContent}`],{
                overflow:'hidden',
            }),
            ...nest([`.${Theme.tileTitle}`,`.${Theme.tileSubtitle}`],{
                ...textEllipsis(),
                marginBottom:0,
            }),
        }),
    }),
});
