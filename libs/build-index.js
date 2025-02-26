const fs = require('fs')
const path = require('path')

// Directory containing your HTML files
const testsDir = path.join(__dirname, '../tests')
// Output file
const outputFile = path.join(__dirname, '../tests/index.html')

function toTitleCase(str) {
    str = str.replace('.html', '').replace('-', ' ')
    return str
        .toLowerCase()  // Convert the entire string to lowercase
        .split(' ')     // Split the string into an array of words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // Capitalize the first letter of each word
        .join(' ');     // Join the words back into a single string
}

function generateIndex() {
    // Read all files in the ./tests directory
    fs.readdir(testsDir, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err)
            return
        }

        // Filter to get only HTML files
        const htmlFiles = files.filter(file => file.endsWith('.html'))

        // Start creating the HTML content
        let htmlContent = /*html*/`
        <!DOCTYPE html><html lang="en" class="dark">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Testing TotallyInformation's web-components - Index Page</title>
            <link type="text/css" rel="stylesheet" href="/tests/resources/uib-brand.css" media="all">
        </head>
        <body>
            <main>
            <h1>Testing and demo of TotallyInformation's web-components</h1>
            <article><h2>Index of test/demo pages</h2>
            <h3>Live components (ready for extended use)</h3>
            <ul></ul>
            <h3>Beta components (not yet ready for extended use)</h3>
            <ul></ul>
            <h3>Alpha components (for testing use only)</h3>
            <ul>
        `

        // Add each HTML file as a list item
        htmlFiles.forEach(file => {
            if (file !== 'index.html') {
                htmlContent += /*html*/`
                <li><a href="${file}">${toTitleCase(file)}</a></li>
            ` }
        })

        htmlContent += /*html*/`
            </ul></article>
            <article>
                <h2>Information</h2>
                <p><a href="/docs">Component documentation</a></p>
                <p><a href="https://github.com/TotallyInformation/web-components">Source Code (GitHub)</a></p>
                <p><a href="https://npmjs.org/TotallyInformation/">npm Published Version (not yet available)</a></p>
                <p>These web components from TotallyInformation are stand-alone without external dependencies.
                    Each one aims to simplify the use of HTML as a User Interface (UI).
                    They work on any page without the need for a framework or other dependencies.
                    Where they use 3rd-party libraries, these are integrated so you don't need to worry about them.</p>
                <p>All you need to do is create a reference to the component's library in your page as shown in the readme and documentation.</p>
                <p>Some of the pages have a script that may add dynamic content after a few seconds.
                    The demos all use the pre-built IIFE version of the component for example code simplicity. However, they all have ESM versions as well that can be imported.</p>
            </article>
        </main>
        </body></html>
        `

        // Write the generated HTML content to index.html
        fs.writeFile(outputFile, htmlContent, err => {
            if (err) {
                console.error('Error writing index.html:', err)
                return
            }
            console.log('index.html has been generated successfully!')
            console.warn("Don't forget to manually move entries to the correct list.")
        })
    })
}

// Run the function to generate the index
generateIndex()
