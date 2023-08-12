/** A zero dependency web component that will display a circular thermometer display and controller for heating systems.
 * Based on @ghostmaster75's Node-RED Dashboard Widget of the same name: https://flows.nodered.org/flow/9ca3a19e0e2ff606bd64f1e73a2191eb
 *
 * See ./docs/ghost-thermometer.md for detailed documentation on installation and use.
 *
 * @version: 0.0.2 2023-08-12
 *
 * See https://github.com/runem/web-component-analyzer#-how-to-document-your-components-using-jsdoc on how to document
 *
 * Use `npx web-component-analyzer ./components/ghost-thermometer.js` to create/update the documentation
 *     or paste into https://runem.github.io/web-component-analyzer/
 * Use `npx web-component-analyzer ./components/*.js --format vscode --outFile ./vscode-descriptors/ti-web-components.html-data.json`
 *     to generate/update vscode custom data files. See https://github.com/microsoft/vscode-custom-data/tree/main/samples/webcomponents
 *
 * To Do:
 * -
 */
/*
  Copyright (c) 2023 Julian Knight (Totally Information)

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

const componentName = 'ghost-thermometer'
const className = 'GhostThermometer'

/** Properly round a floating point number (stupid JavaScript!)
 * @param {number} number The number to round
 * @param {number} digits The required decimal places to round to (default=0)
 * @returns {number} Input number rounded to requested DP's
 */
function floatRound(number, digits = 0) {
    const multiple = Math.pow(10, digits)
    return Math.round(number * multiple) / multiple
}

const template = document.createElement('template')
template.innerHTML = /** @type {HTMLTemplateElement} */ /*html*/`
    <style>
        :host {
            display: inline-block; /* default is inline */
            contain: content; /* performance boost */
            max-width: 400px; width:90%;

            --grey1-color: hsl(0, 0%, 87%); /* #dddddd; Divider line, dial label */
            --grey2-color: hsl(0, 0%, 53%); /* #888888 */ 
            --grey3-color: hsl(0, 0%, 20%); /* #333333 */
            --grey4-color: hsl(0, 0%, 12%); /* rgb(30,30,30) */
            --dark-color: hsl(0, 0%, 0%); /* black; */
            --grey-blue-color: hsl(218, 4%, 35%); /* rgb(86,89,94) grey-blue */
            /* --grey-blue-color2: hsl(218, 6%, 25%); #3b3e43 grey-blue2 */
            --text-color: hsl(0, 0%, 100%); /* #ffffff; */
            --warn-color: hsl(39, 100%, 50%); /* orange; */
            --off-color: hsl(0, 1%, 56%); /* rgb(143,141,141) off */
            --cooling-color: hsl(200, 62%, 58%); /* rgb(81,170,214) cooling, light blue */
            --heating-color: hsl(30, 100%, 50%); /* rgb(125,128,0) heating, dark orange */
        }

        svg {
            transition: all .6s cubic-bezier(0.175, 0.885, 0.32, 1.2);
        }

        stop {
            transition: all .5s;
        }

        .caption { 
            width: 100%;
            text-align: center;
        }

        .led {
            -webkit-transition: all 0.5s;
            transition: all 0.5s;
            fill: url(#ledColor);
        }

        .dial {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        .lbl {
            text-anchor: middle;
            fill : var(--text-color);
            clip-path: url(#qClip);
        }
        .lblDial {
            fill: var(--grey1-color);
        }

        .valMain {
            font-weight: 400;
            /* clip-path: url(#qClip); */
        }

        .lblAmbient tspan {
            font-weight: 400;
        }

        .lblTarget {
            font-weight: 400;
            fill: var(--warning-intense, --warn-color);
        }

        .lblTarget tspan {
            font-weight: 400;
            fill: var(--warning-intense, --warn-color);
            clip-path: url(#qClip);
        }    

        .nodisplay {
            display: none !important;
        }

        .animate {
            transition: all 0.5s;
        }
    </style>
        <svg 
            width="100%" height="100%" viewBox="0 0 400 400" class="dial"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
        >
            <defs>
                <linearGradient id="qGradient" gradientTransform="rotate(65)">
                    <stop offset="50%" stop-color="var(--grey-blue-color)"></stop>
                    <stop offset="65%" stop-color="var(--grey4-color)"></stop>
                </linearGradient>
                <clipPath id="qClip">
                    <circle cx="200" cy="200" r="175"></circle>
                </clipPath>
                <radialGradient id="ledColor" cx="50%" cy="50%" r="95%" fx="50%" fy="50%">
                    <stop offset="45%" stop-color="var(--off-color)" stop-opacity="1"></stop>
                    <stop offset="65%" stop-color="var(--dark-color)" stop-opacity="1"></stop>
                </radialGradient>
                <linearGradient id="eGradient" gradientTransform="rotate(55)">
                    <stop offset="55%" stop-color="var(--grey2-color)" stop-opacity="1"></stop>
                    <stop offset="95%" stop-color="var(--grey3-color)" stop-opacity="1"></stop>
                </linearGradient>
            </defs>
            <circle cx="200" cy="200" r="200" fill="url(#eGradient)"></circle>
            <circle cx="200" cy="200" r="197" stroke="var(--dark-color)" stroke-width="1" class="led"></circle>
            <circle cx="200" cy="200" r="180" fill="url(#qGradient)"></circle>
            <circle cx="200" cy="200" r="175" fill="url(#qGradient)"></circle>
            <text x="200" y="70" class="lbl lblDial" id="lblMain">
                AMBIENT
            </text>
            <text x="200" y="210" font-size="140" class="lbl valMain" id="valMain">
                --
            </text>
            <line x1="55" y1="235" x2="345" y2="235" stroke="var(--grey1-color)" stroke-width="1" opacity="0.8"></line>
            <text x="200" y="254" class="lbl" id="lblNote"> </text>
            <text x="125" y="285" class="lbl lblDial" id="lblLeft">
                SET
            </text>
            <text x="125" y="325" font-size="35" class="lbl lblTarget" id="valLeft">
                --
            </text>
            <text x="275" y="285" class="lbl lblDial" id="lblRight">
                MODE
            </text>
            <text x="275" y="325" font-size="35" class="lbl lblTarget icon" id="valRight">
                ⛔
            </text>
            <g>
                <rect opacity="0" width="350" height="200" x="25" y="30" id="clickMain">
                    <title id="titleMain">Current ambient temperature</title>
                </rect>
            </g>
            <g transform="translate(200,200)">
                <path d="M0,40 L0,175 A175,175 0 0,1 -175,40 z" opacity="0" id="btnLeft">
                    <title id="titleLeft">Current setpoint. Click to change</title>
                </path>
                <path d="M0,40 L175,40 A175,175 0 0,1 0,175 z" opacity="0" id="btnRight">
                    <title id="titleRight">Current mode. Click to change</title>
                </path>
            </g>
        </svg>
        <div class="caption"><slot></slot></div>
`

