
let template = document.createElement('template');
template.innerHTML = /*html*/ `
    <div>List items:</div>
    <ul></ul>
`

let instanceCount = 0
const instance = {}

// Create a GLOBAL var for this component
// window.dataList = {
//     count: 0,
//     instances: {},

    

//     setData: (elementId, elementData) => {
//         console.log('>> setData this >>', window.dataList.instances[elementId])
//         // Get ref to element
//         let el = document.getElementById(elementId)

//         // Set the data

//     },
// }

export default class DataList extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open', delegatesFocus: true })
            .append(template.content.cloneNode(true))

        

        this._list = this.shadowRoot.querySelector('ul')

        this._entries = {}
    }

    // Getter/setter for the `data` public property - maps to this._entries
    set data(val) {
        this._entries = val

        this._list.innerHTML = ''
        // Dynamically build the content of the ul/ol
        Object.keys(this._entries).forEach( (key, i) => {
            this._list.insertAdjacentHTML('beforeend', `<li id="${key}">${key} :: ${this._entries[key]}</li>`)
        })
    }
    get data() {
        return this._entries
    }
    entry(key, val) {
        // this._list.innerHTML = ''
        this._entries[key] = val
        this.data = this._entries

        let sr = this.shadowRoot.getElementById(key)
        console.log('>> li key >>', sr)

        
        // Dynamically build the content of the ul/ol
        // Object.keys(this._entries).forEach( (key, i) => {
        //     this._list.insertAdjacentHTML('beforeend', `<li id="${key}">${key} :: ${this._entries[key]}</li>`)
        // })
    }

    static get instances() {
        return instanceCount
    }

    getInstance(instanceId) {
        return instance[instanceId]
    }

    static get observedAttributes() { return [
        'listvar', 'type',
    ]}

    attributeChangedCallback(name, oldVal, newVal) {

        if ( oldVal === newVal ) return

        if ( name === 'listvar' && window[newVal] ) {
            if ( window[newVal] ) {

                this.data = window[newVal]
                // window.dataList.instances[this.id] = window[newVal]
                // console.log('>> listvar change >>', this.id, this._entries, window.dataList.instances[this.id])
                //window[newVal] = new Proxy()

            } else {
                console.error(`[DataList] window.${newVal} does not exist, ignoring.`)
            }

            return
        }

        this[name] = newVal

    } // --- end of attributeChangedCallback --- //

    connectedCallback() {
        // Keep count of the number of instances
        instanceCount++

        // If no element id, create an ID that should be unique across all instances
        if (!this.id) {
            let myname = this.getAttribute('name')
            if (myname) this.id = myname.replaceAll(' ', '_')
            else this.id = `dataList${instanceCount}`
        }

        // Keep track of each instance
        instance[this.id] = this

        // Notify Event
        
    }

    disconnectedCallback() {
        // Keep count of the number of instances
        instanceCount--

        // Keep track of each instance
        delete instance[this.id]
    }
}

/** Self register the class to global
 * Enables new data lists to be dynamically added via JS
 * and lets the static methods be called
 */
window.DataList = DataList

// Export the class as default
// export default DataList

// Self-register the HTML tag
customElements.define('data-list', DataList)
