import {extname, normalize} from '@barlus/node/path';
import {Buffer} from '@barlus/node/buffer';
import {Context} from '../server/context';
import {Project, Service} from '@barlus/compiler';
import {process} from '../../node/process';
interface ProjectsOptions {
    project?: string;
    root?: string;
    base?: string;
}
const service = Service.service;
const options: ProjectsOptions = {
    root: process.cwd(),
    base: '/'
};
let project: Project;
export function projects(opts: ProjectsOptions = {}) {
    Object.assign(options, opts);
    service.init(opts.root);
    if (opts.project) {
        project = service.projects.get(opts.project);
    }
    return async (ctx: Context, next) => {
        await next();
        if (ctx.method !== 'HEAD' && ctx.method !== 'GET') {
            return;
        }
        if (ctx.body != null || ctx.status !== 404) {
            return;
        }
        try {
            let path = normalizePath(ctx.path);
            if (path.endsWith('.doc')) {
                ctx.body = getDoc(ctx.path.substring(0, path.length - 4));
            }
            let content = tryGetOutput(path);
            if (!content) {
                content = tryGetResource(path);
            }
            if (!content) {
                ctx.throw(404)
            } else {
                ctx.type = extname(path);
                ctx.body = content;
            }
        } catch (err) {
            if (err.status !== 404) {
                throw err
            }
        }
    }
}
declare const ts;
function getDoc(file: string) {
    let program = service.compiler.getProgram();
    let checker = program.getTypeChecker();
    let output: any[] = [];
    let source = program.getSourceFile(file);
    ts.forEachChild(source, visit);
    /** visit nodes finding exported classes */
    function visit(node) {

        // Only consider exported nodes
        if (!isNodeExported(node)) {
            return;
        }
        if (ts.isInterfaceDeclaration(node) && node.name) {
            function typeParameters(node){
                if(node.typeParameters){
                    return `T ${node.typeParameters.length}`;
                }
            }
            function heritageClauses(node){
                if(node.heritageClauses){
                    return 'H';
                }
            }
            function members(node){
                if(node.members){
                    return `M ${node.typeParameters.length}`;
                }
            }
            // This is a namespace, visit its children
            console.info("interface",node.name.escapedText,typeParameters(node),heritageClauses(node),members(node));
        } else
        if (ts.isClassDeclaration(node) && node.name) {
            // This is a top level class, get its symbol
            let symbol = checker.getSymbolAtLocation(node.name);
            if (symbol) {
                output.push(serializeClass(symbol));
            }
            // No need to walk any further, class expressions/inner declarations
            // cannot be exported
        }
        else if (ts.isModuleDeclaration(node)) {
            // This is a namespace, visit its children
            ts.forEachChild(node, visit);
        }
    }

    /** Serialize a symbol into a json object */
    function serializeSymbol(symbol): any {
        return {
            name: symbol.getName(),
            documentation: ts.displayPartsToString(symbol.getDocumentationComment()),
            type: checker.typeToString(checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!))
        };
    }
    /** Serialize a class symbol information */
    function serializeInterface(symbol) {
        return serializeSymbol(symbol);
    }
    /** Serialize a class symbol information */
    function serializeClass(symbol) {
        let details = serializeSymbol(symbol);
        // Get the construct signatures
        let constructorType = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!);
        details.constructors = constructorType.getConstructSignatures().map(serializeSignature);
        return details;
    }
    /** Serialize a signature (call or construct) */
    function serializeSignature(signature) {
        return {
            parameters: signature.parameters.map(serializeSymbol),
            returnType: checker.typeToString(signature.getReturnType()),
            documentation: ts.displayPartsToString(signature.getDocumentationComment())
        };
    }
    /** True if this is visible outside this file, false otherwise */
    function isNodeExported(node): boolean {
        return (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) !== 0 || (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile);
    }
    return output;
}
function normalizePath(path: string) {
    if (path.endsWith('/')) {
        path = `${path}/index.html`;
    }
    path = normalize(path);
    if (extname(path) == '') {
        path = `${path}.js`;
    }
    return path;
}
function tryGetOutput(path: string): string | Buffer {
    let result = service.output.get(path);
    if (!result && project) {
        result = service.output.get(`/${project.name}${path}`)
    }
    return result;
}
function tryGetResource(path: string): string | Buffer {
    for (let f of service.files.values()) {
        if (path == f.uri) {
            return f.content;
        } else if (project && `/${project.name}${path}` == f.uri) {
            return f.content;
        }
    }
}
