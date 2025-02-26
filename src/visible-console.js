/** A zero dependency web component that will display JavaScript console output on-page.
 *
 * Version See Class version property
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
 * - [STARTED] Add actual calling fn/line number to the output. Add extra line to console output and a tooltip or similar for the visible display.
 * - Add part transparent color backgrounds for at least warn and err
 * - std parts
 * - allow to be separate from console (via an attribute) for custom visual logging
 * - Max entry limit
 */

import TiBaseComponent from '../libs/ti-base-component'

/** Only use a template if you want to isolate the code and CSS */
const template = document.createElement('template')
template.innerHTML = /** @type {HTMLTemplateElement} */ /*html*/`
    <style>
        :host {
            display: block;   /* default is inline */
            contain: content; /* performance boost */
        }

        .wrapper {
            display: grid;
            grid-template-columns: minmax(6ch, 1fr) minmax(75%, 5fr);
            column-gap: 1rem;
            row-gap: .3rem;
            align-content: start;

            height: 22em;
            overflow: auto;
            resize: vertical;

            font-family: Consolas, "ui-monospace", "Lucida Console", monospace;
            font-size: smaller;
            /* white-space: pre; */
            background-color:black;
            border: 1px solid silver;
        }

        .meta {
            /* grid-area: meta; */
            border-right: 1px solid silver;
            font-size: larger;
            /* background-color:black; */
            /* white-space: pre; */
        }
        
        .data {
            /* grid-area: content; */
            /* color:white; */
            /* display:block; */
            /* background-color:black; */
            /* padding:5px 10px; */
            /* font-family: Consolas, "ui-monospace", "Lucida Console", monospace; */
            /* font-size: smaller; */
            /* white-space: pre; */
            /* width: 99%; */
            /* height: 22em; */
            /* overflow: auto; */
            /* resize: both; */
        }
        .key {color:#ffbf35}
        .string {color:#5dff39;}
        .number {color:#70aeff;}
        .boolean {color:#b993ff;}
        .null {color:#93ffe4;}
        .undefined {color:#ff93c9;}

        .log {color: hsl(120 100 77);}
        .info {color: hsl(212 100 77);}
        .warn {color: orange;}
        .error {color: red;}
        .data-info {background-color: hsl(192 100 42 /0.3);}
        .data-warn {background-color: hsl(39 100 42 /0.3);}
        .data-error {background-color: hsl(0 100 42 /0.3);}

    </style>
    <div class="wrapper"></div>
`

/** Get the file, line and column number of the calling function
 * Used to capture the originating file and line number of the console output for output because the process otherwise changes the file/line number.
 * @returns {Array|null} An array of arrays containing the file, line and column number or null if parsing fails
 */
function getStackTrace() {
    return new Error().stack.split('\n').slice(1).map(line => { // eslint-disable-line @stylistic/newline-per-chained-call
        // Ignore any line that contains the text "dist/visible-console." ie this file
        if (line.includes('dist/visible-console.')) return null
        /** Only return the file, line and column number @type {Array<string|number>} */
        const match = line.match(/\/([^\/:]+):(\d+):(\d+)\)?$/)
        if (match) {
            try { match[2] = Number(match[2]) } catch (e) { /* empty */ }
            try { match[3] = Number(match[3]) } catch (e) { /* empty */ }
            return [match[1], match[2], match[3]]
        }
        // Return null if parsing fails
        return null
        // Remove null entries if parsing fails
    }).filter(Boolean) // eslint-disable-line @stylistic/newline-per-chained-call
}

/**
 * @namespace Beta
 */

/**
 * @class
 * @augments TiBaseComponent
 * @description A zero dependency web component that will display JavaScript console output on-page.
 *
 * @element component-template
 * @memberOf Beta
 *
 * @example
 *    <visible-console></visible-console>

 * METHODS FROM BASE:
  * @function config Update runtime configuration, return complete config
  * @function createShadowSelectors Creates the jQuery-like $ and $$ methods
  * @function deepAssign Object deep merger
  * @function doInheritStyles If requested, add link to an external style sheet
  * @function ensureId Adds a unique ID to the tag if no ID defined.
  * @function _uibMsgHandler Not yet in use
  * @function _event (name,data) Standardised custom event dispatcher
 * OTHER METHODS:
  * @function redirectConsole Capture console.xxxx and write to the div
  * @function newLog Creates a new HTML log entry
  * @function checkType Find out the input JavaScript var type
  * @function createHTMLVisualizer Creates an HTML visualisation of the input

 * CUSTOM EVENTS:
  * "visible-console:connected" - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
  * "component-template:ready" - Alias for connected. The instance can handle property & attribute changes
  * "visible-console:disconnected" - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
  * "visible-console:attribChanged" - When a watched attribute changes. `evt.details` contains the details of the change.
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
  * @property {object} colors The colors to use for different console output types
  * @property {object} bgColors The background colors to use for different console output types
  * @property {object} icons The icons to use for different console output types

 * @slot No slot

 * See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc
 */
