/// <reference no-default-lib="true"/>
interface Object {
    constructor: Function;
}
interface PropertyDescriptor {
    configurable?: boolean;
    enumerable?: boolean;
    value?: any;
    writable?: boolean;
    get?(): any;
    set?(v: any): void;
}
interface PropertyDescriptorMap {
    [s: string]: PropertyDescriptor;
}
/**
 * Marker for contextual 'this' type
 */
interface ThisType<T> {}
interface TypedPropertyDescriptor<T> {
    enumerable?: boolean;
    configurable?: boolean;
    writable?: boolean;
    value?: T;
    get?: () => T;
    set?: (value: T) => void;
}
/**
 * Provides functionality common to all JavaScript objects.
 */
declare class Object implements Object {
    /** Returns a string representation of an object. */
    toString(): string;
    /** Returns a date converted to a string using the current locale. */
    toLocaleString(): string;
    /** Returns the primitive value of the specified object. */
    valueOf(): Object;
    /**
     * Determines whether an object has a property with the specified name.
     * @param v A property name.
     */
    hasOwnProperty(v: string): boolean;
    /**
     * Determines whether an object exists in another object's prototype chain.
     * @param v Another object whose prototype chain is to be checked.
     */
    isPrototypeOf(v: Object): boolean;
    /**
     * Determines whether a specified property is enumerable.
     * @param v A property name.
     */
    propertyIsEnumerable(v: string): boolean;
    /**
     * Determines whether an object has a property with the specified name.
     * @param v A property name.
     */
    hasOwnProperty(v: PropertyKey): boolean;
    /**
     * Determines whether a specified property is enumerable.
     * @param v A property name.
     */
    propertyIsEnumerable(v: PropertyKey): boolean;
    /**
     * Copy the values of all of the enumerable own properties from one or more source objects to a
     * target object. Returns the target object.
     * @param target The target object to copy to.
     * @param source The source object from which to copy properties.
     */
    static assign<T, U>(target: T, source: U): T & U;
    /**
     * Copy the values of all of the enumerable own properties from one or more source objects to a
     * target object. Returns the target object.
     * @param target The target object to copy to.
     * @param source1 The first source object from which to copy properties.
     * @param source2 The second source object from which to copy properties.
     */
    static assign<T, U, V>(target: T, source1: U, source2: V): T & U & V;
    /**
     * Copy the values of all of the enumerable own properties from one or more source objects to a
     * target object. Returns the target object.
     * @param target The target object to copy to.
     * @param source1 The first source object from which to copy properties.
     * @param source2 The second source object from which to copy properties.
     * @param source3 The third source object from which to copy properties.
     */
    static assign<T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
    /**
     * Copy the values of all of the enumerable own properties from one or more source objects to a
     * target object. Returns the target object.
     * @param target The target object to copy to.
     * @param sources One or more source objects from which to copy properties
     */
    static assign(target: object, ...sources: any[]): any;
    /**
     * Returns an array of all symbol properties found directly on object o.
     * @param o Object to retrieve the symbols from.
     */
    static getOwnPropertySymbols(o: any): symbol[];
    /**
     * Returns true if the values are the same value, false otherwise.
     * @param value1 The first value.
     * @param value2 The second value.
     */
    static is(value1: any, value2: any): boolean;
    /**
     * Sets the prototype of a specified object o to  object proto or null. Returns the object o.
     * @param o The object to change its prototype.
     * @param proto The value of the new prototype or null.
     */
    static setPrototypeOf(o: any, proto: object | null): any;
    /**
     * Gets the own property descriptor of the specified object.
     * An own property descriptor is one that is defined directly on the object and is not
     * inherited from the object's prototype.
     * @param o Object that contains the property.
     * @param p Name of the property.
     */
    static getOwnPropertyDescriptor(o: any, propertyKey: PropertyKey): PropertyDescriptor | undefined;
    /**
     * Adds a property to an object, or modifies attributes of an existing property.
     * @param o Object on which to add or modify the property. This can be a native JavaScript
     * object (that is, a user-defined object or a built in object) or a DOM object.
     * @param p The property name.
     * @param attributes Descriptor for the property. It can be for a data property or an accessor
     *  property.
     */
    static defineProperty(o: any, propertyKey: PropertyKey, attributes: PropertyDescriptor): any;
    /**
     * Returns an array of values of the enumerable properties of an object
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     */
    static values<T>(o: { [s: string]: T } | { [n: number]: T }): T[];
    /**
     * Returns an array of values of the enumerable properties of an object
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     */
    static values(o: any): any[];
    /**
     * Returns an array of key/values of the enumerable properties of an object
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     */
    static entries<T>(o: { [s: string]: T } | { [n: number]: T }): [string, T][];
    /**
     * Returns an array of key/values of the enumerable properties of an object
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     */
    static entries(o: any): [string, any][];
    /**
     * Returns an object containing all own property descriptors of an object
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     */
    static getOwnPropertyDescriptors<T>(o: T): {[P in keyof T]: TypedPropertyDescriptor<T[P]>} & { [x: string]: PropertyDescriptor };
    /**
     * Returns the prototype of an object.
     * @param o The object that references the prototype.
     */
    static getPrototypeOf(o: any): any;
    /**
     * Gets the own property descriptor of the specified object.
     * An own property descriptor is one that is defined directly on the object and is not inherited from the object's prototype.
     * @param o Object that contains the property.
     * @param p Name of the property.
     */
    static getOwnPropertyDescriptor(o: any, p: string): PropertyDescriptor | undefined;
    /**
     * Returns the names of the own properties of an object. The own properties of an object are those that are defined directly
     * on that object, and are not inherited from the object's prototype. The properties of an object include both fields (objects) and functions.
     * @param o Object that contains the own properties.
     */
    static getOwnPropertyNames(o: any): string[];
    /**
     * Creates an object that has the specified prototype or that has null prototype.
     * @param o Object to use as a prototype. May be null.
     */
    static create(o: object | null): any;
    /**
     * Creates an object that has the specified prototype, and that optionally contains specified properties.
     * @param o Object to use as a prototype. May be null
     * @param properties JavaScript object that contains one or more property descriptors.
     */
    static create(o: object | null, properties: PropertyDescriptorMap & ThisType<any>): any;
    /**
     * Adds a property to an object, or modifies attributes of an existing property.
     * @param o Object on which to add or modify the property. This can be a native JavaScript object (that is, a user-defined object or a built in object) or a DOM object.
     * @param p The property name.
     * @param attributes Descriptor for the property. It can be for a data property or an accessor property.
     */
    static defineProperty(o: any, p: string, attributes: PropertyDescriptor & ThisType<any>): any;
    /**
     * Adds one or more properties to an object, and/or modifies attributes of existing properties.
     * @param o Object on which to add or modify the properties. This can be a native JavaScript object or a DOM object.
     * @param properties JavaScript object that contains one or more descriptor objects. Each descriptor object describes a data property or an accessor property.
     */
    static defineProperties(o: any, properties: PropertyDescriptorMap & ThisType<any>): any;
    /**
     * Prevents the modification of attributes of existing properties, and prevents the addition of new properties.
     * @param o Object on which to lock the attributes.
     */
    static seal<T>(o: T): T;
    /**
     * Prevents the modification of existing property attributes and values, and prevents the addition of new properties.
     * @param o Object on which to lock the attributes.
     */
    static freeze<T>(a: T[]): ReadonlyArray<T>;
    /**
     * Prevents the modification of existing property attributes and values, and prevents the addition of new properties.
     * @param o Object on which to lock the attributes.
     */
    static freeze<T extends Function>(f: T): T;
    /**
     * Prevents the modification of existing property attributes and values, and prevents the addition of new properties.
     * @param o Object on which to lock the attributes.
     */
    static freeze<T>(o: T): Readonly<T>;
    /**
     * Prevents the addition of new properties to an object.
     * @param o Object to make non-extensible.
     */
    static preventExtensions<T>(o: T): T;
    /**
     * Returns true if existing property attributes cannot be modified in an object and new properties cannot be added to the object.
     * @param o Object to test.
     */
    static isSealed(o: any): boolean;
    /**
     * Returns true if existing property attributes and values cannot be modified in an object, and new properties cannot be added to the object.
     * @param o Object to test.
     */
    static isFrozen(o: any): boolean;
    /**
     * Returns a value that indicates whether new properties can be added to an object.
     * @param o Object to test.
     */
    static isExtensible(o: any): boolean;
    /**
     * Returns the names of the enumerable properties and methods of an object.
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     */
    static keys(o: {}): string[];
}