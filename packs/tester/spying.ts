import {INameable} from './interfaces';
import {stringify} from './stringify';
export interface ISpyCall {
    args: Array<any>;
    allArgumentsMatch(... expectedArguments: Array<any>): boolean;
}
export interface ITester {
    stringify: () => string;
    test: (value: any) => boolean;
}

export type TypedFunction<ArgumentType, ReturnType> = (...args: Array<ArgumentType>) => ReturnType;
export interface ISpiedFunction<ArgumentType, ReturnType> extends TypedFunction<ArgumentType, ReturnType>, FunctionSpy {
    call: (thisArg: any, ...functionArguments: Array<ArgumentType>) => ReturnType;
}
//
export class TypeMatcher<ExpectedType extends object> {

    private _testers: Array<ITester> = [];
    private _type: new (...args: Array<any>) => ExpectedType;
    public get type() {
        return this._type;
    }

    public constructor(type: new (...args: Array<any>) => ExpectedType) {
        if (type === null || type === undefined) {
            throw new TypeError("type must not be null or undefined");
        }

        this._type = type;

        this._testers.push({
            stringify: () => `Any ${(this.type as INameable).name}`,
            test: (value: any) => {
                if ((type as any) === String) {
                    return typeof value === "string" || value instanceof this._type;
                }
                else if ((type as any) === Number) {
                    return typeof value === "number" || value instanceof this._type;
                }
                else if ((type as any) === Boolean) {
                    return typeof value === "boolean" || value instanceof this._type;
                }
                else {
                    return value instanceof this._type;
                }
            }
        });
    }

    public test(value: any) {
        return this._testers.every(tester => tester.test(value));
    }

    public stringify(): string {
        return this._testers.map(tester => tester.stringify()).join(" and ");
    }

    /* tslint:disable:unified-signatures */
    public thatMatches(key: string, value: any): this;
    public thatMatches(properties: object): this;
    public thatMatches(delegate: (argument: ExpectedType) => boolean): this;
    public thatMatches(first: string | object | ((argument: ExpectedType) => boolean), second?: any): this {
        if (null === first || undefined === first ) {
            throw new TypeError("thatMatches requires none-null or non-undefined argument");
        }

        if (typeof first === "string") {
            return this._matchesKeyAndValue(first, second);
        }

        if (typeof first === "function") {
            return this._matchesDelegate(first);
        }

        if (typeof first === "object") {
            return this._matchesObjectLiteral(first);
        }

        throw new Error("Invalid arguments");
    }
    /* tslint:enable:unified-signatures */

    private _matchesKeyAndValue(key: string, value: any): this {
        this._testers.push({
            stringify: () => `with property '${key}' equal to '${stringify(value)}'`,
            test: (v: any) => {
                if (Object.getOwnPropertyNames(v).indexOf(key) < 0) {
                    return false;
                }

                return v[key] === value;
            }
        });

        return this;
    }

    private _matchesDelegate(delegate: (argument: ExpectedType) => boolean): this {
        this._testers.push({
            stringify: () => `matches '${delegate.toString()}'`,
            test: (v: any) => delegate(v)
        });

        return this;
    }

    private _matchesObjectLiteral(properties: object): this {
        if (properties.constructor !== Object) {
            throw new TypeError("thatMatches requires value passed in to be an object literal");
        }

        this._testers.push({
            stringify: () => `matches '${stringify(properties)}'`,
            test: (v: any) => {
                const targetKeys = Object.getOwnPropertyNames(v);
                return Object.getOwnPropertyNames(properties).every(key => {
                    if (targetKeys.indexOf(key) < 0) {
                        return false;
                    }

                    return v[key] === (properties as any)[key];
                });
            }
        });

        return this;
    }
}
export class SpyCall implements ISpyCall {

    public get args() {
        return this._args;
    }

    private _args: Array<any> = [];

    public constructor(args: Array<any>) {
        this._args = args;
    }

    public allArgumentsMatch(... expectedArguments: Array<any>): boolean {
        if (expectedArguments.length !== this._args.length) {
            return false;
        }

        if (expectedArguments.some((arg, index) => !this._argumentIsAsExpected(this._args[index], arg))) {
            return false;
        }

        return true;
    }

    private _argumentIsAsExpected(actualArgument: any, expectedArgument: any) {
        if (expectedArgument === Any) {
            return true;
        }
        else if (expectedArgument instanceof TypeMatcher) {
            return expectedArgument.test(actualArgument);
        }

        return actualArgument === expectedArgument;
    }
}
export class PropertySpy<PropertyType> {

    private _originialGetter: () => PropertyType | undefined;
    private _originialSetter: (value: PropertyType) => void | undefined;
    private _value: PropertyType;
    private _descriptorTarget: any;
    private _getter: () => PropertyType | undefined;
    private _setter: (value: PropertyType) => void | undefined;
    private _returnValue: boolean;
    private _propertyName: string;
    private _getCalls: Array<SpyCall> = [];

    private _setCalls: Array<SpyCall> = [];
    public get setCalls() {
        return this._setCalls;
    }

