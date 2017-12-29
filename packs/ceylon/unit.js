const Module = require('module');
runMain = Module.runMain;
Module.runMain = function(...args){
    console.info(process.argv);
    // Load the main module--the command line argument.
    Module._load(process.argv[1], null, true);
    // Handle any nextTicks added in the first tick of the program
    process._tickCallback();
}