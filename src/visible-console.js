/** A zero dependency web component that will display JavaScript console output on-page.
 *
 * @version See Class version property
 *
 */
/*
  Copyright (c) 2024-2024 Julian Knight (Totally Information)

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

/** TODO
 * - Add part transparent color backgrounds for at least warn and err
 * - std parts
 * - allow to be separate from console (via an attribute) for custom visual logging
 * - Max entry limit
 */

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

import TiBaseComponent from '../libs/ti-base-component'

/**
 * @namespace Beta
 */

/**
 * @class
 * @extends TiBaseComponent
 * @description A zero dependency web component that will display JavaScript console output on-page.
 *
 * @element component-template
 * @memberOf Beta
 *
 * @example
 *    <visible-console></visible-console>
 * 
 * @method config Update runtime configuration, return complete config
 * @method doInheritStyles If requested, add link to an external style sheet
 * @method deepAssign Object deep merger
 * @method redirectConsole Capture console.xxxx and write to the div
 * @method newLog Creates a new HTML log entry
 * @method checkType Find out the input JavaScript var type
 * @method createHTMLVisualizer Creates an HTML visualisation of the input
 *
 * @fires visible-console:connected - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
 * @fires visible-console:disconnected - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
 * @fires visible-console:attribChanged - When a watched attribute changes. `evt.details` contains the details of the change.
 * NOTE that listeners can be attached either to the `document` or to the specific element instance.
 *
 * Standard watched attributes (common across all my components):
 * @attr {string|boolean} inherit-style - Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load.
 * Other watched attributes:
 * None
 *
 * Standard props (common across all my components):
 * @prop {string} version Static. The component version string (date updated). Also has a getter.
 * @prop {boolean} uib True if UIBUILDER for Node-RED is loaded
 * @prop {function(string): Element} $ jQuery-like shadow dom selector
 * @prop {function(string): NodeList} $$  jQuery-like shadow dom multi-selector
 * @prop {number} _iCount The component version string (date updated)
 * @prop {object} opts This components controllable options - get/set using the `config()` method
 * Other props:
 * @prop {object} colors
 * @prop {object} bgColors
 * @prop {object} icons
 */
class VisibleConsole extends TiBaseComponent {
    /** Component version */
    static version = '2024-09-21'

    //#region --- Class Properties ---

    /** Is UIBUILDER for Node-RED loaded? */
    // uib   // in base class
    /** Mini jQuery-like shadow dom selector (see constructor)
     * @type {function(string): Element}
     * @param {string} selector - A CSS selector to match the element within the shadow DOM.
     * @returns {Element} The first element that matches the specified selector.
     */
    // $  // in base class
    /** Mini jQuery-like shadow dom multi-selector (see constructor)
     * @type {function(string): NodeList}
     * @param {string} selector - A CSS selector to match the element within the shadow DOM.
     * @returns {NodeList} A STATIC list of all shadow dom elements that match the selector.
     */
    // $$  // in base class
    /** Holds a count of how many instances of this component are on the page that don't have their own id
     * Used to ensure a unique id if needing to add one dynamically
     */
    // static _iCount = 0  // in base class
    
    /** Runtime configuration settings */
    opts = {}

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

        this.attachShadow({ mode: 'open', delegatesFocus: true })
            // Only append the template if code and style isolation is needed
            .append(template.content.cloneNode(true))

        // jQuery-like selectors but for the shadow. NB: Returns are STATIC not dynamic lists
        this.createShadowSelectors()  // in base class

        // @ts-ignore
        this.wrapper = this.shadowRoot.querySelector('.wrapper')

        // Keep a COPY of the original console so we can still use it if we want
        this.originalConsole = { ...console }
    }

    /** Runs when an instance is added to the DOM */
    connectedCallback() {
        // Make sure instance has an ID. Create an id from name or calculation if needed
        this.ensureId()  // in base class

        // Apply parent styles from a stylesheet if required - only required if using an applied template
        this.doInheritStyles()  // in base class

        this.redirectConsole()

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

    /** Handle watched attributes
     * NOTE: On initial startup, this is called for each watched attrib set in HTML - BEFORE connectedCallback is called.
     * Attribute values can only ever be strings
     * @param {string} attrib The name of the attribute that is changing
     * @param {string} newVal The new value of the attribute
     * @param {string} oldVal The old value of the attribute
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

    /** Capture console.xxxx and write to the div  */
    redirectConsole() {
        Object.keys(this.icons).forEach( type => {
            console[type] = (...args) => {
                // Call the original console.log
                this.originalConsole[type].apply(console[type], args)
                this.newLog(type, args)
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
        } else {
            return typeof input
        }
    }

    /** Creates an HTML visualisation of the input
     * @param {*} input 
     * @returns {HTMLDivElement}
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
                summary = Object.keys(value).map(key => `${key}: ${getPrimitiveSummary(value[key])}`).join(', ')
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

//#region TEST
// console.dir(Object.keys(console))
// const data = {
//     name: 'Alice',
//     age: 30,
//     isAdmin: true,
//     hobbies: ['Reading', 'Gaming', 'Cycling'],
//     preferences: {
//         theme: 'dark',
//         notifications: true
//     },
//     score: null,
//     actions: function() { console.log('hello') }
// }
// console.log('hello', 42, data)
// console.info('hello', 42, data)
// console.debug('hello', 42, data)
// console.trace('hello', 42, data)
// console.warn('hello', 42, data)
// console.error('hello', 42, data)
//#endregion
