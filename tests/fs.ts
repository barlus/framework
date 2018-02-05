import {Directory} from "@barlus/bone/fs/file"

async function main(){
    const stat = await Directory.current.stats();
    const list = await Directory.current.list();
    console.info(list)
}

main().catch(console.error);