import { CSSProperties, NestedCSSProperties } from './css';

export * from "./css";
export * from "./csx/index";
export * from "./tips/index";
export * from './styling';

export namespace css {

    export function when(cond: boolean, value: object, other = {}): object {
        if (cond) {
            return value
        } else {
            return other
        }
    }
    export function values(...array: (string | number | (string | number)[])[]) {
        return array.map(l => Array.isArray(l) ? values(...l) : l).join(' ');
    }
    export function nest(selector: string | string[], style: CSSProperties): { '*': CSSProperties } {
        return { [ (Array.isArray(selector) ? selector.join(', ') : selector) as '*' ]: style };
    }
    export function display(mode: NestedCSSProperties['display']) {
        return { display: mode };
    }
    export namespace display {
        export const block = display('block');
        export const inlineBlock = display('inline-block');
    }

    export const selectors = {
        class(className) {
            return `.${className}`
        }
    };
    export class Value {
        none: 'none' = 'none';
        auto: 'auto' = 'auto';
        inherit: 'inherit' = 'inherit';
        hidden: 'hidden' = 'hidden';
        transparent: 'transparent' = 'transparent';
        default: 'default' = 'default';
        solid: 'solid' = 'solid';
        collapse: 'collapse' = 'collapse';
        pointer: 'pointer' = 'pointer';
        center: 'center' = 'center';
        left: 'left' = 'left';
        right: 'right' = 'right';
        middle: 'middle' = 'middle';
        nowrap: 'nowrap' = 'nowrap';
        wrap: 'wrap' = 'wrap';
        flex: 'flex' = 'flex';
        block: 'block' = 'block';
        inlineBlock: 'inline-block' = 'inline-block';
        inlineFlex: 'inline-flex' = 'inline-flex';
        borderBox: 'border-box' = 'border-box';
    }
    export const value = new Value();
    export const theme = {}
}