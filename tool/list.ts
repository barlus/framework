import {chalk} from '@barlus/node/chalk';
import {framework} from './projects';
import {process} from '@barlus/node/process';

let version = process.argv[2]||'x.x.x';

if(!version.match(/\d+\.\d+\.\d+/)){
    console.info(`Invalid version ${chalk.red(version)}`);
    process.exit();
}


let resolutions = framework.main.resolutions;
framework.projects.forEach(p=>{
    resolutions[p.name] = version;
    if(p.version!=framework.main.version){
        console.info(chalk.yellow(p.version),p.name,chalk.gray(p.packageFolder));
    }else{
        console.info(chalk.green(p.version),p.name,chalk.gray(p.packageFolder));
    }
});
if(framework.main.version==version){
    console.info(`${chalk.green(version)} ${chalk.blue(framework.main.name)} ${chalk.gray(framework.main.projectRoot)}`);
}else{
    console.info(`${chalk.yellow(version)} ${chalk.blue(framework.main.name)} ${chalk.gray(framework.main.projectRoot)}`);
    console.info({version,resolutions});
    framework.main.update({version,resolutions})
}
