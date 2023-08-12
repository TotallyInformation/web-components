/** Define a new zero dependency custom web component ECMA module that can be used as an HTML tag
 *
 * TO USE THIS TEMPLATE: CHANGE ALL INSTANCES OF 'SimpleSwitch' and 'simple-switch' & change version below
 *
 * @version 0.1 2022-07-15 Pre-release
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

const componentName = 'simple-switch'
const className = 'SimpleSwitch'

// just for syntax highlighting in VSCode
function html(strings, ...keys) {
    return strings.map( (s, i) => {
        return s + (keys[i] || '')
    }).join('')
}

const template = document.createElement('template')
template.innerHTML = html`
    <style>
        :host {
            display: block;   /* default is inline */
            contain: content; /* performance boost */
            .gui-switch {
                --thumb-size: 2rem;
                --thumb: hsl(0 0% 100%);
                --thumb-highlight: hsl(0 0% 0% / 25%);

                --thumb-color: var(--thumb);
                --thumb-color-highlight: var(--thumb-highlight);

                @media (prefers-color-scheme: dark) {
                    --thumb: hsl(0 0% 5%);
                    --thumb-highlight: hsl(0 0% 100% / 25%);
                }

                display: flex;
                flex-direction: row; /* column; */
                align-items: center;
                gap: 2ch;
                justify-content: space-between;
            }
            input {
                width: 0;
                    overflow: hidden;
                    padding-left: 68px;
                    background: #c5c5c5 url() 2px center / auto 32px no-repeat;
                    border-radius: 18px;
                    border: 0;
                    color: transparent;
                    height: 36px;
                    transition: all 0.3s ease-in-out;
            }
            input:not([disabled]) {cursor: pointer;}
            input.active {
                background-color: #8ab82e;
                background-position: calc(100% - 2px) center;
            }
            input.vertical {transform: rotate(-90deg);}
            /* .gui-switch > input {
                appearance: none;

                inline-size: var(--track-size);
                block-size: var(--thumb-size);
                padding: var(--track-padding);

                flex-shrink: 0;
                display: grid;
                align-items: center;
                grid: [track] 1fr / [track] 1fr;
            }
            .gui-switch > input::before {
                content: "";
                grid-area: track;
                inline-size: var(--thumb-size);
                block-size: var(--thumb-size);
                background: var(--thumb-color);
                border-radius: 50%;
            } */
        }
    </style>
    <!-- <label for="switch" class="gui-switch">
        <slot>Label text</slot>
        <input type="checkbox" role="switch" id="switch">
    </label> -->
    <label for="switch" class="gui-switch">
        <slot>Switch me</slot>
        <input type="button" 
            class="switch active" 
            onclick="this.classList.toggle('active');" 
            value="Toggle me" 
            title="Toggle me">
    </label>
`

// Define the class and make it the default export
/**
 * @element simple-switch
 *
 * @fires simple-switch:construction - Document object event. evt.details contains the data
 * @fires simple-switch:connected - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
 * @fires simple-switch:disconnected - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
 * @fires simple-switch:attribChanged - When a watched attribute changes. `evt.details` contains the details of the change.
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
export default class SimpleSwitch extends HTMLElement {
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

    /** Holds a count of how many instances of this component are on the page */
    static _iCount = 0

    //#endregion ---- ---- ---- ----

    //#region ---- Utility Functions ----

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
        'name'
    ] }

    // Runs when an observed attribute changes - Note: values are always strings
    attributeChangedCallback(name, oldVal, newVal) {

        // Don't bother if the new value same as old
        if ( oldVal === newVal ) return

        // Create a property from the value - WARN: Be careful with name clashes
        this[name] = newVal

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
        ++SimpleSwitch._iCount // increment total instance count

        // Create an id from name or calculation if needed
        this.name = this.getAttribute('name')
        if (!this.id) {
            if (this.name) this.id = this.name.toLowerCase().replace(/\s/g, '_')
            else this.id = `sc-${SimpleSwitch._iCount}`
        }

        // Listen for a uibuilder msg that is targetted at this instance of the component
        document.addEventListener(`uibuilder:msg:_ui:update:${this.id}`, this._uibMsgHandler.bind(this) )

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

        // @ts-ignore
        document.removeEventListener(`uibuilder:msg:_ui:update:${this.id}`, this._uibMsgHandler )

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
window[className] = SimpleSwitch

// Self-register the HTML tag
customElements.define(componentName, SimpleSwitch)
