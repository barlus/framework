import "./JSX";

//export * from './core/index';
export * from './React';
export * from './ReactDOM';
export * from './PropTypes';
export type PropsOf<T extends { defaultProps }> = Partial<T['defaultProps']>;
