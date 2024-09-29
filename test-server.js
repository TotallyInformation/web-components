const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')

// Set up paths
const testsDir = path.join(__dirname, 'tests')
const distDir = path.join(__dirname, 'dist')
const defaultPage = path.join(testsDir, 'index.html')
const page404 = '/list.html'

// Helper to serve file content
function serveFile(res, filePath, contentType) {
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.error('file not found: ', filePath, err)
                // File not found, redirect to index.html
                // serveFile(res, defaultPage, 'text/html')
                // res.writeHead(500)
                // res.end(`Server Error: ${err.code}`)
                listTests(res, `Requested file not found: "${filePath}".`)
            } else {
                console.error('file error: ', filePath, err)
                res.writeHead(500)
                res.end(`Server Error: ${err.code}`)
            }
        } else {
            console.debug('file found: ', filePath, contentType)
            res.writeHead(200, { 'Content-Type': contentType })
            res.end(content, 'utf-8')
        }
    })
}

function listTests(res, msg) {
    console.debug('/list.html')
    // Generate and serve the index page
    fs.readdir(testsDir, (err, files) => {
        if (err) {
            console.error(`[listTests] File read error. ${err.code}, ${err.message}`)
            res.writeHead(500)
            res.end(`Server Error: ${err.code} - ${err.message}`)
            return
        }

        // Filter HTML files
        const htmlFiles = files.filter(file => file.endsWith('.html') && !file.startsWith('include-'))
        const links = htmlFiles.map(file => `<li><a href="tests/${file}">${file}</a></li>`).join('')

        const indexContent = /*html*/`
            <html class="dark">
            <head>
                <link type="text/css" rel="stylesheet" href="tests/resources/uib-brand.css" media="all">
                <title>Index of Test Pages</title>
            </head><body>
                <h1>Index of Test Pages</h1>
                <div>${msg ? msg : ''}</div>
                <article>
                    <ul>${links}</ul>
                </article>
            </body></html>
        `
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(indexContent, 'utf-8')
    })
}

// Create server
const server = http.createServer((req, res) => {
    const reqPath = req.url === '/' ? '/index.html' : req.url
    const filePath = path.join('.', reqPath)
    console.debug('reqPath: ', reqPath, filePath)

    if (reqPath === '/list.html') {
        listTests(res)
    } else if (reqPath === '/favicon.ico') {
        // ignore
    } else if (reqPath.endsWith('.html')) {
        // console.debug('*.html')
        serveFile(res, filePath, 'text/html')
    } else if (reqPath.endsWith('.js')) {
        serveFile(res, filePath, 'text/javascript')
    } else if (reqPath.endsWith('.css')) {
        serveFile(res, filePath, 'text/css')
    } else if (reqPath.endsWith('.json')) {
        serveFile(res, filePath, 'application/json')
    } else {
        serveFile(res, filePath, 'text')
    }
})

// Start server
const PORT = 8080
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
