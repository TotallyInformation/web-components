const esbuild = require('esbuild')

const componentName = 'visible-console'
const globalName = 'VisibleComponent'

// Live components
esbuild.build({
    entryPoints: [`src/*.js`], // Input ESM file that defines the web component
    minify: true, // Minify the output
    bundle: true, // Bundle all dependencies into the output
    sourcemap: true, // Generate source map file
    format: 'esm', // ESM output format
    outExtension: { '.js': '.esm.min.js' },
    outdir: 'dist', // Output dir for modern ESM load
}).catch(() => process.exit(1))
esbuild.build({
    entryPoints: [`src/*.js`], // Same input file
    minify: true, // Minify the output
    bundle: true, // Bundle all dependencies
    sourcemap: true, // Generate source map file
    format: 'iife', // IIFE output format
    // globalName: globalName, // Global variable name for the IIFE
    outExtension: { '.js': '.iife.min.js' },
    outdir: 'dist', // Output dir for traditional IIFE load
}).catch(() => process.exit(1))

// Alpha components
esbuild.build({
    entryPoints: [`alpha/*.js`], // Input ESM file that defines the web component
    minify: true, // Minify the output
    bundle: true, // Bundle all dependencies into the output
    sourcemap: true, // Generate source map file
    format: 'esm', // ESM output format
    outExtension: { '.js': '.esm.min.js' },
    outdir: 'dist/alpha', // Output file for modern ESM load
}).catch(() => process.exit(1))
esbuild.build({
    entryPoints: [`alpha/*.js`], // Same input file
    minify: true, // Minify the output
    bundle: true, // Bundle all dependencies
    sourcemap: true, // Generate source map file
    format: 'iife', // IIFE output format
    // globalName: globalName, // Global variable name for the IIFE
    outExtension: { '.js': '.iife.min.js' },
    outdir: 'dist/alpha', // Output file for traditional IIFE load
}).catch(() => process.exit(1))
