/** Zero dependency web component to load HTML/JSON dynamically
 * See https://github.com/justinfagnani/html-include-element for inspiration
 */

const template = document.createElement('template')
template.innerHTML = `
    <slot></slot>
    <inner-load></inner-load>
`

export class HtmlInclude extends HTMLElement {

    constructor() {
        super()
        this.type = 'text'
        this.text = ''
        this.json = {}
        this.attachShadow({ mode: 'open', delegatesFocus: true })
            .appendChild(template.content.cloneNode(true))
    }

    // component attributes
    static get observedAttributes() {
        return ['src']
    }

    /** The URL to fetch an HTML document from.
     *  Setting this property causes a fetch the HTML from the URL.
     *  We are reflecting the src attrib and the src prop.
     */
    get src() {
        return this.getAttribute('src')
    }

    set src(value) {
        this.setAttribute('src', value)
    }

    // attribute change
    async attributeChangedCallback(property, oldValue, newValue) {

        if (oldValue === newValue) return

        if (property === 'src') {
            const response = await fetch(newValue)

            if (!response.ok) {
                throw new Error(`html-include fetch failed: ${response.statusText}`)
            }

            const contentType = response.headers.get('content-type')
            if (contentType) {
                if (contentType.includes('text/html')) {
                    this.type = 'html'
                } else if (contentType.includes('application/json')) {
                    this.type = 'json'
                } else if (contentType.includes('multipart/form-data')) {
                    this.type = 'form'
                }
            }

            // Could add other binary types here. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#body
            switch (this.type) {
                case 'html': {
                    this.text = await response.text()
                    const parser = new DOMParser()
                    const newDoc = parser.parseFromString( this.text, 'text/html' )
                    this.shadowRoot.removeChild(this.shadowRoot.lastElementChild)
                    this.shadowRoot.appendChild(newDoc.body)
                    break
                }

                case 'json': {
                    this.json = await response.json()
                    this.text = JSON.stringify(this.json, null, 4)
                    this.shadowRoot.removeChild(this.shadowRoot.lastElementChild)
                    const myHtml = document.createElement('pre')
                    myHtml.textContent = this.text
                    this.shadowRoot.appendChild( myHtml )
                    break
                }

                case 'form': {
                    this.json = await response.formData()
                    this.text = JSON.stringify(this.json)
                    this.shadowRoot.removeChild(this.shadowRoot.lastElementChild)
                    this.shadowRoot.append(this.text)
                    break
                }

                default: {
                    this.text = await response.text()
                    this.shadowRoot.append(this.text)
                    break
                }
            }

        }

    }

    // connect component
    // connectedCallback() {
    //     console.log('>> HelloWorld >> connectedCallback >>')
    // }

}

customElements.define('html-include', HtmlInclude)
