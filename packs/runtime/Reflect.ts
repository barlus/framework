import {globals} from './globals';

export const METADATA = new Map();
export const NULL = Symbol('NULL');

function hasOwn(hash,key){
    return Object.prototype.hasOwnProperty.call(hash,key)
}
function getMapItem(map:Map<any,any>,key:any,factory?){
    let val = map.has(key) ? map.get(key) : NULL;
    if(val===NULL && typeof factory=='function'){
        map.set(key,val=factory());
    }
    return val;
}
function getHashItem(hash:object,key:string|symbol,factory?){
    let val = hasOwn(hash,key) ? hash[key] : NULL;
    if(val===NULL && typeof factory=='function'){
        hash[key] = val=factory();
    }
    return val;
}
function set({name,target,key,value}){
    //console.info(`${String(name)} = ${value} => ${(typeof target=='function'?`${target.name}`:`${target.constructor.name}.prototype`)}${key?`.${key}`:''}`)
    let map = getMapItem(METADATA,target,()=>new Map());
    if (key){
        map = getHashItem(map,key,()=>new Map());
    }    
    map.set(name, value);
}
function get({target,key,name,inherited}){
    function getForTarget(target,key,name){
        let map = getMapItem(METADATA,target);
        if (map!==NULL && key){
            map = getHashItem(map,key);
        }
        if(map!==NULL){
            if(name!=NULL){
                return map.get(name)
            }else{
                return map;
            }
        }
    }
    let result = getForTarget(target,key,name);
    while(inherited && result===void 0 && (target = Object.getPrototypeOf(target))){
        result = getForTarget(target,key,name);
    }
    return result;
}
function del({name,target,key}):boolean{
    let metadata = get({name:NULL,target,key,inherited:false});
    if(metadata && metadata.has(name)){
        metadata.delete(name);
        return true;
    }else{
        return false;
    }
}
function keys({target,key,inherited}):(string|symbol)[]{
    return Array.from(get({name:NULL,target,key,inherited}).keys());
}

/**
 * Applies a set of decorators to a target object.
 * Decorators are applied in reverse order of their positions in the array.
 * @param decorators An array of decorators.
 * @param target The target object.
 * @returns The result of applying the provided decorators. 
 * @example ```
 *  class Example { }
 *  // constructor
 *  Example = Reflect.decorate(decoratorsArray, Example);
 * ```
 */
export function decorate(decorators: ClassDecorator[], target: Function): Function
/**
 * Applies a set of decorators to a property of a target object.
 * @param decorators An array of decorators.
 * @param target The target object.
 * @param key The property key to decorate.
 * @param descriptor A property descriptor
 * @remarks Decorators are applied in reverse order.
 * @example
 * ```
 *     class Example {
 *         // property declarations are not part of ES6, though they are valid in TypeScript:
 *         // static staticProperty;
 *         // property;
 *
 *         static staticMethod() { }
 *         method() { }
 *     }
 *
 *     // property (on constructor)
 *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
 * 
 *      // property (on prototype)
 *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
 *
 *     // method (on constructor)
 *     Object.defineProperty(Example, "staticMethod",
 *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
 *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
 *
 *     // method (on prototype)
 *     Object.defineProperty(Example.prototype, "method",
 *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
 *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
 * ```
 */
export function decorate(decorators: (PropertyDecorator | MethodDecorator)[], target: Object, key: string | symbol, descriptor?: PropertyDescriptor): PropertyDescriptor;
export function decorate(decorators: (PropertyDecorator | MethodDecorator | ClassDecorator)[], target?: Object | Function, key?: string | symbol, desc?: PropertyDescriptor) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) {
            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        }
    }
    return c > 3 && r && Object.defineProperty(target, key as any, r), r;
}

/**
 * A default metadata decorator factory that can be used on a class, class member, or parameter.
 * @param name The key for the metadata entry.
 * @param value The value for the metadata entry.
 * @returns A decorator function.
 * @remarks
 * If `name` is already defined for the target and target key, the
 * value for that key will be overwritten.
 * @example ```
 *	// constructor
 *	@Reflect.metadata(key, value)
 *	class Example {	}
 *	// property (on constructor, TypeScript only)
 *	class Example {
 *		@Reflect.metadata(key, value)
 *		static staticProperty;
 *	}
 *	// property (on prototype, TypeScript only)
 *	class Example {
 *		@Reflect.metadata(key, value)
 *		property;
 *	}
 *	// method (on constructor)
 *	class Example {
 *		@Reflect.metadata(key, value)
 *		static staticMethod() { }
 *	}
 *	// method (on prototype)
 *	class Example {
 *		@Reflect.metadata(key, value)
 *		method() { }
 *	}
 */
