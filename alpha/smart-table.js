/** A zero dependency custom lightweight web component that builds a table from data
 * Version: See the class code
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
 * - Add row ID (R1, ...) - add col ID (C1, ...)
 * - Process set cols to override auto-cols
 * - allow for sparse data (use #data cols instead of #cols)
 * - allow updating of specific rows or cells in the data - auto-update visuals
 *    - Maybe a row setter and a cell setter
 * - Allow deleting of rows/columns
 * - Allow moving rows/columns
 * - Allow adding rows/columns
 * - Add uibuilder handlers: uib-var
 * - Save altered data - allow saving to browser storage
 * - Custom event on changed data (data, row, cell, column)
 * - tfoot
 * - Multiple thead's with spans
 * - cell overrides with spans
 * - caption
 * - table number
 * - allow cell values as HTML (add reminder about using sanitise)
 * - may need to allow for manual reset of column data
 * - add method setValueByCellId
 * - allow changes to dom to be reflected into the data
 *
 * These are a LOT more advanced and will take time to work out:
 * - Allow dynamic styling
 * - Allow dynamic data calculations
 *
 * QUESTIONS
 * - What about using a set or map instead of array/object
 * - What happens when adding both new row/col (objects)
 * - What happens when pushing both new row/col (array)
 */

import TiBaseComponent from '../libs/ti-base-component'

/** Only use a template if you want to isolate the code and CSS */
// const template = document.createElement('template')
// template.innerHTML = /*html*/`
//     <style>
//         :host {
//         }

//         /* Small screen (37.5em @ 16pt is about 600px) */
//         @media all and (max-width: 37.5em) {
//             :host {
//             }
//         }
//     </style>
//     <div><slot></slot></div>
// `

/** Namespace
 * @namespace Alpha
 */

// Define the class and make it the default export
/**
 * @class
 * @extends TiBaseComponent
 * @description A zero dependency custom lightweight web component that builds an HTML table from data
 *
 * @element smart-table
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
 * @method getCellById Get an HTML element reference to a cell using `RxCx` referencing
 * @method getValueByCellId Get the data value of a cell using `RxCx` referencing
 * @method getValueByOffset(obj,rowOffset,colOffset) Get the data value of a cell in an tabular array/object using row/column numbers

 * @fires smart-table:connected - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
 * @fires smart-table:ready - Alias for connected. The instance can handle property & attribute changes
 * @fires smart-table:disconnected - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
 * @fires smart-table:attribChanged - When a watched attribute changes. `evt.details` contains the details of the change.
 * NOTE that listeners can be attached either to the `document` or to the specific element instance.

 * Standard watched attributes (common across all my components):
 * @attr {string} name - Optional. HTML name attribute. Included in output _meta prop.

 * Other watched attributes:
 * None

 * Standard props (common across all my components):
 * @prop {number} _iCount Static. The component version string (date updated)
 * @prop {boolean} uib True if UIBUILDER for Node-RED is loaded
 * @prop {boolean} connected False until connectedCallback finishes
 * @prop {string} name Placeholder for the optional name attribute
 *
 * @prop {string} version Static. The component version string (date updated). Also has a getter that returns component and base version strings.

 * Other props:
 * @prop {object|array} data Data to build table. Can be an array of objects, an object of objects or an array of arrays. Must be 2d (tabular)
 * @prop {object} cols Override the column metadata. If not supplied, cols is built from the first entry of the data array/object
 *
 * @prop {HTMLTableElement} elThead Reference to the thead element
 * @prop {HTMLTableElement} elTfoot Reference to the tfoot element
 * @prop {HTMLTableElement} elTbody Reference to the tbody element
 * By default, all attributes are also created as properties

 * @slot None, this component does not use the shadow dom

 * See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc
 */
