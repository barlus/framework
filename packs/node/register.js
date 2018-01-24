const fs = require("fs");
const Path = require("path");
const ts = require("typescript");
const Crypto = require("crypto");
const Module = require('module');

ts.path = require.resolve('typescript');

let SourceMap;
try {
    SourceMap = require('source-map').SourceMapConsumer;
    ts.maps = {};
}catch(ex){
    console.info(ex)
}


require.extensions[".ts"] = req;
require.extensions[".js"] = req;

//ts.sys.tryEnableSourceMapsForHost();
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
        const script = compile(source.toString('utf8'), filename);
        module._compile(script, filename);
    }
}
function compile(source, filename) {
    const result = ts.transpileModule(source, {
        fileName: filename,
        compilerOptions: {
            noEmitHelpers: true,
            module: ts.ModuleKind.CommonJS,
            target: ts.ScriptTarget.ESNext,
            experimentalDecorators: true,
            emitDecoratorMetadata: true,
            sourceMap: true,
            allowJs: true
        }
    });
    let sm = JSON.parse(result.sourceMapText);
    //sm.file = filename;
    sm.sources[0] = filename;
    delete sm.sourceRoot;
    result.sourceMapText = JSON.stringify(sm);
    if(ts.maps){
        ts.maps[filename] = new SourceMap(result.sourceMapText)
    }
    result.outputText = result.outputText.replace(/^\/\/#\s+sourceMappingURL=.*$/m, `//# sourceMappingURL=data:application/json;base64,${new Buffer(result.sourceMapText, 'utf8').toString('base64')}`)
    //console.info(result.outputText);
    return result.outputText;
}

Object.assign(global, {ts});