export function metadata(name: any, value: any): {
    (target: Function): void;
    (target: Object, key: string | symbol): void;
    (target: Object, key: string | symbol, desc?:PropertyDescriptor|number): void;
}
export function metadata(name, value) {    
    return (target, key?) => {
        defineMetadata(name, value, target, key)
    }
}

/**
 * Build parameter decorator 
 * @param index 
 * @param decorator
 */
export function param(index:number, decorator:ParameterDecorator){
    return (target, key) => { 
        decorator(target, key, index);
    }
}

/**
 * Define a unique metadata entry on the target.
 * @param name A key used to store and retrieve metadata.
 * @param value A value that contains attached metadata.
 * @param target The target object on which to define metadata.
 * @example ```
 * 	class Example {
 *	}
 *
 * 	// constructor
 * 	Reflect.defineMetadata("custom:annotation", options, Example);
 *
 * 	// decorator factory as metadata-producing annotation.
 * 	function MyAnnotation(options): ClassDecorator {
 *		return target => Reflect.defineMetadata (
 * 			"custom:annotation", options, target
 * 		);
 * 	}
 * ```
 */
export function defineMetadata(name: any, value: any, target: Object): void;
/**
 * Define a unique metadata entry on the target.
 * @param name A key used to store and retrieve metadata.
 * @param value A value that contains attached metadata.
 * @param target The target object on which to define metadata.
 * @param key The property key for the target.
 * @example
 *
 *     class Example {
 *         // property declarations are not part of ES6, though they are valid in TypeScript:
 *         // static staticProperty;
 *         // property;
 *
 *         static staticMethod(p) { }
 *         method(p) { }
 *     }
 *
 *     // property (on constructor)
 *     Reflect.defineMetadata("custom:annotation", Number, Example, "staticProperty");
 *
 *     // property (on prototype)
 *     Reflect.defineMetadata("custom:annotation", Number, Example.prototype, "property");
 *
 *     // method (on constructor)
 *     Reflect.defineMetadata("custom:annotation", Number, Example, "staticMethod");
 *
 *     // method (on prototype)
 *     Reflect.defineMetadata("custom:annotation", Number, Example.prototype, "method");
 *
 *     // decorator factory as metadata-producing annotation.
 *     function MyAnnotation(options): PropertyDecorator {
 *         return (target, key) => Reflect.defineMetadata("custom:annotation", options, target, key);
 *     }
 *
 */
export function defineMetadata(name: any, value: any, target: Object, key: string | symbol): void;
export function defineMetadata(name: any, value: any, target: Object, key?: string | symbol): void {
    set({name,value,target,key})
}
/**
 * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
 * @param name A key used to store and retrieve metadata.
 * @param target The target object on which the metadata is defined.
 * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
 * @example
 *
 *     class Example {
 *     }
 *
 *     // constructor
 *     result = Reflect.getMetadata("custom:annotation", Example);
 *
 */
export function getMetadata(name: any, target: Object): any;
/**
 * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
 * @param name A key used to store and retrieve metadata.
 * @param target The target object on which the metadata is defined.
 * @param key The property key for the target.
 * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
 * @example
 *
 *     class Example {
 *         // property declarations are not part of ES6, though they are valid in TypeScript:
 *         // static staticProperty;
 *         // property;
 *
 *         static staticMethod(p) { }
 *         method(p) { }
 *     }
 *
 *     // property (on constructor)
 *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
 *
 *     // property (on prototype)
 *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
 *
 *     // method (on constructor)
 *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
 *
 *     // method (on prototype)
 *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
 *
 */
export function getMetadata(name: any, target: Object, key: string | symbol): any;
export function getMetadata(name: any, target: Object, key?: string | symbol): any {
    return get({name,target,key,inherited:true})
}

/**
 * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
 * @param name A key used to store and retrieve metadata.
 * @param target The target object on which the metadata is defined.
 * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
 * @example
 *
 *     class Example {
 *     }
 *
 *     // constructor
 *     result = Reflect.getMetadata("custom:annotation", Example);
 *
 */
