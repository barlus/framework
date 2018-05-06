/**
 * @module Flexbox abstraction
 *
 * -webkit- is needed for mobile safari (iPhone / iPad)
 * -ms- is needed for IE
 */
import * as types from '../css';
import { extend } from '../styling';

/**
 * If you have more than one child prefer horizontal,vertical
 */
export var flexRoot: types.CSSProperties = {
    display: [
        'flex',
    ]
};

/**
 * A general grouping component that has no impact on the parent flexbox properties e.g.
 * <vertical>
 *    <pass>
 *       <content/>
 *    </pass>
 * </vertical>
 */
export var pass: types.CSSProperties = {
    display: 'inherit',
    flexDirection: 'inherit',
    flexGrow: 1,
};

export var inlineRoot: types.CSSProperties = {
    display: [
        'inline-flex'
    ]
};

export const horizontal: types.CSSProperties = extend(flexRoot, {
    flexDirection: 'row'
});
export const vertical: types.CSSProperties = extend(flexRoot, {
    flexDirection: 'column'
});

export var wrap: types.CSSProperties = {
    flexWrap: 'wrap'
};

/**
 * If you want items to be sized automatically by their children use this
 * This is because of a bug in various flexbox implementations: http://philipwalton.com/articles/normalizing-cross-browser-flexbox-bugs/
 * Specifically bug 1 : https://github.com/philipwalton/flexbugs#1-minimum-content-sizing-of-flex-items-not-honored
 */
export var content: types.CSSProperties = {
    flexShrink: 0,
    flexBasis: 'auto',
};

export var flex: types.CSSProperties = {
    flex: 1
};

export var flex1: types.CSSProperties = flex;
export var flex2: types.CSSProperties = {
    flex: 2
};
export var flex3: types.CSSProperties = {
    flex: 3
};
export var flex4: types.CSSProperties = {
    flex: 4
};
export var flex5: types.CSSProperties = {
    flex: 5
};
export var flex6: types.CSSProperties = {
    flex: 6
};
export var flex7: types.CSSProperties = {
    flex: 7
};
export var flex8: types.CSSProperties = {
    flex: 8
};
export var flex9: types.CSSProperties = {
    flex: 9
};
export var flex10: types.CSSProperties = {
    flex: 10
};
export var flex11: types.CSSProperties = {
    flex: 11
};
export var flex12: types.CSSProperties = {
    flex: 12
};

/////////////////////////////
// Alignment in cross axis //
/////////////////////////////

export var start: types.CSSProperties = {
    alignItems: 'flex-start'
};
export var center: types.CSSProperties = {
    alignItems: 'center'
};
export var end: types.CSSProperties = {
    alignItems: 'flex-end'
};

////////////////////////////
// Alignment in main axis //
////////////////////////////

export var startJustified: types.CSSProperties = {
    justifyContent: 'flex-start'
};
export var centerJustified: types.CSSProperties = {
    justifyContent: 'center'
};

export var endJustified: types.CSSProperties = {
    justifyContent: 'flex-end'
};
export var aroundJustified: types.CSSProperties = {
    justifyContent: 'space-around'
};
export var betweenJustified: types.CSSProperties = {
    justifyContent: 'space-between'
};
export var evenlyJustified: types.CSSProperties = {
    justifyContent: 'space-evenly'
};
////////////////////////////
// Alignment in both axes //
////////////////////////////

export var centerCenter: types.CSSProperties = extend(flexRoot, center, centerJustified);

////////////////////
// Self alignment //
////////////////////

export var selfStart: types.CSSProperties = {
    alignSelf: 'flex-start'
};
export var selfCenter: types.CSSProperties = {
    alignSelf: 'center'
};
export var selfEnd: types.CSSProperties = {
    alignSelf: 'flex-end'
};
export var selfStretch: types.CSSProperties = {
    alignSelf: 'stretch',
};
