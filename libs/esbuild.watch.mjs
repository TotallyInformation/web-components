// @ts-nocheck
import * as esbuild from 'esbuild'
import configs from './esbuild-configs.mjs'

async function watch() {
    // Live components
    const srcESM = await esbuild.context(configs.srcESM)
    await srcESM.watch()
    const srcIIFE = await esbuild.context(configs.srcIIFE)
    await srcIIFE.watch()

    // Alpha components
    const alphaESM = await esbuild.context(configs.alphaESM)
    await alphaESM.watch()
    const alphaIIFE = await esbuild.context(configs.alphaIIFE)
    await alphaIIFE.watch()

    console.log('Watching ...')
}


// IMPORTANT: this call MUST NOT have an `await`.
watch()