class VisibleConsole extends TiBaseComponent {
    /** Component version */
    static componentVersion = '2025-02-25'

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

    // Keep a COPY of the original console so we can still use it if we want
    nativeConsole = { ...console, }

    /** Runtime configuration settings */
    opts = {}

    colors = {
        'log': 'green',
        'error': 'red',
        'warn': 'orange',
    }

    bgColors = {
        'info': 'hsl(92, 100, 50, 0.3)',
        'warn': 'hsl(39, 100, 50, 0.3)',
        'error': 'hsl(0, 100, 50, 0.3)',
    }

    icons = {
        'log': '> ',
        'info': 'ℹ️ ',
        'debug': '🪲 ',
        'trace': '👓 ',
        'warn': '⚠️ ',
        'error': '⛔ ',
    }

    //#endregion --- Class Properties ---

    /** NB: Attributes not available here - use connectedCallback to reference */
    constructor() {
        super()

        this.attachShadow({ mode: 'open', delegatesFocus: true, })
            // Only append the template if code and style isolation is needed
            .append(template.content.cloneNode(true))

        // jQuery-like selectors but for the shadow. NB: Returns are STATIC not dynamic lists
        this.createShadowSelectors()  // in base class

        // @ts-ignore
        this.wrapper = this.shadowRoot.querySelector('.wrapper')
    }

    /** Runs when an instance is added to the DOM */
    connectedCallback() {
        // Make sure instance has an ID. Create an id from name or calculation if needed
        this.ensureId()  // in base class

        // Apply parent styles from a stylesheet if required - only required if using an applied template
        this.doInheritStyles()  // in base class

        this.redirectConsole()

        // Keep at end. Let everyone know that a new instance of the component has been connected
        this._event('connected')
        this._event('ready')
    }

    /** Runs when an instance is removed from the DOM */
    disconnectedCallback() {
        // Keep at end. Let everyone know that an instance of the component has been disconnected
        this._event('disconnected')
    }

    /** Handle watched attributes
     * NOTE: On initial startup, this is called for each watched attrib set in HTML - BEFORE connectedCallback is called.
     * Attribute values can only ever be strings
     * @param {string} attrib The name of the attribute that is changing
     * @param {string} oldVal The old value of the attribute
     * @param {string} newVal The new value of the attribute
     */
    attributeChangedCallback(attrib, oldVal, newVal) {
        // Don't bother if the new value same as old
        if ( oldVal === newVal ) return
        // Create a property from the value - WARN: Be careful with name clashes
        this[attrib] = newVal

        // Add other dynamic attribute processing here.
        // If attribute processing doesn't need to be dynamic, process in connectedCallback as that happens earlier in the lifecycle

        // Keep at end. Let everyone know that an attribute has changed for this instance of the component
        this._event('attribChanged', { attribute: attrib, newVal: newVal, oldVal: oldVal, })
    }

    /** Capture console.xxxx and write to the div
     * NB: Cannot use bind here and so console output will have the wrong file/line number
      */
    redirectConsole() {
        Object.keys(this.icons).forEach( method => {
            console[method] = (...args) => {
                // capture the originating file and line number
                // this.nativeConsole.log(getStackTrace())
                // Call the original console.log - apply adds this fn to the callback trace 😞
                this.nativeConsole[method].apply(console[method], args)
                // Add the log to the visible console
                this.newLog(method, args)
            }
        })
    }

    /** Creates a new HTML log entry
     * @param {string} type The log type
     * @param {*} args The arguments to log
     */
    newLog(type, args) {
        const icon = this.icons?.[type] || ''

        // TODO Use template and clone
        // Create a new line in the output div
        const newMeta  = document.createElement('div')
        newMeta.className = `meta ${type}`
        newMeta.innerHTML = `${icon} ${type}`
        this.wrapper?.appendChild(newMeta)

        // Convert args to a string
        const message = args.map(arg => {
            return this.createHTMLVisualizer(arg)
        })

        const newLog = document.createElement('div')
        newLog.className = `data data-${type}`
        message.forEach( el => {
            newLog.appendChild(el)
        } )
        this.wrapper?.appendChild(newLog)

        // Scroll to the bottom
        // @ts-ignore
        this.wrapper.scrollTop = this.wrapper?.scrollHeight
    }

    /** Find out the input JavaScript var type
     * @param {*} input The JavaScript var to type
     * @returns {string} The input type
     */
    checkType(input) {
        if (input === null) {
            return 'null'
        } else if (Array.isArray(input)) {
            return 'array'
        } else if (typeof input === 'object') {
            return 'object'
        }

        return typeof input
    }