    public constructor(target: any, propertyName: string) {

        // store references to property we are spying on so we can restore it
        this._descriptorTarget = target;
        this._propertyName = propertyName;

        // for TypeScript may need to search target.constructor.prototype for propertyDescriptor
        if (!Object.getOwnPropertyDescriptor(target, this._propertyName)) {
            this._descriptorTarget = target.constructor.prototype;
        }

        // get the current property descriptor
        const propertyDescriptor = Object.getOwnPropertyDescriptor(this._descriptorTarget, this._propertyName);

        // throw an error if we are trying to spy on a non property
        if (propertyDescriptor === undefined) {
            throw new TypeError(`${propertyName} is not a property.`);
        }

        // store the original setters and getters, which maybe undefined
        this._originialGetter = propertyDescriptor.get as () => PropertyType | undefined;
        this._originialSetter = propertyDescriptor.set as (v: PropertyType) => void | undefined;

        this._getter = this._originialGetter;
        this._setter = this._originialSetter;

        // set descriptor target back to original object so the prototype doesn't get modified
        this._descriptorTarget = target;

        // reset the property definition
        Object.defineProperty(this._descriptorTarget, this._propertyName, {
            get: this._get.bind(this),
            set: this._set.bind(this)
        });
    }

    public andReturnValue(value: PropertyType): PropertySpy<PropertyType> {
        this._value = value;
        this._returnValue = true;
        return this;
    }

    public andCallGetter(getter: () => PropertyType): PropertySpy<PropertyType> {
        this._getter = getter;
        this._returnValue = false;
        return this;
    }

    public andCallSetter(setter: (value: PropertyType) => void): PropertySpy<PropertyType> {
        this._setter = setter;
        this._returnValue = false;
        return this;
    }

    public restore() {
        Object.defineProperty(this._descriptorTarget, this._propertyName, {
            get: this._originialGetter,
            set: this._originialSetter
        });
    }

    private _get() {
        // log that the property was requested
        this._getCalls.push(new SpyCall([]));

        // return a given value if this is the spy's behaviour
        if (this._returnValue) {
            return this._value;
        }

        // otherwise call the getter function and return it's return value
        return this._getter.call(this._descriptorTarget);
    }

    private _set(value: PropertyType) {
        // log that the proeprty was set and with which value
        this._setCalls.push(new SpyCall([ value ]));

        // call the setter function
        this._setter.call(this._descriptorTarget, value);

        // if there is not already a value to return then log this as the current value
        if (!this._returnValue) {
            this._value = value;
        }
    }
}
export class FunctionSpy {

    protected returnValue: any;
    protected hasReturnValue: boolean;
    protected isStubbed: boolean;
    protected context: any;
    private _fakeFunction: () => any;

    private _calls: Array<ISpyCall> = [];
    public get calls() {
        return this._calls;
    }

    public callsWithArguments(... args: Array<any>): Array<ISpyCall> {
        return this.calls.filter(call => call.allArgumentsMatch.apply(call, args));
    }

    public call(...args: Array<any>) {

        this.calls.push(new SpyCall(args));

        let returnValue: any;

        if (this._fakeFunction) {
            returnValue = this._fakeFunction.apply(this.context, args);
        }

        if (this.hasReturnValue) {
            return this.returnValue;
        }

        return returnValue;
    }

    public andReturn(returnValue: any) {
        this.returnValue = returnValue;
        this.hasReturnValue = true;
    }

    public andCall(fakeFunction: () => any) {
        this.isStubbed = true;
        this._fakeFunction = fakeFunction;
    }
}
export class RestorableFunctionSpy extends FunctionSpy {

    private _originalFunction: (...args: Array<any>) => any;
    private _functionName: string;
    private _target: any;

    public constructor(target: any, functionName: string) {

        super();

        this._originalFunction = target[functionName];
        this.context = target;

        this._functionName = functionName;
        this._target = target;

        target[functionName] = this.call.bind(this);

        exposeSpyFunctions(target[functionName], this);

        // expose spy's restore function
        target[functionName].restore = this.restore.bind(this);
    }

    public restore() {
        this._target[this._functionName] = this._originalFunction;
    }

    public andCallThrough() {
        this.isStubbed = false;
    }

    public andStub() {
        this.isStubbed = true;
    }

    public call(...args: Array<any>) {

        const returnValue = super.call.apply(this, args);

        if (!this.isStubbed && !this.hasReturnValue) {
            return this._originalFunction.apply(this.context, args);
        }

        return returnValue;
    }
}
//
export function createFunctionSpy<ArgumentType, ReturnType>(): ISpiedFunction<ArgumentType, ReturnType> {
    const functionSpy = new FunctionSpy();

    const spiedFunction = functionSpy.call.bind(functionSpy);

    exposeSpyFunctions(spiedFunction, functionSpy);

    return spiedFunction;
}
export function exposeSpyFunctions<ArgumentType, ReturnType>(spiedFunction: ISpiedFunction<ArgumentType, ReturnType>, functionSpy: FunctionSpy) {
    // expose spy's calls on function
    (spiedFunction as any).calls = functionSpy.calls;
    // expose spy's callsWithArguments on function
    spiedFunction.callsWithArguments = functionSpy.callsWithArguments;
    // expose spy's andReturn on function
    spiedFunction.andReturn = functionSpy.andReturn.bind(functionSpy);
    // expose spy's andCall on function
    spiedFunction.andCall = functionSpy.andCall.bind(functionSpy);
}
export function Any<ExpectedType extends object>(type: new (...args: Array<any>) => ExpectedType): TypeMatcher<ExpectedType> {
    return new TypeMatcher<ExpectedType>(type);
}
export function spyOn(target: any, functionName: string): RestorableFunctionSpy {
    if (target[functionName] instanceof Function) {
        return new RestorableFunctionSpy(target, functionName);
    }
    else {
        throw new TypeError(`${functionName} is not a function.`);
    }
}
export function spyOnProperty<T,K extends keyof T>(target: T, propertyName: K ): PropertySpy<K> {
    return new PropertySpy<K>(target, propertyName);
}