/** A Zero dependency button web component that will display a circular thermometer display and controller for heating systems.
 *  Contains relevant data from data-*, topic and payload attributes (or properties),
 *  includes a _meta object showing whether any modifier keys were used, the element id/name
 *
 * @element button-send
 *
 * @fires button-send:click - Document object event. evt.details contains the data
 * @fires {function} uibuilder.send - Sends a msg back to Node-RED if uibuilder available. topic, payload and _meta props may all be set.
 *
 * @attr {string} topic - Optional. Topic string to use. Mostly for node-red messages
 * @attr {string} payload - Optional. Payload string. Mostly for node-red messages. For non-string payload, see props below
 * @attr {string} id - Optional. HTML ID, must be unique on page. Included in output _meta prop.
 * @attr {string} name - Optional. HTML name attribute. Included in output _meta prop.
 * @attr {string} data-* - Optional. All data-* attributes are returned in the _meta prop as a _meta.data object.
 *
 * @prop {any|string} payload - Can be an attribute or property. If used as property, must not use payload attribute in html, allows any data to be attached to payload. As an attribute, allows a string only.
 * @prop {string} topic - Optional. Topic string to use. Mostly for node-red messages
 * @prop {Array<string>} props - List of watched HtML Attributes
 *
 * @slot default - Button label. Allows text, inline and most block tags to be included (unlike the standard button tag which only allows inline tags).
 *
 * @csspart button - Uses the uib-styles.css uibuilder master for variables where available.
 *
 * See https://github.com/runem/web-component-analyzer#-how-to-document-your-components-using-jsdoc on how to document
 */
export default class GhostThermometer extends HTMLElement {
    //#region --- Class Properties ---

    /** @type {string} topic - Optional. Topic string to use. Mostly for node-red messages */
    topic = ''
    /** @type {any|string} payload - Can be an attribute or property. If used as property, must not use payload attribute in html, allows any data to be attached to payload. As an attribute, allows a string only. */
    payload = ''
    /** What is the current display mode? */
    displayMode = 'default'

