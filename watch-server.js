const http = require('http')
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const chokidar = require('chokidar')

// Set up paths
const testsDir = path.join(__dirname, 'tests')
const distDir = path.join(__dirname, 'dist')
const srcDir = path.join(__dirname, 'src')
const alphaDir = path.join(__dirname, 'alpha')
const defaultPage = path.join(testsDir, 'index.html')
const esbuildConfig = path.join(__dirname, 'esbuild.config.js')

// Helper to serve file content
function serveFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found, redirect to index.html
        serveFile(res, defaultPage, 'text/html')
      } else {
        res.writeHead(500)
        res.end(`Server Error: ${err.code}`)
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType })
      res.end(content, 'utf-8')
    }
  })
}

// Watch for changes in ./src/*.js and ./alpha/*.js
function watchFilesAndBuild() {
  const watcher = chokidar.watch([`${srcDir}/*.js`, `${alphaDir}/*.js`], {
    persistent: true,
    ignoreInitial: true
  })

  watcher.on('change', (filePath) => {
    console.log(`File changed: ${filePath}`)
    runEsbuild()
  })
}

// Run esbuild using the config file
function runEsbuild() {
  console.log('Running esbuild...')
  exec(`node esbuild.config.js`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running esbuild: ${error.message}`)
      return
    }
    if (stderr) {
      console.error(`esbuild error: ${stderr}`)
      return
    }
    console.log(`esbuild output: ${stdout}`)
  })
}

// Create server
const server = http.createServer((req, res) => {
  const reqPath = req.url === '/' ? '/index.html' : req.url

  if (reqPath.endsWith('.html')) {
    // Serve HTML files from ./tests/
    const filePath = path.join(testsDir, reqPath)
    serveFile(res, filePath, 'text/html')

  } else if (reqPath.endsWith('.js')) {
    // Serve JS files from ./dist/
    const filePath = path.join(distDir, reqPath)
    serveFile(res, filePath, 'application/javascript')

  } else if (reqPath === '/index.html') {
    // Generate and serve the index page
    fs.readdir(testsDir, (err, files) => {
      if (err) {
        res.writeHead(500)
        res.end(`Server Error: ${err.code}`)
        return
      }

      // Filter HTML files
      const htmlFiles = files.filter(file => file.endsWith('.html'))
      const links = htmlFiles.map(file => `<li><a href="${file}">${file}</a></li>`).join('')

      const indexContent = `
        <html>
        <head><title>Index of Test Pages</title></head>
        <body>
          <h1>Index of Test Pages</h1>
          <ul>${links}</ul>
        </body>
        </html>
      `
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(indexContent, 'utf-8')
    })

  } else {
    // Redirect to default page for other requests (404)
    serveFile(res, defaultPage, 'text/html')
  }
})

// Start watching files and build on changes
watchFilesAndBuild()

// Start server
const PORT = 3000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
