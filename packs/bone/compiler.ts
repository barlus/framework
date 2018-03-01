import {Fs,Stats} from './node/fs';
import {Path} from './node/path';
import {Buffer} from './node/buffer';
import {Crypto} from './node/crypto';

interface ResolvedModule {
    /** Path of the file the module was resolved to. */
    resolvedFileName: string;
    /** True if `resolvedFileName` comes from `node_modules`. */
    isExternalLibraryImport?: boolean;
}
export interface ServiceOptions {
    cache?: string;
    root?: string;
    jsx?:string;
    ignore?: string[];
}
export class Project {
    dirname: string;
    manifest: any;
    service: Service;
    file: File;
    constructor(service: Service, file: File) {
        this.file = file;
        this.dirname = Path.dirname(file.path);
        this.service = service;
        this.manifest = JSON.parse(Fs.readFileSync(Path.resolve(this.dirname, 'package.json'), 'utf8'));
    }
    get name() {
        return this.manifest.name;
    }
    get main() {
        return Path.resolve('/' + this.name, this.manifest.main || './index');
    }
    get files() {
        return Array.from(this.service.files.values()).filter(f => f.project == this);
    }
    init() {
        console.info(this.name);
    }
    remove() {
        this.files.forEach(f => {
            f.cache.package = null;
            f.cache.project = null;
        });
        this.service.projects.delete(this.name)
    }
    toJSON() {
        return {
            name: this.name
        }
    }
}
export class File {
    readonly cache: any;
    readonly path: string;
    readonly service: Service;
    constructor(service: Service, path: string) {
        const cache = Object.create(null);
        Object.defineProperties(this, {
            path: {
                get() {
                    return path
                }
            },
            service: {
                get() {
                    return service
                }
            },
            cache: {
                get() {
                    return cache
                }
            },
        });
    }
    get stat(): Stats {
        return this.cache.stat;
    }
    get content(): Buffer {
        return this.cache.content;
    }
    get version() {
        return this.cache.version;
    }
    get snapshot() {
        return this.cache.snapshot;
    }
    get package(): File {
        if (!this.cache.package) {
            let file, path = this.path.split('/');
            while (path.length) {
                path.pop();
                file = [...path, 'package.json'].join('/');
                if (this.service.files.has(file)) {
                    break;
                }
            }
            if (file) {
                this.cache.package = this.service.files.get(file);
            }
        }
        return this.cache.package;
    }
    get project(): Project {
        if (!this.cache.project) {
            this.cache.project = this.service.projects.get(this.package.body.name);
            //this.cache.isSourceFile = this.cache.isSourceFile && !this.service.options.ignore.includes(this.cache.project.name);
        }
        return this.cache.project;
    }
    get modulename() {
        return Path.relative(this.project.dirname, this.path);
    }
    get uri() {
        return Object.defineProperty(this, 'uri', {
            configurable: true,
            value: `/${this.project.name}/${this.modulename}`
        }).uri;
    }
    get isJsonFile() {
        return this.cache.isJsonFile;
    }
    get isSourceFile() {
        return !this.isIgnored && this.cache.isSourceFile;
    }
    get isIgnored() {
        return this.cache.isIgnored;
    }
    get isProjectFile() {
        return this.cache.isProjectFile;
    }
    get text() {
        return this.cache.text;
    }
    get body() {
        return this.cache.body;
    }
    get relative() {
        return Path.relative(this.service.root, this.path);
    }
    ignore(){
        this.cache.isIgnored=true;
    }
    sync() {
        let oldStat = this.stat;
        let newStat = Fs.statSync(this.path);
        if (oldStat.mtimeMs < newStat.mtimeMs) {
            return true;
        } else {
            return false;
        }
    }
    reload() {
        Object.keys(this.cache).forEach(key => {
            this.cache[key] = null;
        });
        this.cache.isJsonFile = Path.extname(this.path) == '.json';
        this.cache.isSourceFile = ts.isSupportedSourceFileName(this.path);
        this.cache.isProjectFile = Path.basename(this.path) == 'package.json';
        this.cache.stat = Fs.statSync(this.path);
        this.cache.content = Fs.readFileSync(this.path);
        this.cache.version = hash(this.content);
        if (this.isSourceFile || this.isJsonFile) {
            this.cache.text = this.content.toString('utf8');
            if (this.isSourceFile) {
                this.cache.snapshot = ts.ScriptSnapshot.fromString(this.text);
            }
            if (this.isJsonFile) {
                this.cache.body = JSON.parse(this.text);
                if (this.isProjectFile) {
                    let project = this.service.projects.has(this.body.name);
                    if (!project) {
                        this.cache.project = new Project(this.service, this);
                        this.service.projects.set(this.cache.project.name, this.cache.project);
                    }
                }
            }
        }
        return this;
    }
    remove() {
        this.service.files.delete(this.path);
        if (this.isProjectFile) {
            this.project.remove();
        }
    }
    toString() {
        return `File<${this.uri}>`;
    }
    inspect() {
        return this.toString();
    }
}
export class Service {
    static get service(): Service {
        return Object.defineProperty(this, 'service', {
            value: new Service()
        }).service;
    }
    static init(options: ServiceOptions) {
        return this.service.init(options);
    }
    public options: ServiceOptions;
    public projects = new Map<string, Project>();
    public output = new Map<string, string>();
    public files = new Map<string, File>();
    public sources = new Map<string, File>();
    public get root() {
        return this.options.root;
    }
    public get compiler() {
        const service = this;
        const options = {
            module: ts.ModuleKind.ESNext,
            target: ts.ScriptTarget.ESNext,
            noEmitHelpers: true,
            noEmitOnError: true,
            jsx: ts.JsxEmit.React,
            jsxFactory:this.options.jsx,
            removeComments: true,
            experimentalDecorators: true,
            emitDecoratorMetadata: true,
            noLib: true,
            sourceMap: true,
        };
        const host = {
            resolveModuleNames(moduleNames: string[], containingFile: string, reusedNames?: string[]): ResolvedModule[] {
                const resolvedModules = [];
                for (let moduleName of moduleNames) {
                    if (service.projects.has(moduleName)) {
                        moduleName = service.projects.get(moduleName).main;
                    }
                    if (!(moduleName.startsWith('../') || moduleName.startsWith('./'))) {
                        moduleName = Path.normalize(ts.removeFileExtension(`/${moduleName}`));
                    }
                    let result = ts.resolveModuleName(moduleName, containingFile, options, host);
                    if (result.resolvedModule) {
                        resolvedModules.push(result.resolvedModule);
                    } else {
                        resolvedModules.push(void 0);
                    }
                }
                return resolvedModules;
            },
            getCustomTransformers() {
                return {
                    after: [transformModuleNames]
                }
            },
            getScriptFileNames() {
                return Array.from(service.sources.keys());
            },
            getScriptVersion(uri) {
                return service.sources.get(uri).version;
            },
            getScriptSnapshot(uri) {
                let sourceFile = service.sources.get(uri);
                if (sourceFile) {
                    return sourceFile.snapshot;
                } else {
                    throw new Error(`file not found for '${uri}'`)
                }
            },
            getCurrentDirectory() {
                return '/'
            },
            getCompilationSettings() {
                return options;
            },
            getDefaultLibFileName(options) {
                return ts.getDefaultLibFilePath(options);
            },
            fileExists(uri) {
                return service.sources.has(uri);
            },
            readFile(uri) {
                throw new Error('readFile should never called')
            },
            readDirectory(uri) {
                throw new Error('readDirectory should never called')
            }
        };
        return Object.defineProperty(this, 'compiler', {
            value: ts.createLanguageService(host, ts.createDocumentRegistry())
        }).compiler;
    }
    public init(options: ServiceOptions) {
        this.options = Object.assign({
            root: '.',
            cache: './.cache',
            ignore: ['typescript']
        }, options);
        this.options.root = Path.resolve(this.options.root);
        this.options.cache = Path.resolve(this.options.cache);
        this.sync();
        watch(this).catch(
            ex => console.error(ex)
        );
        return this;
    }
    public logErrors(fileName: string) {
        let allDiagnostics = this.compiler.getCompilerOptionsDiagnostics()
            .concat(this.compiler.getSyntacticDiagnostics(fileName))
            .concat(this.compiler.getSemanticDiagnostics(fileName));
        allDiagnostics.forEach(diagnostic => {
            let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            if (diagnostic.file) {
                let {line, character} = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
                console.log(`  Error ${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
            }
            else {
                console.log(`  Error: ${message}`);
            }
        });
    }
    public compile() {
        this.sources = new Map<string, File>();
        this.files.forEach(f => {
            if (f.isSourceFile) {
                this.sources.set(f.uri, f)
            }
        });
        this.sources.forEach(s => this.compileFile(s));
    }
    public compileFile(source: File) {
        let output = this.compiler.getEmitOutput(source.uri);
        if (!output.emitSkipped) {
            output.outputFiles.forEach(o => {
                o.name = o.name.replace(/\.js$/,'.mjs');
                this.output.set(o.name, o.text);
                this.writeFile(o.name, o.text)
                //console.info('//', o.name, o.text.length);
            });
        } else {
            console.log(`Emitting ${source.uri} failed`);
            this.logErrors(source.uri);
        }
    }
    public writeFile(path,content){
        let file = dir(Path.resolve(this.options.cache,`.${path}`));
        Fs.writeFileSync(file,content);
    }
    public compileFiles(paths: Set<string>) {
        paths.forEach(p => {
            let f = this.files.get(p);
            if (!this.sources.has(f.uri) && f.isSourceFile) {
                this.sources.set(f.uri, f);
            }
            if (f && f.isSourceFile) {
                this.compileFile(f);
            }
        });
        this.sources.forEach(s => {
            let errors = this.compiler.getSemanticDiagnostics(s.uri);
            if (errors.length) {
                errors.forEach(e => {
                    console.info(e.file ? e.file.path : '', e.messageText);
                })
            }
        })
    }
    public sync() {
        const debug = true;
        const createFiles = (files: Set<string>) => {
            files.forEach(f => {
                // if (debug) {
                //     console.info("+", f);
                // }
                this.files.set(f, new File(this, f).reload());
            })
        };
        const updateFiles = (files: Set<string>) => {
            files.forEach(f => {
                // if (debug) {
                //     console.info("~", f);
                // }
                this.files.get(f).reload();
            })
        };
        const removeFiles = (files: Set<string>) => {
            files.forEach(f => {
                // if (debug) {
                //     console.info("-", f);
                // }
                this.files.get(f).remove();
            })
        };
        const refresh = () => {
            this.compile();
        };
        //console.time("SCAN")
        let removed = new Set<string>();
        let changed = new Set<string>(Array.from(this.files.keys()).sort());
        let created = new Set<string>(readFiles(this.root).sort());
        let startup = changed.size == 0;
        changed.forEach(o => {
            if (!created.has(o)) {
                removed.add(o);
                changed.delete(o);
            } else {
                created.delete(o);
            }
        });
        changed.forEach(f => {
            if (!this.files.get(f).sync()) {
                changed.delete(f);
            }
        });
        // print
        if (created.size > 0 || changed.size > 0 || removed.size > 0) {
            if (removed.size) {
                removeFiles(removed);
            }
            if (created.size) {
                createFiles(created);
            }
            if (changed.size) {
                updateFiles(changed);
            }
            this.files.forEach(f => {
                f.reload();
                if(removed.has(f.path) || changed.has(f.path)||created.has(f.path)){
                    if (this.options.ignore.includes(f.project.name)) {
                        f.ignore();
                        created.delete(f.path);
                        removed.delete(f.path);
                        changed.delete(f.path);
                        console.info("!", f.project.name, f.modulename);
                    }else{
                        if (debug && removed.has(f.path)) {
                            console.info("-", f.project.name, f.modulename);
                        }else
                        if (debug && changed.has(f.path)) {
                            console.info("~", f.project.name, f.modulename);
                        }else
                        if (debug && created.has(f.path)) {
                            console.info("+", f.project.name, f.modulename);
                        }
                    }
                }
            });
            if (startup) {
                this.compile();
            } else {
                this.compileFiles(created);
                this.compileFiles(changed);
            }
            //refresh();
            //console.log("SCAN:", created.size, changed.size, removed.size);
        }
        //console.timeEnd("SCAN")
    }
}
declare const ts;

function dir(file){
    const pathToCreate = Path.dirname(file);
    pathToCreate
        .split(Path.sep)
        .reduce((currentPath, folder) => {
            currentPath += folder + Path.sep;
            if (!Fs.existsSync(currentPath)){
                Fs.mkdirSync(currentPath);
            }
            return currentPath;
        }, '');
    return file;
}

export const transformModuleNames = (context) => {
    return (file) => {
        function transformSpecifier(expression) {
            const literal = expression;
            if (literal.text) {
                const localName = literal.text;
                try {
                    let resolved = file.resolvedModules.get(localName);

                    if (resolved) {
                        const parentPath = file.fileName;
                        const parentDir = Path.dirname(parentPath);
                        const childPath = resolved.resolvedFileName;
                        const relativePath = Path.relative(parentDir,childPath);
                        //console.info("RESOLVED",parentPath,childPath,relativePath,resolve(parentDir,relativePath));
                        let newSpec = ts.changeExtension(relativePath, '.mjs');
                        if(!newSpec.startsWith('.')){
                            newSpec=`./${newSpec}`;
                        }
                        const newListeral = ts.createLiteral(newSpec);
                        return ts.setOriginalNode(ts.setTextRange(newListeral, literal), literal);
                    } else {
                        console.info("UNRESOLVED", file.fileName, localName);
                        return literal;
                    }
                } catch (ex) {
                    console.error(ex.message, file.fileName, localName);
                    return literal;
                }
            } else {
                console.info("UNRESOLVED LITERAL", literal);
                return literal;
            }
        }
        function visitImportDeclaration(node) {
            if (node.moduleSpecifier) {
                return ts.setOriginalNode(
                    ts.setTextRange(
                        ts.createImportDeclaration(
                            void 0,
                            node.modifiers,
                            node.importClause,
                            transformSpecifier(node.moduleSpecifier)
                        ), node),
                    node
                )
            }
            return node;
        }
        function visitExportDeclaration(node) {
            if (node.moduleSpecifier) {
                return ts.setOriginalNode(
                    ts.setTextRange(
                        ts.createExportDeclaration(
                            void 0,
                            node.modifiers,
                            node.exportClause,
                            transformSpecifier(node.moduleSpecifier)
                        ), node),
                    node
                )
            }
            return node;
        }
        function visitor(node) {
            switch (node.kind) {
                case ts.SyntaxKind.ImportDeclaration:
                    return visitImportDeclaration(node);
                case ts.SyntaxKind.ExportDeclaration:
                    return visitExportDeclaration(node);
            }
            return node;
        }
        try {
            return ts.visitEachChild(file, visitor, context);
        } catch (ex) {
            console.info("ERROR", file.fileName, ex.message);
            return file;
        }
    };
};
function readFiles(dir, exts = ['.d.ts', '.ts', '.tsx', '.js', '.json', '.png', '.svg', '.css', '.html']) {
    const dirs = [];
    function scanDir(dir, files = []) {
        if (!Fs.existsSync(dir) || Path.basename(dir).startsWith('.')) {
            return files;
        }
        dir = Fs.realpathSync(Path.resolve(dir));
        let stat = Fs.statSync(dir);
        if (stat.isDirectory() && !dirs.includes(dir)) {
            dirs.push(dir);
            Fs.readdirSync(dir).forEach(f => {
                let file = Fs.realpathSync(Path.resolve(dir, f));
                let stat = Fs.statSync(file);
                if (stat.isDirectory()) {
                    scanDir(file, files);
                }
                if (stat.isFile()) {
                    if (!(Path.basename(file).startsWith('.')) && ts.fileExtensionIsOneOf(file, exts)) {
                        files.push(file);
                    }
                }
            })
        }
        return files;
    }
    return scanDir(dir);
}
async function watch(service: Service) {
    try {
        // noinspection InfiniteLoopJS
        while (true) {
            service.sync();
            await delay(2000);
        }
    } catch (ex) {
        console.error(ex);
    }
}
function hash(data: Buffer) {
    return Crypto.createHash('md5').update(data).digest('hex');
}
async function delay(timeout: number) {
    return new Promise(a => setTimeout(a, timeout));
}