/** Zero dependency web component to load HTML/JSON dynamically
 * Version: See the class code
 * See https://github.com/justinfagnani/html-include-element for inspiration
 */
/** Copyright (c) 2022-2025 Julian Knight (Totally Information)
 * https://it.knightnet.org.uk, https://github.com/TotallyInformation
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** TODO
 * - Allow scripts to work on imports
 * - Check if styles work on html import
 * - optional load to template?
 * - Test dynamic changes to src
 */

import TiBaseComponent from '../libs/ti-base-component'

/** Only use a template if you want to isolate the code and CSS */
const template = document.createElement('template')
template.innerHTML = /*html*/`
    <style>
        :host {
            display: block;   /* default is inline */
            contain: content; /* performance boost */
        }
        pre {
            font-family: Consolas, "ui-monospace", "Lucida Console", monospace;
            white-space: pre;
            margin: 0;
        }
        .key {color:#ffbf35}
        .string {color:#5dff39;}
        .number {color:#70aeff;}
        .boolean {color:#b993ff;}
        .null {color:#93ffe4;}
        .undefined {color:#ff93c9;}
    </style>
    <slot></slot>
    <inner-load></inner-load>
`

/** Namespace
 * @namespace Live
 */

/**
 * @class
 * @augments TiBaseComponent
 * @description A zero dependency custom web component ECMA module that imports HTML from an external resource.
 *   The src attribute defines the resource to load. The resource can be dynamically changed either by changing
 *   the src attribute OR by getting a reference to the instance and changing the src property.
 *
 * @element html-include
 * @memberOf Live

 * METHODS FROM BASE:
  * @function config Update runtime configuration, return complete config
  * @function createShadowSelectors Creates the jQuery-like $ and $$ methods
  * @function deepAssign Object deep merger
  * @function doInheritStyles If requested, add link to an external style sheet
  * @function ensureId Adds a unique ID to the tag if no ID defined.
  * @function _uibMsgHandler Not yet in use
  * @function _event (name,data) Standardised custom event dispatcher

 * OTHER METHODS:
  * @function doInclude(url) Replaces the shadow dom content with the imported HTML.
  * @function highlight(json) [Static] Return a formatted HTML version of JSON object

 * CUSTOM EVENTS:
  * "html-include:connected" - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
  * "html-include:ready" - Alias for connected. The instance can handle property & attribute changes
  * "html-include:disconnected" - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
  * "html-include:attribChanged" - When a watched attribute changes. `evt.details` contains the details of the change.
  * "html-include:content-loaded" - When the src has been loaded and inserted into the DOM. `evt.details` contains the details of the change.
  * NOTE that listeners can be attached either to the `document` or to the specific element instance.

 * Standard watched attributes (common across all my components):
  * @property {string|boolean} inherit-style - Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load.
  * @property {string} name - Optional. HTML name attribute. Included in output _meta prop.

 * Other watched attributes:
  * @property {string} src - URL of the source to include

 * PROPS FROM BASE: (see TiBaseComponent)
 * OTHER STANDARD PROPS:
  * @property {string} componentVersion Static. The component version string (date updated). Also has a getter that returns component and base version strings.

 * Other props:
  * @property {string} url The URL to load. Reflected to/from the src attribute.
  * By default, all attributes are also created as properties

 * @slot Container contents

 * See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc
 */
class HtmlInclude extends TiBaseComponent {
    /** Component version */
    static componentVersion = '2025-02-25'

    /** Makes HTML attribute change watched
     * @returns {Array<string>} List of all of the html attribs (props) listened to
     */
    static get observedAttributes() {
        return [
            // Standard watched attributes:
            'inherit-style', 'name',
            // Other watched attributes:
            'src',
        ]
    }

    /** Content type of the imported resource
     * @type {"text"|"html"|"json"|"form"}
     */
    contentType = 'text'
    text = ''
    json = {}

    /** The URL to fetch an HTML document from. Allows change via instance prop as well as attribute change.
     *  Setting this property causes a fetch the HTML from the URL.
     *  We are reflecting the src attrib and the src prop.
     * @returns {URL|string} The content of the src attribute
     */
    get src() {
        return this.getAttribute('src')
    }

    /** Reflect src property to the src attribute
     * @param {string} value The URL to set
     */
    set src(value) {
        this.setAttribute('src', value)
    }

    /** NB: Attributes not available here - use connectedCallback to reference */
    constructor() {
        super()
        // Only attach the shadow dom if code and style isolation is needed - comment out if shadow dom not required
        if (template && template.content) this._construct(template.content.cloneNode(true))
    }

    /** Runs when an instance is added to the DOM */
    connectedCallback() {
        this._connect() // Keep at start.

        this._ready() // Keep at end. Let everyone know that a new instance of the component has been connected & is ready
    }

