This is the documentation for TotallyInformation's pure Web Components.

These components do not require any external modules or frameworks. However, they do contain (optional) features to use with node-red-contrib-uibuilder.
They require a reasonably modern, standards compliant browser. No Internet Explorer support (though you may be able to get them to work with a suitable polyfill).

See the examples folder which contains an html and a javascript file for each component that demonstrates their use with and without uibuilder.

See the main README for how to install and use.


## Components

### Usable

While these are certainly fully usable in their current form, they may still continue to evolve, possibly fairly dramatically.

* [`button-send`](button-send) - A simple &lt;button> wrapper that exposes useful data.
* [`html-include`](html-include) - Dynamically include HTML snippets or documents from a web server into your current web page.
* [`syntax-highlight`](./syntax-highlight) - Show JSON or JavaScript object data as highlighted HTML.

### Usable with limitations

These will do a job in a basic fashion but still need some work to make them more complete and standardised.

* `data-list`

### Not yet ready for use and/or experimental

* `definition-list`

* `floor-plan` - May become a non-framework version of the uibuilder/SVG/VueJS example.
* [`hello-world`](./hello-world.md) - Not really useful, just helpful as a development tool.
* `super-star` - this was borrowed from elsewhere. It isn't really useful but shows some web component features.

### Coming soon

* `on-off`



## Standards & Requirements

* Self registering custom tag. All tag namess are lower-case with at least one dash.

* Class is the default export and is attached to the window global

* Include `$` internal shortcut to shadow DOM

  ```javascript
  /** Mini jQuery-like shadow dom selector
   * @param {keyof HTMLElementTagNameMap} selection HTML element selector
   */
  $(selection) {
      return this.shadowRoot && this.shadowRoot.querySelector(selection)
  }
  ```

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

* MUST be standalone with no external requirements. Common include library modules may be permitted however.
* MUST be useable in the majority of modern browsers. IE will not be supported.
* MUST use ES6+. Maxumum JavaScript version should be 2 years behind the leading edge and only features supported by the majority of mainstream browsers are allowed. Other features MAY be permitted as long as they are optional and do not produce errors.
* MUST be linted using ESLINT. SHOULD use JavaScript Standard format.
* MUST self-register the custom tag using `customElements.define`.
* MUST use a Class name using a _CamelCase_ version of the component name with an initial upper-case letter (e.g. `syntax-highlight` will be `export default class SyntaxHighlight extends HTMLElement { ... }` ).
  
* SHOULD have a `<slot>` to allow nested rich content (where it makes sense).
* SHOULD export a _camelCase_ version of the component-name which contains any useful methods and data. (e.g. `syntax-highlight` should export `syntaxHighlight`).
* SHOULD meet the [Web Components Gold Standard](https://github.com/webcomponents/gold-standard/wiki).