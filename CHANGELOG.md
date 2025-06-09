# Totally Information Web Components - Change Log

## v1.4.0

## v1.3.1

* Fix documentation - no status box for pages with no status front matter.
* Fix test/demo index page - `h1-title` is live.

## v1.3.0

### Test/demo pages

* Re-organised into sub-folders for experiments, alpha, beta and live components.
* New experimental pages.

### **NEW** `h1-title` component

A simple component that uses the page's `<title>` tag as the main heading for the page.

Any slot content is added as a sub-heading with italic, slightly smaller text.

### `data-list` component

* Updated documentation and demo/test page to illustrate how to use the `nested-list` class and `data-depth` attribute to style nested lists.
* Improved warning/error messages - all prefixed with `data-list:` and the instance id.
* Added Node-RED flow example to the documentation to illustrate how to use the `data-list` component with UIBUILDER for Node-RED.

### Default styling

* `uib-brand.css` has beeen updated to version `2025-06-09` in line with UIBUILDER for Node-RED.

### Base component

- **NEW** `hasSlotContent()` method added. This allows you to check if the components `slot` has any content from the light DOM. This is useful for components that may or may not have such content and where you want to apply different styles or behaviour based on that.

### General development

* New script to create new components along with their documentation and test/demo pages. `npm run new-component` or `npm run new-component my-component`.

## v1.2.0

* Lots of ESLINT fixes.
* Tidy up and rationalise the docs home page, roadmap and ideas pages.
* Start to document the standard Node-RED/UIBUILDER to browser remote-control integration.
* A few minor documentation fixes.
* Website homepage correction - thanks to [Paul Reed](https://github.com/Paul-Reed) for spotting the issue.

### `data-list` Component

* No longer uses the shadow DOM. Specific styles prepended to the `head`.

  This now makes it possible to style the inner parts of nested lists.

* For nested lists, sub-lists are given a class of `nested-list` and a `data-depth` attribute so that they can be styled separately.

### Base Component

* **NEW** - `prependStylesheet(styletext, order)` method added. This allows you to prepend a stylesheet for the component to the web page. This is useful for adding styles that need to be applied before the page's own styles. Especially useful for components that don't use the Shadow DOM.

### Component Template

* Added comment to `constructor` to remind that `this.prependStylesheet` can be used to add styles before the page's own styles. when the component does not use the Shadow DOM.

## v1.1.0

Initial release. First release [published to npm](https://www.npmjs.com/package/@totallyinformation/web-components).

This is the first proper release of these web components. They have now matured sufficiently to be worth publishing.

## v0.2.4

* **NEW COMPONENT** - ghost-thermometer
  
  Circular thermometer display and controller for heating systems. Based on @ghostmaster75's Node-RED Dashboard Widget of the same name: https://flows.nodered.org/flow/9ca3a19e0e2ff606bd64f1e73a2191eb

* New test component - simple-switch.
