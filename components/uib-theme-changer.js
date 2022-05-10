/** Define a new zero dependency custom web component ECMA module that can be used as an HTML tag
 *
 * TODO:
 *   - Compact layout
 *   - Other attribs for controlling scheme, etc
 *
 * @version 0.2 2022-05-09 Early-release
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

const componentName = 'uib-theme-changer'
const className = 'UibThemeChanger'

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
            display: block;
            position: sticky;
            top: 0;
            background-color: var(--surface1);
            border: 1px solid var(--text3);
            border-radius: 0.5rem;
            margin: 0.2rem;
            padding: 0.5rem;
            color: var(--text2);
            background-clip: border-box;
            box-sizing: border-box;
            box-shadow: var(--shadow2);
        }
        button {
            --size: 2rem;
            
            background: none;
            color: var(--text3);
            border: none;
            padding: 0;
            
            inline-size: var(--size);
            block-size: var(--size);
            aspect-ratio: 1;
            border-radius: 50%;

            cursor: pointer;
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
            outline-offset: 5px;
        }
        @media (hover: none) {
            button {
                --size: 48px;
            }
        }
        .sun-and-moon {
            inline-size: 100%;
            block-size: 100%;
            stroke-linecap: round;
        }
        .moon, .sun {
            fill: var(--text2);
        }
        .moon:hover, .sun:hover {
            fill: var(--text1);
        }

    </style>
    <button name="color-scheme-toggle" title="Toggles between light & dark color schemes" 
        aria-label="auto" aria-live="polite"
        onclick="this.getRootNode().host.evtClickToggle(event)"
    >
        <svg class="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
            <svg name="sun" class="sun" viewbox="0 0 20 20">
                <path
                    fill-rule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clip-rule="evenodd"
                ></path>
            </svg>
            <svg name="moon" class="moon" viewbox="0 0 20 20">
                <path
                    d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                ></path>
            </svg>
            <svg class="divider" width='100%' height='100%' viewBox='0 0 20 20' preserveAspectRatio='none'>
                <line x1="5" y1="5" x2="15" y2="15" vector-effect="non-scaling-stroke" 
                      stroke-width="10%" stroke="currentColor" />
            </svg>
        </svg>
    </button>
    <form>
        <div name="color-scheme-choose" onclick="this.getRootNode().host.evtClickChooser(event)">
            <b>Color scheme:</b>
            <label><input type="radio" name="input-color-scheme-choose" value="auto">auto</label>
            <label><input type="radio" name="input-color-scheme-choose" value="light">light</label>
            <label><input type="radio" name="input-color-scheme-choose" value="dark">dark</label>
        </div>
        
        <!-- 
        <div>
            <b>Contrast:</b>
            <label>
                <input type="radio" name="contrast" value="no-preference">
        
                no-preference
            </label>
        
            <label>
                <input type="radio" name="contrast" value="more">
        
                more
            </label>
        
            <label>
                <input type="radio" name="contrast" value="less">
        
                less
            </label>
        </div> -->
    
        <div>
            <b>Brand Hue angle:</b>
            <input name="brand-hue" type="range" min="0" max="360" step="1" value="200">
            <output>200</output>
        </div>

        <div title="30=Split Complementary, 60=Triadic, 150=Complementary">
            <b>Accent offset angle</b>
            <input name="accent-offset" type="range" min="0" max="360" step="1" value="30">
            <output>30</output>
        </div>
    </form>
    
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
export default class UibThemeChanger extends HTMLElement {
    //#region ---- Class Variables ----

    /** Holds the uib theme settings for all pages in this domain (from/to localStorage) */
    uibThemeSettings = {}

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

    /** What is the current scheme? 'light', 'dark' or 'auto' */
    scheme = undefined

    /** Holds the name for this instance of the component */
    name = undefined

    /** Holds a count of how many instances of this component are on the page */
    static _iCount = 0

    //#endregion ---- ---- ---- ----

    //#region ---- Utility Functions ----

    setTheme(theme) {
        const $ = this.shadowRoot.querySelector.bind(this.shadowRoot)
        const docRoot = document.documentElement
        switch (theme) {
            case 'dark': {
                this.scheme = 'dark'
                docRoot.classList.remove('light')
                docRoot.classList.add('dark')
                $('.sun').style.opacity = 0
                $('.moon').style.opacity = 1
                $('.divider').style.opacity = 0
                break
            }
            case 'light': {
                this.scheme = 'light'
                docRoot.classList.remove('dark')
                docRoot.classList.add('light')
                $('.sun').style.opacity = 1
                $('.moon').style.opacity = 0
                $('.divider').style.opacity = 0
                break
            }
            case 'auto':
            default: {
                this.scheme = 'auto'
                docRoot.classList.remove('light')
                docRoot.classList.remove('dark')
                $('.sun').style.opacity = 1
                $('.moon').style.opacity = 1
                $('.divider').style.opacity = 1
                break
            }
        }
        return theme
    }

    //#endregion ---- ---- ---- ----

    //#region ---- Event Handlers ----

    /** Handle the icon
     * @param {MouseEvent} evt
     */
    evtClickToggle(evt) {
        console.log('more direct: ', evt.target.tagName)
    }

    /** Handle the chooser
     * @param {MouseEvent} evt
     */
    evtClickChooser(evt) {
        try {
            this.uibThemeSettings[window.location.pathname].theme = evt.target.value
            localStorage.setItem('uibThemeSettings', JSON.stringify(this.uibThemeSettings))
        } catch (e) {}

        // TODO: Consider moving to a getter/setter
        this.setTheme(evt.target.value)
    }

    //#endregion ---- ---- ---- ----

    constructor() {
        super()

        this.attachShadow({ mode: 'open', delegatesFocus: true })
            .append(template.content.cloneNode(true))

        this.$ = this.shadowRoot.querySelector.bind(this.shadowRoot)

        const docRoot = document.documentElement

        this.$('[name=brand-hue]').addEventListener('change', function(evt) {
            docRoot.style.setProperty('--brand-hue', evt.target.value)
        })
        this.$('[name=brand-hue]').addEventListener('input', function(evt) {
            this.nextElementSibling.value = this.value
        })

        this.$('[name=accent-offset]').addEventListener('change', function(evt) {
            docRoot.style.setProperty('--accent-offset', evt.target.value)
        })
        this.$('[name=accent-offset]').addEventListener('input', function(evt) {
            this.nextElementSibling.value = this.value
        })

        this.dispatchEvent(new Event(`${componentName}:construction`, { bubbles: true, composed: true }))

    } // ---- end of constructor ---- //

    // List all attribs we want to observe
    static get observedAttributes() { return [
        'name'
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

    } // --- end of attributeChangedCallback --- //

    // Runs when an instance is added to the DOM
    connectedCallback() {
        ++UibThemeChanger._iCount // increment total instance count

        // Create an id from name or calculation if needed
        this.name = this.getAttribute('name')
        if (!this.id) {
            if (this.name) this.id = this.name.toLowerCase().replace(/\s/g, '_')
            else this.id = `${componentName}-${UibThemeChanger._iCount}`
        }

        if ( !getComputedStyle(this).getPropertyValue('--uib-css').includes('uib-brand') ) {
            console.warn('[uib-theme-changer] WARNING: It appears that you are not using uibuilder\'s uib-brand.css stylesheet. This component may not work as expected.')
        }

        //#region --- theme switcher ---
        try {
            this.uibThemeSettings = JSON.parse(localStorage.getItem('uibThemeSettings')) || this.uibThemeSettings
        } catch (e) {}
        if ( !this.uibThemeSettings[window.location.pathname] ) this.uibThemeSettings[window.location.pathname] = {}

        // If theme is manually set, remove saved setting for this page (not needed)
        const docRoot = document.documentElement
        if ( docRoot.classList.contains('light') || docRoot.classList.contains('dark')  || docRoot.classList.contains('auto')) {
            console.log('classList', docRoot.classList[0])
            try {
                delete this.uibThemeSettings[window.location.pathname].theme
                localStorage.setItem('uibThemeSettings', JSON.stringify(this.uibThemeSettings))
            } catch (e) {}
            this.shadowRoot.querySelector(`input[value=${docRoot.classList[0]}][name=input-color-scheme-choose]`).checked = true
        } else if ( this.uibThemeSettings[window.location.pathname] && this.uibThemeSettings[window.location.pathname].theme ) {
            // not manually set but does have a saved page setting
            this.shadowRoot.querySelector(`input[value=${this.uibThemeSettings[window.location.pathname].theme}][name=input-color-scheme-choose]`).checked = true
            this.setTheme(this.uibThemeSettings[window.location.pathname].theme)
        } else {
            this.shadowRoot.querySelector('input[value=auto][name=input-color-scheme-choose]').checked = true
        }
        //#endregion --- --- ---

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
        // NB: Dont decrement UibThemeChanger._iCount because that could lead to id nameclashes

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
window[className] = UibThemeChanger

// Self-register the HTML tag
customElements.define(componentName, UibThemeChanger)
