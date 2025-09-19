// @ts-nocheck
/** Define a new zero dependency custom web component ECMA module that can be used as an HTML tag
 *
 * NOTE: This file contains two components: labeledInput and InputGroup
 *       They are designed to work together but can be used separately.
 *
 * labeledInput provides a standardised labeled input field with built-in support for various
 *   input types and error messaging.
 * InputGroup serves as a container for grouping multiple input elements together.
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

import TiBaseComponent from '../../libs/ti-base-component'

const version = '2025-09-19'

/** Only use this if using Light DOM but want scoped styles */
const styles = /*css*/`
    input-group {
        display: block;
        
        /* Optional classes to change layout - pass down to children */
        &.above {
            --labeled-input-areas: "label" "input" "error";
            --labeled-input-columns: 1fr;
        }
        
        &.left {
            --labeled-input-areas: "label input" "error error";
            --labeled-input-justify: start;
            --labeled-input-columns: minmax(0, 1fr) 1.5fr;
        }
        
        &.right {
            --labeled-input-areas: "input label" "error error";
            --labeled-input-columns: minmax(0, 0.25fr) 2fr;
        }
        
        &.below {
            --labeled-input-areas: "input" "label" "error";
            --labeled-input-columns: 1fr;
        }
    }

    labeled-input {
        /* Default grid layout */
        display: grid;
        grid-template-areas: var(--labeled-input-areas, "label" "input" "error");
        align-items: center;
        row-gap: var(--input-grid-row-gap, var(--input-grid-gap, 0.5em));
        column-gap: var(--input-grid-column-gap, var(--input-grid-gap, 2em));
        justify-content: var(--labeled-input-justify, normal);
        grid-template-columns: var(--labeled-input-columns, 1fr);

        /* Optional classes to change layout when standalone */
        &.above {
            --labeled-input-areas: "label" "input" "error";
            --labeled-input-columns: 1fr;
        }
        &.left {
            --labeled-input-areas: "label input" "error error";
            --labeled-input-justify: start;
            --labeled-input-columns: minmax(0, 1fr) 1.5fr;
        }
        &.right {
            --labeled-input-areas: "input label" "error error";
            --labeled-input-columns: minmax(0, 0.25fr) 2fr;
        }
        &.below {
            --labeled-input-areas: "input" "label" "error";
            --labeled-input-columns: 1fr;
        }

        /* Element styles */
        & label {
            grid-area: label;
            font-weight: bold;
            line-height: 1.4;
            word-wrap: break-word;
            hyphens: auto;

            &:before {
                content: var(--label-before-content, '');
            }
            &:after {
                content: var(--label-after-content, '');
            }
        }
        
        & input {
            grid-area: input;
            border: 1px solid var(--text3);
            
            /* Better alignment for left/right layouts */
            /* :is(.left, .right) & {
                margin-top: 2px;
            } */
        }
        
        & input[type="checkbox"], & input[type="radio"] {
            justify-self: start;
            :is(.left) & {
                --labeled-input-columns: 2em auto;
            }
            :is(.right) & {
                justify-self: end;
                --labeled-input-columns: auto 2em;
            }
        }
        
        & error-message {
            display: none;
            grid-area: error;
            color: red;
            font-size: 0.9em;
        }
    }
`

/** Namespace
 * @namespace PreAlpha
 */

/**
 * @class
 * @augments TiBaseComponent
 * @description Define a new zero dependency custom web component ECMA module that can be used as an HTML tag.
 *   Provides a standardised labeled input field with built-in support for various input types and error messaging.
 *
 * @element labeled-input
 * @memberOf PreAlpha
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
  * "labeled-input:connected" - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
  * "labeled-input:ready" - Alias for connected. The instance can handle property & attribute changes
  * "labeled-input:disconnected" - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
  * "labeled-input:attribChanged" - When a watched attribute changes. `evt.details.data` contains the details of the change.
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
  * <labeled-input name="myComponent" inherit-style="./myComponent.css"></labeled-input>

 * See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc
 */
class labeledInput extends TiBaseComponent {
    /** Component version */
    static componentVersion = version

    /** Reference to the component's input element */
    elInput
    /** Reference to the component's label element */
    elLabel
    /** Reference to the component's error message element */
    elErrorMessage
    /** Holds the previous values of the component's properties */
    oldValues = {}

    /** Makes HTML attribute change watched
     * @returns {Array<string>} List of all of the html attribs (props) listened to
     */
    static get observedAttributes() {
        return [
            // Standard watched attributes:
            'inherit-style', 'name',
            // Other watched attributes:
            'type', 'value', 'placeholder', 'disabled', 'readonly', 'required',
            'min', 'max', 'minlength', 'maxlength', 'size', 'autocomplete',
            'autofocus', 'form', 'list', 'pattern', 'step', 'multiple',
        ]
    }

    /** NB: Attributes not available here - use connectedCallback to reference */
    constructor() {
        super()
        // Only attach the shadow dom if code and style isolation is needed - comment out if shadow dom not required
        // if (template && template.content) this._construct(template.content.cloneNode(true))
        // Otherwise, if component styles are needed, use the following instead:
        this.prependStylesheet(styles, 0)

        // this.#elInput = this.shadowRoot?.querySelector('input')

        // Move any existing children into the template's slot, replacing slot content
        const existingChildren = Array.from(this.childNodes)

        // Light DOM html
        this.innerHTML = /*html*/`
            <label for="input"></label>
            <input type="text" />
            <error-message></error-message>
        `

        // Retain a reference to the input element
        this.elInput = this.querySelector('input')
        this.elInput.id = `${this.id}-input`
        this.elInput.setAttribute('name', `${this.id}-input`)

        this.elLabel = this.getElementsByTagName('LABEL')[0]
        this.elLabel.setAttribute('for', this.elInput.id)
        if (existingChildren.length > 0) {
            this.elLabel.innerHTML = ''
            this.elLabel.append(...existingChildren)
        }

        this.elErrorMessage = this.querySelector('error-message')
    }

