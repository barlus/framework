import "@barlus/node";
import {readdirSync, realpathSync, statSync, unlinkSync, writeFileSync} from "@barlus/node/fs";
import {basename, dirname, resolve} from "@barlus/node/path";
import {process} from '@barlus/node/process';
import {execSync} from '@barlus/node/child_process';
function readFiles(dir, filter: (f: string) => boolean) {
    let visited = new Set<string>();
    function readDir(dir, files = []) {
        dir = realpathSync(resolve(dir));
        if (visited.has(dir)) {
            return files;
        }
        readdirSync(dir).forEach(f => {
            let file = realpathSync(resolve(dir, f));
            let stat = statSync(file);
            if (stat.isDirectory()) {
                readDir(file, files);
            }
            if (stat.isFile() && filter(file)) {
                files.push(file)
            }
        });
        return files;
    }
    return readDir(dir);
}
let projects = readFiles(process.cwd(), f =>
    basename(f) == 'package.json'
).map(
    p => Object.assign(require(p), {
        filename: p
    })
);
projects.forEach(p => {
    if (!p.private) {
        console.info(p.name, p.version);
        const dir = dirname(p.filename);
        const rcf = resolve(dir, '.npmrc');
        writeFileSync(rcf, [
            `strict-ssl=false`,
            `registry=https://packs.sites.li`,
            `//packs.sites.li/:_authToken="bWMDpFkEnEiFJNfJqqF4R6BIpAsyy1d0aCq31wjlsy4="`,
            '',
        ].join('\n'));
        const cmd = `npm version patch && npm publish`;
        console.info(cmd, ":", dir);
        try {
            execSync(cmd, {
                stdio: [process.stdin, process.stdout, process.stderr],
                cwd: dir,
                env: process.env
            })
        } catch (ex) {
            console.error(ex);
            process.exit();
        }
        unlinkSync(rcf)
    }
    return true;
});