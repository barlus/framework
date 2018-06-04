import { CSSValue } from '../../styles/css';

export function appearance(value:CSSValue<"none"|"auto">){
    return {
        'appearance': value,
        '-webkit-appearance': value,
    }
}