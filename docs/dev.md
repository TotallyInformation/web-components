---
title: Developer documentation
description: |
  The standards and processes used in the development of these web components.
created: 2024-09-22 14:34:00
updated: 2024-09-22 14:34:05
---

## Standards

These are the requirements and standards for any web component to be included in this repository.

* MUST be standalone with no external requirements. Common include library modules (e.g. charts) MAY be imported however. The resulting file MUST be useable stand-alone.
* MUST be useable in the majority of modern browsers, anything supporting ES2019+ should be usable. IE will not be supported.

* All components MUST self register the custom tag AND their Class Name. All tag namess are lower-case with at least one dash (_kebab-case_) . All Class names start with an upper-case letter and the name is the tag name in _PascalCase_. MUST self-register the custom tag using `customElements.define`.
* The Class is the default export and is also self-registered to the window global.
* MUST provide source-code in either `./src` (for production ready components) or `./alpha`. Any component in `./src` MUST be usable even if it is not feature complete.
* MUST have both IIFE and ESM minimised versions built using ESBUILD. The built versions should target common browser features no newer than 2-years old. Built versions will be in the `./dist` folder with alpha quality components built to the `./dist/alpha` folder. All built versions will include `.map` files for debugging.
* MUST use JSDoc to self-document. MUST use ESLint and follow the modified _JavaScript Standard_ formatting.
* MUST provide a document file in `./docs` describing use, settings, etc.

* MUST provide the following custom events on the `document` global object:

  * ConnectedCallback (instance load) - `${this.localName}:connected`
  * DisconnectedCallback (instance unload) - `${this.localName}:disconnected`
  * attributeChangedCallback - `${this.localName}:attribChanged`

* MUST call `super()` and SHOULD call `this.createShadowSelectors()` in `constructor`
* MUST call `this.ensureId()` and `this.doInheritStyles()` in `connectedCallback`

* MUST NOT be dependent on UIBUILDER for Node-RED. SHOULD be enhanced if the UIBUILDER client library is loaded.
* SHOULD be derived from the `./libs/ti-base-component.js` class to inherit standard properties and methods.
* SHOULD meet the [Web Components Gold Standard](https://github.com/webcomponents/gold-standard/wiki).
* SHOULD follow [Best practices](https://web.dev/articles/custom-elements-best-practices).
* SHOULD have a `<slot>` to allow nested rich content (where it makes sense).

* Where _static_ properties or methods are referred to, `this.constructor` should be used rather than the class name. This avoids errors should the class ever be renamed or the code copied to a different class. Similarly, `this.localName` can be used to get the class name as text which should be used in debugging and error logging.

* Components generally SHOULD NOT do processing directly in `attributeChangedCallback`. Better to create setters for any attribute names and do the processing called from the setter. This then also allows the attribute to be used as a property and still automatically get the benefit of the processing.

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

* If you want to let the parent page style your component. Either use *CSS Variables* or add a `part` attribute to shadow dom elements. Then the parent styles can use `::part(partName){ ... }`.

## Features provided by the TiBaseComponent class

### Standard Attributes

* `inherit-style` - Used without a value, will load a `./index.css` external stylesheet into the component's shadow dom. If a value is provided, it will be used as the URL of a stylesheet to load. If not present, no external stylesheet will be loaded.

### Standard Properties

* `baseVersion` - `{string}` Static. The component version string (date updated). Also has a getter.
* `uib` - `{boolean}` True if UIBUILDER for Node-RED is loaded
* `$` - `{function(string): Element}` jQuery-like shadow dom selector
* `$$` -  `{function(string): NodeList}` jQuery-like shadow dom multi-selector (returns a static list)
* `_iCount` - `{number}` The component version string (date updated)
* `opts` - `{object}` This components controllable options - get/set using the `config()` method

### Standard Methods

* `config` - Update runtime configuration, return complete config
* `createShadowSelectors` - Creates the jQuery-like $ and $$ methods
* `deepAssign` - Object deep merger
* `doInheritStyles` - If requested, add link to an external style sheet
* `ensureId` - Adds a unique ID to the tag if no ID defined.
* `_uibMsgHandler` - If UIBUILDER for Node-RED is active, auto-handle incoming messages targetted at instance id

### How to use

See `./alpha/component-template.js` which should be used as the basis for all new components in this package.

### Progressive enhancements for UIBUILDER

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
