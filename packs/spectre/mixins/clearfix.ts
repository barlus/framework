import { nest } from '@barlus/styles';

// Clearfix mixin
export const clearfix = () => ({
    ...nest(`&::after`, {
        clear: 'both',
        content: "",
        display: 'table',
    })
});
