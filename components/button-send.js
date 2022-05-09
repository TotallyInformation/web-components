/** A zero dependency button web component that sends a msg or a document event when clicked.
 *  Contains relevant data from data-*, topic and payload attributes (or properties),
 *  includes a _meta object showing whether any modifier keys were used, the element id/name.
 * 
 * See ./docs/button-send.md for detailed documentation on installation and use.
 * 
 * @version: 1.0.1 2022-04-07
 * 
 * See https://github.com/runem/web-component-analyzer#-how-to-document-your-components-using-jsdoc on how to document
 * 
 * Use `npx web-component-analyzer ./components/button-send.js` to create/update the documentation
 *     or paste into https://runem.github.io/web-component-analyzer/
 * Use `npx web-component-analyzer ./components/*.js --format vscode --outFile ./vscode-descriptors/ti-web-components.html-data.json`
 *     to generate/update vscode custom data files. See https://github.com/microsoft/vscode-custom-data/tree/main/samples/webcomponents
 * 
 * To Do:
 * - Allow colour and background colour to be controlled with standard names (e.g. info, warning, error, etc)
 * - Create a unique identifier to use when id/name not specified.
 * - Allow std pre-formatted msg from uibuilder to change the attribs/props
 * - Allow std pre-formatted msg from uibuilder to add a new button
 */
/*
  Copyright (c) 2022 Julian Knight (Totally Information)

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

const template = document.createElement('template')
template.innerHTML = /** @type {HTMLTemplateElement} */ `
    <style>
        :host {
        }
        button, input[type="button" i] {
            margin-top: .5em;
            margin-bottom: .5em;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: none;
            padding: .5rem 1rem;
            text-decoration: none;
            background-color: rgb(var(--uib-color-info));
            color: rgb(var(--uib-color-dark));
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

/** A Zero dependency button web component that sends a msg or a document event when clicked.
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
 * @prop {any|string} payload - Can be an attribute or property. If used as property, must not use payload attribute in html, aAllows any data to be attached to payload. As an attribute, allows a string only.
 * 
 * @slot default - Button label. Allows text, inline and most block tags to be included (unlike the standard button tag which only allows inline tags).
 * 
 * @csspart button - Uses the uib-styles.css uibuilder master for variables where available.
 */
export default class ButtonSend extends HTMLElement {
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
        data: undefined, // All of the data-* attributes as an object
    }
    /** The output msg @type {object} */
    _msg = {}
    

    /** Mini jQuery-like shadow dom selector
     * @param {keyof HTMLElementTagNameMap} selection HTML element selector
     */
    $(selection) {
        return this.shadowRoot && this.shadowRoot.querySelector(selection)
    }

    _setMsg(evtName) {
        const mydata = {...this.dataset}
        this._msg.topic = this.topic
        this._msg.payload = this.payload ? this.payload : mydata
        this._msg._ui = {...this._ui}
        if (evtName) this._msg._ui.event = evtName
        if ( this.id !== '') this._msg._ui.id = this.id
        const n = this.getAttribute('name')
        if ( n !== null ) this._msg._ui.name = n
        this._msg._ui.data = mydata // All of the data-* attributes as an object
    }

    /** fn to run when the button is clicked
     * @param {MouseEvent} evt The event object
     */
    handleClick(evt) {
        evt.preventDefault()
        this._setMsg('click')
        this._msg._ui.altKey = evt.altKey
        this._msg._ui.ctrlKey = evt.ctrlKey
        this._msg._ui.shiftKey = evt.shiftKey
        this._msg._ui.metaKey = evt.metaKey
        
        /** Output a custom document event `button-send:click`, data is in evt.details */
        document.dispatchEvent(this._clickEvt)
        /** Send a message to uibuilder with the output data */
        if (window.uibuilder) window.uibuilder.send(this._msg)
        // else console.debug('[ButtonSend:handleClick] uibuilder not available, cannot send')
    }

    constructor() {

        super()
        this.attachShadow({ mode: 'open', delegatesFocus: true })
            .append(template.content.cloneNode(true))

        const mydata = {...this.dataset}

        /** The output msg @type {object} */
        this._setMsg('component load')

        /** Create a new custom event for later use - will output the msg data - for use without uibuilder @type {CustomEvent} */
        this._clickEvt = new CustomEvent('button-send:click', {'detail': this._msg})

        /** Registration event @type {CustomEvent} */
        // document.dispatchEvent( new CustomEvent('button-send:loaded', {'detail': {}}) )
        //
        // if ( window.uibuilder && this.sendEvents ) window.uibuilder.send({_ui: {...this._ui}})


    } // --- end of constructor --- //

    static get observedAttributes() { return [
        'topic', 'payload'
    ] }

    attributeChangedCallback(name, oldVal, newVal) {

        if ( oldVal === newVal ) return

        this[name] = newVal

        // Event
        this._setMsg('attribute change')
        document.dispatchEvent( new CustomEvent('button-send:attributeChangedCallback', {'detail': {name:name,oldVal:oldVal,newVal:newVal}}) )
        if ( window.uibuilder && this.sendEvents ) window.uibuilder.send({
            payload: {name:name,oldVal:oldVal,newVal:newVal},
            _ui: {...this._ui}
        })

    } // --- end of attributeChangedCallback --- //

    // when the component is added to the dom
    connectedCallback() {
        /** Listen for the button click */
        this.addEventListener('click', this.handleClick)

        /** Instance registration event @type {CustomEvent} */
        // this._setMsg('instance load')
        // document.dispatchEvent( new CustomEvent('button-send:instanceAdded', {'detail': this._msg._ui}) )
        // if ( window.uibuilder && this.sendEvents ) window.uibuilder.send({_ui: {...this._ui}})
    }

    // when the component is removed from the dom
    disconnectedCallback() {
        this.removeEventListener('click', this.handleClick)
    }

} // ---- End of ButtonSend class definition ---- //

/** Self register the class to global
 * Enables new data lists to be dynamically added via JS
 * and lets the static methods be called
 */
 window.ButtonSend = ButtonSend

// Add the class as a new Custom Element to the window object
customElements.define('button-send', ButtonSend)