    // numTemperature = 0
    // numSetpoint = 0
    switchState = 'off'

    modes = {
        heating: {
            label: 'heating',
            icon: '🔥',
        },
        cooling: {
            label: 'cooling',
            icon: '❄️',
        },
        off: {
            label: 'off',
            icon: '⛔',
        },
    }

    /** Holds a count of how many instances of this component are on the page */
    static _iCount = 0
    /** @type {Array<string>} List of all of the html attribs (props) listened to */
    static props = ['name', 'id', 'temperature', 'setpoint', 'mode']

    //#endregion --- Class Properties ---

    //#region ---- Utility Functions ----

    /** Mini jQuery-like shadow dom selector
     * @param {string} selection HTML element selector
     * @returns {HTMLElement | null} The discovered element
     */
    $(selection) {
        return this.shadowRoot && this.shadowRoot.querySelector(selection)
    }

    /** Convert a string 'true' or 'false' to a boolean true/false
     * @param {*} strvalue The string representation of the boolean
     * @returns {boolean}
     */
    str2bool(strvalue) {
        return (strvalue && typeof strvalue === 'string') ? (strvalue.toLowerCase() === 'true') : (strvalue === true)
    }

    /** Set the note label if required
     * @param {string} note The text to display
     * @param {HTMLElement} lblNote Reference to the SVG <text> element containing the text
     */
    doNote(note, lblNote) {
        if ( note === '' ) note = ' '
        lblNote.childNodes[0].nodeValue = note
    }

    /** uibuilder send */
    uibSend() {
        if (!window['uibuilder']) return
        window['uibuilder'].send({
            payload: {
                id: this.id,
                temperature: this.numTemperature,
                switchState: this.switchState,
                mode: this.mode,
                setpoint: this.numSetpoint,
            }
        })
    }

    /** When the temp or setpoint changes, check the heating/cooling mode and change if needed */
    checkMode() {
        if ( !this.numTemperature || !this.numSetpoint ) return

        if ( this.mode === 'heating' && this.numSetpoint > this.numTemperature ) {
            this.$('#ledColor > stop:nth-child(1)').setAttribute('stop-color', 'var(--heating-color)')
            if ( this.switchState !== 'heating') {
                this.switchState = 'heating'
                this.uibSend()
            }
        } else if ( this.mode === 'cooling' && this.numSetpoint < this.numTemperature ) {
            this.$('#ledColor > stop:nth-child(1)').setAttribute('stop-color', 'var(--cooling-color)')
            if ( this.switchState !== 'cooling') {
                this.switchState = 'cooling'
                this.uibSend()
            }
        } else {
            this.$('#ledColor > stop:nth-child(1)').setAttribute('stop-color', 'var(--off-color)')
            if ( this.switchState !== 'off') {
                this.switchState = 'off'
                this.uibSend()
            }
        }
    }

    //#endregion ---- ---- ---- ----

    //#region ---- Event Handlers ----

    /** Handle a `uibuilder:msg:_ui:update:${this.id}` custom event
     * @param {CustomEvent} evt uibuilder `uibuilder:msg:_ui:update:${this.id}` custom event evt.details contains the data
     */
    _uibMsgHandler(evt) {
        // If there is a payload, we want to replace the slot - easiest done from the light DOM
        // if ( evt['detail'].payload ) {
        //     const el = document.getElementById(this.id)
        //     el.innerHTML = evt['detail'].payload
        // }
        // If there is a payload, we want to replace the VALUE
        // if ( evt['detail'].payload ) {
        //     const el = this.shadowRoot.getElementById('value')
        //     el.innerHTML = evt['detail'].payload
        // }
    }

    _btnLeftClick(evt) {
        if (this.displayMode === 'default' ) {
            // Switch to set mode
            this.displayMode = 'set'
            this.$('#lblMain').childNodes[0].nodeValue = 'SET'
            this.$('#valMain').childNodes[0].nodeValue = this.setpoint || '--'
            this.$('#lblLeft').childNodes[0].nodeValue = ''
            this.$('#valLeft').childNodes[0].nodeValue = '-'
            this.$('#lblRight').childNodes[0].nodeValue = ''
            this.$('#valRight').childNodes[0].nodeValue = '+'

        } else if (this.displayMode === 'set' ) {
            // decrement set temperature
            const inc = Number(this.setincrement)
            const min = Number(this.minset)
            this.numSetpoint = floatRound(this.numSetpoint - inc, 1)
            if (isNaN(this.numSetpoint)) this.numSetpoint = 20
            if ( this.numSetpoint >= min ) {
                this.setpoint = this.numSetpoint
                this.doNote(' ', this.$('#lblNote'))
            } else this.doNote(`Already at min setpoint (${min})`, this.$('#lblNote'))

        } else if (this.displayMode === 'mode' ) {
            // change node
            if (this.mode === 'heating') this.mode = 'off'
            else if (this.mode === 'cooling') this.mode = 'heating'
            else this.mode = 'cooling'
            this.checkMode()
        }
    }

