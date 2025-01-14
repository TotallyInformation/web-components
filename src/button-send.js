/** A zero dependency button web component that sends a msg or a document event when clicked.
 *  Contains relevant data from data-*, topic and payload attributes (or properties),
 *  includes a _meta object showing whether any modifier keys were used, the element id/name.
 *
 * See ./docs/button-send.md for detailed documentation on installation and use.
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

/** ToDo:
 * - Add variants (see simple-card)
 * - Allow colour and background colour to be controlled with standard names (e.g. info, warning, error, etc)
 * - Create a unique identifier to use when id/name not specified.
 * - Allow std pre-formatted msg from uibuilder to change the attribs/props
 * - Allow std pre-formatted msg from uibuilder to add a new button
 * - Consider moving from `click` to `pointerdown`/`up`. taking note of `setPointerCapture` to detect when up is outside of the down
 *    target so it can be ignored if desired.
 * - Also add processing for multi-click (detail property of click), contextMenu, auxclick, dblclick
 */

import TiBaseComponent from '../libs/ti-base-component'

/** Only use a template if you want to isolate the code and CSS */
const template = document.createElement('template')
template.innerHTML = /*html*/`
    <style>
        button, input[type="button" i] {
            margin-top: .5em;
            margin-bottom: .5em;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: none;
            padding: .5rem 1rem;
            text-decoration: none;
            background-color: var(--info);
            color: var(--text2);
            font-family: inherit;
            font-size: 1rem;
            line-height: 1.4;
            cursor: pointer;
            text-align: center;
            transition: background 250ms ease-in-out, transform 150ms ease;
            -webkit-appearance: none;
            -moz-appearance: none;
            border-radius: 8px;
            /* box-shadow: 0 3px 5px rgb(var(--uib-color-fg), 0.5); */
            box-shadow: inset 2px 2px 3px rgba(255,255,255, .3),
                        inset -2px -2px 3px rgba(0,0,0, .3);
        }
        button:hover, input[type="button" i]:hover {
            background-color: rgb(var(--uib-color-info), .5);
        }
        
        button:focus, input[type="button" i]:focus {
            outline: 1px solid rgb(var(--uib-color-fg));
            outline-offset: -4px;
        }
        
        button:active, input[type="button" i]:active {
            transform: scale(0.97);
        }
    </style>
    <button type="button">
        <span><slot></slot></span>
    </button>
`

/** Namespace
 * @namespace Beta
 */

/** A Zero dependency button web component that sends a msg or a document event when clicked.
 *  Contains relevant data from data-*, topic and payload attributes (or properties),
 *  includes a _meta object showing whether any modifier keys were used, the element id/name
 *
 * @class
 * @extends TiBaseComponent
 * @description Define a new zero dependency custom web component ECMA module that can be used as an HTML tag
 *
 * @element button-send
 * @memberOf Beta

 * METHODS FROM BASE: (see TiBaseComponent)

 * OTHER METHODS:
  * None

 * CUSTOM EVENTS:
  * @fires button-send:connected - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
  * @fires button-send:ready - Alias for connected. The instance can handle property & attribute changes
  * @fires button-send:disconnected - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
  * @fires button-send:attribChanged - When a watched attribute changes. `evt.details` contains the details of the change.
  * @fires button-send:click - Document object event. evt.details contains the data
  * @fires uibuilder.send {function} - Sends a msg back to Node-RED if uibuilder available. topic, payload and _meta props may all be set.
  * NOTE that listeners can be attached either to the `document` or to the specific element instance.

 * Standard watched attributes (common across all my components):
  * @attr {string|boolean} inherit-style - Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load.
  * @attr {string} name - Optional. HTML name attribute. Included in output _meta prop.

 * Other watched attributes:
  * @attr {string} topic - Optional. Topic string to use. Mostly for node-red messages
  * @attr {string} payload - Optional. Payload string. Mostly for node-red messages. For non-string payload, see props below

 * PROPS FROM BASE: (see TiBaseComponent)
 * OTHER STANDARD PROPS:
  * @prop {string} componentVersion Static. The component version string (date updated). Also has a getter that returns component and base version strings.

 * Other props:
  * @prop {any|string} payload - Can be an attribute or property. If used as property, must not use payload attribute in html, aAllows any data to be attached to payload. As an attribute, allows a string only.
  * By default, all attributes are also created as properties

 * @slot default - Button label. Allows text, inline and most block tags to be included (unlike the standard button tag which only allows inline tags).

 * @csspart button - Uses the uib-styles.css uibuilder master for variables where available.

 * See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc
 */
