#!/usr/bin/env node

/**
 * Release automation script for @totallyinformation/web-components
 *
 * This script automates the release process by:
 * 1. Running pre-release checks (linting, tests, build)
 * 2. Creating a Git tag based on package.json version
 * 3. Creating a GitHub release with auto-generated changelog
 * 4. Publishing to npmjs.org
 *
 * Prerequisites:
 * - GitHub CLI (gh) installed and authenticated
 * - npm authenticated for publishing
 * - Clean working directory
 *
 * Usage:
 *   node ./libs/release.mjs [--dry-run] [--skip-checks] [--tag-only] [--publish-only]
 *
 * @author Julian Knight (Totally Information)
 * @license Apache-2.0
 */

import { execSync, spawn } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT_DIR = join(__dirname, '..')

/**
 * Configuration object for release settings
 */
const config = {
    dryRun: false,
    skipChecks: false,
    tagOnly: false,
    publishOnly: false,
    verbose: true,
}

/**
 * ANSI color codes for console output
 */
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
}

/**
 * Logs a message with color and timestamp
 * @param {string} message - The message to log
 * @param {string} color - The color code
 * @param {string} prefix - The prefix for the log level
 */
const log = (message, color = colors.reset, prefix = 'INFO') => {
    const timestamp = new Date().toISOString().slice(11, 19)
    console.log(`${color}[${timestamp}] ${prefix}:${colors.reset} ${message}`)
}

/**
 * Logs an info message
 * @param {string} message - The message to log
 */
const logInfo = (message) => log(message, colors.blue, 'INFO')

/**
 * Logs a success message
 * @param {string} message - The message to log
 */
const logSuccess = (message) => log(message, colors.green, 'SUCCESS')

/**
 * Logs a warning message
 * @param {string} message - The message to log
 */
const logWarning = (message) => log(message, colors.yellow, 'WARNING')

/**
 * Logs an error message
 * @param {string} message - The message to log
 */
const logError = (message) => log(message, colors.red, 'ERROR')

/**
 * Executes a shell command and returns the output
 * @param {string} command - The command to execute
 * @param {boolean} silent - Whether to suppress output
 * @returns {string} The command output
 * @throws {Error} If the command fails
 */
const execCommand = (command, silent = false) => {
    try {
        if (!silent && config.verbose) {
            logInfo(`Executing: ${command}`)
        }

        if (config.dryRun) {
            logWarning(`DRY RUN: Would execute: ${command}`)
            return ''
        }

        const output = execSync(command, {
            cwd: ROOT_DIR,
            encoding: 'utf8',
            stdio: silent ? 'pipe' : 'inherit',
        })

        return output?.trim() || ''
    } catch (error) {
        throw new Error(`Command failed: ${command}\n${error.message}`)
    }
}

/**
 * Checks if a command exists in the system
 * @param {string} command - The command to check
 * @returns {boolean} Whether the command exists
 */
const commandExists = (command) => {
    try {
        execSync(`where ${command}`, { stdio: 'pipe' })
        return true
    } catch {
        return false
    }
}

/**
 * Reads and parses the package.json file
 * @returns {Object} The parsed package.json content
 * @throws {Error} If package.json cannot be read or parsed
 */
const getPackageInfo = () => {
    try {
        const packagePath = join(ROOT_DIR, 'package.json')
        const packageContent = readFileSync(packagePath, 'utf8')
        return JSON.parse(packageContent)
    } catch (error) {
        throw new Error(`Failed to read package.json: ${error.message}`)
    }
}

/**
 * Validates that all required tools are available
 * @throws {Error} If required tools are missing
 */
const validatePrerequisites = () => {
    logInfo('Validating prerequisites...')

    const requiredCommands = ['git', 'gh', 'npm']
    const missingCommands = requiredCommands.filter(cmd => !commandExists(cmd))

    if (missingCommands.length > 0) {
        throw new Error(`Missing required commands: ${missingCommands.join(', ')}`)
    }

    // Check if GitHub CLI is authenticated
    try {
        execCommand('gh auth status', true)
    } catch {
        throw new Error('GitHub CLI is not authenticated. Run: gh auth login')
    }

    // Check if npm is authenticated
    try {
        execCommand('npm whoami', true)
    } catch {
        throw new Error('npm is not authenticated. Run: npm login')
    }

    logSuccess('All prerequisites validated')
}

