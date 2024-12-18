/** Zero dependency web component to load HTML/JSON dynamically
 * Version: See the class code
 * See https://github.com/justinfagnani/html-include-element for inspiration
 */
/** Copyright (c) 2022-2024 Julian Knight (Totally Information)
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
 **/

/** TODO
 * - Allow scripts to work on imports
 * - Check if styles work on html import
 * - JSON load to global var?
 * - optional load to template?
 * - Maybe: add syntax highlights for json
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
    </style>
    <slot></slot>
    <inner-load></inner-load>
`

/** Namespace
 * @namespace Beta
 */

/**
 * @class
 * @extends TiBaseComponent
 * @description A zero dependency custom web component ECMA module that imports HTML from an external resource.
 *   The src attribute defines the resource to load. The resource can be dynamically changed either by changing
 *   the src attribute OR by getting a reference to the instance and changing the src property.
 *
 * @element html-include
 * @memberOf Beta

 * METHODS FROM BASE:
 * @method config Update runtime configuration, return complete config
 * @method createShadowSelectors Creates the jQuery-like $ and $$ methods
 * @method deepAssign Object deep merger
 * @method doInheritStyles If requested, add link to an external style sheet
 * @method ensureId Adds a unique ID to the tag if no ID defined.
 * @method _uibMsgHandler Not yet in use
 * @method _event(name,data) Standardised custom event dispatcher

 * OTHER METHODS:
 * @method doInclude(url) Replaces the shadow dom content with the imported HTML.

 * @fires html-include:connected - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
 * @fires component-template:ready - Alias for connected. The instance can handle property & attribute changes
 * @fires html-include:disconnected - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
 * @fires html-include:attribChanged - When a watched attribute changes. `evt.details` contains the details of the change.
 * NOTE that listeners can be attached either to the `document` or to the specific element instance.

 * Standard watched attributes (common across all my components):
 * @attr {string|boolean} inherit-style - Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load.
 * @attr {string} name - Optional. HTML name attribute. Included in output _meta prop.

 * Other watched attributes:
 * @attr {string} src - URL of the source to include

 * Standard props (common across all my components):
 * @prop {number} _iCount Static. The component version string (date updated)
 * @prop {boolean} uib True if UIBUILDER for Node-RED is loaded
 * @prop {function(string): Element} $ jQuery-like shadow dom selector
 * @prop {function(string): NodeList} $$  jQuery-like shadow dom multi-selector
 * @prop {string} name Placeholder for the optional name attribute
 * @prop {object} opts This components controllable options - get/set using the `config()` method
 *
 * @prop {string} version Static. The component version string (date updated). Also has a getter that returns component and base version strings.

 * Other props:
 * @prop {string} url The URL to load. Reflected to/from the src attribute.
 * By default, all attributes are also created as properties

 * @slot Container contents

 * See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc
 */
class HtmlInclude extends TiBaseComponent {
    /** Component version */
    static componentVersion = '2024-10-06'

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

    constructor() {
        super()

        this.attachShadow({ mode: 'open', delegatesFocus: true })
            // Only append the template if code and style isolation is needed
            .append(template.content.cloneNode(true))

        // jQuery-like selectors but for the shadow. NB: Returns are STATIC not dynamic lists
        this.createShadowSelectors()  // in base class
    }

    /** Runs when an instance is added to the DOM */
    connectedCallback() {
        // Make sure instance has an ID. Create an id from name or calculation if needed
        this.ensureId()  // in base class
        // Apply parent styles from a stylesheet if required - only required if using an applied template
        this.doInheritStyles()  // in base class

        // OPTIONAL. Listen for a uibuilder msg that is targetted at this instance of the component
        if (this.uib) document.addEventListener(`uibuilder:msg:_ui:update:${this.id}`, this._uibMsgHandler.bind(this) )

        // Keep at end. Let everyone know that a new instance of the component has been connected
        this._event('connected')
        this._event('ready')
    }

    /** Runs when an instance is removed from the DOM */
    disconnectedCallback() {
        // @ts-ignore Remove optional uibuilder event listener
        document.removeEventListener(`uibuilder:msg:_ui:update:${this.id}`, this._uibMsgHandler )

        // Keep at end. Let everyone know that an instance of the component has been disconnected
        this._event('disconnected')
    }

    /** Runs when an observed attribute changes - Note: values are always strings
     * @param {string} attrib Name of watched attribute that has changed
     * @param {string} oldVal The previous attribute value
     * @param {string} newVal The new attribute value
     */
    attributeChangedCallback(attrib, oldVal, newVal) {
        // Don't bother if the new value same as old
        if ( oldVal === newVal ) return

        // We are allowing src to be change dynamically both by attrib change AND by instance property change.
        if (attrib === 'src') {
            if (newVal) {
                this.doInclude(newVal)
            } else {
                console.error('[html-include] src attribute cannot be empty.')
            }
        }

        // Keep at end. Let everyone know that an attribute has changed for this instance of the component
        this._event('attribChanged', { attribute: attrib, newVal: newVal, oldVal: oldVal })
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
                this.text = JSON.stringify(this.json, null, 4)
                this.shadowRoot.removeChild(this.shadowRoot.lastElementChild)
                const myHtml = document.createElement('pre')
                myHtml.textContent = this.text
                this.shadowRoot.appendChild( myHtml )
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