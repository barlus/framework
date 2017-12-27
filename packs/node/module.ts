export declare class Module implements NodeModule {
    static runMain(): void;
    static wrap(code: string): string;
    static Module: typeof Module;
    exports: any;
    require: NodeRequireFunction;
    id: string;
    filename: string;
    loaded: boolean;
    parent: Module | null;
    children: Module[];
    paths: string[];
    constructor(id: string, parent?: Module);
}