/** Define a new zero dependency custom web component ECMA module that can be used to show a GitHub Markdown-style callout box
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
 * @namespace Alpha
 */

/**
 * @class
 * @extends TiBaseComponent
 * @description Define a new zero dependency custom web component that outputs a standardised callout box
 *
 * @element call-out
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

 * @fires call-out:connected - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
 * @fires call-out:ready - Alias for connected. The instance can handle property & attribute changes
 * @fires call-out:disconnected - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
 * @fires call-out:attribChanged - When a watched attribute changes. `evt.details` contains the details of the change.
 * NOTE that listeners can be attached either to the `document` or to the specific element instance.

 * Standard watched attributes (common across all my components):
 * @attr {string|boolean} inherit-style - Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load.
 * @attr {string} name - Optional. HTML name attribute. Included in output _meta prop.

 * Other watched attributes:
 * @attr {string} type - Optional. If present, a title will be added above other child content
 * @attr {string} icon - Optional. If present, will override the callout title icon

 * Non-watched but still used attributes:
 * @attr {string} title - Optional. If present, will override the callout title text

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
class CallOut extends TiBaseComponent {
    /** Component version */
    static version = '2024-09-29'

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

    connected = false

    /** NB: Attributes not available here - use connectedCallback to reference */
    constructor() {
        super()

        // Only attach the shadow dom if code and style isolation is needed
        // this.attachShadow({ mode: 'open', delegatesFocus: true })
            // .append(template.content.cloneNode(true))

        // jQuery-like selectors but for the shadow. NB: Returns are STATIC not dynamic lists
        this.createShadowSelectors()  // in base class

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
        // Make sure instance has an ID. Create an id from name or calculation if needed
        this.ensureId()  // in base class
        // Apply parent styles from a stylesheet if required - only required if using an applied template
        this.doInheritStyles()  // in base class

        // OPTIONAL. Listen for a uibuilder msg that is targetted at this instance of the component
        // if (this.uib) document.addEventListener(`uibuilder:msg:_ui:update:${this.id}`, this._uibMsgHandler.bind(this) )

        this.type = this.getAttribute('type')
        this.icon = this.getAttribute('icon')

        this.doType(this.type)

        // Keep at end. Let everyone know that a new instance of the component has been connected & is ready
        this._ready()
    }

    /** Runs when an instance is removed from the DOM */
    disconnectedCallback() {
        // @ts-ignore Remove optional uibuilder event listener
        document.removeEventListener(`uibuilder:msg:_ui:update:${this.id}`, this._uibMsgHandler )

        // Keep at end. Let everyone know that an instance of the component has been disconnected
        this._event('disconnected')
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
        this._event('attribChanged', { attribute: attrib, newVal: newVal, oldVal: oldVal })
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
