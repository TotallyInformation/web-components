---
title: Developer documentation
description: |
  The standards and processes used in the development of these web components.
created: 2024-09-22 14:34:00
updated: 2025-09-19 18:21:11
---

## Standards

These are the requirements and standards for any web component to be included in this repository.

* MUST be loadable in the browser with either a *single* script link or a single import (for ES Module use).

* MUST be useable in the majority of modern browsers, anything supporting ES2019+ should be usable. IE will not be supported. Use ESBUILD to enforce this.

* MUST be run through ESBUILD to produce minimised ESM and IIFE versions. The built versions should target common browser features no newer than 2-years old. Built versions will be in the `./dist` folder with alpha quality components built to the `./dist/alpha` folder. All built versions will include `.map` files for debugging.

* All components MUST self register the custom tag AND their Class Name. All tag namess are lower-case with at least one dash (_kebab-case_) . All Class names start with an upper-case letter and the name is the tag name in _PascalCase_. MUST self-register the custom tag using `customElements.define`.

* The Class is the default export and is also self-registered to the window global.

* MUST provide source-code in either `./src` (for production ready components) or `./src/alpha`. Any component in `./src` MUST be usable even if it is not feature complete.

* MUST use JSDoc to self-document. MUST use ESLint and follow the provided ESLINT config formatting.

* MUST provide a document file in `./docs` describing use, settings, etc.

* MUST provide the following custom events on the `document` global object:

  * ConnectedCallback (instance load) - `${this.localName}:connected`
  * DisconnectedCallback (instance unload) - `${this.localName}:disconnected`
  * attributeChangedCallback - `${this.localName}:attribChanged`

* MUST call `super()` and SHOULD call `this.createShadowSelectors()` in `constructor`

* MUST call `this.ensureId()` and `this.doInheritStyles()` in `connectedCallback`

* MUST NOT be dependent on UIBUILDER for Node-RED. SHOULD be enhanced if the UIBUILDER client library is loaded.

* MUST extend `ti-base-component` to inherit standard variables and methods.

* MUST be derived from the `./libs/ti-base-component.js` class to inherit standard properties and methods.

* SHOULD be standalone with no external requirements. Common include library modules (e.g. charts) MAY be imported however. The resulting file MUST be useable stand-alone.

