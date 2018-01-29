
import "../Reflect";

import injection from "./injection";


import { Constructor, Dictionary, InjectionToken, Provider } from "./types";

const injectionTokenMetadataKey = "injectionTokens";
const reservedNames = ["length", "name", "arguments", "caller", "prototype"];


/**
 * Class decorator factory that allows the class' dependencies to be
 * automatically injected at runtime.
 *
 * @return {Function} The class decorator
 */
export function injectable<T extends any>(target: Constructor<T>): Constructor<T> {
    const params: any[] = Reflect.getMetadata("design:paramtypes", target) || [];
    const injectionTokens: Dictionary<InjectionToken<any>> = Reflect.getOwnMetadata(injectionTokenMetadataKey, target) || {};
    Object.keys(injectionTokens).forEach(key => {
        params[+key] = injectionTokens[key];
    });
    const DecoratedClass = Class(params, injection, target) ;
    Object.defineProperty(DecoratedClass,'name',{
        configurable:true,
        value:target.name
    });
    return DecoratedClass as Constructor<T>;
}

/**
 * Parameter decorator factory that allows for interface information to be stored in the constructor's metadata
 *
 * @return The parameter decorator
 */
export function inject(target: any, _propertyKey: string | symbol, parameterIndex: number): any {
    const injectionToken = Reflect.getOwnMetadata("design:paramtypes", target)[parameterIndex];
    const injectionTokens = Reflect.getOwnMetadata(injectionTokenMetadataKey, target) || {};
    injectionTokens[parameterIndex] = injectionToken;
    Reflect.defineMetadata(injectionTokenMetadataKey, injectionTokens, target);
}

export function named(token: string): ParameterDecorator {
    return function (target: any, _propertyKey: string | symbol, parameterIndex: number): any {
        const injectionToken = token;
        const injectionTokens = Reflect.getOwnMetadata(injectionTokenMetadataKey, target) || {};
        injectionTokens[parameterIndex] = injectionToken;
        Reflect.defineMetadata(injectionTokenMetadataKey, injectionTokens, target);
    }
}

/**
 * Class decorator factory that allows constructor dependencies to be registered at runtime.
 *
 * @return {Function} The class decorator
 */
export function registry(providers: Provider<any>[] = []): (target: any) => any {
    return function (target: any): any {
        providers.forEach(provider => injection.register(provider));
        return target;
    };
}

const Class = (params, injection, Parent) => new Function(
    'params', 'injection', 'Parent',
    `return class ${Parent.name}ᴵ extends Parent {
        constructor(...args) {
            const resolvedArgs = args.slice();
            params.slice(args.length).forEach(param => {
                resolvedArgs.push(injection.resolve(param));
            });
            super(...resolvedArgs)
        }
    }`
)(params, injection, Parent);