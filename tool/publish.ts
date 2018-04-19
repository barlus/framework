import {colors} from '@barlus/bone/utils/colors';
import {glob} from '@barlus/bone/glob';
import {Fs} from '@barlus/bone/node/fs';
import {Path} from '@barlus/bone/node/path';

import {Https} from '@barlus/bone/node/https';
import {process} from '@barlus/bone/node/process';
import {Buffer} from '@barlus/bone/node/buffer';
import {URL} from '@barlus/bone/node/url';
import {Cp} from '@barlus/bone/node/child_process';

//console.info(Glob.search('**/*.{js,ts}'));
const envProps = Object.keys(process.env);
const npmProps = envProps.filter(k=>{
    let key = k.toLowerCase();
    if(key.startsWith('npm_')){
        process.env[key] = process.env[k];
        return true;
    }
}).sort();

const registryUrl       = process.env.npm_registry_url || process.env.npm_config_registry;
const registryUsername  = process.env.npm_registry_username;
const registryPassword  = process.env.npm_registry_password;
const registryToken     = process.env.npm_registry_token;
const registryEmail     = process.env.npm_registry_email;
//NPM_REGISTRY_USERNAME
//npm_registry_username
//npm_registry_email
async function fetch(url:URL|string){
    let u:URL = (typeof url == 'string')?new URL(url):url;
    return new Promise<Buffer>((accept,reject)=>{
        const opt = {
            method:'GET',
            host:u.hostname,
            path:u.pathname,
            rejectUnauthorized: false,
            headers : {
                accept:'application/json'
            }
        };
        const req = Https.request(opt,res=>{
            const chunks:Buffer[] = [];
            res.on('error',reject);
            res.on('data',chunk=>chunks.push(chunk as Buffer));
            res.on('end',chunk=>{
                if(chunk){
                    chunks.push(chunk as Buffer)
                }
                accept(Buffer.concat(chunks));
            });
        });
        req.on('error',reject);
        req.end();
    })
}

async function fetchText(url:string) {
    return (await fetch(url)).toString('utf8');
}

async function fetchJson(url:string) {
    let text = await fetchText(url);
    try{
        return JSON.parse(text);
    }catch(ex){
        console.error(ex);
        console.info(text);
    }
}

async function fetchProject(name:string,version:string) {
    let url = `${registryUrl}/${name}/${version}`;
    const project = await fetchJson(url);
    if(project.name==name && project.version==version){
        return project;
    }
    return null;
}

//
function findProjects(){
    const projectRoot = process.cwd();
    const workspacePatterns = npmProps.filter(k=>k.startsWith('npm_package_workspaces'));
    const packagePatterns = workspacePatterns.map(k=>`${process.env[k]}/package.json`);
    const packageFiles = glob(packagePatterns,{
        realpath : true
    });
    const packageJsons = packageFiles.map(f=>{
        let packageFile = Path.resolve(f);
        let packageRoot = Path.dirname(packageFile);
        let packageJson = JSON.parse(Fs.readFileSync(packageFile,'utf8'));
        return Object.assign(packageJson,{
            projectRoot,
            packageRoot,
            packageFile
        })
    });
    return packageJsons;
}
function createRcFiles(project){
    let registryHost = new URL(registryUrl).host;
    Fs.writeFileSync(Path.resolve(project.packageRoot,'.yarnrc'),[
        `registry "${registryHost}"`,
        `strict-ssl false`,
        `email ${registryEmail}`,
        `username ${registryUsername}`,
    ].join('\n'));
    Fs.writeFileSync(Path.resolve(project.packageRoot,'.npmrc'),[
        `//${registryHost}/:_authToken="${registryToken}"`,
        `//${registryHost}/:_password=${registryPassword}`,
        `//${registryHost}/:username=${registryUsername}`,
        `//${registryHost}/:email=${registryEmail}`,
        `//${registryHost}/:always-auth=true`,
    ].join('\n'));
}
function removeRcFiles(project){
    Fs.unlinkSync(Path.resolve(project.packageRoot,'.yarnrc'));
    Fs.unlinkSync(Path.resolve(project.packageRoot,'.npmrc'));
}


async function publishProject(project){
    createRcFiles(project);
    const cmd = `yarn publish --new-version ${project.version}`;
    Cp.execSync(cmd, {
        stdio: [process.stdin, process.stdout, process.stderr],
        cwd: project.packageRoot,
        env: process.env
    });
    removeRcFiles(project);
}

async function compareProject(project){
    let subpath = Path.relative(project.projectRoot,project.packageRoot);
    const newProject = project;
    const oldProject = await (fetchProject(project.name,project.version));
    if(oldProject==null){
        console.log(colors.green("RELEASED"),colors.blue(project.version),project.name,colors.gray(subpath));
        await publishProject(newProject);
    }else{
        console.log(colors.yellow("IGNORED "),colors.blue(project.version),project.name,colors.gray(subpath));
    }
}
async function compareProjects(){
    // console.info({
    //     registryUrl,
    //     registryUsername,
    //     registryPassword,
    //     registryEmail,
    // });
    let projects = findProjects();
    for(const p of projects){
        await compareProject(p);
    }
}

compareProjects().catch(
    e=>{
        console.error(e);
        console.info("ENV",{
            registryUrl,
            registryUsername,
            registryPassword,
            registryToken,
            registryEmail,
        });
        process.exit(1)
    }
);