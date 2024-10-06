/** Define a new zero dependency custom web component ECMA module that can be used as an HTML tag
 *
 * Version: See the class code
 *
 **/
/** Copyright (c) 2024-2024 Julian Knight (Totally Information)
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
 * - Add a host attrib or class to allow sections to be pre-hidden (add to the hx tag?)
 *   - sub-option to store collapsed sections in browser storage (probably needs ID's to be added to all heads and wrappers)
 * - Maybe add another option to make headings auto-numbered?
 * - Add option for an icon
 * - How to ignore outer div (as delivered by uib-element) - maybe something with observer?
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
`

/** Namespace
 * @namespace Beta
 */

/**
 * @class
 * @extends TiBaseComponent
 * @description Wraps around HTML text with headings h1-h4 making the headings a collapsible hierarchy.
 *
 * @element collapsible-headings
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
 * None

 * @fires collapsible-headings:connected - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
 * @fires component-template:ready - Alias for connected. The instance can handle property & attribute changes
 * @fires collapsible-headings:disconnected - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
 * @fires collapsible-headings:attribChanged - When a watched attribute changes. `evt.details` contains the details of the change.
 * NOTE that listeners can be attached either to the `document` or to the specific element instance.

 * Standard watched attributes (common across all my components):
 * @attr {string|boolean} inherit-style - Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load.
 * @attr {string} name - Optional. HTML name attribute. Included in output _meta prop.

 * Other watched attributes:
 * @attr {string} levels - Optional. Default='h2, h3, h4, h5'. A single string detailing the heading levels to make collapsible.

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
 * @prop {string} level Default='h2, h3, h4, h5'. A single string detailing the heading levels to make collapsible.
 * By default, all attributes are also created as properties

 * @slot Container contents

 * See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc
 */
class CollapsibleHeadings extends TiBaseComponent {
    /** Component version */
    static componentVersion = '2024-10-06'

    levels = 'h2, h3, h4, h5'

    /** Makes HTML attribute change watched
     * @returns {Array<string>} List of all of the html attribs (props) listened to
     */
    static get observedAttributes() {
        return [
            // Standard watched attributes:
            'inherit-style', 'name',
            // Other watched attributes:
            'levels',
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

        // Get a reference to the slot tag
        this.shadowSlot = this.shadowRoot.querySelector('slot')

        // Create a mutation observer that processes changes to the content of the slot
        this.observer = new MutationObserver(this.processSlotContent.bind(this))
        this.observer.observe(this, { childList: true, subtree: true })

        // Do a first pass to process the initial load
        this.processSlotContent()

        // Keep at end. Let everyone know that a new instance of the component has been connected
        this._event('connected')
        this._event('ready')
    }

    /** Runs when an instance is removed from the DOM */
    disconnectedCallback() {
        // @ts-ignore Remove optional uibuilder event listener
        document.removeEventListener(`uibuilder:msg:_ui:update:${this.id}`, this._uibMsgHandler )

        // Remove the observer
        this.observer.disconnect()

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
    }

    /** Walk through slot content.
     * Called once when connected and then every time slot content changes
     * param {*} records Mutated records
     * param {*} observer Reference to the observer object
     */
    processSlotContent() {
        // Get the contents of the slot
        const assignedNodes = this.shadowSlot.assignedNodes({ flatten: true })
        // NB: assignedElements would be better but not supported in Safari 12.1/12.2

        assignedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                this.processElement(/** @type {HTMLElement} */ (node))
            }
        })
    }

    /** Process each found element node. Adds pointer cursor to the heading and wraps content in a div that can be collapsed.
     * @param {HTMLElement} element The HTML element to process
     */
    processElement(element) {
        if (!element.matches(this.levels) || element.dataset.collapsibleProcessed) return

        const level = parseInt(element.tagName[1])
        const nextElements = []

        let sibling = element.nextElementSibling
        while (sibling) {
            if (sibling.matches(this.levels) && parseInt(sibling.tagName[1]) <= level) {
                break
            }
            nextElements.push(sibling)
            sibling = sibling.nextElementSibling
        }

        // Create a collapsible section for content under the heading
        const collapsibleSection = document.createElement('div')
        collapsibleSection.classList.add('collapsible-content')
        // @ts-ignore
        collapsibleSection.dataset.level = level

        nextElements.forEach(el => collapsibleSection.appendChild(el))

        element.insertAdjacentElement('afterend', collapsibleSection)
        element.style.cursor = 'pointer'

        // Add click event to toggle collapsible section
        element.addEventListener('click', function () {
            const isCollapsed = collapsibleSection.style.display === 'none'
            collapsibleSection.style.display = isCollapsed ? 'block' : 'none'
        })

        // Mark this heading as processed
        element.dataset.collapsibleProcessed = 'true'
    }
} // ---- end of Class ---- //

// Make the class the default export so it can be used elsewhere
export default CollapsibleHeadings

/** Self register the class to global
 * Enables new data lists to be dynamically added via JS
 * and lets the static methods be called
 */
window['CollapsibleHeadings'] = CollapsibleHeadings

// Self-register the HTML tag
customElements.define('collapsible-headings', CollapsibleHeadings)

//#region TEST
// const ch = document.getElementsByTagName('collapsible-headings')[0]
// if (ch) {
//     const newH = document.createElement('h2')
//     const newP = document.createElement('p')
//     newH.innerText = 'Dynamically added section'
//     newP.innerText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

//     setTimeout(() => {
//         // ch.appendChild(
//         ch.appendChild(newH)
//         ch.append(newP)
//     }, 5000)
// } else {
//     console.debug('collapsible-headings tag not found')
// }
//#endregion
