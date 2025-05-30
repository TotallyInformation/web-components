/** Zero dependency web component to show a JavaScript object as a highlighted box in the UI
 * Use with uibuilder as:
 *   @example html
 *     <!-- Shows the last incoming msg from Node-RED -->
 *     <syntax-highlight auto="msg">⇇ Latest msg from Node-RED:</syntax-highlight>
 *     <!-- Shows the last outgoing msg to Node-RED -->
 *     <!-- <syntax-highlight auto="sentMsg">⇉ Latest msg to Node-RED:</syntax-highlight> -->
 *     <!-- Shows the last incoming control msg from Node-RED -->
 *     <!-- <syntax-highlight auto="ctrl">⇐ Latest control msg from Node-RED:</syntax-highlight> -->
 *     <!-- Shows the last outgoing control msg to Node-RED -->
 *     <!-- <syntax-highlight auto="sentCtrlMsg">⇒ Latest control msg to Node-RED:</syntax-highlight> -->
 *   @example JavaScript
 *     import('./syntax-highlight')
 * Or use as
 * @example HTML:
 *   <syntax-highlight>Latest msg from Node-RED:</syntax-highlight>
 * @example JavaScript:
 *   const {dumpObject} = await import('./components/syntax-highlight.js')
 *   dumpObject(msg)
 * @example Alternative JavaScript:
 *   await import('./components/syntax-highlight.js')
 *   document.getElementsByTagName('syntax-highlight')[0].json = msg
 * @example Other update methods
 *   const showMsg = document.getElementsByTagName('syntax-highlight')[0]
 *   showMsg.dispatchEvent(new CustomEvent('new-msg', { bubbles: false, detail: msg }))
 *   showMsg.evt('new-msg', msg)
 *
 */
/*
  Copyright (c) 2022 Julian Knight (Totally Information)

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

const template = document.createElement('template')
template.innerHTML = `
    <style>
        :host {
            display: block;
            background-color: white;
            background-image:url(./images/background.svg);
            max-width:100%; 
            height:50vh;
            background-size:auto auto;
            background-repeat: no-repeat;
        }
    </style>
    <slot></slot>
`

export class FloorPlan extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({ mode: 'open', delegatesFocus: true, })
            .append(template.content.cloneNode(true))

        // this.addEventListener('new-msg', evt => {

        // })

        // Get a reference to the uibuilder FE client library if possible
        try {
            // @ts-ignore
            this.uibuilder = window.uibuilder
        } catch (e) {
            this.uibuilder = undefined
        }
    }

    // evt(evtName, evtData) {
    //     this.dispatchEvent(new CustomEvent(evtName, { bubbles: false, detail: evtData }))
    // }

    // static get observedAttributes() { return [
    //     'auto',
    // ]}

    attributeChangedCallback(name, oldVal, newVal) {
        if ( oldVal === newVal ) return

    } // --- end of attributeChangedCallback --- //

} // ---- End of FloorPlan class definition ---- //

// Add the class as a new Custom Element to the window object
customElements.define('floor-plan', FloorPlan)

// document.addEventListener('new-msg', evt => {
//     console.log('GOT A MSG', evt)
// })

// Consider using a std to expose default functionality for a component
// export const floorPlan = ?
