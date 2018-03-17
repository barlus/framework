import "../Reflect";
import { type } from '../../node/os';

import injection from "./injection";

import { Constructor, Dictionary, InjectionToken, Provider } from "./types";

const injectionTokenMetadataKey = "injectionTokens";
const reservedNames = [ "length", "name", "arguments", "caller", "prototype" ];

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
        params[ +key ] = injectionTokens[ key ];
    });
    const DecoratedClass = Class(params, injection, target);
    Object.defineProperty(DecoratedClass, 'name', {
        configurable: true,
        value: target.name
    });
    return DecoratedClass as Constructor<T>;
}

/**
 * Parameter decorator factory that allows for interface information to be stored in the constructor's metadata
 *
 * @return The parameter decorator
 */
export function inject(target: any, _propertyKey: string | symbol, parameterIndex?: number | PropertyDescriptor): any {
    if (typeof parameterIndex == 'number') {
        const injectionToken = Reflect.getOwnMetadata("design:paramtypes", target)[ parameterIndex as number ];
        const injectionTokens = Reflect.getOwnMetadata(injectionTokenMetadataKey, target) || {};
        injectionTokens[ parameterIndex as number ] = injectionToken;
        Reflect.defineMetadata(injectionTokenMetadataKey, injectionTokens, target);
    } else {
        const injectionToken = Reflect.getOwnMetadata("design:type", target, _propertyKey);
        Reflect.defineProperty(target, _propertyKey, {
            configurable: true,
            enumerable: false,
            get() {
                const value= injection.resolve(injectionToken);
                Reflect.defineProperty(target, _propertyKey, {
                    configurable: true,
                    enumerable: false,
                    value
                });
                return value;
            }
        })
    }
}

export function token(token: string): ParameterDecorator & PropertyDecorator {
    return function (target: any, _propertyKey: string | symbol, parameterIndex?: number | PropertyDescriptor): any {
        if (typeof parameterIndex == 'number') {
            const injectionToken = token;
            const injectionTokens = Reflect.getOwnMetadata(injectionTokenMetadataKey, target) || {};
            injectionTokens[ parameterIndex as number ] = injectionToken;
            Reflect.defineMetadata(injectionTokenMetadataKey, injectionTokens, target);
        } else {
            Reflect.defineMetadata("design:type", token, target, _propertyKey);
        }
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

export function singleton<T>(target: Constructor<T>) {
    let instance = null;
    injection.register({
        token: target,
        useFactory: () => {
            if (instance == null) {
                instance = new target();
            }
            return instance;
        }
    })
    return target;
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