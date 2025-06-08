// super-star.js

const options = { duration: 300, iterations: 5, easing: 'ease-in-out', }
const keyframes = [
    { opacity: 1.0, blur: '0px', transform: 'rotate(0deg)', },
    { opacity: 0.7, blur: '2px', transform: 'rotate(360deg)', },
    { opacity: 1.0, blur: '0px', transform: 'rotate(0deg)', },
]

const template = document.createElement('template')
template.innerHTML = `
  <style>
    span {
      display: inline-block;
      font-weight: var(--super-font-weight, bolder);
    }
  </style>
  <span><slot></slot></span>
  <abbr title="click or mouse over">🖱</abbr>
`

export class SuperStar extends HTMLElement {

    $(selector) {
        return this.shadowRoot && this.shadowRoot.querySelector(selector)
    }

    constructor() {
        super()
        this.shine = this.shine.bind(this)
        const root = this.attachShadow({ mode: 'open', })
        root.appendChild(template.content.cloneNode(true))
        this.addEventListener('click', this.shine)
        this.addEventListener('mouseover', this.shine)
    }

    connectedCallback() {
        const slot = this.$('slot')
        const [node] = slot.assignedNodes()
        this.setAttribute('aria-label', node.textContent)
        node.textContent = '⭐️'
    }

    shine(event) {
        this.$('span').animate(keyframes, options)
    }
}

customElements.define('super-star', SuperStar)
