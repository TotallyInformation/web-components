# web-components

A repository of simple W3C Web Components. These have specific capabilities for use with node-red-contrib-uibuilder but will work independently as well.

Additional documentation is available in the docs folder which is also exposed as a website at https://totallyinformation.github.io/web-components/.

## Requirements

These are the requirements for any web component to be included in this repository.

* MUST be standalone with no external requirements. Common include library modules may be permitted however.
* MUST be useable in the majority of modern browsers. IE will not be supported.
* MUST use ES6+. Maxumum JavaScript version should be 2 years behind the leading edge and only features supported by the majority of mainstream browsers are allowed. Other features MAY be permitted as long as they are optional and do not produce errors.
* MUST be linted using ESLINT. SHOULD use JavaScript Standard format.
* MUST self-register the custom tag using `customElements.define`.
* MUST use a Class name using a _CamelCase_ version of the component name with an initial upper-case letter (e.g. `syntax-highlight` will be `export default class SyntaxHighlight extends HTMLElement { ... }` ).
  
* SHOULD have a `<slot>` to allow nested rich content (where it makes sense).
* SHOULD export a _camelCase_ version of the component-name which contains any useful methods and data. (e.g. `syntax-highlight` should export `syntaxHighlight`).

### HTML Standards limitations

* Custom HTML tags MUST use pascal-case with at least 1 `-`.
* Custom HTML tags MUST use lower-case attribute names.

## Installation and loading

You can use these components directly from the jsdelivr CDN by referencing like: `https://cdn.jsdelivr.net/gh/totallyinformation/web-components@master/components/button-send.js`. So no install is required if you are happy to load from the Internet.

If you wish to install locally, you can npm install from the GitHub repository with `npm install totallyinformation/web-components`. If these ever get published to npm, you would install with `npm install @totallyinformation/web-components`. However, note that, at this point, I am not intending to publish them quickly as they are still evolving quite rapidly.

If installing locally, you will need to make the installed `web-components/components/` folder available to your web server as a static resource folder.

If using with Node-RED, you can install the components with the help of node-red-contrib-uibuilder. The uibuilder node has a library manager feature and you should use that to install the repository direct from GitHub (requires uibuilder v5+). In that case, uibuilder adds the repository to its web server and you can access them as: `../uibuilder/vendor/@totallyinformation/web-components/components/button-send.js`. See below for details.

The individual component documentation contains details on how to load the component files. In general, however, there are two choices on how to load them. 

You can either load them in your HTML file as `<script type="module" async src="https://cdn.jsdelivr.net/gh/totallyinformation/web-components@master/components/button-send.js"></script>` for example (or from the local resource of course). 

Alternatively, you can load them in your main JavaScript script using dynamic imports as `import('https://cdn.jsdelivr.net/gh/totallyinformation/web-components@master/components/button-send.js')` (requires a modern browser supporting ES6+ so no Internet Explorer without some pollyfills). The potential advantage of this approach is that you can access exported variables and methods from the component if any are available (see the syntax-highlight component for an example). Typically, each component will at least export a camelCase equivalent of the component name (e.g. `button-send` with export `buttonSend`) with useful methods and data for use without uibuilder. Dynamic imports are supported by all common modern browsers and you don't need to load you main script as a module in order to use it. However, if you do load your index.js as a module as with `<script type="module" src="./index.js"></script>` in the head, then you can use a static import if you prefer.

Please do note that dynamic imports are async. Generally, this won't matter if you aren't assigning the import to a variable. If you are, you may need to use top-level 



## Stand-alone use

### Installation and loading

See the general information above.

### Using the components

See the [component documentation](docs) for specific usage information for each component.



## Use with [Node-RED](https://nodered.org/) and [node-red-contrib-uibuilder](https://github.com/TotallyInformation/node-red-contrib-uibuilder)

### Installation and loading

You can, of course, use the components direct from a CDN as shown above.

Otherwise, install this repository using the library manager in a uibuilder node in Node-RED.

<img src="docs/images/2022-04-05-14-03-33.png" alt="uibuilder library manager" width="350"/>

Which results in something like:

<img src="docs/images/2022-04-05-14-09-34.png" alt="uibuilder installed library" width="350"/>

Noting that this library does not actually have a default script so the listed on is spurious.

You can then access the components by loading them into your html or JavaScript as shown above.

### Using the components

The components can, of course, be used in the same way as if not using uibuilder. However, there are additional capabilities aimed at making their use in conjunction with Node-RED and uibuilder even easier. Specifically reducing the amount of code required to use them.

Components will automatically recognise when uibuilder is being used. They will each:

* Have a specific msg schema - when a msg with the matching schema is sent from Node-RED via uibuilder, a singular instance of the component on a page will be automatically updated. Where multiple instances are present, the msg must include an html id so that the msg will target that instance.

See the [component documentation](docs) for specific usage information for each component.



## Visual Studio Code (VSCode) Intelligence

VSCode supposts the use of HTML and CSS Custom Data JSON files that describe custom web components and CSS in a way that gives some intelligence to the editor when writing HTML and CSS code.

This collection of web components uses [Web Component Analyzer](https://github.com/runem/web-component-analyzer) to help document the components. It is also used to create an html custom data file that can be added to VSCode or to a specific workspace or folder settings to provide additional Intellisense help for the components.

To do so, find the html custom data setting in VSCode settings and add:

```
/path/to/totallyinformation/web-components/vscode-descriptors/ti-web-components.html-data.json
```

## Discussions and suggestions

The best place to ask questions, or suggest improvements about these components is the [GitHub discussion board for this repository](https://github.com/TotallyInformation/web-components/discussions).

## Contributing

If you would like to contribute to this node, you can contact [Totally Information via GitHub](https://github.com/TotallyInformation) or raise a request in the [GitHub issues log](https://github.com/TotallyInformation/web-components/issues).

<!-- Please refer to the [contributing guidelines](https://github.com/TotallyInformation/node-red-contrib-uibuilder/blob/master/.github/CONTRIBUTING.md) for more information. -->

## Developers/Contributors

- [Julian Knight](https://github.com/TotallyInformation) - the designer and main author.

   <a href="https://stackexchange.com/users/1375993/julian-knight"><img src="https://stackexchange.com/users/flair/1375993.png" width="208" height="58" alt="profile for Julian Knight on Stack Exchange, a network of free, community-driven Q&amp;A sites" title="profile for Julian Knight on Stack Exchange, a network of free, community-driven Q&amp;A sites" /></a>

   Please also check out my blog, [Much Ado About IT](https://it.knightnet.org.uk), it has information about all sorts of topics, mainly IT related, including Node-RED.
