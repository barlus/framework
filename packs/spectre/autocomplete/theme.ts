// import { stylesheet, rem, css } from '@barlus/styles';
// import { config } from '../config';
// import { buttonVariant } from '../mixins/button';
// import { controlShadow } from '../mixins/shadow';
// import { controlTransition } from '../mixins/transition';
import { $, list, nest, percent, rem, stylesheet } from "@barlus/styles"
import { controlShadow } from '../mixins/shadow';

export default Theme;
export const enum Theme {
    autocompleteOneline='autocomplete-oneline',
    chip='chip',
    formAutocomplete='form-autocomplete',
    formAutocompleteInput='form-autocomplete-input',
    formInput='form-input',
    isFocused='is-focused',
    menu='menu',
}

stylesheet('autocomplete.ts')('',{
    ...nest([`.${Theme.formAutocomplete}`],{
        position:'relative',
        ...nest([`.${Theme.formAutocompleteInput}`],{
            alignContent:'flex-start',
            display:'flex',
            flexWrap:'wrap',
            height:'auto',
            minHeight:rem($.unit8),
            padding:rem($.unitH),
            ...nest([`&.${Theme.isFocused}`],{
                ...controlShadow(),
                borderColor:$.primaryColor.rgba,
            }),
            ...nest([`.${Theme.formInput}`],{
                borderColor:'transparent',
                boxShadow:'none',
                display:'inline-block',
                flex:'1 0 auto',
                height:rem($.unit6),
                lineHeight:rem($.unit4),
                margin:rem($.unitH),
                width:'auto',
            }),
        }),
        ...nest([`.${Theme.menu}`],{
            left:0,
            position:'absolute',
            top:percent(100),
            width:percent(100),
        }),
        ...nest([`&.${Theme.autocompleteOneline}`],{
            ...nest([`.${Theme.formAutocompleteInput}`],{
                flexWrap:'nowrap',
                overflowX:'auto',
            }),
            ...nest([`.${Theme.chip}`],{
                flex:list(1,0,'auto'),
            }),
        }),
    }),
});
