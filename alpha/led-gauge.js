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
            --on-hue: 0; /* 0 = red, 120 = green, 240 = blue */
            --off-hue: 0;
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
            background-color: hsl(var(--off-hue, 0), var(--off-sat, 20%), var(--off-lum, 25%));
            height: 20px;
            border-radius: 3px;
            border: 1px solid var(--gauge-background-color);
            cursor: pointer;
        }

        .led.on {
            background-color: hsl(var(--on-hue, 0), var(--on-sat, 100%), var(--on-lum, 45%));
            /* box-shadow: 0 0 5px hsl(var(--on-hue, 0), var(--on-sat, 100%), var(--on-lum, 45%)); */
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

    <slot class="label"></slot>
    <output class="value"></output>
    <div class="segments" arial-label="Visual LED Gauge"></div>
    <div class="segvals"></div>
`

/** Namespace
 * @namespace Alpha
 */

/** TODO
 * Update class docs
 * Add uibuilder support
 * Add segment colors
 * 
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
  * @attr {string} label
  * @attr {string} label-position
  * @attr {string} segments
  * @attr {string} colour-segments

 * PROPS FROM BASE:
  * @prop {number} _iCount Static. The component version string (date updated)
  * @prop {boolean} uib True if UIBUILDER for Node-RED is loaded
  * @prop {object} uibuilder Reference to loaded UIBUILDER for Node-RED client library if loaded (else undefined)
  * @prop {function(string): Element} $ jQuery-like shadow dom selector (or undefined if shadow dom not used)
  * @prop {function(string): NodeList} $$  jQuery-like shadow dom multi-selector (or undefined if shadow dom not used)
  * @prop {boolean} connected False until connectedCallback finishes
  * @prop {string} name Placeholder for the optional name attribute
  * @prop {object} opts This components controllable options - get/set using the `config()` method - empty object by default
  * @prop {string} baseVersion Static. The base component version string (date updated).
 * OTHER STANDARD PROPS:
  * @prop {string} componentVersion Static. The component version string (date updated). Also has a getter that returns component and base version strings.

 * Other props:
    * @prop {number} value (getter/setter) The current value of the gauge. #value is the private equivalent property
    * @prop {number} segments (getter/setter) The number of segments in the gauge. #segments is the private equivalent property
    * @prop {number} min The minimum value of the gauge
    * @prop {number} max The maximum value of the gauge
    * @prop {string} unit The unit of the gauge value
    * @prop {string[]} colourSegments The color of each segment in the gauge
    * @prop {HTMLElement} segmentsEl The container for the gauge segments
    * @prop {HTMLElement} segValsEl The container for the segment values
    * @prop {HTMLElement} valueEl The container for the gauge value
  * By default, all attributes are also created as properties

 * @slot Container contents

 * See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc
 */
class LedGauge extends TiBaseComponent {
    /** Component version */
    static componentVersion = '2025-01-08'

    #value = 0
    #segments = 10

    min = 0
    max = 100
    unit = '%'
    colourSegments = []

    /** @type {HTMLElement} */
    segmentsEl
    /** @type {HTMLElement} */
    segValsEl
    /** @type {HTMLElement} */
    valueEl

    /** Makes HTML attribute change watched
     * @returns {Array<string>} List of all of the html attribs (props) listened to
     */
    static get observedAttributes() {
        return [
            // Standard watched attributes:
            'inherit-style', 'name',
            // Other watched attributes:
            'value', 'min', 'max', 'unit',
            'label', 'label-position',
            'segments', 'colour-segments',
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
        // Ensure that saved #segments value is numeric
        this.#value = parseFloat(val.toString())
        // (Re)Create and show the gauge
        this._renderGauge()
        // Notify listeners of the change
        this._event('value-change', {
            value: this.value,
        })
    }

    /** Get the value of the gauge
     * @returns {number} The current value
     */
    get value() {
        return this.#value
    }

    /** NB: Attributes not available here - use connectedCallback to reference */
    constructor() { // eslint-disable-line no-useless-constructor
        super()
        // Only attach the shadow dom if code and style isolation is needed - comment out if shadow dom not required
        if (template && template.content) this._construct(template.content.cloneNode(true))
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

        // Add other dynamic attribute processing here.
        // If attribute processing doesn't need to be dynamic, process in connectedCallback as that happens earlier in the lifecycle
        if (attrib === 'value') {
            this.valueChanged(newVal, oldVal)
        }

        // Keep at end. Let everyone know that an attribute has changed for this instance of the component
        this._event('attribChanged', { attribute: attrib, newVal: newVal, oldVal: oldVal })
    }

    /** Create the gauge */
    _renderGauge() {
        this.segmentsEl = this.shadowRoot.querySelector('.segments')
        this.segValsEl = this.shadowRoot.querySelector('.segvals')
        this.valueEl = this.shadowRoot.querySelector('.value')

        // Calculate the segment step size
        const step = (this.max - this.min) / this.segments

        // Clear out the existing segments
        this.segmentsEl.innerHTML = ''
        this.segValsEl.innerHTML = ''

        // Create LED segments
        for (let i = 0; i < this.segments; i++) {
            // Create the segments
            const segment = document.createElement('div')
            segment.classList.add('led')
            const segmentValue = this.min + i * step
            segment.title = segmentValue.toString()

            // Create the segment values
            if (i === 0) {
                const segVal = document.createElement('div')
                this.segValsEl.appendChild(segVal)
            }
            const segVal = document.createElement('div')
            // segVal.classList.add('led');
            segVal.innerText = Math.round(segmentValue).toString()

            // Set segment color and on/off state based on the current value
            if (this.colourSegments.length > 0) {
                const segmentColor = this.colourSegments[i] || 'var(--led-off-color)'
                segment.style.backgroundColor = segmentColor
            }

            if (this.value >= segmentValue) {
                segment.classList.add('on')
            }

            // Attach click event listener
            segment.addEventListener('click', () => {
                this._event('segment-click', {
                    gaugeValue: this.value,
                    segment: i,
                    segmentValue: segmentValue,
                })
            })

            this.segmentsEl.appendChild(segment)
            this.segValsEl.appendChild(segVal)
        }

        const segVal = document.createElement('div')
        this.segValsEl.appendChild(segVal)
        segVal.innerText = this.max.toString()

        // Render label with current value and unit if applicable
        // const labelPosition = this.getAttribute('label-position') || 'above';
        // const labelContent = this.getAttribute('label') || '';
        this.valueEl.innerText = `${this.value}${this.unit}`
        // const showValue = this.hasAttribute('show-value') ? `<span class="value">${this.value}${this.unit}</span>` : '';
        // this.labelElement.innerHTML = labelPosition.includes('below') ? labelContent + showValue : showValue + labelContent;

        // Adjust layout for label position
        // const isHorizontal = this.getAttribute('layout') === 'horizontal' ?? true;
        // this.shadowRoot.querySelector('.gauge').style.gridTemplateColumns = isHorizontal ? 'auto 1fr' : '1fr';
    }

    /** Process value changed event
     * @param {string} newVal The new value
     * @param {string} oldVal The old value
     */
    valueChanged(newVal, oldVal) {
        console.log('Value changed', newVal, oldVal)
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
