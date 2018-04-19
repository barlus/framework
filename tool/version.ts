import {colors} from '@barlus/bone/utils/colors';
import {framework} from './projects';
import {process} from '@barlus/bone/node/process';

let version = process.argv[2]||'x.x.x';

if(!version.match(/\d+\.\d+\.\d+/)){
    console.info(`Invalid version ${colors.red(version)}`);
    process.exit();
}

let resolutions = framework.main.resolutions;
framework.projects.forEach(p=>{
    resolutions[p.name] = version;
    if(p.version!=version){
        console.info(colors.yellow(p.version),p.name,colors.gray(p.packageFolder));
        p.update({version})
    }else{
        console.info(colors.green(p.version),p.name,colors.gray(p.packageFolder));
    }
});
if(framework.main.version==version){
    console.info(`${colors.green(version)} ${colors.blue(framework.main.name)} ${colors.gray(framework.main.projectRoot)}`);
}else{
    console.info(`${colors.yellow(version)} ${colors.blue(framework.main.name)} ${colors.gray(framework.main.projectRoot)}`);
    framework.main.update({version,resolutions})
}