    _btnRightClick(evt) {
        if (this.displayMode === 'default' ) {
            // Switch to mode change mode
            this.displayMode = 'mode'
            this.$('#lblMain').childNodes[0].nodeValue = 'MODE'
            this.$('#valMain').childNodes[0].nodeValue = this.modes[this.mode].icon || '⚠️'
            this.$('#lblLeft').childNodes[0].nodeValue = ''
            this.$('#valLeft').childNodes[0].nodeValue = '<'
            this.$('#lblRight').childNodes[0].nodeValue = ''
            this.$('#valRight').childNodes[0].nodeValue = '>'

        } else if (this.displayMode === 'set' ) {
            // increment set temperature
            const inc = Number(this.setincrement)
            const max = Number(this.maxset)
            this.numSetpoint = floatRound(this.numSetpoint + inc, 1)
            if (isNaN(this.numSetpoint)) this.numSetpoint = 20
            if (this.numSetpoint <= max) {
                this.setpoint = this.numSetpoint
                this.doNote(' ', this.$('#lblNote'))
            } else this.doNote(`Already at max setpoint (${max})`, this.$('#lblNote'))

        } else if (this.displayMode === 'mode' ) {
            // change node
            if (this.mode === 'heating') this.mode = 'cooling'
            else if (this.mode === 'cooling') this.mode = 'off'
            else this.mode = 'heating'
            this.checkMode()
        }
    }

    _clickMain(evt) {
        if (this.displayMode !== 'default' ) {
            this.displayMode = 'default'
            this.doNote(' ', this.$('#lblNote'))
            this.$('#lblMain').childNodes[0].nodeValue = 'AMBIENT'
            this.$('#valMain').childNodes[0].nodeValue = this.temperature || '--'
            this.$('#lblLeft').childNodes[0].nodeValue = 'SET'
            this.$('#valLeft').childNodes[0].nodeValue = this.setpoint || '--'
            this.$('#lblRight').childNodes[0].nodeValue = 'MODE'
            this.$('#valRight').childNodes[0].nodeValue = this.modes[this.mode].icon || '⚠️'
        }
    }

    //#endregion ---- ---- ---- ----

    //#region --- Getters/Setters ---

    get temperature() {
        return this.getAttribute('temperature') || '--'
    }

    set temperature(value) {
        this.numTemperature = value === '--' ? 0 : Number(value)
        this.checkMode()
        this.setAttribute('temperature', value || '--')
    }

    get setpoint() {
        return this.getAttribute('setpoint') || '--'
    }

    set setpoint(value) {
        this.numSetpoint = value === '--' ? 0 : Number(value)
        this.checkMode()
        this.setAttribute('setpoint', value || '--')
    }

    get minset() {
        return this.getAttribute('minset') || -999
    }

    set minset(value) {
        this.setAttribute('minset', value || -999)
    }

    get maxset() {
        return this.getAttribute('maxset') || 999
    }

    set maxset(value) {
        this.setAttribute('maxset', value || 999)
    }

    get setincrement() {
        return this.getAttribute('setincrement') || 0.1
    }

    set setincrement(value) {
        this.setAttribute('setincrement', value || 0.1)
    }

    get mode() {
        return this.getAttribute('mode') || 'off'
    }

    set mode(value) {
        this.setAttribute('mode', value || 'off')
    }

    //#endregion --- --- ---

