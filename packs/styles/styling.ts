import {FreeStyle, Styles}   from './core/FreeStyle';
import {TypeStyle}           from './core/TypeStyle';
import {CSSProperties}       from './types';
import {FontFace}            from './types';
import {KeyFrames}           from './types';
import {MediaQuery}          from './types';
import {NestedCSSProperties} from './types';


export type StylesTarget = { textContent: string | null };

export interface TypeStyleOptions {
  autoGenerateTag?: boolean,
  sourceName?: string
}

declare global {
  interface String {
    readonly css: '*'
  }
}
Object.defineProperty(String.prototype, 'css', {
  get() {
    return this;
  }
});

/**
 * Maintains a single stylesheet and keeps it in sync with requested styles
 */

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

export function theme<T extends { defaultTheme, name }, K extends keyof T['defaultTheme']>(type: T): { [P in K]: string } {
  return Object.keys(type.defaultTheme).reduce((o, k) => (o[ k ] = style(extend(
    { $debugName: type.name + '_' + k },
    type.defaultTheme[ k ]
  )), o), {}) as { [P in K]: string };
}

export function stylesheet(sourceName: string) {
  const stylesheet = new TypeStyle({
    autoGenerateTag: true,

    sourceName: sourceName
  });

  function animation(name: string, frames: KeyFrames) {
    stylesheet.cssRule(`@keyframes ${name}`, {
      ...({ $nest: frames } as any)
    })
  }

  const rule = stylesheet.cssRule.bind(stylesheet);
  return Object.assign(rule, { stylesheet, animation }) as TypeStyle['cssRule'] & {
    stylesheet: TypeStyle
    animation: typeof animation;
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
