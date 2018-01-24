import "@barlus/runtime/Reflect";
import {Decorator} from "@barlus/runtime/decorator";
import {Constructor} from './interfaces';
import {Suite} from './core';
//
export type suite = ClassDecorator & {
    (description: string): ClassDecorator;
    focus: ClassDecorator;
    setup: MethodDecorator;
    teardown: MethodDecorator;
    ignore: ClassDecorator & {
        (reson: string): ClassDecorator;
    }
};
export type test = MethodDecorator & {
    (description: string): MethodDecorator;
    async: MethodDecorator;
    focus: MethodDecorator;
    setup: MethodDecorator;
    teardown: MethodDecorator;
    ignore: MethodDecorator & {
        (reson: string): MethodDecorator;
    }
    case(...args: any[]): MethodDecorator;
    cases(caseArguments: (() => IterableIterator<any> | Array<Array<any>>) | IterableIterator<any> | Array<Array<any>>): MethodDecorator;
    timeout(timeoutInMs: number): MethodDecorator;
};
export const test: test = Object.assign<any, any>(testDecorator, {
    ignore: testDecoratorIgnore,
    case: testDecoratorCase,
    cases: testDecoratorCases,
    focus: testDecoratorFocus,
    setup: testDecoratorSetup,
    teardown: testDecoratorTeardown,
    timeout: testDecoratorTimeout,
});
export const suite: suite = Object.assign<any, any>(suiteDecorator, {
    ignore: suiteDecoratorIgnore,
    focus: suiteDecoratorFocus,
    setup: suiteDecoratorSetup,
    teardown: suiteDecoratorTeardown,
});
//
function testDecorator(target: object | string, propertyKey?: string, descriptor?: TypedPropertyDescriptor<any>): any {
    if (typeof target == 'object') {
        return testDecoratorProxy()(target, propertyKey, descriptor)
    } else
    // if target is sting then description is provided
    if (typeof target == 'string') {
        return testDecoratorProxy(target)
    } else {
        throw new TypeError('Invalid argument for suite decorator');
    }
}
function testDecoratorProxy(description?: string) {
    return function test(target: object, propertyKey: string, descriptor?: TypedPropertyDescriptor<any>) {
        let test = Suite.for(target).test(propertyKey);
        let info = Decorator.info(arguments);
        test.description = description||test.description||test.key;
        test.name = info.id;
        test.file = info.url;
        test.line = info.line;
        test.column = info.column;
    }
}
function testDecoratorIgnore(target: object | string, propertyKey?: string, descriptor?: TypedPropertyDescriptor<any>) {
    if (typeof target == 'object') {
        return testDecoratorIgnoreProxy()(target, propertyKey, descriptor);
    } else
    // if target is sting then description is provided
    if (typeof target == 'string') {
        return testDecoratorIgnoreProxy(target);
    } else {
        throw new TypeError('Invalid argument for suite decorator');
    }
}
function testDecoratorIgnoreProxy(reason: string = 'yes') {
    return function ignore(target: object, propertyKey: string, descriptor?: TypedPropertyDescriptor<any>){
        Suite.for(target).test(propertyKey).ignore(reason);
    }
}
function testDecoratorCase (...testCaseArguments: any[])  {
    return (target: object, propertyKey: string, descriptor?: TypedPropertyDescriptor<any>) => {
        unused(descriptor);
        Suite.for(target).test(propertyKey).case(testCaseArguments);
    };
}
function testDecoratorCases (caseArguments: (() => IterableIterator<any> | Array<Array<any>>) | IterableIterator<any> | Array<Array<any>>): MethodDecorator {
    return (target: object, propertyKey: string, descriptor?: TypedPropertyDescriptor<any>) => {
        unused(descriptor);
        let test = Suite.for(target).test(propertyKey);
        expandTestCases(caseArguments).forEach((val) => {
            test.case(val);
        })
    };
}
function testDecoratorFocus (target: object, propertyKey: string, descriptor?: TypedPropertyDescriptor<any>) {
    Suite.for(target).test(propertyKey).isFocused = true;
}
function testDecoratorSetup (target: object, decoratedPropertyKey: string, descriptor?: TypedPropertyDescriptor<() => any>)  {
    Suite.for(target).testSetupMethod = decoratedPropertyKey;
}
function testDecoratorTeardown (target: object, decoratedPropertyKey: string, descriptor?: TypedPropertyDescriptor<() => any>)  {
    Suite.for(target).testTeardownMethod = decoratedPropertyKey;
}
function testDecoratorTimeout (timeoutInMs: number) {
    if (timeoutInMs <= 0) {
        throw new RangeError("Timeout period must be greater than 0.");
    }
    return (target: object, propertyKey: string, descriptor?: TypedPropertyDescriptor<any>) => {
        Suite.for(target).test(propertyKey).timeout = timeoutInMs;
    };
}
//
function suiteDecorator (target: Constructor | string): any {
    if (typeof target == 'function') {
        return suiteDecoratorProxy()(target)
    } else
    // if target is sting then description is provided
    if (typeof target == 'string') {
        return suiteDecoratorProxy(target)
    } else {
        throw new TypeError('Invalid argument for suite decorator');
    }
}
function suiteDecoratorProxy (description?: string) {
    return function suite(constructor: Constructor){
        Suite.for(constructor).description = description || constructor.name;
    }
}
function suiteDecoratorIgnore (target: Constructor | string) {
    if (typeof target == 'function') {
        return suiteDecoratorIgnoreProxy()(target)
    } else
    // if target is sting then description is provided
    if (typeof target == 'string') {
        return suiteDecoratorIgnoreProxy(target)
    } else {
        throw new TypeError('Invalid argument for suite decorator');
    }
}
function suiteDecoratorIgnoreProxy (reason?: string) {
    return function ignore(target: Constructor) {
        Suite.for(target).ignore(reason);
    }
}
function suiteDecoratorFocus (target: Constructor) {
    Suite.for(target).isFocused = true;
}
function suiteDecoratorSetup (target: object, decoratedPropertyKey: string, descriptor?: TypedPropertyDescriptor<() => any>) {
    Suite.for(target).suiteSetupMethod = decoratedPropertyKey;
}
function suiteDecoratorTeardown (target: object, decoratedPropertyKey: string, descriptor?: TypedPropertyDescriptor<() => any>) {
    Suite.for(target).suiteTeardownMethod = decoratedPropertyKey;
}
//
function unused(param: any): any {
    return param;
}
function expandTestCases(caseArguments: (() => IterableIterator<any> | Array<Array<any>>) | IterableIterator<any> | Array<Array<any>>): Array<Array<any>> {
    if (null === caseArguments || undefined === caseArguments) {
        return [];
    }
    if (caseArguments instanceof Function) {
        return expandTestCases(caseArguments());
    }
    if (caseArguments instanceof Array) {
        return [...caseArguments];
    } else {
        return Array.from(caseArguments);
    }
}

