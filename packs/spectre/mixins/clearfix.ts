import { css } from '@barlus/styles';

// Clearfix mixin
export const clearfix = () => ({
    ...css.nest(`&::after`, {
        clear: 'both',
        content: "",
        display: 'table',
    })
});
