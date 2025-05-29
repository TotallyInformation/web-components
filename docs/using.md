---
title: How to use the Totally Information Web Components
description: >
  
created: 2025-05-29 09:25:49
lastUpdated: 2025-05-29 09:25:54
---

Install locally using npm or access via [jsdelivr](https://www.jsdelivr.com/package/gh/totallyinformation/web-components).

See the [component documentation](docs) for specific usage information for each component.

<details>
<summary><b>Useage details</b></summary>

### File locations

Files for live use are in the `dist` folder. The alpha quality components are in the `dist/alpha` folder.

Each component has 4 files but you only need 1 of them.

If using traditional JavaScript or just HTML, use the `*.iife.min.js` files in deferred links in your `<head>`.

```html
<script defer src="https://cdn.jsdelivr.net/gh/totallyinformation/web-components/dist/visible-console.iife.min.js"></script>
```

If using ES Modules, import the `*.esm.min.js` files in your module code.

```javascript
import 'https://cdn.jsdelivr.net/gh/totallyinformation/web-components/dist/visible-console.esm.min.js'
```

Each component self-registers its custom HTML tag. They also globally self-register their class name so that you can access static variables and functions if needed. The tag name and global name are both listed in the tables below.

When using your browser's developer tools, the matching `.map` file will be loaded. This ensures that reported line numbers and full variable/function names are reported.

The source for the components is in the `src` folder for the main components and in the `alpha` folder for the alpha quality components.

### Useage with UIBUILDER for Node-RED

* You can install the components library using UIBUILDER's library manager.
* In your front-end HTML, load the components _after_ the uibuilder client library so that the components register that uibuilder is in use and becomes responsive to it.

If using with Node-RED, you can install the components with the help of node-red-contrib-uibuilder. The uibuilder node has a library manager feature and you should use that to install the repository direct from GitHub (requires uibuilder v5+). In that case, uibuilder adds the repository to its web server and you can access them as: `../uibuilder/vendor/@totallyinformation/web-components/dist/button-send.js`. See below for details.

### Local installation

If you wish to install locally, you can npm install from the GitHub repository with `npm install totallyinformation/web-components`. If these ever get published to npm, you would install with `npm install @totallyinformation/web-components`. However, note that, at this point, I am not intending to publish them quickly as they are still evolving quite rapidly.

If installing locally, you will need to make the installed `web-components/components/` folder available to your web server as a static resource folder.

If using with UIBUILDER for Node-RED, you can use UIBUILDER's library manager to install the components directly from GitHub. This will make them available to your front-end code as `../uibuilder/vendor/@totallyinformation/web-components/dist/button-send.js`.

### Loading components into your web page

The individual component documentation contains details on how to load the component files. In general, however, there are two choices on how to load them. 

#### Load as an ECMA module

This is the preferred method. However, it is generally best to load via a script module. While you can load them via your HTML as a script link, you loose some capability this way.

```html
<script type="module" async>
   import '../uibuilder/vendor/@totallyinformation/web-components/components/simple-container.js'
</script>
```

#### Load from HTML with a script tag

They **must** be loaded as a type "module".

```html
<script type="module" async src="https://cdn.jsdelivr.net/gh/totallyinformation/web-components@main/components/button-send.js"></script>
```

Or from the local resource of course. Note that this is not recommended. It is better to load them from a script module and then you can use an import statement.

#### Load from a standard script

Alternatively, you can load them in your main JavaScript script using dynamic imports as:

```html
<script defer async>
   import('https://cdn.jsdelivr.net/gh/totallyinformation/web-components@main/components/button-send.js')
</script>
```

The disadvantage of this method is that the import function is asynchronous and so your own code may try to execute before the module has loaded. Generally, this won't matter if you aren't assigning the import to a variable. If you are, you may need to use top-level async or the promise-style then/catch.

The potential advantage of this approach is that you can access exported variables and methods from the component if any are available (see the syntax-highlight component for an example). 

### Visual Studio Code (VSCode) Intelligence

VSCode supposts the use of HTML and CSS Custom Data JSON files that describe custom web components and CSS in a way that gives some intelligence to the editor when writing HTML and CSS code.

This collection of web components uses [Web Component Analyzer](https://github.com/runem/web-component-analyzer) to help document the components. It is also used to create an html custom data file that can be added to VSCode or to a specific workspace or folder settings to provide additional Intellisense help for the components.

To do so, find the html custom data setting in VSCode settings and add:

```
/path/to/totallyinformation/web-components/vscode-descriptors/ti-web-components.html-data.json
```

</details>
