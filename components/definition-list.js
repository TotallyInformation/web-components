/** A zero dependency DL web component that will auto-create a DL list given a suitable object or sent a suitable message via uibuilder.
 *
 * See ./docs/definition-list.md for detailed documentation on installation and use.
 *
 * @version: 1.0.0 2022-04-07
 *
 * See https://github.com/runem/web-component-analyzer#-how-to-document-your-components-using-jsdoc on how to document
 *
 * Use `npx web-component-analyzer ./components/button-send.js` to create/update the documentation
 *     or paste into https://runem.github.io/web-component-analyzer/
 * Use `npx web-component-analyzer ./components/*.js --format vscode --outFile ./vscode-descriptors/ti-web-components.html-data.json`
 *     to generate/update vscode custom data files. See https://github.com/microsoft/vscode-custom-data/tree/main/samples/webcomponents
 *
 * To Do:
 * -
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
    </style>
    <slot></slot>
    <dl>
    </dl>
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
 *
 * See https://github.com/runem/web-component-analyzer#-how-to-document-your-components-using-jsdoc on how to document
 */
export default class DefinitionList extends HTMLElement {

    /** Mini jQuery-like shadow dom selector
     * @param {keyof HTMLElementTagNameMap} selection HTML element selector
     */
    $(selection) {
        return this.shadowRoot && this.shadowRoot.querySelector(selection)
    }

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

        // Get a reference to the uibuilder FE client library if possible
        try {
            this.uibuilder = window.uibuilder
        } catch (e) {
            this.uibuilder = undefined
        }

        this.addEventListener('click', evt => {
            evt.preventDefault()
            this._msg._meta = {
                id: this.id,
                name: this._name,
                data: this._data, // All of the data-* attributes as an object
                altKey: evt.altKey,
                ctrlKey: evt.ctrlKey,
                shiftKey: evt.shiftKey,
                metaKey: evt.metaKey,
            }
            document.dispatchEvent(this._clickEvt)
            this.uibuilder.send(this._msg)
        })

    }

    static get observedAttributes() {
        return ['topic', 'payload']
    }

    attributeChangedCallback(name, oldVal, newVal) {

        if ( oldVal === newVal ) return

        this[name] = newVal

        // console.log('>> attrib change >>', name, newVal)

    } // --- end of attributeChangedCallback --- //

    // when the component is added to doc
    // connectedCallback() {}

} // ---- End of DefinitionList class definition ---- //

// Add the class as a new Custom Element to the window object
customElements.define('definition-list', DefinitionList)
