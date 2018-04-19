(function () {
'use strict';

const __assign = Object.assign || function (target) {
    for (var source, i = 1; i < arguments.length; i++) {
        source = arguments[i];
        for (var prop in source) {
            if (Object.prototype.hasOwnProperty.call(source, prop)) {
                target[prop] = source[prop];
            }
        }
    }
    return target;
};

function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function bound(target, key, desc) {
    var _a = desc || Object.getOwnPropertyDescriptor(target, key), value = _a.value, configurable = _a.configurable;
    return {
        configurable: configurable,
        get: function () {
            var binded = Object.assign(value.bind(this), {
                original: value
            });
            Object.defineProperty(this, key, {
                configurable: configurable,
                value: binded
            });
            return binded;
        }
    };
}

var globals = (function (factory) {
    if (typeof global === 'object')
        return global;
    if (typeof window === 'object')
        return window;
    return factory();
})(function () { return this; });

var METADATA = new Map();
var NULL = Symbol('NULL');
function hasOwn(hash, key) {
    return Object.prototype.hasOwnProperty.call(hash, key);
}
function getMapItem(map, key, factory) {
    var val = map.has(key) ? map.get(key) : NULL;
    if (val === NULL && typeof factory == 'function') {
        map.set(key, val = factory());
    }
    return val;
}
function getHashItem(hash, key, factory) {
    var val = hasOwn(hash, key) ? hash[key] : NULL;
    if (val === NULL && typeof factory == 'function') {
        hash[key] = val = factory();
    }
    return val;
}
function set(_a) {
    var name = _a.name, target = _a.target, key = _a.key, value = _a.value;
    //console.info(`${String(name)} = ${value} => ${(typeof target=='function'?`${target.name}`:`${target.constructor.name}.prototype`)}${key?`.${key}`:''}`)
    var map = getMapItem(METADATA, target, function () { return new Map(); });
    if (key) {
        map = getHashItem(map, key, function () { return new Map(); });
    }
    map.set(name, value);
}
function get(_a) {
    var target = _a.target, key = _a.key, name = _a.name, inherited = _a.inherited;
    function getForTarget(target, key, name) {
        var map = getMapItem(METADATA, target);
        if (map !== NULL && key) {
            map = getHashItem(map, key);
        }
        if (map !== NULL) {
            if (name != NULL) {
                return map.get(name);
            }
            else {
                return map;
            }
        }
    }
    var result = getForTarget(target, key, name);
    while (inherited && result === void 0 && (target = Object.getPrototypeOf(target))) {
        result = getForTarget(target, key, name);
    }
    return result;
}
function del(_a) {
    var name = _a.name, target = _a.target, key = _a.key;
    var metadata = get({ name: NULL, target: target, key: key, inherited: false });
    if (metadata && metadata.has(name)) {
        metadata["delete"](name);
        return true;
    }
    else {
        return false;
    }
}
function decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) {
            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        }
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function metadata(name, value) {
    return function (target, key) {
        defineMetadata(name, value, target, key);
    };
}
/**
 * Build parameter decorator
 * @param index
 * @param decorator
 */
function param(index, decorator) {
    return function (target, key) {
        decorator(target, key, index);
    };
}
function defineMetadata(name, value, target, key) {
    set({ name: name, value: value, target: target, key: key });
}
function getMetadata(name, target, key) {
    return get({ name: name, target: target, key: key, inherited: true });
}
function getOwnMetadata(name, target, key) {
    return get({ name: name, target: target, key: key, inherited: false });
}
function hasMetadata(name, target, key) {
    return !!get({ name: name, target: target, key: key, inherited: true });
}
function hasOwnMetadata(name, target, key) {
    return !!get({ name: name, target: target, key: key, inherited: false });
}
function getMetadataKeys(target, key) {
    var keys = getOwnMetadataKeys(target, key);
    while (target = Object.getPrototypeOf(target)) {
        getOwnMetadataKeys(target, key).forEach(function (k) {
            if (keys.indexOf(k) < 0) {
                keys.push(k);
            }
        });
    }
    return keys;
}
function getOwnMetadataKeys(target, key) {
    var metadata = get({ name: NULL, target: target, key: key, inherited: false });
    if (metadata) {
        return Array.from(metadata.keys());
    }
    else {
        return [];
    }
}
function deleteMetadata(name, target, key) {
    return del({ name: name, target: target, key: key });
}
Object.assign(globals.Reflect, {
    decorate: decorate,
    metadata: metadata,
    param: param,
    defineMetadata: defineMetadata,
    hasMetadata: hasMetadata,
    getMetadata: getMetadata,
    getMetadataKeys: getMetadataKeys,
    hasOwnMetadata: hasOwnMetadata,
    getOwnMetadata: getOwnMetadata,
    getOwnMetadataKeys: getOwnMetadataKeys,
    deleteMetadata: deleteMetadata
});
Object.assign(globals, {
    __decorate: decorate,
    __metadata: metadata,
    __param: param
});

/** Dependency Container */

/**
 * Class decorator factory that allows the class' dependencies to be
 * automatically injected at runtime.
 *
 * @return {Function} The class decorator
 */

/**
 * Parameter decorator factory that allows for interface information to be stored in the constructor's metadata
 *
 * @return The parameter decorator
 */


/**
 * Class decorator factory that allows constructor dependencies to be registered at runtime.
 *
 * @return {Function} The class decorator
 */

// tslint:disable-next-line
var global$1 = (function () {
    var local;
    if (typeof global$1 !== 'undefined') {
        local = global$1;
    }
    else if (typeof self !== 'undefined') {
        local = self;
    }
    else {
        try {
            local = Function('return this')();
        }
        catch (e) {
            throw new Error('global object is unavailable in this environment');
        }
    }
    return local;
})();
var isBrowser = typeof window !== 'undefined';
// tslint:disable-next-line:no-empty
function noop() { }
var fakeDoc = {
    createElement: noop,
    createElementNS: noop,
    createTextNode: noop
};
var doc = isBrowser ? document : fakeDoc;

function isNumber(arg) {
    return typeof arg === 'number';
}
var isSupportSVG = isFunction(doc.createAttributeNS);
function isString(arg) {
    return typeof arg === 'string';
}
function isFunction(arg) {
    return typeof arg === 'function';
}
function isBoolean(arg) {
    return arg === true || arg === false;
}
var isArray = Array.isArray;


function isUndefined(o) {
    return o === undefined;
}

var canUsePromise = 'Promise' in global$1;
var resolved;
if (canUsePromise) {
    resolved = Promise.resolve();
}
var nextTick = function (fn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    fn = isFunction(fn) ? fn.bind.apply(fn, [null].concat(args)) : fn;
    if (canUsePromise) {
        return resolved.then(fn);
    }
    var timerFunc = 'requestAnimationFrame' in global$1 ? requestAnimationFrame : setTimeout;
    timerFunc(fn);
};

/* istanbul ignore next */
// tslint:disable-next-line
Object.is = Object.is || function (x, y) {
    if (x === y) {
        return x !== 0 || 1 / x === 1 / y;
    }
    return x !== x && y !== y;
};
function shallowEqual(obj1, obj2) {
    if (obj1 === null || obj2 === null) {
        return false;
    }
    if (Object.is(obj1, obj2)) {
        return true;
    }
    var obj1Keys = obj1 ? Object.keys(obj1) : [];
    var obj2Keys = obj2 ? Object.keys(obj2) : [];
    if (obj1Keys.length !== obj2Keys.length) {
        return false;
    }
    for (var i = 0; i < obj1Keys.length; i++) {
        var obj1KeyItem = obj1Keys[i];
        if (!obj2.hasOwnProperty(obj1KeyItem) || !Object.is(obj1[obj1KeyItem], obj2[obj1KeyItem])) {
            return false;
        }
    }
    return true;
}

var SimpleMap = /** @class */ (function () {
    function SimpleMap() {
        this.cache = [];
        this.size = 0;
    }
    SimpleMap.prototype.set = function (k, v) {
        var len = this.cache.length;
        if (!len) {
            this.cache.push({ k: k, v: v });
            this.size += 1;
            return;
        }
        for (var i = 0; i < len; i++) {
            var item = this.cache[i];
            if (item.k === k) {
                item.v = v;
                return;
            }
        }
        this.cache.push({ k: k, v: v });
        this.size += 1;
    };
    SimpleMap.prototype.get = function (k) {
        var len = this.cache.length;
        if (!len) {
            return;
        }
        for (var i = 0; i < len; i++) {
            var item = this.cache[i];
            if (item.k === k) {
                return item.v;
            }
        }
    };
    SimpleMap.prototype.has = function (k) {
        var len = this.cache.length;
        if (!len) {
            return false;
        }
        for (var i = 0; i < len; i++) {
            var item = this.cache[i];
            if (item.k === k) {
                return true;
            }
        }
        return false;
    };
    SimpleMap.prototype["delete"] = function (k) {
        var len = this.cache.length;
        for (var i = 0; i < len; i++) {
            var item = this.cache[i];
            if (item.k === k) {
                this.cache.splice(i, 1);
                this.size -= 1;
                return true;
            }
        }
        return false;
    };
    SimpleMap.prototype.clear = function () {
        var len = this.cache.length;
        this.size = 0;
        if (!len) {
            return;
        }
        while (len) {
            this.cache.pop();
            len--;
        }
    };
    return SimpleMap;
}());
var MapClass = 'Map' in global$1 ? Map : SimpleMap;

function isAttrAnEvent(attr) {
    return attr[0] === 'o' && attr[1] === 'n';
}
function extend(source, from) {
    if (!from) {
        return source;
    }
    for (var key in from) {
        if (from.hasOwnProperty(key)) {
            source[key] = from[key];
        }
    }
    return source;
}
function clone(obj) {
    return extend({}, obj);
}

var Current = {
    current: null
};

var EMPTY_CHILDREN = [];
var EMPTY_OBJ = {};
function isNullOrUndef(o) {
    return o === undefined || o === null;
}
function isInvalid(o) {
    return isNullOrUndef(o) || o === true || o === false;
}

function isVText(node) {
    return !isNullOrUndef(node) && node.vtype === VType.Text;
}
function isComponent(instance) {
    return !isInvalid(instance) && instance.isReactComponent === EMPTY_OBJ;
}
function isWidget(node) {
    return (!isNullOrUndef(node) &&
        (node.vtype & (VType.Composite | VType.Stateless)) > 0);
}
function isPortal(vtype, node) {
    return (vtype & VType.Portal) > 0;
}
function isComposite(node) {
    return !isNullOrUndef(node) && node.vtype === VType.Composite;
}
function isStateless(node) {
    return !isNullOrUndef(node) && node.vtype === VType.Stateless;
}
function isValidElement(node) {
    return !isNullOrUndef(node) && node.vtype;
}

// tslint:disable-next-line:no-empty
function noop$1() { }
// typescript will compile the enum's value for us.
// eg.
// Composite = 1 << 2  => Composite = 4
var VType;
(function (VType) {
    VType[VType["Text"] = 1] = "Text";
    VType[VType["Node"] = 2] = "Node";
    VType[VType["Composite"] = 4] = "Composite";
    VType[VType["Stateless"] = 8] = "Stateless";
    VType[VType["Void"] = 16] = "Void";
    VType[VType["Portal"] = 32] = "Portal";
})(VType || (VType = {}));

var Ref = {
    update: function (lastVnode, nextVnode, domNode) {
        var prevRef = lastVnode != null && lastVnode.ref;
        var nextRef = nextVnode != null && nextVnode.ref;
        if (prevRef !== nextRef) {
            this.detach(lastVnode, prevRef, lastVnode.dom);
            this.attach(nextVnode, nextRef, domNode);
        }
    },
    attach: function (vnode, ref, domNode) {
        var node = isComposite(vnode) ? vnode.component : domNode;
        if (isFunction(ref)) {
            ref(node);
        }
        else if (isString(ref)) {
            var inst = vnode._owner;
            if (inst && isFunction(inst.render)) {
                inst.refs[ref] = node;
            }
        }
    },
    detach: function (vnode, ref, domNode) {
        var node = isComposite(vnode) ? vnode.component : domNode;
        if (isFunction(ref)) {
            ref(null);
        }
        else if (isString(ref)) {
            var inst = vnode._owner;
            if (inst.refs[ref] === node && isFunction(inst.render)) {
                delete inst.refs[ref];
            }
        }
    }
};

var ONINPUT = 'oninput';
var ONPROPERTYCHANGE = 'onpropertychange';
var isiOS = isBrowser &&
    !!navigator.platform &&
    /iPad|iPhone|iPod/.test(navigator.platform);
var delegatedEvents = new MapClass();
var unbubbleEvents = (_a = {}, _a[ONPROPERTYCHANGE] = 1, _a.onmousemove = 1, _a.ontouchmove = 1, _a.onmouseleave = 1, _a.onmouseenter = 1, _a.onload = 1, _a.onunload = 1, _a.onscroll = 1, _a.onfocus = 1, _a.onblur = 1, _a.onrowexit = 1, _a.onbeforeunload = 1, _a.onstop = 1, _a.ondragdrop = 1, _a.ondragenter = 1, _a.ondragexit = 1, _a.ondraggesture = 1, _a.ondragover = 1, _a.oncontextmenu = 1, _a.onerror = 1, _a.onabort = 1, _a.oncanplay = 1, _a.oncanplaythrough = 1, _a.ondurationchange = 1, _a.onemptied = 1, _a.onended = 1, _a.onloadeddata = 1, _a.onloadedmetadata = 1, _a.onloadstart = 1, _a.onencrypted = 1, _a.onpause = 1, _a.onplay = 1, _a.onplaying = 1, _a.onprogress = 1, _a.onratechange = 1, _a.onseeking = 1, _a.onseeked = 1, _a.onstalled = 1, _a.onsuspend = 1, _a.ontimeupdate = 1, _a.onvolumechange = 1, _a.onwaiting = 1, _a);
var bindFocus = false;
/* istanbul ignore next */
if (isBrowser && navigator.userAgent.indexOf('MSIE 9') >= 0) {
    var elements_1 = [];
    var values_1 = [];
    doc.addEventListener('selectionchange', function () {
        var el = doc.activeElement;
        if (detectCanUseOnInputNode(el)) {
            var index = elements_1.indexOf(el);
            var element = (elements_1[index] || elements_1.push(el));
            if (element.value !== values_1[index]) {
                var ev = doc.createEvent('CustomEvent');
                ev.initCustomEvent('input', true, true, undefined);
                values_1[index] = element.value;
                el.dispatchEvent(ev);
            }
        }
    });
}
if (typeof Event !== 'undefined' && !Event.prototype.persist) {
    // tslint:disable-next-line:no-empty
    Event.prototype.persist = noop$1;
}
function attachEvent(domNode, eventName, handler) {
    eventName = fixEvent(domNode, eventName);
    /* istanbul ignore next */
    if (eventName === ONPROPERTYCHANGE) {
        processOnPropertyChangeEvent(domNode, handler);
        return;
    }
    var delegatedRoots = delegatedEvents.get(eventName);
    if (unbubbleEvents[eventName] === 1) {
        if (!delegatedRoots) {
            delegatedRoots = new MapClass();
        }
        var event = attachEventToNode(domNode, eventName, delegatedRoots);
        delegatedEvents.set(eventName, delegatedRoots);
        if (isFunction(handler)) {
            delegatedRoots.set(domNode, {
                eventHandler: handler,
                event: event
            });
        }
    }
    else {
        if (!delegatedRoots) {
            delegatedRoots = {
                items: new MapClass()
            };
            delegatedRoots.event = attachEventToDocument(doc, eventName, delegatedRoots);
            delegatedEvents.set(eventName, delegatedRoots);
        }
        if (isFunction(handler)) {
            if (isiOS) {
                domNode.onclick = noop$1;
            }
            delegatedRoots.items.set(domNode, handler);
        }
    }
}
function detachEvent(domNode, eventName, handler) {
    eventName = fixEvent(domNode, eventName);
    if (eventName === ONPROPERTYCHANGE) {
        return;
    }
    var delegatedRoots = delegatedEvents.get(eventName);
    if (unbubbleEvents[eventName] === 1 && delegatedRoots) {
        var event = delegatedRoots.get(domNode);
        if (event) {
            domNode.removeEventListener(parseEventName(eventName), event.event, false);
            /* istanbul ignore next */
            var delegatedRootsSize = delegatedRoots.size;
            if (delegatedRoots["delete"](domNode) && delegatedRootsSize === 0) {
                delegatedEvents["delete"](eventName);
            }
        }
    }
    else if (delegatedRoots && delegatedRoots.items) {
        var items = delegatedRoots.items;
        if (items["delete"](domNode) && items.size === 0) {
            doc.removeEventListener(parseEventName(eventName), delegatedRoots.event, false);
            delegatedEvents["delete"](eventName);
        }
    }
}
var propertyChangeActiveElement;
var propertyChangeActiveElementValue;
var propertyChangeActiveElementValueProp;
var propertyChangeActiveHandlers = {};
/* istanbul ignore next */
function propertyChangeHandler(event) {
    if (event.propertyName !== 'value') {
        return;
    }
    var target = event.target || event.srcElement;
    var val = target.value;
    if (val === propertyChangeActiveElementValue) {
        return;
    }
    propertyChangeActiveElementValue = val;
    var handler = propertyChangeActiveHandlers[target.name];
    if (isFunction(handler)) {
        handler.call(target, event);
    }
}
/* istanbul ignore next */
function processOnPropertyChangeEvent(node, handler) {
    propertyChangeActiveHandlers[node.name] = handler;
    if (!bindFocus) {
        // bindFocus = true
        node.addEventListener('focusin', function () {
            unbindOnPropertyChange();
            bindOnPropertyChange(node);
        }, false);
        node.addEventListener('focusout', unbindOnPropertyChange, false);
    }
}
/* istanbul ignore next */
function bindOnPropertyChange(node) {
    propertyChangeActiveElement = node;
    propertyChangeActiveElementValue = node.value;
    propertyChangeActiveElementValueProp = Object.getOwnPropertyDescriptor(node.constructor.prototype, 'value');
    Object.defineProperty(propertyChangeActiveElement, 'value', {
        get: function () {
            return propertyChangeActiveElementValueProp.get.call(this);
        },
        set: function (val) {
            propertyChangeActiveElementValue = val;
            propertyChangeActiveElementValueProp.set.call(this, val);
        }
    });
    propertyChangeActiveElement.addEventListener('propertychange', propertyChangeHandler, false);
}
/* istanbul ignore next */
function unbindOnPropertyChange() {
    if (!propertyChangeActiveElement) {
        return;
    }
    delete propertyChangeActiveElement.value;
    propertyChangeActiveElement.removeEventListener('propertychange', propertyChangeHandler, false);
    propertyChangeActiveElement = null;
    propertyChangeActiveElementValue = null;
    propertyChangeActiveElementValueProp = null;
}
function detectCanUseOnInputNode(node) {
    var nodeName = node.nodeName && node.nodeName.toLowerCase();
    var type = node.type;
    return ((nodeName === 'input' && /text|password/.test(type)) ||
        nodeName === 'textarea');
}
function fixEvent(node, eventName) {
    if (eventName === 'onDoubleClick') {
        eventName = 'ondblclick';
    }
    else if (eventName === 'onTouchTap') {
        eventName = 'onclick';
        // tslint:disable-next-line:prefer-conditional-expression
    }
    else if (eventName === 'onChange' && detectCanUseOnInputNode(node)) {
        eventName = ONINPUT in window ? ONINPUT : ONPROPERTYCHANGE;
    }
    else {
        eventName = eventName.toLowerCase();
    }
    return eventName;
}
function parseEventName(name) {
    return name.substr(2);
}
/* istanbul ignore next */
function stopPropagation() {
    this.cancelBubble = true;
    this.stopImmediatePropagation();
}
function dispatchEvent(event, target, items, count, eventData) {
    var eventsToTrigger = items.get(target);
    if (eventsToTrigger) {
        count--;
        eventData.currentTarget = target;
        // for React synthetic event compatibility
        Object.defineProperties(event, {
            nativeEvent: {
                value: event
            }
        });
        eventsToTrigger(event);
        if (event.cancelBubble) {
            return;
        }
    }
    if (count > 0) {
        var parentDom = target.parentNode;
        if (parentDom === null ||
            (event.type === 'click' && parentDom.nodeType === 1 && parentDom.disabled)) {
            return;
        }
        dispatchEvent(event, parentDom, items, count, eventData);
    }
}
function attachEventToDocument(d, eventName, delegatedRoots) {
    var eventHandler = function (event) {
        var items = delegatedRoots.items;
        var count = items.size;
        if (count > 0) {
            var eventData_1 = {
                currentTarget: event.target
            };
            /* istanbul ignore next */
            try {
                Object.defineProperties(event, {
                    currentTarget: {
                        configurable: true,
                        get: function () {
                            return eventData_1.currentTarget;
                        }
                    },
                    stopPropagation: {
                        value: stopPropagation
                    }
                });
            }
            catch (error) {
                // some browsers crashed
                // see: https://stackoverflow.com/questions/44052813/why-cannot-redefine-property
            }
            dispatchEvent(event, event.target, delegatedRoots.items, count, eventData_1);
        }
    };
    d.addEventListener(parseEventName(eventName), eventHandler, false);
    return eventHandler;
}
function attachEventToNode(node, eventName, delegatedRoots) {
    var eventHandler = function (event) {
        var eventToTrigger = delegatedRoots.get(node);
        if (eventToTrigger && eventToTrigger.eventHandler) {
            var eventData_2 = {
                currentTarget: node
            };
            /* istanbul ignore next */
            Object.defineProperties(event, {
                currentTarget: {
                    configurable: true,
                    get: function () {
                        return eventData_2.currentTarget;
                    }
                }
            });
            eventToTrigger.eventHandler(event);
        }
    };
    node.addEventListener(parseEventName(eventName), eventHandler, false);
    return eventHandler;
}
var _a;

var options = {
    afterMount: noop$1,
    afterUpdate: noop$1,
    beforeUnmount: noop$1,
    roots: [],
    debug: false
};

function unmountChildren(children, parentDom) {
    if (isArray(children)) {
        for (var i = 0, len = children.length; i < len; i++) {
            unmount(children[i], parentDom);
        }
    }
    else {
        unmount(children, parentDom);
    }
}
function unmount(vnode, parentDom) {
    if (isInvalid(vnode)) {
        return;
    }
    var vtype = vnode.vtype;
    // Bitwise operators for better performance
    // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
    var dom = vnode.dom;
    if ((vtype & (VType.Composite | VType.Stateless)) > 0) {
        options.beforeUnmount(vnode);
        vnode.destroy();
    }
    else if ((vtype & VType.Node) > 0) {
        var props = vnode.props, children = vnode.children, ref = vnode.ref;
        unmountChildren(children);
        for (var propName in props) {
            if (isAttrAnEvent(propName)) {
                detachEvent(dom, propName, props[propName]);
            }
        }
        if (ref !== null) {
            Ref.detach(vnode, ref, dom);
        }
    }
    else if (vtype & VType.Portal) {
        unmountChildren(vnode.children, vnode.type);
    }
    if (!isNullOrUndef(parentDom) && !isNullOrUndef(dom)) {
        parentDom.removeChild(dom);
    }
    // vnode.dom = null
}

var NS = {
    ev: 'http://www.w3.org/2001/xml-events',
    xlink: 'http://www.w3.org/1999/xlink',
    xml: 'http://www.w3.org/XML/1998/namespace'
};
var ATTRS = {
    accentHeight: 'accent-height',
    accumulate: 0,
    additive: 0,
    alignmentBaseline: 'alignment-baseline',
    allowReorder: 'allowReorder',
    alphabetic: 0,
    amplitude: 0,
    arabicForm: 'arabic-form',
    ascent: 0,
    attributeName: 'attributeName',
    attributeType: 'attributeType',
    autoReverse: 'autoReverse',
    azimuth: 0,
    baseFrequency: 'baseFrequency',
    baseProfile: 'baseProfile',
    baselineShift: 'baseline-shift',
    bbox: 0,
    begin: 0,
    bias: 0,
    by: 0,
    calcMode: 'calcMode',
    capHeight: 'cap-height',
    clip: 0,
    clipPath: 'clip-path',
    clipRule: 'clip-rule',
    clipPathUnits: 'clipPathUnits',
    colorInterpolation: 'color-interpolation',
    colorInterpolationFilters: 'color-interpolation-filters',
    colorProfile: 'color-profile',
    colorRendering: 'color-rendering',
    contentScriptType: 'contentScriptType',
    contentStyleType: 'contentStyleType',
    cursor: 0,
    cx: 0,
    cy: 0,
    d: 0,
    decelerate: 0,
    descent: 0,
    diffuseConstant: 'diffuseConstant',
    direction: 0,
    display: 0,
    divisor: 0,
    dominantBaseline: 'dominant-baseline',
    dur: 0,
    dx: 0,
    dy: 0,
    edgeMode: 'edgeMode',
    elevation: 0,
    enableBackground: 'enable-background',
    end: 0,
    evEvent: 'ev:event',
    exponent: 0,
    externalResourcesRequired: 'externalResourcesRequired',
    fill: 0,
    fillOpacity: 'fill-opacity',
    fillRule: 'fill-rule',
    filter: 0,
    filterRes: 'filterRes',
    filterUnits: 'filterUnits',
    floodColor: 'flood-color',
    floodOpacity: 'flood-opacity',
    focusable: 0,
    fontFamily: 'font-family',
    fontSize: 'font-size',
    fontSizeAdjust: 'font-size-adjust',
    fontStretch: 'font-stretch',
    fontStyle: 'font-style',
    fontVariant: 'font-variant',
    fontWeight: 'font-weight',
    format: 0,
    from: 0,
    fx: 0,
    fy: 0,
    g1: 0,
    g2: 0,
    glyphName: 'glyph-name',
    glyphOrientationHorizontal: 'glyph-orientation-horizontal',
    glyphOrientationVertical: 'glyph-orientation-vertical',
    glyphRef: 'glyphRef',
    gradientTransform: 'gradientTransform',
    gradientUnits: 'gradientUnits',
    hanging: 0,
    horizAdvX: 'horiz-adv-x',
    horizOriginX: 'horiz-origin-x',
    ideographic: 0,
    imageRendering: 'image-rendering',
    "in": 0,
    in2: 0,
    intercept: 0,
    k: 0,
    k1: 0,
    k2: 0,
    k3: 0,
    k4: 0,
    kernelMatrix: 'kernelMatrix',
    kernelUnitLength: 'kernelUnitLength',
    kerning: 0,
    keyPoints: 'keyPoints',
    keySplines: 'keySplines',
    keyTimes: 'keyTimes',
    lengthAdjust: 'lengthAdjust',
    letterSpacing: 'letter-spacing',
    lightingColor: 'lighting-color',
    limitingConeAngle: 'limitingConeAngle',
    local: 0,
    markerEnd: 'marker-end',
    markerMid: 'marker-mid',
    markerStart: 'marker-start',
    markerHeight: 'markerHeight',
    markerUnits: 'markerUnits',
    markerWidth: 'markerWidth',
    mask: 0,
    maskContentUnits: 'maskContentUnits',
    maskUnits: 'maskUnits',
    mathematical: 0,
    mode: 0,
    numOctaves: 'numOctaves',
    offset: 0,
    opacity: 0,
    operator: 0,
    order: 0,
    orient: 0,
    orientation: 0,
    origin: 0,
    overflow: 0,
    overlinePosition: 'overline-position',
    overlineThickness: 'overline-thickness',
    paintOrder: 'paint-order',
    panose1: 'panose-1',
    pathLength: 'pathLength',
    patternContentUnits: 'patternContentUnits',
    patternTransform: 'patternTransform',
    patternUnits: 'patternUnits',
    pointerEvents: 'pointer-events',
    points: 0,
    pointsAtX: 'pointsAtX',
    pointsAtY: 'pointsAtY',
    pointsAtZ: 'pointsAtZ',
    preserveAlpha: 'preserveAlpha',
    preserveAspectRatio: 'preserveAspectRatio',
    primitiveUnits: 'primitiveUnits',
    r: 0,
    radius: 0,
    refX: 'refX',
    refY: 'refY',
    renderingIntent: 'rendering-intent',
    repeatCount: 'repeatCount',
    repeatDur: 'repeatDur',
    requiredExtensions: 'requiredExtensions',
    requiredFeatures: 'requiredFeatures',
    restart: 0,
    result: 0,
    rotate: 0,
    rx: 0,
    ry: 0,
    scale: 0,
    seed: 0,
    shapeRendering: 'shape-rendering',
    slope: 0,
    spacing: 0,
    specularConstant: 'specularConstant',
    specularExponent: 'specularExponent',
    speed: 0,
    spreadMethod: 'spreadMethod',
    startOffset: 'startOffset',
    stdDeviation: 'stdDeviation',
    stemh: 0,
    stemv: 0,
    stitchTiles: 'stitchTiles',
    stopColor: 'stop-color',
    stopOpacity: 'stop-opacity',
    strikethroughPosition: 'strikethrough-position',
    strikethroughThickness: 'strikethrough-thickness',
    string: 0,
    stroke: 0,
    strokeDasharray: 'stroke-dasharray',
    strokeDashoffset: 'stroke-dashoffset',
    strokeLinecap: 'stroke-linecap',
    strokeLinejoin: 'stroke-linejoin',
    strokeMiterlimit: 'stroke-miterlimit',
    strokeOpacity: 'stroke-opacity',
    strokeWidth: 'stroke-width',
    surfaceScale: 'surfaceScale',
    systemLanguage: 'systemLanguage',
    tableValues: 'tableValues',
    targetX: 'targetX',
    targetY: 'targetY',
    textAnchor: 'text-anchor',
    textDecoration: 'text-decoration',
    textRendering: 'text-rendering',
    textLength: 'textLength',
    to: 0,
    transform: 0,
    u1: 0,
    u2: 0,
    underlinePosition: 'underline-position',
    underlineThickness: 'underline-thickness',
    unicode: 0,
    unicodeBidi: 'unicode-bidi',
    unicodeRange: 'unicode-range',
    unitsPerEm: 'units-per-em',
    vAlphabetic: 'v-alphabetic',
    vHanging: 'v-hanging',
    vIdeographic: 'v-ideographic',
    vMathematical: 'v-mathematical',
    values: 0,
    vectorEffect: 'vector-effect',
    version: 0,
    vertAdvY: 'vert-adv-y',
    vertOriginX: 'vert-origin-x',
    vertOriginY: 'vert-origin-y',
    viewBox: 'viewBox',
    viewTarget: 'viewTarget',
    visibility: 0,
    widths: 0,
    wordSpacing: 'word-spacing',
    writingMode: 'writing-mode',
    x: 0,
    xHeight: 'x-height',
    x1: 0,
    x2: 0,
    xChannelSelector: 'xChannelSelector',
    xlinkActuate: 'xlink:actuate',
    xlinkArcrole: 'xlink:arcrole',
    xlinkHref: 'xlink:href',
    xlinkRole: 'xlink:role',
    xlinkShow: 'xlink:show',
    xlinkTitle: 'xlink:title',
    xlinkType: 'xlink:type',
    xmlBase: 'xml:base',
    xmlId: 'xml:id',
    xmlns: 0,
    xmlnsXlink: 'xmlns:xlink',
    xmlLang: 'xml:lang',
    xmlSpace: 'xml:space',
    y: 0,
    y1: 0,
    y2: 0,
    yChannelSelector: 'yChannelSelector',
    z: 0,
    zoomAndPan: 'zoomAndPan'
};
var SVGPropertyConfig = {
    Properties: {},
    DOMAttributeNamespaces: {
        'ev:event': NS.ev,
        'xlink:actuate': NS.xlink,
        'xlink:arcrole': NS.xlink,
        'xlink:href': NS.xlink,
        'xlink:role': NS.xlink,
        'xlink:show': NS.xlink,
        'xlink:title': NS.xlink,
        'xlink:type': NS.xlink,
        'xml:base': NS.xml,
        'xml:id': NS.xml,
        'xml:lang': NS.xml,
        'xml:space': NS.xml
    },
    DOMAttributeNames: {}
};
Object.keys(ATTRS).forEach(function (key) {
    SVGPropertyConfig.Properties[key] = 0;
    if (ATTRS[key]) {
        SVGPropertyConfig.DOMAttributeNames[key] = ATTRS[key];
    }
});

/* tslint:disable: no-empty*/
function patch(lastVnode, nextVnode, parentNode, context, isSvg) {
    var lastDom = lastVnode.dom;
    var newDom;
    if (isSameVNode(lastVnode, nextVnode)) {
        var vtype = nextVnode.vtype;
        if (vtype & VType.Node) {
            isSvg = isNullOrUndef(isSvg) ? lastVnode.isSvg : isSvg;
            if (isSvg) {
                nextVnode.isSvg = isSvg;
            }
            patchProps(lastDom, nextVnode.props, lastVnode.props, lastVnode, isSvg);
            patchChildren(lastDom, lastVnode.children, nextVnode.children, context, isSvg);
            if (nextVnode.ref !== null) {
                Ref.update(lastVnode, nextVnode, lastDom);
            }
            newDom = lastDom;
        }
        else if ((vtype & (VType.Composite | VType.Stateless)) > 0) {
            newDom = nextVnode.update(lastVnode, nextVnode, context);
            options.afterUpdate(nextVnode);
        }
        else if (vtype & VType.Text) {
            return patchVText(lastVnode, nextVnode);
        }
        else if (vtype & VType.Portal) {
            patchChildren(lastVnode.type, lastVnode.children, nextVnode.children, context, isSvg);
        }
        // @TODO: test case
        nextVnode.dom = newDom || lastDom;
    }
    else {
        unmount(lastVnode);
        newDom = createElement(nextVnode, isSvg, context);
        if (nextVnode !== null) {
            nextVnode.dom = newDom;
        }
        if (parentNode !== null) {
            parentNode.replaceChild(newDom, lastDom);
        }
    }
    return newDom;
}
function patchArrayChildren(parentDom, lastChildren, nextChildren, context, isSvg) {
    var lastLength = lastChildren.length;
    var nextLength = nextChildren.length;
    if (lastLength === 0) {
        if (nextLength > 0) {
            for (var i = 0; i < nextLength; i++) {
                mountChild(nextChildren[i], parentDom, context, isSvg);
            }
        }
    }
    else if (nextLength === 0) {
        unmountChildren(lastChildren);
        parentDom.textContent = '';
    }
    else {
        if (isKeyed(lastChildren, nextChildren)) {
            patchKeyedChildren(lastChildren, nextChildren, parentDom, context, isSvg, lastLength, nextLength);
        }
        else {
            patchNonKeyedChildren(parentDom, lastChildren, nextChildren, context, isSvg, lastLength, nextLength);
        }
    }
}
function patchChildren(parentDom, lastChildren, nextChildren, context, isSvg) {
    // @TODO: is a better way to compatible with react-router?
    // if (lastChildren === nextChildren) {
    //   return
    // }
    var lastChildrenIsArray = isArray(lastChildren);
    var nextChildrenIsArray = isArray(nextChildren);
    if (lastChildrenIsArray && nextChildrenIsArray) {
        patchArrayChildren(parentDom, lastChildren, nextChildren, context, isSvg);
    }
    else if (!lastChildrenIsArray && !nextChildrenIsArray) {
        patch(lastChildren, nextChildren, parentDom, context, isSvg);
    }
    else if (lastChildrenIsArray && !nextChildrenIsArray) {
        patchArrayChildren(parentDom, lastChildren, [nextChildren], context, isSvg);
    }
    else if (!lastChildrenIsArray && nextChildrenIsArray) {
        patchArrayChildren(parentDom, [lastChildren], nextChildren, context, isSvg);
    }
}
function patchNonKeyedChildren(parentDom, lastChildren, nextChildren, context, isSvg, lastLength, nextLength) {
    var minLength = Math.min(lastLength, nextLength);
    var i = 0;
    while (i < minLength) {
        patch(lastChildren[i], nextChildren[i], parentDom, context, isSvg);
        i++;
    }
    if (lastLength < nextLength) {
        for (i = minLength; i < nextLength; i++) {
            if (parentDom !== null) {
                parentDom.appendChild(createElement(nextChildren[i], isSvg, context));
            }
        }
    }
    else if (lastLength > nextLength) {
        for (i = minLength; i < lastLength; i++) {
            unmount(lastChildren[i], parentDom);
        }
    }
}
/**
 *
 * Virtual DOM patching algorithm based on ivi by
 * Boris Kaul (@localvoid)
 * Licensed under the MIT License
 * https://github.com/ivijs/ivi/blob/master/LICENSE
 *
 */
function patchKeyedChildren(a, b, dom, context, isSvg, aLength, bLength) {
    var aEnd = aLength - 1;
    var bEnd = bLength - 1;
    var aStart = 0;
    var bStart = 0;
    var i;
    var j;
    var aNode;
    var bNode;
    var nextNode;
    var nextPos;
    var node;
    var aStartNode = a[aStart];
    var bStartNode = b[bStart];
    var aEndNode = a[aEnd];
    var bEndNode = b[bEnd];
    // Step 1
    // tslint:disable-next-line
    outer: {
        // Sync nodes with the same key at the beginning.
        while (aStartNode.key === bStartNode.key) {
            patch(aStartNode, bStartNode, dom, context, isSvg);
            aStart++;
            bStart++;
            if (aStart > aEnd || bStart > bEnd) {
                break outer;
            }
            aStartNode = a[aStart];
            bStartNode = b[bStart];
        }
        // Sync nodes with the same key at the end.
        while (aEndNode.key === bEndNode.key) {
            patch(aEndNode, bEndNode, dom, context, isSvg);
            aEnd--;
            bEnd--;
            if (aStart > aEnd || bStart > bEnd) {
                break outer;
            }
            aEndNode = a[aEnd];
            bEndNode = b[bEnd];
        }
    }
    if (aStart > aEnd) {
        if (bStart <= bEnd) {
            nextPos = bEnd + 1;
            nextNode = nextPos < bLength ? b[nextPos].dom : null;
            while (bStart <= bEnd) {
                node = b[bStart];
                bStart++;
                attachNewNode(dom, createElement(node, isSvg, context), nextNode);
            }
        }
    }
    else if (bStart > bEnd) {
        while (aStart <= aEnd) {
            unmount(a[aStart++], dom);
        }
    }
    else {
        var aLeft = aEnd - aStart + 1;
        var bLeft = bEnd - bStart + 1;
        var sources = new Array(bLeft);
        // Mark all nodes as inserted.
        for (i = 0; i < bLeft; i++) {
            sources[i] = -1;
        }
        var moved = false;
        var pos = 0;
        var patched = 0;
        // When sizes are small, just loop them through
        if (bLeft <= 4 || aLeft * bLeft <= 16) {
            for (i = aStart; i <= aEnd; i++) {
                aNode = a[i];
                if (patched < bLeft) {
                    for (j = bStart; j <= bEnd; j++) {
                        bNode = b[j];
                        if (aNode.key === bNode.key) {
                            sources[j - bStart] = i;
                            if (pos > j) {
                                moved = true;
                            }
                            else {
                                pos = j;
                            }
                            patch(aNode, bNode, dom, context, isSvg);
                            patched++;
                            a[i] = null;
                            break;
                        }
                    }
                }
            }
        }
        else {
            var keyIndex = new MapClass();
            for (i = bStart; i <= bEnd; i++) {
                keyIndex.set(b[i].key, i);
            }
            for (i = aStart; i <= aEnd; i++) {
                aNode = a[i];
                if (patched < bLeft) {
                    j = keyIndex.get(aNode.key);
                    if (j !== undefined) {
                        bNode = b[j];
                        sources[j - bStart] = i;
                        if (pos > j) {
                            moved = true;
                        }
                        else {
                            pos = j;
                        }
                        patch(aNode, bNode, dom, context, isSvg);
                        patched++;
                        a[i] = null;
                    }
                }
            }
        }
        if (aLeft === aLength && patched === 0) {
            unmountChildren(a);
            dom.textContent = '';
            while (bStart < bLeft) {
                node = b[bStart];
                bStart++;
                attachNewNode(dom, createElement(node, isSvg, context), null);
            }
        }
        else {
            i = aLeft - patched;
            while (i > 0) {
                aNode = a[aStart++];
                if (aNode !== null) {
                    unmount(aNode, dom);
                    i--;
                }
            }
            if (moved) {
                var seq = lis(sources);
                j = seq.length - 1;
                for (i = bLeft - 1; i >= 0; i--) {
                    if (sources[i] === -1) {
                        pos = i + bStart;
                        node = b[pos];
                        nextPos = pos + 1;
                        attachNewNode(dom, createElement(node, isSvg, context), nextPos < bLength ? b[nextPos].dom : null);
                    }
                    else {
                        if (j < 0 || i !== seq[j]) {
                            pos = i + bStart;
                            node = b[pos];
                            nextPos = pos + 1;
                            attachNewNode(dom, node.dom, nextPos < bLength ? b[nextPos].dom : null);
                        }
                        else {
                            j--;
                        }
                    }
                }
            }
            else if (patched !== bLeft) {
                for (i = bLeft - 1; i >= 0; i--) {
                    if (sources[i] === -1) {
                        pos = i + bStart;
                        node = b[pos];
                        nextPos = pos + 1;
                        attachNewNode(dom, createElement(node, isSvg, context), nextPos < bLength ? b[nextPos].dom : null);
                    }
                }
            }
        }
    }
}
function attachNewNode(parentDom, newNode, nextNode) {
    if (isNullOrUndef(nextNode)) {
        parentDom.appendChild(newNode);
    }
    else {
        parentDom.insertBefore(newNode, nextNode);
    }
}
/**
 * Slightly modified Longest Increased Subsequence algorithm, it ignores items that have -1 value, they're representing
 * new items.
 *
 * http://en.wikipedia.org/wiki/Longest_increasing_subsequence
 *
 * @param a Array of numbers.
 * @returns Longest increasing subsequence.
 */
function lis(a) {
    var p = a.slice();
    var result = [];
    result.push(0);
    var u;
    var v;
    for (var i = 0, il = a.length; i < il; ++i) {
        if (a[i] === -1) {
            continue;
        }
        var j = result[result.length - 1];
        if (a[j] < a[i]) {
            p[i] = j;
            result.push(i);
            continue;
        }
        u = 0;
        v = result.length - 1;
        while (u < v) {
            var c = ((u + v) / 2) | 0;
            if (a[result[c]] < a[i]) {
                u = c + 1;
            }
            else {
                v = c;
            }
        }
        if (a[i] < a[result[u]]) {
            if (u > 0) {
                p[i] = result[u - 1];
            }
            result[u] = i;
        }
    }
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
        result[u] = v;
        v = p[v];
    }
    return result;
}
function isKeyed(lastChildren, nextChildren) {
    return (nextChildren.length > 0 &&
        !isNullOrUndef(nextChildren[0]) &&
        !isNullOrUndef(nextChildren[0].key) &&
        lastChildren.length > 0 &&
        !isNullOrUndef(lastChildren[0]) &&
        !isNullOrUndef(lastChildren[0].key));
}
function isSameVNode(a, b) {
    if (isInvalid(a) || isInvalid(b) || isArray(a) || isArray(b)) {
        return false;
    }
    return a.type === b.type && a.vtype === b.vtype && a.key === b.key;
}
function patchVText(lastVNode, nextVNode) {
    var dom = lastVNode.dom;
    if (dom === null) {
        return;
    }
    var nextText = nextVNode.text;
    nextVNode.dom = dom;
    if (lastVNode.text !== nextText) {
        dom.nodeValue = nextText;
    }
    return dom;
}
var skipProps = {
    children: 1,
    key: 1,
    ref: 1,
    owner: 1
};
var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
function setStyle(domStyle, style, value) {
    if (isNullOrUndef(value) || (isNumber(value) && isNaN(value))) {
        domStyle[style] = '';
        return;
    }
    if (style === 'float') {
        domStyle['cssFloat'] = value;
        domStyle['styleFloat'] = value;
        return;
    }
    domStyle[style] =
        !isNumber(value) || IS_NON_DIMENSIONAL.test(style) ? value : value + 'px';
}
function patchEvent(eventName, lastEvent, nextEvent, domNode) {
    if (lastEvent !== nextEvent) {
        if (isFunction(lastEvent)) {
            detachEvent(domNode, eventName, lastEvent);
        }
        attachEvent(domNode, eventName, nextEvent);
    }
}
function patchStyle(lastAttrValue, nextAttrValue, dom) {
    var domStyle = dom.style;
    var style;
    var value;
    if (isString(nextAttrValue)) {
        domStyle.cssText = nextAttrValue;
        return;
    }
    if (!isNullOrUndef(lastAttrValue) && !isString(lastAttrValue)) {
        for (style in nextAttrValue) {
            value = nextAttrValue[style];
            if (value !== lastAttrValue[style]) {
                setStyle(domStyle, style, value);
            }
        }
    }
    else {
        for (style in nextAttrValue) {
            value = nextAttrValue[style];
            setStyle(domStyle, style, value);
        }
    }
}
function patchProp(domNode, prop, lastValue, nextValue, lastVnode, isSvg) {
    // fix the value update for textarea/input
    if (lastValue !== nextValue || prop === 'value') {
        if (prop === 'className') {
            prop = 'class';
        }
        if (skipProps[prop] === 1) {
            return;
        }
        else if (prop === 'class' && !isSvg) {
            domNode.className = nextValue;
        }
        else if (prop === 'dangerouslySetInnerHTML') {
            var lastHtml = lastValue && lastValue.__html;
            var nextHtml = nextValue && nextValue.__html;
            if (lastHtml !== nextHtml) {
                if (!isNullOrUndef(nextHtml)) {
                    if (isValidElement(lastVnode) &&
                        lastVnode.children !== EMPTY_CHILDREN) {
                        unmountChildren(lastVnode.children);
                        lastVnode.children = [];
                    }
                    domNode.innerHTML = nextHtml;
                }
            }
        }
        else if (isAttrAnEvent(prop)) {
            patchEvent(prop, lastValue, nextValue, domNode);
        }
        else if (prop === 'style') {
            patchStyle(lastValue, nextValue, domNode);
        }
        else if (prop !== 'list' &&
            prop !== 'type' &&
            !isSvg &&
            prop in domNode) {
            setProperty(domNode, prop, nextValue == null ? '' : nextValue);
            if (nextValue == null || nextValue === false) {
                domNode.removeAttribute(prop);
            }
        }
        else if (isNullOrUndef(nextValue) || nextValue === false) {
            domNode.removeAttribute(prop);
        }
        else {
            var namespace = SVGPropertyConfig.DOMAttributeNamespaces[prop];
            if (isSvg && namespace) {
                if (nextValue) {
                    domNode.setAttributeNS(namespace, prop, nextValue);
                }
                else {
                    var colonPosition = prop.indexOf(':');
                    var localName = colonPosition > -1 ? prop.substr(colonPosition + 1) : prop;
                    domNode.removeAttributeNS(namespace, localName);
                }
            }
            else {
                if (!isFunction(nextValue)) {
                    domNode.setAttribute(prop, nextValue);
                }
                // WARNING: Non-event attributes with function values:
                // https://reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html#changes-in-detail
            }
        }
    }
}
function setProperty(node, name, value) {
    try {
        node[name] = value;
    }
    catch (e) { }
}
function patchProps(domNode, nextProps, previousProps, lastVnode, isSvg) {
    for (var propName in previousProps) {
        var value = previousProps[propName];
        if (isNullOrUndef(nextProps[propName]) && !isNullOrUndef(value)) {
            if (isAttrAnEvent(propName)) {
                detachEvent(domNode, propName, value);
            }
            else if (propName === 'dangerouslySetInnerHTML') {
                domNode.textContent = '';
            }
            else if (propName === 'className') {
                domNode.removeAttribute('class');
            }
            else {
                domNode.removeAttribute(propName);
            }
        }
    }
    for (var propName in nextProps) {
        patchProp(domNode, propName, previousProps[propName], nextProps[propName], lastVnode, isSvg);
    }
}

