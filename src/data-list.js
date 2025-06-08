/** Define a new zero dependency custom web component ECMA module that can be used as an HTML tag
 *
 * Version: See the class code
 *
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

import TiBaseComponent from '../libs/ti-base-component'

/**
 * TODO: Add optional footer ?
 *       topic (uib)
 */

/** Only use a template if you want to isolate the code and CSS using the Shadow DOM */
// const template = document.createElement('template')
// template.innerHTML = /*html*/`
//     <style>
//         :host {
//             display: block;   /* default is inline */
//             contain: content; /* performance boost */
//             --list-style: disc; /* Default list style type */
//             --nested-indent: 40px; /* Default nested list indent - all browsers use 40px by default */
//         }
//         ul {
//             list-style: var(--list-style);
//         }
//         /* Nested list indentation */
//         ul ul {
//             padding-inline-start: var(--nested-indent);
//             margin-inline-start: 0;
//         }
//         .nested-container {
//             /* No list bullet on an li containing a nested lists unless the key text is shown */
//             list-style: none;
//         }
//     </style>
//     <slot></slot>
//     <!-- <ul></ul> -->
// `
/** Only use this if using Light DOM but want scoped styles */
const styles = `
    data-list {
        --base-margin: var(--base-margin, 1rem);
        --list-style: disc; /* Default list style type */
        --nested-indent: 40px; /* Default nested list indent - all browsers use 40px by default */
    }
    
    data-list ul {
        list-style: var(--list-style);
    }
    
    /* Nested list indentation */
    data-list ul ul {
        padding-inline-start: var(--nested-indent);
        margin-inline-start: 0;
    }
    
    /* No list bullet on an li containing a nested lists unless the key text is shown */
    data-list .nested-container {
        list-style: none;
    }
`

/** Namespace
 * @namespace Live
 */

/**
 * @class
 * @augments TiBaseComponent
 * @description Define a new zero dependency custom web component ECMA module that can be used as an HTML tag
 *
 * @element data-list
 * @memberOf Live

 * METHODS FROM BASE: (see TiBaseComponent)
 * STANDARD METHODS:
  * @function attributeChangedCallback Called when an attribute is added, removed, updated or replaced
  * @function connectedCallback Called when the element is added to a document
  * @function constructor Construct the component
  * @function disconnectedCallback Called when the element is removed from a document

 * OTHER METHODS:
  * @function entry Dynamically ament/add a single entry. The list is rebuilt.

 * CUSTOM EVENTS:
  * "data-list:connected" - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
  * "data-list:ready" - Alias for connected. The instance can handle property & attribute changes
  * "data-list:disconnected" - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
  * "data-list:attribChanged" - When a watched attribute changes. `evt.details.data` contains the details of the change.
  * NOTE that listeners can be attached either to the `document` or to the specific element instance.

 * Standard watched attributes (common across all my components):
  * @property {string|boolean} inherit-style - Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load.
  * @property {string} name - Optional. HTML name attribute. Included in output _meta prop.

 * Other watched attributes:
  * @property {string} type - 💫 Optional. The type of list to use, ul or ol. Default is ul.
  * @property {string} listvar - 💫 Optional. The global variable name to use for the list data. If not set, set the data property directly from JS.
  * @property {string} keyvalueseparator - Optional. The separator to use between key and value in the list items when input is an object. Default is ' :: '. Set to "NULL" to disable key display.
  * @property {string} liststyle - 💫 Optional. The style type to use for the list. Default is `disc` for `ul` and `decimal` for `ol`. May contain any valid CSS list-style string value.

 * PROPS FROM BASE: (see TiBaseComponent)
 * OTHER STANDARD PROPS:
  * @property {string} componentVersion Static. The component version string (date updated). Also has a getter that returns component and base version strings.

 * Other props:
  * By default, all attributes are also created as properties
  * @property {object} data - 💫 The data to use for the list. Either set directly or via the `listvar` attribute. If an object, the key/value separator is used to separate the key and value in the list items.

 NB: properties marked with 💫 are dynamic and have getters/setters. They will cause the list to rebuild.

 * @slot Container contents

 * @example
  * <data-list id="myComponent" type="ol" inherit-style="./myComponent.css"></data-list>

 * See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc
 */
