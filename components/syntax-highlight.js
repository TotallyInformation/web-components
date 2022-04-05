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
            color:white;
            background-color:black;
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
            padding: 0.5rem;
        }
        pre {
            font-family: Consolas, "ui-monospace", "Lucida Console", monospace;
            white-space: pre;
            margin: 0;
        }
        .key {color:#ffbf35}
        .string {color:#5dff39;}
        .number {color:#70aeff;}
        .boolean {color:#b993ff;}
        .null {color:#93ffe4;}
        .undefined {color:#ff93c9;}
    </style>
    <slot></slot>
    <pre><i>No data</i></pre>
`

// return formatted HTML version of JSON object
const returnHighlight = function (json) {
    json = JSON.stringify(json, undefined, 4)
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number'
        if ((/^"/).test(match)) {
            if ((/:$/).test(match)) {
                cls = 'key'
            } else {
                cls = 'string'
            }
        } else if ((/true|false/).test(match)) {
            cls = 'boolean'
        } else if ((/null/).test(match)) {
            cls = 'null'
        }
        return '<span class="' + cls + '">' + match + '</span>'
    })
    const myHtml = document.createElement('pre')
    myHtml.innerHTML = json
    return myHtml
} // --- End of syntaxHighlight --- //

export class SyntaxHighlight extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({ mode: 'open', delegatesFocus: true })
            .append(template.content.cloneNode(true))

        this.addEventListener('new-msg', evt => {
            this.json = evt.detail
        })

        // Get a reference to the uibuilder FE client library if possible
        try {
            this.uibuilder = window.uibuilder
        } catch (e) {
            this.uibuilder = undefined
        }
    }

    set json(value) {
        //console.log(value, syntaxHighlight(value))
        this.shadowRoot.removeChild(this.shadowRoot.lastElementChild)
        this.shadowRoot.appendChild(returnHighlight(value))
    }

    evt(evtName, evtData) {
        this.dispatchEvent(new CustomEvent(evtName, { bubbles: false, detail: evtData }))
    }

    static get observedAttributes() { return [
        'auto', 
    ]}

    attributeChangedCallback(name, oldVal, newVal) {
        if ( oldVal === newVal ) return

        // auto attrib allows msgs to/from Node-RED to be shown as long as window.uibuilder is available
        if ( name === 'auto' && this.uibuilder ) {
            switch (newVal) {
                case 'message':
                case 'msg': {
                    this.uibuilder.onChange('msg', (msg)=> {
                        this.json = msg
                    })
                    break
                }

                case 'ctrl':
                case 'control':
                case 'ctrlMsg': {
                    this.uibuilder.onChange('ctrlMsg', (msg)=> {
                        this.json = msg
                    })
                    break
                }

                case 'sent':
                case 'sentmsg':
                case 'sentMsg': {
                    this.uibuilder.onChange('sentMsg', (msg)=> {
                        this.json = msg
                    })
                    break
                }

                case 'sentctrlmsg':
                case 'sentCtrlMsg': {
                    this.uibuilder.onChange('sentCtrlMsg', (msg)=> {
                        this.json = msg
                    })
                    break
                }

                default: {
                    break
                }
            } // -- end of switch --
        } // -- end of if name=auto --
        
    } // --- end of attributeChangedCallback --- //

} // ---- End of SyntaxHighlight class definition ---- //

// Add the class as a new Custom Element to the window object
customElements.define('syntax-highlight', SyntaxHighlight)

// document.addEventListener('new-msg', evt => {
//     console.log('GOT A MSG', evt)
// })

/** Quick and dirty method to dump a JavaScript object to the ui
 * Will put the output to the first <syntax-highlight> tag on the page
 * @param {*} obj Object to dump
 * @param {number} [ref] Optional, default=0. Which tag to use? If >1 <syntax-highlight> tag is on the page.
 */
export const dumpObject = function showJson(obj, ref = 0) {
    try {
        const showMsg = document.getElementsByTagName('syntax-highlight')[ref]
        showMsg.json = obj
    } catch (e) {
        console.error('[syntax-highlight:dumpObject] Cannot show object - is there a <syntax-highlight> tag?')
    }
}

// Consider using a std to expose default functionality for a component
export const syntaxHighlight = dumpObject