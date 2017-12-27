


import { Constructor, DependencyContainer, InjectionToken, Provider, ClassProvider, ValueProvider, TokenProvider, FactoryProvider } from "./types";

/** Dependency Container */
export class Container implements DependencyContainer {

    static isClassProvider<T>(provider: Provider<T>): provider is ClassProvider<any> {
        return !!(<ClassProvider<T>>provider).useClass;
    }

    static isValueProvider<T>(provider: Provider<T>): provider is ValueProvider<T> {
        return (<ValueProvider<T>>provider).useValue != undefined;
    }

    static isTokenProvider<T>(provider: Provider<T>): provider is TokenProvider<any> {
        return !!(<TokenProvider<T>>provider).useToken;
    }

    static isFactoryProvider<T>(provider: Provider<T>): provider is FactoryProvider<any> {
        return !!(<FactoryProvider<T>>provider).useFactory;
    }

    private _registry = new Map<InjectionToken<any>, [Provider<any>, any]>();

    /**
     * Register a dependency provider.
     *
     * @param provider {Provider} The dependency provider
     */
    public register<T>(provider: Provider<T>): void {
        // If constructor
        if (!Container.isClassProvider(provider) && !Container.isTokenProvider(provider) && !Container.isValueProvider(provider) && !Container.isFactoryProvider(provider)) {
            if (!this.isRegistered(provider)) {
                this._registry.set(provider, [provider, undefined]);
            }
        } else {
            if (!this.isRegistered(provider.token)) {
                this._registry.set(provider.token, [provider, undefined]);
            }
        }
    }

    /**
     * Resolve a token into an instance
     *
     * @param token {InjectionToken} The dependency token
     * @return {T} An instance of the dependency
     */
    public resolve<T>(token: InjectionToken<T>): T {
        const registration = this.isRegistered(token) && this._registry.get(token);

        if (!registration && typeof (token) === "string") {
            throw `Attempted to resolve unregistered dependency token: ${token}`;
        }

        if (registration) {
            const provider: Provider<T> = registration[0];
            const cachedInstance: T = registration[1];

            if (cachedInstance != undefined) {
                return cachedInstance;
            }

            if (Container.isValueProvider(provider)) {
                return registration[1] = provider.useValue;
            } else if (Container.isTokenProvider(provider)) {
                return registration[1] = this.resolve(provider.useToken);
            } else if (Container.isClassProvider(provider)) {
                return registration[1] = this._construct(provider.useClass);
            } else if (Container.isFactoryProvider(provider)) {
                return provider.useFactory(this);
            } else {
                return registration[1] = this._construct(provider);
            }
        }

        // No registration for this token, but since it's a constructor, return an instance
        return this._construct(<Constructor<T>>token);
    }

    /**
     * Check if the given dependency is registered
     *
     * @return {boolean}
     */
    public isRegistered<T>(token: InjectionToken<T>): boolean {
        return this._registry.has(token);
    }

    private _construct<T>(ctor: Constructor<T>): T {
        return new ctor();
    }
}

export const container = new Container();
export default container;