class SmartTable extends TiBaseComponent {
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
        ]
    }

    /** PRIVATE: A copy of the provided data @type {object|array} */
    #data
    /** PRIVATE: Column metadata for the table @type {object} */
    #cols
    /** Reference to table head @type {HTMLTableElement} */
    elThead
    /** Reference to table foot @type {HTMLTableElement} */
    elTfoot
    /** Reference to table body @type {HTMLTableElement} */
    elTbody

    /** Set the value to show */
    set data(val) {
        // console.log('set data', val)

        if (val === null) return
        if (val === this.#data) return

        this.#data = this._createProxy(val)

        // If cols not set, Build cols from 1st entry
        if (!this.#cols) this._buildCols(true)

        this._buildHeadings()
        this._buildRows()

        // this.#outputEl.textContent = val
        // this.setAttribute('value', val)
    }

    /** Get the current shown value */
    get data() {
        return this.#data
    }

    /** NB: Attributes not available here - use connectedCallback to reference */
    constructor() { // eslint-disable-line no-useless-constructor
        super()
        // Only attach the shadow dom if code and style isolation is needed - comment out if shadow dom not required
        // this._construct(template.content.cloneNode(true))

        // this.#outputEl = this.shadowRoot.querySelector('output')
    }

    /** Runs when an instance is added to the DOM */
    connectedCallback() {
        this._connect() // Keep at start.

        // this.label =  this.getAttribute('label')

        // Create the table outline structure: table, thead, tfoot, tbody
        this._buildTblOutline()

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

    /** Allows access to a cell using numeric row/col offsets
     * @param {object|array} obj The 2d object to search
     * @param {number} rowOffset The row offset
     * @param {number} colOffset The column offset
     * @returns {*} Cell value
     */
    getValueByOffset(obj, rowOffset, colOffset) {
        const rowKeys = Object.keys(obj)
        const colKeys = Object.keys(obj[rowKeys[rowOffset]])

        const rowKey = rowKeys[rowOffset]
        const colKey = colKeys[colOffset]

        return obj[rowKey][colKey]
    }

    /** Get an element reference from an RxCx cell reference
     * @param {string} cellId The RxCx cell reference required
     * @returns {HTMLTableCellElement|null} The HTML table cell element if found
     */
    getCellById(cellId) {
        const el = this.elTbody.querySelector(`td[data-cell="${cellId}"]`)
        if (!el) {
            console.warn(`[${this.localName}:getCellById:${this.id}] Invalid cell reference "${cellId}"`)
        }
        // @ts-ignore
        return el
    }

    /** Get the value of a data cell using RxCx referencing
     * @param {string} cellId The RxCx cell reference required
     * @returns {*} The value of the cell if found else Null or Undefined
     */
    getValueByCellId(cellId) {
        let [, row, col,] = cellId.split(/^R(\d+)C(\d+)$/ig)
        // @ts-ignore
        row = Number(row) - 1
        // @ts-ignore
        col = Number(col) - 1
        if (Number.isNaN(row) || Number.isNaN(col)) {
            console.warn(`[${this.localName}:getValueByCellId:${this.id}] Invalid cell reference "${cellId}"`)
            return null
        }
        // @ts-ignore
        return this.getValueByOffset(this.#data, row, col)
    }

    _createProxy(data, parentKey = null) {
        return new Proxy(data, {
            get: (target, prop) => {
                const value = target[prop]
                // If it's an array or object (row or cell), create a proxy for it too
                if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
                    // Prevent going >1 level deep - e.g. only deal with 2d data
                    if (parentKey !== null) {
                        console.warn(`[${this.localName}:_createProxy:${this.id}] Data is >2d. Can only deal with 2d (tabular) data.`)
                        return value
                    } else return this._createProxy(value, prop)
                } else {
                    return value
                }
            },

            set: (target, prop, value) => {
                const isNewProperty = !(prop in target) // Detect addition
                // Intercept changes to rows or cells
                target[prop] = value

                if (isNewProperty) {
                    // console.log(`New property added: ${parentKey ? parentKey + '.' : ''}${String(prop)}`)
                    this._onDataChange(parentKey, prop, value, 'added') // Handle addition
                } else {
                    // console.log(`Data at ${parentKey}.${String(prop)} has changed to`, value)
                    this._onDataChange(parentKey, prop, value, 'modified') // Handle modification
                }

                return true
            },

            deleteProperty: (target, prop) => {
                const deletedValue = target[prop]
                const success = delete target[prop]

                if (success) {
                    // console.log(`Property deleted: ${parentKey ? parentKey + '.' : ''}${String(prop)}`)
                    this._onDataChange(parentKey, prop, deletedValue, 'deleted') // Handle deletion
                }

                return success
            }
        })
    }

    // Method to handle data changes (cell or row)
    _onDataChange(parentKey, prop, value, changeType) {
        // Perform any actions needed when a cell or row changes

        // if prop === 'length' then an array has changed
        // BUT objects don't report on size changes

        // if (parentKey === null) {
        //     console.log(`ROW ${changeType}: Row: ${prop}, Value: `, value)
        // } else {
        //     console.log(`CELL ${changeType}: Row: ${parentKey}, Column: ${prop}, Value: `, value)
        // }

        // TODO REPLACE this total rebuild with something more nuanced
        this.elThead.replaceChildren('')
        this.elTfoot.replaceChildren('')
        this.elTbody.replaceChildren('')
        // If cols not set, Build cols from 1st entry
        if (!this.#cols) this._buildCols(true)
        this._buildHeadings()
        this._buildRows()
    }

    /** Builds the table outline and prepends to the component tag */
    _buildTblOutline() {
        const tblEl = document.createElement('table')
        tblEl.innerHTML = /*html*/`
        <thead></thead>
        <tfoot></tfoot>
        <tbody></tbody>
        `
        this.prepend(tblEl)

        // Get references to the various table parts for convenience
        this.elThead = tblEl.getElementsByTagName('thead')[0]
        this.elTfoot = tblEl.getElementsByTagName('tfoot')[0]
        this.elTbody = tblEl.getElementsByTagName('tbody')[0]
    }

    /** Build the column metadata
     * @param {boolean} fromData If true, calculate the columns from the data
     */
    _buildCols(fromData) {
        this.#cols = {}
        const firstRow = this.#data[Object.keys(this.#data)[0]]
        // If 1st row is an array - simulate column names
        if ( Array.isArray(firstRow) ) {
            firstRow.forEach( (col, i) => {
                const colname = `C${i + 1}`
                this.#cols[colname] = {
                    id: colname,
                    name: `Column ${i + 1}`,
                    type: typeof col,
                    title: undefined,
                }
            })
        } else {
            Object.keys(firstRow).forEach( col => {
                this.#cols[col] = {
                    id: col,
                    name: col,
                    type: typeof col,
                    title: undefined,
                }
            })
        }
        // console.log(this.id, this.#cols )
    }

    _buildHeadings() {
        const rowHeadId = 'H1R1'
        const rowEl = document.createElement('tr')
        rowEl.dataset.row = rowHeadId

        Object.keys(this.#cols).forEach( (col, i) => {
            // console.log(i, col)
            const colEl = document.createElement('th')
            colEl.dataset.row = rowHeadId
            colEl.dataset.col = this.#cols[col].id
            colEl.innerText = this.#cols[col].name
            rowEl.appendChild(colEl)
        })
        this.elThead.appendChild(rowEl)
    }

    _buildRows() {
        Object.keys(this.#data).forEach( (row, i) => {
            this._buildRow(i, row, this.#data[row])
        })
    }

    _buildRow(i, row, rowData) {
        const rowNum = Number(row)
        const rowId = Number.isNaN(rowNum) ? row : `R${rowNum + 1}`
        const rowEl = document.createElement('tr')
        rowEl.dataset.row = rowId

        // console.log(this.id, i, row, rowId, this.#data[row])

        Object.keys(this.#cols).forEach( (col, j) => {
            // console.log(i, col)
            const colEl = document.createElement('td')
            colEl.dataset.row = rowId
            colEl.dataset.col = this.#cols[col].id
            // colEl.dataset.cell = `${rowId}:${this.#cols[col].id}`
            colEl.dataset.cell = `R${i + 1}C${j + 1}`
            colEl.innerText = this.#data[row][col] === undefined ? this.#data[i][j] : this.#data[row][col]
            rowEl.appendChild(colEl)
        })
        this.elTbody.appendChild(rowEl)
    }
} // ---- end of Class ---- //

// Make the class the default export so it can be used elsewhere
export default SmartTable

/** Self register the class to global
 * Enables new data lists to be dynamically added via JS
 * and lets the static methods be called
 */
window['SmartTable'] = SmartTable

// Self-register the HTML tag
customElements.define('smart-table', SmartTable)