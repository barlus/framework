export * from './globals';
export * from './Reflect';
export * from './internal';


declare global {
    interface Dictionary<T=any> {
        [k:string]:T;
    }
    interface Class<T> {
        new(...args:any[]):T;
    }
}