class DataList extends TiBaseComponent {
    /** Component version */
    static componentVersion = '2025-06-08'

    /** The top-level list element - this is created in the shadow DOM */
    #list = null
    /** The list style type to use for the list - this is set as a CSS variable */
    #listStyle = null
    /** The data to use for the list - this is set via the `data` property */
    #entries = null
    /** The type of list to use, ul or ol @type {"ol"|"ul"} */
    #type = 'ul'

    // Optional global variable name to use for the list data
    listvar = null
    // The separator to use between key and value in the list items
    keyvalueseparator = ' :: '

    /** Makes HTML attribute change watched
     * @returns {Array<string>} List of all of the html attribs (props) listened to
     */
    static get observedAttributes() {
        return [
            // Standard watched attributes:
            'inherit-style', 'name',
            // Other watched attributes:
            'keyvalueseparator', 'liststyle', 'listvar', 'type', 'topic',
        ]
    }

    /** NB: Attributes not available here - use connectedCallback to reference */
    constructor() {
        super()
        // Only attach the shadow dom if code and style isolation is needed - comment out if shadow dom not required
        // if (template && template.content) this._construct(template.content.cloneNode(true))

        // Otherwise, if component styles are needed, use the following instead:
        this.prependStylesheet(styles, 0)
    }