export function getOwnMetadata(name: any, target: Object): any;
/**
 * Gets the metadata value for the provided metadata key on the target object.
 * @param name A key used to store and retrieve metadata.
 * @param target The target object on which the metadata is defined.
 * @param key The property key for the target.
 * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
 * @example ```
 *     class Example {
 *         // property declarations are not part of ES6, though they are valid in TypeScript:
 *         // static staticProperty;
 *         // property;
 *
 *         static staticMethod(p) { }
 *         method(p) { }
 *     }
 *
 *     // property (on constructor)
 *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
 *
 *     // property (on prototype)
 *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
 *
 *     // method (on constructor)
 *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
 *
 *     // method (on prototype)
 *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
 * ```
 */
export function getOwnMetadata(name: any, target: Object, key: string | symbol): any;
export function getOwnMetadata(name: any, target: Object, key?: string | symbol): any {
    return get({name,target,key,inherited:false})
}

/**
 * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
 * @param name A key used to store and retrieve metadata.
 * @param target The target object on which the metadata is defined.
 * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
 * @example ```
 *
 *     class Example {
 *     }
 *
 *     // constructor
 *     result = Reflect.hasMetadata("custom:annotation", Example);
 *```
 */
export function hasMetadata(name: any, target: Object): boolean;
/**
 * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
 * @param name A key used to store and retrieve metadata.
 * @param target The target object on which the metadata is defined.
 * @param key The property key for the target.
 * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
 * @example
 *
 *     class Example {
 *         // property declarations are not part of ES6, though they are valid in TypeScript:
 *         // static staticProperty;
 *         // property;
 *
 *         static staticMethod(p) { }
 *         method(p) { }
 *     }
 *
 *     // property (on constructor)
 *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
 *
 *     // property (on prototype)
 *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
 *
 *     // method (on constructor)
 *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
 *
 *     // method (on prototype)
 *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
 *
 */
export function hasMetadata(name: any, target: Object, key: string | symbol): boolean;
export function hasMetadata(name: any, target: Object, key?: string | symbol): boolean {
    return !!get({name,target,key,inherited:true});
}

/**
 * Gets a value indicating whether the target object has the provided metadata key defined.
 * @param name A key used to store and retrieve metadata.
 * @param target The target object on which the metadata is defined.
 * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
 * @example
 *
 *     class Example {
 *     }
 *
 *     // constructor
 *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
 *
 */
export function hasOwnMetadata(name: any, target: Object): boolean;
/**
 * Gets a value indicating whether the target object has the provided metadata key defined.
 * @param name A key used to store and retrieve metadata.
 * @param target The target object on which the metadata is defined.
 * @param key The property key for the target.
 * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
 * @example
 *
 *     class Example {
 *         // property declarations are not part of ES6, though they are valid in TypeScript:
 *         // static staticProperty;
 *         // property;
 *
 *         static staticMethod(p) { }
 *         method(p) { }
 *     }
 *
 *     // property (on constructor)
 *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
 *
 *     // property (on prototype)
 *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
 *
 *     // method (on constructor)
 *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
 *
 *     // method (on prototype)
 *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
 *
 */
export function hasOwnMetadata(name: any, target: Object, key: string | symbol): boolean;
export function hasOwnMetadata(name: any, target: Object, key?: string | symbol): boolean {
    return !!get({name,target,key,inherited:false});
}

/**
 * Gets the metadata keys defined on the target object or its prototype chain.
 * @param target The target object on which the metadata is defined.
 * @returns An array of unique metadata keys.
 * @example
 *
 *     class Example {
 *     }
 *
 *     // constructor
 *     result = Reflect.getMetadataKeys(Example);
 *
 */
export function getMetadataKeys(target: Object): any[];
/**
 * Gets the metadata keys defined on the target object or its prototype chain.
 * @param target The target object on which the metadata is defined.
 * @param key The property key for the target.
 * @returns An array of unique metadata keys.
 * @example
 *
 *     class Example {
 *         // property declarations are not part of ES6, though they are valid in TypeScript:
 *         // static staticProperty;
 *         // property;
 *
 *         static staticMethod(p) { }
 *         method(p) { }
 *     }
 *
 *     // property (on constructor)
 *     result = Reflect.getMetadataKeys(Example, "staticProperty");
 *
 *     // property (on prototype)
 *     result = Reflect.getMetadataKeys(Example.prototype, "property");
 *
 *     // method (on constructor)
 *     result = Reflect.getMetadataKeys(Example, "staticMethod");
 *
 *     // method (on prototype)
 *     result = Reflect.getMetadataKeys(Example.prototype, "method");
 *
 */
