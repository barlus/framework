// rollup.config.js
import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';

export default {
    input: './samples/inferno/index.tsx',
    output: {
        file: './samples/inferno/bundle.js',
        format: 'iife'
    },

    plugins: [
        resolve(),
        typescript({
            tsconfig:false,
            jsx:'react',
            noEmitHelpers:true,
            experimentalDecorators:true,
            typescript:require('typescript')
        })
    ]
}