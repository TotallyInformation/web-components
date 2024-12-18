/** A horizontal state trail (AKA timeline) chart web component with zero dependencies.
 *
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

/**
 * @typedef {string} CSSColor - A CSS color value (e.g., "red", "#ff0000", "rgb(255, 0, 0)").
 * @typedef {string} CSSLength - A CSS length value (e.g., "10px", "2em", "50%").
 */

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
 * @element chart-statetrail
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

 * @fires chart-statetrail:connected - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
 * @fires chart-statetrail:ready - Alias for connected. The instance can handle property & attribute changes
 * @fires chart-statetrail:disconnected - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
 * @fires chart-statetrail:attribChanged - When a watched attribute changes. `evt.details.data` contains the details of the change.
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
class ChartStatetrail extends TiBaseComponent {
    /** Component version */
    static componentVersion = '2024-12-14'

    /** Default component options */
    opts = {
        /** Placeholder for the chart data */
        data: {},
        /** An array of category objects that map input value ranges to titles and colors.
         * Each category object contains:
         * - `range`: An array with two numbers representing the start and end of the range.
         * - `title`: A string representing the title of the category.
         * - `color`: A string representing the color associated with the category.
         * @type {Array<{range: [number, number], title: string, color: CSSColor}>}
         */
        categoryMap: [
            { range: [0, 0.3], title: 'Off', color: 'var(--failure, red)' },
            { range: [0.3, 0.6], title: 'Partial', color: 'var(--warning, #c8b421)' },
            { range: [0.6, 1], title: 'On', color: 'var(--success, green)' }
        ],
        /** Allows a nice title to be displayed for each item */
        itemMap: {},
    }

    /** The minimum timestamp for the time axis */
    minTime = 0
    /** The maximum timestamp for the time axis */
    maxTime = 0
    /** The total duration of the time axis */
    totalDuration = 0

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
        this._construct(template.content.cloneNode(true))
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
        this._event('attribChanged', { attribute: attrib, newVal: newVal, oldVal: oldVal })
    }

    updateMinMaxTimestamps() {
        const times = this.opts.data.flatMap(item => [new Date(item.startTime), new Date(item.endTime)])
        this.minTime = Math.min(...times)
        this.maxTime = Math.max(...times)
        this.totalDuration = this.maxTime - this.minTime
    }

    createAxisLine() {
        const axisContainer = document.createElement('div')
        axisContainer.className = 'timeline-axis-container'

        const itemTitle = document.createElement('div')
        itemTitle.className = 'timeline-axis-title'
        // itemTitle.textContent = `${group} ${itemName}`;
        axisContainer.appendChild(itemTitle)

        const axisLine = document.createElement('div')
        axisLine.className = 'timeline-axis-line'

        const numTicks = 10
        for (let i = 0; i <= numTicks; i++) {
            const tick = document.createElement('div')
            tick.className = 'timeline-axis-tick'
            tick.style.left = `${(i / numTicks) * 100}%`
            const tickTime = new Date(this.minTime + (i / numTicks) * this.totalDuration)
            tick.textContent = tickTime.toISOString().substring(11, 19) // Show only the time part
            axisLine.appendChild(tick)
        }

        axisContainer.appendChild(axisLine)
        return axisContainer
    }
} // ---- end of Class ---- //

// Make the class the default export so it can be used elsewhere
export default ChartStatetrail

/** Self register the class to global
 * Enables new data lists to be dynamically added via JS
 * and lets the static methods be called
 */
window['ChartStatetrail'] = ChartStatetrail

// Self-register the HTML tag
customElements.define('chart-statetrail', ChartStatetrail)
