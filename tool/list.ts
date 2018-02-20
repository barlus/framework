import {chalk} from '@barlus/node/chalk';
import {framework} from './projects';

framework.projects.forEach(p=>{
    if(p.version!=framework.main.version){
        console.info(chalk.yellow(p.version),p.name,chalk.gray(p.packageFolder));
    }else{
        console.info(chalk.green(p.version),p.name,chalk.gray(p.packageFolder));
    }
});
