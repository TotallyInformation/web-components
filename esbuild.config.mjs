// const esbuild = require('esbuild')
import * as esbuild from 'esbuild'

// Live components
const result1 = await esbuild.build({
    // logLevel: 'info',
    entryPoints: [`src/*.js`], // Input ESM file that defines the web component
    minify: true, // Minify the output
    bundle: true, // Bundle all dependencies into the output
    sourcemap: true, // Generate source map file
    format: 'esm', // ESM output format
    outExtension: { '.js': '.esm.min.js' },
    outdir: 'dist', // Output dir for modern ESM load
})
console.log('src/*.js ESM results: ', result1)

const result2 = await esbuild.build({
    // logLevel: 'info',
    entryPoints: [`src/*.js`], // Same input file
    minify: true, // Minify the output
    bundle: true, // Bundle all dependencies
    sourcemap: true, // Generate source map file
    format: 'iife', // IIFE output format
    // globalName: globalName, // Global variable name for the IIFE
    outExtension: { '.js': '.iife.min.js' },
    outdir: 'dist', // Output dir for traditional IIFE load
})
console.log('src/*.js IIFE results: ', result2)

// Alpha components
const result3 = await esbuild.build({
    // logLevel: 'debug',
    entryPoints: [`alpha/*.js`], // Input ESM file that defines the web component
    minify: true, // Minify the output
    bundle: true, // Bundle all dependencies into the output
    sourcemap: true, // Generate source map file
    format: 'esm', // ESM output format
    outExtension: { '.js': '.esm.min.js' },
    outdir: 'dist/alpha', // Output file for modern ESM load
})
console.log('alpha/*.js IIFE results: ', result3)

const result4 = await esbuild.build({
    // logLevel: 'info',
    entryPoints: [`alpha/*.js`], // Same input file
    minify: true, // Minify the output
    bundle: true, // Bundle all dependencies
    sourcemap: true, // Generate source map file
    format: 'iife', // IIFE output format
    // globalName: globalName, // Global variable name for the IIFE
    outExtension: { '.js': '.iife.min.js' },
    outdir: 'dist/alpha', // Output file for traditional IIFE load
})
console.log('alpha/*.js IIFE results: ', result4)
