export * from './globals';
export * from './Reflect';
export * from './internal';
export * from './pattern';

declare global {
  interface Dictionary<T = any> {
    [ k: string ]: T;
  }
  interface Class<T> {
    new(...args: any[]): T;
  }
  type Mutable<T> = { -readonly [P in keyof T]: T[P] };
}