var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
function createElement(vnode, isSvg, parentContext, parentComponent) {
    var domNode;
    if (isValidElement(vnode)) {
        var vtype = vnode.vtype;
        if (vtype & (VType.Composite | VType.Stateless)) {
            domNode = vnode.init(parentContext, parentComponent);
            options.afterMount(vnode);
        }
        else if (vtype & VType.Text) {
            domNode = doc.createTextNode(vnode.text);
            vnode.dom = domNode;
        }
        else if (vtype & VType.Node) {
            domNode = mountVNode$1(vnode, isSvg, parentContext, parentComponent);
        }
        else if (vtype & VType.Void) {
            domNode = vnode.dom = doc.createTextNode('');
        }
        else if (isPortal(vtype, vnode)) {
            vnode.type.appendChild(createElement(vnode.children, isSvg, parentContext, parentComponent));
            domNode = doc.createTextNode('');
        }
    }
    else if (isString(vnode) || isNumber(vnode)) {
        domNode = doc.createTextNode(vnode);
    }
    else if (isNullOrUndef(vnode) || isBoolean(vnode)) {
        domNode = doc.createTextNode('');
    }
    else if (isArray(vnode)) {
        domNode = doc.createDocumentFragment();
        vnode.forEach(function (child) {
            if (!isInvalid(child)) {
                var childNode = createElement(child, isSvg, parentContext, parentComponent);
                if (childNode) {
                    domNode.appendChild(childNode);
                }
            }
        });
    }
    else {
        throw new Error('Unsupported VNode.');
    }
    return domNode;
}
function mountVNode$1(vnode, isSvg, parentContext, parentComponent) {
    if (vnode.isSvg) {
        isSvg = true;
    }
    else if (vnode.type === 'svg') {
        isSvg = true;
        /* istanbul ignore next */
    }
    else if (!isSupportSVG) {
        isSvg = false;
    }
    if (isSvg) {
        vnode.namespace = SVG_NAMESPACE;
        vnode.isSvg = isSvg;
    }
    var domNode = !isSvg
        ? doc.createElement(vnode.type)
        : doc.createElementNS(vnode.namespace, vnode.type);
    setProps(domNode, vnode, isSvg);
    if (vnode.type === 'foreignObject') {
        isSvg = false;
    }
    var children = vnode.children;
    if (isArray(children)) {
        for (var i = 0, len = children.length; i < len; i++) {
            mountChild(children[i], domNode, parentContext, isSvg, parentComponent);
        }
    }
    else {
        mountChild(children, domNode, parentContext, isSvg, parentComponent);
    }
    vnode.dom = domNode;
    if (vnode.ref !== null) {
        Ref.attach(vnode, vnode.ref, domNode);
    }
    return domNode;
}
function mountChild(child, domNode, parentContext, isSvg, parentComponent) {
    child.parentContext = parentContext || EMPTY_OBJ;
    var childNode = createElement(child, isSvg, parentContext, parentComponent);
    if (childNode !== null) {
        domNode.appendChild(childNode);
    }
}
function setProps(domNode, vnode, isSvg) {
    var props = vnode.props;
    for (var p in props) {
        patchProp(domNode, p, null, props[p], null, isSvg);
    }
}

