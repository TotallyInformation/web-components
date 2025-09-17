#!/usr/bin/env node

/**
 * @file Node.js CLI script to create new web components
 * @description Creates new web component files from templates with proper naming conventions
 * @author Julian Knight (Totally Information)
 * @license Apache-2.0
 */

import { readFile, writeFile, access } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import process from 'process'
import readline from 'readline'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

/**
 * Convert kebab-case to PascalCase
 * @param {string} kebabCase - String in kebab-case format (e.g., 'my-component')
 * @returns {string} String in PascalCase format (e.g., 'MyComponent')
 */
function kebabToPascalCase(kebabCase) {
    return kebabCase
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('')
}

/** Validate component name format
 * @param {string} name - Component name to validate
 * @returns {boolean} True if valid, false otherwise
 */
function isValidComponentName(name) {
    // Must be 2 words separated by a single dash, only lowercase letters & numbers, start with a letter
    const pattern = /^[a-z][a-z0-9]+-[a-z0-9]+$/
    return pattern.test(name)
}

/**
 * Check if file exists
 * @param {string} filePath - Path to check
 * @returns {Promise<boolean>} True if exists, false otherwise
 */
async function fileExists(filePath) {
    try {
        await access(filePath)
        return true
    } catch {
        return false
    }
}

/**
 * Get component name from user input
 * @returns {Promise<string>} The validated component name
 */
async function getComponentName() {
    // Check if running in non-interactive mode (for testing)
    if (process.argv[2]) {
        const name = process.argv[2].trim().toLowerCase()
        if (!isValidComponentName(name)) {
            throw new Error('Invalid format. Please use 2 words separated by a single dash (e.g., "my-component")')
        }
        return name
    }

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    return new Promise((resolve, reject) => {
        const askForName = () => {
            rl.question('Enter new web component name (2 words separated with a dash, e.g., "my-component"): ', (answer) => {
                const name = answer.trim().toLowerCase()

                if (!isValidComponentName(name)) {
                    console.log('❌ Invalid format. Please use 2 words separated by a single dash (e.g., "my-component")')
                    askForName()
                    return
                }

                rl.close()
                resolve(name)
            })
        }

        // Handle SIGINT (Ctrl+C)
        rl.on('SIGINT', () => {
            console.log('\n👋 Goodbye!')
            rl.close()
            process.exit(0)
        })

        askForName()
    })
}

/**
 * Create markdown documentation file
 * @param {string} componentName - The component name in kebab-case
 * @param {string} pascalName - The component name in PascalCase
 */
async function createMarkdownFile(componentName, pascalName) {
    const templatePath = join(rootDir, 'docs', '_component-doc-template.md')
    const outputPath = join(rootDir, 'docs', 'components', 'experiments', `${componentName}.md`)

    if (await fileExists(outputPath)) {
        console.log(`⚠️  Markdown file already exists: ${outputPath}`)
        return
    }

    try {
        const template = await readFile(templatePath, 'utf-8')
        const content = template
            .replaceAll('xxxx-xxxx', componentName)
            .replaceAll('XxxxXxxx', pascalName)

        await writeFile(outputPath, content, 'utf-8')
        console.log(`✅ Created markdown file: ${outputPath}`)
    } catch (error) {
        console.error(`❌ Error creating markdown file:`, error.message)
    }
}

/**
 * Create HTML test file
 * @param {string} componentName - The component name in kebab-case
 * @param {string} pascalName - The component name in PascalCase
 */
async function createHtmlFile(componentName, pascalName) {
    const templatePath = join(rootDir, 'tests', '_test-template.html')
    const outputPath = join(rootDir, 'tests', 'experiments', `${componentName}.html`)

    if (await fileExists(outputPath)) {
        console.log(`⚠️  HTML test file already exists: ${outputPath}`)
        return
    }

    try {
        const template = await readFile(templatePath, 'utf-8')
        const content = template
            .replaceAll('xxxx-xxxx', componentName)
            .replaceAll('XxxxXxxx', pascalName)

        await writeFile(outputPath, content, 'utf-8')
        console.log(`✅ Created HTML test file: ${outputPath}`)
    } catch (error) {
        console.error(`❌ Error creating HTML test file:`, error.message)
    }
}

