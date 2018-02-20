import {promises} from "@barlus/bone/fs/fs"
import {process} from '@barlus/node/process';
async function main (){
    console.info(await promises.stat(process.cwd()));
}
main().catch(console.error);

