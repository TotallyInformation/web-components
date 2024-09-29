/** Define the base component extensions for other components in this package.
 * Used to ensure that standard properties and methods are available in every component.
 *
 * Version: See the class code
 *
 **/
/** Copyright (c) 2024-2024 Julian Knight (Totally Information)
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

/** Namespace
 * @namespace Library
 */

/**
 * @class
 * @extends HTMLElement
 * @description Define the base component extensions for other components in this package.
 *
 * @element ti-base-component
 * @memberOf Library
 *
 * @method config Update runtime configuration, return complete config
 * @method createShadowSelectors Creates the jQuery-like $ and $$ methods
 * @method deepAssign Object deep merger
 * @method doInheritStyles If requested, add link to an external style sheet
 * @method ensureId Adds a unique ID to the tag if no ID defined.
 * @method _uibMsgHandler Not yet in use
 * @method _event(name,data) Standardised custom event dispatcher
 * @method _ready Call from end of connectedCallback. Sets connected prop and outputs events

 * Standard watched attributes (common across all my components):
 * @attr {string|boolean} inherit-style - Optional. Load external styles into component (only useful if using template). If present but empty, will default to './index.css'. Optionally give a URL to load.
 * Other watched attributes:
 * None

 * Standard props (common across all my components):
 * @prop {string} baseVersion Static. The component version string (date updated). Also has a getter.
 * @prop {number} _iCount Static. The component version string (date updated)
 * @prop {boolean} uib True if UIBUILDER for Node-RED is loaded
 * @prop {function(string): Element} $ jQuery-like shadow dom selector
 * @prop {function(string): NodeList} $$  jQuery-like shadow dom multi-selector
 * @prop {boolean} connected False until connectedCallback finishes
 * @prop {string} name Placeholder for the optional name attribute
 * @prop {object} opts This components controllable options - get/set using the `config()` method
 * 
 * @prop {string} version Getter that returns the class version & baseVersion static strings.
 * Other props:
 * By default, all attributes are also created as properties

 * See https://github.com/runem/web-component-analyzer?tab=readme-ov-file#-how-to-document-your-components-using-jsdoc
 */
class TiBaseComponent extends HTMLElement {
    /** Component version */
    static baseVersion = '2024-09-29'

    /** Holds a count of how many instances of this component are on the page that don't have their own id
     * Used to ensure a unique id if needing to add one dynamically
     */
    static _iCount = 0

    /** Is UIBUILDER for Node-RED loaded? */
    uib = !!window['uibuilder']
    /** Mini jQuery-like shadow dom selector (see constructor)
     * @type {function(string): Element}
     * @param {string} selector - A CSS selector to match the element within the shadow DOM.
     * @returns {Element} The first element that matches the specified selector.
     */
    $
    /** Mini jQuery-like shadow dom multi-selector (see constructor)
     * @type {function(string): NodeList}
     * @param {string} selector - A CSS selector to match the element within the shadow DOM.
     * @returns {NodeList} A STATIC list of all shadow dom elements that match the selector.
     */
    $$

    /** True when instance finishes connecting.
     * Allows initial calls of attributeChangedCallback to be
     * ignored if needed. */
    connected = false

    /** Placeholder for the optional name attribute @type {string} */
    name

    /** Runtime configuration settings @type {object} */
    opts = {}

    /** Report the current component version string */
    get version() {
        // @ts-ignore
        return `${this.constructor.version} (Base: ${this.constructor.baseVersion})`
    }

    /** NB: Attributes not available here - use connectedCallback to reference */
    constructor() {
        super()
    }

    /** Optionally apply an external linked style sheet (called from connectedCallback)
     * @param {*} url The URL for the linked style sheet
     */
    async doInheritStyles() {
        if (!this.hasAttribute('inherit-style')) return

        let url = this.getAttribute('inherit-style')
        if (!url) url = './index.css'

        const linkEl = document.createElement('link')
        linkEl.setAttribute('type', 'text/css')
        linkEl.setAttribute('rel', 'stylesheet')
        linkEl.setAttribute('href', url)
        // @ts-ignore
        this.shadowRoot.appendChild(linkEl)

        console.info(`[${this.localName}] Inherit-style requested. Loading: "${url}"`)
    }

    /** OPTIONAL. Update runtime configuration, return complete config
     * @param {object|undefined} config If present, partial or full set of options. If undefined, fn returns the current full option settings
     */
    config(config) {
        // Merge config but ensure that default states always present
        // if (config) this.opts = { ...this.opts, ...config }
        if (config) this.opts = TiBaseComponent.deepAssign(this.opts, config)
        return this.opts
    }

    /** Utility object deep merge fn
     * @param {object} target Merge target object
     * @param  {...object} sources 1 or more source objects to merge
     * @returns {object} Deep merged object
     */
    static deepAssign(target, ...sources) {
        for (let source of sources) { // eslint-disable-line prefer-const
            for (let k in source) { // eslint-disable-line prefer-const
                const vs = source[k]
                const vt = target[k]
                if (Object(vs) == vs && Object(vt) === vt) { // eslint-disable-line eqeqeq
                    target[k] = TiBaseComponent.deepAssign(vt, vs)
                    continue
                }
                target[k] = source[k]
            }
        }
        return target
    }

    /** Ensure that the component instance has a unique ID & check again if uib loaded */
    ensureId() {
        // Check again if UIBUILDER for Node-RED is loaded
        this.uib = !!window['uibuilder']

        if (!this.id) {
            // if (!this.name) this.name = this.getAttribute('name')
            // if (this.name) this.id = this.name.toLowerCase().replace(/\s/g, '_')
            // else this.id = `${this.localName}-${++this.constructor._iCount}`
            // @ts-ignore
            this.id = `${this.localName}-${++this.constructor._iCount}`
        }
    }

    /** Creates the $ and $$ fns that do css selections against the shadow dom */
    createShadowSelectors() {
        this.$ = this.shadowRoot?.querySelector.bind(this.shadowRoot)
        this.$$ = this.shadowRoot?.querySelectorAll.bind(this.shadowRoot)
    }

    // TODO Needs enhancing - does nothing at the moment
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

    /** Custom event dispacher `component-name:name` with detail data
     * @example
     *   this._event('ready')
     * @example
     *   this._event('ready', {age: 42, type: 'android'})
     *
     * @param {string} name A name to give the event, added to the component-name separated with a :
     * @param {*=} data Optional data object to pass to event listeners via the evt.detail property
     */
    _event(name, data) {
        this.dispatchEvent(new CustomEvent(`${this.localName}:${name}`, {
            bubbles: true,
            composed: true,
            detail: {
                id: this.id,
                name: this.name,
                data: data,
            },
        } ) )
    }

    /** Call from end of connectedCallback */
    _ready() {
        this.connected = true
        this._event('connected')
        this._event('ready')
    }
} // ---- end of Class ---- //

// Make the class the default export so it can be used elsewhere
export default TiBaseComponent

// This is a library class so don't self-register, it is only for inclusion in actual components
