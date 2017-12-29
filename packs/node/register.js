const fs = require("fs");
const Path = require("path");
const ts = require("typescript");
const Crypto = require("crypto");
const Module = require('module');

require.extensions[".ts"] = req;
require.extensions[".js"] = req;

ts.path = require.resolve('typescript');

runMain = Module.runMain;
function hash(dat) {
    return Crypto.createHash('md5').update(dat).digest('hex');
}

Module.runMain = function (...args) {
    console.time("LOAD");
    // Load the main module--the command line argument.
    Module._load(process.argv[1], null, true);
    // Handle any nextTicks added in the first tick of the program
    console.timeEnd("LOAD");
    process._tickCallback();
};
const cacheDir = process.env.TS_NODE_CACHE?Path.resolve('.cache'):null;
if (cacheDir && !fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir)
}
function req(module, filename) {
    const source = fs.readFileSync(filename);
    if(cacheDir){
        const stamp = Path.resolve(cacheDir,`${hash(filename)}.${hash(source)}.js`);
        if(fs.existsSync(stamp)){
            return module._compile(fs.readFileSync(stamp,'utf8'), filename);
        }else{
            const output = compile(source.toString('utf8'), filename);
            module._compile(output, filename);
            fs.writeFileSync(stamp,output);
        }
    }else{
        module._compile(compile(source.toString('utf8'), filename), filename);
    }
}
function compile(source, filename) {
    const result = ts.transpileModule(source, {
        fileName: filename,
        compilerOptions: {
            noEmitHelpers: true,
            module: ts.ModuleKind.CommonJS,
            target: ts.ScriptTarget.ESNext,
            sourceMap: true,
            allowJs: true
        }
    });
    let sm = JSON.parse(result.sourceMapText);
    //sm.file = filename;
    sm.sources[0] = filename;
    delete sm.sourceRoot;
    result.outputText = result.outputText.replace(/^\/\/#\s+sourceMappingURL=.*$/m, `//# sourceMappingURL=data:application/json;base64,${new Buffer(JSON.stringify(sm), 'utf8').toString('base64')}`)
    //console.info(result.outputText);
    return result.outputText;
}

Object.assign(global, {ts});