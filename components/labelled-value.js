/** Define a new zero dependency custom web component ECMA module that can be used as an HTML tag
 *
 * @version 0.1 2022-05-10 Pre-release
 *
 * See: https://web.dev/custom-elements-v1/, https://web.dev/shadowdom-v1/
 *
 * See https://github.com/runem/web-component-analyzer#-how-to-document-your-components-using-jsdoc on how to document
 * Use `npx web-component-analyzer ./components/button-send.js` to create/update the documentation
 *     or paste into https://runem.github.io/web-component-analyzer/
 * Use `npx web-component-analyzer ./components/*.js --format vscode --outFile ./vscode-descriptors/ti-web-components.html-data.json`
 *     to generate/update vscode custom data files. See https://github.com/microsoft/vscode-custom-data/tree/main/samples/webcomponents
 *
 **/
/**
 * Copyright (c) 2022 Julian Knight (Totally Information)
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

const componentName = 'labelled-value'
const className = 'LabelledValue'

// tagged template - just for syntax highlighting in VSCode
function html(strings, ...keys) {
    return strings.map( (s, i) => {
        return s + (keys[i] || '')
    }).join('')
}

const template = document.createElement('template')
template.innerHTML = html`
    <style>
        :host {
            display: flex;   /* default is inline */
            flex-flow: row nowrap;
            width: 100%;
            contain: content; /* performance boost */
        }
        #label, .value {
            flex-grow: 1;
            flex-shrink: 1;
        }
        #label:after {
            content: ':';
        }
        .value {
            text-align: right;
        }
    </style>
    <div id="label"></div><div class="value" aria-labelledby="label"></div><slot></slot>
`

// Define the class and make it the default export
/**
 * @element labelled-value
 *
 * @fires labelled-value:construction - Document object event. evt.details contains the data
 * @fires labelled-value:connected - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
 * @fires labelled-value:disconnected - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
 * @fires labelled-value:attribChanged - When a watched attribute changes. `evt.details` contains the details of the change.
 * NOTE that listeners can be attached either to the `document` or to the specific element instance.
 *
 * @attr {string} name - Optional. Will be used to synthesize an ID if no ID is provided.
 * attr {string} data-* - Optional. All data-* attributes are returned in the _meta prop as a _meta.data object.
 *
 * @prop {string} name - Sync'd from name attribute
 *
 * @slot Container contents
 *
 * @csspart ??? - Uses the uib-styles.css uibuilder master for variables where available.
 */
export default class LabelledValue extends HTMLElement {
    //#region ---- Class Variables ----

    /** Standard _ui object to include in msgs */
    _ui = {
        type: componentName,
        event: undefined,
        id: undefined,
        name: undefined,
        data: undefined, // All of the data-* attributes as an object
    }

    /** Mini jQuery-like shadow dom selector (see constructor) */
    $

    /** Holds the name for this instance of the component */
    name = undefined

    label = undefined
    value = undefined

    /** Holds a count of how many instances of this component are on the page */
    static _iCount = 0

    //#endregion ---- ---- ---- ----

    //#region ---- Utility Functions ----

    setUpUibListener() {
        document.addEventListener( 'uibuilder:stdMsgReceived', (evt) => {
            const msg = evt['detail']
            console.log('[labelled-value] uibuilder msg received', msg)
        })
    }

    //#endregion ---- ---- ---- ----

    constructor() {

        super()
        this.attachShadow({ mode: 'open', delegatesFocus: true })
            .append(template.content.cloneNode(true))

        this.$ = this.shadowRoot.querySelector.bind(this.shadowRoot)

        this.dispatchEvent(new Event(`${componentName}:construction`, { bubbles: true, composed: true }))

    } // ---- end of constructor ----

    // List all attribs we want to observe
    static get observedAttributes() { return [
        'name', 'label', 'value',
    ] }

    // Runs when an observed attribute changes - Note: values are always strings
    attributeChangedCallback(name, oldVal, newVal) {

        // Don't bother if the new value same as old
        if ( oldVal === newVal ) return

        // Create a property from the value - WARN: Be careful with name clashes
        this[name] = newVal

        switch (name) {
            case 'label': {
                this.shadowRoot.querySelector('#label').textContent = newVal
                break
            }
            case 'value': {
                this.shadowRoot.querySelector('.value').textContent = newVal
                break
            }

            default: {
                break
            }
        }

        this.dispatchEvent(new CustomEvent(`${componentName}:attribChanged`, {
            bubbles: true,
            composed: true,
            detail: {
                id: this.id,
                name: this.name,
                attribute: name,
                newVal: newVal,
                oldVal: oldVal,
            }
        } ) )

    } // --- end of attributeChangedCallback --- //

    // Runs when an instance is added to the DOM
    connectedCallback() {
        ++LabelledValue._iCount // increment total instance count

        // Create an id from name or calculation if needed
        this.name = this.getAttribute('name')
        if (!this.id) {
            if (this.name) this.id = this.name.toLowerCase().replace(/\s/g, '_')
            else this.id = `sc-${LabelledValue._iCount}`
        }

        this.setUpUibListener()

        this.dispatchEvent(new CustomEvent(`${componentName}:connected`, {
            bubbles: true,
            composed: true,
            detail: {
                id: this.id,
                name: this.name
            },
        } ) )

    } // ---- end of connectedCallback ---- //

    // Runs when an instance is removed from the DOM
    disconnectedCallback() {
        // NB: Dont decrement SimpleCard._iCount because that could lead to id nameclashes

        this.dispatchEvent(new CustomEvent(`${componentName}:disconnected`, {
            bubbles: true,
            composed: true,
            detail: {
                id: this.id,
                name: this.name
            },
        } ) )

    } // ---- end of disconnectedCallback ---- //

} // ---- end of Class ---- //

/** Self register the class to global
 * Enables new data lists to be dynamically added via JS
 * and lets the static methods be called
 */
window[className] = LabelledValue

// Self-register the HTML tag
customElements.define(componentName, LabelledValue)