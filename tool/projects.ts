import {glob} from '@barlus/node/glob';
import {resolve,dirname,relative} from '@barlus/node/path';
import {process} from '@barlus/node/process';
import {readFileSync, writeFileSync} from '@barlus/node/fs';
const envProps = Object.keys(process.env);
const npmProps = envProps.filter(k=>{
    let key = k.toLowerCase();
    if(key.startsWith('npm_')){
        process.env[key] = process.env[k];
        return true;
    }
}).sort();

export class Package {
    private root:string;
    private file:string;
    private json:any;
    constructor(file:string,root:string){
        this.root = resolve(root);
        this.file = resolve(file);
        this.json = JSON.parse(readFileSync(this.file,'utf8'));
    }
    get name(){
        return this.json.name;
    }
    get version(){
        return this.json.version;
    }
    get projectRoot(){
        return this.root;
    }
    get packageRoot(){
        return dirname(this.file);
    }
    get packageFile(){
        return this.file;
    }
    get packageFolder(){
        return relative(this.root,this.file);
    }
    get resolutions(){
        return this.json.resolutions||(this.json.resolutions={});
    }
    update(patch:object){
        Object.assign(this.json,patch);
        writeFileSync(this.packageFile,JSON.stringify(this.json,null,2));
    }
}

export function findProjects(){
    const projectRoot = process.cwd();
    const workspacePatterns = npmProps.filter(k=>k.startsWith('npm_package_workspaces'));
    const packagePatterns = workspacePatterns.map(k=>`${process.env[k]}/package.json`);
    const packageFiles = glob(packagePatterns,{
        realpath : true
    });
    const packageJsons = packageFiles.map(f=>{
        return new Package(f,projectRoot);
    });
    return packageJsons;
}

export const framework = {
    main: new Package(`${process.cwd()}/package.json`,process.cwd()),
    projects: findProjects()
};