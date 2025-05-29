/** Web component for UIBUILDER for Node-RED that lets you wrap around
 *  a 3rd-party JavaScript library to make it responsive to data from Node-RED.
 *
 * See ./docs/uib-wrap.md for detailed documentation on installation and use.
 *
 * @version: 0.0.1 2024-01-31
 *
 * TODO: Add custom events to allow processing of updates in the browser
 *
 * See https://github.com/runem/web-component-analyzer#-how-to-document-your-components-using-jsdoc on how to document
 *
 * Use `npx web-component-analyzer ./components/ghost-thermometer.js` to create/update the documentation
 *     or paste into https://runem.github.io/web-component-analyzer/
 * Use `npx web-component-analyzer ./components/*.js --format vscode --outFile ./vscode-descriptors/ti-web-components.html-data.json`
 *     to generate/update vscode custom data files. See https://github.com/microsoft/vscode-custom-data/tree/main/samples/webcomponents
 *
 * To Do:
 * - Use https://tabulator.info as example
 * - Attribs: new, selector, uib-var, uib-topic, lib-name
 */
/*
  Copyright (c) 2024 Julian Knight (Totally Information)

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

export default class UibWrap extends HTMLElement {
    //#region --- Class Properties ---
    static componentName = 'uib-wrap'
    static className = 'UibWrap'
    /** @type {Array<string>} List of all of the html attribs (props) listened to */
    static observedAttributes = ['new', 'selector', 'lib-name', 'config-var']
    /** Shadow DOM Template (if required) */
    static template = document.createElement('template')
    new = false
    libName
    config
    selector = 'div' // ':first-child'
    //#endregion --- Class Properties ---

    // Cannot control the normal DOM here, use connectedCallback
    constructor() {
        super()

        // Shadow DOM template (if needed)
        UibWrap.template.innerHTML = /** @type {HTMLTemplateElement} */ /*html*/`
        <style>
            :host {
                /* display: block;   default is inline */
                contain: content; /* performance boost */
            }
        </style>
        <slot></slot>
        `
        this.attachShadow({ mode: 'open', delegatesFocus: true })
            .append(UibWrap.template.content.cloneNode(true))
        this.$ = this.shadowRoot.querySelector.bind(this.shadowRoot)

        // console.log('construct ended')
    }

    /** NOTE: On initial startup, this is called for each watched attrib set in HTML - BEFORE connectedCallback is called  */
    attributeChangedCallback(attrib, oldVal, newVal) {
        if (oldVal === newVal) return
        console.log('attributeChangedCallback', attrib, oldVal, newVal)

        switch (attrib) {
            case 'new': {
                console.log('new', newVal)
                try {
                    newVal = newVal.toLowerCase()
                } catch (e) {}
                if (newVal === 'true' || newVal === '' || newVal === true) newVal = true
                else newVal = false
                this.new = newVal
                console.log('new', this.new, newVal)
                break
            }
            case 'config-var': {
                this.config = newVal
                // this.args = uibuilder.get(newVal)
                // if (!Array.isArray(this.args)) this.args = [this.args]
                // console.log(this.args)
                break
            }
            case 'lib-name': {
                this.libName = newVal
                break
            }

            default: {
                this[attrib] = newVal
                break
            }
        }
    } // --- end of attributeChangedCallback --- //

    // Runs when an instance is added to the DOM
    connectedCallback() {
        setTimeout(() => {
            console.log(this.config, window['tbConfig'], window['uibuilder'].tbConfig)
            let args = uibuilder.get(this.config)
            if (!Array.isArray(args)) args = [args]
            console.log(args)
            this.initialiseLib(args)
            console.log('connected')
        }, 100)
    }

    // Runs when an instance is removed from the DOM
    // disconnectedCallback() {}

    initialiseLib(args) {
        // Is the library available?
        if (!window[this.libName]) throw new Error(`[UibWrap] Library '${this.libName}' not available`)
        // Is the config variable available?

        // Initialise the library
        if (this.new === false) {
            this.fn = window[this.libName](...args)
        } else {
            this.fn = new window[this.libName](...args)
        }
        // Set up listener
    }
}

// Automatically dd the class as a new Custom Element to the window object
if (!customElements.get(UibWrap.componentName)) customElements.define(UibWrap.componentName, UibWrap)
