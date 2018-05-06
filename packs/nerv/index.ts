import "./jsx";
export * from './core/index';

export type PropsOf<T extends { defaultProps }> = Partial<T['defaultProps']>;
