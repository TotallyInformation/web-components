/** Define a new zero dependency custom web component ECMA module that can be used as an HTML tag
 *
 * TO USE THIS TEMPLATE: CHANGE ALL INSTANCES OF 'NavBar' and 'nav-bar' & change version below
 *
 * @version 0.1 2022-05-25 Pre-release
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

const componentName = 'nav-bar'
const className = 'NavBar'

// just for syntax highlighting in VSCode
function html(strings, ...keys) {
    return strings.map( (s, i) => {
        return s + (keys[i] || '')
    }).join('')
}

// https://www.makeuseof.com/responsive-navigation-bar-using-html-and-css/
// https://webdesign.tutsplus.com/tutorials/how-to-build-a-responsive-navigation-bar-with-flexbox--cms-33535
const template = document.createElement('template')
template.innerHTML = html`
    <style>
        :host {
            /* display: block;   default is inline */
            /* contain: content; performance boost */
            box-sizing: border-box;
            /* position: relative; */
            width: 100%;
            background-color: var(--surface1);
            color: var(--text1);
            padding: 0;
            margin: 0 0 0.8rem 0;
            /* border: 2px solid silver; */
        }
        nav {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            /* justify-content: space-between; */
            align-items: center;
            width: 100%;
            /* overflow-x: auto; */
        }
        nav * {
            /* display: block; */
            margin: .1rem;
        }
        ul {
            list-style: none;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            /* justify-content: space-between; */
            align-items: right;
            position: relative;
        }
        li {
            display: inline-block;
            padding: .1rem .5rem; margin:0;
        }
        li:hover a {
            color: var(--text3);
        }
        a {
            text-decoration: none;
            color: var(--text1);
        }
        ul ul {
            display: none;
        }
        .logo {
            order: 0;
            flex: 0 1 auto;
            align-self: auto;
            color: var(--primary-bg);
            padding: .1rem .5rem;
            font-weight: bold;
        }
        .hamburger {
            order: 0;
            flex: 0 1 auto;
            align-self: auto;
            font-weight: bold;
            /* color: var(--primary-bg); */
            color: var(--brand);
        }
        .hamburger:hover {
            color: var(--text1);
        }
        .main-menu {
            order: 0;
            flex: 1 1 auto;
            align-self: auto;
        }
        /* TODO: replace .sub-menu with li:has(>ul) when :has is well supported */
        .sub-menu:hover {
            position: relative;
            z-index: 10;
        }
        .sub-menu:hover ul, .sub-menu ul:hover {
            display: initial;
            /* display: block; */
            position: absolute;
            top: 1.1rem;
            left: 1rem;
            z-index: 20;
            padding: 0; margin:0;
            border: 1px solid silver;
        }
        .sub-menu:hover ul li, .sub-menu ul li:hover {
            display: block;
            background-color: var(--surface1);
            color: var(--text1);
            z-index: 30;
            
            width: fit-content;
        }
        .sub-menu ul li:hover a {
            color: var(--text1);
        }
        #checkbox_toggle {
            display: none;
        }
        #checkbox_toggle:checked + .main-menu {
            display: none;
        }

        @media (max-width: 768px) {
            /* Only display hamburger and log on small screens */
            .main-menu {
                display: none;
            }
            #checkbox_toggle:checked + .main-menu {
                display: flex;
            }
            /* #checkbox_toggle:not:checked + ul {
                display: none;
            } */
        }
    </style>
    <nav>
        <label for="checkbox_toggle" class="hamburger">&#9776;</label>
        <div class="logo"><slot name="logo">Menu</slot></div>
        <input type="checkbox" id="checkbox_toggle">
        <ul class="main-menu">
            <slot>
            <li><a href="/">Home</a></li>
            <li><a href="/">About</a></li>
            <li class="sub-menu">
                <a href="/">Services</a>
                <ul>
                    <li><a href="/">Dropdown&nbsp;1 </a></li>
                    <li><a href="/">Dropdown 2</a></li>
                    <li><a href="/">Dropdown 3</a></li>
                    <li><a href="/">Dropdown 4</a></li>
                    <li><a href="/">Dropdown 5</a></li>
                </ul>
            </li>
            <li><a href="/">Pricing</a></li>

            <li class="button"><a href="#">Log In</a></li>
            <li class="button secondary"><a href="#">Sign Up</a></li>
            </slot>
        </ul>
    </nav>
`

/**
 * TODO:
 * - Allow internal (js) links vs external hrefs (using leading # on href)
 * - Add local CSS vars & move brand-css vars to :root so they can be overwritten more easily
 * - Allow easy setting of menu entries from script/msg
 * - Add CSS for media breakpoint and hamburger processing
 *
 * NOTES:
 * - A sub-menu needs li.sub-menu
 * - Use li.button to have button style link (li.button > a) instead of link style
 */

// Define the class and make it the default export
/**
 * @element nav-bar
 *
 * @fires nav-bar:construction - Document object event. evt.details contains the data
 * @fires nav-bar:connected - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
 * @fires nav-bar:disconnected - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
 * @fires nav-bar:attribChanged - When a watched attribute changes. `evt.details` contains the details of the change.
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
export default class NavBar extends HTMLElement {
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
        ++NavBar._iCount // increment total instance count

        // Create an id from name or calculation if needed
        this.name = this.getAttribute('name')
        if (!this.id) {
            if (this.name) this.id = this.name.toLowerCase().replace(/\s/g, '_')
            else this.id = `sc-${NavBar._iCount}`
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
window[className] = NavBar

// Self-register the HTML tag
customElements.define(componentName, NavBar)
