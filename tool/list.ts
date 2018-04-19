import {colors} from '@barlus/bone/utils/colors';
import {framework} from './projects';

framework.projects.forEach(p=>{
    if(p.version!=framework.main.version){
        console.info(colors.yellow(p.version),p.name,colors.gray(p.packageFolder));
    }else{
        console.info(colors.green(p.version),p.name,colors.gray(p.packageFolder));
    }
});
