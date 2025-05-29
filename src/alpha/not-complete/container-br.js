/** Define a new zero dependency custom web component ECMA module that can be used as an HTML tag
 *
 * TO USE THIS TEMPLATE: CHANGE ALL INSTANCES OF 'ContainerBr' and 'container-br' & change version below
 *
 * @version 0.2 2022-05-11 Early-release
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

const componentName = 'container-br'
const className = 'ContainerBr'

const template = document.createElement('template')
template.innerHTML = html`
    <style>
        :host {
            display: block;   /* default is inline */
            contain: content; /* performance boost */
            flex-basis: 100%;
            height: 0;
        }
    </style>
`

// Define the class and make it the default export
/**
 * @element container-br
 *
 * @fires container-br:construction - Document object event. evt.details contains the data
 * @fires container-br:connected - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
 * @fires container-br:disconnected - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
 * @fires container-br:attribChanged - When a watched attribute changes. `evt.details` contains the details of the change.
 * NOTE that listeners can be attached either to the `document` or to the specific element instance.
 *
 * @property {string} name - Optional. Will be used to synthesize an ID if no ID is provided.
 * attr {string} data-* - Optional. All data-* attributes are returned in the _meta prop as a _meta.data object.
 *
 * @property {string} name - Sync'd from name attribute
 *
 * @slot Container contents
 *
 * @csspart ??? - Uses the uib-styles.css uibuilder master for variables where available.
 */
export default class ContainerBr extends HTMLElement {
    constructor() {

        super()
        this.attachShadow({ mode: 'open', delegatesFocus: true })
            .append(template.content.cloneNode(true))

        this.dispatchEvent(new Event(`${componentName}:construction`, { bubbles: true, composed: true }))
    } // ---- end of constructor ----
} // ---- end of Class ---- //

/** Self register the class to global
 * Enables new data lists to be dynamically added via JS
 * and lets the static methods be called
 */
window[className] = ContainerBr

// Self-register the HTML tag
customElements.define(componentName, ContainerBr)