    constructor() {
        super()
        this.attachShadow({ mode: 'open', delegatesFocus: true })
            .append(template.content.cloneNode(true))

        this._data = { ...this.dataset } // All of the data-* attributes as an object
        this._name = this.getAttribute('name')
        this._msg = {
            'topic': this.topic,
            'payload': this.payload ? this.payload : this._data,
            '_meta': {
                id: this.id,
                name: this._name,
                data: this._data, // All of the data-* attributes as an object
            }
        }

        this._clickEvt = new CustomEvent('button-send:click', { 'detail': this._msg })
        this.dispatchEvent(new Event(`${componentName}:construction`, { bubbles: true, composed: true }))

        // Get a reference to the (optional) uibuilder FE client library if possible
        try {
            this.uibuilder = window['uibuilder']
        } catch (e) {
            this.uibuilder = undefined
        }

        // this.addEventListener('click', evt => {
        //     evt.preventDefault()
        //     this._msg._meta = {
        //         id: this.id,
        //         name: this._name,
        //         data: this._data, // All of the data-* attributes as an object
        //         altKey: evt.altKey,
        //         ctrlKey: evt.ctrlKey,
        //         shiftKey: evt.shiftKey,
        //         metaKey: evt.metaKey,
        //     }
        //     document.dispatchEvent(this._clickEvt)
        //     this.uibuilder.send(this._msg)
        // })

    }

    static get observedAttributes() {
        return this.props
    }

    /** NOTE: On initial startup, this is called for each watch attrib set in HTML - BEFORE connectedCallback is called  */
    attributeChangedCallback(attrib, oldVal, newVal) {
        // Make sure instance has an ID. Create an id from name or calculation if needed
        // NB: Done here, not in connectedCallback because this fn is called BEFORE that one on first startup
        //     and the inital attrib handling may result in a msg back to Node-RED via uibuilder (if using that)
        if (!this.id) {
            if (!this.name) this.name = this.getAttribute('name')
            if (this.name) this.id = this.name.toLowerCase().replace(/\s/g, '_')
            else this.id = `ghostthermometer-${++GhostThermometer._iCount}`
        }

        if ( oldVal === newVal ) return

        switch (attrib) {
            case 'temperature': {
                // NB: mode change checks are done in the setter
                if (this.displayMode === 'default' ) this.$('#valMain').childNodes[0].nodeValue = newVal || '--'
                break
            }

            case 'setpoint': {
                // NB: mode change checks are done in the setter
                if ( newVal > this.maxset ) {
                    throw new Error(`Setpoint (${newVal}) must be <= ${this.maxset} (maxset) for <ghost-thermometer id="${this.id}">`)
                } else if ( newVal < this.minset ) {
                    throw new Error(`Setpoint (${newVal}) must be >= ${this.minset} (maxset) for <ghost-thermometer id="${this.id}">`)
                }

                if (this.displayMode === 'default' ) this.$('#valLeft').childNodes[0].nodeValue = newVal || '--'
                else if (this.displayMode === 'set' ) this.$('#valMain').childNodes[0].nodeValue = newVal || '--'
                break
            }

            case 'mode': {
                if ( !Object.keys(this.modes).includes(newVal) ) {
                    this.doNote(`Invalid mode "${newVal}"`, this.$('#lblNote'))
                    this.$('#valRight').childNodes[0].nodeValue = this.$('#valMain').childNodes[0].nodeValue = '⚠️'
                    throw new Error(`Invalid mode (${newVal}). Must be one of "${Object.keys(this.modes).join('", "')}" for <ghost-thermometer id="${this.id}">`)
                }

                if (this.displayMode === 'default' ) this.$('#valRight').childNodes[0].nodeValue = this.modes[newVal].icon || '⚠️'
                else if (this.displayMode === 'mode' ) this.$('#valMain').childNodes[0].nodeValue = this.modes[newVal].icon || '⚠️'
                break
            }

            default: {
                break
            }
        }

        this[attrib] = newVal

    } // --- end of attributeChangedCallback --- //

    // when the component is added to doc. NB: Initial attributeChangedCallbacks happen first
    connectedCallback() {
        // Listen for a uibuilder msg that is targetted at this instance of the component
        document.addEventListener(`uibuilder:msg:_ui:update:${this.id}`, this._uibMsgHandler.bind(this))

        // Add click event handlers for SVG regions
        this.$('#btnLeft').onclick = this._btnLeftClick.bind(this)
        this.$('#btnRight').onclick = this._btnRightClick.bind(this)
        this.$('#clickMain').onclick = this._clickMain.bind(this)
    }

    // Runs when an instance is removed from the DOM
    disconnectedCallback() {
        // NB: Dont decrement GhostThermometer._iCount because that could lead to id nameclashes

        // @ts-ignore
        document.removeEventListener(`uibuilder:msg:_ui:update:${this.id}`, this._uibMsgHandler)
    }

} // ---- End of DefinitionList class definition ---- //

/** Self register the class to global
 * Enables new widgets to be dynamically added via JS
 * and lets the static methods be called
 */
window[className] = GhostThermometer

// Add the class as a new Custom Element to the window object
customElements.define(componentName, GhostThermometer)
