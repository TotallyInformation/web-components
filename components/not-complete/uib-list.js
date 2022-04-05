let template = document.createElement('template');
template.innerHTML = /*html*/ `
<div style="${MY_CSS_.title}">List items:</div>
<ul>
  ${DATA.map(item => /*html*/ `<div style="${MY_CSS.item}">${item.text}</div>`).join('')}
</ul>
`;

class UibList extends HTMLElement {
  constructor() {
    super();
    this._contents = new DocumentFragment();
    this._contents.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    this.appendChild(this._contents);
  }
}

window.customElements.define('uib-list', UibList);