/** Define a new zero dependency custom web component ECMA module that can be used as an HTML tag
 *
 * Version: See the class code
 *
 */
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
 */

import TiBaseComponent from '../../libs/ti-base-component'

/** Only use a template if you want to isolate the code and CSS */
const template = document.createElement('template')
template.innerHTML = /*html*/`
    <div>List items:</div>
    <ul></ul>
`

/** Namespace
 * @namespace Alpha
 */

/**
 * @class
 * @augments TiBaseComponent
 * @description Define a new zero dependency custom web component ECMA module that can be used as an HTML tag
 *
 * @element data-list
 * @memberOf Alpha

 * METHODS FROM BASE: (see TiBaseComponent)
 * STANDARD METHODS:
  * @function attributeChangedCallback Called when an attribute is added, removed, updated or replaced
  * @function connectedCallback Called when the element is added to a document
  * @function constructor Construct the component
  * @function disconnectedCallback Called when the element is removed from a document

 * OTHER METHODS:
  * None

 * CUSTOM EVENTS:
  * "data-list:connected" - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
  * "data-list:ready" - Alias for connected. The instance can handle property & attribute changes
  * "data-list:disconnected" - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
  * "data-list:attribChanged" - When a watched attribute changes. `evt.details.data` contains the details of the change.
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
  * By default, all attributes are also created as properties

 * @slot Container contents

 * @example
  * <data-list name="myComponent" inherit-style="./myComponent.css"></data-list>

 * See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc
 */
class DataList extends TiBaseComponent {
    /** Component version */
    static componentVersion = '2025-05-29'

    /** Makes HTML attribute change watched
     * @returns {Array<string>} List of all of the html attribs (props) listened to
     */
    static get observedAttributes() {
        return [
            // Standard watched attributes:
            'inherit-style', 'name',
            // Other watched attributes:
            'listvar', 'type',
        ]
    }

    /** NB: Attributes not available here - use connectedCallback to reference */
    constructor() {
        super()
        // Only attach the shadow dom if code and style isolation is needed - comment out if shadow dom not required
        if (template && template.content) this._construct(template.content.cloneNode(true))

        this._list = this.shadowRoot.querySelector('ul')

        this._entries = {}
    }

    /** Runs when an instance is added to the DOM */
    connectedCallback() {
        this._connect() // Keep at start.

        this._ready() // Keep at end. Let everyone know that a new instance of the component has been connected & is ready
    }

    /** Runs when an instance is removed from the DOM */
    disconnectedCallback() {
        this._disconnect() // Keep at end.
    }

    /** Runs when an observed attribute changes - Note: values are always strings
     * NOTE: On initial startup, this is called for each watched attrib set in HTML - BEFORE connectedCallback is called.
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
        if ( attrib === 'listvar' && window[newVal] ) {
            if ( window[newVal] ) {

                this.data = window[newVal]
                // window.dataList.instances[this.id] = window[newVal]
                // console.log('>> listvar change >>', this.id, this._entries, window.dataList.instances[this.id])
                //window[newVal] = new Proxy()

            } else {
                console.error(`[DataList] window.${newVal} does not exist, ignoring.`)
            }

            return
        }

        // Keep at end. Let everyone know that an attribute has changed for this instance of the component
        this._event('attribChanged', { attribute: attrib, newVal: newVal, oldVal: oldVal, })
    }

    // Getter/setter for the `data` public property - maps to this._entries
    set data(val) {
        this._entries = val

        this._list.innerHTML = ''
        // Dynamically build the content of the ul/ol
        Object.keys(this._entries).forEach( (key, i) => {
            this._list.insertAdjacentHTML('beforeend', `<li id="${key}">${key} :: ${this._entries[key]}</li>`)
        })
    }
    get data() {
        return this._entries
    }

    entry(key, val) {
        // this._list.innerHTML = ''
        this._entries[key] = val
        this.data = this._entries

        let sr = this.shadowRoot.getElementById(key)
        console.log('>> li key >>', sr)

        // Dynamically build the content of the ul/ol
        // Object.keys(this._entries).forEach( (key, i) => {
        //     this._list.insertAdjacentHTML('beforeend', `<li id="${key}">${key} :: ${this._entries[key]}</li>`)
        // })
    }
} // ---- end of Class ---- //

// Make the class the default export so it can be used elsewhere
export default DataList

/** Self register the class to global
 * Enables new data lists to be dynamically added via JS
 * and lets the static methods be called
 */
window['DataList'] = DataList

// Self-register the HTML tag
customElements.define('data-list', DataList)
