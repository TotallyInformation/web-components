/** Define a new zero dependency custom web component ECMA module that can be used as an HTML tag
 *
 * TODO: color const not really needed, convert to make direct changes to style (see theme changer for code)
 *       Use uib-brand.css rather than trying to do local css processing for light/dark
 *       Improve slot change handlers and remove on disconnect
 *
 * @version 0.2 2022-05-10 Early-release
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

const componentName = 'simple-card'
const className = 'SimpleCard'

// function invert(rgb) {
//     rgb = Array.prototype.join.call(arguments).match(/(-?[0-9\.]+)/g);
//     for (let i = 0; i < 3; i++) {
//         rgb[i] = (i === 3 ? 1 : 255) - rgb[i];
//     }
//     return rgb.slice(0,3)
// }

// Detect browser light/dark mode - See https://stackoverflow.com/a/57795495, attach eventListener if needing to detect change
// Assume light mode if not dark (could have no preference set)
// const color = {
//     mode: 'light',
//     fg: 'rgb(var(--uib-color-bg-lighter, 0,0,0))',
//     bg: 'rgba(var(--uib-color-fg, 255,255,255), 1)',
//     border: 'rgba(255,255,255, .25)',
//     //footer:
// }
const color = {
    mode: 'light',
    fg: 'var(--text2)',
    bg: 'var(--surface4)',
    border: 'var(--text4)' // 'rgba(255,255,255, .25)',
    // footer:
}
if ( window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ) {
    color.mode = 'dark'
}

// const bgStyle = window.getComputedStyle(document.body.children[0], null)
// console.log('bgStyle', bgStyle.color, bgStyle.background, bgStyle)

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
            display: block;
            border: 1px solid ${color.border};
            border-radius: 0.5rem;
            margin: 0.2rem;
            background-color: ${color.bg};
            color: ${color.fg};
            background-clip: border-box;
            box-sizing: border-box;
            box-shadow: var(--shadow2);
        }
        #header {display: none;}
        #main   {display: block; padding:1rem 0.5rem;}
        #footer {display: none}
    </style>
    <article>
        <slot name="header" id="header" role="region" aria-label="Card Header"></slot>
        <slot id="main" role="region" aria-label="Card Main Content"></slot>
        <slot name="footer" id="footer" role="region" aria-label="Card Footer"></slot>
    </article>
`

// Define the class and make it the default export
/** A simple card component
 *
 * @element simple-card
 *
 * @fires simple-card:construction - Document object event. evt.details contains the data
 * @fires simple-card:connected - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
 * @fires simple-card:disconnected - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
 * @fires simple-card:attribChanged - When a watched attribute changes. `evt.details` contains the details of the change.
 * NOTE that listeners can be attached either to the `document` or to the specific element instance.
 *
 * @attr {string} name - Optional. Will be used to synthesize an ID if no ID is provided.
 * attr {string} data-* - Optional. All data-* attributes are returned in the _meta prop as a _meta.data object.
 *
 * @prop {string} name - Sync'd from name attribute
 *
 * @slot Container contents
 * @slot header - Content to go in the header section
 * @slot footer - Content to go in the footer section
 *
 * @csspart ??? - Uses the uib-styles.css uibuilder master for variables where available.
 */
export default class SimpleCard extends HTMLElement {
    // #region ---- Class Variables ----

    name = undefined

    /** Standard _ui object to include in msgs */
    _ui = {
        type: componentName,
        event: undefined,
        id: undefined,
        name: undefined,
        data: undefined, // All of the data-* attributes as an object
    }

    static _iCount = 0

    // #endregion ---- ---- ---- ----

    // #region ---- Utility Functions ----

    /** Mini jQuery-like shadow dom selector
     * @param {keyof HTMLElementTagNameMap} selection HTML element selector
     */
    $(selection) {
        return this.shadowRoot && this.shadowRoot.querySelector(selection)
    }

    /** Set colour variant to use as background colour
     * @param {string} value colour variant to use
     */
    _setVariant(value) {
        switch (value) {
            case 'information':
            case 'info': {
                this.style.setProperty('color', 'var(--text1)')
                this.style.setProperty('background-color', 'var(--info)')
                break
            }

            case 'success': {
                this.style.setProperty('color', 'var(--text1)')
                this.style.setProperty('background-color', 'var(--success)')
                break
            }

            case 'warn':
            case 'warning': {
                this.style.setProperty('color', 'var(--text1)')
                this.style.setProperty('background-color', 'var(--warning)')
                break
            }

            case 'error':
            case 'failure': {
                this.style.setProperty('color', 'var(--text1)')
                this.style.setProperty('background-color', 'var(--failure)')
                break
            }

            default: {
                this.style.removeProperty('color')
                this.style.removeProperty('background-color')
                break
            }
        }
    }

    // #endregion ---- ---- ---- ----

    // #region ---- Event Handlers ----