function createVText(text) {
    return {
        text: text,
        vtype: VType.Text,
        dom: null
    };
}

function createVoid() {
    return {
        dom: null,
        vtype: VType.Void
    };
}

var readyComponents = [];
function errorCatcher(fn, component) {
    try {
        return fn();
    }
    catch (error) {
        errorHandler(component, error);
    }
}
function errorHandler(component, error) {
    var boundary;
    while (true) {
        if (isFunction(component.componentDidCatch)) {
            boundary = component;
            break;
        }
        else if (component._parentComponent) {
            component = component._parentComponent;
        }
        else {
            break;
        }
    }
    if (boundary) {
        var _disable = boundary._disable;
        boundary._disable = false;
        boundary.componentDidCatch(error);
        boundary._disable = _disable;
    }
    else {
        throw error;
    }
}
function ensureVirtualNode(rendered) {
    if (isNumber(rendered) || isString(rendered)) {
        return createVText(rendered);
    }
    else if (isInvalid(rendered)) {
        return createVoid();
    }
    return rendered;
}
function mountVNode(vnode, parentContext, parentComponent) {
    return createElement(vnode, false, parentContext, parentComponent);
}
function mountComponent(vnode, parentContext, parentComponent) {
    var ref = vnode.ref;
    vnode.component = new vnode.type(vnode.props, parentContext);
    var component = vnode.component;
    component.vnode = vnode;
    if (isComponent(parentComponent)) {
        component._parentComponent = parentComponent;
    }
    if (isFunction(component.componentWillMount)) {
        errorCatcher(function () {
            component.componentWillMount();
        }, component);
        component.state = component.getState();
    }
    component._dirty = false;
    var rendered = renderComponent(component);
    rendered.parentVNode = vnode;
    component._rendered = rendered;
    if (isFunction(component.componentDidMount)) {
        readyComponents.push(component);
    }
    if (!isNullOrUndef(ref)) {
        Ref.attach(vnode, ref, vnode.dom);
    }
    var dom = (vnode.dom = mountVNode(rendered, getChildContext(component, parentContext), component));
    component._disable = false;
    return dom;
}
function mountStatelessComponent(vnode, parentContext) {
    var rendered = vnode.type(vnode.props, parentContext);
    vnode._rendered = ensureVirtualNode(rendered);
    vnode._rendered.parentVNode = vnode;
    return (vnode.dom = mountVNode(vnode._rendered, parentContext));
}
function getChildContext(component, context) {
    if (component.getChildContext) {
        return extend(context, component.getChildContext());
    }
    return context;
}
function renderComponent(component) {
    Current.current = component;
    var rendered;
    errorCatcher(function () {
        rendered = component.render();
    }, component);
    rendered = ensureVirtualNode(rendered);
    Current.current = null;
    return rendered;
}
function flushMount() {
    if (!readyComponents.length) {
        return;
    }
    // @TODO: perf
    var queue = readyComponents.slice(0);
    readyComponents.length = 0;
    queue.forEach(function (item) {
        if (isFunction(item)) {
            item();
        }
        else if (item.componentDidMount) {
            errorCatcher(function () {
                item.componentDidMount();
            }, item);
        }
    });
}
function reRenderComponent(prev, current) {
    var component = (current.component = prev.component);
    var nextProps = current.props;
    var nextContext = component.context;
    component._disable = true;
    if (isFunction(component.componentWillReceiveProps)) {
        errorCatcher(function () {
            component.componentWillReceiveProps(nextProps, nextContext);
        }, component);
    }
    component._disable = false;
    component.prevProps = component.props;
    component.prevState = component.state;
    component.prevContext = component.context;
    component.props = nextProps;
    component.context = nextContext;
    if (!isNullOrUndef(current.ref)) {
        Ref.update(prev, current);
    }
    return updateComponent(component);
}
function reRenderStatelessComponent(prev, current, parentContext, domNode) {
    var lastRendered = prev._rendered;
    var rendered = current.type(current.props, parentContext);
    rendered.parentVNode = current;
    current._rendered = rendered;
    return (current.dom = patch(lastRendered, rendered, lastRendered && lastRendered.dom || domNode, parentContext));
}
function updateComponent(component, isForce) {
    if (isForce === void 0) { isForce = false; }
    var vnode = component.vnode;
    var dom = vnode.dom;
    var props = component.props;
    var state = component.getState();
    var context = component.context;
    var prevProps = component.prevProps || props;
    var prevState = component.prevState || state;
    var prevContext = component.prevContext || context;
    component.props = prevProps;
    component.context = prevContext;
    var skip = false;
    if (!isForce &&
        isFunction(component.shouldComponentUpdate) &&
        component.shouldComponentUpdate(props, state, context) === false) {
        skip = true;
    }
    else if (isFunction(component.componentWillUpdate)) {
        errorCatcher(function () {
            component.componentWillUpdate(props, state, context);
        }, component);
    }
    component.props = props;
    component.state = state;
    component.context = context;
    component._dirty = false;
    if (!skip) {
        var lastRendered = component._rendered;
        var rendered = renderComponent(component);
        rendered.parentVNode = vnode;
        var childContext = getChildContext(component, context);
        var parentDom = lastRendered.dom && lastRendered.dom.parentNode;
        dom = vnode.dom = patch(lastRendered, rendered, parentDom || null, childContext);
        component._rendered = rendered;
        if (isFunction(component.componentDidUpdate)) {
            errorCatcher(function () {
                component.componentDidUpdate(prevProps, prevState, context);
            }, component);
        }
        while (vnode = vnode.parentVNode) {
            if ((vnode.vtype & (VType.Composite | VType.Stateless)) > 0) {
                vnode.dom = dom;
            }
        }
    }
    component.prevProps = component.props;
    component.prevState = component.state;
    component.prevContext = component.context;
    if (component._pendingCallbacks) {
        while (component._pendingCallbacks.length) {
            component._pendingCallbacks.pop().call(component);
        }
    }
    flushMount();
    return dom;
}
function unmountComponent(vnode) {
    var component = vnode.component;
    if (isFunction(component.componentWillUnmount)) {
        errorCatcher(function () {
            component.componentWillUnmount();
        }, component);
    }
    component._disable = true;
    unmount(component._rendered);
    if (!isNullOrUndef(vnode.ref)) {
        Ref.detach(vnode, vnode.ref, vnode.dom);
    }
}
function unmountStatelessComponent(vnode) {
    unmount(vnode._rendered);
}