    /** Runs when an instance is added to the DOM
     * Runs AFTER the initial attributeChangedCallback's
     * @private
     */
    connectedCallback() {
        this._connect() // Keep at start.

        // If a listvar is specified, make sure it exists globally, if it does, use it to set the data property
        if ( this.listvar && window[this.listvar] ) {
            if ( window[this.listvar] ) {
                this.data = window[this.listvar]
            } else {
                console.warn(`[${this.localName}] ${this.id} window.${this.listvar} does not exist, ignoring.`)
            }
            return
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

    // Getter/setter for the `type` public property - maps to this.#type
    set type(val) {
        if (!['ul', 'ol'].includes(val)) {
            console.warn(`[${this.localName}] ${this.id} Invalid type "${val}" specified, defaulting to "ul".`)
            val = 'ul'
        }

        this.#type = val

        this._updateListAttributes(this.#list, this.#type)
    }
    get type() {
        return this.#type
    }

    // Getter/setter for the `listStyle` public property - maps to this.#listStyle
    set liststyle(val) {
        this.#listStyle = val
        this._updateListAttributes(this.#list, this.#type)
    }
    get liststyle() {
        return this.#listStyle
    }

    // Getter/setter for the `data` public property - maps to this.#entries
    set data(val) {
        this.#entries = val

        // If the list already exists, delete it
        if (this.#list) this.#list.remove()

        // Dynamically build the content of the ul/ol
        this.#list = this._buildList(this.#entries, this, this.#type, 1)

        this._updateListAttributes(this.#list, this.#type)

        // Issue a custom event to notify that the data has changed
        this._event('dataChanged', this.#entries)
    }
    get data() {
        return this.#entries
    }

    /** Dynamically change/add list entries - rebuilds the list DOM element
     * @param {string|number} key Object key or array index to change/add
     * @param {string} val Updates/new list text (can be HTML)
     * @example
     * // Add a new entry to the list
     * dataList.entry('newKey', 'New list item text')
     * // Update an existing entry in the list
     * dataList.entry('existingKey', 'Updated list item text')
     */
    entry(key, val) {
        this.#entries[key] = val
        this.data = this.#entries
    }

    // #region ---- Private methods ---- //

    /** Builds a list from input data
     * @param {Array|object} listData Source data for the list, can be an array or an object
     * @param {HTMLElement|ShadowRoot} parentEl The parent element to append the list to
     * @param {"ol"|"ul"} type  The type of list to create, either 'ol' for ordered or 'ul' for unordered
     * @param {number} depth  Recursion depth. Defaults to 1. Used to limit recursion depth for nested objects/arrays.
     * @returns {HTMLElement} The created list element
     * @private
     */
    _buildList(listData, parentEl, type, depth) {
        if (depth === undefined) depth = 1

        // Create a new list element (all lists are created as ul, numbering is done via CSS)
        const listEl = document.createElement('ul')
        if (depth > 1) {
            // If this is a nested list, add a class to the list element
            listEl.classList.add('nested-list')
            // and add a data-depth attribute to the list element
            listEl.setAttribute('data-depth', depth.toString())
        }

        Object.entries(listData).forEach(([key, value], i) => {
            // Is the key a number? Keep a record
            const keyIsNumeric = !isNaN(parseInt(key))

            // Is the value an object or array?
            if (typeof value === 'object' && value !== null) {
                if (depth > 3) {
                    // If depth is too high, just show the key and value as a string
                    listEl.insertAdjacentHTML(
                        'beforeend',
                        this._buildLIhtml({ arrayType: Array.isArray(listData), key, value: JSON.stringify(value), i, })
                    )
                    console.warn(`[${this.localName}] ${this.id} buildList: Depth limit reached for key "${key}", showing as string.`)
                    return
                }

                // Create a new list item for the key
                const li = document.createElement('li')

                // If key is not numeric and if this.keyvalueseparator is not 'NULL', add key as text
                if (!keyIsNumeric && this.keyvalueseparator !== 'NULL') {
                    const keySpan = document.createElement('span')
                    keySpan.textContent = `${key}${this.keyvalueseparator}`
                    // keySpan.classList.add('nested-key')
                    li.appendChild(keySpan)
                } else {
                    li.classList.add('nested-container')
                }

                // recurse to create a nested list
                this._buildList(value, li, type, ++depth)
                this._updateListAttributes(li, type)
                // add the new list item to its parent element
                listEl.appendChild(li)
            } else {
                // Otherwise, just create a list item with the key and value
                listEl.insertAdjacentHTML(
                    'beforeend',
                    this._buildLIhtml({ arrayType: Array.isArray(listData), key, value, i, })
                )
            }
        })

        // Attach the list as the last child of the parent element
        return parentEl.appendChild(listEl)
    }

    /** Builds a list item HTML string based on the provided options.
     * @param {object} options Object containing options for building the list item
     * @param {boolean} options.arrayType True if the list is an array, false if it is an object
     * @param {string} options.key The key for the list item, used as the id and data-index
     * @param {string} options.value The value for the list item, displayed as the text
     * @param {number} options.i The index of the item in the list, used for data-index attribute
     * @returns {string} The HTML string for the list item
     * @private
     */
    _buildLIhtml({ arrayType, key, value, i, }) {
        // check if this.#entries is an array
        if (arrayType) {
            return `<li id="${this.id}-${key}" data-index="${i}">${value}</li>`
        }
        // If the keyvalueseparator is 'NULL', then don't show the key
        // otherwise, show the key followed by the separator
        return `<li id="${this.id}-${key}" data-index="${i}">${this.keyvalueseparator === 'NULL' ? '' : `${key}${this.keyvalueseparator}`}${value}</li>`
    }

    /** Updates the list attributes based on the current type and style
     * @param {HTMLElement} listEl The list element to update
     * @param {"ol"|"ul"} listType The type of list to use, either 'ol' for ordered or 'ul' for unordered
     * @private
     */
    _updateListAttributes(listEl, listType) {
        if (listEl) {
            if (listEl) {
                // Update CSS classes/attributes instead of recreating element
                listEl.setAttribute('data-list-type', listType)

                // Update ARIA attributes for accessibility
                if (listType === 'ol') {
                    this.listStyle = 'decimal'
                    listEl.setAttribute('aria-label', 'Ordered list')
                } else {
                    this.listStyle = 'disc'
                    listEl.setAttribute('aria-label', 'Unordered list')
                }
            }
            if (this.#listStyle) {
                // Update the CSS variable for the list style
                listEl.style.setProperty('--list-style', this.#listStyle)
            }
        }
    }

    // #endregion ---- Private methods ---- //
} // ---- end of Class ---- //

// Make the class the default export so it can be used elsewhere
export default DataList

/** Self register the class to global
 * Enables new data lists to be dynamically added via JS
 * and lets the static methods be called
 */
window['DataList'] = DataList

// Self-register the HTML tag
customElements.define('data-list', DataList)
