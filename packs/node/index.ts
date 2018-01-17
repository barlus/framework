import {} from "@barlus/std";
declare global {
    var __filename: string;
    var __dirname: string;
    export function gc():void;
    export interface NodeRequireFunction {
        (id: string): any;
    }
    export interface NodeExtensions {
        '.js': (m: NodeModule, filename: string) => any;
        '.json': (m: NodeModule, filename: string) => any;
        '.node': (m: NodeModule, filename: string) => any;
        [ext: string]: (m: NodeModule, filename: string) => any;
    }
    export interface NodeRequire extends NodeRequireFunction {
        resolve(id: string): string;
        cache: any;
        extensions: NodeExtensions;
        main: NodeModule | undefined;
    }
    export interface NodeModule {
        exports: any;
        require: NodeRequireFunction;
        id: string;
        filename: string;
        loaded: boolean;
        parent: NodeModule | null;
        children: NodeModule[];
    }

    export const require:NodeRequire;
    export const module:NodeModule;
    export const exports:any;
}