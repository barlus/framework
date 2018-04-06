
export type InjectionToken<T> = Constructor<T> | string;
/** Constructor type */
export interface Constructor<T> {
    new(...args: any[]): T;
    prototype:T;
}

export type Dictionary<T> = { [key: string]: T };

export interface DependencyContainer {
    register<T>(provider: Provider<T>): void;
    resolve<T>(token: InjectionToken<T>): T;
    isRegistered<T>(token: InjectionToken<T>): boolean;
}

export type Provider<T> = Constructor<T> | ClassProvider<T> | ValueProvider<T> | TokenProvider<T> | FactoryProvider<T>;

export interface BaseProvider {
    token: InjectionToken<any>;
}

export interface ClassProvider<T> extends BaseProvider {
    useClass: Constructor<T>;
}

export interface ValueProvider<T> extends BaseProvider {
    useValue: T;
}

export interface TokenProvider<T> extends BaseProvider {
    useToken: InjectionToken<T>;
}

/**
 * Provide a dependency using a factory.
 * Unlike the other providers, this does not support instance caching. If
 * you need instance caching, your factory method must implement it.
 */
export interface FactoryProvider<T> extends BaseProvider {
    useFactory: (dependencyContainer: DependencyContainer) => T;
}