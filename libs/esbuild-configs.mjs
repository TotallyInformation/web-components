
export default {
    // Live & Beta components
    srcESM: {
        // logLevel: 'info',
        entryPoints: [`src/*.js`], // Input ESM file that defines the web component
        minify: true, // Minify the output
        bundle: true, // Bundle all dependencies into the output
        sourcemap: true, // Generate source map file
        format: 'esm', // ESM output format
        outExtension: { '.js': '.esm.min.js', },
        outdir: 'dist', // Output dir for modern ESM load
    },
    srcIIFE: {
        // logLevel: 'info',
        entryPoints: [`src/*.js`], // Same input file
        minify: true, // Minify the output
        bundle: true, // Bundle all dependencies
        sourcemap: true, // Generate source map file
        format: 'iife', // IIFE output format
        // globalName: globalName, // Global variable name for the IIFE
        outExtension: { '.js': '.iife.min.js', },
        outdir: 'dist', // Output dir for traditional IIFE load
    },

    // Alpha components
    alphaESM: {
        // logLevel: 'debug',
        entryPoints: [`alpha/*.js`], // Input ESM file that defines the web component
        minify: true, // Minify the output
        bundle: true, // Bundle all dependencies into the output
        sourcemap: true, // Generate source map file
        format: 'esm', // ESM output format
        outExtension: { '.js': '.esm.min.js', },
        outdir: 'dist/alpha', // Output file for modern ESM load
    },
    alphaIIFE: {
        // logLevel: 'info',
        entryPoints: [`alpha/*.js`], // Same input file
        minify: true, // Minify the output
        bundle: true, // Bundle all dependencies
        sourcemap: true, // Generate source map file
        format: 'iife', // IIFE output format
        // globalName: globalName, // Global variable name for the IIFE
        outExtension: { '.js': '.iife.min.js', },
        outdir: 'dist/alpha', // Output file for traditional IIFE load
    },
}