class ButtonSend extends TiBaseComponent {
    /** Component version */
    static componentVersion = '2024-10-14'

    sendEvents = true
    /** The topic to include in the output
     * @type {string|undefined} */
    topic
    /** The payload to include in the output
     * @type {any} */
    payload
    /** Standard _ui object to include in msgs */
    _ui = {
        type: 'button-send',
        event: undefined,
        id: undefined,
        name: undefined,
        // data: undefined, // All of the data-* attributes as an object
    }

    /** The output msg @type {object} */
    _msg = {}

    /** Makes HTML attribute change watched
     * @returns {Array<string>} List of all of the html attribs (props) listened to
     */
    static get observedAttributes() {
        return [
            // Standard watched attributes:
            'inherit-style', 'name',
            // Other watched attributes:            
            'topic', 'payload',
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

        /** Listen for the button click */
        this.addEventListener('click', this.handleClick)

        this._ready() // Keep at end. Let everyone know that a new instance of the component has been connected & is ready
    }

    /** Runs when an instance is removed from the DOM */
    disconnectedCallback() {
        this.removeEventListener('click', this.handleClick)

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

        // this.payload = { name: attrib, oldVal: oldVal, newVal: newVal, ...this.dataset }
        // this._setMsg('attribute change')
        // if ( this.uib && this.sendEvents ) { this.uibuilder.send( this._msg ) }

        // Keep at end. Let everyone know that an attribute has changed for this instance of the component
        this._event('attribChanged', { attribute: attrib, newVal: newVal, oldVal: oldVal })
    }

    _setMsg(evtName) {
        this._msg = {}
        const mydata = { ...this.dataset }
        this._msg.topic = this.topic || `${this.localName}:${evtName}`
        this._msg.payload = this.payload ? this.payload : mydata
        this._msg._ui = { ...this._ui }
        if (evtName) this._msg._ui.event = evtName
        this._msg._ui.id = this._msg.id = this.id
        if ( this.name ) this._msg._ui.name = this._msg.name = this.name
        // this._msg._ui.data = mydata // All of the data-* attributes as an object
    }

    /** fn to run when the button is clicked
     * @param {PointerEvent|MouseEvent} evt The event object
     */
    handleClick(evt) {
        evt.preventDefault()

        this._setMsg('click')
        
        const _ui = this._msg._ui
        const target = /** @type {Element} */ (evt.currentTarget)

        // Get target properties - only shows custom props not element default ones
        const props = {}
        const ignoreProps = ['name', 'sendEvents', 'payload', '$', '$$', 'uibuilder', '_ui', '_msg']
        Object.keys(target).forEach( key => {
            if ( !ignoreProps.includes(key) ) props[key] = target[key]
        })

        const ignoreAttribs = ['class', 'id', 'name']
        const attribs = Object.assign({},
            ...Array.from(target.attributes,
                ( { name, value } ) => {
                    if ( !ignoreAttribs.includes(name) ) {
                        return ({ [name]: value })
                    }
                    return undefined
                }
            )
        )

        _ui.slotText = target.textContent !== '' ? target.textContent?.substring(0, 255) : undefined

        _ui.props = props
        _ui.attribs = attribs
        // @ts-ignore
        _ui.dataset = {...target.dataset}
        _ui.classes = Array.from(target.classList)

        _ui.altKey = evt.altKey
        _ui.ctrlKey = evt.ctrlKey
        _ui.shiftKey = evt.shiftKey
        _ui.metaKey = evt.metaKey

        // @ts-ignore
        _ui.pointerType = evt.pointerType
        _ui.nodeName = target.nodeName
        if ( this.uib ) {
            _ui.clientId = this.uibuilder.clientId
            _ui.pageName = this.uibuilder.pageName
            _ui.tabId = this.uibuilder.tabId
        }

        /** Output a custom document event `button-send:click`, data is in evt.details */
        document.dispatchEvent( new CustomEvent(`${this.localName}:click`, {
            bubbles: true,
            composed: true,
            'detail': this._msg
        }) )

        /** Send a message to uibuilder with the output data */
        if (this.uib) this.uibuilder.send(this._msg)
        // if (uibLib) uibLib.eventSend(evt)
        // else console.debug('[ButtonSend:handleClick] uibuilder not available, cannot send')
    }
} // ---- End of class definition ---- //

// Make the class the default export so it can be used elsewhere
export default ButtonSend

/** Self register the class to global
 * Enables new data lists to be dynamically added via JS
 * and lets the static methods be called
 */
window['ButtonSend'] = ButtonSend

// Add the class as a new Custom Element to the window object
customElements.define('button-send', ButtonSend)
