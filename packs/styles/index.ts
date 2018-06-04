import { CSSProperties, NestedCSSProperties } from './css';

export * from "./css";
export * from "./csx/index";
export * from "./tips/index";
export * from './styling';

export class Settings {}
export const $ = new Settings();
export function nest(selector: string | string[], style: CSSProperties): { '*': CSSProperties } {
    return { [ (Array.isArray(selector) ? selector.join(', ') : selector) as '*' ]: style };
}
export function when(cond: boolean, value: object, other = {}): object {
    if (cond) {
        return value
    } else {
        return other
    }
}