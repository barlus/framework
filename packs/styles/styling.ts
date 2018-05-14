import { FreeStyle, Styles } from './core/FreeStyle';
import { CSSProperties, FontFace, KeyFrames, MediaQuery, NestedCSSProperties } from './css';
export type StylesTarget = { textContent: string | null };
export interface TypeStyleOptions {
    autoGenerateTag?: boolean,
    sourceName?: string
}
declare global {
    interface String {
        readonly css:'*'
    }
}
Object.defineProperty(String.prototype,'css',{
    get(){
        return this;
    }
});
/**
 * Maintains a single stylesheet and keeps it in sync with requested styles
 */
export class TypeStyle {
    private _autoGenerateTag: boolean;
    private _sourceName: string;
    private _freeStyle: FreeStyle;
    private _pending: number;
    private _pendingRawChange: boolean;
    private _raw: string;
    private _tag?: StylesTarget;
    /**
     * We have a single stylesheet that we update as components register themselves
     */
    private _lastFreeStyleChangeId: number;
    constructor({ autoGenerateTag, sourceName }: TypeStyleOptions = {
        autoGenerateTag: true
    }) {
        const freeStyle = FreeStyle.create(void 0, true);
        this._autoGenerateTag = autoGenerateTag;
        this._sourceName = sourceName;
        this._freeStyle = freeStyle;
        this._lastFreeStyleChangeId = freeStyle.changeId;
        this._pending = 0;
        this._pendingRawChange = false;
        this._raw = '';
        this._tag = undefined;
    }
    /**
     * Only calls cb all sync operations settle
     */
    private _afterAllSync(cb: () => void): void {
        this._pending++;
        const pending = this._pending;
        onRender(() => {
            if (pending !== this._pending) {
                return;
            }
            cb();
        });
    }
    private _getTag(): StylesTarget | undefined {
        if (this._tag) {
            return this._tag;
        }
        if (this._autoGenerateTag) {
            const tag: any = typeof window === 'undefined'
                ? { textContent: '' }
                : document.createElement('style');
            if (typeof document !== 'undefined') {
                if (this._sourceName) {
                    tag.setAttribute('id', this._sourceName);
                }
                document.head.appendChild(tag);
            }
            this._tag = tag;
            return tag;
        }
        return undefined;
    }
    /** Checks if the style tag needs updating and if so queues up the change */
    private _styleUpdated(): void {
        const changeId = this._freeStyle.changeId;
        const lastChangeId = this._lastFreeStyleChangeId;
        if (!this._pendingRawChange && changeId === lastChangeId) {
            return;
        }
        this._lastFreeStyleChangeId = changeId;
        this._pendingRawChange = false;
        this._afterAllSync(() => this.forceRenderStyles());
    }
    /**
     * Insert `raw` CSS as a string. This is useful for e.g.
     * - third party CSS that you are customizing with template strings
     * - generating raw CSS in JavaScript
     * - reset libraries like normalize.css that you can use without loaders
     */
    public cssRaw = (mustBeValidCSS: string): void => {
        if (!mustBeValidCSS) {
            return;
        }
        this._raw += mustBeValidCSS || '';
        this._pendingRawChange = true;
        this._styleUpdated();
    };
    /**
     * Takes CSSProperties and registers it to a global selector (body, html, etc.)
     */
    public cssRule = (selector: string, ...objects: NestedCSSProperties[]): void => {
        if(selector.includes(',')){
            selector.split(',').forEach(s=>{
                this.cssRule(s.trim(),...objects);
            })
        }
        const object = ensureStringObj(extend(...objects)).result;
        this._freeStyle.registerRule(selector, object);
        this._styleUpdated();
        return;
    };
    /**
     * Renders styles to the singleton tag imediately
     * NOTE: You should only call it on initial render to prevent any non CSS flash.
     * After that it is kept sync using `requestAnimationFrame` and we haven't noticed any bad flashes.
     **/
    public forceRenderStyles = (): void => {
        console.info(this._sourceName);
        const target = this._getTag();
        if (!target) {
            return;
        }
        let source = this.getStyles();
        if (this._sourceName) {
            source = `${source}\n/*# sourceURL=${this._sourceName}*/`
        }
        target.textContent = source;
    };
    /**
     * Utility function to register an @font-face
     */
    public fontFace = (...fontFace: FontFace[]): void => {
        const freeStyle = this._freeStyle;
        for (const face of fontFace as Styles[]) {
            freeStyle.registerRule('@font-face', face);
        }
        this._styleUpdated();
        return;
    };
    /**
     * Allows use to use the stylesheet in a node.js environment
     */
    public getStyles = () => {
        return (this._raw || '') + this._freeStyle.getStyles();
    };
    /**
     * Takes keyframes and returns a generated animationName
     */
    public keyframes = (frames: KeyFrames): string => {
        const { keyframes, $debugName } = explodeKeyframes(frames);
        // TODO: replace $debugName with display name
        const animationName = this._freeStyle.registerKeyframes(keyframes as Styles, $debugName);
        this._styleUpdated();
        return animationName;
    };
    /**
     * Helps with testing. Reinitializes FreeStyle + raw
     */
    public reinit = (): void => {
        /** reinit freestyle */
        const freeStyle = FreeStyle.create(void 0,  true );
        this._freeStyle = freeStyle;
        this._lastFreeStyleChangeId = freeStyle.changeId;
        /** reinit raw */
        this._raw = '';
        this._pendingRawChange = false;
        /** clear any styles that were flushed */
        const target = this._getTag();
        if (target) {
            target.textContent = '';
        }
    };
    /** Sets the target tag where we write the css on style updates */
    public setStylesTarget = (tag: StylesTarget): void => {
        /** clear any data in any previous tag */
        if (this._tag) {
            this._tag.textContent = '';
        }
        this._tag = tag;
        /** This special time buffer immediately */
        this.forceRenderStyles();
    };
    /**
     * Takes CSSProperties and return a generated className you can use on your component
     */
    public style = (...objects: (NestedCSSProperties | undefined | null | false)[]): string => {
        const freeStyle = this._freeStyle;
        const { result, debugName } = ensureStringObj(extend(...objects));
        const className = debugName ? freeStyle.registerStyle(result, debugName) : freeStyle.registerStyle(result);
        this._styleUpdated();
        return className;
    }
}
/**
 * Utility to join classes conditionally
 */
