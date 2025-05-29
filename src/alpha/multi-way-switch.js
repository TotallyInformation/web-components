/** A zero-dependency multi-way switch component.
 * Allows for 3 different display modes: button-row, slider and knob
 *
 * @version 0.1.0 2024-09-14
 *
 * @example
 * <multi-way-switch mode="buttons" positions="5" values="10,20,30,40,50"></multi-way-switch>
 * <multi-way-switch mode="slider" positions="3" values="low,medium,high"></multi-way-switch>
 * <multi-way-switch mode="knob" positions="4" values="1,2,4,8"></multi-way-switch>
 */
/*
  Copyright (c) 2024-2024 Julian Knight (Totally Information)

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

// ! STATUS: Early alpha

/**
 * TODO
 * - warm-up/-down interval/event
 * - better button-row - wrap in fieldset? Add LED option
 * - vert
 * - nicer knob, knob click should rotate clockwise. Allow for shift-click
 * - add an radio button mode with fieldset
 * - Add custom event on value change
 * - Accessibility: aria-pressed, aria-hidden on led's, title/aria-label
 * - touch-action: pan-y, drag
 * - label positioning
 * - value display and positioning
 * - option for sending data immediately to node-red if uibuilder present
 */

/** References
 * https://codepen.io/johnred15/pen/NWXagPZ - simple with size/colour options
 * https://webcodespace.com/how-to-create-a-three-state-toggle-switch-using-html-css-and-javascript
 * https://www.w3schools.com/howto/howto_css_switch.asp
 */

const template = document.createElement('template')
template.innerHTML = /*html*/`
    <style>
        :host {
            display: inline-block;
        }
        .buttons, .slider, .knob {
            display: none;
        }
        .buttons button {
            margin-right: 5px;
        }
        .slider input[type="range"] {
            width: 100%;
        }
        .knob {
            width: 100px;
            height: 100px;
            background-color: lightgray;
            border-radius: 50%;
            position: relative;
        }
        .knob-handle {
            position: absolute;
            width: 10px;
            height: 50px;
            background-color: darkgray;
            top: 25px;
            left: 45px;
            transform-origin: bottom center;
            transform: rotate(0deg);
        }
        :host([mode="buttons"]) .buttons {
            display: block;
        }
        :host([mode="slider"]) .slider {
            display: block;
        }
        :host([mode="knob"]) .knob {
            display: block;
        }
    </style>

    <div class="buttons"></div>
    <div class="slider">
        <input type="range" min="0" max="100" value="0">
    </div>
    <div class="knob">
        <div class="knob-handle"></div>
    </div>
`

class MultiWaySwitch extends HTMLElement {
    //#region --- Class Properties ---

    /** Is UIBUILDER loaded? */
    uib = !!window['uibuilder']

    /** Mini jQuery-like shadow dom selector (see constructor) */
    $

    /** Holds a count of how many instances of this component are on the page */
    static _iCount = 0

    //#endregion --- Class Properties ---

    /** @returns {Array<string>} List of all of the html attribs (props) listened to */
    static get observedAttributes() {
        return ['mode', 'positions', 'values']
    }

    constructor() {
        super()

        this.attachShadow({ mode: 'open', delegatesFocus: true })
            .append(template.content.cloneNode(true))

        // @ts-ignore
        this.$ = this.shadowRoot.querySelector.bind(this.shadowRoot)

        this._value = 0
        this.knobRotation = 0
        this._customValues = []

        this.dispatchEvent(new Event('multi-way-switch:construction-complete', { bubbles: true, composed: true }))
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if ( oldVal === newVal ) return
        if (name === 'positions' || name === 'values') {
            this._setupButtons()
            this._setupSlider()
        }
    }

    connectedCallback() {
        // Make sure instance has an ID. Create an id from name or calculation if needed
        if (!this.id) {
            if (!this.name) this.name = this.getAttribute('name')
            if (this.name) this.id = this.name.toLowerCase().replace(/\s/g, '_')
            else this.id = `uib-meta-${++MultiWaySwitch._iCount}`
        }

        this._setupButtons()
        this._setupSlider()
        this._setupKnob()
    }

    get value() {
        return this._customValues[this._value] || this._value
    }

    set value(newValue) {
        this._value = newValue
        this._updateUI()
    }

    _setupButtons() {
        const buttonsContainer = this.shadowRoot.querySelector('.buttons')
        buttonsContainer.innerHTML = ''

        const positions = Math.max(2, Math.min(parseInt(this.getAttribute('positions'), 10), 255)) || 2
        this._customValues = this._parseValues(positions)

        for (let i = 0; i < positions; i++) {
            const button = document.createElement('button')
            button.textContent = `Pos ${i + 1}`
            button.addEventListener('click', () => {
                this.value = i
            })
            buttonsContainer.appendChild(button)
        }
    }

    _setupSlider() {
        const slider = this.shadowRoot.querySelector('input[type="range"]')
        const positions = Math.max(2, Math.min(parseInt(this.getAttribute('positions'), 10), 255)) || 2
        slider.max = positions - 1
        slider.addEventListener('input', () => {
            this.value = slider.value
        })
    }

    _setupKnob() {
        const knob = this.shadowRoot.querySelector('.knob')
        const handle = this.shadowRoot.querySelector('.knob-handle')
        const positions = Math.max(2, Math.min(parseInt(this.getAttribute('positions'), 10), 255)) || 2

        knob.addEventListener('mousedown', (event) => {
            const knobCenter = { x: knob.offsetLeft + knob.offsetWidth / 2, y: knob.offsetTop + knob.offsetHeight / 2 }
            const onMouseMove = (moveEvent) => {
                const dx = moveEvent.pageX - knobCenter.x
                const dy = moveEvent.pageY - knobCenter.y
                this.knobRotation = Math.atan2(dy, dx) * (180 / Math.PI)
                handle.style.transform = `rotate(${this.knobRotation}deg)`
                const position = Math.round(((this.knobRotation + 180) % 360) / 360 * (positions - 1))
                this.value = position
            };

            const onMouseUp = () => {
                window.removeEventListener('mousemove', onMouseMove)
                window.removeEventListener('mouseup', onMouseUp)
            };

            window.addEventListener('mousemove', onMouseMove)
            window.addEventListener('mouseup', onMouseUp)
        })
    }

    _parseValues(positions) {
        const valuesAttr = this.getAttribute('values')
        if (valuesAttr) {
            const values = valuesAttr.split(',').map(val => val.trim())
            if (values.length >= positions) {
                return values.slice(0, positions)
            } else {
                return [...values, ...Array(positions - values.length).fill(values[values.length - 1])]
            }
        } else {
            return Array.from({ length: positions }, (_, i) => i)
        }
    }

    _updateUI() {
        const slider = this.shadowRoot.querySelector('input[type="range"]')
        slider.value = this._value

        const buttons = this.shadowRoot.querySelectorAll('.buttons button')
        buttons.forEach((button, index) => {
            button.style.backgroundColor = index === this._value ? 'lightblue' : ''
        })

        const handle = this.shadowRoot.querySelector('.knob-handle')
        const positions = Math.max(2, Math.min(parseInt(this.getAttribute('positions'), 10), 255)) || 2
        this.knobRotation = (this._value / (positions - 1)) * 360 - 180
        handle.style.transform = `rotate(${this.knobRotation}deg)`
    }
}

/** Self register the class to global
 * Enables new data to be dynamically added via JS
 * and lets any static methods be called
 */
window['MultiWaySwitch'] = MultiWaySwitch

// Add the class as a new Custom Element to the window object
customElements.define('multi-way-switch', MultiWaySwitch)
