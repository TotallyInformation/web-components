// @ts-nocheck
// const esbuild = require('esbuild')
import * as esbuild from 'esbuild'
import configs from './esbuild-configs.mjs'

// Live components
const result1 = await esbuild.build(configs.srcESM)
console.log('src/*.js ESM results: ', result1)

const result2 = await esbuild.build(configs.srcIIFE)
console.log('src/*.js IIFE results: ', result2)

// Alpha components
const result3 = await esbuild.build(configs.alphaESM)
console.log('alpha/*.js ESM results: ', result3)

const result4 = await esbuild.build(configs.alphaIIFE)
console.log('alpha/*.js IIFE results: ', result4)
