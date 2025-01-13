/** Define a new zero dependency custom web component ECMA module that can be used as an HTML tag
 *
 * TO USE THIS TEMPLATE: CHANGE ALL INSTANCES OF 'ComponentTemplate' and 'led-gauge'
 * For better formatting of HTML in template strings, use VSCode's "ES6 String HTML" extension
 *
 * Version: See the class code
 *
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

import TiBaseComponent from '../libs/ti-base-component'

/** Only use a template if you want to isolate the code and CSS */
const template = document.createElement('template')
template.innerHTML = /*html*/`
    <style>
        :host {
            --value-color: var(--text2, inherit);
            --gauge-background-color: var(--surface2, inherit);
            --hue: 120; /* 0 = red, 120 = green, 240 = blue */
            --on-sat: 100%;
            --off-sat: 20%;
            --on-lum: 45%;
            --off-lum: 25%;
            --label-color: var(--value-color, inherit);
            
            --segment-count: 10;
            --segment-gap: 0.3rem;
            --gauge-columns: 1fr 1fr;
            --gauge-layout: 
                "label value"
                "segments segments"
                "segvals segvals";
            --value-justification: end;

            contain: content; /* performance boost */
            display: grid;
            width: 100%;
            grid-template-columns: var(--gauge-columns);
            grid-template-areas: var(--gauge-layout);
            padding: 1rem;
            background-color: var(--gauge-background-color);
            color: var(--value-color);
            border-radius: var(--border-radius, 5px);
        }

        
        .segments {
            grid-area: segments;
            display: grid;
            grid-template-columns: repeat(var(--segment-count, 10), 1fr);
            gap: var(--segment-gap);
        }

        .segvals {
            grid-area: segvals;
            display: grid;
            grid-template-columns: 0fr repeat(var(--segment-count, 10), 1fr) 0fr;
            justify-items: start;
            /* margin-left: -.5rem; */
            /* gap: var(--segment-gap); */
        }

        .led {
            background-color: hsl(var(--hue, 0), var(--off-sat, 20%), var(--off-lum, 25%));
            height: 20px;
            border-radius: 3px;
            border: 1px solid var(--gauge-background-color);
            cursor: pointer;
        }

        .led.on {
            background-color: hsl(var(--hue, 0), var(--on-sat, 100%), var(--on-lum, 45%));
            /* box-shadow: 0 0 5px hsl(var(--hue, 0), var(--on-sat, 100%), var(--on-lum, 45%)); */
        }

        slot {
            grid-area: label;
            color: var(--label-color, inherit);
        }
        output {
            grid-area: value;
            justify-self: var(--value-justification, end);
            color: var(--value-color, inherit);
        }
    </style>

    <slot></slot>
    <output class="value"></output>
    <div class="segments" arial-label="Visual LED Gauge"></div>
    <div class="segvals"></div>
`

/** Namespace
 * @namespace Alpha
 */