var items = [];
function enqueueRender(component) {
    // tslint:disable-next-line:no-conditional-assignment
    if (!component._dirty && (component._dirty = true) && items.push(component) === 1) {
        nextTick(rerender);
    }
}
function rerender() {
    var p;
    var list = items;
    items = [];
    // tslint:disable-next-line:no-conditional-assignment
    while ((p = list.pop())) {
        if (p._dirty) {
            updateComponent(p);
        }
    }
}

var Component = /** @class */ (function () {
    function Component(props, context) {
        this._dirty = true;
        this._disable = true;
        this._pendingStates = [];
        // Is a React Component.
        // tslint:disable-next-line:max-line-length
        // see: https://github.com/facebook/react/blob/3c977dea6b96f6a9bb39f09886848da870748441/packages/react/src/ReactBaseClasses.js#L26
        this.isReactComponent = EMPTY_OBJ;
        if (!this.state) {
            this.state = {};
        }
        this.props = props || {};
        this.context = context || EMPTY_OBJ;
        this.refs = {};
    }
    Component.prototype.setState = function (state, callback) {
        if (state) {
            (this._pendingStates = this._pendingStates || []).push(state);
        }
        if (isFunction(callback)) {
            (this._pendingCallbacks = this._pendingCallbacks || []).push(callback);
        }
        if (!this._disable) {
            enqueueRender(this);
        }
    };
    Component.prototype.getState = function () {
        var _this = this;
        // tslint:disable-next-line:no-this-assignment
        var _a = this, _pendingStates = _a._pendingStates, state = _a.state, props = _a.props;
        if (!_pendingStates.length) {
            return state;
        }
        var stateClone = clone(state);
        var queue = _pendingStates.concat();
        this._pendingStates.length = 0;
        queue.forEach(function (nextState) {
            if (isFunction(nextState)) {
                nextState = nextState.call(_this, state, props);
            }
            extend(stateClone, nextState);
        });
        return stateClone;
    };
    Component.prototype.forceUpdate = function (callback) {
        if (isFunction(callback)) {
            (this._pendingCallbacks = this._pendingCallbacks || []).push(callback);
        }
        updateComponent(this, true);
    };
    // tslint:disable-next-line
    Component.prototype.render = function (nextProps, nextState, nextContext) { };
    return Component;
}());