    _uibMsgHandler(evt) {
        // TODO: add footer/header & variant

        // If there is a payload, we want to replace the slot - easiest done from the light DOM
        if ( evt['detail'].slot ) {
            const el = document.getElementById(this.id)
            el.innerHTML = evt['detail'].slot
        } else if ( evt['detail'].payload ) {
            const el = document.getElementById(this.id)
            el.innerHTML = evt['detail'].payload
        }

        if ( evt['detail'].variant ) {
            this._setVariant(evt['detail'].variant)
        }

        if ( evt['detail'].header ) {
            let el = document.querySelector(`#${this.id} > *[slot=header]`)
            if ( el ) {
                // Was found so replace it
                el.innerHTML = evt['detail'].header
            } else {
                // Was not found so create new element
                el = document.getElementById(this.id)
                const el2 = document.createElement('div')
                el2.setAttribute('slot', 'header')
                el2.innerHTML = evt['detail'].header
                el.appendChild(el2)
            }
        }

        if ( evt['detail'].footer ) {
            let el = document.querySelector(`#${this.id} > *[slot=footer]`)
            if ( el ) {
                // Was found so replace it
                el.innerHTML = evt['detail'].footer
            } else {
                // Was not found so create new element
                el = document.getElementById(this.id)
                const el2 = document.createElement('div')
                el2.setAttribute('slot', 'footer')
                el2.innerHTML = evt['detail'].footer
                el.appendChild(el2)
            }
        }

    }

    // #endregion ---- ---- ---- ----

    constructor() {
        super()

        // const bgStyle = window.getComputedStyle(this, null)

        this.attachShadow({ mode: 'open', delegatesFocus: true })
            .append(template.content.cloneNode(true))

        this.dispatchEvent(new Event(`${componentName}:construction`, { bubbles: true, composed: true }))

    } // ---- end of constructor ---- //

    // List all attribs we want to observe
    static get observedAttributes() { return [
        'name', 'variant'
    ] }

    // Runs when an observed attribute changes - Note: values are always strings
    attributeChangedCallback(name, oldVal, newVal) {

        // Don't bother if the new value same as old
        if (oldVal === newVal) return

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
        }))

        if (name === 'variant') {
            this._setVariant(newVal)
        }

    } // --- end of attributeChangedCallback --- //

    // Runs when an instance is added to the DOM
    connectedCallback() {
        ++SimpleCard._iCount // increment total instance count

        // Invert the heading text/bg colours
        // const divStyle = window.getComputedStyle(this, null)
        // Object.assign(this.shadowRoot.querySelector('slot[name="header"]').style, {
        //     color: color.bg,
        //     backgroundColor: color.fg,
        // })

        // Create an id from name or calculation if needed
        this.name = this.getAttribute('name')
        if (!this.id) {
            if (this.name) this.id = this.name.toLowerCase().replace(/\s/g, '_')
            else this.id = `${componentName}-${SimpleCard._iCount}`
        }

        // Listen for a uibuilder msg that is targetted at this instance of the component
        document.addEventListener(`uibuilder:msg:_ui:update:${this.id}`, this._uibMsgHandler.bind(this) )

        // Check if header/footer slots get content and turn on border if so
        const slots = this.shadowRoot.querySelectorAll('slot')
        slots[0].addEventListener('slotchange', (e) => {
            const slot = slots[0]
            const nodes = slot.assignedNodes()
            if (nodes.length > 0) {
                Object.assign(slot.style, {
                    color: color.bg,
                    backgroundColor: color.fg,
                    border: `1px solid ${color.border}`,
                    borderRadius: '0.5rem 0.5rem 0 0',
                    // borderBottom: '1px solid silver',
                    display: 'block',
                    padding: '1rem 0.5rem',
                    fontWeight: 'bolder',
                    fontSize: '120%',
                })
            } else slot.style.display = 'none'
        })
        slots[2].addEventListener('slotchange', (e) => {
            const slot = slots[2]
            const nodes = slot.assignedNodes()
            if (nodes.length > 0) {
                Object.assign(slot.style, {
                    border: `1px solid ${color.border}`,
                    borderRadius: '0 0 0.5rem 0.5rem',
                    // borderTop: '1px solid silver',
                    display: 'block',
                    padding: '1rem 0.5rem',
                    fontStyle: 'italic',
                })
            } else slot.style.display = 'none'
        })

        this.dispatchEvent(new CustomEvent(`${componentName}:connected`, {
            bubbles: true,
            composed: true,
            detail: {
                id: this.id,
                name: this.name
            },
        }))

    } // ---- end of connectedCallback ---- //

    // Runs when an instance is removed from the DOM
    disconnectedCallback() {
        // NB: Dont decrement SimpleCard._iCount because that could lead to id nameclashes

        document.removeEventListener(`uibuilder:msg:_ui:update:${this.id}`, this._uibMsgHandler )

        this.dispatchEvent(new CustomEvent(`${componentName}:disconnected`, {
            bubbles: true,
            composed: true,
            detail: {
                id: this.id,
                name: this.name
            },
        }))

    } // ---- end of disconnectedCallback ---- //

} // ---- end of Class ---- //

/** Self register the class to global
 * Enables new data lists to be dynamically added via JS
 * and lets the static methods be called
 */
window[className] = SimpleCard

// Self-register the HTML tag
customElements.define(componentName, SimpleCard)