/**
 * @class
 * @extends TiBaseComponent
 * @description Define a new zero dependency custom web component ECMA module that can be used as an HTML tag
 *
 * @element led-gauge
 * @memberOf Alpha

 * METHODS FROM BASE:
  * @method config Update runtime configuration, return complete config
  * @method createShadowSelectors Creates the jQuery-like $ and $$ methods
  * @method deepAssign Object deep merger
  * @method doInheritStyles If requested, add link to an external style sheet
  * @method ensureId Adds a unique ID to the tag if no ID defined.
  * @method _connect Call from start of connectedCallback. Sets connected prop and creates shadow selectors
  * @method _event(name,data) Standardised custom event dispatcher
  * @method _disconnect Call from end of disconnectedCallback. Clears connected prop and removes shadow selectors
  * @method _ready Call from end of connectedCallback. Sets connected prop and outputs events
  * @method _uibMsgHandler Not yet in use
 * STANDARD METHODS:
  * @method attributeChangedCallback Called when an attribute is added, removed, updated or replaced
  * @method connectedCallback Called when the element is added to a document
  * @method constructor Construct the component
  * @method disconnectedCallback Called when the element is removed from a document

 * OTHER METHODS:
  * @method valueChanged Process value changed event
  * @method _renderGauge (Re)Create the gauge

 * CUSTOM EVENTS:
  * @fires led-gauge:connected - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
  * @fires led-gauge:ready - Alias for connected. The instance can handle property & attribute changes
  * @fires led-gauge:disconnected - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
  * @fires led-gauge:attribChanged - When a watched attribute changes. `evt.details.data` contains the details of the change.
  *
  * @fires led-gauge:value-changed - When the value changes. `evt.details.data` contains the new value.
  * @fires led-gauge:segment-click - When a segment is clicked. `evt.details.data` contains the details of the segment & current value.
  * NOTE that listeners can be attached either to the `document` or to the specific element instance.

 * Standard watched attributes (common across all my components):
  * @attr {string|boolean} inherit-style - Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load.
  * @attr {string} name - Optional. HTML name attribute. Included in output _meta prop.

 * Other watched attributes:
  * @attr {string} value
  * @attr {string} min
  * @attr {string} max
  * @attr {string} unit
  * @attr {string} segments
  * @attr {string} hide-segment-labels

 * PROPS FROM BASE:
  * @prop {number} _iCount Static. The count of instances of this component that weren't given an id. Creates a unique id as needed.
  * @prop {function(string): Element} $ jQuery-like shadow dom selector (or undefined if shadow dom not used)
  * @prop {function(string): NodeList} $$  jQuery-like shadow dom multi-selector (or undefined if shadow dom not used)
  * @prop {string} baseVersion Static. The base component version string (date updated).
  * @prop {boolean} connected False until connectedCallback finishes
  * @prop {string} name Placeholder for the optional name attribute
  * @prop {object} opts This components controllable options - get/set using the `config()` method - empty object by default
  * @prop {boolean} uib True if UIBUILDER for Node-RED is loaded
  * @prop {object} uibuilder Reference to loaded UIBUILDER for Node-RED client library if loaded (else undefined)
 * OTHER STANDARD PROPS:
  * @prop {string} componentVersion Static. The component version string (date updated). Also has a getter that returns component and base version strings.

 * Other props:
    * @prop {string[]} colors The color of each segment in the gauge
    * @prop {boolean} hideSegmentLabels If true, hide the segment labels (hide-segment-labels attribute)
    * @prop {number} max The maximum value of the gauge
    * @prop {number} min The minimum value of the gauge
    * @prop {HTMLElement} segContainerEl The container for the gauge segments
    * @prop {number} segments (getter/setter) The number of segments in the gauge. #segments is the private equivalent property
    * @prop {HTMLCollection} segmentElements A collection of the segment div elements
    * @prop {string} unit The unit of the gauge value
    * @prop {HTMLElement} valsContainerEl The container for the segment values
    * @prop {number} value (getter/setter) The current value of the gauge. #value is the private equivalent property
    * @prop {HTMLElement} valueEl The container for the gauge value
  * By default, all attributes are also created as properties

 * @slot Container contents

 * See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc
 */
class LedGauge extends TiBaseComponent {
    /** Component version */
    static componentVersion = '2025-01-13'

    #value = 0
    #segments = 10
    #colors = {}
    // #colors = {
    //     60: 40, // 60%+ is orange
    //     80: 0, // 80%+ is red
    // }
    #min = 0
    #max = 100
    #unit = '%'
    #hideSegmentLabels = false

    /** @type {HTMLElement} */
    segContainerEl
    /** @type {HTMLElement} */
    valsContainerEl
    /** @type {HTMLElement} */
    valueEl
    /** @type {HTMLCollection} */
    segmentElements

    /** Makes HTML attribute change watched
     * @returns {Array<string>} List of all of the html attribs (props) listened to
     */
    static get observedAttributes() {
        return [
            // Standard watched attributes:
            'inherit-style', 'name',
            // Other watched attributes:
            'value', 'min', 'max', 'unit',
            'segments', 'hide-segment-labels',
        ]
    }

    /** Set the number of segments
     * @param {string|number} val Number of segments
     */
    set segments(val) {
        const strSegments = val.toString()
        // Ensure that saved #segments value is numeric
        this.#segments = parseInt(strSegments)
        // Update the CSS variable for the number of segments
        this.style.setProperty('--segment-count', strSegments)
        // (Re)Create and show the gauge
        this._renderGauge()
    }

    /** Get the number of segments
     * @returns {number} Number of segments
     */
    get segments() {
        return this.#segments
    }

    /** Set the value of the gauge
     * @param {string|number} val The value to set
     */
    set value(val) {
        const oldVal = this.#value
        // Ensure that saved #segments value is numeric
        this.#value = parseFloat(val.toString())
        // (Re)Create and show the gauge
        this._renderGauge()
        // Notify listeners of the change
        this._event('value-change', {
            value: this.#value,
            oldValue: oldVal,
        })
        // If using uibuilder, send the new value to Node-RED.
        this.uibSend('value-change', {
            value: this.#value,
            oldValue: oldVal,
        })
    }

    /** Get the value of the gauge
     * @returns {number} The current value
     */
    get value() {
        return this.#value
    }

    /** Set the value of the gauge
     * @param {object} val The value to set
     */
    set colors(val) {
        this.#colors = val
        // (Re)Create and show the gauge
        this._renderGauge()
    }

    /** Get the value of the gauge
     * @returns {object} The current value
     */
    get colors() {
        return this.#colors
    }

    /** Set the minimum value of the gauge
     * @param {string|number} val The minimum value
     */
    set min(val) {
        // Ensure that the internal value is numeric
        this.#min = parseFloat(val.toString())
        // (Re)Create and show the gauge
        this._renderGauge()
    }

