/** Define a new zero dependency custom web component ECMA module that can be used as an HTML tag
 *
 * For better formatting of HTML in template strings, use VSCode's "ES6 String HTML" extension
 *
 * Version: See the class code
 *
 */
/** Copyright (c) 2025-2025 Julian Knight (Totally Information)
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

import TiBaseComponent from '../libs/ti-base-component'

/** TODO/IDEAS
 * - Add a check to disuade people from using >1 <h1-title> on a page
 * - Use a MutationObserver to watch for changes to the <slot> content and update the h1 class if needed
 */

/** Only use a template if you want to isolate the code and CSS using the Shadow DOM */
const template = document.createElement('template')
template.innerHTML = /*html*/`
    <style>
        :host {
            display: block;   /* default is inline */
            contain: content; /* performance boost */
        }
        /* Apply to headings where you want a sub-title */
        .with-subtitle {
            margin-bottom: 0;
        }
        /* Add the subtitle as a div with the Aria role */
        [role="doc-subtitle"] {
            display: block;
            font-size: smaller;
            font-style: italic;
            margin-top: 0;
            margin-bottom: 1em;
        }
    </style>
    <h1></h1>
    <slot></slot>
`
/** Only use this if using Light DOM but want scoped styles */
// const styles = `
//     h1-title {
//         /* Scoped to this component */
//     }
// `

/** Namespace
 * @namespace Live
 */

/**
 * @class
 * @augments TiBaseComponent
 * @description Define a new zero dependency custom web component ECMA module that can be used as an HTML tag
 *
 * @element h1-title
 * @memberOf Live
 * @license Apache-2.0

 * METHODS FROM BASE: (see TiBaseComponent)
 * STANDARD METHODS:
  * @function attributeChangedCallback Called when an attribute is added, removed, updated or replaced
  * @function connectedCallback Called when the element is added to a document
  * @function constructor Construct the component
  * @function disconnectedCallback Called when the element is removed from a document

 * OTHER METHODS:
  * None

 * CUSTOM EVENTS:
  * "h1-title:connected" - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
  * "h1-title:ready" - Alias for connected. The instance can handle property & attribute changes
  * "h1-title:disconnected" - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
  * "h1-title:attribChanged" - When a watched attribute changes. `evt.details.data` contains the details of the change.
  * NOTE that listeners can be attached either to the `document` or to the specific element instance.

 * Standard watched attributes (common across all my components):
  * @property {string|boolean} inherit-style - Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load.
  * @property {string} name - Optional. HTML name attribute. Included in output _meta prop.

 * Other watched attributes:
  * None

 * PROPS FROM BASE: (see TiBaseComponent)
 * OTHER STANDARD PROPS:
  * @property {string} componentVersion Static. The component version string (date updated). Also has a getter that returns component and base version strings.

 * Other props:
  * By default, all attributes are also created as properties

 NB: properties marked with 💫 are dynamic and have getters/setters.

 * @slot Container contents

 * @example
  * <h1-title name="myComponent" inherit-style="./myComponent.css"></h1-title>

 * See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc
 */
class H1Title extends TiBaseComponent {
    /** Component version */
    static componentVersion = '2025-06-09'

    /** Makes HTML attribute change watched
     * @returns {Array<string>} List of all of the html attribs (props) listened to
     */
    static get observedAttributes() {
        return [
            // Standard watched attributes:
            'inherit-style', 'name',
            // Other watched attributes:
        ]
    }

    /** NB: Attributes not available here - use connectedCallback to reference */
    constructor() {
        super()
        // Only attach the shadow dom if code and style isolation is needed - comment out if shadow dom not required
        if (template && template.content) this._construct(template.content.cloneNode(true))
        // Otherwise, if component styles are needed, use the following instead:
        // this.prependStylesheet(styles, 0)

        this.h1 = this.shadowRoot.querySelector('h1') || this.querySelector('h1')
    }

    /** Runs when an instance is added to the DOM
     * Runs AFTER the initial attributeChangedCallback's
     * @private
     */
    connectedCallback() {
        this._connect() // Keep at start.

        // Replace h1 innerText with the content of the title tag from the document head
        const pgName = location.pathname.split('/').pop()
        const title = document.querySelector('title')
        if (title) {
            this.h1.innerText = title.innerText || title.textContent || pgName
        } else {
            // set to the name of the URL
            this.h1.innerText = pgName
        }

        // If the <slot> has any content, add class="with-subtitle" to the h1
        if (this.hasSlotContent()) {
            this.h1.classList.add('with-subtitle')
            // and add role attribute with value "doc-subtitle" to the slot element
            const slot = this.shadowRoot.querySelector('slot') || this.querySelector('slot')
            if (slot) {
                slot.setAttribute('role', 'doc-subtitle')
            }
        } else {
            this.h1.classList.remove('with-subtitle')
        }

        this._ready() // Keep at end. Let everyone know that a new instance of the component has been connected & is ready
    }

    /** Runs when an instance is removed from the DOM
     * @private
     */
    disconnectedCallback() {
        this._disconnect() // Keep at end.
    }

    /** Runs when an observed attribute changes - Note: values are always strings
     * NOTE: On initial startup, this is called for each watched attrib set in HTML.
     *       and BEFORE connectedCallback is called.
     * @param {string} attrib Name of watched attribute that has changed
     * @param {string} oldVal The previous attribute value
     * @param {string} newVal The new attribute value
     * @private
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

        // Keep at end. Let everyone know that an attribute has changed for this instance of the component
        this._event('attribChanged', { attribute: attrib, newVal: newVal, oldVal: oldVal, })
    }
} // ---- end of Class ---- //

// Make the class the default export so it can be used elsewhere
export default H1Title

/** Self register the class to global
 * Enables new data lists to be dynamically added via JS
 * and lets the static methods be called
 */
window['H1Title'] = H1Title

// Self-register the HTML tag
customElements.define('h1-title', H1Title)
