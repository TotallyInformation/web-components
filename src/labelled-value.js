/** A zero dependency custom web component that displays a value with a label
 * Version: See the class code
 **/
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
 **/

/** TODO
 * - Not accessible
 * - Partially complete - Needs colour/formatting controls
 * - Needs managed var and uib integration
 * - Allow HTML (via html attribute)
 */

import TiBaseComponent from '../libs/ti-base-component'

/** Only use a template if you want to isolate the code and CSS */
const template = document.createElement('template')
template.innerHTML = /*html*/`
    <style>
        :host {
            --label-before: '';
            --label-after: ':';
            --output-before: '';
            --output-after: '';
            --width: 100%;
            --label-flex: 1;
            --output-flex: 1;
            --label-align: left;
            --output-align: right;
            --label-font: '';
            --output-font: '';

            display: flex;   /* default is inline */
            contain: content; /* performance boost */
            flex-flow: row nowrap;
            width: var(--width);
            flex-direction: row;
        }
        label {
            flex-grow: var(--label-flex);
            flex-shrink: var(--label-flex);
            text-align: var(--label-align);
            font: var(--label-font);
        }
        label::before {
            content: var(--label-before);
        }
        label::after {
            content: var(--label-after);
        }
        output {
            flex-grow: var(--output-flex);
            flex-shrink: var(--output-flex);
            text-align: var(--output-align);
            font: var(--output-font);
        }
        output::before {
            content: var(--output-before);
        }
        output::after {
            content: var(--output-after);
        }
        /* Small screen (37.5em @ 16pt is about 600px) */
        @media all and (max-width: 37.5em) {
            :host {
                /* On small screens, we are no longer using row direction but column */
                flex-direction: column;
                --output-align: var(--label-align);
            }
        }
    </style>
    <!--<div id="label"></div>-->
    <!--<div id="value" class="value" aria-labelledby="label"></div>-->
    <label></label>
    <output></output>
    <div><slot></slot></div>
`

/** Namespace
 * @namespace Beta
 */

// Define the class and make it the default export
/**
 * @class
 * @augments TiBaseComponent
 * @description A zero dependency custom web component that displays a value with a label
 *
 * @element labelled-value
 * @memberOf Beta

 * METHODS FROM BASE: (see TiBaseComponent)
 * STANDARD METHODS:
  * @function attributeChangedCallback Called when an attribute is added, removed, updated or replaced
  * @function connectedCallback Called when the element is added to a document
  * @function constructor Construct the component
  * @function disconnectedCallback Called when the element is removed from a document

 * OTHER METHODS:
  * None

 * CUSTOM EVENTS:
  * "component-template:connected" - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
  * "component-template:ready" - Alias for connected. The instance can handle property & attribute changes
  * "component-template:disconnected" - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
  * "component-template:attribChanged" - When a watched attribute changes. `evt.details.data` contains the details of the change.
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

 * @slot Container contents

 * See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc
 */
class LabelledValue extends TiBaseComponent {
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
            'label', 'value',
        ]
    }

    /** PRIVATE. Internal version of the label text to show on the label tag @type {string|undefined} */
    #label = undefined
    /** PRIVATE. Internal version of the value to show on the output tag @type {any} */
    #value = undefined
    /** PRIVATE. Reference to the label tag @type {HTMLLabelElement} */
    #labelEl
    /** PRIVATE. Reference to the output tag @type {HTMLOutputElement} */
    #outputEl
    /** PRIVATE. Reference to the slot tag @type {HTMLSlotElement} */
    #slotEl
    /** If true, keeps the slot content when the value changes */
    'keep-slot'

    /** Set the value to show */
    set value(val) {
        if (val === null) return
        if (val === this.#value) return

        this.#value = val
        this.#outputEl.textContent = val
        this.setAttribute('value', val)
    }

    /** Get the current shown value */
    get value() {
        return this.#value
    }

    /** Set the label to show */
    set label(val) {
        if (val === null) return
        if (val === this.#label) return

        this.#label = val
        this.#labelEl.textContent = val
        // this.setAttribute('label', val)
    }

    /** Get the current shown label */
    get label() {
        return this.#label
    }

    /** NB: Attributes not available here - use connectedCallback to reference */
    constructor() {
        super()
        // Only attach the shadow dom if code and style isolation is needed - comment out if shadow dom not required
        if (template && template.content) this._construct(template.content.cloneNode(true))

        this.#outputEl = this.shadowRoot.querySelector('output')
        this.#labelEl = this.shadowRoot.querySelector('label')
        this.#slotEl =  this.shadowRoot.querySelector('slot')
    }

    /** Runs when an instance is added to the DOM */
    connectedCallback() {
        this._connect() // Keep at start.

        this['keep-slot'] =  this.getAttribute('keep-slot')
        this.label =  this.getAttribute('label')
        this.value =  this.getAttribute('value')

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
        if (!this.connected) return

        // Don't bother if the new value same as old
        if ( oldVal === newVal ) return
        // Create a property from the value - WARN: Be careful with name clashes
        this[attrib] = newVal

        // Add other dynamic attribute processing here.
        // If attribute processing doesn't need to be dynamic, process in connectedCallback as that happens earlier in the lifecycle

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
