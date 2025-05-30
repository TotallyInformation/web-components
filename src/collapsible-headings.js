/** Define a new zero dependency custom web component ECMA module that can be used as an HTML tag
 *
 * Version: See the class code
 *
 */
/** Copyright (c) 2024-2025 Julian Knight (Totally Information)
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
 * - Make deep dynamic additions work (currently only works on initial load)
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
 * @augments TiBaseComponent
 * @description Wraps around HTML text with headings h1-h4 making the headings a collapsible hierarchy.
 *
 * @element collapsible-headings
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
 * @property {string} levels - Optional. Default='h2, h3, h4, h5'. A single string detailing the heading levels to make collapsible.

 * PROPS FROM BASE: (see TiBaseComponent)
 * OTHER STANDARD PROPS:
  * @property {string} componentVersion Static. The component version string (date updated). Also has a getter that returns component and base version strings.

 * Other props:
  * @property {string} level Default='h2, h3, h4, h5'. A single string detailing the heading levels to make collapsible.
  * By default, all attributes are also created as properties

 * @slot Container contents

 * See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc
 */
class CollapsibleHeadings extends TiBaseComponent {
    /** Component version */
    static componentVersion = '2025-02-25'

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
        // Only attach the shadow dom if code and style isolation is needed - comment out if shadow dom not required
        if (template && template.content) this._construct(template.content.cloneNode(true))
    }

    /** Runs when an instance is added to the DOM */
    connectedCallback() {
        this._connect() // Keep at start.

        // Get a reference to the slot tag
        this.shadowSlot = this.shadowRoot.querySelector('slot')

        // Create a mutation observer that processes changes to the content of the slot
        this.observer = new MutationObserver((mutations) => {
            this.processSlotContent(mutations)
        })
        this.observer.observe(this, { childList: true, subtree: true, })

        // Cannot use the slotchange event as it doesn't fire except for top-level changes to the slot, not deep changes.

        // Do a first pass to process the initial load
        this.processSlotContent()

        this._ready() // Keep at end. Let everyone know that a new instance of the component has been connected & is ready
    }

    /** Runs when an instance is removed from the DOM */
    disconnectedCallback() {
        // Remove the observer
        this.observer.disconnect()

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

        // Keep at end. Let everyone know that an attribute has changed for this instance of the component
        this._event('attribChanged', { attribute: attrib, newVal: newVal, oldVal: oldVal, })
    }

    /** Walk through slot content.
     * Called once when connected and then every time slot content changes
     * param {*} records Mutated records
     * param {*} observer Reference to the observer object
     * @param {MutationRecord[]=} [mutations] Optional. The mutation records to process
     */
    processSlotContent(mutations) {
        // console.log('>> Processing slot content >>', mutations, this)
        // mutations.forEach((mutation) => {
        //     console.log('>> Mutation >>', mutation)
        //     mutation.addedNodes.forEach(node => {
        //         console.log('>> Mutation:addedNode >>', node)
        //         if (node.nodeType === Node.ELEMENT_NODE) {
        //             // this.processElement(/** @type {HTMLElement} */ (node))
        //         }
        //     })
        // })

        // Get the contents of the slot
        const assignedNodes = this.shadowSlot.assignedNodes({ flatten: true, })
        // console.log('>> Assigned nodes >>', assignedNodes)
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
        // console.log('>> Processing element >>', element)

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