export function classes(...classes: (string | false | undefined | null)[]): string {
    return classes.filter(c => !!c).join(' ');
}
/**
 * Utility to help customize styles with media queries. e.g.
 * ```
 * style(
 *  media({maxWidth:500}, {color:'red'})
 * )
 * ```
 */
export function media(mediaQuery: MediaQuery, ...objects: NestedCSSProperties[]): NestedCSSProperties {
    const mediaQuerySections: string[] = [];
    if (mediaQuery.type) {
        mediaQuerySections.push(mediaQuery.type);
    }
    if (mediaQuery.orientation) {
        mediaQuerySections.push(mediaQuery.orientation);
    }
    if (mediaQuery.minWidth) {
        mediaQuerySections.push(`(min-width: ${mediaLength(mediaQuery.minWidth)})`);
    }
    if (mediaQuery.maxWidth) {
        mediaQuerySections.push(`(max-width: ${mediaLength(mediaQuery.maxWidth)})`);
    }
    if (mediaQuery.minHeight) {
        mediaQuerySections.push(`(min-height: ${mediaLength(mediaQuery.minHeight)})`);
    }
    if (mediaQuery.maxHeight) {
        mediaQuerySections.push(`(max-height: ${mediaLength(mediaQuery.maxHeight)})`);
    }
    const stringMediaQuery = `@media ${mediaQuerySections.join(' and ')}`;
    const object: NestedCSSProperties = {
        $nest: {
            [ stringMediaQuery ]: extend(...objects)
        }
    };
    return object;
}
/**
 * Merges various styles into a single style object.
 * Note: if two objects have the same property the last one wins
 */
