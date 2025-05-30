// @ts-nocheck
/** A zero dependency web component that will display a "bar-chart" style "LED" gauge.
 *
 * See ./docs/simple-gauge.md for detailed documentation on installation and use.
 *
 * version: 0.0.1 2024-01-30
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
 * -
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

export default class SimpleGauge extends HTMLElement {
    //#region --- Class Properties ---
    static componentName = 'simple-gauge'
    static className = 'SimpleGauge'
    /** @type {Array<string>} List of all of the html attribs (props) listened to */
    static observedAttributes = ['min', 'max', 'value', 'mode', 'gx', 'gy']
    /** Shadow DOM Template (if required) */
    static template = document.createElement('template')
    /** */
    static div = document.createElement('div')

    /** jQuery-like selector for the shadow DOM (set in constructor) */
    $
    /** Is UIBUILDER loaded? (only works if this loaded AFTER uib) */
    uib = !!window['uibuilder']

    dark = 0.4
    colors = [
        'var(--color-g)',
        'var(--color-g)',
        'var(--color-g)',
        'var(--color-g)',
        'var(--color-g)',
        'var(--color-g)',
        'var(--color-g)',
        'var(--color-g)',
        'var(--color-g)',
        'var(--color-g)',

        'var(--color-a)',
        'var(--color-a)',
        'var(--color-a)',
        'var(--color-a)',

        'var(--color-r)',
        'var(--color-r)',
        'var(--color-r)'
    ]

    min = 0
    max = 100
    value = 0
    /** @type {string|"vertical"|"horizontal"|"x"|"y"|"h"|"v"} */
    mode = 'v'
    //#endregion --- Class Properties ---

    // Cannot control the normal DOM here, use connectedCallback
    constructor() {
        super()

        // Shadow DOM template (if needed)
        SimpleGauge.template.innerHTML = /** @type {HTMLTemplateElement} */ /*html*/`
        <style>
            :host {
                display: block;   /* default is inline */
                contain: content; performance boost
                /* gap:2px; change to a var
                border: 1px solid silver;
                --color-r: red;
                --color-a: #ffcf00;
                --color-g: #4ed34e; */
            }
            .vertical {
                display: flex;
                flex-wrap: nowrap;
                flex-direction: column;
                gap: .5rem; /* change to a var */
                border: 1px solid silver;
                border-radius: var(--border-radius);
                padding: 0.5rem;
            }
            .horizontal {
                display: flex;
                flex-wrap: nowrap;
                flex-direction: row;
                gap: .5rem; /* change to a var */
                border: 1px solid silver;
                border-radius: var(--border-radius);
                padding: 0.5rem;
            }
            .led {
                background: #ffffff;
                border-radius: inherit;
                border: 1px solid silver;
                box-shadow: inset 0px 0px 20px 0px #00000099, 0px 0px 3px 0px #00000099;
                filter: brightness(0.4);
                /* margin: 1rem; */
                flex: 1 1 auto;
            }
            .container {
                display: flex;
                flex-wrap: nowrap;
                flex-direction: column;
                justify-content: start;
                align-items: auto;
                align-content: start;
            }
            .item {
                flex: 0 0 auto;
                margin: 1em;
            }
        </style>
        <!-- <div v-for="(color, index) in colors" :key="index" class="led" :ref="'dot-' + index +'-'+this.id"></div> -->
        <div></div>
        <caption><slot></slot></caption>
        `
        this.attachShadow({ mode: 'open', delegatesFocus: true, })
            .append(SimpleGauge.template.content.cloneNode(true))
        this.$ = this.shadowRoot.querySelector.bind(this.shadowRoot)

        /** @type {HTMLElement} */
        this.outer = this.shadowRoot.querySelector('div')
        this.caption = this.shadowRoot.querySelector('caption')
        console.log(this.outer)

        // console.log('construct ended')
    }

    /** NOTE: On initial startup, this is called for each watched attrib set in HTML - BEFORE connectedCallback is called
     * @param {string} attrib Name of watched attribute that has changed
     * @param {string} oldVal The previous attribute value
     * @param {string} newVal The new attribute value
     */
    attributeChangedCallback(attrib, oldVal, newVal) {
        if ( oldVal === newVal ) return
        console.log('attributeChangedCallback', attrib, oldVal, newVal)

        switch (attrib) {
            case 'mode': {
                if (['x', 'h', 'horizontal'].includes(newVal.toLowerCase() )) {
                    this.mode = 'h'
                    this.outer.className = 'horizontal'
                } else {
                    this.mode = 'v'
                    this.outer.className = 'vertical'
                }
                console.log('mode', this.mode, newVal)
                break
            }
            case 'value': {
                this[attrib] = newVal
                this.changeDisplay(newVal)
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
        console.log('connected')
    }

    // Runs when an instance is removed from the DOM
    // disconnectedCallback() {}

    changeDisplay(value) {
        value = Number(value)
        if (isNaN(value)) return

        if (value > this.max) console.warn('Value > max')
        if (value < this.min) console.warn('Value < min')

        // Remove gauge content
        this.outer.innerHTML = ''

        console.log('adding', this.min, this.max, value)

        // Add value number of new divs
        for (let i = this.max; i >= this.min; i--) {
            const n = SimpleGauge.div.cloneNode()
            n.setAttribute('class', 'led')
            n.setAttribute('data-i', i)
            // n.insertAdjacentHTML('beforeend', '&nbsp;')
            // this.outer.appendChild(n)
            this.outer.insertBefore(n, this.caption)
        }
    }
}

// Automatically dd the class as a new Custom Element to the window object
if (!customElements.get(SimpleGauge.componentName)) customElements.define(SimpleGauge.componentName, SimpleGauge)