    /** Creates an HTML visualisation of the input
     * @param {*} input Input data value to visualise
     * @returns {HTMLDivElement} DIV element containing the visualisation
     */
    createHTMLVisualizer(input) {
        const container = document.createElement('div')
        // container.style.backgroundColor = 'black'
        // container.style.color = 'white'
        // container.style.fontFamily = 'monospace'
        // container.style.padding = '10px'
        // container.style.whiteSpace = 'pre-wrap'

        const renderValue = (value, level = 0) => {
            const wrapper = document.createElement('div')
            wrapper.style.marginLeft = `${level * 10}px`

            if (level > 10) formatPrimitive(value) // not ideal but it doesn't crash
            else if (Array.isArray(value)) {
                wrapper.appendChild(renderCollapsible('Array', value, level, '[', ']'))
            } else if (value && typeof value === 'object') {
                wrapper.appendChild(renderCollapsible('Object', value, level, '{', '}'))
            } else {
                wrapper.appendChild(formatPrimitive(value))
            }
            return wrapper
        }

        const renderCollapsible = (label, value, level, openSymbol, closeSymbol) => {
            const container = document.createElement('div')
            const header = document.createElement('span')
            const content = document.createElement('div')
            const icon = document.createElement('span')

            icon.textContent = '▶'  // Initial icon for collapsed state
            header.textContent = ` ${openSymbol}${getCollapsedSummary(value)}${closeSymbol}`
            header.style.cursor = 'pointer'
            // header.style.color = 'lightblue'

            icon.style.cursor = 'pointer'
            // icon.style.color = 'lightblue'
            icon.addEventListener('click', () => {
                const isCollapsed = content.style.display === 'none'
                content.style.display = isCollapsed ? 'block' : 'none'
                icon.textContent = isCollapsed ? '▼' : '▶'
                header.textContent = isCollapsed ? ` ${openSymbol}` : ` ${openSymbol}${getCollapsedSummary(value)}${closeSymbol}`
            })

            header.addEventListener('click', () => {
                const isCollapsed = content.style.display === 'none'
                content.style.display = isCollapsed ? 'block' : 'none'
                icon.textContent = isCollapsed ? '▼' : '▶'
                header.textContent = isCollapsed ? ` ${openSymbol}` : ` ${openSymbol}${getCollapsedSummary(value)}${closeSymbol}`
            })

            content.style.display = 'none'
            content.style.marginLeft = '20px'

            for (const key in value) {
                const line = document.createElement('div')
                line.style.marginLeft = `${level * 10}px`
                const keySpan = document.createElement('span')
                keySpan.style.color = 'orange'
                keySpan.textContent = `${key}: `

                const valueSpan = renderValue(value[key], level++)
                line.appendChild(keySpan)
                line.appendChild(valueSpan)
                content.appendChild(line)
            }

            const closeSymbolSpan = document.createElement('span')
            closeSymbolSpan.textContent = ` ${closeSymbol}`
            closeSymbolSpan.style.color = 'lightblue'

            container.appendChild(icon)
            container.appendChild(header)
            container.appendChild(content)
            container.appendChild(closeSymbolSpan)

            return container
        }

        const getCollapsedSummary = (value) => {
            let summary = ''
            if (Array.isArray(value)) {
                summary = value.map(v => getPrimitiveSummary(v)).join(', ')
            } else if (typeof value === 'object') {
                summary = Object.keys(value).map(key => `${key}: ${getPrimitiveSummary(value[key])}`).join(', ') // eslint-disable-line @stylistic/newline-per-chained-call
            }
            if (summary.length > 30) {
                summary = summary.slice(0, 30) + '...'
            }
            return summary
        }

        const getPrimitiveSummary = (value) => {
            if (typeof value === 'string') {
                return `"${value}"`
            } else if (typeof value === 'number') {
                return value
            } else if (typeof value === 'boolean') {
                return value
            } else if (value === null) {
                return 'null'
            } else if (typeof value === 'undefined') {
                return 'undefined'
            } else if (typeof value === 'bigint') {
                return `${value}n`
            } else if (typeof value === 'function') {
                return '[Function]'
            } else if (Array.isArray(value)) {
                return '[Array]'
            } else if (typeof value === 'object') {
                return '[Object]'
            }
        }

        const formatPrimitive = (value) => {
            const span = document.createElement('span')
            if (typeof value === 'string') {
                span.style.color = 'lightgreen'
                span.textContent = `"${value}"`
            } else if (typeof value === 'number') {
                span.style.color = 'lightcoral'
                // @ts-ignore
                span.textContent = value
            } else if (typeof value === 'boolean') {
                span.style.color = 'lightyellow'
                // @ts-ignore
                span.textContent = value
            } else if (value === null) {
                span.style.color = 'gray'
                span.textContent = 'null'
            } else if (typeof value === 'undefined') {
                span.style.color = 'gray'
                span.textContent = 'undefined'
            } else if (typeof value === 'bigint') {
                span.style.color = 'lightcoral'
                span.textContent = `${value}n`
            } else if (typeof value === 'function') {
                span.style.color = 'violet'
                span.textContent = '[Function]'
            }
            return span
        }

        container.appendChild(renderValue(input))
        return container
    }
}

// Make the class the default export so it can be used elsewhere
export default VisibleConsole

/** Self register the class to global
 * Enables new data to be dynamically added via JS
 * and lets any static methods be called
 */
window['VisibleConsole'] = VisibleConsole

// Add the class as a new Custom Element to the window object
customElements.define('visible-console', VisibleConsole)