var PureComponent = /** @class */ (function (_super) {
    __extends(PureComponent, _super);
    function PureComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isPureComponent = true;
        return _this;
    }
    PureComponent.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    };
    return PureComponent;
}(Component));

function render(vnode, container, callback) {
    if (!container) {
        throw new Error(container + " should be a DOM Element");
    }
    var lastVnode = container._component;
    var dom;
    options.roots.push(vnode);
    if (lastVnode !== undefined) {
        options.roots = options.roots.filter(function (item) { return item !== lastVnode; });
        dom = patch(lastVnode, vnode, container, {});
    }
    else {
        dom = mountVNode(vnode, {});
        container.appendChild(dom);
    }
    if (container) {
        container._component = vnode;
    }
    flushMount();
    if (callback) {
        callback();
    }
    return isComposite(vnode) ? vnode.component : dom;
}

function createVNode(type, props, children, key, namespace, owner, ref) {
    return {
        type: type,
        key: key || null,
        vtype: VType.Node,
        props: props || EMPTY_OBJ,
        children: children,
        namespace: namespace || null,
        _owner: owner,
        dom: null,
        ref: ref || null
    };
}

function h(type, props, children) {
    var childNodes;
    if (props.children) {
        if (!children) {
            children = props.children;
        }
    }
    if (isArray(children)) {
        childNodes = [];
        addChildren(childNodes, children, type);
    }
    else if (isString(children) || isNumber(children)) {
        children = createVText(String(children));
    }
    else if (!isValidElement(children)) {
        children = EMPTY_CHILDREN;
    }
    props.children = childNodes !== undefined ? childNodes : children;
    return createVNode(type, props, props.children, props.key, props.namespace, props.owner, props.ref);
}
function addChildren(childNodes, children, type) {
    if (isString(children) || isNumber(children)) {
        childNodes.push(createVText(String(children)));
    }
    else if (isValidElement(children)) {
        childNodes.push(children);
    }
    else if (isArray(children)) {
        for (var i = 0; i < children.length; i++) {
            addChildren(childNodes, children[i], type);
        }
    }
    else {
        childNodes.push(createVoid());
    }
}

