import {glob} from '@barlus/bone/glob';
import {Path} from '@barlus/bone/node/path';
import {process} from '@barlus/bone/node/process';
import {Fs} from '@barlus/bone/node/fs';
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
        this.root = Path.resolve(root);
        this.file = Path.resolve(file);
        this.json = JSON.parse(Fs.readFileSync(this.file,'utf8'));
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
        return Path.dirname(this.file);
    }
    get packageFile(){
        return this.file;
    }
    get packageFolder(){
        return Path.relative(this.root,this.file);
    }
    get resolutions(){
        return this.json.resolutions||(this.json.resolutions={});
    }
    update(patch:object){
        Object.assign(this.json,patch);
        Fs.writeFileSync(this.packageFile,JSON.stringify(this.json,null,2));
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