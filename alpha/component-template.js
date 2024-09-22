/** Define a new zero dependency custom web component ECMA module that can be used as an HTML tag
 *
 * TO USE THIS TEMPLATE: CHANGE ALL INSTANCES OF 'ComponentTemplate' and 'component-template'
 * For better formatting of HTML in template strings, use VSCode's "ES6 String HTML" extension
 *
 * Version: See the class code
 *
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
`

/** Namespace
 * @namespace Alpha
 */

/**
 * @class
 * @extends TiBaseComponent
 * @description Define a new zero dependency custom web component ECMA module that can be used as an HTML tag
 *
 * @element component-template
 * @memberOf Alpha

 * METHODS FROM BASE:
 * @method config Update runtime configuration, return complete config
 * @method createShadowSelectors Creates the jQuery-like $ and $$ methods
 * @method deepAssign Object deep merger
 * @method doInheritStyles If requested, add link to an external style sheet
 * @method ensureId Adds a unique ID to the tag if no ID defined.
 * @method _uibMsgHandler If UIBUILDER for Node-RED is active, auto-handle incoming messages targetted at instance id

 * OTHER METHODS:
 * None

 * @fires component-template:connected - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
 * @fires component-template:disconnected - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
 * @fires component-template:attribChanged - When a watched attribute changes. `evt.details` contains the details of the change.
 * NOTE that listeners can be attached either to the `document` or to the specific element instance.

 * Standard watched attributes (common across all my components):
 * @attr {string|boolean} inherit-style - Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load.

 * Other watched attributes:
 * None

 * Standard props (common across all my components):
 * @prop {boolean} uib True if UIBUILDER for Node-RED is loaded. In base class
 * @prop {function(string): Element} $ jQuery-like shadow dom selector. In base class
 * @prop {function(string): NodeList} $$  jQuery-like shadow dom multi-selector. In base class
 * @prop {number} _iCount The component version string (date updated). In base class
 * @prop {object} opts This components controllable options - get/set using the `config()` method. In base class
 *
 * @prop {string} version Static. The component version string (date updated). Also has a getter.

 * Other props:
 * By default, all attributes are also created as properties

 * @slot Container contents

 * See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc
 */
class ComponentTemplate extends TiBaseComponent {
    /** Component version */
    static version = '2024-09-22'

    /** Makes HTML attribute change watched
     * @returns {Array<string>} List of all of the html attribs (props) listened to
     */
    static get observedAttributes() {
        return [
            // Standard watched attributes:
            'inherit-style',
            // Other watched attributes:
        ]
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

        // OPTIONAL. Listen for a uibuilder msg that is targetted at this instance of the component
        if (this.uib) document.addEventListener(`uibuilder:msg:_ui:update:${this.id}`, this._uibMsgHandler.bind(this) )

        // Keep at end. Let everyone know that a new instance of the component has been connected
        this.dispatchEvent(new CustomEvent(`${this.localName}:connected`, {
            bubbles: true,
            composed: true,
            detail: {
                id: this.id,
                name: this.name
            },
        } ) )
    }

    /** Runs when an instance is removed from the DOM */
    disconnectedCallback() {
        // @ts-ignore Remove optional uibuilder event listener
        document.removeEventListener(`uibuilder:msg:_ui:update:${this.id}`, this._uibMsgHandler )

        // Keep at end. Let everyone know that an instance of the component has been disconnected
        this.dispatchEvent(new CustomEvent(`${this.localName}:disconnected`, {
            bubbles: true,
            composed: true,
            detail: {
                id: this.id,
                name: this.name
            },
        } ) )
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
        this.dispatchEvent(new CustomEvent(`${this.localName}:attribChanged`, {
            bubbles: true,
            composed: true,
            detail: {
                id: this.id,
                name: this.name,
                attribute: attrib,
                newVal: newVal,
                oldVal: oldVal,
            }
        } ) )
    }
} // ---- end of Class ---- //

// Make the class the default export so it can be used elsewhere
export default ComponentTemplate

/** Self register the class to global
 * Enables new data lists to be dynamically added via JS
 * and lets the static methods be called
 */
window['ComponentTemplate'] = ComponentTemplate

// Self-register the HTML tag
customElements.define('component-template', ComponentTemplate)
