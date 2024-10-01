/** A zero dependency custom web component that displays a value with a label
 * Version: See the class code
 **/
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
 * - Should be using label and computed, not divs
 * - Not accessible
 * - Needs CSS control vars
 * - Needs colour/formatting controls
 * - Needs virt/horizontal option
 * - Needs media width control
 * - Needs managed var and uib integration
 * - Allow HTML (via html attribute)
 */

import TiBaseComponent from '../libs/ti-base-component'

/** Only use a template if you want to isolate the code and CSS */
const template = document.createElement('template')
template.innerHTML = /*html*/`
    <style>
        :host {
            display: flex;   /* default is inline */
            flex-flow: row nowrap;
            width: 100%;
            contain: content; /* performance boost */
        }
        label, output {
            flex-grow: 1;
            flex-shrink: 1;
        }
        label:after {
            content: ':';
        }
        output {
            text-align: right;
        }
    </style>
    <!--<div id="label"></div>-->
    <!--<div id="value" class="value" aria-labelledby="label"></div>-->
    <label></label>
    <output></output>
    <slot></slot>
`

/** Namespace
 * @namespace Alpha
 */

// Define the class and make it the default export
/**
 * @class
 * @extends TiBaseComponent
 * @description A zero dependency custom web component that displays a value with a label
 *
 * @element labelled-value
 * @memberOf Alpha

 * METHODS FROM BASE:
 * @method config Update runtime configuration, return complete config
 * @method createShadowSelectors Creates the jQuery-like $ and $$ methods
 * @method deepAssign Object deep merger
 * @method doInheritStyles If requested, add link to an external style sheet
 * @method ensureId Adds a unique ID to the tag if no ID defined.
 * @method _uibMsgHandler Not yet in use
 * @method _event(name,data) Standardised custom event dispatcher
 * @method _ready Call from end of connectedCallback. Sets connected prop and outputs events

 * OTHER METHODS:
 * None

 * @fires labelled-value:connected - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
 * @fires component-template:ready - Alias for connected. The instance can handle property & attribute changes
 * @fires labelled-value:disconnected - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
 * @fires labelled-value:attribChanged - When a watched attribute changes. `evt.details` contains the details of the change.
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
 * @prop {boolean} connected False until connectedCallback finishes
 * @prop {string} name Placeholder for the optional name attribute
 * @prop {object} opts This components controllable options - get/set using the `config()` method
 *
 * @prop {string} version Static. The component version string (date updated). Also has a getter that returns component and base version strings.

 * Other props:
 * By default, all attributes are also created as properties

 * @slot Container contents

 * See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc
 */
class LabelledValue extends TiBaseComponent {
    /** Component version */
    static version = '2024-09-29'

    /** Makes HTML attribute change watched
     * @returns {Array<string>} List of all of the html attribs (props) listened to
     */
    static get observedAttributes() {
        return [
            // Standard watched attributes:
            'inherit-style', 'name',
            // Other watched attributes:
            'label', 'value', 'var',
        ]
    }

    /** PRIVATE. Internal version of the label text to show on the label tag */
    #label = undefined
    /** PRIVATE. Internal version of the value to show on the output tag */
    #value = undefined
    /** PRIVATE. Reference to the label tag */
    #labelEl
    /** PRIVATE. Reference to the output tag */
    #outputEl

    /** Set the value to show */
    set value(val) {
        this.#value = val
        this.#outputEl.textContent = val
    }

    /** Get the current shown value */
    get value() {
        return this.#value
    }

    /** Set the label to show */
    set label(val) {
        this.#label = val
        this.#labelEl.textContent = val
    }

    /** Get the current shown label */
    get label() {
        return this.#label
    }

    /** NB: Attributes not available here - use connectedCallback to reference */
    constructor() {
        super()
        // Only attach the shadow dom if code and style isolation is needed - comment out if shadow dom not required
        this._construct(template.content.cloneNode(true))

        this.#outputEl = this.shadowRoot.querySelector('output')
        this.#labelEl = this.shadowRoot.querySelector('label')
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

    // Runs when an observed attribute changes - Note: values are always strings
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

        switch (attrib) {
            case 'var': {
                console.log('var changed: ', newVal, window[newVal], Object.getOwnPropertyDescriptor(window, newVal))
                // @ts-ignore
                if (window[newVal]) this.shadowRoot.querySelector('output').textContent = window[newVal]
                // Use Object.defineProperty to replace the setter for the existing variable
                const that = this
                // Doh! this can't be undone!
                Object.defineProperty(window, newVal, {
                    get() {
                        return this[`_${newVal}`]
                    },
                    set(value) {
                        console.log(`Setting '${newVal}' to: ${value}`)
                        that.#outputEl.textContent = value
                        // Prevent recursion
                        this[`_${newVal}`] = value
                    },
                    configurable: true // Ensures the property remains configurable
                })
                break
            }

            default: {
                break
            }
        }

        // Keep at end. Let everyone know that an attribute has changed for this instance of the component
        this._event('attribChanged', { attribute: attrib, newVal: newVal, oldVal: oldVal })
    }
} // ---- end of Class ---- //

// Make the class the default export so it can be used elsewhere
export default LabelledValue

/** Self register the class to global
 * Enables new data lists to be dynamically added via JS
 * and lets the static methods be called
 */
window['LabelledValue'] = LabelledValue

// Self-register the HTML tag
customElements.define('labelled-value', LabelledValue)
