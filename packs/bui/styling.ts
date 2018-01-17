export * from "./typing/css"
import {CSSProperties, FontFace, KeyFrames, MediaQuery, NestedCSSProperties} from './typing/css';

/**
 * Valid CSS property values.
 */
export type PropertyValue = number | boolean | string;
/**
 * Hash algorithm interface.
 */
export type HashFunction = (str: string) => string
export type StylesTarget = { textContent: string | null };
//------
/**
 * Input styles object.
 */
export interface Styles {
    [selector: string]: null | undefined | PropertyValue | PropertyValue[] | Styles
}
/**
 * Propagate change events.
 */
export interface Changes {
    add (style: Container<any>, index: number): void
    change (style: Container<any>, oldIndex: number, newIndex: number): void
    remove (style: Container<any>, index: number): void
}
/**
 * Cacheable interface.
 */
export interface Container<T> {
    id: string
    clone (): T
    getIdentifier (): string
    getStyles (): string
}
// ------
declare const process;
/**
 * The unique id is used for unique hashes.
 */
let uniqueId = 0;
/**
 * Component styles with this string to get unique hashes.
 */
const IS_UNIQUE = '__DO_NOT_DEDUPE_STYLE__';
const upperCasePattern = /[A-Z]/g;
const msPattern = /^ms-/;
const interpolatePattern = /&/g;
const escapePattern = /[ !#$%&()*+,./;<=>?@[\]^`{|}~"'\\]/g;
/**
 * Noop changes.
 */
const noopChanges: Changes = {
    add: () => undefined,
    change: () => undefined,
    remove: () => undefined
};
/**
 * Map of css  properties that are valid unit-less numbers..
 */
const CSS_NUMBER = createNumberProperties([
    'animation-iteration-count',
    'box-flex',
    'box-flex-group',
    'column-count',
    'counter-increment',
    'counter-reset',
    'flex',
    'flex-grow',
    'flex-positive',
    'flex-shrink',
    'flex-negative',
    'font-weight',
    'line-clamp',
    'line-height',
    'opacity',
    'order',
    'orphans',
    'tab-size',
    'widows',
    'z-index',
    'zoom',
    // SVG properties.
    'fill-opacity',
    'stroke-dashoffset',
    'stroke-opacity',
    'stroke-width'
]);
/**
 * Maintains a single stylesheet and keeps it in sync with requested styles
 */
export class TypeStyle {

    private _autoGenerateTag: boolean;
    private _freeStyle: FreeStyle;
    private _pending: number;
    private _pendingRawChange: boolean;
    private _raw: string;
    private _tag?: StylesTarget;
    /**
     * We have a single stylesheet that we update as components register themselves
     */
    private _lastFreeStyleChangeId: number;
    constructor({autoGenerateTag}: { autoGenerateTag: boolean }) {
        const freeStyle = FreeStyle.create({debug:true});
        this._autoGenerateTag = autoGenerateTag;
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
            const tag:any = typeof window === 'undefined'
                ? {textContent: ''}
                : document.createElement('style');
            if (typeof document !== 'undefined') {
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
        const target = this._getTag();
        if (!target) {
            return;
        }
        target.textContent = this.getStyles();
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
        const {keyframes, $debugName} = explodeKeyframes(frames);
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
        const freeStyle = FreeStyle.create({debug:true});
        this._freeStyle = freeStyle;
        this._lastFreeStyleChangeId = freeStyle.changeId;
        /** reinit raw */
        this._raw = '';
        this._pendingRawChange = false;
        /** Clear any styles that were flushed */
        const target = this._getTag();
        if (target) {
            target.textContent = '';
        }
    };
    /** Sets the target tag where we write the css on style updates */
    public setStylesTarget = (tag: StylesTarget): void => {
        /** Clear any data in any previous tag */
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
        const {result, debugName} = ensureStringObj(extend(...objects));
        const className = debugName ? freeStyle.registerStyle(result, debugName) : freeStyle.registerStyle(result);
        this._styleUpdated();
        return className;
    }
}
/**
 * Implement a cache/event emitter.
 */
class Cache<T extends Container<any>> {
    sheet: string[] = [];
    changeId = 0;
    private _keys: string[] = [];
    private _children: { [id: string]: T } = Object.create(null);
    private _counters: { [id: string]: number } = Object.create(null);
    constructor(public hash = stringHash, public changes: Changes = noopChanges) {
    }
    add<U extends T>(style: U): U {
        const count = this._counters[style.id] || 0;
        const item = this._children[style.id] || style.clone();
        this._counters[style.id] = count + 1;
        if (count === 0) {
            this._children[item.id] = item;
            this._keys.push(item.id);
            this.sheet.push(item.getStyles());
            this.changeId++;
            this.changes.add(item, this._keys.length - 1)
        } else {
            // Check if contents are different.
            if (item.getIdentifier() !== style.getIdentifier()) {
                throw new TypeError(`Hash collision: ${style.getStyles()} === ${item.getStyles()}`)
            }
            const oldIndex = this._keys.indexOf(style.id);
            const newIndex = this._keys.length - 1;
            const prevChangeId = this.changeId;
            if (oldIndex !== newIndex) {
                this._keys.splice(oldIndex, 1);
                this._keys.push(style.id);
                this.changeId++
            }
            if (item instanceof Cache && style instanceof Cache) {
                const prevChangeId = item.changeId;
                item.merge(style);
                if (item.changeId !== prevChangeId) {
                    this.changeId++
                }
            }
            if (this.changeId !== prevChangeId) {
                if (oldIndex === newIndex) {
                    this.sheet.splice(oldIndex, 1, item.getStyles())
                } else {
                    this.sheet.splice(oldIndex, 1);
                    this.sheet.splice(newIndex, 0, item.getStyles())
                }
                this.changes.change(item, oldIndex, newIndex)
            }
        }
        return item as U
    }
    remove(style: T): void {
        const count = this._counters[style.id];
        if (count > 0) {
            this._counters[style.id] = count - 1;
            const item = this._children[style.id];
            const index = this._keys.indexOf(item.id);
            if (count === 1) {
                delete this._counters[style.id];
                delete this._children[style.id];
                this._keys.splice(index, 1);
                this.sheet.splice(index, 1);
                this.changeId++;
                this.changes.remove(item, index)
            } else if (item instanceof Cache && style instanceof Cache) {
                const prevChangeId = item.changeId;
                item.unmerge(style);
                if (item.changeId !== prevChangeId) {
                    this.sheet.splice(index, 1, item.getStyles());
                    this.changeId++;
                    this.changes.change(item, index, index)
                }
            }
        }
    }
    merge(cache: Cache<any>) {
        for (const id of cache._keys) this.add(cache._children[id])
        return this
    }
    unmerge(cache: Cache<any>) {
        for (const id of cache._keys) this.remove(cache._children[id])
        return this
    }
    clone() {
        return new Cache(this.hash).merge(this)
    }
}
/**
 * Selector is a dumb class made to represent nested CSS selectors.
 */
class Selector implements Container<Selector> {
    constructor(
        public selector: string,
        public hash: HashFunction,
        public id = `s${hash(selector)}`,
        public pid = ''
    ) {
    }
    getStyles() {
        return this.selector
    }
    getIdentifier() {
        return `${this.pid}.${this.selector}`
    }
    clone() {
        return new Selector(this.selector, this.hash, this.id, this.pid)
    }
}
/**
 * The style container registers a style string with selectors.
 */
class Style extends Cache<Selector> implements Container<Style> {
    constructor(public style: string, public hash: HashFunction, public id = `c${hash(style)}`) {
        super(hash)
    }
    getStyles(): string {
        return `${this.sheet.join(',')}{${this.style}}`
    }
    getIdentifier() {
        return this.style
    }
    clone(): Style {
        return new Style(this.style, this.hash, this.id).merge(this)
    }
}
/**
 * Implement rule logic for style output.
 */
class Rule extends Cache<Rule | Style> implements Container<Rule> {
    constructor(
        public rule: string,
        public style = '',
        public hash: HashFunction,
        public id = `a${hash(`${rule}.${style}`)}`,
        public pid = ''
    ) {
        super(hash)
    }
    getStyles(): string {
        return `${this.rule}{${this.style}${join(this.sheet)}}`
    }
    getIdentifier() {
        return `${this.pid}.${this.rule}.${this.style}`
    }
    clone(): Rule {
        return new Rule(this.rule, this.style, this.hash, this.id, this.pid).merge(this)
    }
}
/**
 * The FreeStyle class implements the API for everything else.
 */
class FreeStyle extends Cache<Rule | Style> implements Container<FreeStyle> {
    static create(options: { id?: string, hash?: HashFunction, debug?: boolean, changes?: Changes }) {
        return new FreeStyle(options.hash, options.debug, options.id, options.changes);
    }
    constructor(
        public hash = stringHash,
        public debug = typeof process !== 'undefined' && process.env['NODE_ENV'] !== 'production',
        public id = `f${(++uniqueId).toString(36)}`,
        changes?: Changes
    ) {
        super(hash, changes)
    }
    registerStyle(styles: Styles, displayName?: string) {
        const debugName = this.debug ? displayName : undefined;
        const {cache, id} = composeStyles(this, '&', styles, true, debugName);
        this.merge(cache);
        return id
    }
    registerKeyframes(keyframes: Styles, displayName?: string) {
        return this.registerHashRule('@keyframes', keyframes, displayName)
    }
    registerHashRule(prefix: string, styles: Styles, displayName?: string) {
        const debugName = this.debug ? displayName : undefined;
        const {cache, pid, id} = composeStyles(this, '', styles, false, debugName);
        const rule = new Rule(`${prefix} ${escape(id)}`, undefined, this.hash, undefined, pid);
        this.add(rule.merge(cache));
        return id
    }
    registerRule(rule: string, styles: Styles) {
        this.merge(composeStyles(this, rule, styles, false).cache)
    }
    registerCss(styles: Styles) {
        this.merge(composeStyles(this, '', styles, false).cache)
    }
    getStyles(): string {
        return join(this.sheet)
    }
    getIdentifier() {
        return this.id
    }
    clone(): FreeStyle {
        return new FreeStyle(this.hash, this.debug, this.id, this.changes).merge(this)
    }
}
/**
 * We need to do the following to *our* objects before passing to freestyle:
 * - For any `$nest` directive move up to FreeStyle style nesting
 * - For any `$unique` directive map to FreeStyle Unique
 * - For any `$debugName` directive return the debug name
 */
function ensureStringObj(object: NestedCSSProperties): { result: any, debugName: string } {
    /** The final result we will return */
    const result: CSSProperties & Dictionary = {};
    let debugName = '';

    for (const key in object) {

        /** Grab the value upfront */
        const val: any = (object as any)[key];

        /** TypeStyle configuration options */
        if (key === '$unique') {
            result[IS_UNIQUE] = val;
        }
        else if (key === '$nest') {
            const nested = val!;
            for (let selector in nested) {
                const subproperties = nested[selector]!;
                result[selector] = ensureStringObj(subproperties).result;
            }
        }
        else if (key === '$debugName') {
            debugName = val;
        }
        else {
            result[key] = val
        }
    }

    return { result, debugName };
}
// todo: better name here
function explodeKeyframes(frames: KeyFrames): { $debugName?: string, keyframes: KeyFrames } {
    const result = { $debugName: undefined, keyframes: {} as KeyFrames };
    for (const offset in frames) {
        const val: any = (frames as any)[offset];
        if (offset === '$debugName') {
            result.$debugName = val;
        } else {
            result.keyframes[offset] = val;
        }
    }
    return result;
}
/**
 * Utility to join classes conditionally
 */
function classes(...classes: (string | false | undefined | null)[]): string {
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
function media(mediaQuery: MediaQuery, ...objects: NestedCSSProperties[]): NestedCSSProperties {
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
            [stringMediaQuery]: extend(...objects)
        }
    };
    return object;
}
/**
 * Merges various styles into a single style object.
 * Note: if two objects have the same property the last one wins
 */
function extend(...objects: (NestedCSSProperties | undefined | null | false)[]): NestedCSSProperties {
    /** The final result we will return */
    const result: CSSProperties & Dictionary = {};
    for (const object of objects) {
        if (object == null || object === false) {
            continue;
        }
        for (const key in object) {
            /** Falsy values except a explicit 0 is ignored */
            const val: any = (object as any)[key];
            if (!val && val !== 0) {
                continue;
            }
            /** if nested media or pseudo selector */
            if (key === '$nest' && val) {
                result[key] = result['$nest'] ? extend(result['$nest'], val) : val;
            }
            /** if freestyle sub key that needs merging. We come here due to our recursive calls */
            else if ((key.indexOf('&') !== -1 || key.indexOf('@media') === 0)) {
                result[key] = result[key] ? extend(result[key], val) : val;
            }
            else {
                result[key] = val;
            }
        }
    }
    return result;
}
function mediaLength(value: number | string) {
    return typeof value === 'string' ? value : `${value}px`
}
/** Raf for node + browser */
function onRender(cb){
    if(typeof requestAnimationFrame !== 'undefined'){
        requestAnimationFrame(cb);
    }else{
        setTimeout(cb)
    }
}
/**
 * Escape a CSS class name.
 */
function escape (str: string){
    return str.replace(escapePattern, '\\$&');
}
/**
 * Transform a JavaScript property into a CSS property.
 */
function hyphenate(propertyName: string): string {
    return propertyName
        .replace(upperCasePattern,  (m: string) => `-${m.toLowerCase()}`)
        .replace(msPattern, '-ms-') // Internet Explorer vendor prefix.
}
/**
 * Generate a hash value from a string.
 */
function stringHash(str: string): string {
    let value = 5381;
    let len = str.length;
    while (len--) value = (value * 33) ^ str.charCodeAt(len);
    return (value >>> 0).toString(36)
}
/**
 * Transform a style string to a CSS string.
 */
function styleToString(key: string, value: PropertyValue) {
    if (typeof value === 'number' && value !== 0 && !CSS_NUMBER[key]) {
        return `${key}:${value}px`
    }
    return `${key}:${value}`
}
/**
 * Sort an array of tuples by first value.
 */
function sortTuples<T extends any[]>(value: T[]): T[] {
    return value.sort((a, b) => a[0] > b[0] ? 1 : -1)
}
/**
 * Categorize user styles.
 */
function parseStyles(styles: Styles, hasNestedStyles: boolean) {
    const properties: Array<[string, PropertyValue | PropertyValue[]]> = [];
    const nestedStyles: Array<[string, Styles]> = [];
    let isUnique = false;
    // Sort keys before adding to styles.
    for (const key of Object.keys(styles)) {
        const value = styles[key];
        if (value !== null && value !== undefined) {
            if (key === IS_UNIQUE) {
                isUnique = true
            } else if (typeof value === 'object' && !Array.isArray(value)) {
                nestedStyles.push([key.trim(), value])
            } else {
                properties.push([hyphenate(key.trim()), value])
            }
        }
    }
    return {
        styleString: stringifyProperties(sortTuples(properties)),
        nestedStyles: hasNestedStyles ? nestedStyles : sortTuples(nestedStyles),
        isUnique
    }
}
/**
 * Stringify an array of property tuples.
 */
function stringifyProperties(properties: Array<[string, PropertyValue | PropertyValue[]]>) {
    return properties.map(([name, value]) => {
        if (!Array.isArray(value)) {
            return styleToString(name, value);
        }
        return value.map(x => styleToString(name, x)).join(';')
    }).join(';')
}
/**
 * Interpolate CSS selectors.
 */
function interpolate(selector: string, parent: string) {
    if (selector.indexOf('&') > -1) {
        return selector.replace(interpolatePattern, parent)
    }
    return `${parent} ${selector}`
}
/**
 * Recursive loop building styles with deferred selectors.
 */
function stylize(cache: Cache<any>, selector: string, styles: Styles, list: [string, Style][], parent?: string) {
    const {styleString, nestedStyles, isUnique} = parseStyles(styles, !!selector);
    let pid = styleString;
    if (selector.charCodeAt(0) === 64 /* @ */) {
        const rule = cache.add(new Rule(selector, parent ? undefined : styleString, cache.hash));
        // Nested styles support (e.g. `.foo > @media > .bar`).
        if (styleString && parent) {
            const style = rule.add(new Style(styleString, rule.hash, isUnique ? `u${(++uniqueId).toString(36)}` : undefined));
            list.push([parent, style])
        }
        for (const [name, value] of nestedStyles) {
            pid += name + stylize(rule, name, value, list, parent)
        }
    } else {
        const key = parent ? interpolate(selector, parent) : selector;
        if (styleString) {
            const style = cache.add(new Style(styleString, cache.hash, isUnique ? `u${(++uniqueId).toString(36)}` : undefined));
            list.push([key, style])
        }
        for (const [name, value] of nestedStyles) {
            pid += name + stylize(cache, name, value, list, key)
        }
    }
    return pid
}
/**
 * Register all styles, but collect for selector interpolation using the hash.
 */
function composeStyles(container: FreeStyle, selector: string, styles: Styles, isStyle: boolean, displayName?: string) {
    const cache = new Cache<Rule | Style>(container.hash);
    const list: [string, Style][] = [];
    const pid = stylize(cache, selector, styles, list);
    const hash = `f${cache.hash(pid)}`;
    const id = displayName ? `${displayName}_${hash}` : hash;
    for (const [selector, style] of list) {
        const key = isStyle ? interpolate(selector, `.${escape(id)}`) : selector;
        style.add(new Selector(key, style.hash, undefined, pid))
    }
    return {cache, pid, id}
}
/**
 * Cache to list to styles.
 */
function join(arr: string[]): string {
    let res = '';
    for (let i = 0; i < arr.length; i++) res += arr[i]
    return res
}
/**
 * generate map of css number properties
 */
function createNumberProperties(cssNumberProperties:string[]){
    const CSS_NUMBER = Object.create(null);
    // Add vendor prefixes to all unit-less properties.
    for (const prefix of ['-webkit-', '-ms-', '-moz-', '-o-', '']) {
        for (const property of cssNumberProperties) {
            CSS_NUMBER[prefix + property] = true;
        }
    }
    return CSS_NUMBER;
}