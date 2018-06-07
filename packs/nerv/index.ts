import "./jsx";
//export * from './core/index';
export * from './react/React';
export * from './react/ReactDOM';
export type PropsOf<T extends { defaultProps }> = Partial<T['defaultProps']>;