    /** Runs when an instance is removed from the DOM */
    disconnectedCallback() {
        this._disconnect() // Keep at end.
    }

    /** Runs when an observed attribute changes - Note: values are always strings
     * @param {string} attrib Name of watched attribute that has changed
     * @param {string} oldVal The previous attribute value
     * @param {string} newVal The new attribute value
     */
    attributeChangedCallback(attrib, oldVal, newVal) {
        /** Optionally ignore attrib changes until instance is fully connected
         * Otherwise this can fire BEFORE everthing is fully connected.
         */
        // if (!this.connected) return

        // Don't bother if the new value same as old
        if ( oldVal === newVal ) return
        // Create a property from the value - WARN: Be careful with name clashes
        this[attrib] = newVal

        // Add other dynamic attribute processing here.
        // If attribute processing doesn't need to be dynamic, process in connectedCallback as that happens earlier in the lifecycle

        // We are allowing src to be change dynamically both by attrib change AND by instance property change.
        if (attrib === 'src') {
            if (newVal) {
                this.doInclude(newVal)
            } else {
                console.error('[html-include] src attribute cannot be empty.')
            }
        }

        // Keep at end. Let everyone know that an attribute has changed for this instance of the component
        this._event('attribChanged', { attribute: attrib, newVal: newVal, oldVal: oldVal, })
    }

    /** Replaces the shadow dom content with the imported HTML.
     * @param {URL|string} url URL of the resource to import
     */
    async doInclude(url) {
        if (!url) {
            console.error('[html-include] Cannot fetch empty string.')
            return
        }

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`[html-include] Fetch of url "${url}" failed: ${response.statusText}`)
        }

        const contentType = response.headers.get('content-type')
        if (contentType) {
            if (contentType.includes('text/html')) {
                this.contentType = 'html'
            } else if (contentType.includes('application/json')) {
                this.contentType = 'json'
            } else if (contentType.includes('multipart/form-data')) {
                this.contentType = 'form'
            } else {
                this.contentType = 'text'
            }
        }

        // Could add other binary types here. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#body
        switch (this.contentType) {
            case 'html': {
                this.json = {}
                this.text = await response.text()
                const parser = new DOMParser()
                const newDoc = parser.parseFromString( this.text, 'text/html' )
                this.shadowRoot.removeChild(this.shadowRoot.lastElementChild)
                this.shadowRoot.appendChild(newDoc.body)
                break
            }

            case 'json': {
                this.json = await response.json()
                this.text = JSON.stringify(this.json, null, 2)
                this.shadowRoot.removeChild(this.shadowRoot.lastElementChild)
                // const myHtml = document.createElement('pre')
                // myHtml.textContent = this.text
                // this.shadowRoot.appendChild( myHtml )
                // @ts-ignore
                this.shadowRoot.appendChild(this.constructor.highlight(this.text))
                break
            }

            case 'form': {
                this.json = await response.formData()
                this.text = JSON.stringify(this.json)
                this.shadowRoot.removeChild(this.shadowRoot.lastElementChild)
                this.shadowRoot.append(this.text)
                break
            }

            case 'text':
            default: {
                this.json = {}
                this.text = await response.text()
                this.shadowRoot.append(this.text)
                break
            }
        }

        // Raise 'html-include:content-loaded' event to let everyone know that the content has been loaded
        this._event('content-loaded', { url: url, contentType: this.contentType, text: this.text, json: this.json, })
    }

    /** Return a formatted HTML version of JSON object
     * @param {object|JSON} json JSON object to convert
     * @returns {HTMLElement} Highlighted JSON wrapped in a `<pre>` tag
     */
    static highlight(json) {
        // json = JSON.stringify(json, undefined, 2)
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') // eslint-disable-line @stylistic/newline-per-chained-call
        json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            let cls = 'number'
            if ((/^"/).test(match)) {
                if ((/:$/).test(match)) {
                    cls = 'key'
                } else {
                    cls = 'string'
                }
            } else if ((/true|false/).test(match)) {
                cls = 'boolean'
            } else if ((/null/).test(match)) {
                cls = 'null'
            }
            return '<span class="' + cls + '">' + match + '</span>'
        })
        const myHtml = document.createElement('pre')
        myHtml.innerHTML = json
        return myHtml
    }
} // ---- end of Class ---- //

// Make the class the default export so it can be used elsewhere
export default HtmlInclude

/** Self register the class to global
 * Enables new data lists to be dynamically added via JS
 * and lets the static methods be called
 */
window['HtmlInclude'] = HtmlInclude

// Self-register the HTML tag
customElements.define('html-include', HtmlInclude)
