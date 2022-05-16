/** Define a new zero dependency custom web component ECMA module that can be used as an HTML tag
 *
 * TO USE THIS TEMPLATE: CHANGE ALL INSTANCES OF 'SimpleContainer' and 'simple-container' & change version below
 *
 * @version 0.1 2022-05-15 Pre-release
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

// just for syntax highlighting in VSCode
function html(strings, ...keys) {
    return strings.map( (s, i) => {
        return s + (keys[i] || '')
    }).join('')
}

const componentName = 'simple-container'
const className = 'SimpleContainer'

const template = document.createElement('template')
// TODO: Unpack & - & = parent selector, eg. &::after => .tree ul::after
template.innerHTML = html`
    <style>
        :host {
            display: block;   /* default is inline */
            contain: content; /* performance boost */
        }
        .tree {
            @if $reverse {
                transform: rotate(180deg);
                transform-origin: 50%;
            }
        }

        .tree ul {
            position: relative;
                padding: 1em 0; 
            white-space: nowrap;
            margin: 0 auto;
            text-align: center;
            &::after {
                content: '';
                display: table;
                clear: both;
            }
        }

        .tree li {
            display: inline-block; // need white-space fix
            vertical-align: top;
            text-align: center;
                list-style-type: none;
                position: relative;
                padding: 1em .5em 0 .5em;
            &::before,
            &::after {
                content: '';
                position: absolute; 
                top: 0; 
                right: 50%;
                border-top: $border-width solid #ccc;
                width: 50%; 
                height: 1em;
            }
            &::after {
                right: auto; 
                left: 50%;
                border-left: $border-width solid #ccc;
            }
            &:only-child::after,
            &:only-child::before {
                display: none;
            }
            &:only-child {
                padding-top: 0;
            }
            &:first-child::before,
            &:last-child::after {
                border: 0 none;
            }
            &:last-child::before{
                border-right: $border-width solid #ccc;
                border-radius: 0 5px 0 0;
            }
            &:first-child::after{
                border-radius: 5px 0 0 0;
            }
        }

        .tree ul ul::before{
            content: '';
            position: absolute; 
            top: 0; 
            left: 50%;
                border-left: $border-width solid #ccc;
                width: 0; 
            height: 1em;
        }

        .tree li a {
            border: $border-width solid #ccc;
            padding: .5em .75em;
            text-decoration: none;
            display: inline-block;
            border-radius: 5px;
            color: #333;
            position: relative;
            top: $border-width;
            @if $reverse {
                transform: rotate(180deg);
            }
        }

        .tree li a:hover,
        .tree li a:hover+ul li a {
            background: #e9453f;
            color: #fff;
            border: $border-width solid #e9453f;
        }

        .tree li a:hover + ul li::after, 
        .tree li a:hover + ul li::before, 
        .tree li a:hover + ul::before, 
        .tree li a:hover + ul ul::before{
            border-color:  #e9453f;
        }
    </style>
    <div class="tree">
        <ul>
            <li>
                <a href="#">Parent</a>
                <ul>
                <li>
                    <a href="#">Child</a>
                    <ul>
                    <li>
                        <a href="#">Grand Child</a>
                    </li><li>
                        <a href="#">Grand Child</a>
                        <ul>
                        <li>
                            <a href="#">Grand Child</a>
                        </li><li>
                            <a href="#">Grand Child</a>
                        </li>
                        </ul>
                    </li>
                    </ul>
                </li><li>
                    <a href="#">Child</a>
                    <ul>
                    <li>
                        <a href="#">Grand Child</a>
                        <ul>
                        <li>
                            <a href="#">Grand Grand Child</a>
                        </li>
                        </ul>
                    </li><li>
                        <a href="#">Grand Child</a>
                    </li>
                    </ul>
                </li>
                </ul>
            </li>
        </ul>
    </div>
    <slot></slot>
`

// Define the class and make it the default export
/**
 * @element simple-container
 *
 * @fires simple-container:construction - Document object event. evt.details contains the data
 * @fires simple-container:connected - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
 * @fires simple-container:disconnected - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
 * @fires simple-container:attribChanged - When a watched attribute changes. `evt.details` contains the details of the change.
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
export default class SimpleContainer extends HTMLElement {
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
        ++SimpleContainer._iCount // increment total instance count

        // Create an id from name or calculation if needed
        this.name = this.getAttribute('name')
        if (!this.id) {
            if (this.name) this.id = this.name.toLowerCase().replace(/\s/g, '_')
            else this.id = `sc-${SimpleContainer._iCount}`
        }

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
window[className] = SimpleContainer

// Self-register the HTML tag
customElements.define(componentName, SimpleContainer)