    /** Get the minimum value of the gauge
     * @returns {number} The minimum value
     */
    get min() {
        return this.#min
    }

    /** Set the maximum value of the gauge
     * @param {string|number} val The maximum value
     */ 
    set max(val) {
        this.#max = parseFloat(val.toString())
        // (Re)Create and show the gauge
        this._renderGauge()
    }
    
    /** Get the maximum value of the gauge
     * @returns {number} The maximum value
     */
    get max() {
        return this.#max
    }

    /** Set the unit of the gauge
     * @param {string} val The unit
     * @default '%'
     * @example '°C'
     */
    set unit(val) {
        this.#unit = val
        this.valueEl.innerText = `${this.value}${this.#unit}`
    }

    /** Get the unit of the gauge
     * @returns {string} The unit
     */
    get unit() {
        return this.#unit
    }

    /** Set whether to hide the segment labels
     * @param {string|boolean} val Whether to hide the segment labels
     * @default false
     */
    set hideSegmentLabels(val) {
        if (val === '' || val.toString().toLowerCase() === 'true') val = true
        else val = false
        this.#hideSegmentLabels = val
        this.valsContainerEl.style.display = val ? 'none' : 'grid'
    }

    /** Get whether segment labels are hidden
     * @returns {boolean} Whether segment labels are hidden
     */
    get hideSegmentLabels() {
        return this.#hideSegmentLabels
    }

    /** NB: Attributes not available here - use connectedCallback to reference */
    constructor() { // eslint-disable-line no-useless-constructor
        super()
        // Only attach the shadow dom if code and style isolation is needed - comment out if shadow dom not required
        if (template && template.content) this._construct(template.content.cloneNode(true))

        // Keep a reference to the segments container
        this.segContainerEl = this.shadowRoot.querySelector('.segments')
        // Keep a reference to the segment values container
        this.valsContainerEl = this.shadowRoot.querySelector('.segvals')
        // Keep a reference to the value container
        this.valueEl = this.shadowRoot.querySelector('.value')
    }

    /** Runs when an instance is added to the DOM */
    connectedCallback() {
        this._connect() // Keep at start.

        // Set up the gauge
        this._renderGauge()

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

        // NOTE: value and segments are handled by their own setters.

        // Add other dynamic attribute processing here.
        // If attribute processing doesn't need to be dynamic, process in connectedCallback as that happens earlier in the lifecycle

        // Keep at end. Let everyone know that an attribute has changed for this instance of the component
        this._event('attribChanged', { attribute: attrib, newVal: newVal, oldVal: oldVal })
    }

    /** Create the gauge */
    _renderGauge() {
        // Calculate the segment step size
        const step = (this.#max - this.#min) / this.#segments

        // Clear out the existing segments
        this.segContainerEl.innerHTML = ''
        this.valsContainerEl.innerHTML = ''

        // Create LED segments
        for (let i = 0; i < this.#segments; i++) {
            // Create the segments
            const segment = document.createElement('div')
            segment.classList.add('led')
            const segmentValue = this.#min + i * step
            segment.title = segmentValue.toString()

            // Create the segment values
            if (i === 0) {
                const segVal = document.createElement('div')
                this.valsContainerEl.appendChild(segVal)
            }
            const segVal = document.createElement('div')
            segVal.innerText = Math.round(segmentValue).toString()

            // if colorSegments has a key greater than or equal to the segVal, set the hue to the value of the key
            const hueKey = Object.keys(this.#colors).reverse().find(key => {
                return Number(key) <= segmentValue + step - 0.01
            })
            if (hueKey !== undefined) segment.style.setProperty('--hue', this.#colors[hueKey])

            // Is the segment on?
            if (this.#value >= segmentValue) segment.classList.add('on')

            // Attach click event listener
            segment.addEventListener('click', () => {
                const data = {
                    gaugeValue: this.#value,
                    segment: i,
                    segmentValue: Number(segmentValue),
                }
                // Fire custom event
                this._event('segment-click', data)
                // If using uibuilder, send the new value to Node-RED.
                this.uibSend('segment-click', data)
            })

            this.segContainerEl.appendChild(segment)
            this.valsContainerEl.appendChild(segVal)
        }

        // Keep a reference to the segment div elements
        this.segmentElements = this.segContainerEl.getElementsByTagName('div')

        const segVal = document.createElement('div')
        this.valsContainerEl.appendChild(segVal)
        segVal.innerText = this.#max.toString()

        // Render current value and unit if applicable
        this.valueEl.innerText = `${this.value}${this.#unit}`
    }
} // ---- end of Class ---- //

// Make the class the default export so it can be used elsewhere
export default LedGauge

/** Self register the class to global
 * Enables new data lists to be dynamically added via JS
 * and lets the static methods be called
 */
window['LedGauge'] = LedGauge

// Self-register the HTML tag
customElements.define('led-gauge', LedGauge)
