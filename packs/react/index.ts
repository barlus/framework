import "./JSX";

export * from './types';
export * from './React';
export * from './ReactDOM';
export * from './PropTypes';
export type PropsOf<T extends { defaultProps }> = Partial<T['defaultProps']>;
