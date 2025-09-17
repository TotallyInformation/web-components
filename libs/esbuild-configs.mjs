
export default {
    // Live & Beta components
    srcESM: {
        // logLevel: 'info',
        entryPoints: [`src/*.{mjs,js}`], // Input ESM file that defines the web component
        minify: true, // Minify the output
        bundle: true, // Bundle all dependencies into the output
        sourcemap: true, // Generate source map file
        format: 'esm', // ESM output format
        outExtension: {
            '.js': '.esm.min.js',
            '.mjs': '.esm.min.js',
        },
        resolveExtensions: ['.mjs', '.cjs', '.js', '.ts', '.json'],
        outdir: 'dist', // Output dir for modern ESM load
    },
    srcIIFE: {
        // logLevel: 'info',
        entryPoints: [`src/*.{mjs,js}`], // Same input file
        minify: true, // Minify the output
        bundle: true, // Bundle all dependencies
        sourcemap: true, // Generate source map file
        format: 'iife', // IIFE output format
        // globalName: globalName, // Global variable name for the IIFE
        outExtension: {
            '.js': '.iife.min.js',
            '.mjs': '.iife.min.js',
        },
        resolveExtensions: ['.mjs', '.cjs', '.js', '.ts', '.json'],
        outdir: 'dist', // Output dir for traditional IIFE load
    },

    // Alpha components
    alphaESM: {
        // logLevel: 'debug',
        entryPoints: [`src/alpha/*.{mjs,js}`], // Input ESM file that defines the web component
        minify: true, // Minify the output
        bundle: true, // Bundle all dependencies into the output
        sourcemap: true, // Generate source map file
        format: 'esm', // ESM output format
        outExtension: {
            '.js': '.esm.min.js',
            '.mjs': '.esm.min.js',
        },
        resolveExtensions: ['.mjs', '.cjs', '.js', '.ts', '.json'],
        outdir: 'dist/alpha', // Output file for modern ESM load
    },
    alphaIIFE: {
        // logLevel: 'info',
        entryPoints: [`src/alpha/*.{mjs,js}`], // Same input file
        minify: true, // Minify the output
        bundle: true, // Bundle all dependencies
        sourcemap: true, // Generate source map file
        format: 'iife', // IIFE output format
        // globalName: globalName, // Global variable name for the IIFE
        outExtension: {
            '.js': '.iife.min.js',
            '.mjs': '.iife.min.js',
        },
        resolveExtensions: ['.mjs', '.cjs', '.js', '.ts', '.json'],
        outdir: 'dist/alpha', // Output file for traditional IIFE load
    },

    // Pre-alpha experimental components
    preAlphaIIFE: {
        // logLevel: 'info',
        entryPoints: [`src/experiments/*.{mjs,js}`],
        minify: true, // Minify the output
        bundle: true, // Bundle all dependencies
        sourcemap: true, // Generate source map file
        format: 'iife', // IIFE output format
        // globalName: globalName, // Global variable name for the IIFE
        outExtension: {
            '.js': '.iife.min.js',
            '.mjs': '.iife.min.js',
        },
        resolveExtensions: ['.mjs', '.cjs', '.js', '.ts', '.json'],
        outdir: 'dist/experiments', // Output file for traditional IIFE load
    },
    preAlphaESM: {
        // logLevel: 'debug',
        entryPoints: [`src/experiments/*.{mjs,js}`], // Input ESM file that defines the web component
        minify: true, // Minify the output
        bundle: true, // Bundle all dependencies into the output
        sourcemap: true, // Generate source map file
        format: 'esm', // ESM output format
        outExtension: {
            '.js': '.esm.min.js',
            '.mjs': '.esm.min.js',
        },
        resolveExtensions: ['.mjs', '.cjs', '.js', '.ts', '.json'],
        outdir: 'dist/experiments', // Output file for modern ESM load
    },
}