var ComponentWrapper = /** @class */ (function () {
    function ComponentWrapper(type, props) {
        this.vtype = VType.Composite;
        this.type = type;
        this.name = type.name || type.toString().match(/^function\s*([^\s(]+)/)[1];
        type.displayName = this.name;
        this._owner = props.owner;
        delete props.owner;
        if ((this.ref = props.ref)) {
            delete props.ref;
        }
        this.props = props;
        this.key = props.key || null;
        this.dom = null;
    }
    ComponentWrapper.prototype.init = function (parentContext, parentComponent) {
        return mountComponent(this, parentContext, parentComponent);
    };
    ComponentWrapper.prototype.update = function (previous, current, parentContext, domNode) {
        return reRenderComponent(previous, this);
    };
    ComponentWrapper.prototype.destroy = function () {
        unmountComponent(this);
    };
    return ComponentWrapper;
}());

var StateLessComponent = /** @class */ (function () {
    function StateLessComponent(type, props) {
        this.vtype = VType.Stateless;
        this.type = type;
        this._owner = props.owner;
        delete props.owner;
        this.props = props;
        this.key = props.key;
    }
    StateLessComponent.prototype.init = function (parentContext) {
        return mountStatelessComponent(this, parentContext);
    };
    StateLessComponent.prototype.update = function (previous, current, parentContext) {
        var props = current.props, context = current.context;
        var shouldComponentUpdate = props.onShouldComponentUpdate;
        if (isFunction(shouldComponentUpdate) &&
            !shouldComponentUpdate(previous.props, props, context)) {
            current._rendered = previous._rendered;
            return previous.dom;
        }
        return reRenderStatelessComponent(previous, this, parentContext, previous.dom);
    };
    StateLessComponent.prototype.destroy = function () {
        unmountStatelessComponent(this);
    };
    return StateLessComponent;
}());

function transformPropsForRealTag(type, props) {
    var newProps = {};
    for (var propName in props) {
        var propValue = props[propName];
        if (propName === 'defaultValue') {
            newProps.value = props.value || props.defaultValue;
            continue;
        }
        var svgPropName = SVGPropertyConfig.DOMAttributeNames[propName];
        if (svgPropName && svgPropName !== propName) {
            newProps[svgPropName] = propValue;
            continue;
        }
        newProps[propName] = propValue;
    }
    return newProps;
}
/**
 *
 * @param props
 * @param defaultProps
 * defaultProps should respect null but ignore undefined
 * @see: https://facebook.github.io/react/docs/react-component.html#defaultprops
 */
function transformPropsForComponent(props, defaultProps) {
    var newProps = {};
    for (var propName in props) {
        var propValue = props[propName];
        newProps[propName] = propValue;
    }
    if (defaultProps) {
        for (var propName in defaultProps) {
            if (isUndefined(newProps[propName])) {
                newProps[propName] = defaultProps[propName];
            }
        }
    }
    return newProps;
}
function createElement$2(type, properties) {
    var _children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        _children[_i - 2] = arguments[_i];
    }
    var children = _children;
    if (_children) {
        if (_children.length === 1) {
            children = _children[0];
        }
        else if (_children.length === 0) {
            children = undefined;
        }
    }
    var props;
    if (isString(type)) {
        props = transformPropsForRealTag(type, properties);
        props.owner = Current.current;
        return h(type, props, children);
    }
    else if (isFunction(type)) {
        props = transformPropsForComponent(properties, type.defaultProps);
        if (!props.children || props.children === EMPTY_CHILDREN) {
            props.children = children || EMPTY_CHILDREN;
        }
        props.owner = Current.current;
        return type.prototype && type.prototype.render
            ? new ComponentWrapper(type, props)
            : new StateLessComponent(type, props);
    }
    return type;
}

// tslint:disable:no-conditional-assignment

// some library check React version
// see: https://github.com/NervJS/nerv/issues/46

var WrapperComponent = /** @class */ (function (_super) {
    __extends(WrapperComponent, _super);
    function WrapperComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WrapperComponent.prototype.getChildContext = function () {
        // tslint:disable-next-line
        return this.props.context;
    };
    WrapperComponent.prototype.render = function () {
        return this.props.children;
    };
    return WrapperComponent;
}(Component));

/**
 * The unique id is used for unique hashes.
 */
var uniqueId = 0;
/**
 * Component styles with this string to get unique hashes.
 */
var IS_UNIQUE = '__DO_NOT_DEDUPE_STYLE__';
var upperCasePattern = /[A-Z]/g;
var msPattern = /^ms-/;
var interpolatePattern = /&/g;
var escapePattern = /[ !#$%&()*+,./;<=>?@[\]^`{|}~"'\\]/g;
/**
 * Noop changes.
 */
var noopChanges = {
    add: function () { return undefined; },
    change: function () { return undefined; },
    remove: function () { return undefined; }
};
/**
 * Map of css  properties that are valid unit-less numbers..
 */
var CSS_NUMBER = createNumberProperties([
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
var TypeStyle = /** @class */ (function () {
    function TypeStyle(_a) {
        var autoGenerateTag = (_a === void 0 ? { autoGenerateTag: true } : _a).autoGenerateTag;
        var _this = this;
        /**
         * Insert `raw` CSS as a string. This is useful for e.g.
         * - third party CSS that you are customizing with template strings
         * - generating raw CSS in JavaScript
         * - reset libraries like normalize.css that you can use without loaders
         */
        this.cssRaw = function (mustBeValidCSS) {
            if (!mustBeValidCSS) {
                return;
            }
            _this._raw += mustBeValidCSS || '';
            _this._pendingRawChange = true;
            _this._styleUpdated();
        };
        /**
         * Takes CSSProperties and registers it to a global selector (body, html, etc.)
         */
        this.cssRule = function (selector) {
            var objects = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                objects[_i - 1] = arguments[_i];
            }
            var object = ensureStringObj(extend$1.apply(void 0, objects)).result;
            _this._freeStyle.registerRule(selector, object);
            _this._styleUpdated();
            return;
        };
        /**
         * Renders styles to the singleton tag imediately
         * NOTE: You should only call it on initial render to prevent any non CSS flash.
         * After that it is kept sync using `requestAnimationFrame` and we haven't noticed any bad flashes.
         **/
        this.forceRenderStyles = function () {
            var target = _this._getTag();
            if (!target) {
                return;
            }
            target.textContent = _this.getStyles() + '\n/*# sourceURL=styles.css*/';
        };
        /**
         * Utility function to register an @font-face
         */
        this.fontFace = function () {
            var fontFace = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                fontFace[_i] = arguments[_i];
            }
            var freeStyle = _this._freeStyle;
            for (var _a = 0, _b = fontFace; _a < _b.length; _a++) {
                var face = _b[_a];
                freeStyle.registerRule('@font-face', face);
            }
            _this._styleUpdated();
            return;
        };
        /**
         * Allows use to use the stylesheet in a node.js environment
         */
        this.getStyles = function () {
            return (_this._raw || '') + _this._freeStyle.getStyles();
        };
        /**
         * Takes keyframes and returns a generated animationName
         */
        this.keyframes = function (frames) {
            var _a = explodeKeyframes(frames), keyframes = _a.keyframes, $debugName = _a.$debugName;
            // TODO: replace $debugName with display name
            var animationName = _this._freeStyle.registerKeyframes(keyframes, $debugName);
            _this._styleUpdated();
            return animationName;
        };
        /**
         * Helps with testing. Reinitializes FreeStyle + raw
         */
        this.reinit = function () {
            /** reinit freestyle */
            var freeStyle = FreeStyle.create({ debug: true });
            _this._freeStyle = freeStyle;
            _this._lastFreeStyleChangeId = freeStyle.changeId;
            /** reinit raw */
            _this._raw = '';
            _this._pendingRawChange = false;
            /** Clear any styles that were flushed */
            var target = _this._getTag();
            if (target) {
                target.textContent = '';
            }
        };
        /** Sets the target tag where we write the css on style updates */
        this.setStylesTarget = function (tag) {
            /** Clear any data in any previous tag */
            if (_this._tag) {
                _this._tag.textContent = '';
            }
            _this._tag = tag;
            /** This special time buffer immediately */
            _this.forceRenderStyles();
        };
        /**
         * Takes CSSProperties and return a generated className you can use on your component
         */
        this.style = function () {
            var objects = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                objects[_i] = arguments[_i];
            }
            var freeStyle = _this._freeStyle;
            var _a = ensureStringObj(extend$1.apply(void 0, objects)), result = _a.result, debugName = _a.debugName;
            var className = debugName ? freeStyle.registerStyle(result, debugName) : freeStyle.registerStyle(result);
            _this._styleUpdated();
            return className;
        };
        var freeStyle = FreeStyle.create({ debug: true });
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
    TypeStyle.prototype._afterAllSync = function (cb) {
        var _this = this;
        this._pending++;
        var pending = this._pending;
        onRender(function () {
            if (pending !== _this._pending) {
                return;
            }
            cb();
        });
    };
    TypeStyle.prototype._getTag = function () {
        if (this._tag) {
            return this._tag;
        }
        if (this._autoGenerateTag) {
            var tag = typeof window === 'undefined'
                ? { textContent: '' }
                : document.createElement('style');
            if (typeof document !== 'undefined') {
                document.head.appendChild(tag);
            }
            this._tag = tag;
            return tag;
        }
        return undefined;
    };
    /** Checks if the style tag needs updating and if so queues up the change */
    TypeStyle.prototype._styleUpdated = function () {
        var _this = this;
        var changeId = this._freeStyle.changeId;
        var lastChangeId = this._lastFreeStyleChangeId;
        if (!this._pendingRawChange && changeId === lastChangeId) {
            return;
        }
        this._lastFreeStyleChangeId = changeId;
        this._pendingRawChange = false;
        this._afterAllSync(function () { return _this.forceRenderStyles(); });
    };
    return TypeStyle;
}());
/**
 * Implement a cache/event emitter.
 */
var Cache = /** @class */ (function () {
    function Cache(hash, changes) {
        if (hash === void 0) { hash = stringHash; }
        if (changes === void 0) { changes = noopChanges; }
        this.hash = hash;
        this.changes = changes;
        this.sheet = [];
        this.changeId = 0;
        this._keys = [];
        this._children = Object.create(null);
        this._counters = Object.create(null);
    }
    Cache.prototype.add = function (style) {
        var count = this._counters[style.id] || 0;
        var item = this._children[style.id] || style.clone();
        this._counters[style.id] = count + 1;
        if (count === 0) {
            this._children[item.id] = item;
            this._keys.push(item.id);
            this.sheet.push(item.getStyles());
            this.changeId++;
            this.changes.add(item, this._keys.length - 1);
        }
        else {
            // Check if contents are different.
            if (item.getIdentifier() !== style.getIdentifier()) {
                throw new TypeError("Hash collision: " + style.getStyles() + " === " + item.getStyles());
            }
            var oldIndex = this._keys.indexOf(style.id);
            var newIndex = this._keys.length - 1;
            var prevChangeId = this.changeId;
            if (oldIndex !== newIndex) {
                this._keys.splice(oldIndex, 1);
                this._keys.push(style.id);
                this.changeId++;
            }
            if (item instanceof Cache && style instanceof Cache) {
                var prevChangeId_1 = item.changeId;
                item.merge(style);
                if (item.changeId !== prevChangeId_1) {
                    this.changeId++;
                }
            }
            if (this.changeId !== prevChangeId) {
                if (oldIndex === newIndex) {
                    this.sheet.splice(oldIndex, 1, item.getStyles());
                }
                else {
                    this.sheet.splice(oldIndex, 1);
                    this.sheet.splice(newIndex, 0, item.getStyles());
                }
                this.changes.change(item, oldIndex, newIndex);
            }
        }
        return item;
    };
    Cache.prototype.remove = function (style) {
        var count = this._counters[style.id];
        if (count > 0) {
            this._counters[style.id] = count - 1;
            var item = this._children[style.id];
            var index = this._keys.indexOf(item.id);
            if (count === 1) {
                delete this._counters[style.id];
                delete this._children[style.id];
                this._keys.splice(index, 1);
                this.sheet.splice(index, 1);
                this.changeId++;
                this.changes.remove(item, index);
            }
            else if (item instanceof Cache && style instanceof Cache) {
                var prevChangeId = item.changeId;
                item.unmerge(style);
                if (item.changeId !== prevChangeId) {
                    this.sheet.splice(index, 1, item.getStyles());
                    this.changeId++;
                    this.changes.change(item, index, index);
                }
            }
        }
    };
    Cache.prototype.merge = function (cache) {
        for (var _i = 0, _a = cache._keys; _i < _a.length; _i++) {
            var id = _a[_i];
            this.add(cache._children[id]);
        }
        return this;
    };
    Cache.prototype.unmerge = function (cache) {
        for (var _i = 0, _a = cache._keys; _i < _a.length; _i++) {
            var id = _a[_i];
            this.remove(cache._children[id]);
        }
        return this;
    };
    Cache.prototype.clone = function () {
        return new Cache(this.hash).merge(this);
    };
    return Cache;
}());
/**
 * Selector is a dumb class made to represent nested CSS selectors.
 */
var Selector = /** @class */ (function () {
    function Selector(selector, hash, id, pid) {
        if (id === void 0) { id = "s" + hash(selector); }
        if (pid === void 0) { pid = ''; }
        this.selector = selector;
        this.hash = hash;
        this.id = id;
        this.pid = pid;
    }
    Selector.prototype.getStyles = function () {
        return this.selector;
    };
    Selector.prototype.getIdentifier = function () {
        return this.pid + "." + this.selector;
    };
    Selector.prototype.clone = function () {
        return new Selector(this.selector, this.hash, this.id, this.pid);
    };
    return Selector;
}());
/**
 * The style container registers a style string with selectors.
 */
var Style = /** @class */ (function (_super) {
    __extends(Style, _super);
    function Style(style, hash, id) {
        if (id === void 0) { id = "c" + hash(style); }
        var _this = _super.call(this, hash) || this;
        _this.style = style;
        _this.hash = hash;
        _this.id = id;
        return _this;
    }
    Style.prototype.getStyles = function () {
        return this.sheet.join(',') + "{" + this.style + "}";
    };
    Style.prototype.getIdentifier = function () {
        return this.style;
    };
    Style.prototype.clone = function () {
        return new Style(this.style, this.hash, this.id).merge(this);
    };
    return Style;
}(Cache));
/**
 * Implement rule logic for style output.
 */
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule(rule, style, hash, id, pid) {
        if (style === void 0) { style = ''; }
        if (id === void 0) { id = "a" + hash(rule + "." + style); }
        if (pid === void 0) { pid = ''; }
        var _this = _super.call(this, hash) || this;
        _this.rule = rule;
        _this.style = style;
        _this.hash = hash;
        _this.id = id;
        _this.pid = pid;
        return _this;
    }
    Rule.prototype.getStyles = function () {
        return this.rule + "{" + this.style + join(this.sheet) + "}";
    };
    Rule.prototype.getIdentifier = function () {
        return this.pid + "." + this.rule + "." + this.style;
    };
    Rule.prototype.clone = function () {
        return new Rule(this.rule, this.style, this.hash, this.id, this.pid).merge(this);
    };
    return Rule;
}(Cache));
/**
 * The FreeStyle class implements the API for everything else.
 */