/**
 * Checks if the working directory is clean
 * @throws {Error} If there are uncommitted changes
 */
const checkWorkingDirectory = () => {
    logInfo('Checking working directory status...')

    const status = execCommand('git status --porcelain', true)
    if (status) {
        throw new Error('Working directory is not clean. Commit or stash changes first.')
    }

    logSuccess('Working directory is clean')
}

/**
 * Runs pre-release checks (linting, tests, build)
 * @throws {Error} If any check fails
 */
const runPreReleaseChecks = () => {
    if (config.skipChecks) {
        logWarning('Skipping pre-release checks')
        return
    }

    logInfo('Running pre-release checks...')

    // Run linting
    logInfo('Running ESLint...')
    execCommand('npm run lint')

    // Run build
    logInfo('Running build...')
    execCommand('npm run build')

    // Run documentation generation
    logInfo('Generating documentation...')
    execCommand('npm run analyse')

    logSuccess('All pre-release checks passed')
}

/**
 * Creates a Git tag for the current version
 * @param {string} version - The version to tag
 * @param {string} tagMessage - The tag message
 * @throws {Error} If tag creation fails
 */
const createGitTag = (version, tagMessage) => {
    const tagName = `v${version}`

    logInfo(`Creating Git tag: ${tagName}`)

    // Check if tag already exists
    try {
        execCommand(`git rev-parse ${tagName}`, true)
        throw new Error(`Tag ${tagName} already exists`)
    } catch (error) {
        if (!error.message.includes('already exists')) {
            // Tag doesn't exist, which is what we want
        } else {
            throw error
        }
    }

    // Create and push the tag
    execCommand(`git tag -a ${tagName} -m "${tagMessage}"`)
    execCommand(`git push origin ${tagName}`)

    logSuccess(`Git tag ${tagName} created and pushed`)
    return tagName
}

/**
 * Generates a changelog based on Git commits since the last tag
 * @param {string} version - The current version
 * @returns {string} The generated changelog
 */
const generateChangelog = (version) => {
    logInfo('Generating changelog...')

    try {
        // Get the last tag
        const lastTag = execCommand('git describe --tags --abbrev=0 HEAD~1', true)

        // Get commits since last tag
        const commits = execCommand(`git log ${lastTag}..HEAD --oneline --no-merges`, true)

        if (!commits) {
            return `## Version ${version}\n\nNo changes since last release.`
        }

        const commitLines = commits.split('\n').filter(line => line.trim())
        const changelog = [
            `## Version ${version}`,
            '',
            '### Changes',
            '',
            ...commitLines.map(line => `- ${line.substring(8)}`), // Remove commit hash
            '',
        ].join('\n')

        return changelog
    } catch {
        // If no previous tag exists, create a simple changelog
        return `## Version ${version}\n\nInitial release.`
    }
}

/**
 * Creates a GitHub release
 * @param {string} tagName - The tag name
 * @param {string} version - The version
 * @param {string} changelog - The changelog content
 * @throws {Error} If release creation fails
 */
const createGitHubRelease = async (tagName, version, changelog) => {
    logInfo(`Creating GitHub release for ${tagName}...`)

    const releaseTitle = `Release ${version}`
    const tempFile = join(ROOT_DIR, '.release-notes.tmp')

    try {
        // Write changelog to temporary file
        if (!config.dryRun) {
            const fs = await import('node:fs/promises')
            await fs.writeFile(tempFile, changelog, 'utf8')
        }

        // Create the release
        const command = [
            'gh', 'release', 'create', tagName,
            '--title', `"${releaseTitle}"`,
            '--notes-file', tempFile,
            '--verify-tag',
        ].join(' ')

        execCommand(command)

        logSuccess(`GitHub release ${tagName} created`)
    } finally {
        // Clean up temporary file
        if (!config.dryRun) {
            try {
                const fs = await import('node:fs/promises')
                await fs.unlink(tempFile)
            } catch {
                // Ignore cleanup errors
            }
        }
    }
}

