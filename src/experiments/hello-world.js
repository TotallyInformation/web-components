const template = document.createElement('template')
template.innerHTML = `
  <style>
    p {
      display: block;
      font-weight: var(--super-font-weight, bolder);
      background-color: red;
    }
  </style>
  <p>Whats Up Doc</p>
  <slot></slot>
  <p>Hello <span id="name"></span>!</p>
`

export class HelloWorld extends HTMLElement {

    constructor() {
        super()
        console.log('>> HelloWorld constructor >>', this.getAttribute('name'))
        //this.name = 'World'
        this.attachShadow({ mode: 'open', })
            .appendChild(template.content.cloneNode(true))
    }

    // component attributes
    static get observedAttributes() {
        return ['name']
    }

    set name(val) {
        console.log('>> setting name in hello-world >>', val, this.name)
        this.shadowRoot.getElementById('name').textContent = val
    }
    get name() {
        return this.getAttribute('name')
    }

    // attribute change
    attributeChangedCallback(property, oldValue, newValue) {

        if (oldValue === newValue) return

        console.log(`>> attribute changed >>`, property, newValue, oldValue)

        this[property] = newValue
    }

    // connect component
    connectedCallback() {
        console.log('>> HelloWorld >> connectedCallback >>')
    }

}

customElements.define('hello-world', HelloWorld)