    /** Runs when an instance is added to the DOM
     * Runs AFTER the initial attributeChangedCallback's
     * @private
     */
    connectedCallback() {
        this._connect() // Keep at start.

        // if this has a <input-group> ancestor, use it's ID for the input name
        const parentGroup = this.closest('input-group')
        if (parentGroup && (parentGroup.id || parentGroup.name)) {
            this.elInput.setAttribute('name', parentGroup.id || parentGroup.name)
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
        // @ts-ignore Create a property from the value - WARN: Be careful with name clashes
        this[attrib] = newVal
        this.oldValues[attrib] = oldVal

        switch (attrib) {
            case 'inherit-style': {
                // Ignore here - handled in base class
                break
            }

            case 'type': {
                // TODO: Add special handling for buttons. Maybe radios and checkboxes too
                this._updateType(newVal)
                break
            }

            // Pass anything else through to the input element
            default: {
                this.elInput?.setAttribute(attrib, newVal)
                break
            }
        }

        // Add other dynamic attribute processing here.
        // If attribute processing doesn't need to be dynamic, process in connectedCallback as that happens earlier in the lifecycle

        // Keep at end. Let everyone know that an attribute has changed for this instance of the component
        this._event('attribChanged', { attribute: attrib, newVal: newVal, oldVal: oldVal, })
    }

    /** Updates the type attribute for the input element
     * @param {string} type The type attribute for the input element
     * @private
     */
    _updateType(type) {
        this.elInput?.setAttribute('type', type || 'text')
    }
} // ---- end of Class ---- //

/**
 * @class
 * @augments TiBaseComponent
 * @description Define a new zero dependency custom web component ECMA module that can be used as an HTML tag.
 *   Serves as a container for grouping multiple input elements together.
 *
 * @element input-group
 * @memberOf PreAlpha
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
  * "input-group:connected" - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
  * "input-group:ready" - Alias for connected. The instance can handle property & attribute changes
  * "input-group:disconnected" - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
  * "input-group:attribChanged" - When a watched attribute changes. `evt.details.data` contains the details of the change.
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
  * <input-group name="myComponent" inherit-style="./myComponent.css"></input-group>

 * See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc
 */
class InputGroup extends TiBaseComponent {
    /** Component version */
    static componentVersion = version

    /** Makes HTML attribute change watched
     * @returns {Array<string>} List of all of the html attribs (props) listened to
     */
    static get observedAttributes() {
        return [
            // Standard watched attributes:
            'inherit-style', 'name',
            // Other watched attributes:
            'type', 'title', 'frame-title', 'form-title',
        ]
    }

    /** NB: Attributes not available here - use connectedCallback to reference */
    constructor() {
        super()
        // Only attach the shadow dom if code and style isolation is needed - comment out if shadow dom not required
        // if (template && template.content) this._construct(template.content.cloneNode(true))
        // Otherwise, if component styles are needed, use the following instead:
        // this.prependStylesheet(styles, 0) // <= Done in the labeled-input component
    }

    /** Runs when an instance is added to the DOM
     * Runs AFTER the initial attributeChangedCallback's
     * @private
     */
    connectedCallback() {
        this._connect() // Keep at start.

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

        switch (attrib) {
            case 'type': {
                this._updateType(newVal)
                break
            }

            case 'title':
            case 'frame-title':
            case 'form-title': {
                this._updateTitle(newVal)
                break
            }

            default: {
                // Nothing to do here yet
                break
            }
        }

        // Add other dynamic attribute processing here.
        // If attribute processing doesn't need to be dynamic, process in connectedCallback as that happens earlier in the lifecycle

        // Keep at end. Let everyone know that an attribute has changed for this instance of the component
        this._event('attribChanged', { attribute: attrib, newVal: newVal, oldVal: oldVal, })
    }

    _updateType(type) {
        if (!type) return

        // Move any existing children into the template's slot, replacing slot content
        const existingChildren = Array.from(this.childNodes)

        if (['fieldset', 'frame'].includes(type)) {
            // Light DOM html
            this.innerHTML = /*html*/`
                <fieldset title="">
                    <legend></legend>
                </fieldset>
            `
            this.elFrame = this.querySelector('fieldset')
        } else if (type === 'form') {
            this.innerHTML = /*html*/`
                <form title="">
                    <div></div>
                </form>
            `
            this.elFrame = this.querySelector('form')
        }

        if (this.elFrame && existingChildren.length > 0) {
            this.elFrame.append(...existingChildren)
        }
    }

    _updateTitle(title) {
        if (!title || !this.elFrame) return
        this.title = title
        const el = this.elFrame.querySelector('div') || this.elFrame.querySelector('legend')
        // const el = this.elFrame.querySelector('legend, div')
        console.log('el', el, this.elFrame)
        el.innerText = title
    }
} // ---- end of Class ---- //

// Make the class the default export so it can be used elsewhere
export default labeledInput
export { labeledInput, InputGroup }

/** Self register the class to global
 * Enables new data lists to be dynamically added via JS
 * and lets the static methods be called
 */
window['labeledInput'] = labeledInput
window['InputGroup'] = InputGroup

// Self-register the HTML tag
customElements.define('labeled-input', labeledInput)
customElements.define('input-group', InputGroup)