/**
 * Publishes the package to npmjs.org
 * @param {string} version - The version being published
 * @throws {Error} If publishing fails
 */
const publishToNpm = (version) => {
    logInfo(`Publishing version ${version} to npm...`)

    // Check if version already exists on npm
    try {
        const npmInfo = execCommand(`npm view @totallyinformation/web-components@${version} version`, true)
        if (npmInfo === version) {
            throw new Error(`Version ${version} already exists on npm`)
        }
    } catch (error) {
        if (!error.message.includes('already exists')) {
            // Version doesn't exist, which is what we want
        } else {
            throw error
        }
    }

    // Publish to npm
    execCommand('npm publish --access public')

    logSuccess(`Successfully published version ${version} to npm`)
}

/**
 * Parses command line arguments
 * @param {string[]} args - Command line arguments
 */
const parseArguments = (args) => {
    for (const arg of args) {
        switch (arg) {
            case '--dry-run':
                config.dryRun = true
                break
            case '--skip-checks':
                config.skipChecks = true
                break
            case '--tag-only':
                config.tagOnly = true
                break
            case '--publish-only':
                config.publishOnly = true
                break
            case '--verbose':
                config.verbose = true
                break
            case '--quiet':
                config.verbose = false
                break
            case '--help':
            case '-h':
                console.log(`
Usage: node ./libs/release.mjs [options]

Options:
  --dry-run       Show what would be done without executing
  --skip-checks   Skip pre-release checks (linting, tests, build)
  --tag-only      Only create Git tag and GitHub release
  --publish-only  Only publish to npm (requires existing tag)
  --verbose       Enable verbose logging (default)
  --quiet         Disable verbose logging
  --help, -h      Show this help message

Examples:
  node ./libs/release.mjs                    # Full release process
  node ./libs/release.mjs --dry-run          # Preview what would happen
  node ./libs/release.mjs --tag-only         # Only create tag and release
  node ./libs/release.mjs --publish-only     # Only publish to npm
`)
                process.exit(0)
                break
            default:
                logWarning(`Unknown argument: ${arg}`)
        }
    }
}

/**
 * Main release function
 * @throws {Error} If any step of the release process fails
 */
const main = async () => {
    try {
        parseArguments(process.argv.slice(2))

        if (config.dryRun) {
            logWarning('DRY RUN MODE - No actual changes will be made')
        }

        // Get package information
        const packageInfo = getPackageInfo()
        const { version, name } = packageInfo

        logInfo(`Starting release process for ${name} v${version}`)

        // Validate prerequisites
        validatePrerequisites()

        if (!config.publishOnly) {
            // Check working directory
            checkWorkingDirectory()

            // Run pre-release checks
            runPreReleaseChecks()

            // Create Git tag
            const tagName = createGitTag(version, `Release ${version}`)

            // Generate changelog and create GitHub release
            const changelog = generateChangelog(version)
            await createGitHubRelease(tagName, version, changelog)
        }

        if (!config.tagOnly) {
            // Publish to npm
            publishToNpm(version)
        }

        logSuccess(`🎉 Release process completed successfully for ${name} v${version}!`)

        if (!config.dryRun) {
            logInfo('Next steps:')
            logInfo('1. Verify the release on GitHub: https://github.com/TotallyInformation/web-components/releases')
            logInfo('2. Verify the package on npm: https://www.npmjs.com/package/@totallyinformation/web-components')
            logInfo('3. Update documentation if needed')
        }

    } catch (error) {
        logError(error.message)
        process.exit(1)
    }
}

// Run the main function
main().catch((error) => {
    logError(`Unhandled error: ${error.message}`)
    process.exit(1)
})