var FreeStyle = /** @class */ (function (_super) {
    __extends(FreeStyle, _super);
    function FreeStyle(hash, debug, id, changes) {
        if (hash === void 0) { hash = stringHash; }
        if (debug === void 0) { debug = typeof process !== 'undefined' && process.env['NODE_ENV'] !== 'production'; }
        if (id === void 0) { id = "f" + (++uniqueId).toString(36); }
        var _this = _super.call(this, hash, changes) || this;
        _this.hash = hash;
        _this.debug = debug;
        _this.id = id;
        return _this;
    }
    FreeStyle.create = function (options) {
        return new FreeStyle(options.hash, options.debug, options.id, options.changes);
    };
    FreeStyle.prototype.registerStyle = function (styles, displayName) {
        var debugName = this.debug ? displayName : undefined;
        var _a = composeStyles(this, '&', styles, true, debugName), cache = _a.cache, id = _a.id;
        this.merge(cache);
        return id;
    };
    FreeStyle.prototype.registerKeyframes = function (keyframes, displayName) {
        return this.registerHashRule('@keyframes', keyframes, displayName);
    };
    FreeStyle.prototype.registerHashRule = function (prefix, styles, displayName) {
        var debugName = this.debug ? displayName : undefined;
        var _a = composeStyles(this, '', styles, false, debugName), cache = _a.cache, pid = _a.pid, id = _a.id;
        var rule = new Rule(prefix + " " + escape(id), undefined, this.hash, undefined, pid);
        this.add(rule.merge(cache));
        return id;
    };
    FreeStyle.prototype.registerRule = function (rule, styles) {
        this.merge(composeStyles(this, rule, styles, false).cache);
    };
    FreeStyle.prototype.registerCss = function (styles) {
        this.merge(composeStyles(this, '', styles, false).cache);
    };
    FreeStyle.prototype.getStyles = function () {
        return this.sheet.join('\n');
    };
    FreeStyle.prototype.getIdentifier = function () {
        return this.id;
    };
    FreeStyle.prototype.clone = function () {
        return new FreeStyle(this.hash, this.debug, this.id, this.changes).merge(this);
    };
    return FreeStyle;
}(Cache));
/**
 * We need to do the following to *our* objects before passing to freestyle:
 * - For any `$nest` directive move up to FreeStyle style nesting
 * - For any `$unique` directive map to FreeStyle Unique
 * - For any `$debugName` directive return the debug name
 */
function ensureStringObj(object) {
    /** The final result we will return */
    var result = {};
    var debugName = '';
    for (var key in object) {
        /** Grab the value upfront */
        var val = object[key];
        /** TypeStyle configuration options */
        if (key === '$unique') {
            result[IS_UNIQUE] = val;
        }
        else if (key === '$nest') {
            var nested = val;
            for (var selector in nested) {
                var subproperties = nested[selector];
                result[selector] = ensureStringObj(subproperties).result;
            }
        }
        else if (key === '$debugName') {
            debugName = val;
        }
        else {
            result[key] = val;
        }
    }
    return { result: result, debugName: debugName };
}
// todo: better name here
function explodeKeyframes(frames) {
    var result = { $debugName: undefined, keyframes: {} };
    for (var offset in frames) {
        var val = frames[offset];
        if (offset === '$debugName') {
            result.$debugName = val;
        }
        else {
            result.keyframes[offset] = val;
        }
    }
    return result;
}
/**
 * Merges various styles into a single style object.
 * Note: if two objects have the same property the last one wins
 */
function extend$1() {
    var objects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
    }
    /** The final result we will return */
    var result = {};
    for (var _a = 0, objects_1 = objects; _a < objects_1.length; _a++) {
        var object = objects_1[_a];
        if (object == null || object === false) {
            continue;
        }
        for (var key in object) {
            /** Falsy values except a explicit 0 is ignored */
            var val = object[key];
            if (!val && val !== 0) {
                continue;
            }
            /** if nested media or pseudo selector */
            if (key === '$nest' && val) {
                result[key] = result['$nest'] ? extend$1(result['$nest'], val) : val;
            }
            /** if freestyle sub key that needs merging. We come here due to our recursive calls */
            else if ((key.indexOf('&') !== -1 || key.indexOf('@media') === 0)) {
                result[key] = result[key] ? extend$1(result[key], val) : val;
            }
            else {
                result[key] = val;
            }
        }
    }
    return result;
}
/** Raf for node + browser */
function onRender(cb) {
    if (typeof requestAnimationFrame !== 'undefined') {
        requestAnimationFrame(cb);
    }
    else {
        setTimeout(cb);
    }
}
/**
 * Escape a CSS class name.
 */
function escape(str) {
    return str.replace(escapePattern, '\\$&');
}
/**
 * Transform a JavaScript property into a CSS property.
 */
function hyphenate(propertyName) {
    return propertyName
        .replace(upperCasePattern, function (m) { return "-" + m.toLowerCase(); })
        .replace(msPattern, '-ms-'); // Internet Explorer vendor prefix.
}
/**
 * Generate a hash value from a string.
 */
function stringHash(str) {
    var value = 5381;
    var len = str.length;
    while (len--)
        value = (value * 33) ^ str.charCodeAt(len);
    return (value >>> 0).toString(36);
}
/**
 * Transform a style string to a CSS string.
 */
function styleToString(key, value) {
    if (typeof value === 'number' && value !== 0 && !CSS_NUMBER[key]) {
        return "\n  " + key + ":" + value + "px;";
    }
    return "\n  " + key + ":" + value + ";";
}
/**
 * Sort an array of tuples by first value.
 */
function sortTuples(value) {
    return value.sort(function (a, b) { return a[0] > b[0] ? 1 : -1; });
}
/**
 * Categorize user styles.
 */
function parseStyles(styles, hasNestedStyles) {
    var properties = [];
    var nestedStyles = [];
    var isUnique = false;
    // Sort keys before adding to styles.
    for (var _i = 0, _a = Object.keys(styles); _i < _a.length; _i++) {
        var key = _a[_i];
        var value = styles[key];
        if (value !== null && value !== undefined) {
            if (key === IS_UNIQUE) {
                isUnique = true;
            }
            else if (typeof value === 'object' && !Array.isArray(value)) {
                nestedStyles.push([key.trim(), value]);
            }
            else {
                properties.push([hyphenate(key.trim()), value]);
            }
        }
    }
    return {
        styleString: stringifyProperties(sortTuples(properties)),
        nestedStyles: hasNestedStyles ? nestedStyles : sortTuples(nestedStyles),
        isUnique: isUnique
    };
}
/**
 * Stringify an array of property tuples.
 */
function stringifyProperties(properties) {
    return properties.map(function (_a) {
        var name = _a[0], value = _a[1];
        if (!Array.isArray(value)) {
            return styleToString(name, value);
        }
        return value.map(function (x) { return styleToString(name, x); }).join(';');
    }).join(';');
}
/**
 * Interpolate CSS selectors.
 */
function interpolate(selector, parent) {
    if (selector.indexOf('&') > -1) {
        return selector.replace(interpolatePattern, parent);
    }
    return parent + " " + selector;
}
/**
 * Recursive loop building styles with deferred selectors.
 */
function stylize(cache, selector, styles, list, parent) {
    var _a = parseStyles(styles, !!selector), styleString = _a.styleString, nestedStyles = _a.nestedStyles, isUnique = _a.isUnique;
    var pid = styleString;
    if (selector.charCodeAt(0) === 64 /* @ */) {
        var rule = cache.add(new Rule(selector, parent ? undefined : styleString, cache.hash));
        // Nested styles support (e.g. `.foo > @media > .bar`).
        if (styleString && parent) {
            var style = rule.add(new Style(styleString, rule.hash, isUnique ? "u" + (++uniqueId).toString(36) : undefined));
            list.push([parent, style]);
        }
        for (var _i = 0, nestedStyles_1 = nestedStyles; _i < nestedStyles_1.length; _i++) {
            var _b = nestedStyles_1[_i], name = _b[0], value = _b[1];
            pid += name + stylize(rule, name, value, list, parent);
        }
    }
    else {
        var key = parent ? interpolate(selector, parent) : selector;
        if (styleString) {
            var style = cache.add(new Style(styleString, cache.hash, isUnique ? "u" + (++uniqueId).toString(36) : undefined));
            list.push([key, style]);
        }
        for (var _c = 0, nestedStyles_2 = nestedStyles; _c < nestedStyles_2.length; _c++) {
            var _d = nestedStyles_2[_c], name = _d[0], value = _d[1];
            pid += name + stylize(cache, name, value, list, key);
        }
    }
    return pid;
}
/**
 * Register all styles, but collect for selector interpolation using the hash.
 */
function composeStyles(container, selector, styles, isStyle, displayName) {
    var cache = new Cache(container.hash);
    var list = [];
    var pid = stylize(cache, selector, styles, list);
    var hash = "f" + cache.hash(pid);
    var id = displayName ? displayName + "_" + hash : hash;
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var _a = list_1[_i], selector_1 = _a[0], style = _a[1];
        var key = isStyle ? interpolate(selector_1, "." + escape(id)) : selector_1;
        style.add(new Selector(key, style.hash, undefined, pid));
    }
    return { cache: cache, pid: pid, id: id };
}
/**
 * Cache to list to styles.
 */
function join(arr) {
    var res = '';
    for (var i = 0; i < arr.length; i++)
        res += arr[i];
    return res;
}
/**
 * generate map of css number properties
 */
function createNumberProperties(cssNumberProperties) {
    var CSS_NUMBER = Object.create(null);
    // Add vendor prefixes to all unit-less properties.
    for (var _i = 0, _a = ['-webkit-', '-ms-', '-moz-', '-o-', '']; _i < _a.length; _i++) {
        var prefix = _a[_i];
        for (var _b = 0, cssNumberProperties_1 = cssNumberProperties; _b < cssNumberProperties_1.length; _b++) {
            var property = cssNumberProperties_1[_b];
            CSS_NUMBER[prefix + property] = true;
        }
    }
    return CSS_NUMBER;
}

// tslint:disable-next-line:no-var-requires
var isArray$1 = Array.isArray;
/**
 * Return a ReactElement-compatible object for the current state of a Nerv
 * component.
 */
function createReactElement(component) {
    return {
        type: component.type,
        key: component.key,
        ref: null,
        props: component.props
    };
}
function normalizeChildren(children) {
    if (isArray$1(children)) {
        return children.filter(isValidElement).map(updateReactComponent);
    }
    else {
        return isValidElement(children) ? [updateReactComponent(children)] : [];
    }
}
/**
 * Create a ReactDOMComponent-compatible object for a given DOM node rendered
 * by Nerv.
 *
 * This implements the subset of the ReactDOMComponent interface that
 * React DevTools requires in order to display DOM nodes in the inspector with
 * the correct type and properties.
 *
 * @param {Node} node
 */
function createReactDOMComponent(vnode) {
    var isText = isVText(vnode);
    return {
        // --- ReactDOMComponent interface
        _currentElement: isText
            ? vnode.text
            : {
                type: vnode.type,
                props: normalizeProps(vnode.props)
            },
        _renderedChildren: normalizeChildren(vnode.children),
        _stringText: isText ? vnode.text : null,
        // --- Additional properties used by Nerv devtools
        // A flag indicating whether the devtools have been notified about the
        // existence of this component instance yet.
        // This is used to send the appropriate notifications when DOM components
        // are added or updated between composite component updates.
        _inDevTools: false,
        node: !isText ? vnode.dom : null
    };
}
/**
 * Return the name of a component created by a `ReactElement`-like object.
 *
 * @param {ReactElement} element
 */
function typeName(element) {
    if (typeof element.type === 'function') {
        return element.type.displayName || element.type.name;
    }
    return element.type;
}
function normalizeProps(_props) {
    var props = __assign({}, _props);
    delete props.owner;
    return props;
}
/**
 * Return a ReactCompositeComponent-compatible object for a given Nerv
 * component instance.
 *
 * This implements the subset of the ReactCompositeComponent interface that
 * the DevTools requires in order to walk the component tree and inspect the
 * component's properties.
 *
 * See https://github.com/facebook/react-devtools/blob/e31ec5825342eda570acfc9bcb43a44258fceb28/backend/getData.js
 */
