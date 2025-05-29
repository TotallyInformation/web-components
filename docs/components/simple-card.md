---
title: simple-card
description: |
  A Zero dependency web component that shows a boxed card with optional header and footer.
created: 2025-05-29 16:02:25
updated: 2025-05-29 16:02:29
author: Julian Knight (Totally Information)
status: alpha # alpha, beta, live
---

> [!TIP]
> If using the default CSS from UIBUILDER for Node-RED, you can, instead use the native HTML `<article>` element which has a similar effect. The `<article>` element is also more semantic.
>
> This component wraps and `<article>` element and adds extra accessibility labelling for the optional header and footer.

## Useage

```html
<simple-card>
  Some content in a card.
</simple-card>
```

```html
<simple-card>
  Hello, in a card
  <span slot="header">Some other header</span>
  <span slot="footer">Some footer</span>
</simple-card>
```

## Attributes & Properties

### Attributes

All of the attributes are optional.

* Attributes specific to this component

  * `variant` - Sets the cards colour variant.

* Attributes inherited from the `BaseComponent`:

  * `inherit-style` - Load external styles into component. If present but empty, will default to './index.css'. Optionally give a URL to load.
  * `name` - HTML name attribute. Included in output _meta prop.

### Properties

Each attribute has a corresponding property. You can set the property directly in JavaScript or by using the `setAttribute` method. Note that setting the property will not change the attribute

* Properties specific to this component (that don't have a corresponding attribute):

  * None.

* Properties inherited from the `BaseComponent`:

  * {number} `_iCount` Static. The count of instances of this component that weren't given an id. Creates a unique id as needed.
  * {boolean} `uib` True if UIBUILDER for Node-RED is loaded. (Default=FALSE)
  * {object} `uibuilder` Reference to loaded UIBUILDER for Node-RED client library if loaded (else undefined).
  * {function(string): Element} `$` jQuery-like shadow dom selector (or undefined if shadow dom not used).
  * {function(string): NodeList} `$$`  jQuery-like shadow dom multi-selector (or undefined if shadow dom not used).
  * {boolean} `connected` False until connectedCallback finishes.
  * {string} `name` Placeholder for the optional name attribute.
  * {object} `opts` This components controllable options - get/set using the `config()` method - empty object by default.
  * {string} `baseVersion` Static. The base component version string (date updated).

* Other standard properties:

  * `{string} componentVersion` Static. The component version string (date updated). Also has a getter that returns component and base version strings.

> [!NOTE]
> Static properties have to be accessed via the component's classname. e.g. `SimpleCard.componentVersion`

## Slots

* Default - The main slot is used to contain the content of the card. This is the content that will be displayed inside the card.
* `header` - A named slot for the header of the card. This can be used to provide a title or other content at the top of the card.
* `footer` - A named slot for the footer of the card. This can be used to provide additional information or actions at the bottom of the card.

> [!NOTE]
> Slots are used to allow the component to accept HTML content. By default, the main slot, if defined, will contain any content between the opening and closing tags of the component. You can also define named slots to allow for more complex content arrangements.

## Styling

```js
const color = {
    mode: 'light',
    fg: 'var(--text2)',
    bg: 'var(--surface4)',
    border: 'var(--text4)'
}
```

```css
:host {
    display: block;
    border: 1px solid ${color.border};
    border-radius: 0.5rem;
    margin: 0.2rem;
    background-color: ${color.bg};
    color: ${color.fg};
    background-clip: border-box;
    box-sizing: border-box;
    box-shadow: var(--shadow2);
}
#header {display: none;}
#main   {display: block; padding: 1rem 0.5rem;}
#footer {display: none}
```

The referenced CSS variables come from the UIBUILDER for Node-RED default CSS. Define them in your own CSS if you are not using the UIBUILDER's default `uib-brand.css` or override them to taste.

Header and footer are hidden by default. If you want to use them, you can add the `header` and/or `footer` slots to your component. The header and footer will then be automatically displayed with the content of the respective slot.

### Inheriting Styles

This component uses the Shadow DOM to encapsulate its styles. This means that the component will not inherit styles from the main document. However, you can still style the component using [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties). You can also use the `inherit-styles` attribute to allow the component to inherit styles from a style link (usually the same as the main page's style sheet).

### CSS Variables

The following CSS variables are available for styling:

* `--text2` - The foreground text color for the card.
* `--surface4` - The background color for the card.
* `--text4` - The border color for the card.
* `--shadow2` - The box shadow for the card.

## Events

The standard events for this library of components are also available:

* `simple-card:connected` - When an instance of the component is attached to the DOM. `evt.details` contains the details of the element.
* `simple-card:ready` - Alias for connected. The instance can handle property & attribute changes
* `simple-card:disconnected` - When an instance of the component is removed from the DOM. `evt.details` contains the details of the element.
* `simple-card:attribChanged` - When a watched attribute changes. `evt.details.data` contains the details of the change.

NOTE that event listeners can be attached either to the `document` or to the specific element instance. Use `document.addEventListener` if your web app might be adding new instances of the component dynamically.

All events contain `evt.details.id` and `evt.details.name`. Some events contain `evt.details.data` if indicated.

## Methods

These methods can be used from JavaScript by first getting a reference to the appropriate element instance. As shown in the examples.

### Utility

None.

### Standard methods

None.

## Extensions for UIBUILDER for Node-RED

### Browser to Node-RED

None.

### Node-RED to Browser

None.

#### Examples



## Original Requirements

* [ ] 

## Nice-to-have features

Possibly in future versions.

* [ ] 


## Design References

* 