export function extend(...objects: (NestedCSSProperties | undefined | null | false)[]): NestedCSSProperties {
    /** The final result we will return */
    const result: CSSProperties = {};
    for (const object of objects) {
        if (object == null || object === false) {
            continue;
        }
        for (let key in object) {
            /** Falsy values except a explicit 0 is ignored */
            let val: any = (object as any)[ key ];
            if (!val && val !== 0) {
                continue;
            }

            /** if nested media or pseudo selector */
            if (key === '$nest' && val) {
                result[ key ] = result[ '$nest' ] ? extend(result[ '$nest' ], val) : val;
            }

            /** if freestyle sub key that needs merging. We come here due to our recursive calls */
            else if ((key.indexOf('&') !== -1 || key.indexOf('@media') === 0)) {
                result[ key ] = result[ key ] ? extend(result[ key ], val) : val;
            }
            else {
                result[ key ] = val;
            }
        }
    }
    return result;
}
export const master = new TypeStyle({ autoGenerateTag: true, sourceName: 'master.css' });
export const cssRaw = master.cssRaw;
export const cssRule = master.cssRule;
export const style = master.style;
export const fontFace = master.fontFace;
export function theme<T extends { defaultTheme, name }, K extends keyof T['defaultTheme']>(type: T): {[P in K]: string} {
    return Object.keys(type.defaultTheme).reduce((o, k) => (o[ k ] = style(extend(
        { $debugName: type.name + '_' + k },
        type.defaultTheme[ k ]
    )), o), {}) as {[P in K]: string};
}
export function stylesheet(sourceName: string) {
    const stylesheet = new TypeStyle({
        autoGenerateTag: true,
        sourceName: sourceName
    });
    const rule = stylesheet.cssRule.bind(stylesheet);
    return Object.assign(rule, { stylesheet }) as TypeStyle['cssRule'] & {
        stylesheet: TypeStyle
    }
}
// PRIVATE -------------------------------------------------------------------------------------------------------------
/**
 * We need to do the following to *our* objects before passing to freestyle:
 * - For any `$nest` directive move up to FreeStyle style nesting
 * - For any `$unique` directive map to FreeStyle Unique
 * - For any `$debugName` directive return the debug name
 */
function ensureStringObj(object: NestedCSSProperties): { result: any, debugName: string } {
    /** The final result we will return */
    const result: CSSProperties = {};
    let debugName = '';

    for (const key in object) {
        /** Grab the value upfront */
        const val: any = (object as any)[ key ];
        /** TypeStyle configuration options */
        if (key === '$unique') {
            result[ FreeStyle.IS_UNIQUE ] = val;
        }
        else if (key === '$nest') {
            const nested = val!;
            for (let selector in nested) {
                const subproperties = nested[ selector ]!;
                result[ selector ] = ensureStringObj(subproperties).result;
            }
        }
        else if (key === '$debugName') {
            debugName = val;
        }
        else {
            result[ key ] = val
        }
    }

    return { result, debugName };
}
// todo: better name here
function explodeKeyframes(frames: KeyFrames): { $debugName?: string, keyframes: KeyFrames } {
    const result = { $debugName: undefined, keyframes: {} as KeyFrames };
    for (const offset in frames) {
        const val: any = (frames as any)[ offset ];
        if (offset === '$debugName') {
            result.$debugName = val;
        } else {
            result.keyframes[ offset ] = val;
        }
    }
    return result;
}
function mediaLength(value: number | string) {
    return typeof value === 'string' ? value : `${value}px`
}
function onRender(cb) {
    if (typeof requestAnimationFrame !== 'undefined') {
        requestAnimationFrame(cb);
    } else {
        setTimeout(cb)
    }
}
