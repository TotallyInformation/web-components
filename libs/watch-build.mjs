#!/usr/bin/env node

import { watch } from 'fs'
import { spawn } from 'child_process'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import process from 'process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')
const srcFolder = join(projectRoot, 'src')

/**
 * Debounced function executor
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, delay) {
    /** @type {ReturnType<typeof setTimeout> | undefined} */
    let timeoutId
    return function debounced(/** @type {any[]} */ ...args) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => func.apply(null, args), delay)
    }
}

/**
 * Run npm build command
 */
function runBuild() {
    console.log('🔨 Changes detected, running build...')

    const buildProcess = spawn('npm', ['run', 'build'], {
        cwd: projectRoot,
        stdio: 'inherit',
        shell: true,
    })

    buildProcess.on('close', (code) => {
        if (code === 0) {
            console.log('✅ Build completed successfully')
        } else {
            console.log(`❌ Build failed with exit code ${code}`)
        }
        console.log('👀 Watching for changes...')
    })

    buildProcess.on('error', (error) => {
        console.error('❌ Build process error:', error.message)
        console.log('👀 Watching for changes...')
    })
}

// Debounce the build function with 500ms delay
const debouncedBuild = debounce(runBuild, 500)

/**
 * Check if file should trigger a build
 * @param {string} filename - Name of the changed file
 * @returns {boolean} True if file should trigger build
 */
function shouldTriggerBuild(filename) {
    if (!filename) return false

    const isJSFile = filename.endsWith('.js') || filename.endsWith('.mjs')
    const isNotTempFile = !filename.startsWith('.') && !filename.includes('~')

    return isJSFile && isNotTempFile
}

/**
 * Start watching the src folder for changes
 */
function startWatching() {
    console.log('👀 Starting file watcher...')
    console.log(`📁 Watching: ${srcFolder}`)
    console.log('🎯 Monitoring: .js and .mjs files')
    console.log('⏱️  Debounce delay: 500ms')
    console.log('📦 Build command: npm run build')
    console.log('')
    console.log('👀 Watching for changes...')

    const watcher = watch(srcFolder, { recursive: true, }, (eventType, filename) => {
        if (filename && shouldTriggerBuild(filename)) {
            console.log(`📝 ${eventType}: ${filename}`)
            debouncedBuild()
        }
    })

    // Handle graceful shutdown
    process.on('SIGINT', () => {
        console.log('\n🛑 Stopping file watcher...')
        watcher.close()
        process.exit(0)
    })

    process.on('SIGTERM', () => {
        console.log('\n🛑 Stopping file watcher...')
        watcher.close()
        process.exit(0)
    })
}

// Start the watcher
try {
    startWatching()
} catch (error) {
    console.error('❌ Failed to start file watcher:', error instanceof Error ? error.message : String(error))
    process.exit(1)
}