function createReactCompositeComponent(vnode) {
    var isCompositeComponent = isComposite(vnode);
    var _currentElement = createReactElement(vnode);
    var component = isCompositeComponent ? vnode.component : vnode;
    var node = vnode.dom;
    var instance = {
        // --- ReactDOMComponent properties
        getName: function () {
            return typeName(_currentElement);
        },
        _currentElement: _currentElement,
        props: normalizeProps(component.props),
        state: component.state,
        forceUpdate: component.forceUpdate && component.forceUpdate.bind(component),
        setState: component.setState && component.setState.bind(component),
        // --- Additional properties used by Nerv devtools
        node: node,
        vnode: vnode
    };
    // React DevTools exposes the `_instance` field of the selected item in the
    // component tree as `$r` in the console.  `_instance` must refer to a
    // React Component (or compatible) class instance with `props` and `state`
    // fields and `setState()`, `forceUpdate()` methods.
    instance._instance = component;
    // If the root node returned by this component instance's render function
    // was itself a composite component, there will be a `_component` property
    // containing the child component instance.
    // Otherwise, if the render() function returned an HTML/SVG element,
    // create a ReactDOMComponent-like object for the DOM node itself.
    instance._renderedComponent = updateReactComponent(component._rendered);
    return instance;
}
/**
 * Map of Component|Node to ReactDOMComponent|ReactCompositeComponent-like
 * object.
 *
 * The same React*Component instance must be used when notifying devtools
 * about the initial mount of a component and subsequent updates.
 */
var instanceMap = new Map();
/**
 * Update (and create if necessary) the ReactDOMComponent|ReactCompositeComponent-like
 * instance for a given Nerv component instance or DOM Node.
 *
 * @param {Component|Node} componentOrNode
 */
function updateReactComponent(vnode) {
    var newInstance = !isWidget(vnode)
        ? createReactDOMComponent(vnode)
        : createReactCompositeComponent(vnode);
    var oldInst = getInstanceFromVNode(vnode);
    if (oldInst) {
        Object.assign(oldInst, newInstance);
        return oldInst;
    }
    instanceMap.set(getKeyForVNode(vnode), newInstance);
    return newInstance;
}
function nextRootKey(roots) {
    return '.' + Object.keys(roots).length;
}
function getKeyForVNode(vnode) {
    if (isComposite(vnode)) {
        return vnode.component;
    }
    else if (isStateless(vnode)) {
        return vnode.type;
    }
    else if (vnode && vnode.vtype) {
        return vnode.dom;
    }
}
function getInstanceFromVNode(vnode) {
    var key = getKeyForVNode(vnode);
    return instanceMap.get(key);
}
/**
 * Find all root component instances rendered by Nerv in `node`'s children
 * and add them to the `roots` map.
 *
 * @param {DOMElement} node
 * @param {[key: string] => ReactDOMComponent|ReactCompositeComponent}
 */
function findRoots(node, roots) {
    options.roots.forEach(function (root) {
        roots[nextRootKey(roots)] = updateReactComponent(root);
    });
}
function findVNodeFromDom(vnode, dom) {
    if (!vnode) {
        var roots = options.roots;
        for (var i = 0, len = roots.length; i < len; i++) {
            var root = roots[i];
            var result = findVNodeFromDom(root, dom);
            if (result) {
                return result;
            }
        }
    }
    else {
        if (vnode.dom === dom) {
            return vnode;
        }
        if (isWidget(vnode)) {
            var children = vnode._rendered;
            if (children) {
                if (isArray$1(children)) {
                    children.forEach(function (child) {
                        if (child) {
                            var result = findVNodeFromDom(child, dom);
                            if (result) {
                                return result;
                            }
                        }
                    });
                }
                else {
                    var result = findVNodeFromDom(children, dom);
                    if (result) {
                        return result;
                    }
                }
            }
        }
    }
}
/**
 * Create a bridge for exposing Nerv's component tree to React DevTools.
 *
 * It creates implementations of the interfaces that ReactDOM passes to
 * devtools to enable it to query the component tree and hook into component
 * updates.
 *
 * See https://github.com/facebook/react/blob/59ff7749eda0cd858d5ee568315bcba1be75a1ca/src/renderers/dom/ReactDOM.js
 * for how ReactDOM exports its internals for use by the devtools and
 * the `attachRenderer()` function in
 * https://github.com/facebook/react-devtools/blob/e31ec5825342eda570acfc9bcb43a44258fceb28/backend/attachRenderer.js
 * for how the devtools consumes the resulting objects.
 */
function createDevToolsBridge() {
    // The devtools has different paths for interacting with the renderers from
    // React Native, legacy React DOM and current React DOM.
    //
    // Here we emulate the interface for the current React DOM (v15+) lib.
    // ReactDOMComponentTree-like object
    var ComponentTree = {
        getNodeFromInstance: function (instance) {
            return instance.node;
        },
        getClosestInstanceFromNode: function (dom) {
            var vnode = findVNodeFromDom(null, dom);
            return vnode ? updateReactComponent(vnode) : null;
        }
    };
    // Map of root ID (the ID is unimportant) to component instance.
    var roots = {};
    findRoots(document.body, roots);
    // ReactMount-like object
    //
    // Used by devtools to discover the list of root component instances and get
    // notified when new root components are rendered.
    var Mount = {
        _instancesByReactRootID: roots,
        // Stub - React DevTools expects to find this method and replace it
        // with a wrapper in order to observe new root components being added
        // tslint:disable-next-line:no-empty
        _renderNewRootComponent: function ( /* instance, ... */) { }
    };
    // ReactReconciler-like object
    var Reconciler = {
        // Stubs - React DevTools expects to find these methods and replace them
        // with wrappers in order to observe components being mounted, updated and
        // unmounted
        // tslint:disable-next-line:no-empty
        mountComponent: function ( /* instance, ... */) { },
        // tslint:disable-next-line:no-empty
        performUpdateIfNecessary: function ( /* instance, ... */) { },
        // tslint:disable-next-line:no-empty
        receiveComponent: function ( /* instance, ... */) { },
        // tslint:disable-next-line:no-empty
        unmountComponent: function ( /* instance, ... */) { }
    };
    function isEqual(a) {
        return function (b) { return a === b; };
    }
    function isRoot(vnode) {
        return options.roots.some(isEqual(vnode));
    }
    /** Notify devtools that a new component instance has been mounted into the DOM. */
    var componentAdded = function (vnode) {
        var instance = updateReactComponent(vnode);
        // if is root component
        if (isRoot(vnode)) {
            instance._rootID = nextRootKey(roots);
            roots[instance._rootID] = instance;
            Mount._renderNewRootComponent(instance);
        }
        visitNonCompositeChildren(instance, function (childInst) {
            childInst._inDevTools = true;
            Reconciler.mountComponent(childInst);
        });
        Reconciler.mountComponent(instance);
    };
    /** Notify devtools that a component has been updated with new props/state. */
    var componentUpdated = function (component) {
        var prevRenderedChildren = [];
        visitNonCompositeChildren(getInstanceFromVNode(component), function (childInst) {
            prevRenderedChildren.push(childInst);
        });
        // Notify devtools about updates to this component and any non-composite
        // children
        var instance = updateReactComponent(component);
        Reconciler.receiveComponent(instance);
        visitNonCompositeChildren(instance, function (childInst) {
            if (!childInst._inDevTools) {
                // New DOM child component
                childInst._inDevTools = true;
                Reconciler.mountComponent(childInst);
            }
            else {
                // Updated DOM child component
                Reconciler.receiveComponent(childInst);
            }
        });
        // For any non-composite children that were removed by the latest render,
        // remove the corresponding ReactDOMComponent-like instances and notify
        // the devtools
        prevRenderedChildren.forEach(function (childInst) {
            if (!document.body.contains(childInst.node)) {
                instanceMap["delete"](getKeyForVNode(childInst.vnode));
                Reconciler.unmountComponent(childInst);
            }
        });
    };
    /** Notify devtools that a component has been unmounted from the DOM. */
    var componentRemoved = function (component) {
        var instance = updateReactComponent(component);
        visitNonCompositeChildren(function (childInst) {
            instanceMap["delete"](childInst.node);
            Reconciler.unmountComponent(childInst);
        });
        Reconciler.unmountComponent(instance);
        instanceMap["delete"](component);
        if (instance._rootID) {
            delete roots[instance._rootID];
        }
    };
    return {
        componentAdded: componentAdded,
        componentUpdated: componentUpdated,
        componentRemoved: componentRemoved,
        // Interfaces passed to devtools via __REACT_DEVTOOLS_GLOBAL_HOOK__.inject()
        ComponentTree: ComponentTree,
        Mount: Mount,
        Reconciler: Reconciler
    };
}
/**
 * Visit all child instances of a ReactCompositeComponent-like object that are
 * not composite components (ie. they represent DOM elements or text)
 *
 * @param {Component} component
 * @param {(Component) => void} visitor
 */
function visitNonCompositeChildren(component, visitor) {
    if (component._renderedComponent) {
        visitor(component._renderedComponent);
        visitNonCompositeChildren(component._renderedComponent, visitor);
    }
    else if (component._renderedChildren) {
        component._renderedChildren.forEach(function (child) {
            visitor(child);
            if (!child._component) {
                visitNonCompositeChildren(child, visitor);
            }
        });
    }
}
/**
 * Create a bridge between the Nerv component tree and React's dev tools
 * and register it.
 *
 * After this function is called, the React Dev Tools should be able to detect
 * "React" on the page and show the component tree.
 *
 * This function hooks into Nerv VNode creation in order to expose functional
 * components correctly, so it should be called before the root component(s)
 * are rendered.
 *
 * Returns a cleanup function which unregisters the hooks.
 */
function initDevTools() {
    if (typeof window['__REACT_DEVTOOLS_GLOBAL_HOOK__'] === 'undefined') {
        // React DevTools are not installed
        return;
    }
    // Notify devtools when Nerv components are mounted, updated or unmounted
    var bridge = createDevToolsBridge();
    var nextAfterMount = options.afterMount;
    options.afterMount = function (component) {
        bridge.componentAdded(component);
        if (nextAfterMount) {
            nextAfterMount(component);
        }
    };
    var nextAfterUpdate = options.afterUpdate;
    options.afterUpdate = function (component) {
        bridge.componentUpdated(component);
        if (nextAfterUpdate) {
            nextAfterUpdate(component);
        }
    };
    var nextBeforeUnmount = options.beforeUnmount;
    options.beforeUnmount = function (component) {
        bridge.componentRemoved(component);
        if (nextBeforeUnmount) {
            nextBeforeUnmount(component);
        }
    };
    // Notify devtools about this instance of "React"
    window['__REACT_DEVTOOLS_GLOBAL_HOOK__'].inject(bridge);
    return function () {
        options.afterMount = nextAfterMount;
        options.afterUpdate = nextAfterUpdate;
        options.beforeUnmount = nextBeforeUnmount;
    };
}

var ts = new TypeStyle();
var className = ts.style({
    $debugName: 'TimeSpan',
    backgroundColor: '#ff0000'
});
var Time = /** @class */ (function (_super) {
    __extends(Time, _super);
    function Time() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Time.prototype.render = function () {
        return createElement$2("div", null,
            "Time:",
            createElement$2("span", { "class": className }, this.props.date.toString()));
    };
    return Time;
}(Component));
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timer = null;
        _this.state = {
            running: false,
            time: new Date()
        };
        return _this;
    }
    App.prototype.componentDidMount = function () {
        console.info("APP MOUNTED");
    };
    App.prototype.updateTimer = function () {
        this.setState({
            time: new Date()
        });
    };
    App.prototype.startTimer = function () {
        if (this.timer === null) {
            this.timer = setInterval(this.updateTimer, 1000);
            this.setState({
                running: true
            });
        }
    };
    App.prototype.stopTimer = function () {
        if (this.timer !== null) {
            clearInterval(this.timer);
            this.timer = null;
            this.setState({
                running: false
            });
        }
    };
    App.prototype.render = function () {
        return createElement$2("div", null,
            createElement$2(Time, { date: this.state.time }),
            this.state.running
                ? createElement$2("button", { onClick: this.stopTimer }, "Stop")
                : createElement$2("button", { onClick: this.startTimer }, "Start"));
    };
    __decorate([
        bound
    ], App.prototype, "updateTimer");
    __decorate([
        bound
    ], App.prototype, "startTimer");
    __decorate([
        bound
    ], App.prototype, "stopTimer");
    return App;
}(Component));
initDevTools();
render(createElement$2(App, null), document.body);

}());