* SHOULD meet the [Web Components Gold Standard](https://github.com/webcomponents/gold-standard/wiki).

* SHOULD follow [Best practices](https://web.dev/articles/custom-elements-best-practices).

* SHOULD have a `<slot>` to allow nested rich content (where it makes sense).

* Where _static_ properties or methods are referred to, `this.constructor` should be used rather than the class name. This avoids errors should the class ever be renamed or the code copied to a different class. Similarly, `this.localName` can be used to get the class name as text which should be used in debugging and error logging.

* Components generally SHOULD NOT do processing directly in `attributeChangedCallback`. Better to create setters for any attribute names and do the processing called from the setter. This then also allows the attribute to be used as a property and still automatically get the benefit of the processing.

* When allowing access as a property, do not update the matching attribute. Attributes represent the initial setting, the properties are dynamic.

* Where complex data is needed, allow serialised json on the attribute but full data on the property of the same name.

* Where allowing updates via property get/set, make sure that there is a matching internal class variable (e.g. prop name `value`, class var `#value`), the property name is taken by the getter/setter. If the class var and the getter/setter have the same name, the getter/setter will not work and no error is produced to say what is happening.


### HTML Standards limitations

* Custom HTML tags MUST use pascal-case with at least 1 `-`.
* Custom HTML tags MUST use lower-case attribute names.

## Styling

Where shadow dom is used (most of these components), note that style isolation between parent and component instance applies.

* Classes defined in the parent are not available within the shadow dom.

* CSS Variables defined in the parent **ARE** available within the shadow dom.

* `:host{ ... }` is used to apply styles to the custom tag.

* Shadow dom elements can be selectively styled based on parent elements surrounding the custom tag through the use of the `:host-context()` pseudo selector.
Shadow dom elements can be selectively styled based on a class or other identifier on the custom tag itself in the parent though the use of the `:host()` pseudo selector.

* Elements from the parent that go into the components `<slot>`s may be given additional styling by use of the `::slotted()` pseudo selector. Note that slot contents remain in the parent dom. **NOTE**: Only top-level slot elements can be styled this way.

* If you want to let the parent page style your component. Either use *CSS Variables* or add a `part` attribute to shadow dom elements. Then the parent styles can use `::part(partName){ ... }`. As a last resort, you can re-attach the parent page's stylesheet(s) to the shadow dom.

## Features provided by the TiBaseComponent class

### Standard Attributes

* `inherit-style` - Used without a value, will load a `./index.css` external stylesheet into the component's shadow dom. If a value is provided, it will be used as the URL of a stylesheet to load. If not present, no external stylesheet will be loaded.

### Standard Properties

* `baseVersion` - `{string}` Static. The base (parent) component version string (date updated) used when the component was built.
* `componentVersion` - `{string}` The component version string (date updated).
* `uib` - `{boolean}` True if UIBUILDER for Node-RED is loaded. UIBUILDER nor Node-RED are required for any of the components. However, a component MAY be enhanced if UIBUILDER is loaded.
* `$` - `{function(string): Element}` jQuery-like shadow dom selector.
* `$$` -  `{function(string): NodeList}` jQuery-like shadow dom multi-selector (returns a static list).
* `_iCount` - `{number}` The instance count for the component - used to generate unique IDs.
* `opts` - `{object}` The component's controllable options - get/set using the `config()` method.
* `connected` - `{boolean}` False until the component has fully connected to the DOM.

### Standard Methods

* `config` - Update runtime configuration, return complete config
* `createShadowSelectors` - Creates the jQuery-like $ and $$ methods
* `deepAssign` - Object deep merge utility.
* `doInheritStyles` - Triggered by `inherit-styles` attribute. When present, attempts to load an `./index.css` stylesheet into the shadow DOM. e.g. the css resource file should be in the same folder as the web page consuming the component.
* `ensureId` - Adds a unique ID to the tag if no ID defined.
* `version` - Returns the component and base version strings.
* `_connect` - Standard connection handler for all components.
* `_construct` - Standard constructor for all components.
* `_event` - Standard event handler for all components.
* `_ready` - Standard ready handler for all components. Call at end of `connectedCallback`.
* `_uibMsgHandler` - If UIBUILDER for Node-RED is active, auto-handle incoming messages targetted at instance id

### Global Variables

* `TiBaseComponent` - The base class for all components in this library.
* Each component class is also registered to the `window` object.
* Each component class is also registered to the `customElements` object.

## Development workflow

> [!NOTE]
> `npm run new-component [component-name]` will create a new component in the `./src/experiments` folder, a matching doc file in the `./docs` folder and a matching test/demo HTML page in the `./tests` folder. It will also update the sidebar and index files in the `./docs` folder.

1. Copy the `./src/templates/component-template.mjs` file to a new file in the `./src/experiments` folder.
2. Update the class name, component name, and file name to match the new component.
3. Create a matching document file in the `./docs` folder. Use `./docs/_component-doc-template.md` as a template.

   * Update the `./docs/.config/sidebar.md` file to include the new component in the sidebar.
   * Update the table of components in the `./docs/index.md` file to include the new component.

4. Create a matching test/demo HTML page in the `./tests` folder.
5. Run the `npm run watch` script to start esbuild in watch mode. Auto-creates the ESM and IIFE versions of the component.
6. _develop the component - add properties, methods, and events as required._
7. Run the `npm run build` script to rebuild the tests/demos index page & run a final esbuild on all components.
8. Run the `npm run test` script to run the Cloudflare Wrangler web server to test out the doc/demo/test website.
9.  Git commit and push the changes to GitHub.

NB: Prior to final push, run `npm run buildDocBundle` to update the documentation bundle script.

* See https://github.com/runem/web-component-analyzer#-how-to-document-your-components-using-jsdoc on how to document
* Use `npx web-component-analyzer ./components/button-send.js` to create/update the documentation  or paste into https://runem.github.io/web-component-analyzer/
* Use `npx web-component-analyzer ./components/*.js --format vscode --outFile ./vscode-descriptors/ti-web-components.html-data.json` to generate/update vscode custom data files. See https://github.com/microsoft/vscode-custom-data/tree/main/samples/webcomponents


Pushing to GitHub will trigger the Cloudflare Pages build and deployment process for the `https://wc.totallyinformation.net` website.

## Progressive enhancements for UIBUILDER

> TBC

When working with UIBUILDER for Node-RED, the component libraries MUST be loaded AFTER the uibuilder client library.

The following enhancements are enabled:

* 

## Older stds - may be outdated or may not be implemented

* Standard attributes should include

  'topic', 'payload', 'events' (boolean)

* uibuilder aware
  
  * Content (data) changes and events optionally trigger send back to Node-RED. Uses the `msg._ui` property
  * Consumes data from node-red where sensible. Uses the `msg._ui` property.
  * When sending to node-red, msg should include `msg._ui` which should include id, name, data (object containing any `data-*` attribs)

* Triggers custom events on the `document` global object

  * Constructor (load)
  * ConnectedCallback (instance load)
  * DisconnectedCallback (instance unload)
  * Data changes
