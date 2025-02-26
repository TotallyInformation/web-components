/** Define a new zero dependency custom web component ECMA module that can be used to show a GitHub Markdown-style callout box
 * Version: See the class code
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
 * - Use a css var for background transparency
 * - Allow for a different background in the head
 * - Use html in head, not just text.
 * - Allow for image icons
 * - use uib-brand css variables with fallbacks
 * - Consider backgrounds matching the color but with transparency
 * + Move initial processing to connected callback, add setters for type/icon/title and may changes dynamically, change attrib chg to dynamic upds
 */

import TiBaseComponent from '../libs/ti-base-component'

/** Only use a template if you want to isolate the code and CSS */
// const template = document.createElement('template')
// template.innerHTML = /*html*/`
//     <style>
//         :host {
//             display: block;   /* default is inline */
//             contain: content; /* performance boost */
//         }
//     </style>
//     <slot></slot>
// `

/** Namespace
 * @namespace Live
 */

/**
 * @class
 * @augments TiBaseComponent
 * @description Define a new zero dependency custom web component that outputs a standardised callout box
 *
 * @element call-out
 * @memberOf Live

 * METHODS FROM BASE: (see TiBaseComponent)
 * STANDARD METHODS:
  * @function attributeChangedCallback Called when an attribute is added, removed, updated or replaced
  * @function connectedCallback Called when the element is added to a document
  * @function constructor Construct the component
  * @function disconnectedCallback Called when the element is removed from a document

 * OTHER METHODS:
  * @function doType Process the type attribute

 * CUSTOM EVENTS:
  * "call-out:connected" - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
  * "call-out:ready" - Alias for connected. The instance can handle property & attribute changes
  * "call-out:disconnected" - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
  * "call-out:attribChanged" - When a watched attribute changes. `evt.details` contains the details of the change.
  * NOTE that listeners can be attached either to the `document` or to the specific element instance.

 * Standard watched attributes (common across all my components):
  * @property {string|boolean} inherit-style - Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load.
  * @property {string} name - Optional. HTML name attribute. Included in output _meta prop.

 * Other watched attributes:
  * @property {string} type - Optional. If present, a title will be added above other child content
  * @property {string} icon - Optional. If present, will override the callout title icon

 * Non-watched but still used attributes:
  * @property {string} title - Optional. If present, will override the callout title text

 * PROPS FROM BASE: (see TiBaseComponent)
 * OTHER STANDARD PROPS:
  * @property {string} componentVersion Static. The component version string (date updated). Also has a getter that returns component and base version strings.

 * Other props:
  * By default, all attributes are also created as properties

 * @slot Container contents

 * See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc
 */
class CallOut extends TiBaseComponent {
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
            'type', 'icon', 'title',
        ]
    }

    type = ''
    icon = ''

    /** NB: Attributes not available here - use connectedCallback to reference */
    constructor() {
        super()

        // Only attach the shadow dom if code and style isolation is needed - comment out if shadow dom not required
        // this._construct(template.content.cloneNode(true))

        // Apply styles using a <style> tag in the light DOM
        const style = document.createElement('style')
        style.textContent = `
        ${this.localName} {
            --callout-color: inherit;
            --callout-bgcolor: hsl(207.1deg 63.27% 40% /0.15);
            --parent-color: inherit;
            display: block;
            border: 1px solid silver;
            border-left: .25rem solid var(--callout-color, silver);
            margin-bottom: 1rem;
            padding: .75rem 1.25rem;
            border-radius: 0.25rem;
            background-color: var(--callout-bgcolor, inherit);
        }
        ${this.localName} > .co-head {
            color: var(--callout-color, inherit);
            font-weight: bolder;
        }
        `
        // this.appendChild(style)
        document.head.appendChild(style)
    }

    /** Runs when an instance is added to the DOM */
    connectedCallback() {
        this._connect() // Keep at start.

        this.type = this.getAttribute('type')
        this.icon = this.getAttribute('icon')

        this.doType(this.type)

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
        if (!this.connected) return

        // Don't bother if the new value same as old
        if ( oldVal === newVal ) return
        // Create a property from the value - WARN: Be careful with name clashes
        this[attrib] = newVal

        // Add other dynamic attribute processing here.
        // If attribute processing doesn't need to be dynamic, process in connectedCallback as that happens earlier in the lifecycle

        if (attrib === 'type') this.doType(this.type)

        // Keep at end. Let everyone know that an attribute has changed for this instance of the component
        this._event('attribChanged', { attribute: attrib, newVal: newVal, oldVal: oldVal, })
    }

    doType(type) {
        if (!type) type = null
        else type = type.toLowerCase()

        // new element to add
        const headEl = document.createElement('div')
        headEl.className = 'co-head'

        let headText = ''
        let headIcon = ''
        let headStyle = 'inherit'

        switch (type) {
            // These supported by GitHub, Typora, Docsify, Obsidian
            case 'note': {
                headIcon = 'ℹ️ '
                headText = 'Note'
                headStyle = '--callout-color: hsl(188.2deg 77.78% 40.59%);'
                break
            }

            case 'hint':
            case 'tip': {
                headIcon = '💡 '
                headText = 'Tip'
                headStyle = '--callout-color: hsl(133.7deg 61.35% 40.59%);'
                break
            }

            case 'warn':
            case 'warning': {
                headIcon = '⚠️ '
                headText = 'Warning'
                headStyle = '--callout-color: var(--warning-intense, hsl(35.19deg 84.38% 62.35%));'
                break
            }

            // These supported by GitHub, Typora, Obsidian
            case 'important': {
                headIcon = '🔖 '
                headText = 'Important'
                headStyle = '--callout-color: hsl(262.44deg 89.78% 73.14%);'
                break
            }

            case 'caution': {
                headIcon = '❗ '
                headText = 'Caution'
                headStyle = '--callout-color: hsl(2.74deg 92.59% 62.94%);'
                break
            }

            default: {
                break
            }
        }

        if (this.title) {
            headText = this.title
        }

        if (this.icon) {
            headIcon = `${this.icon} `
        }

        if (headText) {
            headEl.textContent = `${headIcon}${headText}`
            // @ts-ignore
            this.style = headStyle
            this.prepend(headEl)
        }
    }
} // ---- end of Class ---- //

// Make the class the default export so it can be used elsewhere
export default CallOut

/** Self register the class to global
 * Enables new data lists to be dynamically added via JS
 * and lets the static methods be called
 */
window['CallOut'] = CallOut

// Self-register the HTML tag
customElements.define('call-out', CallOut)