export function getMetadataKeys(target: Object, key: string | symbol): any[];
export function getMetadataKeys(target: Object, key?: string | symbol): any[] {
    let keys = getOwnMetadataKeys(target,key);
    while(target = Object.getPrototypeOf(target)){
        getOwnMetadataKeys(target,key).forEach(k=>{
            if(keys.indexOf(k)<0){
                keys.push(k);
            }
        })
    }
    return keys;
}
/**
 * Gets the unique metadata keys defined on the target object.
 * @param target The target object on which the metadata is defined.
 * @returns An array of unique metadata keys.
 * @example
 *
 *     class Example {
 *     }
 *
 *     // constructor
 *     result = Reflect.getOwnMetadataKeys(Example);
 *
 */
export function getOwnMetadataKeys(target: Object): any[];
/**
 * Gets the unique metadata keys defined on the target object.
 * @param target The target object on which the metadata is defined.
 * @param key The property key for the target.
 * @returns An array of unique metadata keys.
 * @example
 *
 *     class Example {
 *         // property declarations are not part of ES6, though they are valid in TypeScript:
 *         // static staticProperty;
 *         // property;
 *
 *         static staticMethod(p) { }
 *         method(p) { }
 *     }
 *
 *     // property (on constructor)
 *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
 *
 *     // property (on prototype)
 *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
 *
 *     // method (on constructor)
 *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
 *
 *     // method (on prototype)
 *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
 *
 */
export function getOwnMetadataKeys(target: Object, key: string | symbol): any[];
export function getOwnMetadataKeys(target: Object, key?: string | symbol): any[] {
    let metadata = get({name:NULL,target,key,inherited:false});
    if(metadata){
        return Array.from(metadata.keys())
    }else{
        return []
    }
    
}

/**
 * Deletes the metadata entry from the target object with the provided key.
 * @param name A key used to store and retrieve metadata.
 * @param target The target object on which the metadata is defined.
 * @returns `true` if the metadata entry was found and deleted; otherwise, false.
 * @example
 *
 *     class Example {
 *     }
 *
 *     // constructor
 *     result = Reflect.deleteMetadata("custom:annotation", Example);
 *
 */
export function deleteMetadata(name: any, target: Object): boolean;
/**
 * Deletes the metadata entry from the target object with the provided key.
 * @param name A key used to store and retrieve metadata.
 * @param target The target object on which the metadata is defined.
 * @param key The property key for the target.
 * @returns `true` if the metadata entry was found and deleted; otherwise, false.
 * @example
 *
 *     class Example {
 *         // property declarations are not part of ES6, though they are valid in TypeScript:
 *         // static staticProperty;
 *         // property;
 *
 *         static staticMethod(p) { }
 *         method(p) { }
 *     }
 *
 *     // property (on constructor)
 *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
 *
 *     // property (on prototype)
 *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
 *
 *     // method (on constructor)
 *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
 *
 *     // method (on prototype)
 *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
 *
 */
export function deleteMetadata(name: any, target: Object, key: string | symbol): boolean;
export function deleteMetadata(name: any, target: Object, key?: string | symbol): boolean {
    return del({name,target,key})
}

Object.assign(globals.Reflect,{
    decorate,
    metadata,
    param,
    defineMetadata,
    hasMetadata,
    getMetadata,
    getMetadataKeys,
    hasOwnMetadata,
    getOwnMetadata,
    getOwnMetadataKeys,
    deleteMetadata
});
Object.assign(globals,{
    __decorate:decorate,
    __metadata:metadata,
    __param:param,
});

export type decorator = typeof decorate;
export type metadata = typeof metadata;
export type param = typeof param;
export type defineMetadata  = typeof defineMetadata;
export type deleteMetadata  = typeof deleteMetadata;
export type hasMetadata  = typeof hasMetadata;
export type getMetadata  = typeof getMetadata;
export type getMetadataKeys  = typeof getMetadataKeys;
export type hasOwnMetadata  = typeof hasOwnMetadata;
export type getOwnMetadata  = typeof getOwnMetadata;
export type getOwnMetadataKeys  = typeof getOwnMetadataKeys;

declare global {
    namespace Reflect {
        export const decorate: decorator;
        export const metadata: metadata;
        export const param: param;
        export const defineMetadata: defineMetadata;
        export const deleteMetadata: deleteMetadata;
        export const hasMetadata: hasMetadata;
        export const getMetadata: getMetadata;
        export const getMetadataKeys: getMetadataKeys;
        export const hasOwnMetadata: hasOwnMetadata;
        export const getOwnMetadata: getOwnMetadata;
        export const getOwnMetadataKeys: getOwnMetadataKeys;
    }
}
