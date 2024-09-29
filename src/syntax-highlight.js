/** Zero dependency web component to show a JavaScript object as a highlighted box in the UI
 *
 * Version: See the class code
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

/** To Do
 * - Use highlighter from visible-console
 */

import TiBaseComponent from '../libs/ti-base-component'

/** Only use a template if you want to isolate the code and CSS */
const template = document.createElement('template')
template.innerHTML = /*html*/`
    <style>
        :host {
            display: block;   /* default is inline */
            contain: content; /* performance boost */
            color:white;
            background-color:black;
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
            padding: 0.5rem;
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
    <pre><i>Waiting for data</i></pre>
`

/** Namespace
 * @namespace Beta
 */

/**
 * @class
 * @extends TiBaseComponent
 * @description Define a new zero dependency custom web component ECMA module that can be used as an HTML tag
 *
 * @element syntax-highlight
 * @memberOf Beta

 * @example Set the json property on the element
 *   const showMsg = document.getElementsByTagName('syntax-highlight')[0]
 *   showMsg.json({....})

 * METHODS FROM BASE:
 * @method config Update runtime configuration, return complete config
 * @method createShadowSelectors Creates the jQuery-like $ and $$ methods
 * @method deepAssign Object deep merger
 * @method doInheritStyles If requested, add link to an external style sheet
 * @method ensureId Adds a unique ID to the tag if no ID defined.
 * @method _uibMsgHandler Not yet in use
 * @method _event(name,data) Standardised custom event dispatcher

 * OTHER METHODS:
 * @method highlight Convert object to HTML

 * @fires syntax-highlight:connected - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
 * @fires component-template:ready - Alias for connected. The instance can handle property & attribute changes
 * @fires syntax-highlight:disconnected - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
 * @fires syntax-highlight:attribChanged - When a watched attribute changes. `evt.details` contains the details of the change.
 * NOTE that listeners can be attached either to the `document` or to the specific element instance.

 * Standard watched attributes (common across all my components):
 * @attr {string|boolean} inherit-style - Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load.
 * @attr {string} name - Optional. HTML name attribute. Included in output _meta prop.

 * Other watched attributes:
 * None

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
 * @prop {object|JSON|string} json JSON to convert
 * By default, all attributes are also created as properties

 * @slot Container contents

 * See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc
 */
class SyntaxHighlight extends TiBaseComponent {
    /** Component version */
    static version = '2024-09-29'

    jsonData = {}

    /** Makes HTML attribute change watched
     * @returns {Array<string>} List of all of the html attribs (props) listened to
     */
    static get observedAttributes() {
        return [
            // Standard watched attributes:
            'inherit-style', 'name',
            // Other watched attributes:
            'auto',
        ]
    }

    /** Element.json = {...} to show the json object
     * @param {Object|JSON|string} value JS Object or JSON string to show
     */
    set json(value) {
        if (typeof value === 'string') {
            try {
                value = JSON.parse(value)
            } catch (e) {
                console.warn(`[syntax-highlight] Could not parse string "${value}"`)
            }
        }
        this.jsonData = value

        // console.log(value, syntaxHighlight(value))
        this.shadowRoot.removeChild(this.shadowRoot.lastElementChild)
        // @ts-ignore
        this.shadowRoot.appendChild(this.constructor.highlight(value))
    }

    get json() {
        return this.jsonData
    }

    /** NB: Attributes not available here - use connectedCallback to reference */
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

        // this.addEventListener('new-msg', evt => {
        //     this.json = evt.detail
        // })

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
        // Create a property from the value - WARN: Be careful with name clashes
        this[attrib] = newVal

        // Add other dynamic attribute processing here.
        // If attribute processing doesn't need to be dynamic, process in connectedCallback as that happens earlier in the lifecycle

        // Keep at end. Let everyone know that an attribute has changed for this instance of the component
        this._event('attribChanged', { attribute: attrib, newVal: newVal, oldVal: oldVal })
    } // --- end of attributeChangedCallback --- //

    /** Return a formatted HTML version of JSON object
     * @param {object|JSON} json JSON object to convert
     * @returns {HTMLElement} Highlighted JSON wrapped in a `<pre>` tag
     */
    static highlight(json) {
        json = JSON.stringify(json, undefined, 4)
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number'
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
} // ---- End of SyntaxHighlight class ---- //

// Make the class the default export so it can be used elsewhere
export default SyntaxHighlight

/** Self register the class to global
 * Enables new data lists to be dynamically added via JS
 * and lets the static methods be called
 */
window['SyntaxHighlight'] = SyntaxHighlight

// Self-register the HTML tag
customElements.define('syntax-highlight', SyntaxHighlight)