/**
 * Create JavaScript component file
 * @param {string} componentName - The component name in kebab-case
 * @param {string} pascalName - The component name in PascalCase
 */
async function createJavaScriptFile(componentName, pascalName) {
    const templatePath = join(rootDir, 'src', 'templates', 'component-template.mjs')
    const outputPath = join(rootDir, 'src', 'experiments', `${componentName}.mjs`)

    if (await fileExists(outputPath)) {
        console.log(`⚠️  JavaScript file already exists: ${outputPath}`)
        return
    }

    try {
        const template = await readFile(templatePath, 'utf-8')
        const componentVersion = new Date().toISOString().split('T')[0] // eslint-disable-line @stylistic/newline-per-chained-call
        const content = template
            .replaceAll('xxxx-xxxx', componentName)
            .replaceAll('XxxxXxxx', pascalName)
            .replaceAll('component-template', componentName)
            .replaceAll('ComponentTemplate', pascalName)
            .replace(/componentVersion\s*=\s*'[^']*'/, `componentVersion = '${componentVersion}'`)

        await writeFile(outputPath, content, 'utf-8')
        console.log(`✅ Created JavaScript file: ${outputPath}`)
    } catch (error) {
        console.error(`❌ Error creating JavaScript file:`, error.message)
    }
}

/**
 * Update tests/index.html with new component link
 * @param {string} componentName - The component name in kebab-case
 */
async function updateTestsIndex(componentName) {
    const indexPath = join(rootDir, 'tests', 'index.html')

    try {
        const content = await readFile(indexPath, 'utf-8')

        // Find the last <article> in the first <section> and add to its <ul>
        const articleRegex = /<article>\s*<h3>Pre-Alpha experiments components[^<]*<\/h3>\s*<ul>([\s\S]*?)<\/ul>\s*<\/article>/
        const match = content.match(articleRegex)

        if (!match) {
            console.error('❌ Could not find experiments section in tests/index.html')
            return
        }

        const existingItems = match[1]
        const newItem = `                        <li><a href="experiments/${componentName}.html">${componentName}</a></li>`

        // Check if item already exists
        if (existingItems.includes(`experiments/${componentName}.html`)) {
            console.log(`⚠️  Component already listed in tests/index.html`)
            return
        }

        const updatedItems = existingItems.trimEnd() + '\n' + newItem
        const newContent = content.replace(
            articleRegex,
            `<article>
                    <h3>Pre-Alpha experiments components (probably not usable)</h3>
                    <ul>
${updatedItems}
                    </ul>
                </article>`
        )

        await writeFile(indexPath, newContent, 'utf-8')
        console.log(`✅ Updated tests/index.html with new component link`)
    } catch (error) {
        console.error(`❌ Error updating tests/index.html:`, error.message)
    }
}

/**
 * Main function
 */
async function main() {
    console.log('🚀 Web Component Generator')
    console.log('==========================\n')

    try {
        const componentName = await getComponentName()
        const pascalName = kebabToPascalCase(componentName)

        console.log(`\n📝 Creating component: ${componentName} (${pascalName})\n`)

        // Create all the files
        await createMarkdownFile(componentName, pascalName)
        await createHtmlFile(componentName, pascalName)
        await createJavaScriptFile(componentName, pascalName)
        await updateTestsIndex(componentName)

        console.log(`\n🎉 Component "${componentName}" created successfully!`)
        console.log(`\n📁 Files created:`)
        console.log(`   • docs/components/experiments/${componentName}.md`)
        console.log(`   • tests/experiments/${componentName}.html`)
        console.log(`   • src/experiments/${componentName}.js`)
        console.log(`   • Updated tests/index.html`)
        console.log(`\nRemember to run 'npm run build' to compile the new component.`)
    } catch (error) {
        console.error('❌ Error:', error.message)
        process.exit(1)
    }
}

// Run the script
main()
