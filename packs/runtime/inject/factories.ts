import {Constructor, DependencyContainer} from "./types";


export type FactoryFunction<T> = (container: DependencyContainer) => T;

export function instanceCachingFactory<T>(factoryFunc: FactoryFunction<T>): FactoryFunction<T> {
  let instance: T;
  return (container: DependencyContainer) => {
    if (instance == undefined) {
      instance = factoryFunc(container);
    }
    return instance;
  };
}
export function predicateAwareClassFactory<T>(predicate: (container: DependencyContainer) => boolean, trueConstructor: Constructor<T>, falseConstructor: Constructor<T>, useCaching = true): FactoryFunction<T> {
  let instance: T;
  let previousPredicate: boolean;
  return (container: DependencyContainer) => {
    const currentPredicate = predicate(container);
    if (!useCaching || previousPredicate !== currentPredicate) {
      if (previousPredicate = currentPredicate) {
        instance = container.resolve(trueConstructor);
      } else {
        instance = container.resolve(falseConstructor);
      }
    }
    return instance;
  };
}
